import { STATUS_ENUM } from 'src/keys';

export const TemplateMessages = {
  NOT_FOUND: 'Template not found.',
  SESSION_NOT_FOUND: 'Template Session not found.',
  ALREADY_DISABLED: 'Template is already disabled.',
  DISABLED: 'Template is disabled.',
  ALREADY_ENABLED: 'Template is already enabled.',
  ENABLED: 'Template is enabled.',
  ALREADY_DELETED: 'Template is already deleted.',
  DELETED: 'Template is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
