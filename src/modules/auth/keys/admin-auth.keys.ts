export const AdminAuthMessages = {
  ACCOUNT_DEACTIVATED: 'User is disabled.',
  INVALID_AUTHENTICATION: 'Invalid Authentication.',
  INVALID_EMAIL: 'Invalid email address.',
  INVALID_CREDENTIALS_ERROR: 'Invalid email or password.',
  AUTH_HEADER_NOT_FOUND: 'Authorization header not found.',
  AUTH_HEADER_IS_NOT_BEARER: `Authorization header is not of type 'Bearer'.`,
  INVALID_AUTH_HEADER_BEARER: `Authorization header value has too many parts. It must follow the pattern: 'Bearer xx.yy.zz' where xx.yy.zz is a valid JWT token.`,
  SESSION_NOT_FOUND: 'Session not found.',
  SESSION_ALREADY_EXPIRED: 'Session is already expired.',
  SESSION_EXPIRED: 'Session is expired.',
  USER_NOT_FOUND: 'User not found.',
  DISABLED_MESSAGE: 'User is inactive. Please contact administrator.',
  TOKEN_EXPIRED:
    'Invitation token has been expired. Contact admin to resend the workspace invitation.',
  LOGOUT_SUCCESS: 'Logout successful.',
  ENTER_VALID_OTP: 'Invalid code. Please try again.',
  OTP_IS_EXPIRED: 'OTP has been expired. Please try again.',
  INVALID_INVITATION_TOKEN:
    'It seems you have already accepted/rejected the invitation!',
  UNAUTHORIZED_TOKEN:
    'You are unauthorized to accept/reject the invitation, please log out first and login with correct email address.',
  EMAIL_EXIST: 'Entered email already exist in system.',
  INVALID_TOKEN: 'Invalid token. Please try again.',
  UNAUTHORIZED_USER: 'You are not authorized person for access this portal.',
};

export const jwtAdminConstants = {
  secret: 'adminSecretKey',
  expiresIn: '48h', // 48 Hours
};

export const jwtAdminAsUserConstants = {
  expiresIn: '1h',
};

export const AdminSessionSettings = {
  SESSION_EXPIRATION_PERIOD: '48h', // 48 Hours
};

export const LoginAsUserSettings = {
  SESSION_EXPIRATION_PERIOD: '1h',
};

export enum AdminSessionStatus {
  CURRENT = 'CURRENT',
  EXPIRED = 'EXPIRED',
  LOCKED = 'LOCKED',
}

export const UserSessionMessages = {
  CURRENT_SESSION_EXPIRE: `Admin User's current session can not be expired.`,
  SESSION_SIGNOUT_SUCCESS: `Session signed-out successful.`,
  ALL_SESSIONS_SIGNOUT_SUCCESS: `All sessions signed-out successful.`,
};
