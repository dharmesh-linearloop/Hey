import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { AdminPanelAccountTags } from './admin-panel-account-tags-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminPanelAccountTagsCorePaginateDto } from './admin-panel-account-tags-core.dto';

@Injectable()
export class AdminPanelAccountTagsCoreService extends TypeormBaseRepository<
  AdminPanelAccountTags,
  AdminPanelAccountTagsCorePaginateDto
> {
  constructor(
    @InjectRepository(AdminPanelAccountTags)
    private readonly adminPanelAccountTagsRepository: Repository<AdminPanelAccountTags>,
  ) {
    super(adminPanelAccountTagsRepository);
  }
}
