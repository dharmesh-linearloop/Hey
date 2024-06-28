import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { LeadFinderRevealHistoryCoreModule } from '../../core/lead-finder-reveal-history-core/lead-finder-reveal-history-core.module';
import { SharedQueryModule } from '../../shared/modules/shared-query/shared-query.module';

@Module({
  imports: [LeadFinderRevealHistoryCoreModule, SharedQueryModule],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
