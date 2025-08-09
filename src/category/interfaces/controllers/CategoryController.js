import CategoryService from '../../application/services/CategoryService.js';
import MongoCategoryRepository from '../../infrastructure/repositories/MongoCategoryRepository.js';

// Create repository and service instances
const categoryRepository = new MongoCategoryRepository();
const categoryService = new CategoryService(categoryRepository);

// Express controller for handling HTTP requests
export class CategoryController {
  // GET /api/categories - Get all categories
  static async getAllCategories(req, res) {
    try {
      const { hierarchical, includeInactive } = req.query;
      const options = {
        hierarchical: hierarchical === 'true',
        includeInactive: includeInactive === 'true'
      };

      const result = await categoryService.getAllCategories(options);
      
      if (result.success) {
        res.json({
          success: true,
          data: result.data,
          message: result.message || 'Categories retrieved successfully'
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

  // GET /api/categories/:id - Get category by ID
  static async getCategoryById(req, res) {
    try {
      const result = await categoryService.getCategoryById(req.params.id);
      
      if (result.success) {
        res.json({
          success: true,
          data: result.data,
          message: result.message || 'Category retrieved successfully'
        });
      } else {
        const statusCode = result.error === 'Category not found' ? 404 : 400;
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

  // POST /api/categories - Create new category
  static async createCategory(req, res) {
    try {
      const result = await categoryService.createCategory(req.body);
      
      if (result.success) {
        res.status(201).json({
          success: true,
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

  // PUT /api/categories/:id - Update category
  static async updateCategory(req, res) {
    try {
      const result = await categoryService.updateCategory(req.params.id, req.body);
      
      if (result.success) {
        res.json({
          success: true,
          message: result.message
        });
      } else {
        const statusCode = result.error === 'Category not found' ? 404 : 400;
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

  // DELETE /api/categories/:id - Delete category
  static async deleteCategory(req, res) {
    try {
      const result = await categoryService.deleteCategory(req.params.id);
      
      if (result.success) {
        res.json({
          success: true,
          message: result.message
        });
      } else {
        const statusCode = result.error === 'Category not found' ? 404 : 400;
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

  // GET /api/categories/parents - Get parent categories
  static async getParentCategories(req, res) {
    try {
      const result = await categoryService.getParentCategories();
      
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

  // GET /api/categories/subcategories/:parentId - Get subcategories
  static async getSubcategories(req, res) {
    try {
      const result = await categoryService.getSubcategories(req.params.parentId);
      
      if (result.success) {
        res.json({
          success: true,
          data: result.data,
          message: result.message
        });
      } else {
        const statusCode = result.error.includes('not found') ? 404 : 400;
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

  // GET /api/categories/hierarchy - Get categories with hierarchy
  static async getCategoriesHierarchy(req, res) {
    try {
      const result = await categoryService.getCategoriesHierarchy();
      
      if (result.success) {
        res.json({
          success: true,
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

  // GET /api/categories/active - Get active categories
  static async getActiveCategories(req, res) {
    try {
      const result = await categoryService.getActiveCategories();
      
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

  // GET /api/categories/analytics - Get category analytics
  static async getCategoryAnalytics(req, res) {
    try {
      const result = await categoryService.getCategoryAnalytics();
      
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

  // PUT /api/categories/:id/deactivate - Soft delete category
  static async softDeleteCategory(req, res) {
    try {
      const result = await categoryService.softDeleteCategory(req.params.id);
      
      if (result.success) {
        res.json({
          success: true,
          message: result.message
        });
      } else {
        const statusCode = result.error === 'Category not found' ? 404 : 400;
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

  // PUT /api/categories/:id/restore - Restore category
  static async restoreCategory(req, res) {
    try {
      const result = await categoryService.restoreCategory(req.params.id);
      
      if (result.success) {
        res.json({
          success: true,
          message: result.message
        });
      } else {
        const statusCode = result.error === 'Category not found' ? 404 : 400;
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
}

export default CategoryController;
