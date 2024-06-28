import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user-core/user-core.entity';
import { Team } from '../team-core/team-core.entity';
import { Role } from '../role-core/role-core.entity';

@Entity()
export class TeamMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Team)
  team: Team;

  @ManyToMany(() => Role, (roles) => roles.teamMembers)
  @JoinTable({
    name: 'team_member_role',
  })
  roles: Role[];

  @Column()
  teamId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
