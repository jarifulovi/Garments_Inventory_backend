import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, errorHandler } from './src/shared/index.js';

// Import clean architecture routes
import { registerCleanArchitectureRoutes } from './src/index.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Garments Inventory Management System',
    version: '2.0.0',
    architecture: 'Clean Architecture',
    endpoints: [
      '/api/products',
      '/api/categories',
      '/api/suppliers',
      '/api/orders',
      '/api/system'
    ]
  });
});

// Clean Architecture API Routes
registerCleanArchitectureRoutes(app);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('Architecture: Clean Architecture Pattern');
    console.log('Available endpoints:');
    console.log('  - GET  /api/products');
    console.log('  - GET  /api/categories');
    console.log('  - GET  /api/suppliers');
    console.log('  - GET  /api/orders');
    console.log('  - GET  /api/system/totaldoc');
    console.log('  - GET  /api/system/overview');
    console.log('  - GET  /api/system/stats');
    console.log('  - GET  /api/system/health');
    console.log('  - GET  /api/system/combined');
  });
};

startServer();

export default app;
