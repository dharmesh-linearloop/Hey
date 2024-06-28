import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { ProfileProgressSteps } from './profile-progress-step-core.enum';
import { UserProfileProgress } from '../user-profile-progress-core/user-profile-progress-core.entity';

@Entity()
export class ProfileProgressStep extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ProfileProgressSteps })
  stepName: ProfileProgressSteps;

  @Column()
  order: number;

  @OneToMany(
    () => UserProfileProgress,
    (userProfileProgress) => userProfileProgress.profileProgressStep,
  )
  userProfileProgress: UserProfileProgress[];
}
