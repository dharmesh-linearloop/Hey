import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user-core/user-core.entity';
import { SafetySettingsCode } from './safety-settings-core.enum';

@Entity()
export class SafetySettings {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  userId: number;

  @Column({ type: 'enum', enum: SafetySettingsCode })
  code: SafetySettingsCode;

  @Column({ collation: 'utf8mb4_unicode_ci' })
  value: string;
}
