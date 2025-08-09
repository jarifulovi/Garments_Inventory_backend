import Category from '../schemas/CategorySchema.js';
import CategoryRepository from '../../domain/repositories/CategoryRepository.js';

// MongoDB implementation of CategoryRepository
export class MongoCategoryRepository extends CategoryRepository {
  async findAll() {
    return await Category.find({ isActive: true })
      .populate('parentCategory', '_id name')
      .sort({ name: 1 });
  }

  async findById(id) {
    return await Category.findById(id)
      .populate('parentCategory', '_id name');
  }

  async create(categoryData) {
    const category = new Category(categoryData);
    return await category.save();
  }

  async update(id, categoryData) {
    return await Category.findByIdAndUpdate(
      id,
      categoryData,
      { new: true, runValidators: true }
    ).populate('parentCategory', '_id name');
  }

  async delete(id) {
    return await Category.findByIdAndDelete(id);
  }

  async findByName(name) {
    return await Category.findOne({ 
      name: { $regex: new RegExp(`^${name}$`, 'i') } 
    });
  }

  async findParentCategories() {
    return await Category.find({ 
      parentCategory: null, 
      isActive: true 
    })
      .populate('subcategories', 'name isActive')
      .sort({ name: 1 });
  }

  async findSubcategories(parentId) {
    return await Category.find({ 
      parentCategory: parentId, 
      isActive: true 
    })
      .populate('parentCategory', '_id name')
      .sort({ name: 1 });
  }

  async findAllWithHierarchy() {
    // Find all parent categories with their subcategories
    return await Category.find({ 
      parentCategory: null, 
      isActive: true 
    })
      .populate({
        path: 'subcategories',
        match: { isActive: true },
        select: 'name description image isActive',
        options: { sort: { name: 1 } }
      })
      .sort({ name: 1 });
  }

  async findActiveCategories() {
    return await Category.find({ isActive: true })
      .populate('parentCategory', '_id name')
      .sort({ name: 1 });
  }

  async findInactiveCategories() {
    return await Category.find({ isActive: false })
      .populate('parentCategory', '_id name')
      .sort({ name: 1 });
  }

  async findAllIncludingInactive() {
    return await Category.find({})
      .populate('parentCategory', '_id name')
      .sort({ name: 1 });
  }

  async countProductsInCategory(categoryId) {
    // This would require access to Product model, but keeping interface clean
    // Implementation can be added when Product model is available
    const category = await Category.findById(categoryId).populate('productsCount');
    return category ? category.productsCount : 0;
  }

  async softDelete(id) {
    return await Category.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
  }

  async restore(id) {
    return await Category.findByIdAndUpdate(
      id,
      { isActive: true },
      { new: true }
    );
  }
}

export default MongoCategoryRepository;
