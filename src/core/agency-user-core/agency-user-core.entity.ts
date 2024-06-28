import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Agency } from '../agency-core/agency-core.entity';
import { AgencyRole, AgencyUserStatus } from './agency-user-core.enum';

@Entity({ name: 'agency_user' })
export class AgencyUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ collation: 'utf8mb4_unicode_ci' })
  email: string;

  @ManyToOne(() => Agency)
  agency: Agency;

  @Column({ select: false })
  password: string;

  @Column({ select: false })
  salt: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  trackingId: string;

  @Column()
  agencyId: number;

  @Column({ type: 'enum', enum: AgencyRole })
  role: AgencyRole;

  @Column({
    type: 'enum',
    enum: AgencyUserStatus,
    default: AgencyUserStatus.InActive,
  })
  status: AgencyUserStatus;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @Column()
  timeZone: string;
}
