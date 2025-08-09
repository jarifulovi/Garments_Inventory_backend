// Use case for getting all products
export class GetAllProductsUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(filters = {}) {
    try {
      const products = await this.productRepository.findAll(filters);
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

export default GetAllProductsUseCase;
