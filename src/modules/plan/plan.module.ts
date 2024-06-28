import { Module } from '@nestjs/common';
import { PlanController } from './plan.controller';
import { PlanCoreModule } from 'src/core/plan-core/plan-core.module';
import { PlanService } from './plan.service';
import { SharedQueryModule } from 'src/shared/modules/shared-query/shared-query.module';
import { FeatureCoreModule } from 'src/core/feature-core/feature-core.module';
import { PlanRestrictionCoreModule } from 'src/core/plan-restriction-core/plan-restriction-core.module';
import { SharedColumnsModule } from 'src/shared/modules/shared-columns/shared-columns.module';
import { StripeModule } from 'src/shared/modules/stripe/stripe.module';

@Module({
  imports: [
    StripeModule,
    PlanCoreModule,
    FeatureCoreModule,
    PlanRestrictionCoreModule,
    SharedColumnsModule,
    SharedQueryModule,
  ],
  controllers: [PlanController],
  providers: [PlanService],
  exports: [PlanService],
})
export class PlanModule {}
