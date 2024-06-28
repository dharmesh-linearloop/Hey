import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AdminPanelUser } from '../admin-panel-user-core/admin-panel-user-core.entity';
import { ShAccount } from '../sh-account-core/sh-account-core.entity';
import { ShAccountAssignees } from './admin-panel-sh-account-assignees-core.enum';

@Entity()
export class AdminPanelShAccountAssignees {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ShAccountAssignees })
  role: ShAccountAssignees;

  @ManyToOne(() => ShAccount)
  shAccount: ShAccount;

  @Column()
  shAccountId: number;

  @ManyToOne(() => AdminPanelUser)
  user: AdminPanelUser;

  @Column()
  userId: number;

  @Column({ type: 'timestamp' })
  deletedAt: Date;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  modifiedAt: Date;
}
