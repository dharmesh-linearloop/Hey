import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { EmailAccount } from '../email-account-core/email-account-core.entity';

@Entity({ name: 'email-accounts-payload' })
export class EmailAccountsPayload extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(
    () => EmailAccount,
    (emailAccount) => emailAccount.emailAccountPayload,
  )
  @JoinColumn()
  emailAccount: EmailAccount;

  @Column()
  emailAccountId: number;

  @Column({ type: 'text', default: null })
  connectionPayload: string;

  @Column({ default: null, collation: 'utf8mb4_unicode_ci' })
  connectionErrorDetails: string;
}
