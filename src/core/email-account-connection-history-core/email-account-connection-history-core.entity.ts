import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import {
  EmailAccountConnectionHistoryExecutor,
  EmailAccountConnectionHistoryStatus,
  Services,
} from './email-account-connection-history-core.enum';
import { EmailAccount } from '../email-account-core/email-account-core.entity';

@Entity({ name: 'email_account_connection_history' })
export class EmailAccountConnectionHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EmailAccount)
  emailAccount: EmailAccount;

  @Column()
  emailAccountId: number;

  @Column({
    type: 'enum',
    enum: EmailAccountConnectionHistoryStatus,
    default: null,
  })
  status?: EmailAccountConnectionHistoryStatus;

  @Column({ type: 'enum', enum: EmailAccountConnectionHistoryExecutor })
  executor: EmailAccountConnectionHistoryExecutor;

  @Column()
  message: string;

  @Column()
  reason: string;

  @Column({ type: 'enum', enum: Services })
  service: Services;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
