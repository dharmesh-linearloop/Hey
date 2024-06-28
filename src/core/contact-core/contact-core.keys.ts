import { STATUS_ENUM } from 'src/keys';

export const ContactMessages = {
  NOT_FOUND: 'Contact not found.',
  SESSION_NOT_FOUND: 'Contact Session not found.',
  ALREADY_DISABLED: 'Contact is already disabled.',
  DISABLED: 'Contact is disabled.',
  ALREADY_ENABLED: 'Contact is already enabled.',
  ENABLED: 'Contact is enabled.',
  ALREADY_DELETED: 'Contact is already deleted.',
  DELETED: 'Contact is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
