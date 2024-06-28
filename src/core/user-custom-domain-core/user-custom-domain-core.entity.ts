import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user-core/user-core.entity';
import { EmailAccountCustomDomain } from '../email-account-custom-domain-core/email-account-custom-domain-core.entity';

@Entity()
export class UserCustomDomain {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column({ default: null })
  userId: number;

  @OneToMany(
    () => EmailAccountCustomDomain,
    (emailAccountCustomDomain) => emailAccountCustomDomain.userCustomDomain,
  )
  emailAccountCustomDomain: EmailAccountCustomDomain[];

  @Column({ collation: 'utf8mb4_unicode_ci' })
  domain: string;

  @Column({ default: false })
  isValid: boolean;

  @Column({ default: false })
  isDefault: boolean;

  @Column({ type: 'timestamp' })
  lastVerifiedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;
}
