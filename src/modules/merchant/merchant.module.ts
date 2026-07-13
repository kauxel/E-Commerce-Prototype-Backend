import { Module } from '@nestjs/common';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [MerchantController],
  providers: [MerchantService],
  imports: [UsersModule],
  exports: [MerchantService]
})
export class MerchantModule {}
