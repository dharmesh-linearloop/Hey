import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from '../user-core/user-core.entity';
import { ProfileProgressStep } from '../profile-progress-step-core/profile-progress-step-core.entity';

@Entity()
export class UserProfileProgress extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => ProfileProgressStep)
  profileProgressStep: ProfileProgressStep;

  @Column({ default: null })
  profileProgressStepId: number;

  @Column({ default: false })
  isCompleted: boolean;
}
