export enum SequenceSettingCode {
  EMAIL_LIMIT = 'email-limit', // Email limit of prospect in a single day
  UNSUBSCRIBE_LINK = 'unsubscribe-link', // Unsubscribe link in email
  MARK_AS_FINISHED = 'mark-as-finished', // Consider the prospect as finished if a reply is received
  TRACK_LINK_CLICKS = 'track-link-clicks', // To toggle activation of click tracking in emails.
  TRACK_EMAIL_OPENS = 'track-email-opens', // To toggle activation of open tracking in emails,
  IS_SAMPLE_SEQUENCE = 'is-sample-sequence',
}
