import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AdminPanelUser } from '../admin-panel-user-core/admin-panel-user-core.entity';

@Entity()
export class AdminPanelUserLoginSecrets {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AdminPanelUser)
  user: AdminPanelUser;

  @Column()
  userId: number;

  @Column()
  otp?: string;

  @Column()
  otpRef?: string;

  @Column({ type: 'timestamp' })
  otpExpiresAt: Date;

  @Column()
  cookieToken?: string;

  @Column({ type: 'timestamp' })
  cookieTokenExpiresAt: Date;

  @Column({ type: 'timestamp' })
  deletedAt: Date;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  modifiedAt: Date;
}
