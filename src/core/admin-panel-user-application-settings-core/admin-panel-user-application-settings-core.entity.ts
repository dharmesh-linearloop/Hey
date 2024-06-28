import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SettingTableEnum } from './admin-panel-user-application-settings-core.enum';
import { AdminPanelUser } from '../admin-panel-user-core/admin-panel-user-core.entity';

@Entity()
export class AdminPanelUserApplicationSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AdminPanelUser)
  user: AdminPanelUser;

  @Column()
  userId: number;

  @Column({ type: 'enum', enum: SettingTableEnum })
  table: SettingTableEnum;

  @Column()
  columns: string;

  @Column({ type: 'timestamp' })
  deletedAt: Date;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  modifiedAt: Date;
}
