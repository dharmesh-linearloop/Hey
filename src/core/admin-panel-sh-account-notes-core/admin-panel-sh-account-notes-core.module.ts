import { Module } from '@nestjs/common';
import { AdminPanelShAccountNotesCoreService } from './admin-panel-sh-account-notes-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminPanelShAccountNotes } from './admin-panel-sh-account-notes-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminPanelShAccountNotes])],
  providers: [AdminPanelShAccountNotesCoreService],
  exports: [AdminPanelShAccountNotesCoreService],
})
export class AdminPanelShAccountNotesCoreModule {}
