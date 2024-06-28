import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BounceType, WarmupEmailType } from './warm-up-templates-core.enum';
import { EmailAccount } from '../email-account-core/email-account-core.entity';
import { WarmupTemplates } from '../warmup-email-history-core/warmup-email-history-core.entity';

@Entity({ name: 'warmup_email_history' })
export class WarmupEmailHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  sentAt: Date;

  @Column({ type: 'timestamp' })
  receivedAt: Date;

  @Column()
  senderThreadId: string;

  @Column()
  recipientThreadId: string;

  @Column()
  senderMessageId: string;

  @Column()
  recipientMessageId: string;

  @Column()
  rawMessageId: string;

  @ManyToOne(() => EmailAccount)
  senderEmailAccount?: EmailAccount;

  @Column({ default: null })
  senderEmailAccountId: number;

  @ManyToOne(() => EmailAccount)
  recipientEmailAccount?: EmailAccount;

  @Column({ default: null })
  recipientEmailAccountId: number;

  @ManyToOne(() => WarmupTemplates)
  warmupTemplate: WarmupTemplates;

  @Column()
  warmupTemplateAnalyticsId: string;

  @Column({ nullable: false })
  taskTemplateId: number;

  @Column({ type: 'boolean', default: false })
  spammed: boolean;

  @Column({ type: 'boolean', default: false })
  bounced: boolean;

  @Column({ type: 'boolean', default: false })
  espBlocked: boolean;

  @Column({ type: 'enum', enum: BounceType })
  bounceType: BounceType;

  @Column({
    type: 'enum',
    enum: WarmupEmailType,
    default: WarmupEmailType.Email,
  })
  emailType: WarmupEmailType;

  @ManyToOne(() => WarmupEmailHistory)
  parent: WarmupEmailHistory;

  @Column({ default: null })
  parentId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;
}
