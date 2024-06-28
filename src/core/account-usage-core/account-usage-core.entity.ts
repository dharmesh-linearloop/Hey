import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ShAccount } from '../sh-account-core/sh-account-core.entity';
import { PlanRestriction } from '../plan-restriction-core/plan-restriction-core.entity';

@Entity()
export class AccountUsage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ShAccount)
  shAccount: ShAccount;

  @Column()
  shAccountId: number;

  @ManyToOne(() => PlanRestriction)
  planRestriction: PlanRestriction;

  @Column()
  planRestrictionId: number;

  @Column()
  value: string;
}
