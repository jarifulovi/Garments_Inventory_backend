// Use case for getting low stock products
export class GetLowStockProductsUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute() {
    try {
      const products = await this.productRepository.findLowStock();
      return {
        success: true,
        data: products,
        message: `Found ${products.length} low stock products`
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default GetLowStockProductsUseCase;
