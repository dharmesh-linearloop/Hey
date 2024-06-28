import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Sequence } from '../sequence-core/sequence-core.entity';
import { EmailAccount } from '../email-account-core/email-account-core.entity';
import { Email } from '../email-core/email-core.entity';

@Entity()
export class EmailThread {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  threadId: string;

  @ManyToOne(() => Sequence)
  sequence: Sequence;

  @Column({ nullable: false })
  sequenceId: number;

  @ManyToOne(() => EmailAccount)
  emailAccount: EmailAccount;

  @Column({ nullable: true })
  emailAccountId: number;

  @OneToMany(() => Email, (emails) => emails.emailThread)
  emails: Email[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
