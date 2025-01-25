import { UserRole, UserType } from '@/types/users/userType';
import { UsersDataType } from '@/types/users/usersData';

import { hasViewRoleAccess } from './roleAccess';

export const showUsersByTheRole = (
  allUsers: UserType[],
  role: UserRole,
): UsersDataType | null => {
  if (role === UserRole.buyer || role === UserRole.seller) {
    return null;
  }

  if (role === UserRole.admin) {
    const tabs = hasViewRoleAccess(role);

    return (
      allUsers.reduce((acc, elem) => {
        if (elem.role === UserRole.admin) {
          acc?.admin?.users.push(elem);
        }

        if (elem.role === UserRole.owner) {
          acc?.owner?.users.push(elem);
        }

        if (elem.role === UserRole.seller) {
          acc?.seller?.users.push(elem);
        }

        if (elem.role === UserRole.buyer) {
          acc?.buyer?.users.push(elem);
        }

        return acc;
      }, tabs) || null
    );
  }

  const tabs = hasViewRoleAccess(role);

  return (
    allUsers.reduce((acc, elem) => {
      if (elem.role === UserRole.seller) {
        acc?.seller?.users.push(elem);
      }

      if (elem.role === UserRole.buyer) {
        acc?.buyer?.users.push(elem);
      }

      return acc;
    }, tabs) || null
  );
};
