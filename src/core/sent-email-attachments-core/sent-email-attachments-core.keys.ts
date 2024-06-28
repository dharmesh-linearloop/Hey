import { STATUS_ENUM } from 'src/keys';

export const SentEmailAttachmentsMessages = {
  NOT_FOUND: 'Sent Email Attachments not found.',
  SESSION_NOT_FOUND: 'Sent Email Attachments Session not found.',
  ALREADY_DISABLED: 'Sent Email Attachments is already disabled.',
  DISABLED: 'Sent Email Attachments is disabled.',
  ALREADY_ENABLED: 'Sent Email Attachments is already enabled.',
  ENABLED: 'Sent Email Attachments is enabled.',
  ALREADY_DELETED: 'Sent Email Attachments is already deleted.',
  DELETED: 'Sent Email Attachments is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
