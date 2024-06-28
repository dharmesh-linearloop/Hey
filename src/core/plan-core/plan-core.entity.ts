import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { PlanType } from './plan-core.enum';
import { Status } from 'src/keys';
import { PlanRestriction } from '../plan-restriction-core/plan-restriction-core.entity';
import { SubscriptionType } from 'src/shared/types/subscription';

@Entity()
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  code: string;

  @Column({ default: null })
  stripePlanId: string;

  @Column({ default: null })
  parentId: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  amount: number;

  @Column()
  currency: string;

  @Column({ default: 0 })
  validityInDays: number;

  @Column({ default: null })
  configuration: string;

  @Column({ type: 'enum', enum: PlanType })
  type: PlanType;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @OneToMany(() => PlanRestriction, (planRestriction) => planRestriction.plan)
  planRestriction: PlanRestriction[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @Column({ default: null })
  createdBy: number;

  @Column({
    type: 'enum',
    enum: SubscriptionType,
    default: SubscriptionType.Sequence,
  })
  application: SubscriptionType;
}
