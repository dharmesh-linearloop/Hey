import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ADMIN_ROLES_KEY } from '../../../shared/decorators/admin-roles.decorator';
import { AdminUserRole } from 'src/core/admin-panel-user-core/admin-panel-user-core.enum';

@Injectable()
export class AdminRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const requiredRoles = this.reflector.getAllAndOverride<AdminUserRole[]>(
      ADMIN_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (user && requiredRoles.includes(user.role)) {
      return requiredRoles.includes(user.role);
    } else {
      throw new ForbiddenException('You are not allow to explore this data');
    }
  }
}
