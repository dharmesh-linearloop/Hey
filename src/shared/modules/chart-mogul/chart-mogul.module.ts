import { Global, Module } from '@nestjs/common';
import { ChartMogulService } from './chart-mogul.service';
import { ShAccountCoreModule } from 'src/core/sh-account-core/sh-account-core.module';
import { UserCoreModule } from 'src/core/user-core/user-core.module';
import { AccountSubscriptionCoreModule } from 'src/core/account-subscription-core/account-subscription-core.module';
import { AdminPanelShAccountAssigneesCoreModule } from 'src/core/admin-panel-sh-account-assignees-core/admin-panel-sh-account-assignees-core.module';
import { PlanCoreModule } from 'src/core/plan-core/plan-core.module';

@Global()
@Module({
  imports: [
    PlanCoreModule,
    AdminPanelShAccountAssigneesCoreModule,
    AccountSubscriptionCoreModule,
    ShAccountCoreModule,
    UserCoreModule,
  ],
  providers: [ChartMogulService],
  exports: [ChartMogulService],
})
export class ChartMogulModule {}
