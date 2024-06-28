import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user-core/user-core.entity';
import { ShAccount } from '../sh-account-core/sh-account-core.entity';

@Entity()
export class Attachment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  s3ObjectKey: string;

  @Column()
  mimeType: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => ShAccount)
  shAccount: ShAccount;

  @Column()
  userId: number;

  @Column()
  shAccountId: number;

  // Size will be in bytes
  @Column()
  size: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @UpdateDateColumn()
  modifiedAt: Date;
}
