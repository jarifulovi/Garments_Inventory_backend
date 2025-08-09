import Product from '../schemas/ProductSchema.js';
import ProductRepository from '../../domain/repositories/ProductRepository.js';

// MongoDB implementation of ProductRepository
export class MongoProductRepository extends ProductRepository {
  async findAll(filters = {}) {
    const { page = 1, limit = 10, category, supplier, search } = filters;
    const query = {};

    // Build filter query
    if (category) query.category = category;
    if (supplier) query.supplier = supplier;
    if (search) {
      query.$text = { $search: search };
    }

    const products = await Product.find(query)
      .populate('category', 'name')
      .populate('supplier', 'name')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(query);

    return {
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async findById(id) {
    return await Product.findById(id)
      .populate('category')
      .populate('supplier');
  }

  async create(productData) {
    const product = new Product(productData);
    return await product.save();
  }

  async update(id, productData) {
    return await Product.findByIdAndUpdate(
      id,
      productData,
      { new: true, runValidators: true }
    );
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }

  async findByCategory(categoryId) {
    return await Product.find({ category: categoryId })
      .populate('category', 'name')
      .populate('supplier', 'name');
  }

  async findLowStock() {
    return await Product.find({
      $expr: { $lte: ['$quantity', '$minStockLevel'] }
    })
      .populate('category', 'name')
      .populate('supplier', 'name')
      .sort({ quantity: 1 });
  }

  async getAnalytics() {
    // Get basic product counts
    const totalProducts = await Product.countDocuments({});
    const activeProducts = await Product.countDocuments({ isActive: true });
    const inactiveProducts = totalProducts - activeProducts;
    
    // Get stock-related analytics using aggregation for efficiency
    const stockAnalytics = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalStock: { $sum: '$quantity' },
          lowStockCount: {
            $sum: {
              $cond: [
                { $lte: ['$quantity', '$minStockLevel'] },
                1,
                0
              ]
            }
          },
          outOfStockCount: {
            $sum: {
              $cond: [
                { $eq: ['$quantity', 0] },
                1,
                0
              ]
            }
          },
          averageStockLevel: { $avg: '$quantity' },
          totalValue: {
            $sum: { $multiply: ['$quantity', '$price'] }
          },
          totalCostValue: {
            $sum: { $multiply: ['$quantity', '$costPrice'] }
          }
        }
      }
    ]);

    const stockData = stockAnalytics.length > 0 ? stockAnalytics[0] : {
      totalStock: 0,
      lowStockCount: 0,
      outOfStockCount: 0,
      averageStockLevel: 0,
      totalValue: 0,
      totalCostValue: 0
    };

    // Calculate derived metrics
    const inStockProducts = totalProducts - stockData.outOfStockCount;
    const potentialProfit = stockData.totalValue - stockData.totalCostValue;

    return {
      totalProducts,
      activeProducts,
      inactiveProducts,
      inStockProducts,
      lowStockProducts: stockData.lowStockCount,
      outOfStockProducts: stockData.outOfStockCount,
      totalStock: stockData.totalStock,
      averageStockLevel: Math.round(stockData.averageStockLevel * 100) / 100,
      totalInventoryValue: Math.round(stockData.totalValue * 100) / 100,
      totalInventoryCost: Math.round(stockData.totalCostValue * 100) / 100,
      potentialProfit: Math.round(potentialProfit * 100) / 100,
      activeProductsPercentage: totalProducts > 0 
        ? Math.round((activeProducts / totalProducts) * 100) 
        : 0,
      lowStockPercentage: totalProducts > 0 
        ? Math.round((stockData.lowStockCount / totalProducts) * 100) 
        : 0,
      outOfStockPercentage: totalProducts > 0 
        ? Math.round((stockData.outOfStockCount / totalProducts) * 100) 
        : 0
    };
  }
}

export default MongoProductRepository;
