import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { ShAccountCoreModule } from 'src/core/sh-account-core/sh-account-core.module';
import { SharedQueryModule } from 'src/shared/modules/shared-query/shared-query.module';
import { AdminPanelShAccountNotesCoreModule } from 'src/core/admin-panel-sh-account-notes-core/admin-panel-sh-account-notes-core.module';

@Module({
  imports: [
    ShAccountCoreModule,
    SharedQueryModule,
    AdminPanelShAccountNotesCoreModule,
  ],
  controllers: [NoteController],
  providers: [NoteService],
  exports: [NoteService],
})
export class NoteModule {}
