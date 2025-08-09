// Use case for getting all orders
export class GetAllOrdersUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(filters = {}) {
    try {
      const orders = await this.orderRepository.findAll(filters);
      return {
        success: true,
        data: orders
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default GetAllOrdersUseCase;
