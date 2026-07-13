import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductsModule } from '../products/products.module';

@Module({
    controllers: [CartController],
    providers: [CartService],
    exports: [CartService],
    imports: [ProductsModule]
})
export class CartModule {}
