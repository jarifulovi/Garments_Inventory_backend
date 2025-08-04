# Category Module Implementation - Clean Architecture

This category module follows Clean Architecture principles as specified in structure.txt and supports hierarchical categories with parent-child relationships.

## Directory Structure

```
src/category/
├── application/
│   ├── services/
│   │   └── CategoryService.js           ← Orchestrates use cases
│   └── usecases/
│       ├── CreateCategoryUseCase.js      ← Business logic for creating categories
│       ├── GetAllCategoriesUseCase.js    ← Business logic for getting all categories
│       ├── GetCategoryByIdUseCase.js     ← Business logic for getting category by ID
│       ├── UpdateCategoryUseCase.js      ← Business logic for updating categories
│       ├── DeleteCategoryUseCase.js      ← Business logic for deleting categories
│       ├── GetParentCategoriesUseCase.js ← Business logic for parent categories
│       └── GetSubcategoriesUseCase.js    ← Business logic for subcategories
├── domain/
│   ├── entities/
│   │   └── CategoryEntity.js            ← Core business object with domain methods
│   └── repositories/
│       └── CategoryRepository.js        ← Abstract repository interface
├── infrastructure/
│   ├── repositories/
│   │   └── MongoCategoryRepository.js   ← Concrete MongoDB implementation
│   └── schemas/
│       └── CategorySchema.js            ← MongoDB schema definition
├── interfaces/
│   ├── controllers/
│   │   └── CategoryController.js        ← Express HTTP controllers
│   └── routes/
│       └── CategoryRoutes.js            ← Express route definitions
└── index.js                             ← Module exports
```

## Request Flow

```
HTTP Request → CategoryRoutes.js → CategoryController.js → CategoryService.js → UseCase.js → CategoryRepository (interface) → MongoCategoryRepository.js → MongoDB
```

## Key Features

### Hierarchical Category System
- **Two-Level Hierarchy**: Parent categories and subcategories
- **Self-Reference Prevention**: Categories cannot be their own parent
- **Hierarchical Constraints**: Subcategories cannot have their own subcategories
- **Parent-Child Relationships**: Proper population and management

### Category Entity Business Methods
- **Validation**: Name, description, image format validation
- **Hierarchy Management**: Parent/subcategory detection, level calculation
- **Path Generation**: Full path display, breadcrumb creation
- **Image Management**: Format validation, image handling
- **Status Management**: Activation/deactivation
- **Business Logic**: Deletion constraints, slug generation

### Use Cases Implemented
1. **CreateCategoryUseCase** - Handles category creation with hierarchy validation
2. **GetAllCategoriesUseCase** - Retrieves categories with hierarchy options
3. **GetCategoryByIdUseCase** - Fetches single category with relationships
4. **UpdateCategoryUseCase** - Updates categories with hierarchy constraints
5. **DeleteCategoryUseCase** - Handles deletion with business rule enforcement
6. **GetParentCategoriesUseCase** - Retrieves top-level categories
7. **GetSubcategoriesUseCase** - Retrieves subcategories of a parent

### Business Validations
- **Required Fields**: Name (2-50 characters)
- **Uniqueness**: Category name uniqueness constraint
- **Hierarchy Rules**: Maximum 2-level hierarchy, no self-referencing
- **Deletion Constraints**: Cannot delete categories with products or subcategories
- **Image Format**: Only jpg, jpeg, png, gif allowed
- **Parent-Child Logic**: Subcategories cannot become parents if they have products

### Advanced Features
- **Soft Delete**: Deactivate categories instead of hard deletion
- **Restore Functionality**: Reactivate deactivated categories
- **Hierarchy Display**: Get categories in hierarchical structure
- **Search and Filtering**: Active/inactive filtering
- **Product Count**: Virtual field for products in each category
- **Breadcrumb Navigation**: Automatic breadcrumb generation

## Integration with Main App

To integrate this module with your main app.js:

```javascript
// In app.js
import categoryRoutes from './src/category/interfaces/routes/CategoryRoutes.js';

// Use the routes
app.use('/api/categories', categoryRoutes);
```

## API Endpoints

### Basic CRUD
- `GET /api/categories` - Get all categories with optional hierarchy
- `GET /api/categories/:id` - Get category by ID with relationships
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category (hard delete)

### Hierarchy Specific
- `GET /api/categories/hierarchy` - Get categories in hierarchical structure
- `GET /api/categories/parents` - Get parent categories only
- `GET /api/categories/subcategories/:parentId` - Get subcategories of a parent
- `GET /api/categories/active` - Get active categories only

### Status Management
- `PUT /api/categories/:id/deactivate` - Soft delete (deactivate)
- `PUT /api/categories/:id/restore` - Restore deactivated category

## Sample Data Structure

### Parent Category
```javascript
{
  "name": "Clothing",
  "description": "All types of clothing items",
  "parentCategory": null,
  "isActive": true,
  "image": "clothing.jpg"
}
```

### Subcategory
```javascript
{
  "name": "Men's Shirts",
  "description": "Shirts for men",
  "parentCategory": "60f7b3b3b3b3b3b3b3b3b3b3", // ID of "Clothing"
  "isActive": true,
  "image": "mens-shirts.jpg"
}
```

## Business Rules

1. **Hierarchy Constraints**
   - Maximum 2-level hierarchy (parent → subcategory)
   - Categories cannot be their own parent
   - Subcategories cannot have subcategories

2. **Deletion Rules**
   - Cannot delete categories with products
   - Cannot delete parent categories with subcategories
   - Must delete/move products and subcategories first

3. **Name Uniqueness**
   - Category names must be unique across the entire system
   - Case-insensitive uniqueness checking

4. **Status Management**
   - Inactive categories cannot be set as parents
   - Deactivating a category affects its children's visibility

## Benefits

1. **Clean Architecture**: Clear separation of concerns across layers
2. **Hierarchical Support**: Full support for category hierarchies with business rules
3. **Rich Domain Model**: Category entity with comprehensive business methods
4. **Flexible Querying**: Multiple ways to retrieve and filter categories
5. **Data Integrity**: Strong validation and constraint enforcement
6. **Extensible Design**: Easy to add more hierarchy levels or features
7. **Business Logic Encapsulation**: All business rules in use cases and entities

This implementation maintains all functionality from your existing category system while organizing it in a clean, modular structure and adding advanced hierarchical features following the same patterns as the other modules.
