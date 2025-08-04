// Use case for deleting a category
export class DeleteCategoryUseCase {
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

      // Check if category exists
      const category = await this.categoryRepository.findById(id);
      if (!category) {
        return {
          success: false,
          error: 'Category not found'
        };
      }

      // Business rule: Cannot delete category with subcategories
      if (category.subcategories && category.subcategories.length > 0) {
        return {
          success: false,
          error: 'Cannot delete category that has subcategories. Delete subcategories first.'
        };
      }

      // Business rule: Cannot delete category with products
      if (category.productsCount > 0) {
        return {
          success: false,
          error: `Cannot delete category that has ${category.productsCount} products. Move or delete products first.`
        };
      }

      const result = await this.categoryRepository.delete(id);
      
      if (!result) {
        return {
          success: false,
          error: 'Category not found'
        };
      }

      return {
        success: true,
        message: 'Category deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default DeleteCategoryUseCase;
