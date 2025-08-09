import express from 'express';
import ProductController from '../controllers/ProductController.js';

const router = express.Router();

// GET /api/products/analytics - Get product analytics
router.get('/analytics', ProductController.getProductAnalytics);

// GET /api/products/reports/low-stock - Get low stock products (must be before /:id route)
router.get('/reports/low-stock', ProductController.getLowStockProducts);

// GET /api/products/category/:categoryId - Get products by category
router.get('/category/:categoryId', ProductController.getProductsByCategory);

// GET /api/products - Get all products
router.get('/', ProductController.getAllProducts);

// GET /api/products/:id - Get product by ID
router.get('/:id', ProductController.getProductById);

// POST /api/products - Create new product
router.post('/', ProductController.createProduct);

// PUT /api/products/:id - Update product
router.put('/:id', ProductController.updateProduct);

// DELETE /api/products/:id - Delete product
router.delete('/:id', ProductController.deleteProduct);

export default router;
