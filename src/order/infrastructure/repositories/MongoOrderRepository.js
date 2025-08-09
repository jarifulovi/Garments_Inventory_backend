import Order from '../schemas/OrderSchema.js';
import Product from '../../../product/infrastructure/schemas/ProductSchema.js';
import OrderRepository from '../../domain/repositories/OrderRepository.js';

// MongoDB implementation of OrderRepository
export class MongoOrderRepository extends OrderRepository {
  async findAll(filters = {}) {
    const { page = 1, limit = 10, type, status } = filters;
    const query = {};

    if (type) query.type = type;
    if (status) query.status = status;

    const orders = await Order.find(query)
      .populate('supplier', 'name')
      .populate('items.product', 'name sku')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Order.countDocuments(query);

    return {
      orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async findById(id) {
    return await Order.findById(id)
      .populate('supplier')
      .populate('items.product');
  }

  async create(orderData) {
    // Calculate item totals
    const items = orderData.items.map(item => ({
      ...item,
      totalPrice: item.quantity * item.unitPrice
    }));

    const orderDataWithTotals = {
      ...orderData,
      items
    };

    const order = new Order(orderDataWithTotals);
    const savedOrder = await order.save();

    // Update product quantities
    if (savedOrder.type === 'purchase') {
      // Increase inventory for purchase orders
      for (const item of savedOrder.items) {
        await Product.findByIdAndUpdate(
          item.product,
          { $inc: { quantity: item.quantity } }
        );
      }
    } else if (savedOrder.type === 'sale') {
      // Decrease inventory for sale orders
      for (const item of savedOrder.items) {
        await Product.findByIdAndUpdate(
          item.product,
          { $inc: { quantity: -item.quantity } }
        );
      }
    }

    return savedOrder;
  }

  async update(id, orderData) {
    return await Order.findByIdAndUpdate(
      id,
      orderData,
      { new: true, runValidators: true }
    );
  }

  async delete(id) {
    return await Order.findByIdAndDelete(id);
  }

  async updateStatus(id, status) {
    return await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
  }

  async getAnalytics() {
    // Get total orders count
    const totalOrders = await Order.countDocuments({});
    
    // Get sales and purchase analytics
    const salesAnalytics = await Order.aggregate([
      { $match: { type: 'sale' } },
      {
        $group: {
          _id: null,
          totalSales: { $sum: 1 },
          totalSalesRevenue: { $sum: '$total' },
          totalSalesSubtotal: { $sum: '$subtotal' },
          totalSalesTax: { $sum: '$tax' },
          totalSalesDiscount: { $sum: '$discount' }
        }
      }
    ]);

    const purchaseAnalytics = await Order.aggregate([
      { $match: { type: 'purchase' } },
      {
        $group: {
          _id: null,
          totalPurchases: { $sum: 1 },
          totalPurchaseCost: { $sum: '$total' },
          totalPurchaseSubtotal: { $sum: '$subtotal' },
          totalPurchaseTax: { $sum: '$tax' },
          totalPurchaseDiscount: { $sum: '$discount' }
        }
      }
    ]);

    // Extract data with defaults
    const salesData = salesAnalytics.length > 0 ? salesAnalytics[0] : {
      totalSales: 0,
      totalSalesRevenue: 0,
      totalSalesSubtotal: 0,
      totalSalesTax: 0,
      totalSalesDiscount: 0
    };

    const purchaseData = purchaseAnalytics.length > 0 ? purchaseAnalytics[0] : {
      totalPurchases: 0,
      totalPurchaseCost: 0,
      totalPurchaseSubtotal: 0,
      totalPurchaseTax: 0,
      totalPurchaseDiscount: 0
    };

    // Calculate derived metrics
    const totalRevenue = salesData.totalSalesRevenue;
    const totalCost = purchaseData.totalPurchaseCost;
    const totalProfit = totalRevenue - totalCost;
    const totalEarningsInSales = salesData.totalSalesRevenue;
    const totalEarningsInPurchase = purchaseData.totalPurchaseCost;

    return {
      totalOrders,
      totalSales: salesData.totalSales,
      totalPurchases: purchaseData.totalPurchases,
      totalSalesRevenue: Math.round(salesData.totalSalesRevenue * 100) / 100,
      totalPurchaseCost: Math.round(purchaseData.totalPurchaseCost * 100) / 100,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      totalCost: Math.round(totalCost * 100) / 100,
      totalProfit: Math.round(totalProfit * 100) / 100,
      totalEarningsInSales: Math.round(totalEarningsInSales * 100) / 100,
      totalEarningsInPurchase: Math.round(totalEarningsInPurchase * 100) / 100,
      profitMargin: totalRevenue > 0 ? Math.round((totalProfit / totalRevenue) * 100) : 0,
      salesVsPurchasesRatio: purchaseData.totalPurchases > 0 
        ? Math.round((salesData.totalSales / purchaseData.totalPurchases) * 100) / 100 
        : salesData.totalSales
    };
  }
}

export default MongoOrderRepository;
