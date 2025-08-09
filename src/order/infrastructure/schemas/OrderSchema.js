import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['purchase', 'sale'],
    required: [true, 'Order type is required']
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: function() {
      return this.type === 'purchase';
    }
  },
  customer: {
    name: {
      type: String,
      required: function() {
        return this.type === 'sale';
      }
    },
    email: String,
    phone: String,
    address: String
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    unitPrice: {
      type: Number,
      required: true,
      min: [0, 'Unit price must be positive']
    },
    totalPrice: {
      type: Number,
      required: true
    }
  }],
  subtotal: {
    type: Number,
    required: true,
    min: [0, 'Subtotal must be positive']
  },
  tax: {
    type: Number,
    default: 0,
    min: [0, 'Tax cannot be negative']
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative']
  },
  total: {
    type: Number,
    required: true,
    min: [0, 'Total must be positive']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'partial', 'paid', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'credit_card', 'debit_card', 'bank_transfer', 'check'],
    required: function() {
      return this.paymentStatus === 'paid';
    }
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  expectedDeliveryDate: Date,
  actualDeliveryDate: Date,
  notes: String
}, {
  timestamps: true
});

// Auto-generate order number
orderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    const prefix = this.type === 'purchase' ? 'PO' : 'SO';
    const timestamp = Date.now();
    this.orderNumber = `${prefix}-${timestamp}`;
  }
  next();
});

// Calculate totals before saving
orderSchema.pre('save', function(next) {
  // Calculate subtotal
  this.subtotal = this.items.reduce((sum, item) => sum + item.totalPrice, 0);
  
  // Calculate total
  this.total = this.subtotal + this.tax - this.discount;
  
  next();
});

export default mongoose.model('Order', orderSchema);
