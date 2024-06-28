import { STATUS_ENUM } from 'src/keys';

export const SequenceMessages = {
  NOT_FOUND: 'Sequence not found.',
  SESSION_NOT_FOUND: 'Sequence Session not found.',
  ALREADY_DISABLED: 'Sequence is already disabled.',
  DISABLED: 'Sequence is disabled.',
  ALREADY_ENABLED: 'Sequence is already enabled.',
  ENABLED: 'Sequence is enabled.',
  ALREADY_DELETED: 'Sequence is already deleted.',
  DELETED: 'Sequence is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
