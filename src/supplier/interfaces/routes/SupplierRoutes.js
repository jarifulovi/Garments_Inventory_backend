import express from 'express';
import SupplierController from '../controllers/SupplierController.js';

const router = express.Router();

// GET /api/suppliers/analytics - Get supplier analytics
router.get('/analytics', SupplierController.getSupplierAnalytics);

// GET /api/suppliers/active - Get active suppliers (must be before /:id route)
router.get('/active', SupplierController.getActiveSuppliers);

// GET /api/suppliers/rating/:minRating - Get suppliers by minimum rating
router.get('/rating/:minRating', SupplierController.getSuppliersByRating);

// GET /api/suppliers - Get all suppliers
router.get('/', SupplierController.getAllSuppliers);

// GET /api/suppliers/:id - Get supplier by ID
router.get('/:id', SupplierController.getSupplierById);

// POST /api/suppliers - Create new supplier
router.post('/', SupplierController.createSupplier);

// PUT /api/suppliers/:id - Update supplier
router.put('/:id', SupplierController.updateSupplier);

// DELETE /api/suppliers/:id - Delete supplier
router.delete('/:id', SupplierController.deleteSupplier);

export default router;
