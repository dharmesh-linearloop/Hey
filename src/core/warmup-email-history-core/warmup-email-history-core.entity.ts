import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'warmup_templates' })
export class WarmupTemplates {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  sendingSubject: string;

  @Column({ nullable: false })
  sendingContent: string;

  @Column({ nullable: false })
  replyingContent: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;
}
