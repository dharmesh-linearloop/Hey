import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { AdminPanelUserLoginSecrets } from './admin-panel-user-login-secrets-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminPanelUserLoginSecretsCorePaginateDto } from './admin-panel-user-login-secrets-core.dto';

@Injectable()
export class AdminPanelUserLoginSecretsCoreService extends TypeormBaseRepository<
  AdminPanelUserLoginSecrets,
  AdminPanelUserLoginSecretsCorePaginateDto
> {
  constructor(
    @InjectRepository(AdminPanelUserLoginSecrets)
    private readonly adminPanelUserLoginSecretsRepository: Repository<AdminPanelUserLoginSecrets>,
  ) {
    super(adminPanelUserLoginSecretsRepository);
  }
}
