import { STATUS_ENUM } from 'src/keys';

export const AttachmentMessages = {
  NOT_FOUND: 'Attachment not found.',
  SESSION_NOT_FOUND: 'Attachment Session not found.',
  ALREADY_DISABLED: 'Attachment is already disabled.',
  DISABLED: 'Attachment is disabled.',
  ALREADY_ENABLED: 'Attachment is already enabled.',
  ENABLED: 'Attachment is enabled.',
  ALREADY_DELETED: 'Attachment is already deleted.',
  DELETED: 'Attachment is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
