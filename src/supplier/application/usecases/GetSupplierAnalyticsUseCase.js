// Use case for getting supplier analytics
export class GetSupplierAnalyticsUseCase {
  constructor(supplierRepository) {
    this.supplierRepository = supplierRepository;
  }

  async execute() {
    try {
      // Get analytics data from repository
      const analytics = await this.supplierRepository.getAnalytics();
      
      return {
        success: true,
        data: analytics,
        message: 'Supplier analytics retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default GetSupplierAnalyticsUseCase;
