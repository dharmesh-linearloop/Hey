import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TeamMember } from '../team-member-core/team-member-core.entity';
import { Role } from '../role-core/role-core.entity';
import { SubscriptionType } from 'src/shared/types/subscription';

@Entity()
export class TeamMemberRole {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TeamMember)
  teamMember: TeamMember;

  @Column()
  teamMemberId: number;

  @ManyToOne(() => Role)
  role: Role;

  @Column()
  roleId: number;

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
