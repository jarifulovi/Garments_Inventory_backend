# Product Module Implementation - Clean Architecture

This product module follows Clean Architecture principles as specified in structure.txt.

## Directory Structure

```
src/product/
├── application/
│   ├── services/
│   │   └── ProductService.js          ← Orchestrates use cases
│   └── usecases/
│       ├── CreateProductUseCase.js     ← Business logic for creating products
│       ├── GetAllProductsUseCase.js    ← Business logic for getting all products
│       ├── GetProductByIdUseCase.js    ← Business logic for getting product by ID
│       ├── UpdateProductUseCase.js     ← Business logic for updating products
│       ├── DeleteProductUseCase.js     ← Business logic for deleting products
│       ├── GetProductsByCategoryUseCase.js ← Business logic for category filtering
│       └── GetLowStockProductsUseCase.js ← Business logic for low stock reports
├── domain/
│   ├── entities/
│   │   └── ProductEntity.js           ← Core business object with domain methods
│   └── repositories/
│       └── ProductRepository.js       ← Abstract repository interface
├── infrastructure/
│   ├── repositories/
│   │   └── MongoProductRepository.js  ← Concrete MongoDB implementation
│   └── schemas/
│       └── ProductSchema.js           ← MongoDB schema definition
├── interfaces/
│   ├── controllers/
│   │   └── ProductController.js       ← Express HTTP controllers
│   └── routes/
│       └── ProductRoutes.js           ← Express route definitions
└── index.js                           ← Module exports
```

## Request Flow

```
HTTP Request → ProductRoutes.js → ProductController.js → ProductService.js → UseCase.js → ProductRepository (interface) → MongoProductRepository.js → MongoDB
```

## Key Features

### Product Entity Business Methods
- Stock management (isLowStock, canReduceStock, increaseStock, reduceStock)
- Price calculations (calculateProfitMargin, calculateProfit)
- Validation (validate, isValidPrice, isValidSize, etc.)
- Image and tag management
- Activation/deactivation

### Use Cases Implemented
1. **CreateProductUseCase** - Handles product creation with comprehensive validation
2. **GetAllProductsUseCase** - Retrieves products with filtering and pagination
3. **GetProductByIdUseCase** - Fetches single product with population
4. **UpdateProductUseCase** - Updates product with business validation
5. **DeleteProductUseCase** - Handles product deletion
6. **GetProductsByCategoryUseCase** - Category-based filtering
7. **GetLowStockProductsUseCase** - Low stock reporting

### Business Validations
- Required fields validation (name, SKU, price, cost price, category, supplier, size, color, material)
- Price validations (must be greater than 0)
- Quantity validations (cannot be negative)
- SKU uniqueness constraint handling
- Size enum validation
- Image format validation

## Integration with Main App

To integrate this module with your main app.js:

```javascript
// In app.js
import productRoutes from './src/product/interfaces/routes/ProductRoutes.js';

// Use the routes
app.use('/api/products', productRoutes);
```

## API Endpoints

- `GET /api/products` - Get all products with filters
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/category/:categoryId` - Get products by category
- `GET /api/products/reports/low-stock` - Get low stock products

## Benefits

1. **Clean Architecture**: Clear separation of concerns across layers
2. **Business Logic Encapsulation**: All business rules in use cases and entities
3. **Testability**: Each layer can be tested independently
4. **Maintainability**: Easy to modify and extend
5. **Consistent Structure**: Follows the same pattern as order module
6. **Domain-Driven**: Rich domain entities with business methods

This implementation maintains all functionality from your existing product system while organizing it in a clean, modular, and maintainable structure.
