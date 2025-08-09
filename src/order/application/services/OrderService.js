import CreateOrderUseCase from '../usecases/CreateOrderUseCase.js';
import GetAllOrdersUseCase from '../usecases/GetAllOrdersUseCase.js';
import GetOrderByIdUseCase from '../usecases/GetOrderByIdUseCase.js';
import UpdateOrderUseCase from '../usecases/UpdateOrderUseCase.js';
import DeleteOrderUseCase from '../usecases/DeleteOrderUseCase.js';
import UpdateOrderStatusUseCase from '../usecases/UpdateOrderStatusUseCase.js';
import GetOrderAnalyticsUseCase from '../usecases/GetOrderAnalyticsUseCase.js';

// Application service that orchestrates use cases
export class OrderService {
  constructor(orderRepository, productRepository) {
    this.createOrderUseCase = new CreateOrderUseCase(orderRepository, productRepository);
    this.getAllOrdersUseCase = new GetAllOrdersUseCase(orderRepository);
    this.getOrderByIdUseCase = new GetOrderByIdUseCase(orderRepository);
    this.updateOrderUseCase = new UpdateOrderUseCase(orderRepository);
    this.deleteOrderUseCase = new DeleteOrderUseCase(orderRepository);
    this.updateOrderStatusUseCase = new UpdateOrderStatusUseCase(orderRepository);
    this.getOrderAnalyticsUseCase = new GetOrderAnalyticsUseCase(orderRepository);
  }

  async getAllOrders(filters) {
    return await this.getAllOrdersUseCase.execute(filters);
  }

  async getOrderById(id) {
    return await this.getOrderByIdUseCase.execute(id);
  }

  async createOrder(orderData) {
    return await this.createOrderUseCase.execute(orderData);
  }

  async updateOrder(id, orderData) {
    return await this.updateOrderUseCase.execute(id, orderData);
  }

  async deleteOrder(id) {
    return await this.deleteOrderUseCase.execute(id);
  }

  async updateOrderStatus(id, status) {
    return await this.updateOrderStatusUseCase.execute(id, status);
  }

  async getOrderAnalytics() {
    return await this.getOrderAnalyticsUseCase.execute();
  }
}

export default OrderService;
