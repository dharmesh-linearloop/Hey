import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { AccountSubscription } from '../account-subscription-core/account-subscription-core.entity';
import { Plan } from '../plan-core/plan-core.entity';

@Entity()
export class AccountSubscriptionHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AccountSubscription)
  accountSubscription: AccountSubscription;

  @Column()
  accountSubscriptionId: number;

  @ManyToOne(() => Plan)
  plan: Plan;

  @Column()
  planId: number;

  @Column()
  slots: number;

  @CreateDateColumn()
  createdAt: Date;
}
