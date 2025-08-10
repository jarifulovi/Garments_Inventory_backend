// Supplier domain entity - represents the core business object
export class SupplierEntity {
  constructor({
    id,
    name,
    email,
    phone,
    address = {},
    contactPerson = {},
    businessLicense,
    taxId,
    paymentTerms = 'Net 30',
    rating = 3,
    isActive = true,
    notes,
    createdAt,
    updatedAt
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.contactPerson = contactPerson;
    this.businessLicense = businessLicense;
    this.taxId = taxId;
    this.paymentTerms = paymentTerms;
    this.rating = rating;
    this.isActive = isActive;
    this.notes = notes;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Business methods
  isValidEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  isValidPhone() {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(this.phone);
  }

  isValidPaymentTerms() {
    const validTerms = ['Net 15', 'Net 30', 'Net 45', 'Net 60', 'Immediate', 'COD'];
    return validTerms.includes(this.paymentTerms);
  }

  isValidRating() {
    return this.rating >= 1 && this.rating <= 5;
  }

  getFullAddress() {
    if (!this.address || !this.address.street) return '';
    const addr = this.address;
    return `${addr.street}, ${addr.city}, ${addr.state} ${addr.zipCode}, ${addr.country}`;
  }

  hasCompleteAddress() {
    return this.address &&
           this.address.street &&
           this.address.city &&
           this.address.state &&
           this.address.zipCode &&
           this.address.country;
  }

  hasContactPerson() {
    return this.contactPerson && this.contactPerson.name;
  }

  getContactPersonInfo() {
    if (!this.hasContactPerson()) return null;
    
    const contact = this.contactPerson;
    let info = contact.name;
    
    if (contact.designation) {
      info += ` (${contact.designation})`;
    }
    
    if (contact.email || contact.phone) {
      const contactDetails = [];
      if (contact.email) contactDetails.push(contact.email);
      if (contact.phone) contactDetails.push(contact.phone);
      info += ` - ${contactDetails.join(', ')}`;
    }
    
    return info;
  }

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }

  setRating(newRating) {
    if (newRating < 1 || newRating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }
    this.rating = newRating;
  }

  setPaymentTerms(terms) {
    if (!this.isValidPaymentTermsStatic(terms)) {
      throw new Error('Invalid payment terms');
    }
    this.paymentTerms = terms;
  }

  updateContactPerson(contactData) {
    this.contactPerson = {
      ...this.contactPerson,
      ...contactData
    };
  }

  updateAddress(addressData) {
    this.address = {
      ...this.address,
      ...addressData
    };
  }

  isGoodRating() {
    return this.rating >= 4;
  }

  isPoorRating() {
    return this.rating <= 2;
  }

  isActiveSupplier() {
    return this.isActive;
  }

  // Static helper methods
  static isValidPaymentTermsStatic(terms) {
    const validTerms = ['Net 15', 'Net 30', 'Net 45', 'Net 60', 'Immediate', 'COD'];
    return validTerms.includes(terms);
  }

  static isValidEmailStatic(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidPhoneStatic(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  }

  // Validation methods
  validate() {
    const errors = [];

    if (!this.name || this.name.trim().length === 0) {
      errors.push('Supplier name is required');
    }

    if (this.name && this.name.length > 100) {
      errors.push('Supplier name cannot exceed 100 characters');
    }

    if (!this.email || this.email.trim().length === 0) {
      errors.push('Email is required');
    } else if (!this.isValidEmail()) {
      errors.push('Invalid email format');
    }

    if (!this.phone || this.phone.trim().length === 0) {
      errors.push('Phone number is required');
    } else if (!this.isValidPhone()) {
      errors.push('Invalid phone number format');
    }

    if (!this.businessLicense || this.businessLicense.trim().length === 0) {
      errors.push('Business license is required');
    }

    // Address validation
    if (!this.hasCompleteAddress()) {
      errors.push('Complete address is required (street, city, state, zip code, country)');
    }

    // Contact person validation
    if (!this.hasContactPerson()) {
      errors.push('Contact person name is required');
    }

    // Payment terms validation
    if (!this.isValidPaymentTerms()) {
      errors.push('Invalid payment terms');
    }

    // Rating validation
    if (!this.isValidRating()) {
      errors.push('Rating must be between 1 and 5');
    }

    return errors;
  }
}

export default SupplierEntity;
