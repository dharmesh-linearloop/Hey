import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EmailAccount } from '../email-account-core/email-account-core.entity';
import { UserCustomDomain } from '../user-custom-domain-core/user-custom-domain-core.entity';

@Entity()
export class EmailAccountCustomDomain {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EmailAccount)
  emailAccount: EmailAccount;

  @ManyToOne(() => UserCustomDomain)
  userCustomDomain: UserCustomDomain;

  @Column()
  userCustomDomainId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @Index({ unique: true })
  @Column({ default: null })
  emailAccountId: number;
}
