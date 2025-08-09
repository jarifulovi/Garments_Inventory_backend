// Use case for creating a new order
export class CreateOrderUseCase {
  constructor(orderRepository, productRepository) {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
  }

  async execute(orderData) {
    try {
      // Business validation
      if (!orderData.type) {
        return {
          success: false,
          error: 'Order type is required'
        };
      }

      if (!['purchase', 'sale'].includes(orderData.type)) {
        return {
          success: false,
          error: 'Order type must be either purchase or sale'
        };
      }

      if (!orderData.items || orderData.items.length === 0) {
        return {
          success: false,
          error: 'Order must have at least one item'
        };
      }

      // Validate items
      for (const item of orderData.items) {
        if (!item.product || !item.quantity || !item.unitPrice) {
          return {
            success: false,
            error: 'Each item must have product, quantity, and unit price'
          };
        }

        if (item.quantity <= 0) {
          return {
            success: false,
            error: 'Item quantity must be greater than 0'
          };
        }

        if (item.unitPrice <= 0) {
          return {
            success: false,
            error: 'Item unit price must be greater than 0'
          };
        }
      }

      // For sale orders, check stock availability
      if (orderData.type === 'sale') {
        for (const item of orderData.items) {
          const product = await this.productRepository.findById(item.product);
          if (!product) {
            return {
              success: false,
              error: `Product not found: ${item.product}`
            };
          }

          if (product.quantity < item.quantity) {
            return {
              success: false,
              error: `Insufficient stock for product: ${product.name}. Available: ${product.quantity}, Required: ${item.quantity}`
            };
          }
        }
      }

      const order = await this.orderRepository.create(orderData);
      return {
        success: true,
        data: order,
        message: 'Order created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default CreateOrderUseCase;
