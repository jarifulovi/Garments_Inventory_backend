// Category domain entity - represents the core business object
export class CategoryEntity {
  constructor({
    id,
    name,
    description,
    parentCategory = null,
    isActive = true,
    image,
    subcategories = [],
    productsCount = 0,
    createdAt,
    updatedAt
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.parentCategory = parentCategory;
    this.isActive = isActive;
    this.image = image;
    this.subcategories = subcategories;
    this.productsCount = productsCount;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Business methods
  isValidName() {
    return this.name && this.name.trim().length >= 2 && this.name.length <= 50;
  }

  isValidDescription() {
    return !this.description || this.description.length <= 200;
  }

  isValidImageFormat() {
    if (!this.image) return true;
    return /\.(jpg|jpeg|png|gif)$/i.test(this.image);
  }

  isParentCategory() {
    return this.parentCategory === null || this.parentCategory === undefined;
  }

  isSubcategory() {
    return this.parentCategory !== null && this.parentCategory !== undefined;
  }

  hasSubcategories() {
    return this.subcategories && this.subcategories.length > 0;
  }

  hasProducts() {
    return this.productsCount > 0;
  }

  getLevel() {
    return this.isParentCategory() ? 0 : 1; // Assuming max 2-level hierarchy
  }

  getFullPath() {
    if (this.isParentCategory()) {
      return this.name;
    }
    
    if (this.parentCategory && typeof this.parentCategory === 'object' && this.parentCategory.name) {
      return `${this.parentCategory.name} > ${this.name}`;
    }
    
    return this.name;
  }

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }

  setImage(imageUrl) {
    if (!this.isValidImageFormatStatic(imageUrl)) {
      throw new Error('Invalid image format. Only jpg, jpeg, png, gif are allowed.');
    }
    this.image = imageUrl;
  }

  removeImage() {
    this.image = null;
  }

  addSubcategory(subcategory) {
    if (!this.subcategories) {
      this.subcategories = [];
    }
    this.subcategories.push(subcategory);
  }

  removeSubcategory(subcategoryId) {
    if (this.subcategories) {
      this.subcategories = this.subcategories.filter(sub => 
        sub.id !== subcategoryId && sub._id !== subcategoryId
      );
    }
  }

  updateProductsCount(count) {
    if (count < 0) {
      throw new Error('Products count cannot be negative');
    }
    this.productsCount = count;
  }

  canBeDeleted() {
    // Category can be deleted if it has no products and no subcategories
    return !this.hasProducts() && !this.hasSubcategories();
  }

  // Static helper methods
  static isValidImageFormatStatic(imageUrl) {
    if (!imageUrl) return true;
    return /\.(jpg|jpeg|png|gif)$/i.test(imageUrl);
  }

  static isValidNameStatic(name) {
    return name && name.trim().length >= 2 && name.length <= 50;
  }

  static isValidDescriptionStatic(description) {
    return !description || description.length <= 200;
  }

  // Validation methods
  validate() {
    const errors = [];

    if (!this.isValidName()) {
      errors.push('Category name is required and must be between 2 and 50 characters');
    }

    if (!this.isValidDescription()) {
      errors.push('Description cannot exceed 200 characters');
    }

    if (!this.isValidImageFormat()) {
      errors.push('Invalid image format. Only jpg, jpeg, png, gif are allowed');
    }

    return errors;
  }

  // Business logic methods
  createSlug() {
    if (!this.name) return '';
    return this.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  }

  getDisplayName() {
    return this.name || 'Unnamed Category';
  }

  isActiveCategory() {
    return this.isActive === true;
  }

  getBreadcrumb() {
    const breadcrumb = [];
    
    if (this.parentCategory && typeof this.parentCategory === 'object') {
      breadcrumb.push({
        id: this.parentCategory.id || this.parentCategory._id,
        name: this.parentCategory.name
      });
    }
    
    breadcrumb.push({
      id: this.id,
      name: this.name
    });
    
    return breadcrumb;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      parentCategory: this.parentCategory,
      isActive: this.isActive,
      image: this.image,
      subcategories: this.subcategories,
      productsCount: this.productsCount,
      level: this.getLevel(),
      fullPath: this.getFullPath(),
      slug: this.createSlug(),
      canBeDeleted: this.canBeDeleted(),
      breadcrumb: this.getBreadcrumb(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

export default CategoryEntity;
