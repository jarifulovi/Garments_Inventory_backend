// Use case for deleting a product
export class DeleteProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id) {
    try {
      if (!id) {
        return {
          success: false,
          error: 'Product ID is required'
        };
      }

      const result = await this.productRepository.delete(id);
      
      if (!result) {
        return {
          success: false,
          error: 'Product not found'
        };
      }

      return {
        success: true,
        message: 'Product deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default DeleteProductUseCase;
