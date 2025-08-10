// Use case for getting supplier by ID
export class GetSupplierByIdUseCase {
  constructor(supplierRepository) {
    this.supplierRepository = supplierRepository;
  }

  async execute(id) {
    try {
      if (!id) {
        return {
          success: false,
          error: 'Supplier ID is required'
        };
      }

      const supplier = await this.supplierRepository.findById(id);
      
      if (!supplier) {
        return {
          success: false,
          error: 'Supplier not found'
        };
      }

      return {
        success: true,
        data: supplier
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default GetSupplierByIdUseCase;
