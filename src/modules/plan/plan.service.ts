import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AdminSessionType } from 'src/shared/types/admin-session.type';
import { PlanCoreService } from 'src/core/plan-core/plan-core.service';
import { ListPlanDto } from './dto/list-plan.dto';
import { SharedQueryService } from 'src/shared/modules/shared-query/shared-query.service';
import {
  getUUID,
  updateDates,
  updateDatesArr,
} from 'src/shared/modules/common/common.helper';
import { CreatePlanDto } from './dto/create-plan.dto';
import { COMMON_ERROR_MESSAGES } from 'src/keys';
import { StripePlanCreationPreference } from 'src/core/account-subscription-core/account-subscription-core.enum';
import { FeatureCoreService } from 'src/core/feature-core/feature-core.service';
import { PlanRestrictionCoreService } from 'src/core/plan-restriction-core/plan-restriction-core.service';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { StripeService } from 'src/shared/modules/stripe/stripe.service';
import { FindAllPlanDto } from './dto/find-all-plan.dto';
import { In, IsNull } from 'typeorm';
import { SubscriptionType } from '../../shared/types/subscription';

@Injectable()
export class PlanService {
  private readonly logger: Logger = new Logger(PlanService.name);

  constructor(
    private planCoreService: PlanCoreService,
    private featureCoreService: FeatureCoreService,
    private planRestrictionCoreService: PlanRestrictionCoreService,
    private sharedQueryService: SharedQueryService,
    private stripeService: StripeService,
  ) {}

  async findAllList({ excludeCustomPlans }: FindAllPlanDto) {
    const filterQuery: any = {};
    if (excludeCustomPlans === 'true') {
      filterQuery.where = { parentId: IsNull() };
    }
    const planList = await this.planCoreService.findMany(filterQuery);

    return this.sharedQueryService.getPlanMetaList(
      {
        planList,
      },
      { addCodeInName: true },
    );
  }

  async findAll(params: { sessionData: AdminSessionType; query: ListPlanDto }) {
    const { query } = params;

    const modelQuery = await this.sharedQueryService.getPlanQuery({
      query,
      withDeleted: false,
    });

    const planList = await this.planCoreService.getQueryBuilderPaginate({
      query,
      modelQuery,
    });

    await Promise.all(
      planList.list.map(async (data, i) => {
        planList.list[i] = await this.sharedQueryService.getPlanMeta({
          plan: planList.list[i],
        });
      }),
    );

    planList.list = await updateDatesArr(planList.list);
    return planList;
  }

  private async getValidatedStripePriceId(params: {
    stripePlanCreationPreference: StripePlanCreationPreference;
    stripePlanId?: string;
    planName: string;
    validityInDays: number;
    amount: number;
  }) {
    const {
      amount,
      planName,
      stripePlanCreationPreference,
      validityInDays,
      stripePlanId,
    } = params;

    let validStripePlanId = null;

    if (
      stripePlanCreationPreference ===
      StripePlanCreationPreference.LinkExistingPlan
    ) {
      if (!stripePlanId) {
        throw new BadRequestException('Stripe Plan Id is Required');
      } else {
        await this.stripeService.validatePriceId({ stripePlanId });
        validStripePlanId = stripePlanId;
      }
    } else if (
      stripePlanCreationPreference ===
      StripePlanCreationPreference.CreateNewPlan
    ) {
      validStripePlanId = await this.stripeService.createPrice({
        planName,
        amount,
        validityInDays,
      });
    }

    return validStripePlanId;
  }

  private async updatePlanRestrictions(params: {
    planId: number;
    emailLimit: number;
    prospectLimit: number;
    application: SubscriptionType;
  }) {
    const { prospectLimit, emailLimit, planId, application } = params;
    let featureCodes = ['EMAIL.SEND', 'PROSPECT.ADD', 'SEQUENCE.EMAIL_ACCOUNT'];
    if (application === SubscriptionType.LeadFinder) {
      featureCodes = ['LEAD.REVEAL', 'LEAD.REVEAL.PHONE'];
    }

    const allFeatures = await this.featureCoreService.findMany({
      where: { code: In(featureCodes) },
    });

    const planRestrictionRecordsToBeInserted = [];
    for (const feature of allFeatures) {
      let value = null;
      if (feature.code == 'PROSPECT.ADD') {
        value = prospectLimit;
      } else if (feature.code == 'EMAIL.SEND') {
        value = emailLimit;
      }

      const planRestrictionRecord = {
        featureId: feature.id,
        planId,
        value,
      };

      planRestrictionRecordsToBeInserted.push(planRestrictionRecord);
    }

    await this.planRestrictionCoreService.createMany({
      data: planRestrictionRecordsToBeInserted,
    });
  }

