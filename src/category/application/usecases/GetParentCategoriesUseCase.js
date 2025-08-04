// Use case for getting parent categories
export class GetParentCategoriesUseCase {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute() {
    try {
      const parentCategories = await this.categoryRepository.findParentCategories();
      return {
        success: true,
        data: parentCategories,
        message: `Found ${parentCategories.length} parent categories`
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default GetParentCategoriesUseCase;
