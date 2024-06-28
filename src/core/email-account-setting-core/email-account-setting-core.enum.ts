export enum EmailAccountSettingCode {
  MinInterval = 'min-interval', // Minimum interval limit for sending automated emails
  MaxInterval = 'max-interval', // Maximum interval limit for sending automated emails
  DailySendingLimit = 'daily-sending-limit',
  AvailableQuota = 'available-quota',
  Bcc = 'bcc',
  Signature = 'signature',
  RampUpInitialSendingLimit = 'ramp-up-initial-sending-limit',
  RampUpPercent = 'ramp-up-percent',
  RampUpStatus = 'ramp-up-status',
  RampUpLimit = 'ramp-up-limit',
  MaxSendingLimit = 'max-sending-limit',
  EmailCreatedTimeStamp = 'email-created-timestamp',
}
