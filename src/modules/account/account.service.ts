import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AdminSessionType } from 'src/shared/types/admin-session.type';
import { ListAccountDto } from './dto/list-account.dto';
import { ShAccountCoreService } from 'src/core/sh-account-core/sh-account-core.service';
import { ShAccountCorePaginateDto } from 'src/core/sh-account-core/sh-account-core.dto';
import { DateTime } from 'luxon';
import { DeleteAccountDto } from './dto/delete-account.dto';
import { SuspendAccountDto } from './dto/suspend-account.dto';
import {
  COMMON_ERROR_MESSAGES,
  DATE_SETTINGS,
  DEFAULT_LTD_EMAIL_OUTREACH_PRO_EV_CREDIT,
  LtdPlanIds,
  USER_STATUS,
} from 'src/keys';
import { UserCoreService } from 'src/core/user-core/user-core.service';
import { UpdateEmailVerificationCreditUsageDto } from './dto/update-email-verification-credit-usage.dto';
import { EmailVerificationCreditUsageCoreService } from 'src/core/email-verification-credit-usage-core/email-verification-credit-usage-core.service';
import { SharedQueryService } from 'src/shared/modules/shared-query/shared-query.service';
import { SharedLogService } from 'src/shared/modules/shared-log/shared-log.service';
import { UpdateAccountSubscriptionDto } from './dto/update-account-subscription.dto';
import { PlanCoreService } from 'src/core/plan-core/plan-core.service';
import { AccountSubscriptionCoreService } from 'src/core/account-subscription-core/account-subscription-core.service';
import { AccountSubscriptionHistoryCoreService } from 'src/core/account-subscription-history-core/account-subscription-history-core.service';
import { PlanRestrictionCoreService } from 'src/core/plan-restriction-core/plan-restriction-core.service';
import { AccountUsageCoreService } from 'src/core/account-usage-core/account-usage-core.service';
import {
  arrayColumn,
  updateDates,
  updateDatesArr,
  getUserDate,
} from 'src/shared/modules/common/common.helper';
import { SharedUserQueryService } from 'src/shared/modules/shared-user-query/shared-user-query.service';
import { StripeSubscriptionHistoryCoreService } from 'src/core/stripe-subscription-history-core/stripe-subscription-history-core.service';
import { In, IsNull, Not } from 'typeorm';
import { ShAccountAssignees } from 'src/core/admin-panel-sh-account-assignees-core/admin-panel-sh-account-assignees-core.enum';
import { AdminPanelUserCoreService } from 'src/core/admin-panel-user-core/admin-panel-user-core.service';
import { AdminPanelShAccountAssigneesCoreService } from 'src/core/admin-panel-sh-account-assignees-core/admin-panel-sh-account-assignees-core.service';
import { MasterLogEnum } from 'src/core/mongo/schema/master-log.schema';
import { AssignSalesOwnerMultiAccountsDto } from './dto/assign-sales-owner-multi-accounts.dto';
import { AssignSuccessOwnerMultiAccountsDto } from './dto/assign-success-owner-multi-accounts.dto';
import { AssignTagsToShAccountDto } from './dto/assign-tags-to-sh-account.dto';
import { AdminPanelAccountTagsCoreService } from 'src/core/admin-panel-account-tags-core/admin-panel-account-tags-core.service';
import { AdminPanelTagsCoreService } from 'src/core/admin-panel-tags-core/admin-panel-tags-core.service';
import { UnassignTagFromShAccountDto } from './dto/unassign-tag-from-sh-account.dto';
import { AssignTagsToMultiShAccountsDto } from './dto/assign-tags-to-multi-sh-accounts.dto';
import { ChartMogulService } from 'src/shared/modules/chart-mogul/chart-mogul.service';
import { AxiosService } from 'src/shared/modules/axios/axios.service';
import {
  SubscriptionPaymentMethod,
  SubscriptionPaymentMethodDto,
} from 'src/core/account-subscription-core/account-subscription-core.enum';
import { FeatureCode } from '../../core/feature-core/feature-core.enum';
import { AccountUsage } from '../../core/account-usage-core/account-usage-core.entity';
import { ProspectCoreService } from '../../core/prospect-core/prospect-core.service';
import { StripeService } from 'src/shared/modules/stripe/stripe.service';
import { SubscriptionType } from 'src/shared/types/subscription';
import { ChangeSubscriptionService } from './subscription-change.service';
import { SubscriptionStatus } from '../../core/stripe-subscription-history-core/stripe-subscription-history-core.enum';

@Injectable()
export class AccountService {
  private readonly logger: Logger = new Logger(AccountService.name);

