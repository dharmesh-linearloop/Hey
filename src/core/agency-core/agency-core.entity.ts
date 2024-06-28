import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AgencyEmailVerificationCreditUsage } from '../agency-email-verification-credit-usage-core/agency-email-verification-credit-usage-core.entity';

@Entity({ name: 'agency' })
export class Agency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  portalBaseUrl: string;

  @Column({ default: false })
  isWhiteLabeled: boolean;

  @Column()
  agencyCode: string;

  @OneToOne(
    () => AgencyEmailVerificationCreditUsage,
    (agencyEmailVerificationCreditUsage) =>
      agencyEmailVerificationCreditUsage.agency,
  )
  agencyEmailVerificationCreditUsage: AgencyEmailVerificationCreditUsage;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;
}
