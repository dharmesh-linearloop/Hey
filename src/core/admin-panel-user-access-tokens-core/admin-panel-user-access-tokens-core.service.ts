import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { AdminPanelUserAccessTokens } from './admin-panel-user-access-tokens-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminPanelUserAccessTokensCorePaginateDto } from './admin-panel-user-access-tokens-core.dto';

@Injectable()
export class AdminPanelUserAccessTokensCoreService extends TypeormBaseRepository<
  AdminPanelUserAccessTokens,
  AdminPanelUserAccessTokensCorePaginateDto
> {
  constructor(
    @InjectRepository(AdminPanelUserAccessTokens)
    private readonly adminPanelUserAccessTokensRepository: Repository<AdminPanelUserAccessTokens>,
  ) {
    super(adminPanelUserAccessTokensRepository);
  }
}
