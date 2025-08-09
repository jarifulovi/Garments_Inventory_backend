// Main entry point for the product module
export { default as ProductRoutes } from './interfaces/routes/ProductRoutes.js';
export { default as ProductController } from './interfaces/controllers/ProductController.js';
export { default as ProductService } from './application/services/ProductService.js';
export { default as MongoProductRepository } from './infrastructure/repositories/MongoProductRepository.js';
export { default as ProductRepository } from './domain/repositories/ProductRepository.js';
export { default as ProductEntity } from './domain/entities/ProductEntity.js';
export { default as ProductSchema } from './infrastructure/schemas/ProductSchema.js';

// Use cases
export { default as CreateProductUseCase } from './application/usecases/CreateProductUseCase.js';
export { default as GetAllProductsUseCase } from './application/usecases/GetAllProductsUseCase.js';
export { default as GetProductByIdUseCase } from './application/usecases/GetProductByIdUseCase.js';
export { default as UpdateProductUseCase } from './application/usecases/UpdateProductUseCase.js';
export { default as DeleteProductUseCase } from './application/usecases/DeleteProductUseCase.js';
export { default as GetProductsByCategoryUseCase } from './application/usecases/GetProductsByCategoryUseCase.js';
export { default as GetLowStockProductsUseCase } from './application/usecases/GetLowStockProductsUseCase.js';
