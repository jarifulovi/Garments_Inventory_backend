// Main integration file for clean architecture modules
import OrderRoutes from './order/interfaces/routes/OrderRoutes.js';
import ProductRoutes from './product/interfaces/routes/ProductRoutes.js';
import SupplierRoutes from './supplier/interfaces/routes/SupplierRoutes.js';
import CategoryRoutes from './category/interfaces/routes/CategoryRoutes.js';
import SystemRoutes from './system/interfaces/routes/SystemRoutes.js';

// Export clean architecture routes
export {
  OrderRoutes,
  ProductRoutes,
  SupplierRoutes,
  CategoryRoutes,
  SystemRoutes
};

// Export all modules for easy integration
export * from './order/index.js';
export * from './product/index.js';
export * from './supplier/index.js';
export * from './category/index.js';
export * from './system/index.js';

// Helper function to register all clean architecture routes
export const registerCleanArchitectureRoutes = (app) => {
  app.use('/api/orders', OrderRoutes);
  app.use('/api/products', ProductRoutes);
  app.use('/api/suppliers', SupplierRoutes);
  app.use('/api/categories', CategoryRoutes);
  app.use('/api/system', SystemRoutes);
};
