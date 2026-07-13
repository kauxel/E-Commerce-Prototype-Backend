import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CartModule } from '../cart/cart.module';
import { PaymentModule } from '../payment/payment.module';

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
  imports: [CartModule, PaymentModule],
})
export class OrderModule {}
