import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import {
  SubscriptionPaymentMethod,
  SubscriptionRenewalType,
  SubscriptionStatus,
} from './account-subscription-core.enum';
import { ShAccount } from '../sh-account-core/sh-account-core.entity';
import { Plan } from '../plan-core/plan-core.entity';
import { SubscriptionType } from 'src/shared/types/subscription';

@Entity()
export class AccountSubscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ShAccount, (shAccount) => shAccount.accountSubscription)
  @JoinColumn()
  shAccount: ShAccount;

  @Column()
  shAccountId: number;

  @Column({ type: 'timestamp', nullable: true })
  startAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  endAt: Date;

  @ManyToOne(() => Plan)
  plan: Plan;

  @Column()
  planId: number;

  @Column()
  slots: number;

  @Column({ default: null })
  subscriptionId: string;

  @Column({ default: null })
  customerId: string;

  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
    default: SubscriptionStatus.Active,
  })
  status: SubscriptionStatus;

  @Column({
    type: 'enum',
    enum: SubscriptionPaymentMethod,
    default: SubscriptionPaymentMethod.Stripe,
  })
  paymentMethod: SubscriptionPaymentMethod;

  @Column({
    type: 'enum',
    enum: SubscriptionRenewalType,
    default: SubscriptionRenewalType.automatic,
  })
  renewalType: SubscriptionRenewalType;

  @Column({
    type: 'enum',
    enum: SubscriptionType,
    default: SubscriptionType.Sequence,
  })
  application: SubscriptionType;
}
