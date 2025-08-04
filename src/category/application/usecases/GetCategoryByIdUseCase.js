// Use case for getting category by ID
export class GetCategoryByIdUseCase {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(id) {
    try {
      if (!id) {
        return {
          success: false,
          error: 'Category ID is required'
        };
      }

      const category = await this.categoryRepository.findById(id);
      
      if (!category) {
        return {
          success: false,
          error: 'Category not found'
        };
      }

      return {
        success: true,
        data: category
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default GetCategoryByIdUseCase;
