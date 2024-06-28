import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { IcpStatus, Industry } from './sh-account-core.enum';
import { User } from '../user-core/user-core.entity';
import { AccountSubscription } from '../account-subscription-core/account-subscription-core.entity';
import { AccountUsage } from '../account-usage-core/account-usage-core.entity';
import { Field } from '../field-core/field-core.entity';
import { Agency } from '../agency-core/agency-core.entity';
import { AgencyUserShAccount } from '../agency-user-sh-account-core/agency-user-sh-account-core.entity';
import { ShAccountSettings } from '../sh-account-settings-core/sh-account-settings-core.entity';
import { EmailVerificationCreditUsage } from '../email-verification-credit-usage-core/email-verification-credit-usage-core.entity';
import { AdminPanelShAccountNotes } from '../admin-panel-sh-account-notes-core/admin-panel-sh-account-notes-core.entity';
import { AdminPanelShAccountAssignees } from '../admin-panel-sh-account-assignees-core/admin-panel-sh-account-assignees-core.entity';
import { AdminPanelAccountTags } from '../admin-panel-account-tags-core/admin-panel-account-tags-core.entity';

@Entity()
export class ShAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  teamSize: string;

  @Column({ type: 'enum', enum: Industry, default: null })
  industry: Industry;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @OneToMany(() => Field, (field) => field.shAccount)
  fields: Field[];

  @OneToMany(() => User, (user) => user.shAccount)
  users: User[];

  @OneToMany(() => AgencyUserShAccount, (agencyUser) => agencyUser.shAccount)
  agencyUsers: AgencyUserShAccount[];

  @OneToMany(
    () => ShAccountSettings,
    (shAccountSettings) => shAccountSettings.shAccount,
    { cascade: ['insert'] },
  )
  shAccountSettings?: ShAccountSettings[];

  @OneToMany(
    () => AccountSubscription,
    (accountSubscription) => accountSubscription.shAccount,
  )
  accountSubscription: AccountSubscription[];

  @OneToMany(() => AccountUsage, (accountUsage) => accountUsage.shAccount)
  accountUsages: AccountUsage[];

  @ManyToOne(() => Agency)
  agency: Agency;

  @Column()
  agencyId: number;

  @Column()
  clientName: string;

  @Column()
  status: boolean;

  @Column({ type: 'enum', enum: IcpStatus, nullable: true })
  icpStatus: IcpStatus;

  @OneToOne(
    () => EmailVerificationCreditUsage,
    (emailVerificationCreditUsage) => emailVerificationCreditUsage.shAccount,
  )
  emailVerificationCreditUsage: EmailVerificationCreditUsage;

  @OneToMany(
    () => AdminPanelShAccountNotes,
    (adminPanelShAccountNotes) => adminPanelShAccountNotes.shAccount,
  )
  adminPanelShAccountNotes: AdminPanelShAccountNotes[];

  @OneToMany(
    () => AdminPanelShAccountAssignees,
    (adminPanelShAccountAssignees) => adminPanelShAccountAssignees.shAccount,
  )
  adminPanelShAccountAssignees: AdminPanelShAccountAssignees[];

  @OneToMany(
    () => AdminPanelAccountTags,
    (adminPanelAccountTags) => adminPanelAccountTags.shAccount,
  )
  adminPanelAccountTags: AdminPanelAccountTags[];
}
