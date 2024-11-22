import { User, UserRole } from './userType';

export type UsersDataType = {
  [key in UserRole]?: { users: User[]; canInvite: boolean };
};
