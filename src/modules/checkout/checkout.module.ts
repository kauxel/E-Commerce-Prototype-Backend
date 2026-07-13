import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { ProductsModule } from '../products/products.module';
import { CartModule } from '../cart/cart.module';

@Module({
  providers: [CheckoutService],
  controllers: [CheckoutController],
  imports: [ProductsModule, CartModule], // Tambahkan shipping service dan coupon service jika ada
})
export class CheckoutModule {}
