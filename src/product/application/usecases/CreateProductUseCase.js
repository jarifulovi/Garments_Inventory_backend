// Use case for creating a new product
export class CreateProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(productData) {
    try {
      // Business validation
      if (!productData.name || !productData.sku) {
        return {
          success: false,
          error: 'Name and SKU are required'
        };
      }

      if (!productData.price || productData.price <= 0) {
        return {
          success: false,
          error: 'Price must be greater than 0'
        };
      }

      if (!productData.costPrice || productData.costPrice <= 0) {
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

      if (!productData.category) {
        return {
          success: false,
          error: 'Category is required'
        };
      }

      if (!productData.supplier) {
        return {
          success: false,
          error: 'Supplier is required'
        };
      }

      if (!productData.size) {
        return {
          success: false,
          error: 'Size is required'
        };
      }

      if (!productData.color) {
        return {
          success: false,
          error: 'Color is required'
        };
      }

      if (!productData.material) {
        return {
          success: false,
          error: 'Material is required'
        };
      }

      const product = await this.productRepository.create(productData);
      return {
        success: true,
        data: product,
        message: 'Product created successfully'
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

export default CreateProductUseCase;
