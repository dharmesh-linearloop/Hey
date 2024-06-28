import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from '../user-core/user-core.entity';
import { UserSettingCode } from './user-setting-core.enum';

@Entity()
export class UserSetting extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.settings)
  user: User;

  @Column({ default: null })
  userId: number;

  @Column({ type: 'enum', enum: UserSettingCode })
  code: UserSettingCode;

  @Column({ length: 1000 })
  value: string;
}
