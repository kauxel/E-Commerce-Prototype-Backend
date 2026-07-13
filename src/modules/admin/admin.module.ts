import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from '../users/users.module';
import { MerchantModule } from '../merchant/merchant.module';
import { OrderModule } from '../order/order.module';
import { PaymentModule } from '../payment/payment.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [UsersModule, MerchantModule, OrderModule, PaymentModule]
})
export class AdminModule {}
