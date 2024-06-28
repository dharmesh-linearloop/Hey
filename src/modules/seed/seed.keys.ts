import { AdminUserRole } from 'src/core/user-core/user-core.enum';

export const DEFAULT_ADMIN = {
  email: 'admin@admin.com',
  firstName: 'Admin',
  lastName: 'Admin',
  adminRole: AdminUserRole.SUPER_ADMIN,
  password: 'Admin@123',
};
