import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { AgencyUser } from '../agency-user-core/agency-user-core.entity';

@Entity()
export class AgencyUserToken {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AgencyUser)
  agencyUser: AgencyUser;

  @Column()
  agencyUserId: number;

  @Column()
  userAgent: string;

  @Column()
  token: string;

  @Column({ default: null })
  adminUserId?: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
