import { STATUS_ENUM } from 'src/keys';

export const SequenceEmailAccountMessages = {
  NOT_FOUND: 'Sequence Email Account not found.',
  SESSION_NOT_FOUND: 'Sequence Email Account Session not found.',
  ALREADY_DISABLED: 'Sequence Email Account is already disabled.',
  DISABLED: 'Sequence Email Account is disabled.',
  ALREADY_ENABLED: 'Sequence Email Account is already enabled.',
  ENABLED: 'Sequence Email Account is enabled.',
  ALREADY_DELETED: 'Sequence Email Account is already deleted.',
  DELETED: 'Sequence Email Account is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
