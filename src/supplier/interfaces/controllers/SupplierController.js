import SupplierService from '../../application/services/SupplierService.js';
import MongoSupplierRepository from '../../infrastructure/repositories/MongoSupplierRepository.js';

// Create repository and service instances
const supplierRepository = new MongoSupplierRepository();
const supplierService = new SupplierService(supplierRepository);

// Express controller for handling HTTP requests
export class SupplierController {
  // GET /api/suppliers - Get all suppliers
  static async getAllSuppliers(req, res) {
    try {
      const result = await supplierService.getAllSuppliers(req.query);
      
      if (result.success) {
        res.json({
          success: true,
          data: result.data.suppliers,
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

  // GET /api/suppliers/:id - Get supplier by ID
  static async getSupplierById(req, res) {
    try {
      const result = await supplierService.getSupplierById(req.params.id);
      
      if (result.success) {
        res.json({
          success: true,
          data: result.data
        });
      } else {
        const statusCode = result.error === 'Supplier not found' ? 404 : 400;
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

  // POST /api/suppliers - Create new supplier
  static async createSupplier(req, res) {
    try {
      const result = await supplierService.createSupplier(req.body);
      
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

  // PUT /api/suppliers/:id - Update supplier
  static async updateSupplier(req, res) {
    try {
      const result = await supplierService.updateSupplier(req.params.id, req.body);
      
      if (result.success) {
        res.json({
          success: true,
          message: result.message
        });
      } else {
        const statusCode = result.error === 'Supplier not found' ? 404 : 400;
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

  // DELETE /api/suppliers/:id - Delete supplier
  static async deleteSupplier(req, res) {
    try {
      const result = await supplierService.deleteSupplier(req.params.id);
      
      if (result.success) {
        res.json({
          success: true,
          message: result.message
        });
      } else {
        const statusCode = result.error === 'Supplier not found' ? 404 : 400;
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

  // GET /api/suppliers/active - Get active suppliers
  static async getActiveSuppliers(req, res) {
    try {
      const result = await supplierService.getActiveSuppliers();
      
      if (result.success) {
        res.json({
          success: true,
          data: result.data.suppliers,
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

  // GET /api/suppliers/rating/:minRating - Get suppliers by minimum rating
  static async getSuppliersByRating(req, res) {
    try {
      const minRating = parseInt(req.params.minRating);
      
      if (isNaN(minRating) || minRating < 1 || minRating > 5) {
        return res.status(400).json({
          success: false,
          message: 'Invalid rating. Must be between 1 and 5'
        });
      }

      const result = await supplierService.getSuppliersByRating(minRating);
      
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

  // GET /api/suppliers/analytics - Get supplier analytics
  static async getSupplierAnalytics(req, res) {
    try {
      const result = await supplierService.getSupplierAnalytics();
      
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

export default SupplierController;
