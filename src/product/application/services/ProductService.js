// Application service for orchestrating product use cases
import CreateProductUseCase from '../usecases/CreateProductUseCase.js';
import GetAllProductsUseCase from '../usecases/GetAllProductsUseCase.js';
import GetProductByIdUseCase from '../usecases/GetProductByIdUseCase.js';
import UpdateProductUseCase from '../usecases/UpdateProductUseCase.js';
import DeleteProductUseCase from '../usecases/DeleteProductUseCase.js';
import GetProductsByCategoryUseCase from '../usecases/GetProductsByCategoryUseCase.js';
import GetLowStockProductsUseCase from '../usecases/GetLowStockProductsUseCase.js';
import GetProductAnalyticsUseCase from '../usecases/GetProductAnalyticsUseCase.js';

export class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
    
    // Initialize use cases
    this.createProductUseCase = new CreateProductUseCase(productRepository);
    this.getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
    this.getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
    this.updateProductUseCase = new UpdateProductUseCase(productRepository);
    this.deleteProductUseCase = new DeleteProductUseCase(productRepository);
    this.getProductsByCategoryUseCase = new GetProductsByCategoryUseCase(productRepository);
    this.getLowStockProductsUseCase = new GetLowStockProductsUseCase(productRepository);
    this.getProductAnalyticsUseCase = new GetProductAnalyticsUseCase(productRepository);
  }

  async getAllProducts(filters = {}) {
    return await this.getAllProductsUseCase.execute(filters);
  }

  async getProductById(id) {
    return await this.getProductByIdUseCase.execute(id);
  }

  async createProduct(productData) {
    return await this.createProductUseCase.execute(productData);
  }

  async updateProduct(id, productData) {
    return await this.updateProductUseCase.execute(id, productData);
  }

  async deleteProduct(id) {
    return await this.deleteProductUseCase.execute(id);
  }

  async getProductsByCategory(categoryId) {
    return await this.getProductsByCategoryUseCase.execute(categoryId);
  }

  async getLowStockProducts() {
    return await this.getLowStockProductsUseCase.execute();
  }

  async getProductAnalytics() {
    return await this.getProductAnalyticsUseCase.execute();
  }
}

export default ProductService;
