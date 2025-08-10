import Supplier from '../schemas/SupplierSchema.js';
import SupplierRepository from '../../domain/repositories/SupplierRepository.js';

// MongoDB implementation of SupplierRepository
export class MongoSupplierRepository extends SupplierRepository {
  async findAll(filters = {}) {
    const { page = 1, limit = 10, search, isActive } = filters;
    const query = {};

    // Filter by active status (default to active only)
    if (isActive !== undefined) {
      query.isActive = isActive;
    } else {
      query.isActive = true;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const suppliers = await Supplier.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ name: 1 });

    const total = await Supplier.countDocuments(query);

    return {
      suppliers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async findById(id) {
    return await Supplier.findById(id);
  }

  async create(supplierData) {
    const supplier = new Supplier(supplierData);
    return await supplier.save();
  }

  async update(id, supplierData) {
    return await Supplier.findByIdAndUpdate(
      id,
      supplierData,
      { new: true, runValidators: true }
    );
  }

  async delete(id) {
    return await Supplier.findByIdAndDelete(id);
  }

  async findByEmail(email) {
    return await Supplier.findOne({ email: email.toLowerCase() });
  }

  async findActiveSuppliers() {
    return await Supplier.find({ isActive: true }).sort({ name: 1 });
  }

  async findByRating(minRating) {
    return await Supplier.find({ 
      rating: { $gte: minRating },
      isActive: true 
    }).sort({ rating: -1, name: 1 });
  }

  async getAnalytics() {
    // Get total suppliers count
    const totalSuppliers = await Supplier.countDocuments({});
    
    // Get active suppliers count
    const activeSuppliers = await Supplier.countDocuments({ isActive: true });
    
    // Get distinct countries count
    const distinctCountries = await Supplier.distinct('address.country');
    const totalCountries = distinctCountries.length;
    
    // Calculate average rating
    const ratingAggregation = await Supplier.aggregate([
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalRated: { $sum: 1 }
        }
      }
    ]);
    
    const averageRating = ratingAggregation.length > 0 
      ? Math.round(ratingAggregation[0].averageRating * 100) / 100 
      : 0;
    
    return {
      totalSuppliers,
      activeSuppliers,
      inactiveSuppliers: totalSuppliers - activeSuppliers,
      totalCountries,
      averageRating,
      activePercentage: totalSuppliers > 0 
        ? Math.round((activeSuppliers / totalSuppliers) * 100) 
        : 0
    };
  }
}

export default MongoSupplierRepository;
