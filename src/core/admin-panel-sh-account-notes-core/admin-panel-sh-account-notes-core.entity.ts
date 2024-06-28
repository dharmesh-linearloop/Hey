import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AdminPanelUser } from '../admin-panel-user-core/admin-panel-user-core.entity';
import { ShAccount } from '../sh-account-core/sh-account-core.entity';

@Entity()
export class AdminPanelShAccountNotes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ShAccount)
  shAccount: ShAccount;

  @Column()
  shAccountId: number;

  @ManyToOne(() => AdminPanelUser)
  user: AdminPanelUser;

  @Column()
  userId: number;

  @Column()
  note: string;

  @Column()
  isPinned: boolean;

  @Column({ type: 'timestamp' })
  deletedAt: Date;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  modifiedAt: Date;
}
