// Use case for getting product analytics
export class GetProductAnalyticsUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute() {
    try {
      // Get analytics data from repository
      const analytics = await this.productRepository.getAnalytics();
      
      return {
        success: true,
        data: analytics,
        message: 'Product analytics retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default GetProductAnalyticsUseCase;
