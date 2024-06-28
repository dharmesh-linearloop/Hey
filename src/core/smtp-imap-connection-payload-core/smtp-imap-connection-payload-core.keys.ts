import { STATUS_ENUM } from 'src/keys';

export const SmtpImapConnectionPayloadMessages = {
  NOT_FOUND: 'Smtp Imap Connection Payload not found.',
  SESSION_NOT_FOUND: 'Smtp Imap Connection Payload Session not found.',
  ALREADY_DISABLED: 'Smtp Imap Connection Payload is already disabled.',
  DISABLED: 'Smtp Imap Connection Payload is disabled.',
  ALREADY_ENABLED: 'Smtp Imap Connection Payload is already enabled.',
  ENABLED: 'Smtp Imap Connection Payload is enabled.',
  ALREADY_DELETED: 'Smtp Imap Connection Payload is already deleted.',
  DELETED: 'Smtp Imap Connection Payload is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
