import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShAccount } from '../sh-account-core/sh-account-core.entity';
import { AgencyRole } from './agency-user-sh-account-core.enum';
import { User } from '../user-core/user-core.entity';
import { AgencyUser } from '../agency-user-core/agency-user-core.entity';

@Entity({ name: 'agency_user_sh_account' })
export class AgencyUserShAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ShAccount, (shAccount) => shAccount.agencyUsers)
  shAccount: ShAccount;

  @Column()
  shAccountId: number;

  @Column({ type: 'enum', enum: AgencyRole })
  role: AgencyRole;

  @ManyToOne(() => AgencyUser)
  agencyUser: AgencyUser;

  @Column()
  agencyUserId: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  userId: number;

  @Column({ default: true })
  status: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;
}
