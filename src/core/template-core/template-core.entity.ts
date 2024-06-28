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
import { ShAccount } from '../sh-account-core/sh-account-core.entity';
import { TemplateAttachment } from '../template-attachment-core/template-attachment-core.entity';

@Entity()
export class Template {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => ShAccount)
  shAccount: ShAccount;

  @Column()
  shAccountId: number;

  @Column({ collation: 'utf8mb4_unicode_ci' })
  title: string;

  @Column()
  shared: boolean;

  @Column({ default: false })
  isDefault: boolean;

  @OneToMany(
    () => TemplateAttachment,
    (templateAttachment) => templateAttachment.template,
  )
  templateAttachments: TemplateAttachment[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;
}
