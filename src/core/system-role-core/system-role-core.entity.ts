import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SystemRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('simple-array', { nullable: true })
  permissions: string[];

  @Column()
  planId: number;
}
