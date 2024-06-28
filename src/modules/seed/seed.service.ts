import { Injectable, Logger } from '@nestjs/common';
import { encodePassword } from 'src/shared/helpers/bcrypt';
import { DEFAULT_ADMIN } from './seed.keys';
import { AdminPanelUserCoreService } from 'src/core/admin-panel-user-core/admin-panel-user-core.service';
import { ADMIN_PANEL_USER_STATUS } from 'src/keys';

@Injectable()
export class SeedService {
  private readonly logger: Logger = new Logger(SeedService.name);

  constructor(private adminPanelUserCoreService: AdminPanelUserCoreService) {}

  async createAdminUser() {
    let createUser = true;
    let userData;
    try {
      userData = await this.adminPanelUserCoreService.findFirst({
        where: { email: DEFAULT_ADMIN.email },
      });

      if (userData) {
        createUser = false;
      }
    } catch (e) {
      createUser = true;
    }

    if (createUser) {
      try {
        await this.adminPanelUserCoreService.create({
          data: {
            firstName: DEFAULT_ADMIN.firstName,
            lastName: DEFAULT_ADMIN.lastName,
            email: DEFAULT_ADMIN.email,
            role: DEFAULT_ADMIN.adminRole,
            password: encodePassword(DEFAULT_ADMIN.password),
            status: ADMIN_PANEL_USER_STATUS.Enable,
          },
        });
      } catch (e) {
        console.log('🚀 ---------🚀');
        console.log('🚀 ~ e:', e);
        console.log('🚀 ---------🚀');
        console.log('ERR 1');
      }
    } else {
      try {
        await this.adminPanelUserCoreService.update({
          where: { id: userData.id },
          data: {
            firstName: DEFAULT_ADMIN.firstName,
            lastName: DEFAULT_ADMIN.lastName,
            email: DEFAULT_ADMIN.email,
            role: DEFAULT_ADMIN.adminRole,
            password: encodePassword(DEFAULT_ADMIN.password),
          },
        });
      } catch (e) {
        console.log('ERR 2');
      }
    }

    console.log('HY');
  }
}
