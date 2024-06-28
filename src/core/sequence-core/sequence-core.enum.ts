export enum SequenceConfig {
  MaxSteps = 50,
  MinTitleLength = 1,
  MaxTitleLength = 100,
}

export enum SequenceProgress {
  Active = 1,
  Pause = 2,
  Draft = 3,
}

export enum SequenceSortBy {
  CreatedAt = 'created-date',
  Title = 'title',
  Status = 'progress',
  CreatedBy = 'userName',
  Active = 'active',
  Finished = 'finished',
  Total = 'total',
  OpenPer = 'openPer',
  RepliedPer = 'repliedPer',
}

export enum SequenceAction {
  Pause = 1,
  Resume = 2,
}

export enum SequenceType {
  SampleSequence = 'Sample Sequence',
  NewSequence = 'New Sequence',
}

export enum SequencePauseReason {
  BounceLimitReached = 1,
  EmailAccountDisconnected = 2,
  PlanExpired = 3,
  ManuallyPaused = 4,
  EmailSendingLimitReached = 5,
  TrialQuotaExhausted = 6,
  PlanPaused = 7,
  AgencyClientDeleted = 8,
  EmailAccountDeleted = 9,
  PlanDowngrade = 10,
  OverLimitConnectedEmails = 11,
}
