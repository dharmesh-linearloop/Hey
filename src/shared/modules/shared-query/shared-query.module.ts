import { Module } from '@nestjs/common';
import { SharedQueryService } from './shared-query.service';
import { EmailAccountSettingCoreModule } from 'src/core/email-account-setting-core/email-account-setting-core.module';
import { ShAccountCoreModule } from 'src/core/sh-account-core/sh-account-core.module';
import { UserCoreModule } from 'src/core/user-core/user-core.module';
import { EmailAccountCoreModule } from 'src/core/email-account-core/email-account-core.module';
import { AdminPanelShAccountNotesCoreModule } from 'src/core/admin-panel-sh-account-notes-core/admin-panel-sh-account-notes-core.module';
import { AdminPanelUserAccessTokensCoreModule } from 'src/core/admin-panel-user-access-tokens-core/admin-panel-user-access-tokens-core.module';
import { SignupBlackListsCoreModule } from 'src/core/signup-black-lists-core/signup-black-lists-core.module';
import { AdminPanelUserCoreModule } from 'src/core/admin-panel-user-core/admin-panel-user-core.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EmailAccountHealth,
  EmailAccountHealthSchema,
} from 'src/core/mongo/schema/email-account-health.schema';
import { PlanCoreModule } from 'src/core/plan-core/plan-core.module';
import { PlanRestrictionCoreModule } from 'src/core/plan-restriction-core/plan-restriction-core.module';
import { AdminPanelTagsCoreModule } from 'src/core/admin-panel-tags-core/admin-panel-tags-core.module';
import { FeatureCoreModule } from 'src/core/feature-core/feature-core.module';
import { AccountSubscriptionCoreModule } from 'src/core/account-subscription-core/account-subscription-core.module';
import { AgencyUserCoreModule } from 'src/core/agency-user-core/agency-user-core.module';
import { AgencyCoreModule } from 'src/core/agency-core/agency-core.module';
import { LeadFinderRevealHistoryCoreModule } from '../../../core/lead-finder-reveal-history-core/lead-finder-reveal-history-core.module';

@Module({
  imports: [
    EmailAccountSettingCoreModule,
    ShAccountCoreModule,
    UserCoreModule,
    EmailAccountCoreModule,
    AdminPanelShAccountNotesCoreModule,
    AdminPanelUserAccessTokensCoreModule,
    SignupBlackListsCoreModule,
    AdminPanelUserCoreModule,
    PlanCoreModule,
    AdminPanelTagsCoreModule,
    PlanRestrictionCoreModule,
    FeatureCoreModule,
    AccountSubscriptionCoreModule,
    AgencyUserCoreModule,
    AgencyCoreModule,
    LeadFinderRevealHistoryCoreModule,
    MongooseModule.forFeature([
      { name: EmailAccountHealth.name, schema: EmailAccountHealthSchema },
    ]),
  ],
  providers: [SharedQueryService],
  exports: [SharedQueryService],
})
export class SharedQueryModule {}
