import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './modules/health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesController } from './modules/categories/categories.controller';
import { CategoriesService } from './modules/categories/categories.service';
import { CategoriesModule } from './modules/categories/categories.module';
import { CartController } from './modules/cart/cart.controller';
import { CartService } from './modules/cart/cart.service';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { CheckoutController } from './modules/checkout/checkout.controller';
import { CheckoutModule } from './modules/checkout/checkout.module';
import { ShippingController } from './modules/shipping/shipping.controller';
import { ShippingService } from './modules/shipping/shipping.service';
import { ShippingModule } from './modules/shipping/shipping.module';
import { PaymentModule } from './modules/payment/payment.module';
import { AdminModule } from './modules/admin/admin.module';
import { MerchantModule } from './modules/merchant/merchant.module';
import { AddressService } from './modules/address/address.service';
import { AddressModule } from './modules/address/address.module';
import { ProfileController } from './modules/profile/profile.controller';
import { ProfileModule } from './modules/profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    HealthModule,
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    CartModule,
    OrderModule,
    CheckoutModule,
    ShippingModule,
    PaymentModule,
    AdminModule,
    MerchantModule,
    AddressModule,
    ProfileModule,
  ],
})
export class AppModule {}
