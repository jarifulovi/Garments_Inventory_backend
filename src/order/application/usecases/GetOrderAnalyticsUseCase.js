// Use case for getting order analytics
export class GetOrderAnalyticsUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute() {
    try {
      // Get analytics data from repository
      const analytics = await this.orderRepository.getAnalytics();
      
      return {
        success: true,
        data: analytics,
        message: 'Order analytics retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default GetOrderAnalyticsUseCase;
