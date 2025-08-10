# Supplier Module Implementation - Clean Architecture

This supplier module follows Clean Architecture principles as specified in structure.txt.

## Directory Structure

```
src/supplier/
├── application/
│   ├── services/
│   │   └── SupplierService.js          ← Orchestrates use cases
│   └── usecases/
│       ├── CreateSupplierUseCase.js     ← Business logic for creating suppliers
│       ├── GetAllSuppliersUseCase.js    ← Business logic for getting all suppliers
│       ├── GetSupplierByIdUseCase.js    ← Business logic for getting supplier by ID
│       ├── UpdateSupplierUseCase.js     ← Business logic for updating suppliers
│       └── DeleteSupplierUseCase.js     ← Business logic for deleting suppliers
├── domain/
│   ├── entities/
│   │   └── SupplierEntity.js           ← Core business object with domain methods
│   └── repositories/
│       └── SupplierRepository.js       ← Abstract repository interface
├── infrastructure/
│   ├── repositories/
│   │   └── MongoSupplierRepository.js  ← Concrete MongoDB implementation
│   └── schemas/
│       └── SupplierSchema.js           ← MongoDB schema definition
├── interfaces/
│   ├── controllers/
│   │   └── SupplierController.js       ← Express HTTP controllers
│   └── routes/
│       └── SupplierRoutes.js           ← Express route definitions
└── index.js                            ← Module exports
```

## Request Flow

```
HTTP Request → SupplierRoutes.js → SupplierController.js → SupplierService.js → UseCase.js → SupplierRepository (interface) → MongoSupplierRepository.js → MongoDB
```

## Key Features

### Supplier Entity Business Methods
- **Validation**: Email, phone, payment terms, rating validation
- **Address Management**: Full address formatting, completeness checks
- **Contact Management**: Contact person information handling
- **Status Management**: Activation/deactivation, rating management
- **Business Logic**: Good/poor rating checks, active supplier checks

### Use Cases Implemented
1. **CreateSupplierUseCase** - Handles supplier creation with comprehensive validation
2. **GetAllSuppliersUseCase** - Retrieves suppliers with filtering and pagination
3. **GetSupplierByIdUseCase** - Fetches single supplier
4. **UpdateSupplierUseCase** - Updates supplier with business validation
5. **DeleteSupplierUseCase** - Handles supplier deletion

### Business Validations
- **Required Fields**: Name, email, phone, business license, complete address, contact person
- **Format Validations**: Email format, phone number format
- **Business Rules**: Payment terms validation, rating range (1-5)
- **Uniqueness**: Email uniqueness constraint
- **Data Integrity**: Complete address and contact person validation

### Additional Features
- **Search Functionality**: Text search across supplier name and email
- **Active/Inactive Filtering**: Filter suppliers by status
- **Rating-Based Filtering**: Find suppliers by minimum rating
- **Comprehensive Address Support**: Street, city, state, zip code, country
- **Contact Person Management**: Name, designation, phone, email

## Integration with Main App

To integrate this module with your main app.js:

```javascript
// In app.js
import supplierRoutes from './src/supplier/interfaces/routes/SupplierRoutes.js';

// Use the routes
app.use('/api/suppliers', supplierRoutes);
```

## API Endpoints

- `GET /api/suppliers` - Get all suppliers with filters
- `GET /api/suppliers/:id` - Get supplier by ID
- `POST /api/suppliers` - Create new supplier
- `PUT /api/suppliers/:id` - Update supplier
- `DELETE /api/suppliers/:id` - Delete supplier
- `GET /api/suppliers/active` - Get active suppliers only
- `GET /api/suppliers/rating/:minRating` - Get suppliers by minimum rating

## Sample Data Structure

```javascript
{
  "name": "ABC Textiles Ltd",
  "email": "contact@abctextiles.com",
  "phone": "+1-555-123-4567",
  "address": {
    "street": "123 Industrial Ave",
    "city": "Manufacturing City",
    "state": "State",
    "zipCode": "12345",
    "country": "Country"
  },
  "contactPerson": {
    "name": "John Doe",
    "designation": "Sales Manager",
    "phone": "+1-555-123-4568",
    "email": "john.doe@abctextiles.com"
  },
  "businessLicense": "BL123456789",
  "taxId": "TX987654321",
  "paymentTerms": "Net 30",
  "rating": 4,
  "isActive": true,
  "notes": "Reliable supplier for premium fabrics"
}
```

## Benefits

1. **Clean Architecture**: Clear separation of concerns across layers
2. **Business Logic Encapsulation**: All business rules in use cases and entities
3. **Rich Domain Model**: Supplier entity with comprehensive business methods
4. **Comprehensive Validation**: Multiple layers of validation (format, business rules, data integrity)
5. **Extensibility**: Easy to add new features like supplier categories, performance metrics, etc.
6. **Maintainability**: Consistent structure across all modules
7. **Testability**: Each layer can be tested independently

This implementation maintains all functionality from your existing supplier system while organizing it in a clean, modular, and maintainable structure following the same patterns as the order and product modules.
