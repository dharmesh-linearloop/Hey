import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ContactStatusType } from './sequence-contact-history-core.enum';
import { EmailAccount } from '../email-account-core/email-account-core.entity';
import { SequenceStep } from '../sequence-step-core/sequence-step-core.entity';
import { SequenceStepVariant } from '../sequence-step-variant-core/sequence-step-variant-core.entity';
import { Contact } from '../contact-core/contact-core.entity';
import { TemplateHistory } from '../template-history-core/template-history-core.entity';
import { BounceLog } from '../bounce-log-core/bounce-log-core.entity';
import { Email } from '../email-core/email-core.entity';

@Entity()
export class SequenceContactHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contactId: number;

  @ManyToOne(() => Contact)
  contact: Contact;

  @Column()
  stepId: number;

  @ManyToOne(() => SequenceStep)
  step: SequenceStep;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @Column({ type: 'timestamp' })
  lastOpenedAt: Date;

  @Column({ type: 'timestamp' })
  lastClickedAt: Date;

  @Column({ type: 'timestamp' })
  repliedAt: Date;

  @Column({ type: 'timestamp' })
  scheduledAt: Date;

  @Column({ type: 'timestamp', default: null })
  processedAt: Date;

  @Column({ type: 'boolean' })
  replied: boolean;

  @Column({ type: 'boolean', default: true })
  isValid: boolean;

  @Column({ type: 'int' })
  clickCount: number;

  @Column({ type: 'int' })
  openCount: number;

  @Column()
  messageId: string;

  @Column()
  threadId: string;

  @Column()
  messageSentResponse: string;

  // This column will be used to identify the latest step for this contact in this sequence.
  // @Column({
  //   type: 'timestamp',
  //   default: new Date(new Date().toUTCString()).toISOString(),
  // })
  // latestStatusUpdateAt: Date;

  @Column({
    type: 'enum',
    enum: ContactStatusType,
    default: ContactStatusType.Active,
  })
  status: ContactStatusType;

  @Column()
  includeRiskyContacts: boolean;

  @Column({ default: false })
  shouldVerify: boolean;

  // Temporary column?
  @Column({ default: false })
  isUpgraded: boolean;

  // Temporary column.
  @Column({ type: 'timestamp', default: () => 'NOW()' })
  lastStepProcessedAt: Date;

  // Temporary column.
  @Column({ default: false })
  inProgress: boolean;

  @ManyToOne(() => SequenceStepVariant)
  variant: SequenceStepVariant;

  @Column()
  variantId: number;

  // Temporary column.
  @Column({ type: 'timestamp', default: null })
  schedulerProcessedAt: Date;

  @Column()
  timezone: string;

  @ManyToOne(
    () => TemplateHistory,
    (templateHistory) => templateHistory.sequenceContactHistories,
  )
  templateHistory: TemplateHistory;

  @Column({ default: null })
  templateHistoryId: number;

  @OneToMany(() => BounceLog, (bounceLog) => bounceLog.sequenceContactHistory)
  bounceLogs: BounceLog[];

  @Column({ type: 'timestamp', default: null })
  bouncedAt: Date;

  @Column({ type: 'timestamp', default: null })
  unsubscribedAt: Date;

  @Column({ type: 'boolean', default: false })
  isPaused: boolean;

  @Column({ type: 'timestamp', default: null })
  unPausedAt: Date;

  @OneToOne(() => Email, (email) => email.sequenceContactHistory)
  @JoinColumn()
  email: Email;

  @Column({ type: 'int', nullable: true, default: null })
  emailId: number;

  @Column()
  emailAccountId: number;

  @ManyToOne(
    () => EmailAccount,
    (emailAccount) => emailAccount.sequenceContactHistories,
  )
  emailAccount: EmailAccount;
}
