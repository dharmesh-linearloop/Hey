import { Module } from '@nestjs/common';
import { LeadFinderRevealHistoryCoreService } from './lead-finder-reveal-history-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadFinderRevealHistory } from './lead-finder-reveal-history-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeadFinderRevealHistory])],
  providers: [LeadFinderRevealHistoryCoreService],
  exports: [LeadFinderRevealHistoryCoreService],
})
export class LeadFinderRevealHistoryCoreModule {}
