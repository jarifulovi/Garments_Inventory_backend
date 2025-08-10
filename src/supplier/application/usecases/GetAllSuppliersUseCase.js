// Use case for getting all suppliers
export class GetAllSuppliersUseCase {
  constructor(supplierRepository) {
    this.supplierRepository = supplierRepository;
  }

  async execute(filters = {}) {
    try {
      const suppliers = await this.supplierRepository.findAll(filters);
      return {
        success: true,
        data: suppliers
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default GetAllSuppliersUseCase;
