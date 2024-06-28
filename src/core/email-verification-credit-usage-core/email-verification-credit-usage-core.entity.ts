import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ShAccount } from '../sh-account-core/sh-account-core.entity';

@Entity()
export class EmailVerificationCreditUsage {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(
    () => ShAccount,
    (shAccount) => shAccount.emailVerificationCreditUsage,
  )
  @JoinColumn()
  shAccount: ShAccount;

  @Column({ default: null })
  shAccountId: number;

  @Column()
  creditsAvailable: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;
}
