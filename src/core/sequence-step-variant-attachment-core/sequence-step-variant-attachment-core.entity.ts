import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SequenceStepVariant } from '../sequence-step-variant-core/sequence-step-variant-core.entity';
import { ShAccount } from '../sh-account-core/sh-account-core.entity';
import { User } from '../user-core/user-core.entity';
import { Attachment } from '../attachment-core/attachment-core.entity';

@Entity({ name: 'sequence_step_variant_attachment' })
export class SequenceStepVariantAttachment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SequenceStepVariant)
  sequenceStepVariant: SequenceStepVariant;

  @Column()
  sequenceStepVariantId: number;

  @ManyToOne(() => Attachment)
  attachment: Attachment;

  @Column()
  attachmentId: number;

  @ManyToOne(() => ShAccount)
  shAccount: ShAccount;

  @Column({ default: null })
  shAccountId: number;

  @ManyToOne(() => User)
  user: User;

  @Column({ default: null })
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
