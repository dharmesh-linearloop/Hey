import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SessionStatusEnum } from './admin-panel-user-access-tokens-core.enum';
import { AdminPanelUser } from '../admin-panel-user-core/admin-panel-user-core.entity';

@Entity()
export class AdminPanelUserAccessTokens {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AdminPanelUser)
  user: AdminPanelUser;

  @Column()
  userId: number;

  @Column()
  token: string;

  @Column()
  geoIpCountry: string;

  @Column()
  ipAddress: string;

  @Column()
  userAgent: string;

  @Column({ type: 'enum', enum: SessionStatusEnum })
  status: SessionStatusEnum;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @Column({ type: 'timestamp' })
  deletedAt: Date;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  modifiedAt: Date;
}
