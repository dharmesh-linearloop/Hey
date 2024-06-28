import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Sequence } from '../sequence-core/sequence-core.entity';
import { EmailAccount } from '../email-account-core/email-account-core.entity';

@Entity()
export class SequenceEmailAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sequenceId: number;

  @Column()
  emailAccountId: number;

  @ManyToOne(() => Sequence, (sequence) => sequence.sequenceEmailAccounts)
  sequence: Sequence;

  @ManyToOne(
    () => EmailAccount,
    (emailAccount) => emailAccount.sequenceEmailAccounts,
  )
  emailAccount: EmailAccount;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
