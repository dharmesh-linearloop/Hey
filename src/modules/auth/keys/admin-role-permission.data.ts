import { AdminUserRole } from 'src/core/admin-panel-user-core/admin-panel-user-core.enum';

export const Permissions = [
  // User Table
  // >>view/search/sort/column modification/filters/refresh/view user profile
  {
    id: 'admin_user_table_view',
    description: 'admin_user_table_view',
    name: 'admin_user_table_view',
    roles: [
      AdminUserRole.SUPER_ADMIN,
      AdminUserRole.ADMIN_MANAGER,
      AdminUserRole.ADMIN_USER,
      AdminUserRole.ADMIN_GUEST,
    ],
  },
  // >> Export user
  {
    id: 'admin_user_export',
    description: 'admin_user_export',
    name: 'admin_user_export',
    roles: [AdminUserRole.SUPER_ADMIN, AdminUserRole.ADMIN_MANAGER],
  },
  // >> User profile view
  {
    id: 'admin_user_profile_update',
    description: 'admin_user_profile_update',
    name: 'admin_user_profile_update',
    roles: [
      AdminUserRole.SUPER_ADMIN,
      AdminUserRole.ADMIN_MANAGER,
      AdminUserRole.ADMIN_USER,
    ],
  },
  // >> Login into user account
  {
    id: 'admin_user_account_login',
    description: 'admin_user_account_login',
    name: 'admin_user_account_login',
    roles: [
      AdminUserRole.SUPER_ADMIN,
      AdminUserRole.ADMIN_MANAGER,
      AdminUserRole.ADMIN_USER,
    ],
  },
  // >> Delete user
  {
    id: 'admin_user_account_delete',
    description: 'admin_user_account_delete',
    name: 'admin_user_account_delete',
    roles: [AdminUserRole.SUPER_ADMIN, AdminUserRole.ADMIN_MANAGER],
  },
  {
    id: 'admin_user_list',
    description: 'admin_user_list',
    name: 'admin_user_list',
    roles: [
      AdminUserRole.SUPER_ADMIN,
      AdminUserRole.ADMIN_MANAGER,
      AdminUserRole.ADMIN_USER,
      AdminUserRole.ADMIN_GUEST,
    ],
  },

  // Account Table
  // >>view/search/sort/column modification/filters/refresh
  {
    id: 'admin_accounts_table_view',
    description: 'admin_accounts_table_view',
    name: 'admin_accounts_table_view',
    roles: [
      AdminUserRole.SUPER_ADMIN,
      AdminUserRole.ADMIN_MANAGER,
      AdminUserRole.ADMIN_USER,
      AdminUserRole.ADMIN_GUEST,
    ],
  },
  // >>Export account
  {
    id: 'admin_account_export',
    description: 'admin_account_export',
    name: 'admin_account_export',
    roles: [AdminUserRole.SUPER_ADMIN, AdminUserRole.ADMIN_MANAGER],
  },
  // >>View user profile/Login into user account
  {
    id: 'admin_user_profile_view',
    description: 'admin_user_profile_view',
    name: 'admin_user_profile_view',
    roles: [
      AdminUserRole.SUPER_ADMIN,
      AdminUserRole.ADMIN_MANAGER,
      AdminUserRole.ADMIN_USER,
    ],
  },
  // >>Login into user account
  {
    id: 'admin_account_login',
    description: 'admin_account_login',
    name: 'admin_account_login',
    roles: [
      AdminUserRole.SUPER_ADMIN,
      AdminUserRole.ADMIN_MANAGER,
      AdminUserRole.ADMIN_USER,
    ],
  },
  // >>Delete/suspend user account
  {
    id: 'admin_account_delete',
    description: 'admin_account_delete',
    name: 'admin_account_delete',
    roles: [AdminUserRole.SUPER_ADMIN, AdminUserRole.ADMIN_MANAGER],
  },

  // Email account
  // >>view/search/sort/column modification/filters/refresh/view email info
  {
    id: 'admin_email_table_view',
    description: 'admin_email_table_view',
    name: 'admin_email_table_view',
    roles: [
      AdminUserRole.SUPER_ADMIN,
      AdminUserRole.ADMIN_MANAGER,
      AdminUserRole.ADMIN_USER,
      AdminUserRole.ADMIN_GUEST,
    ],
  },
  // >> Exports email
  {
    id: 'admin_email_export',
    description: 'admin_email_export',
    name: 'admin_email_export',
    roles: [AdminUserRole.SUPER_ADMIN, AdminUserRole.ADMIN_MANAGER],
  },
  // update/create watch/stop watch
  {
    id: 'admin_email_update',
    description: 'admin_email_update',
    name: 'admin_email_update',
    roles: [
      AdminUserRole.SUPER_ADMIN,
      AdminUserRole.ADMIN_MANAGER,
      AdminUserRole.ADMIN_USER,
    ],
  },

  // Log view
  {
    id: 'admin_log_table_view',
    description: 'admin_log_table_view',
    name: 'admin_log_table_view',
    roles: [
      AdminUserRole.SUPER_ADMIN,
      AdminUserRole.ADMIN_MANAGER,
      AdminUserRole.ADMIN_USER,
      AdminUserRole.ADMIN_GUEST,
    ],
  },

  // Blaclist view
  // >> view/sort/search
  {
    id: 'admin_blacklist_table_view',
    description: 'admin_blacklist_table_view',
    name: 'admin_blacklist_table_view',
    roles: [
      AdminUserRole.SUPER_ADMIN,
      AdminUserRole.ADMIN_MANAGER,
      AdminUserRole.ADMIN_USER,
      AdminUserRole.ADMIN_GUEST,
    ],
  },
  // >>Add/Remove
  {
    id: 'admin_blacklist_update',
    description: 'admin_blacklist_update',
    name: 'admin_blacklist_update',
    roles: [
      AdminUserRole.SUPER_ADMIN,
      AdminUserRole.ADMIN_MANAGER,
      AdminUserRole.ADMIN_USER,
    ],
  },

  // Account profile view
  // >>view info/view plan/view memebers/Intercome link/Profitwell link/stripe/view note
  {
    id: 'admin_account_profile_view',
    description: 'admin_account_profile_view',
    name: 'admin_account_profile_view',
    roles: [
      AdminUserRole.SUPER_ADMIN,
      AdminUserRole.ADMIN_MANAGER,
      AdminUserRole.ADMIN_USER,
      AdminUserRole.ADMIN_GUEST,
    ],
  },
  // update sales owner/success owner/add remove credit
  {
    id: 'admin_account_profile_update',
    description: 'admin_account_profile_update',
    name: 'admin_account_profile_update',
    roles: [AdminUserRole.SUPER_ADMIN, AdminUserRole.ADMIN_MANAGER],
  },
  // >>Delete/suspend user
  {
    id: 'admin_account_user_update',
    description: 'admin_account_profile_user_update',
    name: 'admin_account_profile_user_update',
    roles: [
      AdminUserRole.SUPER_ADMIN,
      AdminUserRole.ADMIN_MANAGER,
      AdminUserRole.ADMIN_USER,
    ],
  },
  // view note
  {
    id: 'admin_account_note_view',
    description: 'admin_account_note_view',
    name: 'admin_account_note_view',
    roles: [
      AdminUserRole.SUPER_ADMIN,
      AdminUserRole.ADMIN_MANAGER,
      AdminUserRole.ADMIN_USER,
      AdminUserRole.ADMIN_GUEST,
    ],
  },
  // >>Pin a note/ add a note
  {
    id: 'admin_account_notes_update',
    description: 'admin_account_notes_update',
    name: 'admin_account_notes_update',
    roles: [
      AdminUserRole.SUPER_ADMIN,
      AdminUserRole.ADMIN_MANAGER,
      AdminUserRole.ADMIN_USER,
    ],
  },
  {
    id: 'admin_account_notes_delete',
    description: 'admin_account_notes_delete',
    name: 'admin_account_notes_delete',
    roles: [AdminUserRole.SUPER_ADMIN, AdminUserRole.ADMIN_MANAGER],
  },

  // Session Data
  {
    id: 'admin_session_data_view',
    description: 'admin_session_data_view',
    name: 'admin_session_data_view',
    roles: [AdminUserRole.SUPER_ADMIN, AdminUserRole.ADMIN_MANAGER],
  },

  // Admin User create
  {
    id: 'admin_panel_user_list',
    description: 'admin_panel_user_list',
    name: 'admin_panel_user_list',
    roles: [AdminUserRole.SUPER_ADMIN],
  },
  {
    id: 'admin_panel_user_create',
    description: 'admin_panel_user_create',
    name: 'admin_panel_user_create',
    roles: [AdminUserRole.SUPER_ADMIN],
  },
  {
    id: 'admin_panel_user_update',
    description: 'admin_panel_user_update',
    name: 'admin_panel_user_update',
    roles: [AdminUserRole.SUPER_ADMIN],
  },
  {
    id: 'admin_panel_user_status_update',
    description: 'admin_panel_user_status_update',
    name: 'admin_panel_user_status_update',
    roles: [AdminUserRole.SUPER_ADMIN],
  },
  {
    id: 'admin_panel_user_update_token',
    description: 'admin_panel_user_update_token',
    name: 'admin_panel_user_update_token',
    roles: [AdminUserRole.SUPER_ADMIN],
  },

  // Plan module
  {
    id: 'admin_plan_list_view',
    description: 'admin_plan_list_view',
    name: 'admin_plan_list_view',
    roles: [
      AdminUserRole.SUPER_ADMIN,
      AdminUserRole.ADMIN_MANAGER,
      AdminUserRole.ADMIN_USER,
    ],
  },
  {
    id: 'admin_plan_create',
    description: 'admin_plan_create',
    name: 'admin_plan_create',
    roles: [AdminUserRole.SUPER_ADMIN, AdminUserRole.ADMIN_MANAGER],
  },
  {
    id: 'admin_plan_update',
    description: 'admin_plan_update',
    name: 'admin_plan_update',
    roles: [AdminUserRole.SUPER_ADMIN, AdminUserRole.ADMIN_MANAGER],
  },

  // Tag module
  {
    id: 'admin_panel_tags_create',
    description: 'admin_panel_tags_create',
    name: 'admin_panel_tags_create',
    roles: [AdminUserRole.SUPER_ADMIN],
  },
  {
    id: 'admin_panel_tags_delete',
    description: 'admin_panel_tags_delete',
    name: 'admin_panel_tags_delete',
    roles: [AdminUserRole.SUPER_ADMIN],
  },
  {
    id: 'admin_panel_tags_list_view',
    description: 'admin_panel_tags_list_view',
    name: 'admin_panel_tags_list_view',
    roles: [
      AdminUserRole.SUPER_ADMIN,
      AdminUserRole.ADMIN_MANAGER,
      AdminUserRole.ADMIN_USER,
    ],
  },
  {
    id: 'admin_panel_tags_assign_account',
    description: 'admin_panel_tags_assign_account',
    name: 'admin_panel_tags_assign_account',
    roles: [
      AdminUserRole.SUPER_ADMIN,
      AdminUserRole.ADMIN_MANAGER,
      AdminUserRole.ADMIN_USER,
    ],
  },
  {
    id: 'admin_panel_tags_remove_account',
    description: 'admin_panel_tags_remove_account',
    name: 'admin_panel_tags_remove_account',
    roles: [
      AdminUserRole.SUPER_ADMIN,
      AdminUserRole.ADMIN_MANAGER,
      AdminUserRole.ADMIN_USER,
    ],
  },
  {
    id: 'admin_panel_tags_assign_account_view',
    description: 'admin_panel_tags_remove_account_view',
    name: 'admin_panel_tags_remove_account_view',
    roles: [
      AdminUserRole.SUPER_ADMIN,
      AdminUserRole.ADMIN_MANAGER,
      AdminUserRole.ADMIN_USER,
      AdminUserRole.ADMIN_GUEST,
    ],
  },

  // Bulk Assign module (sales owner/success owner/tags)
  {
    id: 'admin_panel_bulk_tags_assign_bulk_account',
    description: 'admin_panel_bulk_tags_assign_bulk_account',
    name: 'admin_panel_bulk_tags_assign_bulk_account',
    roles: [
      AdminUserRole.SUPER_ADMIN,
      AdminUserRole.ADMIN_MANAGER,
      AdminUserRole.ADMIN_USER,
    ],
  },
  {
    id: 'admin_panel_bulk_user_assignees_to_account',
    description: 'admin_panel_bulk_user_assignees_to_account',
    name: 'admin_panel_bulk_user_assignees_to_account',
    roles: [AdminUserRole.SUPER_ADMIN],
  },

  // >> Agency user
  {
    id: 'agency_user_account_login',
    description: 'agency_user_account_login',
    name: 'agency_user_account_login',
    roles: [
      AdminUserRole.SUPER_ADMIN,
      AdminUserRole.ADMIN_MANAGER,
      AdminUserRole.ADMIN_USER,
    ],
  },
  {
    id: 'agency_user_list_view',
    description: 'agency_user_list_view',
    name: 'agency_user_list_view',
    roles: [
      AdminUserRole.SUPER_ADMIN,
      AdminUserRole.ADMIN_MANAGER,
      AdminUserRole.ADMIN_USER,
    ],
  },
];

export const DefaultSuperAdminPermissions = Permissions.filter((p) =>
  p.roles.includes(AdminUserRole.SUPER_ADMIN),
).map((p) => p.id);

export const findRoleByPermission = (permission: string[]): AdminUserRole[] => {
  const foundRoles: AdminUserRole[] = [];
  permission.forEach((p) => {
    const foundRole = Permissions.find((_p) => _p.id === p);
    if (foundRole) {
      foundRoles.push(...foundRole.roles);
    }
  });
  return foundRoles;
};

export const findPermissionByRole = (role) => {
  const foundPermission = Permissions.filter((permissions) =>
    permissions.roles.includes(role),
  );
  return foundPermission ? (foundPermission || []).map((p) => p.id) : [];
};