  constructor(
    private readonly axiosService: AxiosService,
    private shAccountCoreService: ShAccountCoreService,
    private userCoreService: UserCoreService,
    private sharedQueryService: SharedQueryService,
    private emailVerificationCreditUsageCoreService: EmailVerificationCreditUsageCoreService,
    private sharedLogService: SharedLogService,
    private sharedUserQueryService: SharedUserQueryService,
    private planCoreService: PlanCoreService,
    private accountSubscriptionCoreService: AccountSubscriptionCoreService,
    private accountSubscriptionHistoryCoreService: AccountSubscriptionHistoryCoreService,
    private planRestrictionCoreService: PlanRestrictionCoreService,
    private accountUsageCoreService: AccountUsageCoreService,
    private stripeSubscriptionHistoryCoreService: StripeSubscriptionHistoryCoreService,
    private adminPanelUserCoreService: AdminPanelUserCoreService,
    private adminPanelShAccountAssigneesCoreService: AdminPanelShAccountAssigneesCoreService,
    private adminPanelAccountTagsCoreService: AdminPanelAccountTagsCoreService,
    private adminPanelTagsCoreService: AdminPanelTagsCoreService,
    private readonly changeSubscriptionService: ChangeSubscriptionService,
    private chartMogulService: ChartMogulService,
    private prospectCoreService: ProspectCoreService,
    private stripeService: StripeService,
  ) {}

  async findById(params: {
    sessionData?: AdminSessionType;
    accountId: number;
  }) {
    const { accountId } = params;

    const modelQuery = await this.sharedQueryService.getAccountQuery({
      query: { where: { id: accountId } },
    });

    const accountList = await this.shAccountCoreService.getQueryBuilderPaginate(
      {
        query: { where: { id: accountId } },
        modelQuery,
      },
    );

    let account: any = accountList.list[0];

    if (account) {
      account = await this.sharedQueryService.getAccountMeta({ account });

      return updateDates(JSON.parse(JSON.stringify(account)));
    } else {
      return {};
    }
  }

  async findAll(params: {
    sessionData: AdminSessionType;
    query: ListAccountDto;
  }): Promise<ShAccountCorePaginateDto> {
    const { query } = params;

    const modelQuery = await this.sharedQueryService.getAccountQuery({
      query,
    });

    const accountList = await this.shAccountCoreService.getQueryBuilderPaginate(
      {
        query,
        modelQuery,
      },
    );

    await Promise.all(
      accountList.list.map(async (data, i) => {
        accountList.list[i] = await this.sharedQueryService.getAccountMeta({
          account: accountList.list[i],
        });
      }),
    );

    accountList.list = await updateDatesArr(accountList.list);
    return accountList;
  }

