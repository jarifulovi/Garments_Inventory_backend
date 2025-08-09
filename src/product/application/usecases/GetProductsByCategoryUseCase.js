// Use case for getting products by category
export class GetProductsByCategoryUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(categoryId) {
    try {
      if (!categoryId) {
        return {
          success: false,
          error: 'Category ID is required'
        };
      }

      const products = await this.productRepository.findByCategory(categoryId);
      return {
        success: true,
        data: products
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default GetProductsByCategoryUseCase;
