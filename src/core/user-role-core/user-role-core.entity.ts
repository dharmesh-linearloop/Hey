import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user-core/user-core.entity';
import { Role } from '../role-core/role-core.entity';
import { SubscriptionType } from 'src/shared/types/subscription';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  userId: number;

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
