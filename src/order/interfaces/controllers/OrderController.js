import OrderService from '../../application/services/OrderService.js';
import MongoOrderRepository from '../../infrastructure/repositories/MongoOrderRepository.js';
import MongoProductRepository from '../../../product/infrastructure/repositories/MongoProductRepository.js';

// Create repository and service instances
const orderRepository = new MongoOrderRepository();
const productRepository = new MongoProductRepository();
const orderService = new OrderService(orderRepository, productRepository);

// Express controller for handling HTTP requests
export class OrderController {
  // GET /api/orders - Get all orders
  static async getAllOrders(req, res) {
    try {
      const result = await orderService.getAllOrders(req.query);
      
      if (result.success) {
        res.json({
          success: true,
          data: result.data.orders,
          pagination: result.data.pagination
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.error
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // GET /api/orders/:id - Get order by ID
  static async getOrderById(req, res) {
    try {
      const result = await orderService.getOrderById(req.params.id);
      
      if (result.success) {
        res.json({
          success: true,
          data: result.data
        });
      } else {
        const statusCode = result.error === 'Order not found' ? 404 : 400;
        res.status(statusCode).json({
          success: false,
          message: result.error
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // POST /api/orders - Create new order
  static async createOrder(req, res) {
    try {
      const result = await orderService.createOrder(req.body);
      
      if (result.success) {
        res.status(201).json({
          success: true,
          message: result.message,
          data: result.data
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.error
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // PUT /api/orders/:id - Update order
  static async updateOrder(req, res) {
    try {
      const result = await orderService.updateOrder(req.params.id, req.body);
      
      if (result.success) {
        res.json({
          success: true,
          message: result.message,
          data: result.data
        });
      } else {
        const statusCode = result.error === 'Order not found' ? 404 : 400;
        res.status(statusCode).json({
          success: false,
          message: result.error
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // DELETE /api/orders/:id - Delete order
  static async deleteOrder(req, res) {
    try {
      const result = await orderService.deleteOrder(req.params.id);
      
      if (result.success) {
        res.json({
          success: true,
          message: result.message
        });
      } else {
        const statusCode = result.error === 'Order not found' ? 404 : 400;
        res.status(statusCode).json({
          success: false,
          message: result.error
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // PUT /api/orders/:id/status - Update order status
  static async updateOrderStatus(req, res) {
    try {
      const result = await orderService.updateOrderStatus(req.params.id, req.body.status);
      
      if (result.success) {
        res.json({
          success: true,
          message: result.message,
          data: result.data
        });
      } else {
        const statusCode = result.error === 'Order not found' ? 404 : 400;
        res.status(statusCode).json({
          success: false,
          message: result.error
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // GET /api/orders/analytics - Get order analytics
  static async getOrderAnalytics(req, res) {
    try {
      const result = await orderService.getOrderAnalytics();
      
      if (result.success) {
        res.json({
          success: true,
          data: result.data,
          message: result.message
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.error
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }
}

export default OrderController;
