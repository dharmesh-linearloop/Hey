import { Injectable } from '@nestjs/common';
import * as ChartMogul from 'chartmogul-node';
import { SubscriptionPaymentMethod } from 'src/core/account-subscription-core/account-subscription-core.enum';
import { AccountSubscriptionCoreService } from 'src/core/account-subscription-core/account-subscription-core.service';
import { ShAccountAssignees } from 'src/core/admin-panel-sh-account-assignees-core/admin-panel-sh-account-assignees-core.enum';
import { AdminPanelShAccountAssigneesCoreService } from 'src/core/admin-panel-sh-account-assignees-core/admin-panel-sh-account-assignees-core.service';
import { PlanCoreService } from 'src/core/plan-core/plan-core.service';
import { ShAccountCoreService } from 'src/core/sh-account-core/sh-account-core.service';
import { UserRole } from 'src/core/user-core/user-core.enum';
import { UserCoreService } from 'src/core/user-core/user-core.service';
import { SH_ACCOUNT_STATUS, USER_STATUS } from 'src/keys';
import { Not } from 'typeorm';
import { AppConfigService } from '../../../app-config/app-config.service';

@Injectable()
export class ChartMogulService {
  constructor(
    private planCoreService: PlanCoreService,
    private adminPanelShAccountAssigneesCoreService: AdminPanelShAccountAssigneesCoreService,
    private accountSubscriptionCoreService: AccountSubscriptionCoreService,
    private shAccountCoreService: ShAccountCoreService,
    private userCoreService: UserCoreService,
    private appConfigService: AppConfigService,
  ) {}

  private async getCmUser(params: { email: string }) {
    const { email } = params;
    let cmAccount = null;

    try {
      const cmConfig = new ChartMogul.Config(
        this.appConfigService.chartmogulApiKey,
      );
      const data = await ChartMogul.Customer.search(cmConfig, {
        email,
      });
      if (data?.entries) {
        if (data.entries.length > 0) {
          cmAccount = data.entries[0];
        }
      }
    } catch (error) {}

    return cmAccount;
  }

  private async getDataSource() {
    let uuid = null;
    try {
      const cmConfig = new ChartMogul.Config(
        this.appConfigService.chartmogulApiKey,
      );
      const ds = await ChartMogul.DataSource.all(cmConfig);
      if (ds?.data_sources) {
        if (ds.data_sources.length > 0) {
          if (ds.data_sources[0]?.uuid) {
            uuid = ds.data_sources[0]?.uuid;
          }
        }
      }
    } catch (error) {}

    return uuid;
  }

  private async getSalesSuccess(shAccountId) {
    const returnData = { salesOwner: null, successOwner: null };
    try {
      const accountSalesOwner =
        await this.adminPanelShAccountAssigneesCoreService.findFirst({
          where: {
            shAccountId,
            role: ShAccountAssignees.SALES,
          },
          relations: ['user'],
        });

      returnData['salesOwner'] = accountSalesOwner
        ? `${accountSalesOwner.user.firstName} ${accountSalesOwner.user.lastName}`
        : null;

      const accountSuccessOwner =
        await this.adminPanelShAccountAssigneesCoreService.findFirst({
          where: {
            shAccountId,
            role: ShAccountAssignees.SUCCESS,
          },
          relations: ['user'],
        });

      returnData['successOwner'] = accountSuccessOwner
        ? `${accountSuccessOwner.user.firstName} ${accountSuccessOwner.user.lastName}`
        : null;
    } catch (error) {}

    return returnData;
  }

