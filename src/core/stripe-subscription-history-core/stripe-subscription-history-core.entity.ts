import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AccountSubscription } from '../account-subscription-core/account-subscription-core.entity';
import { SubscriptionStatus } from './stripe-subscription-history-core.enum';

@Entity()
export class StripeSubscriptionHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AccountSubscription)
  accountSubscription: AccountSubscription;

  @Column()
  accountSubscriptionId: number;

  @Column({ type: 'enum', enum: SubscriptionStatus })
  status: SubscriptionStatus;
}
