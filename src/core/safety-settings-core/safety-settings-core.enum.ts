export enum SafetySettingsCode {
  CheckInbox = 'check-inbox', //Check inbox before starting sequence
  EmailOpen = 'email-open', // Enable email open tracking
  EmailLink = 'email-link', // Enable email link tracking
  AllowMultipleSequence = 'allow-multiple-sequence', // Allow prospect in multiple sequence
  StopSequenceAllProspect = 'stop-sequence-all-prospect', // Stop sequence to all prospect when reply received
}
