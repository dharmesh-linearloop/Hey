export enum SequenceStepConfig {
  MaxRelativeDays = 365,
  MaxVariants = 26,
  MinVariants = 1,
  MinActiveVariants = 1,
}

export enum SequenceStepType {
  AutomatedEmail = 1,
  ManualEmail = 2,
  Call = 3,
  Sms = 4,
  LinkedIn = 5,
  Twitter = 6,
}
