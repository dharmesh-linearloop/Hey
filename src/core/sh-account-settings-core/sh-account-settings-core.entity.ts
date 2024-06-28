import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ShAccount } from '../sh-account-core/sh-account-core.entity';
import { ShAccountSettingsCode } from './sh-account-settings-core.enum';

@Entity()
export class ShAccountSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ShAccount)
  shAccount: ShAccount;

  @Column()
  shAccountId: number;

  @Column({ type: 'enum', enum: ShAccountSettingsCode })
  code: ShAccountSettingsCode;

  @Column({ collation: 'utf8mb4_unicode_ci' })
  value: string;
}
