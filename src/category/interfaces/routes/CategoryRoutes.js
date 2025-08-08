import express from 'express';
import CategoryController from '../controllers/CategoryController.js';

const router = express.Router();

// GET /api/categories/analytics - Get category analytics
router.get('/analytics', CategoryController.getCategoryAnalytics);

// GET /api/categories/hierarchy - Get categories with hierarchy (must be before /:id route)
router.get('/hierarchy', CategoryController.getCategoriesHierarchy);

// GET /api/categories/parents - Get parent categories
router.get('/parents', CategoryController.getParentCategories);

// GET /api/categories/active - Get active categories
router.get('/active', CategoryController.getActiveCategories);

// GET /api/categories/subcategories/:parentId - Get subcategories
router.get('/subcategories/:parentId', CategoryController.getSubcategories);

// PUT /api/categories/:id/deactivate - Soft delete category
router.put('/:id/deactivate', CategoryController.softDeleteCategory);

// PUT /api/categories/:id/restore - Restore category
router.put('/:id/restore', CategoryController.restoreCategory);

// GET /api/categories - Get all categories
router.get('/', CategoryController.getAllCategories);

// GET /api/categories/:id - Get category by ID
router.get('/:id', CategoryController.getCategoryById);

// POST /api/categories - Create new category
router.post('/', CategoryController.createCategory);

// PUT /api/categories/:id - Update category
router.put('/:id', CategoryController.updateCategory);

// DELETE /api/categories/:id - Delete category
router.delete('/:id', CategoryController.deleteCategory);

export default router;
