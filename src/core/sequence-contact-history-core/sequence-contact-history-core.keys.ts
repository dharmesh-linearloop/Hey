import { STATUS_ENUM } from 'src/keys';

export const SequenceContactHistoryMessages = {
  NOT_FOUND: 'Sequence Contact History not found.',
  SESSION_NOT_FOUND: 'Sequence Contact History Session not found.',
  ALREADY_DISABLED: 'Sequence Contact History is already disabled.',
  DISABLED: 'Sequence Contact History is disabled.',
  ALREADY_ENABLED: 'Sequence Contact History is already enabled.',
  ENABLED: 'Sequence Contact History is enabled.',
  ALREADY_DELETED: 'Sequence Contact History is already deleted.',
  DELETED: 'Sequence Contact History is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
