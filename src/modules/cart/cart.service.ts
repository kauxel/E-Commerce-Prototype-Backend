import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AddToCartDTO } from './dto/cart.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CartService {
  constructor(
    private prisma: PrismaService,
    private productsService: ProductsService,
  ) {}

  async getCartByUserId(userId: string) {
    return this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: { include: { product: true } },
      },
    });
  }

  async getValidateCart(userId: string) {
    const cart = await this.getCartByUserId(userId);
    if (!cart) throw new NotFoundException('Keranjang tidak ditemukan');;

    const validateItems = cart.items.map((item) => {
      const isAvailable = item.product.stock >= item.quantity;
      return {
        ...item,
        isAvailable,
        availableStock: item.product.stock,
      };
    });
    return {
      ...cart,
      items: validateItems,
      isCanCheckoutAll: validateItems.some((item) => !!item.isAvailable),
    };
  }

  async addToCart(userId: string, addToCartDto: AddToCartDTO) {
    const { productId, quantity } = addToCartDto;

    const product = await this.productsService.findOne(productId);

    if (!product) throw new NotFoundException('Produk tidak ditemukan');

    let cart = await this.getCartByUserId(userId);

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
        include: { items: { include: { product: true } } },
      });
    }

    const existingItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: { cartId: cart.id, productId },
      },
    });

    if (existingItem) {
      // Tambah quantity jika item sudah ada di keranjang
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      // Jika belum ada, buat item baru di keranjang
      return this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }
  }

  async removeItem(userId: string, productId: string) {
    const cart = await this.getCartByUserId(userId);

    if (!cart) {
      throw new NotFoundException('Keranjang tidak ditemukan');
    }

    try {
      return await this.prisma.cartItem.delete({
        where: {
          cartId_productId: { cartId: cart.id, productId },
        },
      });
    } catch (error) {
      throw new NotFoundException('Item tidak ditemukan di keranjang');
    }
  }

  async clearCart(userId: string) {
    const cart = await this.getCartByUserId(userId);

    if (!cart) {
      throw new NotFoundException('Keranjang tidak ditemukan');
    }

    return this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });
  }
}
