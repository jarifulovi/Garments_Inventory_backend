// Product domain entity - represents the core business object
export class ProductEntity {
  constructor({
    id,
    name,
    description,
    category,
    supplier,
    sku,
    price,
    costPrice,
    quantity = 0,
    minStockLevel = 10,
    size,
    color,
    material,
    images = [],
    isActive = true,
    tags = [],
    createdAt,
    updatedAt
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.category = category;
    this.supplier = supplier;
    this.sku = sku;
    this.price = price;
    this.costPrice = costPrice;
    this.quantity = quantity;
    this.minStockLevel = minStockLevel;
    this.size = size;
    this.color = color;
    this.material = material;
    this.images = images;
    this.isActive = isActive;
    this.tags = tags;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Business methods
  isValidSize() {
    const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'Free Size'];
    return validSizes.includes(this.size);
  }

  isValidPrice() {
    return this.price > 0;
  }

  isValidCostPrice() {
    return this.costPrice > 0;
  }

  isValidQuantity() {
    return this.quantity >= 0;
  }

  isLowStock() {
    return this.quantity <= this.minStockLevel;
  }

  calculateProfitMargin() {
    if (this.costPrice === 0) return 0;
    return ((this.price - this.costPrice) / this.costPrice * 100).toFixed(2);
  }

  calculateProfit() {
    return this.price - this.costPrice;
  }

  isInStock() {
    return this.quantity > 0;
  }

  isOutOfStock() {
    return this.quantity === 0;
  }

  canReduceStock(amount) {
    return this.quantity >= amount;
  }

  reduceStock(amount) {
    if (!this.canReduceStock(amount)) {
      throw new Error('Insufficient stock');
    }
    this.quantity -= amount;
  }

  increaseStock(amount) {
    if (amount < 0) {
      throw new Error('Amount must be positive');
    }
    this.quantity += amount;
  }

  setPrice(newPrice) {
    if (newPrice <= 0) {
      throw new Error('Price must be greater than 0');
    }
    this.price = newPrice;
  }

  setCostPrice(newCostPrice) {
    if (newCostPrice <= 0) {
      throw new Error('Cost price must be greater than 0');
    }
    this.costPrice = newCostPrice;
  }

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }

  addImage(imageUrl) {
    if (!this.isValidImageFormat(imageUrl)) {
      throw new Error('Invalid image format');
    }
    this.images.push(imageUrl);
  }

  removeImage(imageUrl) {
    this.images = this.images.filter(img => img !== imageUrl);
  }

  addTag(tag) {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    }
  }

  removeTag(tag) {
    this.tags = this.tags.filter(t => t !== tag);
  }

  isValidImageFormat(imageUrl) {
    return /\.(jpg|jpeg|png|gif)$/i.test(imageUrl);
  }

  // Validation methods
  validate() {
    const errors = [];

    if (!this.name || this.name.trim().length === 0) {
      errors.push('Product name is required');
    }

    if (this.name && this.name.length > 100) {
      errors.push('Product name cannot exceed 100 characters');
    }

    if (!this.description || this.description.trim().length === 0) {
      errors.push('Product description is required');
    }

    if (this.description && this.description.length > 500) {
      errors.push('Description cannot exceed 500 characters');
    }

    if (!this.sku || this.sku.trim().length === 0) {
      errors.push('SKU is required');
    }

    if (!this.isValidPrice()) {
      errors.push('Price must be greater than 0');
    }

    if (!this.isValidCostPrice()) {
      errors.push('Cost price must be greater than 0');
    }

    if (!this.isValidQuantity()) {
      errors.push('Quantity cannot be negative');
    }

    if (!this.isValidSize()) {
      errors.push('Invalid size');
    }

    if (!this.color || this.color.trim().length === 0) {
      errors.push('Color is required');
    }

    if (!this.material || this.material.trim().length === 0) {
      errors.push('Material is required');
    }

    return errors;
  }
}

export default ProductEntity;
