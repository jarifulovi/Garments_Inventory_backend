// Main entry point for the category module
export { default as CategoryRoutes } from './interfaces/routes/CategoryRoutes.js';
export { default as CategoryController } from './interfaces/controllers/CategoryController.js';
export { default as CategoryService } from './application/services/CategoryService.js';
export { default as MongoCategoryRepository } from './infrastructure/repositories/MongoCategoryRepository.js';
export { default as CategoryRepository } from './domain/repositories/CategoryRepository.js';
export { default as CategoryEntity } from './domain/entities/CategoryEntity.js';
export { default as CategorySchema } from './infrastructure/schemas/CategorySchema.js';

// Use cases
export { default as CreateCategoryUseCase } from './application/usecases/CreateCategoryUseCase.js';
export { default as GetAllCategoriesUseCase } from './application/usecases/GetAllCategoriesUseCase.js';
export { default as GetCategoryByIdUseCase } from './application/usecases/GetCategoryByIdUseCase.js';
export { default as UpdateCategoryUseCase } from './application/usecases/UpdateCategoryUseCase.js';
export { default as DeleteCategoryUseCase } from './application/usecases/DeleteCategoryUseCase.js';
export { default as GetParentCategoriesUseCase } from './application/usecases/GetParentCategoriesUseCase.js';
export { default as GetSubcategoriesUseCase } from './application/usecases/GetSubcategoriesUseCase.js';
