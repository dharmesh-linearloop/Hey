import { AdminPanelUserAccessTokens } from 'src/core/admin-panel-user-access-tokens-core/admin-panel-user-access-tokens-core.entity';
import { AdminPanelUser } from 'src/core/admin-panel-user-core/admin-panel-user-core.entity';

export class AdminSessionType {
  user: AdminPanelUser;

  session: AdminPanelUserAccessTokens;

  role: string;

  permissions: string[];
}
