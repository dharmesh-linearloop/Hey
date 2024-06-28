import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { ShAccount } from '../sh-account-core/sh-account-core.entity';
import { User } from '../user-core/user-core.entity';

@Entity({ name: 'user_invitations' })
export class UserInvitation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ShAccount)
  shAccount: ShAccount;

  @ManyToOne(() => User)
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  invitedBy: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @Column()
  token: string;
}
