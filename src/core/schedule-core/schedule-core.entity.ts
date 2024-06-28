import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../user-core/user-core.entity';
import { ShAccount } from '../sh-account-core/sh-account-core.entity';
import { Sequence } from '../sequence-core/sequence-core.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => ShAccount)
  shAccount: ShAccount;

  @Column()
  shAccountId: number;

  @Column({ collation: 'utf8mb4_unicode_ci' })
  name: string;

  @Column()
  timezone: string;

  @Column({ type: 'text' })
  timeSlots: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @OneToMany(() => Sequence, (sequence) => sequence.schedule)
  sequence: Sequence[];
}
