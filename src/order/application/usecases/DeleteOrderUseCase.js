// Use case for deleting an order
export class DeleteOrderUseCase {
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

      const result = await this.orderRepository.delete(id);
      
      if (!result) {
        return {
          success: false,
          error: 'Order not found'
        };
      }

      return {
        success: true,
        message: 'Order deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default DeleteOrderUseCase;
