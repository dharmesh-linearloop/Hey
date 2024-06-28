import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from 'typeorm';
import {
  EmailAccountType,
  EmailServiceProvider,
} from './email-account-core.enum';
import { Status } from 'src/keys';
import { User } from '../user-core/user-core.entity';
import { Sequence } from '../sequence-core/sequence-core.entity';
import { EmailAccountsPayload } from '../email-account-payload-core/email-account-payload-core.entity';
import { SmtpImapConnectionPayload } from '../smtp-imap-connection-payload-core/smtp-imap-connection-payload-core.entity';
import { EmailAccountSetting } from '../email-account-setting-core/email-account-setting-core.entity';
import { SequenceEmailAccount } from '../sequence-email-account-core/sequence-email-account-core.entity';
import { EmailAccountCustomDomain } from '../email-account-custom-domain-core/email-account-custom-domain-core.entity';
import { EmailAccountWarmupSettings } from '../email-account-warmup-settings-core/email-account-warmup-settings-core.entity';
import { WarmupEmailHistory } from '../warm-up-templates-core/warm-up-templates-core.entity';
import { SequenceContactHistory } from '../sequence-contact-history-core/sequence-contact-history-core.entity';

@Entity({ name: 'email_accounts' })
export class EmailAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column({ default: null })
  userId: number;

  @Column({ default: null })
  shAccountId: number;

  @Column({ collation: 'utf8mb4_unicode_ci' })
  fromName: string;

  @Column({ collation: 'utf8mb4_unicode_ci' })
  fromEmail: string;

  @Column()
  type: EmailAccountType;

  @Column({ default: Status.Active })
  status: Status;

  @Column({ default: false })
  isDefault: boolean;

  @Column({ type: 'timestamp' })
  lastConnectedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @OneToOne(() => EmailAccountsPayload, (payload) => payload.emailAccount)
  emailAccountPayload: EmailAccountsPayload;

  @OneToOne(() => SmtpImapConnectionPayload, (payload) => payload.emailAccount)
  smtpImapConnectionPayload?: SmtpImapConnectionPayload;

  @OneToMany(() => EmailAccountSetting, (settings) => settings.emailAccount)
  settings?: EmailAccountSetting[];

  @OneToMany(
    () => EmailAccountWarmupSettings,
    (warmupSettings) => warmupSettings.emailAccount,
  )
  warmupSettings?: EmailAccountWarmupSettings[];

  @OneToMany(() => Sequence, (sequence) => sequence.email)
  sequences?: Sequence[];

  @OneToMany(
    () => WarmupEmailHistory,
    (warmupHistory) => warmupHistory.senderEmailAccount,
  )
  senderWarmupEmailHistory?: WarmupEmailHistory[];

  @OneToMany(
    () => WarmupEmailHistory,
    (warmupHistory) => warmupHistory.recipientEmailAccount,
  )
  recipientWarmupEmailHistory?: WarmupEmailHistory[];

  @OneToOne(
    () => EmailAccountCustomDomain,
    (emailAccountCustomDomain) => emailAccountCustomDomain.emailAccount,
  )
  emailAccountCustomDomain: EmailAccountCustomDomain;

  @Column({ type: 'enum', enum: EmailServiceProvider })
  emailServiceProvider: EmailServiceProvider;

  @Column({ default: null })
  healthScore: number;

  @OneToMany(
    () => SequenceEmailAccount,
    (sequenceEmailAccount) => sequenceEmailAccount.emailAccount,
  )
  sequenceEmailAccounts: SequenceEmailAccount[];

  @OneToMany(
    () => SequenceContactHistory,
    (sequenceContactHistory) => sequenceContactHistory.emailAccount,
  )
  sequenceContactHistories: SequenceContactHistory[];
}
