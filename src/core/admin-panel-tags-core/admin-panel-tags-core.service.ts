import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { AdminPanelTags } from './admin-panel-tags-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminPanelTagsCorePaginateDto } from './admin-panel-tags-core.dto';

@Injectable()
export class AdminPanelTagsCoreService extends TypeormBaseRepository<
  AdminPanelTags,
  AdminPanelTagsCorePaginateDto
> {
  constructor(
    @InjectRepository(AdminPanelTags)
    private readonly adminpanelTagsRepository: Repository<AdminPanelTags>,
  ) {
    super(adminpanelTagsRepository);
  }
}
