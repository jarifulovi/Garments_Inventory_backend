// Use case for creating a new supplier
export class CreateSupplierUseCase {
  constructor(supplierRepository) {
    this.supplierRepository = supplierRepository;
  }

  async execute(supplierData) {
    try {
      // Business validation
      if (!supplierData.name) {
        return {
          success: false,
          error: 'Supplier name is required'
        };
      }

      if (!supplierData.email) {
        return {
          success: false,
          error: 'Supplier email is required'
        };
      }

      if (!supplierData.phone) {
        return {
          success: false,
          error: 'Supplier phone is required'
        };
      }

      if (!supplierData.businessLicense) {
        return {
          success: false,
          error: 'Business license is required'
        };
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(supplierData.email)) {
        return {
          success: false,
          error: 'Invalid email format'
        };
      }

      // Phone validation
      const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(supplierData.phone)) {
        return {
          success: false,
          error: 'Invalid phone number format'
        };
      }

      // Address validation
      if (!supplierData.address || 
          !supplierData.address.street || 
          !supplierData.address.city || 
          !supplierData.address.state || 
          !supplierData.address.zipCode || 
          !supplierData.address.country) {
        return {
          success: false,
          error: 'Complete address is required (street, city, state, zip code, country)'
        };
      }

      // Contact person validation
      if (!supplierData.contactPerson || !supplierData.contactPerson.name) {
        return {
          success: false,
          error: 'Contact person name is required'
        };
      }

      // Payment terms validation
      if (supplierData.paymentTerms) {
        const validTerms = ['Net 15', 'Net 30', 'Net 45', 'Net 60', 'Immediate', 'COD'];
        if (!validTerms.includes(supplierData.paymentTerms)) {
          return {
            success: false,
            error: 'Invalid payment terms'
          };
        }
      }

      // Rating validation
      if (supplierData.rating !== undefined && (supplierData.rating < 1 || supplierData.rating > 5)) {
        return {
          success: false,
          error: 'Rating must be between 1 and 5'
        };
      }

      const supplier = await this.supplierRepository.create(supplierData);
      return {
        success: true,
        data: supplier,
        message: 'Supplier created successfully'
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

export default CreateSupplierUseCase;
