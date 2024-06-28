import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { SequencePauseReason, SequenceProgress } from './sequence-core.enum';
import { Status } from 'src/keys';
import { ShAccount } from '../sh-account-core/sh-account-core.entity';
import { User } from '../user-core/user-core.entity';
import { EmailAccount } from '../email-account-core/email-account-core.entity';
import { SequenceEmailAccount } from '../sequence-email-account-core/sequence-email-account-core.entity';
import { SequenceStep } from '../sequence-step-core/sequence-step-core.entity';
import { SequenceSetting } from '../sequence-setting-core/sequence-setting-core.entity';
import { Schedule } from '../schedule-core/schedule-core.entity';

@Entity()
export class Sequence {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ShAccount)
  shAccount: ShAccount;

  @Column({ default: null })
  shAccountId: number;

  @ManyToOne(() => User)
  user: User;

  @Column({ default: null })
  userId: number;

  @ManyToOne(() => Schedule, (schedule) => schedule.sequence)
  schedule: Schedule;

  @Column()
  scheduleId: number;

  @Column({ collation: 'utf8mb4_unicode_ci' })
  title: string;

  @Column()
  priority: number;

  @Column()
  distribution: number;

  @Column()
  totalSteps: number;

  @Column({
    type: 'enum',
    enum: SequenceProgress,
    default: SequenceProgress.Draft,
  })
  progress: SequenceProgress;

  @Column({ default: Status.Active })
  status: Status;

  @ManyToOne(() => EmailAccount, (emailAccount) => emailAccount.sequences)
  email: EmailAccount;

  @Column({ default: null })
  emailId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;

  // select: false is removed because find is not the only way we fetch the data.
  // on updating a sequence (for eg. renaming), we use .save() on repository
  // which returns the updated entry.
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @OneToMany(() => SequenceSetting, (settings) => settings.sequence, {
    cascade: ['insert'],
  })
  settings?: SequenceSetting[];

  @OneToMany(() => SequenceStep, (step) => step.sequence, { eager: true })
  steps: SequenceStep[];

  @Column({ type: 'timestamp', default: null })
  lastBouncedPausedAt: Date;

  @Column({ type: 'enum', enum: SequencePauseReason, default: null })
  pausedReasonIdentifier: SequencePauseReason;

  @Column({ type: 'timestamp', default: null })
  pausedAt: Date;

  @OneToMany(
    () => SequenceEmailAccount,
    (sequenceEmailAccount) => sequenceEmailAccount.sequence,
  )
  sequenceEmailAccounts: SequenceEmailAccount[];
}
