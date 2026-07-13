import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [AddressController],
  providers: [AddressService],
  imports: [UsersModule],
  exports: [AddressService],
})
export class AddressModule {}
