// Use case for updating a product
export class UpdateProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id, productData) {
    try {
      if (!id) {
        return {
          success: false,
          error: 'Product ID is required'
        };
      }

      // Business validation
      if (productData.price !== undefined && productData.price <= 0) {
        return {
          success: false,
          error: 'Price must be greater than 0'
        };
      }

      if (productData.costPrice !== undefined && productData.costPrice <= 0) {
        return {
          success: false,
          error: 'Cost price must be greater than 0'
        };
      }

      if (productData.quantity !== undefined && productData.quantity < 0) {
        return {
          success: false,
          error: 'Quantity cannot be negative'
        };
      }

      if (productData.minStockLevel !== undefined && productData.minStockLevel < 0) {
        return {
          success: false,
          error: 'Minimum stock level cannot be negative'
        };
      }

      const product = await this.productRepository.update(id, productData);
      
      if (!product) {
        return {
          success: false,
          error: 'Product not found'
        };
      }

      return {
        success: true,
        data: product,
        message: 'Product updated successfully'
      };
    } catch (error) {
      // Handle unique constraint violation for SKU
      if (error.code === 11000 && error.keyPattern?.sku) {
        return {
          success: false,
          error: 'SKU already exists'
        };
      }
      
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default UpdateProductUseCase;