  async deleteById(params: {
    sessionData: AdminSessionType;
    accountId: number;
    deleteAccountDto: DeleteAccountDto;
    ipAddress: string;
  }) {
    const {
      accountId,
      deleteAccountDto: { reason },
      sessionData,
      ipAddress,
    } = params;

    const findAccount = await this.shAccountCoreService.findFirst({
      where: { id: accountId, deletedAt: IsNull(), status: true },
    });

    if (!findAccount) {
      throw new BadRequestException(COMMON_ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
    }

    const findUser = await this.userCoreService.findMany({
      where: { shAccountId: findAccount.id },
    });

    const findUserIds = findUser.map((user) => user.id);

    await Promise.all(
      findUserIds.map(async (userId) => {
        await this.sharedUserQueryService.deleteUser({ userId });
      }),
    );

    const updatedAccount = await this.shAccountCoreService.update({
      where: { id: accountId },
      data: { status: false, deletedAt: DateTime.utc().toISO() },
    });

    const adminUserId = sessionData?.user?.id;

    await this.sharedLogService.processLog({
      event: MasterLogEnum.ShAccountDeleted,
      eventLogDetail: {
        accountId,
        executorId: adminUserId,
        ipAddress,
        logData: {
          accountId,
          note: reason,
        },
      },
    });

    await this.syncAccountWithChartMogul({ accountId });

    return updatedAccount;
  }

  async suspendById(params: {
    sessionData: AdminSessionType;
    accountId: number;
    suspendAccountDto: SuspendAccountDto;
    ipAddress: string;
  }) {
    const {
      accountId,
      suspendAccountDto: { reason },
      sessionData,
      ipAddress,
    } = params;

    const findAccount = await this.shAccountCoreService.findFirst({
      where: { id: accountId, deletedAt: IsNull(), status: true },
    });

    if (!findAccount) {
      throw new BadRequestException(COMMON_ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
    }

    const findUser = await this.userCoreService.findMany({
      where: { shAccountId: findAccount.id },
    });

    const findUserIds = findUser.map((user) => user.id);

    await Promise.all(
      findUserIds.map(async (userId) => {
        await this.sharedUserQueryService.deleteUser({
          userId,
          inactiveOnly: true,
        });
      }),
    );

    // update status active to inactive
    const suspendedAccount = await this.shAccountCoreService.update({
      where: { id: accountId },
      data: { status: false, modifiedAt: DateTime.utc().toISO() },
    });

    const adminUserId = sessionData?.user?.id;

    await this.sharedLogService.processLog({
      event: MasterLogEnum.ShAccountSuspended,
      eventLogDetail: {
        accountId,
        executorId: adminUserId,
        ipAddress,
        logData: {
          accountId,
          note: reason,
        },
      },
    });

    await this.syncAccountWithChartMogul({ accountId });

    return suspendedAccount;
  }

  async syncAccountWithChartMogul(params: { accountId: number }) {
    const { accountId } = params;
    await this.chartMogulService.syncAccount({ accountId });
    return true;
  }

  async updateEVCreditUsageById(params: {
    sessionData: AdminSessionType;
    shAccountId: number;
    updateEmailVerificationCreditUsageDto: UpdateEmailVerificationCreditUsageDto;
    ipAddress: string;
  }) {
    const {
      shAccountId,
      updateEmailVerificationCreditUsageDto: { creditsAvailable, note },
      sessionData,
      ipAddress,
    } = params;

    const findAccount = await this.shAccountCoreService.findFirst({
      where: { id: shAccountId, deletedAt: IsNull(), status: true },
    });

    if (!findAccount) {
      throw new BadRequestException(COMMON_ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
    }

    const findEVAccount =
      await this.emailVerificationCreditUsageCoreService.findFirst({
        where: { shAccountId },
      });

    const availableCredits = findEVAccount?.creditsAvailable || 0;

    const finalCredit = creditsAvailable
      ? availableCredits + creditsAvailable
      : availableCredits;

    const updateEVCredit =
      await this.emailVerificationCreditUsageCoreService.upsert({
        where: { shAccountId },
        create: { shAccountId, creditsAvailable },
        update: {
          creditsAvailable: finalCredit,
          modifiedAt: DateTime.utc().toISO(),
        },
      });

    const adminUserId = sessionData?.user?.id;

    await this.sharedLogService.processLog({
      event: MasterLogEnum.EvCreditsUpdated,
      eventLogDetail: {
        accountId: shAccountId,
        executorId: adminUserId,
        ipAddress,
        logData: {
          accountId: shAccountId,
          credits: creditsAvailable,
          note: note ?? 'EV Credit Updated',
        },
      },
    });

    await this.syncAccountWithChartMogul({ accountId: shAccountId });

    return updateEVCredit;
  }

  private getPaymentMethod(params: {
    updateAccountSubscriptionDto: UpdateAccountSubscriptionDto;
  }) {
    const { updateAccountSubscriptionDto } = params;

    const { paymentMethod: paymentMethodValue } = updateAccountSubscriptionDto;
    let paymentMethod: SubscriptionPaymentMethod = null;

    if (paymentMethodValue) {
      if (paymentMethodValue !== SubscriptionPaymentMethodDto.Null) {
        const paymentMethodKey = Object.keys(SubscriptionPaymentMethodDto)[
          Object.values(SubscriptionPaymentMethodDto).indexOf(
            paymentMethodValue,
          )
        ];

        paymentMethod = SubscriptionPaymentMethod[paymentMethodKey];
      }
    }

    return paymentMethod;
  }

  async updateAccountSubscriptionById(params: {
    sessionData: AdminSessionType;
    shAccountId: number;
    updateAccountSubscriptionDto: UpdateAccountSubscriptionDto;
    ipAddress: string;
  }) {
    const {
      shAccountId,
      updateAccountSubscriptionDto,
      sessionData: {
        user: { id: adminUserId },
      },
      ipAddress,
    } = params;

    this.logger.log(`updateAccountSubscriptionById: ${JSON.stringify(params)}`);

    const {
      planId,
      slotSize,
      customerId,
      subscriptionId,
      note,
      renewalType,
      applicationType,
    } = updateAccountSubscriptionDto;

    let { startAt, endAt } = updateAccountSubscriptionDto;

    const paymentMethod = this.getPaymentMethod({
      updateAccountSubscriptionDto,
    });

    if (startAt) {
      startAt = DateTime.fromFormat(startAt, DATE_SETTINGS.DATE_TIME_FORMAT, {
        zone: DATE_SETTINGS.DEFAULT_TZ,
      }).toISO();
    }

    if (endAt) {
      endAt = DateTime.fromFormat(endAt, DATE_SETTINGS.DATE_TIME_FORMAT, {
        zone: DATE_SETTINGS.DEFAULT_TZ,
      }).toISO();
    }

    const accountData: any = await this.shAccountCoreService.findFirst({
      where: { id: shAccountId, deletedAt: IsNull(), status: true },
    });

    if (!accountData) {
      throw new BadRequestException(COMMON_ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
    }

    const accountSubscriptionData =
      await this.accountSubscriptionCoreService.findFirst({
        where: { shAccountId, application: applicationType },
      });

    if (!accountSubscriptionData) {
      throw new BadRequestException(
        COMMON_ERROR_MESSAGES.ACCOUNT_SUBSCRIPTION_NOT_FOUND,
      );
    }

    let isPlanChanged = false;
    const accountSubscriptionId = accountSubscriptionData.id;

    if (planId) {
      if (accountSubscriptionData.planId !== planId) {
        isPlanChanged = true;
      }
    }

    if (!isPlanChanged) {
      await this.accountSubscriptionCoreService.update({
        where: { id: accountSubscriptionId },
        data: {
          planId,
          slots: slotSize,
          paymentMethod,
          customerId,
          subscriptionId,
          startAt,
          endAt,
          renewalType,
        },
      });

      await this.createAccountUsage({ shAccountId, planId });
    } else {
      const planData = await this.planCoreService.findFirst({
        where: { id: planId },
      });

      if (!planData) {
        throw new BadRequestException(COMMON_ERROR_MESSAGES.PLAN_NOT_FOUND);
      }

      const basePlanId = planData?.parentId || planData.id;
      const isLtd = LtdPlanIds.includes(basePlanId);

      if (isLtd) {
        await this.updateLTDAccountSubscription({
          shAccountId,
          planId,
          updateAccountSubscriptionDto,
        });
      } else {
        const accountSubscription =
          await this.accountSubscriptionCoreService.update({
            where: { id: accountSubscriptionId, application: applicationType },
            data: {
              planId,
              slots: slotSize,
              customerId,
              paymentMethod,
              subscriptionId,
              startAt,
              endAt,
              renewalType,
            },
          });

        await this.addAccountSubscriptionHistory({
          accountSubscriptionId: accountSubscription.id,
          planId: accountSubscription.planId,
          slots: accountSubscription.slots,
        });

        await this.createAccountUsage({ shAccountId, planId });
      }
      await this.changeSubscriptionService.shiftRolesToNewPlan(
        planId,
        shAccountId,
      );
    }

    if (isPlanChanged) {
      await this.sharedLogService.processLog({
        event: MasterLogEnum.AccountSubscriptionPlanUpdated,
        eventLogDetail: {
          accountId: shAccountId,
          executorId: adminUserId,
          ipAddress,
          logData: {
            accountId: shAccountId,
            note: note ?? 'Account Subscription Updated',
          },
        },
      });
    }

    if (accountSubscriptionData.slots !== slotSize) {
      await this.sharedLogService.processLog({
        event: MasterLogEnum.AccountSubscriptionSlotUpdated,
        eventLogDetail: {
          accountId: shAccountId,
          executorId: adminUserId,
          ipAddress,
          logData: {
            accountId: shAccountId,
            note: note ?? 'Slot Count Updated',
          },
        },
      });
    }

    if (accountSubscriptionData.paymentMethod !== paymentMethod) {
      await this.sharedLogService.processLog({
        event: MasterLogEnum.AccountSubscriptionPaymentMethodUpdated,
        eventLogDetail: {
          accountId: shAccountId,
          executorId: adminUserId,
          ipAddress,
          logData: {
            accountId: shAccountId,
            note: note ?? 'Payment Method Updated',
          },
        },
      });
    }

    if (accountSubscriptionData.renewalType !== renewalType) {
      await this.sharedLogService.processLog({
        event: MasterLogEnum.AccountSubscriptionRenewalTypeUpdated,
        eventLogDetail: {
          accountId: shAccountId,
          executorId: adminUserId,
          ipAddress,
          logData: {
            accountId: shAccountId,
            note: note ?? 'Renewal Type Updated',
          },
        },
      });
    }

    if (accountSubscriptionData.subscriptionId !== subscriptionId) {
      await this.sharedLogService.processLog({
        event: MasterLogEnum.AccountSubscriptionSubscriptionIdUpdated,
        eventLogDetail: {
          accountId: shAccountId,
          executorId: adminUserId,
          ipAddress,
          logData: {
            accountId: shAccountId,
            note: note ?? 'Account Subscription SubscriptionId Updated',
          },
        },
      });
    }

    if (accountSubscriptionData.customerId !== customerId) {
      await this.sharedLogService.processLog({
        event: MasterLogEnum.AccountSubscriptionCustomerIdUpdated,
        eventLogDetail: {
          accountId: shAccountId,
          executorId: adminUserId,
          ipAddress,
          logData: {
            accountId: shAccountId,
            note: note ?? 'Account Subscription CustomerId Updated',
          },
        },
      });
    }

    if (startAt) {
      const checkStartAt = DateTime.fromJSDate(accountSubscriptionData.startAt)
        .setZone(DATE_SETTINGS.DEFAULT_TZ)
        .toFormat(DATE_SETTINGS.DATE_TIME_FORMAT);

      if (updateAccountSubscriptionDto.startAt !== checkStartAt) {
        await this.sharedLogService.processLog({
          event: MasterLogEnum.AccountSubscriptionStartDateUpdated,
          eventLogDetail: {
            accountId: shAccountId,
            executorId: adminUserId,
            ipAddress,
            logData: {
              accountId: shAccountId,
              note: note ?? 'Plan Start Date Updated',
            },
          },
        });
      }
    }

    if (endAt) {
      const checkEndAt = DateTime.fromJSDate(accountSubscriptionData.endAt)
        .setZone(DATE_SETTINGS.DEFAULT_TZ)
        .toFormat(DATE_SETTINGS.DATE_TIME_FORMAT);

      if (updateAccountSubscriptionDto.endAt !== checkEndAt) {
        await this.sharedLogService.processLog({
          event: MasterLogEnum.AccountSubscriptionEndDateUpdated,
          eventLogDetail: {
            accountId: shAccountId,
            executorId: adminUserId,
            ipAddress,
            logData: {
              accountId: shAccountId,
              note: note ?? 'Plan End Date Updated',
            },
          },
        });
      }
    }

    if (customerId) {
      await this.stripeService.updateCustomerMetadata({
        shAccountId,
        customerId,
      });
    }

    await this.syncAccountWithChartMogul({ accountId: shAccountId });

    this.sharedUserQueryService.propagateRenewSuccess(shAccountId);

    return true;
  }

  private async updateLTDAccountSubscription(params: {
    shAccountId: number;
    planId: number;
    updateAccountSubscriptionDto: UpdateAccountSubscriptionDto;
  }): Promise<void> {
    const { shAccountId, updateAccountSubscriptionDto, planId } = params;

    const {
      slotSize,
      subscriptionId,
      customerId,
      renewalType,
      applicationType,
    } = updateAccountSubscriptionDto;

    const paymentMethod = this.getPaymentMethod({
      updateAccountSubscriptionDto,
    });

    let { startAt, endAt } = updateAccountSubscriptionDto;

    if (startAt) {
      startAt = DateTime.fromFormat(startAt, DATE_SETTINGS.DATE_TIME_FORMAT, {
        zone: DATE_SETTINGS.DEFAULT_TZ,
      }).toISO();
    }

    if (endAt) {
      endAt = DateTime.fromFormat(endAt, DATE_SETTINGS.DATE_TIME_FORMAT, {
        zone: DATE_SETTINGS.DEFAULT_TZ,
      }).toISO();
    }

    const accountSubscription =
      await this.accountSubscriptionCoreService.findFirst({
        where: { shAccountId, application: applicationType },
      });

    if (accountSubscription) {
      await this.accountSubscriptionCoreService.update({
        where: { id: accountSubscription.id, application: applicationType },
        data: {
          slots: slotSize,
          startAt,
          endAt,
          planId,
          subscriptionId,
          paymentMethod,
          customerId,
          renewalType,
        },
      });

      accountSubscription.planId = planId;
      accountSubscription.slots += slotSize;
    } else {
      await this.accountSubscriptionCoreService.create({
        data: {
          shAccountId,
          slots: slotSize,
          startAt,
          endAt,
          planId,
          subscriptionId,
          paymentMethod,
          renewalType,
          customerId,
          userQuota: 0,
          emailAccountQuota: 0,
          application: applicationType,
        },
      });
    }

    await this.addAccountSubscriptionHistory({
      accountSubscriptionId: accountSubscription.id,
      planId: accountSubscription.planId,
      slots: accountSubscription.slots,
    });

    await this.createAccountUsage({ shAccountId, planId });

    const evCreditExists =
      await this.emailVerificationCreditUsageCoreService.findFirst({
        where: { shAccountId },
      });

    if (evCreditExists?.id) {
      await this.emailVerificationCreditUsageCoreService.update({
        where: { id: evCreditExists.id },
        data: {
          shAccountId,
          creditsAvailable: evCreditExists
            ? evCreditExists.creditsAvailable +
              slotSize * DEFAULT_LTD_EMAIL_OUTREACH_PRO_EV_CREDIT
            : slotSize * DEFAULT_LTD_EMAIL_OUTREACH_PRO_EV_CREDIT,
        },
      });
    } else {
      await this.emailVerificationCreditUsageCoreService.create({
        data: {
          shAccountId,
          creditsAvailable: evCreditExists
            ? evCreditExists.creditsAvailable +
              slotSize * DEFAULT_LTD_EMAIL_OUTREACH_PRO_EV_CREDIT
            : slotSize * DEFAULT_LTD_EMAIL_OUTREACH_PRO_EV_CREDIT,
        },
      });
    }

    await this.stripeSubscriptionHistoryCoreService.create({
      data: {
        accountSubscriptionId: accountSubscription.id,
        status: SubscriptionStatus.Success,
      },
    });
  }

  private async addAccountSubscriptionHistory(params: {
    accountSubscriptionId: number;
    planId: number;
    slots: number;
  }): Promise<void> {
    const { accountSubscriptionId, planId, slots } = params;

    await this.accountSubscriptionHistoryCoreService.create({
      data: {
        accountSubscriptionId,
        planId,
        slots,
        userQuota: 0,
        emailAccountQuota: 0,
      },
    });
  }

  private async createAccountUsage(params: {
    shAccountId: number;
    planId: number;
  }): Promise<void> {
    const { shAccountId, planId } = params;

    const accountSubscriptionsData =
      await this.accountSubscriptionCoreService.findMany({
        where: { shAccountId },
      });

    const currentPlanIds = accountSubscriptionsData.map(({ planId }) => planId);

    const shouldHavePlanRestrictions =
      await this.planRestrictionCoreService.findMany({
        where: { planId: In(currentPlanIds) },
      });
    const shouldHavePlanRestrictionIds = shouldHavePlanRestrictions.map(
      ({ id }) => id,
    );

    if (shouldHavePlanRestrictionIds.length > 0) {
      await this.accountUsageCoreService.deleteMany({
        where: {
          shAccountId,
          planRestrictionId: Not(In(shouldHavePlanRestrictionIds)),
        },
      });
    } else {
      await this.accountUsageCoreService.deleteMany({
        where: { shAccountId },
      });
    }

    const planRestrictions = await this.planRestrictionCoreService.findMany({
      where: { planId },
      relations: ['feature'],
    });

    const newAccountUsages = [];
    for (const planRestriction of planRestrictions) {
      const check = await this.accountUsageCoreService.findFirst({
        where: {
          shAccountId,
          planRestrictionId: planRestriction.id,
        },
      });

      if (check) {
        await this.accountUsageCoreService.update({
          where: { id: check.id },
          data: { value: check.value },
        });
      } else {
        let resValue = planRestriction.value;

        if (
          planRestriction.feature.code === FeatureCode.ProspectAdd &&
          planRestriction.value !== null
        ) {
          const prospectCount = await this.prospectCoreService.getProspectCount(
            shAccountId,
          );
          resValue = String(Number(resValue) - prospectCount);
        }

        const newAccountUsage = new AccountUsage();
        newAccountUsage.shAccountId = shAccountId;
        newAccountUsage.planRestrictionId = planRestriction.id;
        newAccountUsage.value = resValue;

        newAccountUsages.push(newAccountUsage);
      }
    }
    if (newAccountUsages) {
      await this.accountUsageCoreService.createMany({
        data: newAccountUsages,
      });
    }
  }

  private async getBulkAccountIds(params: {
    shAccountIds?: number[];
    filters?: ListAccountDto;
  }) {
    const { filters, shAccountIds } = params;
    let returnAccountIds = [];

    if (!shAccountIds && !filters) {
      throw new BadRequestException(COMMON_ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
    }

    if (shAccountIds) {
      if (shAccountIds.length == 0) {
        throw new BadRequestException(COMMON_ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
      }

      const uniqueShAccountIds = [...new Set(shAccountIds)];
      const shAccountData = await this.shAccountCoreService.findMany({
        where: { id: In(uniqueShAccountIds) },
      });

      if (shAccountData.length !== uniqueShAccountIds.length) {
        throw new BadRequestException(COMMON_ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
      }

      returnAccountIds = uniqueShAccountIds;
    } else if (filters) {
      delete filters.take;
      delete filters.skip;

      const modelQuery = await this.sharedQueryService.getAccountQuery({
        query: filters,
      });

      const accountList =
        await this.shAccountCoreService.getQueryBuilderPaginate({
          query: filters,
          modelQuery,
          isExport: true,
        });

      returnAccountIds = arrayColumn(accountList, 'id');
    }

    if (returnAccountIds.length == 0) {
      throw new BadRequestException(COMMON_ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
    }

    return returnAccountIds;
  }

  private async addShAccountLog(params: {
    sessionData: AdminSessionType;
    shAccountId: number;
    ipAddress: string;
    event: MasterLogEnum;
    logData: any;
  }) {
    const { sessionData, shAccountId, ipAddress, event, logData } = params;

    const adminUserId = sessionData?.user?.id;

    await this.sharedLogService.processLog({
      event,
      eventLogDetail: {
        accountId: shAccountId,
        executorId: adminUserId,
        ipAddress,
        logData,
      },
      isAdminLog: true,
    });
  }

  private async applySalesOrSuccessOwnerToShAccountIds(params: {
    sessionData: AdminSessionType;
    userId: number;
    role: ShAccountAssignees;
    shAccountIds?: number[];
    filters?: ListAccountDto;
    removeOnly?: boolean;
    ipAddress: string;
  }) {
    const {
      userId,
      sessionData,
      shAccountIds,
      filters,
      removeOnly = false,
      role,
      ipAddress,
    } = params;

    const accountIds = await this.getBulkAccountIds({ shAccountIds, filters });

    const findUser = await this.adminPanelUserCoreService.findFirst({
      where: { id: userId, status: USER_STATUS.Active },
    });

    if (!findUser) {
      throw new BadRequestException(COMMON_ERROR_MESSAGES.USER_NOT_FOUND);
    }

    await this.adminPanelShAccountAssigneesCoreService.deleteMany({
      where: { shAccountId: In(accountIds), role },
    });

    if (removeOnly) {
      return true;
    }

    const createData = [];
    await Promise.all(
      accountIds.map(async (shAccountId) => {
        createData.push({ userId, shAccountId, role });
      }),
    );

    const returnData =
      await this.adminPanelShAccountAssigneesCoreService.createMany({
        data: createData,
      });

    let event = MasterLogEnum.SalesOwnerUpdated;
    const logDataVal = {
      id: findUser.id,
      firstName: findUser.firstName,
      lastName: findUser.lastName,
      email: findUser.email,
      role: findUser.role,
    };

    await Promise.all(
      accountIds.map(async (shAccountId) => {
        let logData: any = {
          accountId: shAccountId,
          salesOwner: logDataVal,
          note: 'Sales owner updated',
        };

        if (role === ShAccountAssignees.SUCCESS) {
          event = MasterLogEnum.SuccessOwnerUpdated;
          logData = {
            accountId: shAccountId,
            successOwner: logDataVal,
            note: 'Success owner updated',
          };
        }

        await this.addShAccountLog({
          shAccountId,
          event,
          ipAddress,
          logData,
          sessionData,
        });
        await this.syncAccountWithChartMogul({ accountId: shAccountId });
      }),
    );

    return returnData;
  }

  async updateSalesOrSuccessOwnerToShAccount(params: {
    sessionData: AdminSessionType;
    shAccountId: number;
    userId: number;
    ipAddress: string;
    role: ShAccountAssignees;
  }) {
    const { sessionData, shAccountId, userId, ipAddress, role } = params;

    return this.applySalesOrSuccessOwnerToShAccountIds({
      ipAddress,
      role,
      sessionData,
      userId,
      shAccountIds: [shAccountId],
    });
  }

  async assignSalesOwnerMultiAccountId(params: {
    sessionData: AdminSessionType;
    salesOwnerId: number;
    assignSalesOwnerMultiAccountsDto: AssignSalesOwnerMultiAccountsDto;
    ipAddress: string;
  }) {
    const {
      salesOwnerId,
      ipAddress,
      sessionData,
      assignSalesOwnerMultiAccountsDto: { shAccountIds, filters },
    } = params;

    return this.applySalesOrSuccessOwnerToShAccountIds({
      ipAddress,
      role: ShAccountAssignees.SALES,
      sessionData,
      userId: salesOwnerId,
      shAccountIds,
      filters,
    });
  }

  async assignSuccessOwnerMultiAccountId(params: {
    sessionData: AdminSessionType;
    successOwnerId: number;
    assignSuccessOwnerMultiAccountsDto: AssignSuccessOwnerMultiAccountsDto;
    ipAddress: string;
  }) {
    const {
      successOwnerId,
      ipAddress,
      sessionData,
      assignSuccessOwnerMultiAccountsDto: { shAccountIds, filters },
    } = params;

    return this.applySalesOrSuccessOwnerToShAccountIds({
      ipAddress,
      role: ShAccountAssignees.SUCCESS,
      sessionData,
      userId: successOwnerId,
      shAccountIds,
      filters,
    });
  }

  private async applyTagsToShAccountIds(params: {
    sessionData: AdminSessionType;
    ipAddress: string;
    tagIds: number[];
    shAccountIds?: number[];
    filters?: ListAccountDto;
    removeOnly?: boolean;
  }) {
    const {
      tagIds,
      sessionData,
      ipAddress,
      shAccountIds,
      filters,
      removeOnly = false,
    } = params;

    const accountIds = await this.getBulkAccountIds({ shAccountIds, filters });

    const uniqueTagIds = [...new Set(tagIds)];
    const tagData = await this.adminPanelTagsCoreService.findMany({
      where: { id: In(uniqueTagIds) },
    });
    if (tagData.length !== uniqueTagIds.length) {
      throw new BadRequestException(COMMON_ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
    }

    await this.adminPanelAccountTagsCoreService.deleteMany({
      where: {
        shAccountId: In(accountIds),
        tagId: In(uniqueTagIds),
      },
    });

    if (removeOnly) {
      return true;
    }

    const createBulkAccountWithBulkTags = [];
    await Promise.all(
      accountIds.map(async (shAccountId) => {
        uniqueTagIds.map(async (tagId) => {
          createBulkAccountWithBulkTags.push({
            shAccountId,
            tagId,
            userId: sessionData?.user?.id,
            createdAt: new Date(),
            modifiedAt: new Date(),
          });
        });
      }),
    );

    const returnData = await this.adminPanelAccountTagsCoreService.createMany({
      data: createBulkAccountWithBulkTags,
    });

    await Promise.all(
      accountIds.map(async (shAccountId) => {
        await this.addShAccountLog({
          shAccountId,
          event: MasterLogEnum.AccountTagAdded,
          ipAddress,
          logData: {
            accountId: shAccountId,
            note: 'Account Tag(s) updated',
          },
          sessionData,
        });
      }),
    );

    return returnData;
  }

  async assignTagsToShAccount(params: {
    sessionData: AdminSessionType;
    shAccountId: number;
    assignTagsToShAccountDto: AssignTagsToShAccountDto;
    ipAddress: string;
  }) {
    const {
      sessionData,
      shAccountId,
      ipAddress,
      assignTagsToShAccountDto: { tagIds },
    } = params;

    return this.applyTagsToShAccountIds({
      sessionData,
      ipAddress,
      shAccountIds: [shAccountId],
      tagIds,
    });
  }

  async unassignTagFromShAccount(params: {
    sessionData: AdminSessionType;
    shAccountId: number;
    unassignTagFromShAccountDto: UnassignTagFromShAccountDto;
    ipAddress: string;
  }) {
    const {
      sessionData,
      shAccountId,
      ipAddress,
      unassignTagFromShAccountDto: { tagId },
    } = params;

    return this.applyTagsToShAccountIds({
      sessionData,
      ipAddress,
      shAccountIds: [shAccountId],
      tagIds: [tagId],
      removeOnly: true,
    });
  }

  async assignTagsToMultiShAccounts(params: {
    sessionData: AdminSessionType;
    assignTagsToMultiShAccountsDto: AssignTagsToMultiShAccountsDto;
    ipAddress: string;
  }) {
    const {
      sessionData,
      ipAddress,
      assignTagsToMultiShAccountsDto: { shAccountIds, tagIds, filters },
    } = params;

    return this.applyTagsToShAccountIds({
      sessionData,
      ipAddress,
      shAccountIds,
      filters,
      tagIds,
    });
  }

  async getAccountTags(params: {
    sessionData?: AdminSessionType;
    shAccountId: number;
  }) {
    const { shAccountId } = params;

    const shAccount = await this.shAccountCoreService.findFirst({
      where: { id: shAccountId },
    });
    if (!shAccount) {
      throw new BadRequestException(COMMON_ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
    }

    const accountTags = await this.adminPanelAccountTagsCoreService.findMany({
      where: { shAccountId },
    });
    const tagIds = arrayColumn(accountTags, 'tagId');

    return this.adminPanelTagsCoreService.findMany({
      where: { id: In(tagIds) },
    });
  }

  /* syncStripe function :- Purpose of this function is fetch subscription details.   */

  async syncStripe(params: {
    shAccountId: number;
    stripeSubscriptionId: string;
    applicationType: SubscriptionType;
  }) {
    const { stripeSubscriptionId, shAccountId, applicationType } = params;

    const accountSubscriptionData =
      await this.accountSubscriptionCoreService.findFirst({
        where: { shAccountId, application: applicationType },
      });

    if (accountSubscriptionData.subscriptionId) {
      throw new BadRequestException(
        COMMON_ERROR_MESSAGES.ACCOUNT_SUBSCRIPTION_EXISTS,
      );
    }

    const subscription = await this.stripeService.getSubscription({
      id: stripeSubscriptionId,
    });

    let startAt = await this.formatTimestamp(subscription.current_period_start);

    let endAt = await this.formatTimestamp(subscription.current_period_end);

    const customerId = subscription.customer;

    if (startAt) {
      startAt = DateTime.fromFormat(startAt, DATE_SETTINGS.DATE_TIME_FORMAT, {
        zone: DATE_SETTINGS.DEFAULT_TZ,
      }).toISO();
    }

    if (endAt) {
      endAt = DateTime.fromFormat(endAt, DATE_SETTINGS.DATE_TIME_FORMAT, {
        zone: DATE_SETTINGS.DEFAULT_TZ,
      }).toISO();
    }

    return {
      startAt: getUserDate({
        date: startAt,
        dateTimeFormat: DATE_SETTINGS.IST_DATE_TIME_FORMAT,
      }),
      endAt: getUserDate({
        date: endAt,
        dateTimeFormat: DATE_SETTINGS.IST_DATE_TIME_FORMAT,
      }),
      customerId,
    };
  }

  async formatTimestamp(timestamp) {
    const dateTime = DateTime.fromMillis(timestamp * 1000);
    const outputDateStr = dateTime.toFormat('yyyy-MM-dd HH:mm:ss');
    return outputDateStr;
  }
}
