import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionGuard } from '../../common/guards/permission.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RequirePermissions } from '../../common/decorators/require-permission.decorator';
import { Permission } from '../../common/permissions/permission.enum';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ProfileService } from './profile.service';
import { UpdateUserDto } from '../users/dto/user.dto';

@Controller('profile')
@UseGuards(JwtAuthGuard, PermissionGuard)
@ApiBearerAuth('JWT-auth')
@RequirePermissions(Permission.MANAGE_PROFILE)
export class ProfileController {
  constructor(readonly profileService: ProfileService) {}

  @Get('me')
  async getProfile(@CurrentUser('id') userId: string) {
    return await this.profileService.getProfile(userId);
  }

  @Patch('me')
  async updateProfile(@CurrentUser('id') userId: string, @Body() dto: UpdateUserDto) {
    return await this.profileService.updateProfile(userId, dto)
  }
}
