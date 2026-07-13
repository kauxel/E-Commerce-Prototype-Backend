import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CartService } from '../cart/cart.service';
import { CheckoutDto, CheckStockDto } from './dto/checkout.dto';

@Injectable()
export class CheckoutService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productsService: ProductsService,
    // private readonly cartService: CartService,
  ) {}

  // namanya bisa jadi checkoutSummary
  async checkStockBeforeCheckout(dto: CheckStockDto) {
    const validatedItems = await Promise.all(
      dto.items.map(async (item) => {
        const product = await this.productsService.findOne(item.productId);

        const isStokAvailable = product.stock >= item.quantity;
        return {
          ...product,
          quantityRequested: item.quantity,
          isAvailable: isStokAvailable,
        };
      }),
    );

    const hasStockError = validatedItems.some((item) => !item.isAvailable);

    return {
      canCheckout: !hasStockError,
      items: validatedItems,
    };
  }

  async calculateTotalPrice(
    items: { productId: string; quantity: number; price: number }[],
    couponId?: string,
  ) {
    let totalPrice = 0;
    for (const item of items) {
      totalPrice += item.price * item.quantity;
    }
    return totalPrice;
  }

  /// namanya bisa jadi checkoutPlaceOrder
  // tambah fungsi untuk checkout
  async checkout(userId: string, dto: CheckoutDto) {
    const { items, shippingAddressId, paymentMethodId, couponId } = dto;

    const validatedItems = await Promise.all(
      dto.items.map(async (item) => {
        const product = await this.productsService.findOne(item.productId);

        return {
          productId: product.id,
          productName: product.name,
          quantity: item.quantity,
          price: Number(product.price),
        };
      }),
    );

    const totalPrice = await this.calculateTotalPrice(validatedItems, couponId);
    /// PERLU DI EVALUASI LAGI
    const order = await this.prisma.order.create({
      data: {
        userId,
        items: {
          create: validatedItems.map((item) => ({
            ...item,
            subtotal: item.price * item.quantity,
            product: {
              connect: { id: item.productId },
            },
          })),
        },
        /// Belum ada relasi dengan shippingAddress, paymentMethod, dan coupon, jadi sementara di comment dulu
        // shippingAddress,
        // paymentMethodId,
        // couponId,
        total: totalPrice,
        status: 'PENDING_PAYMENT',
      },
    });

    return order;

    ///// logic dari genarate command integrasi dengan biteship dan midtrans

  //   const order = await this.orderService.createOrder();

  //   const payment = await this.paymentService.createPayment(order);

  //   await prisma.order.update({
  //     where: {
  //       id: order.id,
  //     },
  //     data: {
  //       paymentToken: payment.token,
  //       paymentUrl: payment.redirect_url,
  //       status: 'WAITING_PAYMENT',
  //     },
  //   });

  //   return {
  //     paymentUrl: payment.redirect_url,
  //   };
  }
}
