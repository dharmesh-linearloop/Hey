import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EmailAccount } from '../email-account-core/email-account-core.entity';

@Entity()
export class SmtpImapConnectionPayload {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => EmailAccount)
  @JoinColumn()
  emailAccount: EmailAccount;

  @Column()
  emailAccountId: number;

  @Column()
  smtpCredentialPayload: string;

  @Column()
  imapCredentialPayload: string;

  @Column({ type: 'text', default: null })
  smtpConnectionErrorDetails: string;

  @Column({ type: 'text', default: null })
  imapConnectionErrorDetails: string;
}
