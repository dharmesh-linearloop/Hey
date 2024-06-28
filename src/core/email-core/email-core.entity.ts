import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EmailStatusType } from './email-core.enum';
import { User } from '../user-core/user-core.entity';
import { ShAccount } from '../sh-account-core/sh-account-core.entity';
import { SequenceContactHistory } from '../sequence-contact-history-core/sequence-contact-history-core.entity';
import { SentEmailAttachments } from '../sent-email-attachments-core/sent-email-attachments-core.entity';
import { EmailLink } from '../email-link-core/email-link-core.entity';
import { TemplateHistory } from '../template-history-core/template-history-core.entity';
import { EmailThread } from '../email-thread-core/email-thread-core.entity';
import { EmailRecipient } from '../email-recipient-core/email-recipient-core.entity';

@Entity({ name: 'email' })
export class Email extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    collation: 'utf8mb4_unicode_ci',
    default: null,
    nullable: true,
  })
  subject: string;

  @Column({
    default: null,
    collation: 'utf8mb4_unicode_ci',
  })
  snippet: string;

  @Column({
    type: 'text',
    collation: 'utf8mb4_unicode_ci',
    default: null,
  })
  content: string;

  @Column({
    type: 'text',
    collation: 'utf8mb4_unicode_ci',
    default: null,
    nullable: true,
  })
  preheader: string;

  @Column({ type: 'text', default: null })
  headers: string;

  @Column({ type: 'text', default: null })
  messageId: string;

  @ManyToOne(() => EmailThread)
  emailThread: EmailThread;

  @Column({ type: 'int', nullable: false })
  emailThreadId: number;

  @OneToOne(() => TemplateHistory)
  templateHistory: TemplateHistory;

  @Column({ type: 'int', nullable: true })
  templateHistoryId: number;

  @Column({ type: 'boolean', default: false, nullable: false })
  isDraft: boolean;

  @Column({ type: 'enum', enum: EmailStatusType, default: null })
  status: EmailStatusType;

  @Column({ type: 'timestamp', default: null })
  sentAt: Date;

  @Column({ type: 'int', default: 0, nullable: false })
  openCount: number;

  @Column({ type: 'timestamp', default: null })
  lastOpenedAt: Date;

  @Column({ type: 'int', default: 0, nullable: false })
  clickCount: number;

  @Column({ type: 'timestamp', default: null })
  lastClickedAt: Date;

  @ManyToOne(() => User)
  user: User;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @ManyToOne(() => ShAccount)
  shAccount: ShAccount;

  @Column({ type: 'int', nullable: false })
  shAccountId: number;

  @OneToMany(() => EmailRecipient, (emailRecipients) => emailRecipients.email)
  emailRecipients: EmailRecipient[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: null })
  modifiedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', default: null })
  deletedAt: Date;

  @OneToMany(() => EmailLink, (emailLink) => emailLink.emails)
  emailLinks: EmailLink[];

  @OneToOne(() => SequenceContactHistory)
  sequenceContactHistory: SequenceContactHistory;

  @OneToMany(() => SentEmailAttachments, (attachment) => attachment.email)
  sentEmailAttachments: SentEmailAttachments[];
}
