// Application service for orchestrating supplier use cases
import CreateSupplierUseCase from '../usecases/CreateSupplierUseCase.js';
import GetAllSuppliersUseCase from '../usecases/GetAllSuppliersUseCase.js';
import GetSupplierByIdUseCase from '../usecases/GetSupplierByIdUseCase.js';
import UpdateSupplierUseCase from '../usecases/UpdateSupplierUseCase.js';
import DeleteSupplierUseCase from '../usecases/DeleteSupplierUseCase.js';
import GetSupplierAnalyticsUseCase from '../usecases/GetSupplierAnalyticsUseCase.js';

export class SupplierService {
  constructor(supplierRepository) {
    this.supplierRepository = supplierRepository;
    
    // Initialize use cases
    this.createSupplierUseCase = new CreateSupplierUseCase(supplierRepository);
    this.getAllSuppliersUseCase = new GetAllSuppliersUseCase(supplierRepository);
    this.getSupplierByIdUseCase = new GetSupplierByIdUseCase(supplierRepository);
    this.updateSupplierUseCase = new UpdateSupplierUseCase(supplierRepository);
    this.deleteSupplierUseCase = new DeleteSupplierUseCase(supplierRepository);
    this.getSupplierAnalyticsUseCase = new GetSupplierAnalyticsUseCase(supplierRepository);
  }

  async getAllSuppliers(filters = {}) {
    return await this.getAllSuppliersUseCase.execute(filters);
  }

  async getSupplierById(id) {
    return await this.getSupplierByIdUseCase.execute(id);
  }

  async createSupplier(supplierData) {
    return await this.createSupplierUseCase.execute(supplierData);
  }

  async updateSupplier(id, supplierData) {
    return await this.updateSupplierUseCase.execute(id, supplierData);
  }

  async deleteSupplier(id) {
    return await this.deleteSupplierUseCase.execute(id);
  }

  async getSupplierAnalytics() {
    return await this.getSupplierAnalyticsUseCase.execute();
  }

  // Additional business methods
  async getActiveSuppliers() {
    return await this.getAllSuppliersUseCase.execute({ isActive: true });
  }

  async getSuppliersByRating(minRating) {
    try {
      const suppliers = await this.supplierRepository.findByRating(minRating);
      return {
        success: true,
        data: suppliers,
        message: `Found ${suppliers.length} suppliers with rating ${minRating} or higher`
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default SupplierService;
