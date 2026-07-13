import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../prisma/prisma.service';
import { ROLE_PERMISSIONS } from '../permissions/role-permissions';
import { Permission } from '../permissions/permission.enum';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required = this.reflector.get<Permission[]>(
      'permissions',
      context.getHandler(),
    );

    if (!required) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    const merchant = await this.prisma.merchant.findUnique({
      where: { userId: user.id },
    });

    let actualRole = user.role;
    if (user.role === 'USER' && merchant) {
      actualRole = 'MERCHANT';
    }
    const permissions = ROLE_PERMISSIONS[actualRole] ?? [];
    return required.some((p) => permissions.includes(p));
  }
}
