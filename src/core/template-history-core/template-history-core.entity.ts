import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SequenceStepVariant } from '../sequence-step-variant-core/sequence-step-variant-core.entity';
import { SequenceContactHistory } from '../sequence-contact-history-core/sequence-contact-history-core.entity';
import { Template } from '../template-core/template-core.entity';

@Entity()
export class TemplateHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Template)
  template: Template;

  @Column()
  templateId: number;

  @Column({ type: 'text', collation: 'utf8mb4_unicode_ci' })
  content: string;

  @Column({ collation: 'utf8mb4_unicode_ci', default: null })
  subject: string;

  @Column()
  openCount: number;

  @Column()
  sentCount: number;

  @OneToMany(() => SequenceStepVariant, (variant) => variant.templateHistory, {
    cascade: ['insert'],
  })
  variants: SequenceStepVariant[];

  @OneToMany(
    () => SequenceContactHistory,
    (sequence) => sequence.templateHistory,
    {
      cascade: ['insert'],
    },
  )
  sequenceContactHistories: SequenceContactHistory[];

  @Column({ type: 'timestamp', nullable: true, default: () => null })
  changedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true, default: () => null })
  modifiedAt: Date;
}
