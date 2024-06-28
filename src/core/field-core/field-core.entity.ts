import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne';
import { FieldType } from './field-core.enum';
import { ProspectType } from '../prospect-core/prospect-core.enum';
import { Status } from 'src/keys';
import { ShAccount } from '../sh-account-core/sh-account-core.entity';
import { User } from '../user-core/user-core.entity';

@Entity()
export class Field {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ collation: 'utf8mb4_unicode_ci' })
  label: string;

  @Column({ type: 'enum', enum: FieldType })
  fieldType: FieldType;

  @Column({ type: 'enum', enum: ProspectType })
  prospectType: ProspectType;

  @Column({ collation: 'utf8mb4_unicode_ci' })
  fallbackText: string;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @Column()
  isDefault: boolean;

  @ManyToOne(() => ShAccount, (shAccount) => shAccount.fields)
  shAccount: ShAccount;

  @Column({ default: null })
  shAccountId: number;

  @ManyToOne(() => User)
  user: User;

  @Column({ default: null })
  userId: number;
}
