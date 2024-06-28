import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SequenceStepType } from './sequence-step-core.enum';
import { Status } from 'src/keys';
import { SequenceContactHistory } from '../sequence-contact-history-core/sequence-contact-history-core.entity';
import { Sequence } from '../sequence-core/sequence-core.entity';
import { SequenceStepVariant } from '../sequence-step-variant-core/sequence-step-variant-core.entity';

@Entity()
export class SequenceStep {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Sequence, (sequence) => sequence.steps)
  sequence: Sequence;

  @Column({ default: null })
  sequenceId: number;

  @Column()
  number: number;

  @Column({ type: 'enum', enum: SequenceStepType })
  type: SequenceStepType;

  @Column()
  relativeDays: number;

  @Column({ default: Status.Active })
  status: Status;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @OneToMany(() => SequenceStepVariant, (variant) => variant.step, {
    cascade: ['insert'],
  })
  variants: SequenceStepVariant[];

  @OneToMany(
    () => SequenceContactHistory,
    (sequenceContactHistory) => sequenceContactHistory.step,
  )
  sequenceContactHistories: SequenceContactHistory[];
}
