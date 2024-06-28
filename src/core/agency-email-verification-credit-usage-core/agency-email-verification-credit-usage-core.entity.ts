import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Agency } from '../agency-core/agency-core.entity';

@Entity({ name: 'agency_email_verification_credit_usage' })
export class AgencyEmailVerificationCreditUsage {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Agency, (agency) => agency.agencyEmailVerificationCreditUsage)
  @JoinColumn()
  agency: Agency;

  @Column()
  agencyId: number;

  @Column()
  creditsAvailable: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;
}
