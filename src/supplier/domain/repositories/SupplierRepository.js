// Repository interface for suppliers - defines the contract
export class SupplierRepository {
  async findAll(filters = {}) {
    throw new Error('Method not implemented');
  }

  async findById(id) {
    throw new Error('Method not implemented');
  }

  async create(supplierData) {
    throw new Error('Method not implemented');
  }

  async update(id, supplierData) {
    throw new Error('Method not implemented');
  }

  async delete(id) {
    throw new Error('Method not implemented');
  }
}

export default SupplierRepository;
