# System Module

This module provides system-wide dashboard overview and statistics by aggregating data from all other modules (products, categories, suppliers, orders). It directly uses the MongoDB schemas to provide real-time statistics and insights.

## Endpoints

### GET /api/system/totaldoc
Get simple total document counts for all 4 schemas.

**Response:**
```json
{
  "success": true,
  "data": {
    "products": 150,
    "categories": 25,
    "suppliers": 18,
    "orders": 345,
    "generatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### GET /api/system/overview
Get overall overview with detailed counts and metrics.

**Response:**
```json
{
  "success": true,
  "data": {
    "products": {
      "total": 150,
      "active": 142,
      "inactive": 8,
      "lowStock": 12
    },
    "categories": {
      "total": 25,
      "active": 23,
      "inactive": 2
    },
    "suppliers": {
      "total": 18,
      "active": 16,
      "inactive": 2
    },
    "orders": {
      "total": 345,
      "pending": 12,
      "delivered": 298,
      "sale": 200,
      "purchase": 145
    },
    "revenue": {
      "total": 125000.50,
      "thisMonth": 15400.75
    },
    "generatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### GET /api/system/stats
Get detailed statistics with aggregations and analytics.

**Response:**
```json
{
  "success": true,
  "data": {
    "productsByCategory": [
      {
        "_id": "categoryId",
        "categoryName": "T-Shirts",
        "count": 45,
        "totalValue": 12500.00
      }
    ],
    "ordersByStatus": [
      {
        "_id": "delivered",
        "count": 298,
        "totalValue": 98750.25
      }
    ],
    "revenueByMonth": [
      {
        "_id": { "year": 2024, "month": 1 },
        "revenue": 15400.75,
        "orders": 24
      }
    ],
    "topProducts": [
      {
        "_id": "productId",
        "productName": "Basic T-Shirt",
        "totalQuantity": 150,
        "totalRevenue": 4500.00
      }
    ],
    "generatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### GET /api/system/health
Get system health metrics and alerts.

**Response:**
```json
{
  "success": true,
  "data": {
    "alerts": {
      "outOfStockProducts": 5,
      "overdueOrders": 2,
      "inactiveSuppliers": 3
    },
    "details": {
      "outOfStockProducts": [
        {
          "_id": "productId",
          "name": "Product Name",
          "sku": "SKU001"
        }
      ],
      "overdueOrders": [
        {
          "_id": "orderId",
          "orderNumber": "ORD-2024-001",
          "expectedDeliveryDate": "2024-01-10T00:00:00.000Z",
          "status": "pending"
        }
      ],
      "inactiveSuppliers": [
        {
          "_id": "supplierId",
          "name": "Supplier Name",
          "email": "supplier@example.com"
        }
      ],
      "recentOrders": [
        {
          "_id": "orderId",
          "orderNumber": "ORD-2024-002",
          "type": "sale",
          "total": 150.00,
          "status": "pending",
          "createdAt": "2024-01-15T08:00:00.000Z"
        }
      ]
    },
    "generatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### GET /api/system/combined
Combined endpoint for overview with basic overview and alerts.

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      // Same as /overview response
    },
    "alerts": {
      "outOfStockProducts": 5,
      "overdueOrders": 2,
      "inactiveSuppliers": 3
    },
    "generatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

## Architecture

This module follows the Clean Architecture pattern:

- **SystemService.js**: Contains the business logic for aggregating data from all schemas
- **SystemController.js**: Handles HTTP requests and responses
- **SystemRoutes.js**: Defines the API endpoints
- **index.js**: Module exports

## Direct Schema Access

The SystemService directly imports and uses the MongoDB schemas:
- `Product` from `../product/infrastructure/schemas/ProductSchema.js`
- `Category` from `../category/infrastructure/schemas/CategorySchema.js`
- `Supplier` from `../supplier/infrastructure/schemas/SupplierSchema.js`
- `Order` from `../order/infrastructure/schemas/OrderSchema.js`

This approach provides:
- **Performance**: Direct database queries without additional abstraction layers
- **Flexibility**: Complex aggregations and custom queries
- **Simplicity**: Minimal dependencies and straightforward implementation
- **Real-time data**: Always up-to-date statistics without caching complexity

## Usage

This module is primarily designed for:
- Dashboard widgets and overview screens
- Administrative reporting and analytics
- System monitoring and health checks
- Business intelligence and insights

The endpoints can be consumed by frontend applications to display real-time business metrics and system status.
