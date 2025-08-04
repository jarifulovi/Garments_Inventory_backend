// Use case for getting subcategories of a parent category
export class GetSubcategoriesUseCase {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(parentId) {
    try {
      if (!parentId) {
        return {
          success: false,
          error: 'Parent category ID is required'
        };
      }

      // Verify parent category exists
      const parentCategory = await this.categoryRepository.findById(parentId);
      if (!parentCategory) {
        return {
          success: false,
          error: 'Parent category not found'
        };
      }

      const subcategories = await this.categoryRepository.findSubcategories(parentId);
      return {
        success: true,
        data: {
          parentCategory: {
            id: parentCategory._id,
            name: parentCategory.name
          },
          subcategories: subcategories
        },
        message: `Found ${subcategories.length} subcategories`
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default GetSubcategoriesUseCase;
