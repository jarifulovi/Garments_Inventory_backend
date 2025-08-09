// Use case for updating order status
export class UpdateOrderStatusUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(id, status) {
    try {
      if (!id) {
        return {
          success: false,
          error: 'Order ID is required'
        };
      }

      if (!status) {
        return {
          success: false,
          error: 'Status is required'
        };
      }

      const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
      if (!validStatuses.includes(status)) {
        return {
          success: false,
          error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
        };
      }

      const order = await this.orderRepository.updateStatus(id, status);
      
      if (!order) {
        return {
          success: false,
          error: 'Order not found'
        };
      }

      return {
        success: true,
        data: order,
        message: 'Order status updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default UpdateOrderStatusUseCase;
