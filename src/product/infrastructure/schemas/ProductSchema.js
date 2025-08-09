import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Product category is required']
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: [true, 'Product supplier is required']
  },
  sku: {
    type: String,
    required: [true, 'SKU is required'],
    unique: true,
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price must be positive']
  },
  costPrice: {
    type: Number,
    required: [true, 'Cost price is required'],
    min: [0, 'Cost price must be positive']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative'],
    default: 0
  },
  minStockLevel: {
    type: Number,
    default: 10,
    min: [0, 'Minimum stock level cannot be negative']
  },
  size: {
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'Free Size'],
    required: [true, 'Size is required']
  },
  color: {
    type: String,
    required: [true, 'Color is required'],
    trim: true
  },
  material: {
    type: String,
    required: [true, 'Material is required'],
    trim: true
  },
  images: [{
    type: String,
    validate: {
      validator: function(v) {
        return /\.(jpg|jpeg|png|gif)$/i.test(v);
      },
      message: 'Invalid image format'
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [String]
}, {
  timestamps: true
});

// Index for better query performance
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ supplier: 1 });
// SKU index is automatically created by unique: true constraint

// Virtual for low stock check
productSchema.virtual('isLowStock').get(function() {
  return this.quantity <= this.minStockLevel;
});

// Virtual for profit margin
productSchema.virtual('profitMargin').get(function() {
  return ((this.price - this.costPrice) / this.costPrice * 100).toFixed(2);
});

export default mongoose.model('Product', productSchema);
