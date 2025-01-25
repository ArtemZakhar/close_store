import { UserRole, UserType } from './userType';

export type UsersDataType = {
  [key in UserRole]?: { users: UserType[]; canInvite: boolean };
};
