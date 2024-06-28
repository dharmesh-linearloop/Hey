import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { AdminPanelShAccountAssignees } from './admin-panel-sh-account-assignees-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminPanelShAccountAssigneesCorePaginateDto } from './admin-panel-sh-account-assignees-core.dto';

@Injectable()
export class AdminPanelShAccountAssigneesCoreService extends TypeormBaseRepository<
  AdminPanelShAccountAssignees,
  AdminPanelShAccountAssigneesCorePaginateDto
> {
  constructor(
    @InjectRepository(AdminPanelShAccountAssignees)
    private readonly adminPanelShAccountAssigneesRepository: Repository<AdminPanelShAccountAssignees>,
  ) {
    super(adminPanelShAccountAssigneesRepository);
  }
}
