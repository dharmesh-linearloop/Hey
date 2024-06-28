import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Plan } from '../plan-core/plan-core.entity';
import { Feature } from '../feature-core/feature-core.entity';

@Entity()
export class PlanRestriction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Plan)
  plan: Plan;

  @Column()
  planId: number;

  @ManyToOne(() => Feature)
  feature: Feature;

  @Column()
  featureId: number;

  @Column()
  value: string;
}
