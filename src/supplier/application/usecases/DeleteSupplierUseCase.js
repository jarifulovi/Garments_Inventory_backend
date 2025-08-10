// Use case for deleting a supplier
export class DeleteSupplierUseCase {
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

      const result = await this.supplierRepository.delete(id);
      
      if (!result) {
        return {
          success: false,
          error: 'Supplier not found'
        };
      }

      return {
        success: true,
        message: 'Supplier deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default DeleteSupplierUseCase;
