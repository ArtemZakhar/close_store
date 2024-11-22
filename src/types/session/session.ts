import { UserRole } from '../users/userType';

export type SessionType = {
  id: string;
  role: UserRole;
  expires: string;
  iat: number;
  exp: number;
};
