import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user-core/user-core.entity';
import { Schedule } from '../schedule-core/schedule-core.entity';

@Entity()
export class UserDefaultSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.userDefaultSchedule)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Schedule, { eager: true })
  schedule: Schedule;

  @Column()
  scheduleId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;
}
