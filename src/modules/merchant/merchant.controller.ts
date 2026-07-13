import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionGuard } from '../../common/guards/permission.guard';
import { RequirePermissions } from '../../common/decorators/require-permission.decorator';
import { Permission } from '../../common/permissions/permission.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { MerchantService } from './merchant.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('merchant')
@UseGuards(JwtAuthGuard, PermissionGuard)
@ApiBearerAuth('JWT-auth')
@RequirePermissions(Permission.MANAGE_MERCHANT)
export class MerchantController {
  constructor(readonly merchantService: MerchantService) {}

  @Get()
  async getMerchant(@CurrentUser('id') userId: string) {
    return this.merchantService.getMerchant(userId);
  }

  @Get()
  async dashboard() {
    return this.merchantService.dashboard();
  }
}
