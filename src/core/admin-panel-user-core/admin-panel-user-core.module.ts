import { Module } from '@nestjs/common';
import { AdminPanelUserCoreService } from './admin-panel-user-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminPanelUser } from './admin-panel-user-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminPanelUser])],
  providers: [AdminPanelUserCoreService],
  exports: [AdminPanelUserCoreService],
})
export class AdminPanelUserCoreModule {}
