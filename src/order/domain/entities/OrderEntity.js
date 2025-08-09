// Order domain entity - represents the core business object
export class OrderEntity {
  constructor({
    id,
    orderNumber,
    type,
    supplier,
    customer,
    items = [],
    subtotal = 0,
    tax = 0,
    discount = 0,
    total = 0,
    status = 'pending',
    paymentStatus = 'pending',
    paymentMethod,
    orderDate = new Date(),
    expectedDeliveryDate,
    actualDeliveryDate,
    notes,
    createdAt,
    updatedAt
  }) {
    this.id = id;
    this.orderNumber = orderNumber;
    this.type = type;
    this.supplier = supplier;
    this.customer = customer;
    this.items = items;
    this.subtotal = subtotal;
    this.tax = tax;
    this.discount = discount;
    this.total = total;
    this.status = status;
    this.paymentStatus = paymentStatus;
    this.paymentMethod = paymentMethod;
    this.orderDate = orderDate;
    this.expectedDeliveryDate = expectedDeliveryDate;
    this.actualDeliveryDate = actualDeliveryDate;
    this.notes = notes;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Business methods
  isValidType() {
    return ['purchase', 'sale'].includes(this.type);
  }

  isValidStatus() {
    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    return validStatuses.includes(this.status);
  }

  isValidPaymentStatus() {
    const validPaymentStatuses = ['pending', 'partial', 'paid', 'refunded'];
    return validPaymentStatuses.includes(this.paymentStatus);
  }

  calculateSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  }

  calculateTotal() {
    return this.calculateSubtotal() + this.tax - this.discount;
  }

  hasItems() {
    return this.items && this.items.length > 0;
  }

  isPurchaseOrder() {
    return this.type === 'purchase';
  }

  isSaleOrder() {
    return this.type === 'sale';
  }

  isCompleted() {
    return this.status === 'delivered';
  }

  isCancelled() {
    return this.status === 'cancelled';
  }

  canBeCancelled() {
    return !['delivered', 'cancelled'].includes(this.status);
  }
}

export default OrderEntity;
