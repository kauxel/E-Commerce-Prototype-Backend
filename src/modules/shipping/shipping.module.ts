import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { ProductsModule } from '../products/products.module';

@Module({
    providers: [ShippingService],
    controllers: [ShippingController],
    imports: [ProductsModule]
})
export class ShippingModule {}
