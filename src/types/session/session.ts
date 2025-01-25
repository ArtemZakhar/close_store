import { UserRole } from '../users/userType';

export type SessionType = {
  id: string;
  role: UserRole;
  owner: string | null;
  expires: string;
  iat: number;
  exp: number;
};
