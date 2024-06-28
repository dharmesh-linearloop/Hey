import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { AdminPanelShAccountNotes } from './admin-panel-sh-account-notes-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminPanelShAccountNotesCorePaginateDto } from './admin-panel-sh-account-notes-core.dto';

@Injectable()
export class AdminPanelShAccountNotesCoreService extends TypeormBaseRepository<
  AdminPanelShAccountNotes,
  AdminPanelShAccountNotesCorePaginateDto
> {
  constructor(
    @InjectRepository(AdminPanelShAccountNotes)
    private readonly adminPanelShAccountNotesRepository: Repository<AdminPanelShAccountNotes>,
  ) {
    super(adminPanelShAccountNotesRepository);
  }
}
