import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Status } from 'src/keys';
import { SequenceStep } from '../sequence-step-core/sequence-step-core.entity';
import { SequenceStepVariantAttachment } from '../sequence-step-variant-attachment-core/sequence-step-variant-attachment-core.entity';
import { TemplateHistory } from '../template-history-core/template-history-core.entity';

@Entity()
export class SequenceStepVariant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SequenceStep, (step) => step.variants)
  step: SequenceStep;

  @Column({ default: null })
  stepId: number;

  @Column({ collation: 'utf8mb4_unicode_ci' })
  subject: string;

  @Column({ type: 'text', collation: 'utf8mb4_unicode_ci' })
  content: string;

  @Column({ collation: 'utf8mb4_unicode_ci' })
  preheader: string;

  @Column({ default: Status.Active })
  status: Status;

  @ManyToOne(
    () => TemplateHistory,
    (templateHistory) => templateHistory.variants,
  )
  templateHistory: TemplateHistory;

  @OneToMany(
    () => SequenceStepVariantAttachment,
    (sequenceStepVariantAttachment) =>
      sequenceStepVariantAttachment.sequenceStepVariant,
  )
  sequenceStepVariantAttachments: SequenceStepVariantAttachment[];

  @Column({ default: null })
  templateHistoryId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
