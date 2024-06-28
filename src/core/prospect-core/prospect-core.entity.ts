import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  TableInheritance,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Status } from 'src/keys';
import { ShAccount } from '../sh-account-core/sh-account-core.entity';
import { User } from '../user-core/user-core.entity';
import { ProspectType } from './prospect-core.enum';
import { AdminPanelTags } from '../admin-panel-tags-core/admin-panel-tags-core.entity';
import { ProspectAttribute } from '../prospect-attribute-core/prospect-attribute-core.entity';

@Entity()
@TableInheritance({
  column: { type: 'enum', enum: ProspectType, name: 'prospect_type' },
})
export abstract class Prospect {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', name: 'prospect_status', enum: Status })
  status: Status;

  @Column({ type: 'boolean', default: true })
  isSubscribed: boolean;

  // @Column({type:'timestamp'})
  // expiresAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  // list of attributes
  @OneToMany(() => ProspectAttribute, (attr) => attr.prospect, {
    cascade: true,
    eager: true,
  })
  attributes: ProspectAttribute[];

  // FK to ShAccout
  @ManyToOne(() => ShAccount)
  shAccount: ShAccount;

  @Column({ default: null })
  shAccountId: number;

  // FK to user
  @ManyToOne(() => User)
  user: User;

  @Column({ default: null })
  userId: number;

  @Column({ type: 'boolean', default: false })
  isBounced: boolean;

  @Column({ type: 'boolean', default: false })
  isBlacklisted: boolean;

  @ManyToMany(
    () => AdminPanelTags,
    (adminpanelTags: any) => adminpanelTags.prospects,
  )
  @JoinTable({
    name: 'prospect_tag',
  })
  adminPanelTags: AdminPanelTags[];
}
