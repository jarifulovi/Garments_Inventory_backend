import express from 'express';
import OrderController from '../controllers/OrderController.js';

const router = express.Router();

// GET /api/orders/analytics - Get order analytics
router.get('/analytics', OrderController.getOrderAnalytics);

// GET /api/orders - Get all orders
router.get('/', OrderController.getAllOrders);

// GET /api/orders/:id - Get order by ID
router.get('/:id', OrderController.getOrderById);

// POST /api/orders - Create new order
router.post('/', OrderController.createOrder);

// PUT /api/orders/:id - Update order
router.put('/:id', OrderController.updateOrder);

// DELETE /api/orders/:id - Delete order
router.delete('/:id', OrderController.deleteOrder);

// PUT /api/orders/:id/status - Update order status
router.put('/:id/status', OrderController.updateOrderStatus);

export default router;
