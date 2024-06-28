import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { AdminPanelUser } from './admin-panel-user-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminPanelUserCorePaginateDto } from './admin-panel-user-core.dto';

@Injectable()
export class AdminPanelUserCoreService extends TypeormBaseRepository<
  AdminPanelUser,
  AdminPanelUserCorePaginateDto
> {
  constructor(
    @InjectRepository(AdminPanelUser)
    private readonly adminPanelUserRepository: Repository<AdminPanelUser>,
  ) {
    super(adminPanelUserRepository);
  }
}
