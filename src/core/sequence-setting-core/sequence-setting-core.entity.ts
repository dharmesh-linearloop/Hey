import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Sequence } from '../sequence-core/sequence-core.entity';
import { SequenceSettingCode } from './sequence-setting-core.enum';

@Entity()
export class SequenceSetting extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Sequence, (sequence) => sequence.settings)
  sequence: Sequence;

  @Column()
  sequenceId: number;

  @Column({ type: 'enum', enum: SequenceSettingCode })
  code: SequenceSettingCode;

  @Column({ length: 1000, collation: 'utf8mb4_unicode_ci' })
  value: string;
}
