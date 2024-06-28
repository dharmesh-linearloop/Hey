import { STATUS_ENUM } from 'src/keys';

export const ProspectAttributeMessages = {
  NOT_FOUND: 'Prospect Attribute not found.',
  SESSION_NOT_FOUND: 'Prospect Attribute Session not found.',
  ALREADY_DISABLED: 'Prospect Attribute is already disabled.',
  DISABLED: 'Prospect Attribute is disabled.',
  ALREADY_ENABLED: 'Prospect Attribute is already enabled.',
  ENABLED: 'Prospect Attribute is enabled.',
  ALREADY_DELETED: 'Prospect Attribute is already deleted.',
  DELETED: 'Prospect Attribute is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
