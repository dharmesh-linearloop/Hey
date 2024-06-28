import { Module } from '@nestjs/common';
import { TemplateHistoryCoreService } from './template-history-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateHistory } from './template-history-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TemplateHistory])],
  providers: [TemplateHistoryCoreService],
  exports: [TemplateHistoryCoreService],
})
export class TemplateHistoryCoreModule {}