  private async getCmAttributes(account, accountOwner, accountSubscription) {
    let accountStatus =
      account.deletedAt !== null ? SH_ACCOUNT_STATUS.deleted : null;
    if (accountStatus === null) {
      accountStatus =
        account.status === true
          ? SH_ACCOUNT_STATUS.active
          : SH_ACCOUNT_STATUS.suspended;
    }

    let planName = '';
    const planData = await this.planCoreService.findFirst({
      where: { id: accountSubscription.planId },
    });

    if (planData) {
      planName = planData.name;
    } else {
      console.log(
        `Plan Not Found for this Account Subscription ID: ${accountSubscription.id}`,
      );
    }

    const { salesOwner, successOwner } = await this.getSalesSuccess(account.id);

    const cmAttributes = [
      {
        type: 'String',
        key: 'SH_Account_Status',
        value: accountStatus,
      },
      {
        type: 'String',
        key: 'Renewal_Type',
        value: accountSubscription.renewalType,
      },
      {
        type: 'String',
        key: 'Onboarding_Prospects_To_Contact',
        value: accountOwner.contactableProspect,
      },
      {
        type: 'String',
        key: 'Onboarding_Outreach_Preference',
        value: accountOwner.eventRecipientType,
      },
      {
        type: 'String',
        key: 'Onboarding_Cold_Email_Experience',
        value: accountOwner.priorColdEmailToolExperience,
      },
      {
        type: 'String',
        key: 'Sales_Owner',
        value: salesOwner,
      },
      {
        type: 'String',
        key: 'Success_Owner',
        value: successOwner,
      },
      {
        type: 'String',
        key: 'Payment_Method',
        value: accountSubscription.paymentMethod,
      },
      {
        type: 'String',
        key: 'Onboarding_Industry',
        value: account.industry,
      },
      {
        type: 'String',
        key: 'Onboarding_Job_Role',
        value: accountOwner.designation,
      },
      {
        type: 'String',
        key: 'Onboarding_Use_Case',
        value: accountOwner.useCase,
      },
      {
        type: 'String',
        key: 'Onboarding_Company_Size',
        value: account.teamSize,
      },
      {
        type: 'String',
        key: 'Current_Plan',
        value: planName,
      },
      {
        type: 'String',
        key: 'Plan_Start_Date',
        value: accountSubscription.startAt,
      },
      {
        type: 'String',
        key: 'Plan_End_Date',
        value: accountSubscription.endAt,
      },
      {
        type: 'String',
        key: 'Plan_Status',
        value: accountSubscription.status,
      },
    ];

    return cmAttributes;
  }

  async syncAccount(params: { accountId: number }) {
    const { accountId } = params;

    try {
      const account = await this.shAccountCoreService.findFirst({
        where: { id: accountId },
      });

      const accountSubscription =
        await this.accountSubscriptionCoreService.findFirst({
          where: { shAccountId: accountId },
        });

      const isStripeUser =
        accountSubscription.paymentMethod === SubscriptionPaymentMethod.Stripe;

      const accountOwner = await this.userCoreService.findFirst({
        where: {
          shAccountId: account.id,
          status: Not(USER_STATUS.Deleted),
          role: UserRole.ADMIN,
        },
      });

      if (accountOwner) {
        const cmCustomerData = {
          name: `${accountOwner.firstName} ${accountOwner.lastName}`,
          email: accountOwner.email,
        };

        const cmAttributes = await this.getCmAttributes(
          account,
          accountOwner,
          accountSubscription,
        );

        const cmConfig = new ChartMogul.Config(
          this.appConfigService.chartmogulApiKey,
        );

        const cmAccount = await this.getCmUser({ email: accountOwner.email });

        if (cmAccount?.uuid) {
          await ChartMogul.Customer.modify(
            cmConfig,
            cmAccount?.uuid,
            cmCustomerData,
          );
          await ChartMogul.CustomAttribute.add(cmConfig, cmAccount?.uuid, {
            custom: cmAttributes,
          });
        } else {
          if (!isStripeUser) {
            const dataSourceId = await this.getDataSource();
            if (dataSourceId) {
              await ChartMogul.Customer.create(cmConfig, {
                ...cmCustomerData,
                data_source_uuid: dataSourceId,
                external_id: `${accountOwner.shAccountId}`,
                attributes: { custom: cmAttributes },
              });
            }
          }
        }
      }
    } catch (error) {
      return error;
    }
  }
}
