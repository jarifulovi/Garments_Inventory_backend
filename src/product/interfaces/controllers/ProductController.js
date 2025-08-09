import ProductService from '../../application/services/ProductService.js';
import MongoProductRepository from '../../infrastructure/repositories/MongoProductRepository.js';

// Create repository and service instances
const productRepository = new MongoProductRepository();
const productService = new ProductService(productRepository);

// Express controller for handling HTTP requests
export class ProductController {
  // GET /api/products - Get all products
  static async getAllProducts(req, res) {
    try {
      const result = await productService.getAllProducts(req.query);
      
      if (result.success) {
        res.json({
          success: true,
          data: result.data.products,
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

  // GET /api/products/:id - Get product by ID
  static async getProductById(req, res) {
    try {
      const result = await productService.getProductById(req.params.id);
      
      if (result.success) {
        res.json({
          success: true,
          data: result.data
        });
      } else {
        const statusCode = result.error === 'Product not found' ? 404 : 400;
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

  // POST /api/products - Create new product
  static async createProduct(req, res) {
    try {
      const result = await productService.createProduct(req.body);
      
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

  // PUT /api/products/:id - Update product
  static async updateProduct(req, res) {
    try {
      const result = await productService.updateProduct(req.params.id, req.body);
      
      if (result.success) {
        res.json({
          success: true,
          message: result.message,
          data: result.data
        });
      } else {
        const statusCode = result.error === 'Product not found' ? 404 : 400;
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

  // DELETE /api/products/:id - Delete product
  static async deleteProduct(req, res) {
    try {
      const result = await productService.deleteProduct(req.params.id);
      
      if (result.success) {
        res.json({
          success: true,
          message: result.message
        });
      } else {
        const statusCode = result.error === 'Product not found' ? 404 : 400;
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

  // GET /api/products/category/:categoryId - Get products by category
  static async getProductsByCategory(req, res) {
    try {
      const result = await productService.getProductsByCategory(req.params.categoryId);
      
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

  // GET /api/products/reports/low-stock - Get low stock products
  static async getLowStockProducts(req, res) {
    try {
      const result = await productService.getLowStockProducts();
      
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

  // GET /api/products/analytics - Get product analytics
  static async getProductAnalytics(req, res) {
    try {
      const result = await productService.getProductAnalytics();
      
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

export default ProductController;
