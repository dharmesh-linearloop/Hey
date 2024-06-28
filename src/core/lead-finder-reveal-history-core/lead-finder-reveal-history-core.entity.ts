import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { SubscriptionStatus } from '../account-subscription-core/account-subscription-core.enum';
import { IsEnum } from 'class-validator';
import { RevealHistoryType } from './lead-finder-reveal-history-core.enum';

@Entity()
export class LeadFinderRevealHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shAccountId: number;

  @Column()
  userId: number;

  @Column()
  leadCount: number;

  @Column()
  currentPlanId: number;

  @Column()
  currentPlanName: string;

  @Column()
  currentPlanCode: string;

  @Column({ default: SubscriptionStatus.Active })
  @IsEnum(SubscriptionStatus)
  subscriptionStatus: SubscriptionStatus;

  @Column({ default: RevealHistoryType.Requested })
  @IsEnum(RevealHistoryType)
  historyType: RevealHistoryType;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
