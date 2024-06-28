import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WarmupSettingCodes } from './email-account-warmup-settings-core.enum';
import { EmailAccount } from '../email-account-core/email-account-core.entity';

@Entity({ name: 'email_account_warmup_settings' })
export class EmailAccountWarmupSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EmailAccount, (emailAccount) => emailAccount.warmupSettings)
  emailAccount: EmailAccount;

  @Column()
  emailAccountId: number;

  @Column({ type: 'enum', enum: WarmupSettingCodes })
  code: WarmupSettingCodes;

  @Column({
    type: 'text',
    default: null,
    collation: 'utf8mb4_unicode_ci',
  })
  value: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;
}
