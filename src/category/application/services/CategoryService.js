// Application service for orchestrating category use cases
import CreateCategoryUseCase from '../usecases/CreateCategoryUseCase.js';
import GetAllCategoriesUseCase from '../usecases/GetAllCategoriesUseCase.js';
import GetCategoryByIdUseCase from '../usecases/GetCategoryByIdUseCase.js';
import UpdateCategoryUseCase from '../usecases/UpdateCategoryUseCase.js';
import DeleteCategoryUseCase from '../usecases/DeleteCategoryUseCase.js';
import GetParentCategoriesUseCase from '../usecases/GetParentCategoriesUseCase.js';
import GetSubcategoriesUseCase from '../usecases/GetSubcategoriesUseCase.js';

export class CategoryService {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
    
    // Initialize use cases
    this.createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
    this.getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoryRepository);
    this.getCategoryByIdUseCase = new GetCategoryByIdUseCase(categoryRepository);
    this.updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);
    this.deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);
    this.getParentCategoriesUseCase = new GetParentCategoriesUseCase(categoryRepository);
    this.getSubcategoriesUseCase = new GetSubcategoriesUseCase(categoryRepository);
  }

  async getAllCategories(options = {}) {
    return await this.getAllCategoriesUseCase.execute(options);
  }

  async getCategoryById(id) {
    return await this.getCategoryByIdUseCase.execute(id);
  }

  async createCategory(categoryData) {
    return await this.createCategoryUseCase.execute(categoryData);
  }

  async updateCategory(id, categoryData) {
    return await this.updateCategoryUseCase.execute(id, categoryData);
  }

  async deleteCategory(id) {
    return await this.deleteCategoryUseCase.execute(id);
  }

  async getParentCategories() {
    return await this.getParentCategoriesUseCase.execute();
  }

  async getSubcategories(parentId) {
    return await this.getSubcategoriesUseCase.execute(parentId);
  }

  // Additional business methods
  async getCategoriesHierarchy() {
    return await this.getAllCategoriesUseCase.execute({ hierarchical: true });
  }

  async getActiveCategories() {
    try {
      const categories = await this.categoryRepository.findActiveCategories();
      return {
        success: true,
        data: categories,
        message: `Found ${categories.length} active categories`
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async softDeleteCategory(id) {
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

      // Check for subcategories and products (same business rules as hard delete)
      if (category.subcategories && category.subcategories.length > 0) {
        return {
          success: false,
          error: 'Cannot deactivate category that has active subcategories'
        };
      }

      if (category.productsCount > 0) {
        return {
          success: false,
          error: `Cannot deactivate category that has ${category.productsCount} products`
        };
      }

      const result = await this.categoryRepository.softDelete(id);
      return {
        success: true,
        data: result,
        message: 'Category deactivated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async restoreCategory(id) {
    try {
      if (!id) {
        return {
          success: false,
          error: 'Category ID is required'
        };
      }

      const result = await this.categoryRepository.restore(id);
      if (!result) {
        return {
          success: false,
          error: 'Category not found'
        };
      }

      return {
        success: true,
        data: result,
        message: 'Category restored successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default CategoryService;
