// Use case for updating a category
export class UpdateCategoryUseCase {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(id, categoryData) {
    try {
      if (!id) {
        return {
          success: false,
          error: 'Category ID is required'
        };
      }

      // Check if category exists
      const existingCategory = await this.categoryRepository.findById(id);
      if (!existingCategory) {
        return {
          success: false,
          error: 'Category not found'
        };
      }

      // Business validation
      if (categoryData.name && categoryData.name.trim().length < 2) {
        return {
          success: false,
          error: 'Category name must be at least 2 characters'
        };
      }

      if (categoryData.name && categoryData.name.length > 50) {
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

      // Check if new name already exists (excluding current category)
      if (categoryData.name && categoryData.name !== existingCategory.name) {
        const categoryWithSameName = await this.categoryRepository.findByName(categoryData.name);
        if (categoryWithSameName && categoryWithSameName._id.toString() !== id) {
          return {
            success: false,
            error: 'Category name already exists'
          };
        }
      }

      // Validate parent category if being changed
      if (categoryData.parentCategory !== undefined) {
        if (categoryData.parentCategory) {
          // Self-reference check
          if (categoryData.parentCategory === id) {
            return {
              success: false,
              error: 'Category cannot be its own parent'
            };
          }

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
              error: 'Cannot set inactive category as parent'
            };
          }

          // Prevent creating subcategory under another subcategory
          if (parentCategory.parentCategory) {
            return {
              success: false,
              error: 'Cannot create subcategory under another subcategory. Maximum 2-level hierarchy allowed'
            };
          }

          // Check if the category being updated has subcategories
          if (existingCategory.subcategories && existingCategory.subcategories.length > 0) {
            return {
              success: false,
              error: 'Cannot make a parent category into a subcategory when it has existing subcategories'
            };
          }
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

      const category = await this.categoryRepository.update(id, categoryData);
      
      if (!category) {
        return {
          success: false,
          error: 'Category not found'
        };
      }

      return {
        success: true,
        data: category,
        message: 'Category updated successfully'
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

export default UpdateCategoryUseCase;
