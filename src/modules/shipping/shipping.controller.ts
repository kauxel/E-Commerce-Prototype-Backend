import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { RateDto } from './dto/shipping.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RequirePermissions } from '../../common/decorators/require-permission.decorator';
import { Permission } from '../../common/permissions/permission.enum';
import { PermissionGuard } from '../../common/guards/permission.guard';

@Controller('shipping')
@UseGuards(JwtAuthGuard, PermissionGuard)
@ApiBearerAuth('JWT-auth')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post('rates')
  @RequirePermissions(Permission.MANAGE_SHIPPING)
  async getRates(@Body() body: RateDto) {
    return this.shippingService.getRates(body);
  }
}
