import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Prospect } from '../prospect-core/prospect-core.entity';
import { Field } from '../field-core/field-core.entity';

@Entity()
export class ProspectAttribute {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Field, { eager: true })
  fieldRef: Field;

  @Column()
  fieldRefId: number;

  @Column({ name: 'attribute_value', collation: 'utf8mb4_unicode_ci' })
  attributeValue: string;

  @ManyToOne(() => Prospect, (p) => p.attributes)
  prospect: Prospect;

  @Column({ default: null })
  prospectId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
