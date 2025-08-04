# Garments Inventory Management System - Backend

A Node.js backend API for garments inventory management built with Clean Architecture principles.

## Overview

RESTful API backend providing comprehensive inventory management for garments businesses, featuring product catalog, supplier management, order processing, and hierarchical category organization.

## Tech Stack

- **Runtime**: Node.js + Express.js
- **Database**: MongoDB + Mongoose ODM
- **Architecture**: Clean Architecture Pattern
- **API**: RESTful endpoints with JSON responses

## Core Features

- **Product Management**: Catalog with stock tracking, pricing, and specifications
- **Category System**: Hierarchical organization with parent-child relationships  
- **Supplier Management**: Contact info, ratings, and business details
- **Order Processing**: Status tracking with customer/supplier workflows
- **Stock Monitoring**: Low stock alerts and inventory reporting

## Architecture

Clean Architecture with feature-based modules:

```
src/
├── shared/           # Database config, middleware, utilities
├── order/            # Order domain with complete CRUD + status management
├── product/          # Product domain with stock tracking + category filtering
├── supplier/         # Supplier domain with rating system + contact management
└── category/         # Category domain with hierarchy + parent-child validation
```

Each module follows: **Domain** → **Application** → **Infrastructure** → **Interfaces**

## API Endpoints

| Resource | Endpoints | Features |
|----------|-----------|----------|
| **Products** | `/api/products` | CRUD, stock tracking, category filtering, low-stock reports |
| **Categories** | `/api/categories` | CRUD, hierarchy management, parent/subcategory operations |
| **Suppliers** | `/api/suppliers` | CRUD, contact management, rating system |
| **Orders** | `/api/orders` | CRUD, status tracking, customer/supplier workflows |

## Quick Setup

1. **Install**: `npm install`
2. **Environment**: Create `.env` with `MONGODB_URI` and `PORT`
3. **Run**: `npm start`
4. **Access**: `http://localhost:3000`

## Development

- Each feature module has its own README with detailed implementation
- Follow Clean Architecture patterns when adding new features
- Business logic in domain layer, framework code in interfaces layer
- Database implementations in infrastructure layer
