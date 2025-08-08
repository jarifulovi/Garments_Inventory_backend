// Use case for getting category analytics
export class GetCategoryAnalyticsUseCase {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute() {
    try {
      // Get all categories (active and inactive)
      const allCategories = await this.categoryRepository.findAllIncludingInactive();
      const activeCategories = await this.categoryRepository.findActiveCategories();
      const inactiveCategories = await this.categoryRepository.findInactiveCategories();
      
      const analytics = {
        totalCategories: allCategories.length,
        activeCategories: activeCategories.length,
        inactiveCategories: inactiveCategories.length,
        activeCategoriesPercentage: allCategories.length > 0 
          ? Math.round((activeCategories.length / allCategories.length) * 100) 
          : 0,
        inactiveCategoriesPercentage: allCategories.length > 0 
          ? Math.round((inactiveCategories.length / allCategories.length) * 100) 
          : 0
      };

      return {
        success: true,
        data: analytics,
        message: 'Category analytics retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default GetCategoryAnalyticsUseCase;
