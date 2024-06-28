import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { SequenceContactHistory } from '../sequence-contact-history-core/sequence-contact-history-core.entity';
import { EmailAccountType } from '../email-account-core/email-account-core.enum';
import { BounceType } from './bounce-log-core.enum';

@Entity()
export class BounceLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SequenceContactHistory)
  @JoinColumn()
  sequenceContactHistory: SequenceContactHistory;

  @Column({ default: null })
  sequenceContactHistoryId: number;

  @Column({ type: 'enum', enum: EmailAccountType })
  emailAccountType: EmailAccountType;

  @Column({ type: 'text' })
  snippet: string;

  @Column()
  messageId: string;

  @Column({ type: 'enum', enum: BounceType })
  type: BounceType;

  @Column({ type: 'timestamp', default: null })
  receivedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
