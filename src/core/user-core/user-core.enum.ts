export enum AdminUserRole {
  SUPER_ADMIN = 'super-admin',
  ADMIN_MANAGER = 'admin-manager',
  ADMIN_USER = 'admin-user',
  ADMIN_GUEST = 'admin-guest',
}

export enum UserRole {
  SHADMIN = 'shAdmin',
  ADMIN = 'admin',
  MEMBER = 'member',
  LTDMEMBER = 'ltd-member',
  LTDADMIN = 'ltd-admin',
  AGENCYUSER = 'agency-user',
  AGENCYOWNER = 'agency-owner',
  AGENCYTEAMLEADER = 'agency-team-leader',
  AGENCYCLIENTUSER = 'agency-client-user',
  AGENCYADMIN = 'agency-admin',
  SUPERADMIN = 'super-admin',
  OWNER = 'owner',
}

export enum TeamSize {
  TEAM_1 = '1-10',
  TEAM_2 = '11-50',
  TEAM_3 = '51-200',
  TEAM_4 = '201-500',
  TEAM_5 = '501-1000',
  TEAM_6 = '1000+',
}

export enum UserDesignation {
  BUSINESS_DEVELOPMENT_REPRESENTATIVE = 'Business Development Representative',
  BUSINESS_DEVELOPMENT_MANAGER = 'Business Development Manager',
  SALES_DEVELOPMENT_REPRESENTATIVE = 'Sales Development Representative',
  SALES_DEVELOPMENT_MANAGER = 'Sales Development Manager',
  ACCOUNT_EXECUTIVE = 'Account Executive',
  SALES_ACCOUNT_MANAGER = 'Sales account manager',
  MARKETING_EXECUTIVE = 'Marketing Executive',
  GROWTH_MANAGER = 'Growth Manager',
  MARKETING_MANAGER = 'Marketing Manager',
  RECRUITER = 'Recruiter',
  CONSULTANT = 'Consultant',
  FOUNDER = 'Founder',
  OTHER = 'Other',
}

export enum UseCase {
  LEAD_GENERATION = 'Lead Generation',
  LEAD_QUALIFICATION = 'Lead Qualification',
  BOOK_MEETING_AND_BUILD_SALES_PIPELINE = 'Book more meetings / Build sales pipeline',
  OUTREACH_CANDIDATE_AND_RECRUITMENT = 'Outreach to candidates / Recruitment',
  PROMOTE_PRODUCT_AND_SERVICE = 'Promote your product & services',
  ONE_TIME_COLD_EMAIL_OUTREACH = 'One time cold email outreach to my list',
  LINK_BUILDING_AND_PR = 'Link Building / PR',
  OTHER = 'Other',
}

export const ConvertToNonLtdRoleMap = {
  [UserRole.LTDADMIN]: UserRole.ADMIN,
  [UserRole.LTDMEMBER]: UserRole.MEMBER,
};

export const ConvertToLtdRoleMap = {
  [UserRole.ADMIN]: UserRole.LTDADMIN,
  [UserRole.MEMBER]: UserRole.LTDMEMBER,
};

export enum EventRecipientType {
  INDIVIDUAL_USER = 1,
  ALL_USERS = 2,
}

export enum ContactableProspect {
  ZERO_TO_2K = '0 - 2k',
  TWO_K_TO_100K = '2k - 40k',
  FORTY_K_TO_100k = '40k - 100k',
  ONE_HUNDRED_k_TO_500k = '100k - 500k',
  FIVE_HUNDRED_K_PLUS = '500k+',
  OTHER = 'Other',
}

export enum PriorColdEmailToolExperience {
  YES = 'Yes, I have',
  NO = 'No, I have not',
  NO_BUT_EMAIL_MARKETING_TOOL = "Not, really, but I've used an email marketing tool",
}
