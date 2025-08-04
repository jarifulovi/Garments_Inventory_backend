// Use case for getting all categories
export class GetAllCategoriesUseCase {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(options = {}) {
    try {
      const { includeInactive = false, hierarchical = false } = options;
      
      let categories;
      
      if (hierarchical) {
        categories = await this.categoryRepository.findAllWithHierarchy();
      } else if (includeInactive) {
        categories = await this.categoryRepository.findActiveCategories();
      } else {
        categories = await this.categoryRepository.findAll();
      }

      return {
        success: true,
        data: categories
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default GetAllCategoriesUseCase;
