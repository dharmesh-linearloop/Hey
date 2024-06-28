import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Template } from '../template-core/template-core.entity';
import { ShAccount } from '../sh-account-core/sh-account-core.entity';
import { User } from '../user-core/user-core.entity';
import { Attachment } from '../attachment-core/attachment-core.entity';

@Entity({ name: 'template_attachment' })
export class TemplateAttachment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Template)
  template: Template;

  @Column()
  templateId: number;

  @ManyToOne(() => Attachment)
  attachment: Attachment;

  @Column()
  attachmentId: number;

  @ManyToOne(() => ShAccount)
  shAccount: ShAccount;

  @Column({ default: null })
  shAccountId: number;

  @ManyToOne(() => User)
  user: User;

  @Column({ default: null })
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
