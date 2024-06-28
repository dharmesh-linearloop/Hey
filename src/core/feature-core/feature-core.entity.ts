import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Feature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;
}
