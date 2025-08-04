// Use case for creating a new category
export class CreateCategoryUseCase {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(categoryData) {
    try {
      // Business validation
      if (!categoryData.name) {
        return {
          success: false,
          error: 'Category name is required'
        };
      }

      if (categoryData.name.trim().length < 2) {
        return {
          success: false,
          error: 'Category name must be at least 2 characters'
        };
      }

      if (categoryData.name.length > 50) {
        return {
          success: false,
          error: 'Category name cannot exceed 50 characters'
        };
      }

      if (categoryData.description && categoryData.description.length > 200) {
        return {
          success: false,
          error: 'Description cannot exceed 200 characters'
        };
      }

      // Check if category name already exists
      const existingCategory = await this.categoryRepository.findByName(categoryData.name);
      if (existingCategory) {
        return {
          success: false,
          error: 'Category name already exists'
        };
      }

      // Validate parent category if specified
      if (categoryData.parentCategory) {
        const parentCategory = await this.categoryRepository.findById(categoryData.parentCategory);
        if (!parentCategory) {
          return {
            success: false,
            error: 'Parent category not found'
          };
        }

        if (!parentCategory.isActive) {
          return {
            success: false,
            error: 'Cannot create subcategory under inactive parent category'
          };
        }

        // Prevent creating subcategory under another subcategory (max 2-level hierarchy)
        if (parentCategory.parentCategory) {
          return {
            success: false,
            error: 'Cannot create subcategory under another subcategory. Maximum 2-level hierarchy allowed'
          };
        }
      }

      // Validate image format if provided
      if (categoryData.image) {
        const imageRegex = /\.(jpg|jpeg|png|gif)$/i;
        if (!imageRegex.test(categoryData.image)) {
          return {
            success: false,
            error: 'Invalid image format. Only jpg, jpeg, png, gif are allowed'
          };
        }
      }

      const category = await this.categoryRepository.create(categoryData);
      return {
        success: true,
        data: category,
        message: 'Category created successfully'
      };
    } catch (error) {
      // Handle unique constraint violation
      if (error.code === 11000 && error.keyPattern?.name) {
        return {
          success: false,
          error: 'Category name already exists'
        };
      }
      
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default CreateCategoryUseCase;
