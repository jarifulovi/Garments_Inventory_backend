import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true,
    maxlength: [50, 'Category name cannot exceed 50 characters'],
    minlength: [2, 'Category name must be at least 2 characters']
  },
  description: {
    type: String,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  image: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /\.(jpg|jpeg|png|gif)$/i.test(v);
      },
      message: 'Invalid image format. Only jpg, jpeg, png, gif are allowed'
    }
  }
}, {
  timestamps: true
});

// Indexes for better performance
// Note: name index is automatically created by unique: true constraint
categorySchema.index({ parentCategory: 1 });
categorySchema.index({ isActive: 1 });

// Virtual for subcategories
categorySchema.virtual('subcategories', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parentCategory'
});

// Virtual for products count
categorySchema.virtual('productsCount', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'category',
  count: true
});

// Ensure virtuals are included when converting to JSON
categorySchema.set('toJSON', { virtuals: true });
categorySchema.set('toObject', { virtuals: true });

// Pre-save middleware to prevent self-referencing
categorySchema.pre('save', function(next) {
  if (this.parentCategory && this.parentCategory.toString() === this._id.toString()) {
    return next(new Error('Category cannot be its own parent'));
  }
  next();
});

// Pre-update middleware for the same validation
categorySchema.pre(['findOneAndUpdate', 'updateOne'], function(next) {
  const update = this.getUpdate();
  if (update.parentCategory && update.parentCategory.toString() === this._conditions._id?.toString()) {
    return next(new Error('Category cannot be its own parent'));
  }
  next();
});

export default mongoose.model('Category', categorySchema);
