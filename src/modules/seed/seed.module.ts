import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AdminPanelUserCoreModule } from 'src/core/admin-panel-user-core/admin-panel-user-core.module';

@Module({
  imports: [AdminPanelUserCoreModule],
  controllers: [SeedController],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
