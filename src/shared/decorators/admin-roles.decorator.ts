import { SetMetadata } from '@nestjs/common';
import { AdminUserRole } from 'src/core/user-core/user-core.enum';

export const ADMIN_ROLES_KEY = 'adminRoles';
export const AdminRoles = (adminRoles: AdminUserRole[]) =>
  SetMetadata(ADMIN_ROLES_KEY, adminRoles);
