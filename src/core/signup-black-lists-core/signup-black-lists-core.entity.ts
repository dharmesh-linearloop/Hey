import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AdminPanelUser } from '../admin-panel-user-core/admin-panel-user-core.entity';
import { SignupBlackListType } from './signup-black-lists-core.enum';

@Entity()
export class SignupBlackLists {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AdminPanelUser)
  user: AdminPanelUser;

  @Column()
  userId: number;

  @Column({ type: 'enum', enum: SignupBlackListType })
  type: SignupBlackListType;

  @Column()
  value: string;

  @Column()
  reasonType: string;

  @Column()
  note: string;

  @Column({ type: 'timestamp' })
  deletedAt: Date;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  modifiedAt: Date;
}
