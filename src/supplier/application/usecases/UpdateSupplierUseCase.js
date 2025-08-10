// Use case for updating a supplier
export class UpdateSupplierUseCase {
  constructor(supplierRepository) {
    this.supplierRepository = supplierRepository;
  }

  async execute(id, supplierData) {
    try {
      if (!id) {
        return {
          success: false,
          error: 'Supplier ID is required'
        };
      }

      // Business validation for email if provided
      if (supplierData.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(supplierData.email)) {
          return {
            success: false,
            error: 'Invalid email format'
          };
        }
      }

      // Phone validation if provided
      if (supplierData.phone) {
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(supplierData.phone)) {
          return {
            success: false,
            error: 'Invalid phone number format'
          };
        }
      }

      // Payment terms validation if provided
      if (supplierData.paymentTerms) {
        const validTerms = ['Net 15', 'Net 30', 'Net 45', 'Net 60', 'Immediate', 'COD'];
        if (!validTerms.includes(supplierData.paymentTerms)) {
          return {
            success: false,
            error: 'Invalid payment terms'
          };
        }
      }

      // Rating validation if provided
      if (supplierData.rating !== undefined && (supplierData.rating < 1 || supplierData.rating > 5)) {
        return {
          success: false,
          error: 'Rating must be between 1 and 5'
        };
      }

      const supplier = await this.supplierRepository.update(id, supplierData);
      
      if (!supplier) {
        return {
          success: false,
          error: 'Supplier not found'
        };
      }

      return {
        success: true,
        data: supplier,
        message: 'Supplier updated successfully'
      };
    } catch (error) {
      // Handle unique constraint violation for email
      if (error.code === 11000 && error.keyPattern?.email) {
        return {
          success: false,
          error: 'Email already exists'
        };
      }
      
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default UpdateSupplierUseCase;
