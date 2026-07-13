import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDTO } from './dto/cart.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PermissionGuard } from '../../common/guards/permission.guard';
import { RequirePermissions } from '../../common/decorators/require-permission.decorator';
import { Permission } from '../../common/permissions/permission.enum';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('cart')
@UseGuards(JwtAuthGuard, PermissionGuard)
@ApiBearerAuth('JWT-auth')

export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @RequirePermissions(Permission.MANAGE_CART)
  async getCart(@CurrentUser('id') userId: string) {
    return this.cartService.getValidateCart(userId);
  }

  @Post()
  @RequirePermissions(Permission.CREATE_CART)
  async addToCart(@CurrentUser('id') userId: string, @Body() addToCartDto: AddToCartDTO) {
    return this.cartService.addToCart(userId, addToCartDto);
  }

  @Delete('item/:productId')
  @RequirePermissions(Permission.MANAGE_CART)
  async removeItem(@CurrentUser('id') userId: string, @Param('productId', ParseIntPipe) productId: string) {
    return this.cartService.removeItem(userId, productId);
  }

  @Delete('allItems')
  @RequirePermissions(Permission.MANAGE_CART)
  async clearCart(@CurrentUser('id') userId: string) {
    await this.cartService.clearCart(userId);
    return { message: 'Keranjang berhasil dikosongkan' };
  }
}