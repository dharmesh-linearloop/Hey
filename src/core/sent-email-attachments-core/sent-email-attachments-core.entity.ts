import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column,
} from 'typeorm';
import { Email } from '../email-core/email-core.entity';
import { Attachment } from '../attachment-core/attachment-core.entity';

@Entity()
export class SentEmailAttachments extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  emailId: number;

  @ManyToOne(() => Email)
  email: Email;

  @Column({ nullable: false })
  attachmentId: number;

  @ManyToOne(() => Attachment)
  attachment: Attachment;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
