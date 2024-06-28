import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user-core/user-core.entity';

@Entity()
export class UserTrackingIds {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.userTrackingId)
  @JoinColumn()
  user: User;

  @Column()
  userId: number;

  @Column()
  freshSalesId: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
