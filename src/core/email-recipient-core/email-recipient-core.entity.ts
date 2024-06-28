import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Email } from '../email-core/email-core.entity';
import { EmailAccount } from '../email-account-core/email-account-core.entity';
import { Contact } from '../contact-core/contact-core.entity';
import { EmailRecipientType } from './email-recipient-core.enum';

@Entity({ name: 'email_recipient' })
export class EmailRecipient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  emailAddress: string;

  @ManyToOne(() => Email)
  email: Email;

  @Column({ nullable: false })
  emailId: number;

  @ManyToOne(() => EmailAccount)
  emailAccount: EmailAccount;

  @Column({ default: null, nullable: true })
  emailAccountId: number;

  @ManyToOne(() => Contact)
  prospect: Contact;

  @Column({ default: null, nullable: true })
  prospectId: number;

  @Column({ type: 'enum', enum: EmailRecipientType, nullable: false })
  type: EmailRecipientType;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
