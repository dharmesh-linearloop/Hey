import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AdminUserRole } from './admin-panel-user-core.enum';
import { AdminPanelUserAccessTokens } from '../admin-panel-user-access-tokens-core/admin-panel-user-access-tokens-core.entity';
import { AdminPanelUserLoginSecrets } from '../admin-panel-user-login-secrets-core/admin-panel-user-login-secrets-core.entity';
import { AdminPanelShAccountNotes } from '../admin-panel-sh-account-notes-core/admin-panel-sh-account-notes-core.entity';
import { AdminPanelShAccountAssignees } from '../admin-panel-sh-account-assignees-core/admin-panel-sh-account-assignees-core.entity';
import { AdminPanelUserApplicationSettings } from '../admin-panel-user-application-settings-core/admin-panel-user-application-settings-core.entity';
import { SignupBlackLists } from '../signup-black-lists-core/signup-black-lists-core.entity';

@Entity()
export class AdminPanelUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'enum', enum: AdminUserRole })
  role: AdminUserRole;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  status: number;

  @Column({ type: 'timestamp' })
  deletedAt: Date;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  modifiedAt: Date;

  @OneToMany(
    () => AdminPanelUserAccessTokens,
    (adminPanelUserAccessTokens) => adminPanelUserAccessTokens.user,
  )
  adminPanelUserAccessTokens: AdminPanelUserAccessTokens[];

  @OneToMany(
    () => AdminPanelUserLoginSecrets,
    (adminPanelUserLoginSecrets) => adminPanelUserLoginSecrets.user,
  )
  adminPanelUserLoginSecrets: AdminPanelUserLoginSecrets[];

  @OneToMany(
    () => AdminPanelShAccountNotes,
    (adminPanelShAccountNotes) => adminPanelShAccountNotes.user,
  )
  adminPanelShAccountNotes: AdminPanelShAccountNotes[];

  @OneToMany(
    () => AdminPanelShAccountAssignees,
    (adminPanelShAccountAssignees) => adminPanelShAccountAssignees.user,
  )
  adminPanelShAccountAssignees: AdminPanelShAccountAssignees[];

  @OneToMany(
    () => AdminPanelUserApplicationSettings,
    (adminPanelUserApplicationSettings) =>
      adminPanelUserApplicationSettings.user,
  )
  adminPanelUserApplicationSettings: AdminPanelUserApplicationSettings[];

  @OneToMany(
    () => SignupBlackLists,
    (signupBlackLists) => signupBlackLists.user,
  )
  signupBlackLists: SignupBlackLists[];
}
