import { Injectable, BadRequestException } from '@nestjs/common';
import { STRIPE_CONFIG } from 'src/keys';
import Stripe from 'stripe';
import { SharedQueryService } from '../shared-query/shared-query.service';
import { AppConfigService } from '../../../app-config/app-config.service';

@Injectable()
export class StripeService {
  constructor(
    private sharedQueryService: SharedQueryService,
    private appConfigService: AppConfigService,
  ) {}

  async validatePriceId(params: { stripePlanId: string }) {
    const { stripePlanId } = params;

    const stripeObj = new Stripe(
      this.appConfigService.stripeKey,
      STRIPE_CONFIG,
    );

    try {
      const stripePlanObject = await stripeObj.prices.retrieve(stripePlanId);
      if (stripePlanObject) {
        return true;
      }
    } catch (error) {}

    throw new BadRequestException('Stripe Plan Id is invalid');
  }

  async getStripePriceById(params: { stripePlanId: string }) {
    const { stripePlanId } = params;

    const stripeObj = new Stripe(
      this.appConfigService.stripeKey,
      STRIPE_CONFIG,
    );

    try {
      const stripePlanObject = await stripeObj.prices.retrieve(stripePlanId, {
        expand: ['product'],
      });
      if (stripePlanObject) {
        return stripePlanObject;
      }
    } catch (error) {}

    throw new BadRequestException('Stripe Plan Id is invalid');
  }

  async createPrice(params: {
    planName: string;
    validityInDays: number;
    amount: number;
  }) {
    const { planName, amount, validityInDays } = params;

    const stripeObj = new Stripe(
      this.appConfigService.stripeKey,
      STRIPE_CONFIG,
    );

    try {
      const createdStripePlan = await stripeObj.prices.create({
        currency: 'usd',
        nickname: planName,
        recurring: {
          interval: 'day',
          interval_count: validityInDays,
        },
        unit_amount: amount * 100,
        product_data: { name: planName },
      });

      if (createdStripePlan?.id) {
        return createdStripePlan?.id;
      } else {
        throw new BadRequestException('Stripe Plan Creation Failed.');
      }
    } catch (error) {
      throw new BadRequestException('Stripe Plan Creation Failed.');
    }
  }

  async getSubscription(params: { id: string }): Promise<any> {
    const { id } = params;
    const stripeObj = new Stripe(
      this.appConfigService.stripeSecretKey,
      STRIPE_CONFIG,
    );
    return await stripeObj.subscriptions.retrieve(id);
  }

  async updateCustomerMetadata(params: {
    shAccountId: number;
    customerId;
  }): Promise<void> {
    const { shAccountId, customerId } = params;
    const stripe = new Stripe(
      this.appConfigService.stripeSecretKey,
      STRIPE_CONFIG,
    );
    const adminDetail = await this.getAccountAdminDetails({ shAccountId });
    stripe.customers.update(customerId, {
      metadata: {
        account_id: adminDetail.shAccountId,
        application: 'v3',
        customer_key: adminDetail.email,
        user_id: adminDetail.id,
      },
    });
  }

  async getAccountAdminDetails(params: { shAccountId }) {
    const { shAccountId } = params;
    const userRole = ['admin', 'agency-owner', 'ltd-admin'];
    const adminDetail = await this.sharedQueryService.getOwnerUserDetails({
      shAccountId,
      userRole,
    });
    return adminDetail;
  }
}
