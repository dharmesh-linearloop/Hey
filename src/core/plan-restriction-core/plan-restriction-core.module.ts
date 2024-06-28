import { Module } from '@nestjs/common';
import { PlanRestrictionCoreService } from './plan-restriction-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanRestriction } from './plan-restriction-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlanRestriction])],
  providers: [PlanRestrictionCoreService],
  exports: [PlanRestrictionCoreService],
})
export class PlanRestrictionCoreModule {}
