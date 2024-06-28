import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { ShAccountCoreModule } from 'src/core/sh-account-core/sh-account-core.module';
import { SharedColumnsModule } from 'src/shared/modules/shared-columns/shared-columns.module';
import { UserCoreModule } from 'src/core/user-core/user-core.module';
import { EmailVerificationCreditUsageCoreModule } from 'src/core/email-verification-credit-usage-core/email-verification-credit-usage-core.module';
import { SharedQueryModule } from 'src/shared/modules/shared-query/shared-query.module';
import { SharedLogModule } from 'src/shared/modules/shared-log/shared-log.module';
import { SharedUserQueryModule } from 'src/shared/modules/shared-user-query/shared-user-query.module';
import { PlanCoreModule } from 'src/core/plan-core/plan-core.module';
import { AccountSubscriptionCoreModule } from 'src/core/account-subscription-core/account-subscription-core.module';
import { AccountSubscriptionHistoryCoreModule } from 'src/core/account-subscription-history-core/account-subscription-history-core.module';
import { PlanRestrictionCoreModule } from 'src/core/plan-restriction-core/plan-restriction-core.module';
import { AccountUsageCoreModule } from 'src/core/account-usage-core/account-usage-core.module';
import { StripeSubscriptionHistoryCoreModule } from 'src/core/stripe-subscription-history-core/stripe-subscription-history-core.module';
import { AdminPanelUserCoreModule } from 'src/core/admin-panel-user-core/admin-panel-user-core.module';
import { AdminPanelShAccountAssigneesCoreModule } from 'src/core/admin-panel-sh-account-assignees-core/admin-panel-sh-account-assignees-core.module';
import { AdminPanelAccountTagsCoreModule } from 'src/core/admin-panel-account-tags-core/admin-panel-account-tags-core.module';
import { AdminPanelTagsCoreModule } from 'src/core/admin-panel-tags-core/admin-panel-tags-core.module';
import { ChartMogulModule } from 'src/shared/modules/chart-mogul/chart-mogul.module';
import { AxiosModule } from 'src/shared/modules/axios/axios.module';
import { ProspectCoreModule } from '../../core/prospect-core/prospect-core.module';
import { ChangeSubscriptionService } from './subscription-change.service';
import { TeamMemberRoleCoreModule } from 'src/core/team-member-role-core/team-member-role-core.module';
import { ShAccountSettingsCoreModule } from 'src/core/sh-account-settings-core/sh-account-settings-core.module';
import { UserRoleCoreModule } from 'src/core/user-role-core/user-role-core.module';
import { SystemRoleCoreModule } from 'src/core/system-role-core/system-role-core.module';
import { TeamMemberCoreModule } from 'src/core/team-member-core/team-member-core.module';
import { UserTokenCoreModule } from 'src/core/user-token-core/user-token-core.module';

@Module({
  imports: [
    AxiosModule,
    ShAccountCoreModule,
    SharedColumnsModule,
    UserCoreModule,
    SharedQueryModule,
    EmailVerificationCreditUsageCoreModule,
    SharedLogModule,
    SharedUserQueryModule,
    PlanCoreModule,
    AccountSubscriptionCoreModule,
    AccountSubscriptionHistoryCoreModule,
    PlanRestrictionCoreModule,
    AccountUsageCoreModule,
    StripeSubscriptionHistoryCoreModule,
    AdminPanelUserCoreModule,
    AdminPanelShAccountAssigneesCoreModule,
    AdminPanelAccountTagsCoreModule,
    AdminPanelTagsCoreModule,
    TeamMemberRoleCoreModule,
    ShAccountSettingsCoreModule,
    ChartMogulModule,
    ProspectCoreModule,
    UserRoleCoreModule,
    SystemRoleCoreModule,
    TeamMemberRoleCoreModule,
    TeamMemberCoreModule,
    UserTokenCoreModule,
  ],
  controllers: [AccountController],
  providers: [AccountService, ChangeSubscriptionService],
  exports: [AccountService],
})
export class AccountModule {}
