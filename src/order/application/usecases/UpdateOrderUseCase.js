// Use case for updating an order
export class UpdateOrderUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(id, orderData) {
    try {
      if (!id) {
        return {
          success: false,
          error: 'Order ID is required'
        };
      }

      // Business validation
      if (orderData.type && !['purchase', 'sale'].includes(orderData.type)) {
        return {
          success: false,
          error: 'Order type must be either purchase or sale'
        };
      }

      if (orderData.items) {
        for (const item of orderData.items) {
          if (item.quantity && item.quantity <= 0) {
            return {
              success: false,
              error: 'Item quantity must be greater than 0'
            };
          }

          if (item.unitPrice && item.unitPrice <= 0) {
            return {
              success: false,
              error: 'Item unit price must be greater than 0'
            };
          }
        }
      }

      const order = await this.orderRepository.update(id, orderData);
      
      if (!order) {
        return {
          success: false,
          error: 'Order not found'
        };
      }

      return {
        success: true,
        data: order,
        message: 'Order updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default UpdateOrderUseCase;
