import { STATUS_ENUM } from 'src/keys';

export const SequenceStepMessages = {
  NOT_FOUND: 'Sequence Step not found.',
  SESSION_NOT_FOUND: 'Sequence Step Session not found.',
  ALREADY_DISABLED: 'Sequence Step is already disabled.',
  DISABLED: 'Sequence Step is disabled.',
  ALREADY_ENABLED: 'Sequence Step is already enabled.',
  ENABLED: 'Sequence Step is enabled.',
  ALREADY_DELETED: 'Sequence Step is already deleted.',
  DELETED: 'Sequence Step is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
