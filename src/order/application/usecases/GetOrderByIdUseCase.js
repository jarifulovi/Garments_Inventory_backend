// Use case for getting order by ID
export class GetOrderByIdUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(id) {
    try {
      if (!id) {
        return {
          success: false,
          error: 'Order ID is required'
        };
      }

      const order = await this.orderRepository.findById(id);
      
      if (!order) {
        return {
          success: false,
          error: 'Order not found'
        };
      }

      return {
        success: true,
        data: order
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default GetOrderByIdUseCase;
