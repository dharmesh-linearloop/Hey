import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SystemRole } from '../system-role-core/system-role-core.entity';
import { User } from '../user-core/user-core.entity';
import { ShAccount } from '../sh-account-core/sh-account-core.entity';
import { TeamMember } from '../team-member-core/team-member-core.entity';
import { SubscriptionType } from 'src/shared/types/subscription';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  planId: number;

  @Column('simple-array', { nullable: true })
  permissions: string[];

  @ManyToOne(() => SystemRole)
  systemRole: SystemRole;

  @Column()
  systemRoleId: number;

  @ManyToOne(() => User)
  createdByUser: User;

  @Column({ nullable: true })
  createdByUserId?: number;

  @ManyToOne(() => ShAccount)
  shAccount: ShAccount;

  @ManyToMany(() => TeamMember, (teamMembers) => teamMembers.roles)
  teamMembers: TeamMember[];

  @Column()
  shAccountId: number;

  @Column({
    type: 'enum',
    enum: SubscriptionType,
    default: SubscriptionType.Sequence,
  })
  application: SubscriptionType;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
