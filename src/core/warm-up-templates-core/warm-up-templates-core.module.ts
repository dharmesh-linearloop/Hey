import { Module } from '@nestjs/common';
import { WarmupEmailHistoryCoreService } from './warm-up-templates-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarmupEmailHistory } from './warm-up-templates-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WarmupEmailHistory])],
  providers: [WarmupEmailHistoryCoreService],
  exports: [WarmupEmailHistoryCoreService],
})
export class WarmupEmailHistoryCoreModule {}
