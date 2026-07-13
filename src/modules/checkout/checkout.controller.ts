import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CheckoutDto, CheckStockDto } from './dto/checkout.dto';
import { CheckoutService } from './checkout.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RequirePermissions } from '../../common/decorators/require-permission.decorator';
import { Permission } from '../../common/permissions/permission.enum';
import { PermissionGuard } from '../../common/guards/permission.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('checkout')
@UseGuards(JwtAuthGuard, PermissionGuard)
@ApiBearerAuth('JWT-auth')

export class CheckoutController {
    constructor( private readonly checkoutService: CheckoutService ) {}
    
    @Get('validate-checkout')
    @RequirePermissions(Permission.MANAGE_ORDER)
    async validateCheckout(dto: CheckStockDto) {
        return await this.checkoutService.checkStockBeforeCheckout(dto);
    }

    @Post()
    @RequirePermissions(Permission.CREATE_ORDER)
    async placeOrder(@CurrentUser('id') userId: string, dto: CheckoutDto) {
        return await this.checkoutService.checkout(userId, dto);
    }
}
