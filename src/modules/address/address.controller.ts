import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionGuard } from '../../common/guards/permission.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RequirePermissions } from '../../common/decorators/require-permission.decorator';
import { Permission } from '../../common/permissions/permission.enum';
import { AddressService } from './address.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('address')
@UseGuards(JwtAuthGuard, PermissionGuard)
@ApiBearerAuth('JWT-auth')
@RequirePermissions(Permission.MANAGE_ADDRESS)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get(':id')
  async findById(@Param() addressId: string) {
    return this.addressService.findById(addressId);
  }

  @Get('find-by-userId')
  async findByUserId(@CurrentUser() userId: string) {
    return this.addressService.findByUserId(userId);
  }
}
