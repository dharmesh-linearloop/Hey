import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Email } from '../email-core/email-core.entity';

@Entity()
export class EmailLink extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' }) // which table to create fk
  linkId: number;

  @ManyToOne(() => Email)
  emails: Email;

  @Column({ type: 'int' })
  emailId: number;

  @Column({ type: 'int' })
  clickCount: number;

  @Column({ type: 'timestamp', default: null })
  lastClickedAt: Date;
}
