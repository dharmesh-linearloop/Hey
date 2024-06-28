import { Module } from '@nestjs/common';
import { WarmupTemplatesCoreService } from './warmup-email-history-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarmupTemplates } from './warmup-email-history-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WarmupTemplates])],
  providers: [WarmupTemplatesCoreService],
  exports: [WarmupTemplatesCoreService],
})
export class WarmupTemplatesCoreModule {}
