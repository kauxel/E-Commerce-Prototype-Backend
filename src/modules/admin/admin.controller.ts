import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionGuard } from '../../common/guards/permission.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RequirePermissions } from '../../common/decorators/require-permission.decorator';
import { Permission } from '../../common/permissions/permission.enum';

@Controller('admin')
@UseGuards(JwtAuthGuard, PermissionGuard)
@ApiBearerAuth('JWT-auth')
@RequirePermissions(Permission.MANAGE_USER)
export class AdminController {
    constructor(readonly adminService: AdminService){}

    @Get()
    async dashboard () {
        return this.adminService.dashboard()
    }
    
}
