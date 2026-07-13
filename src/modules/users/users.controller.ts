import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RequirePermissions } from '../../common/decorators/require-permission.decorator';
import { Permission } from '../../common/permissions/permission.enum';
import { PermissionGuard } from '../../common/guards/permission.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard, PermissionGuard)
@ApiBearerAuth('JWT-auth')
@RequirePermissions(Permission.MANAGE_USER)
export class UsersController {

    constructor(
        readonly userService: UsersService
    ){}

    @Get(':id')
    async GetMe(@Param() userId: string) {
        return this.userService.findByID(userId)
    }

}
