// Repository interface for categories - defines the contract
export class CategoryRepository {
  async findAll() {
    throw new Error('Method not implemented');
  }

  async findById(id) {
    throw new Error('Method not implemented');
  }

  async create(categoryData) {
    throw new Error('Method not implemented');
  }

  async update(id, categoryData) {
    throw new Error('Method not implemented');
  }

  async delete(id) {
    throw new Error('Method not implemented');
  }

  async findByName(name) {
    throw new Error('Method not implemented');
  }

  async findParentCategories() {
    throw new Error('Method not implemented');
  }

  async findSubcategories(parentId) {
    throw new Error('Method not implemented');
  }
}

export default CategoryRepository;
