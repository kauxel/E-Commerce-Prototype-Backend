import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { updateStatuOrderDto } from './dto/order.dto';
import { PaymentService } from '../payment/payment.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RequirePermissions } from '../../common/decorators/require-permission.decorator';
import { Permission } from '../../common/permissions/permission.enum';
import { PermissionGuard } from '../../common/guards/permission.guard';

@Controller('order')
@UseGuards(JwtAuthGuard, PermissionGuard)
@ApiBearerAuth('JWT-auth')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly paymentService: PaymentService,
  ) {}

  @Get('record_order')
  @RequirePermissions(Permission.MANAGE_ORDER)
  recordAllOrder() {
    return this.orderService.findAll();
  }

  @Get('history_order_by_user')
  @RequirePermissions(Permission.MANAGE_ORDER)
  history(dto: updateStatuOrderDto) {}

  @Get('update_status')
  @RequirePermissions(Permission.MANAGE_ORDER)
  update(dto: updateStatuOrderDto) {}

  ///// belum direview
  @Post('midtrans')
  @RequirePermissions(Permission.CREATE_ORDER)
  async notification(@Body() payload: any) {
    return this.paymentService.handleNotification(payload);
  }
}