  async create(params: {
    sessionData: AdminSessionType;
    createPlanDto: CreatePlanDto;
  }) {
    const { createPlanDto, sessionData } = params;
    const {
      user: { id: userId },
    } = sessionData;

    const {
      parentPlanId,
      planName,
      stripePlanCreationPreference,
      billingCycle: validityInDays,
      amount,
      prospectLimit,
      emailLimit,
    } = createPlanDto;

    const basePlan = await this.planCoreService.findFirst({
      where: { id: parentPlanId },
    });

    if (!basePlan) {
      throw new BadRequestException(
        COMMON_ERROR_MESSAGES.PARENT_PLAN_NOT_FOUND,
      );
    }

    const stripePlanId = await this.getValidatedStripePriceId({
      amount,
      planName,
      stripePlanCreationPreference,
      validityInDays,
      stripePlanId: createPlanDto?.stripePlanId,
    });

    const planCode = `${basePlan.code}-custom-${getUUID()}`;

    const createdPlan = await this.planCoreService.create({
      data: {
        code: planCode,
        stripePlanId,
        parentId: basePlan.id,
        name: planName,
        amount,
        currency: 'USD',
        validityInDays,
        type: basePlan.type,
        status: 1,
        createdBy: userId,
        application: basePlan.application,
      },
    });

    await this.updatePlanRestrictions({
      planId: createdPlan.id,
      emailLimit,
      prospectLimit,
      application: basePlan.application,
    });

    return this.findById({ planId: createdPlan.id });
  }

  async update(params: {
    sessionData: AdminSessionType;
    updatePlanDto: UpdatePlanDto;
    planId: number;
  }) {
    const { updatePlanDto, planId } = params;

    const {
      parentPlanId,
      planName,
      stripePlanCreationPreference,
      billingCycle: validityInDays,
      amount,
      prospectLimit,
      emailLimit,
    } = updatePlanDto;

    const checkPlan = await this.planCoreService.findFirst({
      where: { id: planId },
    });

    if (!checkPlan) {
      throw new BadRequestException(COMMON_ERROR_MESSAGES.PLAN_NOT_FOUND);
    }

    let planCode = checkPlan.code;
    let parentId = checkPlan.parentId;
    let type = checkPlan.type;
    let application = checkPlan.application;

    if (checkPlan.parentId !== parentPlanId) {
      const basePlan = await this.planCoreService.findFirst({
        where: { id: parentPlanId },
      });

      if (!basePlan) {
        throw new BadRequestException(
          COMMON_ERROR_MESSAGES.PARENT_PLAN_NOT_FOUND,
        );
      }

      planCode = `${basePlan.code}-custom-${getUUID()}`;
      parentId = basePlan.id;
      type = basePlan.type;
      application = basePlan.application;
    }

    const stripePlanId = await this.getValidatedStripePriceId({
      amount,
      planName,
      stripePlanCreationPreference,
      validityInDays,
      stripePlanId: updatePlanDto?.stripePlanId,
    });

    await this.planCoreService.update({
      where: { id: planId },
      data: {
        code: planCode,
        stripePlanId,
        parentId,
        name: planName,
        amount,
        validityInDays,
        type,
        application,
      },
    });

    await this.planRestrictionCoreService.deleteMany({ where: { planId } });

    await this.updatePlanRestrictions({
      planId,
      emailLimit,
      prospectLimit,
      application,
    });

    return this.findById({ planId });
  }

  async findById(params: { sessionData?: AdminSessionType; planId: number }) {
    const { planId } = params;

    const modelQuery = await this.sharedQueryService.getPlanQuery({
      query: { where: { id: planId } },
    });

    const planList = await this.planCoreService.getQueryBuilderPaginate({
      query: { where: { id: planId } },
      modelQuery,
    });

    let plan: any = planList.list[0];

    if (plan) {
      plan = await this.sharedQueryService.getPlanMeta({ plan });
    }

    return updateDates(JSON.parse(JSON.stringify(plan)));
  }

  async findStripePlanById(params: {
    sessionData?: AdminSessionType;
    stripePlanId: string;
  }) {
    const { stripePlanId } = params;

    return this.stripeService.getStripePriceById({ stripePlanId });
  }
}
