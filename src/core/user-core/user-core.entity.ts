import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  ContactableProspect,
  EventRecipientType,
  PriorColdEmailToolExperience,
  UseCase,
  UserRole,
} from './user-core.enum';
import { ShAccount } from '../sh-account-core/sh-account-core.entity';
import { Sequence } from '../sequence-core/sequence-core.entity';
import { EmailAccount } from '../email-account-core/email-account-core.entity';
import { SafetySettings } from '../safety-settings-core/safety-settings-core.entity';
import { UserDefaultSchedule } from '../user-default-schedule-core/user-default-schedule-core.entity';
import { UserInvitation } from '../user-invitations-core/user-invitations-core.entity';
import { UserTrackingIds } from '../user-tracking-ids-core/user-tracking-ids-core.entity';
import { UserProfileProgress } from '../user-profile-progress-core/user-profile-progress-core.entity';
import { UserSetting } from '../user-setting-core/user-setting-core.entity';
import { TeamMember } from '../team-member-core/team-member-core.entity';
import { UserRole as UserRoleEntity } from '../user-role-core/user-role-core.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.MEMBER })
  role: UserRole;

  @ManyToOne(() => ShAccount, (shAccount) => shAccount.users)
  shAccount: ShAccount;

  @Column({ default: null })
  shAccountId: number;

  @Column({ collation: 'utf8mb4_unicode_ci' })
  firstName: string;

  @Column({ collation: 'utf8mb4_unicode_ci' })
  lastName: string;

  @Column({ unique: true, collation: 'utf8mb4_unicode_ci' })
  email: string;

  @Column()
  phone: string;

  @Column()
  country: string;

  @Column({ select: false })
  password: string;

  @Column()
  saltKey: string;

  @Column({ type: 'timestamp' })
  lastSeen: Date;

  @Column()
  verified: boolean;

  @Column()
  status: number;

  @Column({ default: 'America/New_York' })
  timeZone: string;

  @Column({ default: null })
  designation: string;

  @Column({ type: 'enum', enum: UseCase })
  useCase: UseCase;

  @Column()
  signupInfo: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @OneToMany(() => SafetySettings, (safetySettings) => safetySettings.user, {
    cascade: ['insert'],
  })
  safetySettings?: SafetySettings[];

  @OneToMany(() => Sequence, (sequence) => sequence.user)
  sequences: Sequence[];

  @OneToMany(() => EmailAccount, (emailAccount) => emailAccount.user)
  emailAccounts: EmailAccount[];

  @OneToMany(() => UserInvitation, (userInvitations) => userInvitations.user)
  invitations: UserInvitation[];

  @Column()
  trackingId: string;

  @OneToMany(() => UserSetting, (settings) => settings.user, {
    cascade: ['insert'],
  })
  settings?: UserSetting[];

  @OneToOne(
    () => UserDefaultSchedule,
    (userDefaultSchedule) => userDefaultSchedule.user,
  )
  userDefaultSchedule: UserDefaultSchedule;

  @OneToOne(() => UserTrackingIds, (userTrackingIds) => userTrackingIds.user)
  userTrackingId: UserTrackingIds;

  @OneToMany(
    () => UserProfileProgress,
    (userProfileProgress) => userProfileProgress.user,
  )
  userProfileProgress: UserProfileProgress[];

  @Column({
    type: 'enum',
    enum: EventRecipientType,
    default: EventRecipientType.INDIVIDUAL_USER,
  })
  eventRecipientType: EventRecipientType;

  @Column({ type: 'enum', enum: ContactableProspect })
  contactableProspect: ContactableProspect;

  @OneToMany(() => TeamMember, (teamMember) => teamMember.user)
  teamMembers: TeamMember[];

  @OneToOne(() => UserRoleEntity, (userRole) => userRole.user)
  userRole: UserRoleEntity;

  @Column({ type: 'enum', enum: PriorColdEmailToolExperience })
  priorColdEmailToolExperience: PriorColdEmailToolExperience;
}
