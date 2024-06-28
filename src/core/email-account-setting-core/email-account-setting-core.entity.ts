import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { EmailAccount } from '../email-account-core/email-account-core.entity';
import { EmailAccountSettingCode } from './email-account-setting-core.enum';

@Entity({ name: 'email_account_settings' })
export class EmailAccountSetting extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EmailAccount, (emailAccount) => emailAccount.settings)
  emailAccount: EmailAccount;

  @Column()
  emailAccountId: number;

  @Column({ type: 'enum', enum: EmailAccountSettingCode })
  code: EmailAccountSettingCode;

  @Column({
    type: 'text',
    default: null,
    collation: 'utf8mb4_unicode_ci',
  })
  value: string;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;
}
