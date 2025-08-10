import Product from '../product/infrastructure/schemas/ProductSchema.js';
import Category from '../category/infrastructure/schemas/CategorySchema.js';
import Supplier from '../supplier/infrastructure/schemas/SupplierSchema.js';
import Order from '../order/infrastructure/schemas/OrderSchema.js';

export class SystemService {
  async getTotalDocOverview() {
    try {
      // Get simple document counts for all 4 schemas
      const [
        totalProducts,
        totalCategories,
        totalSuppliers,
        totalOrders
      ] = await Promise.all([
        Product.countDocuments({}),
        Category.countDocuments({}),
        Supplier.countDocuments({}),
        Order.countDocuments({})
      ]);

      return {
        products: totalProducts,
        categories: totalCategories,
        suppliers: totalSuppliers,
        orders: totalOrders,
        generatedAt: new Date()
      };
    } catch (error) {
      throw new Error(`Failed to get total document overview: ${error.message}`);
    }
  }

  async getOverallOverview() {
    try {
      // Get all counts in parallel for better performance
      const [
        totalProducts,
        activeProducts,
        lowStockProducts,
        totalCategories,
        activeCategories,
        totalSuppliers,
        activeSuppliers,
        totalOrders,
        pendingOrders,
        deliveredOrders,
        saleOrders,
        purchaseOrders
      ] = await Promise.all([
        Product.countDocuments({}),
        Product.countDocuments({ isActive: true }),
        Product.countDocuments({
          $expr: { $lte: ["$quantity", "$minStockLevel"] }
        }),
        Category.countDocuments({}),
        Category.countDocuments({ isActive: true }),
        Supplier.countDocuments({}),
        Supplier.countDocuments({ isActive: true }),
        Order.countDocuments({}),
        Order.countDocuments({ status: 'pending' }),
        Order.countDocuments({ status: 'delivered' }),
        Order.countDocuments({ type: 'sale' }),
        Order.countDocuments({ type: 'purchase' })
      ]);

      // Calculate revenue from delivered sale orders
      const revenueData = await Order.aggregate([
        { 
          $match: { 
            type: 'sale', 
            status: 'delivered' 
          } 
        },
        { 
          $group: { 
            _id: null, 
            totalRevenue: { $sum: '$total' } 
          } 
        }
      ]);

      // Calculate this month's revenue
      const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      const thisMonthRevenueData = await Order.aggregate([
        { 
          $match: { 
            type: 'sale', 
            status: 'delivered',
            createdAt: { $gte: startOfMonth }
          } 
        },
        { 
          $group: { 
            _id: null, 
            thisMonthRevenue: { $sum: '$total' } 
          } 
        }
      ]);

      return {
        products: {
          total: totalProducts,
          active: activeProducts,
          inactive: totalProducts - activeProducts,
          lowStock: lowStockProducts
        },
        categories: {
          total: totalCategories,
          active: activeCategories,
          inactive: totalCategories - activeCategories
        },
        suppliers: {
          total: totalSuppliers,
          active: activeSuppliers,
          inactive: totalSuppliers - activeSuppliers
        },
        orders: {
          total: totalOrders,
          pending: pendingOrders,
          delivered: deliveredOrders,
          sale: saleOrders,
          purchase: purchaseOrders
        },
        revenue: {
          total: revenueData[0]?.totalRevenue || 0,
          thisMonth: thisMonthRevenueData[0]?.thisMonthRevenue || 0
        },
        generatedAt: new Date()
      };
    } catch (error) {
      throw new Error(`Failed to get dashboard overview: ${error.message}`);
    }
  }

  async getDetailedStats() {
    try {
      // Get more detailed statistics
      const [
        productsByCategory,
        ordersByStatus,
        revenueByMonth,
        topProducts
      ] = await Promise.all([
        // Products grouped by category
        Product.aggregate([
          {
            $lookup: {
              from: 'categories',
              localField: 'category',
              foreignField: '_id',
              as: 'categoryInfo'
            }
          },
          {
            $group: {
              _id: '$category',
              categoryName: { $first: { $arrayElemAt: ['$categoryInfo.name', 0] } },
              count: { $sum: 1 },
              totalValue: { $sum: { $multiply: ['$price', '$quantity'] } }
            }
          },
          { $sort: { count: -1 } }
        ]),

        // Orders grouped by status
        Order.aggregate([
          {
            $group: {
              _id: '$status',
              count: { $sum: 1 },
              totalValue: { $sum: '$total' }
            }
          },
          { $sort: { count: -1 } }
        ]),

        // Revenue by month (last 6 months)
        Order.aggregate([
          {
            $match: {
              type: 'sale',
              status: 'delivered',
              createdAt: {
                $gte: new Date(new Date().setMonth(new Date().getMonth() - 6))
              }
            }
          },
          {
            $group: {
              _id: {
                year: { $year: '$createdAt' },
                month: { $month: '$createdAt' }
              },
              revenue: { $sum: '$total' },
              orders: { $sum: 1 }
            }
          },
          { $sort: { '_id.year': 1, '_id.month': 1 } }
        ]),

        // Top selling products (by quantity sold)
        Order.aggregate([
          { $match: { type: 'sale', status: 'delivered' } },
          { $unwind: '$items' },
          {
            $group: {
              _id: '$items.product',
              totalQuantity: { $sum: '$items.quantity' },
              totalRevenue: { $sum: '$items.totalPrice' }
            }
          },
          {
            $lookup: {
              from: 'products',
              localField: '_id',
              foreignField: '_id',
              as: 'productInfo'
            }
          },
          {
            $project: {
              productName: { $arrayElemAt: ['$productInfo.name', 0] },
              totalQuantity: 1,
              totalRevenue: 1
            }
          },
          { $sort: { totalQuantity: -1 } },
          { $limit: 10 }
        ])
      ]);

      return {
        productsByCategory,
        ordersByStatus,
        revenueByMonth,
        topProducts,
        generatedAt: new Date()
      };
    } catch (error) {
      throw new Error(`Failed to get detailed stats: ${error.message}`);
    }
  }

  async getSystemHealth() {
    try {
      // Check system health metrics
      const [
        outOfStockProducts,
        overdueOrders,
        inactiveSuppliers,
        recentOrders
      ] = await Promise.all([
        Product.find({ quantity: 0, isActive: true }).select('name sku'),
        Order.find({
          status: { $in: ['pending', 'confirmed', 'processing'] },
          expectedDeliveryDate: { $lt: new Date() }
        }).select('orderNumber expectedDeliveryDate status'),
        Supplier.find({ isActive: false }).select('name email'),
        Order.find({}).sort({ createdAt: -1 }).limit(5).select('orderNumber type total status createdAt')
      ]);

      return {
        alerts: {
          outOfStockProducts: outOfStockProducts.length,
          overdueOrders: overdueOrders.length,
          inactiveSuppliers: inactiveSuppliers.length
        },
        details: {
          outOfStockProducts,
          overdueOrders,
          inactiveSuppliers,
          recentOrders
        },
        generatedAt: new Date()
      };
    } catch (error) {
      throw new Error(`Failed to get system health: ${error.message}`);
    }
  }
}
