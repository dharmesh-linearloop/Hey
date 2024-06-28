import { ChildEntity, Column, OneToMany } from 'typeorm';
import { SequenceContactHistory } from '../sequence-contact-history-core/sequence-contact-history-core.entity';
import { VerificationStatus } from './contact-core.enum';
import { Prospect } from '../prospect-core/prospect-core.entity';

@ChildEntity('contact')
export class Contact extends Prospect {
  @Column({ collation: 'utf8mb4_unicode_ci' })
  email: string;

  @Column({
    type: 'enum',
    enum: VerificationStatus,
    default: VerificationStatus.Skip,
  })
  verificationStatus: VerificationStatus;

  @Column({ type: 'timestamp' })
  lastVerifiedAt: Date;

  @OneToMany(
    () => SequenceContactHistory,
    (sequenceContactHistory) => sequenceContactHistory.contact,
  )
  sequenceContactHistory: SequenceContactHistory[];
}
