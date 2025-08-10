// System module - provides dashboard overview and system statistics
// This module aggregates data from all other modules (products, categories, suppliers, orders)

export { SystemService } from './SystemService.js';
export { default as SystemController } from './interfaces/controllers/SystemController.js';
export { default as systemRoutes } from './interfaces/routes/SystemRoutes.js';
