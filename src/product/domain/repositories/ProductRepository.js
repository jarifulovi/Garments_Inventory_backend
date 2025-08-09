// Repository interface for products - defines the contract
export class ProductRepository {
  async findAll(filters = {}) {
    throw new Error('Method not implemented');
  }

  async findById(id) {
    throw new Error('Method not implemented');
  }

  async create(productData) {
    throw new Error('Method not implemented');
  }

  async update(id, productData) {
    throw new Error('Method not implemented');
  }

  async delete(id) {
    throw new Error('Method not implemented');
  }

  async findByCategory(categoryId) {
    throw new Error('Method not implemented');
  }

  async findLowStock() {
    throw new Error('Method not implemented');
  }
}

export default ProductRepository;
