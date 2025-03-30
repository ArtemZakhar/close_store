import { routePaths } from '@/constants/routePaths';
import { UserRole, UserType } from '@/types/users/userType';
import { UsersDataType } from '@/types/users/usersData';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';

export const canInvite = (role: UserRole, type: UserRole) => {
  return inviteAccess[role]?.includes(type) || false;
};

export const canDelete = (role: UserRole, type: UserRole) => {
  return deleteAccess[role]?.includes(type) || false;
};

export const roleAccess = {
  [UserRole.admin]: [
    {
      href: routePaths.users,
      label: 'Користувачі',
      icon: PersonOutlineOutlinedIcon,
    },
  ],
  [UserRole.owner]: [
    {
      href: routePaths.users,
      label: 'Користувачі',
      icon: PersonOutlineOutlinedIcon,
    },
    {
      href: routePaths.goods.root,
      label: 'Товари',
      icon: WarehouseOutlinedIcon,
    },
    {
      href: routePaths.sold,
      label: 'Продажі',
      icon: LocalMallIcon,
    },
  ],
  [UserRole.seller]: [
    {
      href: routePaths.goods.root,
      label: 'Товари',
      icon: WarehouseOutlinedIcon,
    },
  ],
  [UserRole.buyer]: [
    {
      href: routePaths.goods.root,
      label: 'Товари',
      icon: WarehouseOutlinedIcon,
    },
  ],
};

const inviteAccess: { [key in UserRole]?: UserRole[] } = {
  [UserRole.admin]: [UserRole.admin, UserRole.owner],
  [UserRole.owner]: [UserRole.seller],
  [UserRole.seller]: [],
  [UserRole.buyer]: [],
};

const deleteAccess: { [key in UserRole]?: UserRole[] } = {
  [UserRole.admin]: [UserRole.admin, UserRole.owner],
  [UserRole.owner]: [UserRole.seller, UserRole.buyer],
  [UserRole.seller]: [],
  [UserRole.buyer]: [],
};

const roleViewAccess: {
  [key in UserRole]?: UsersDataType;
} = {
  [UserRole.admin]: {
    [UserRole.admin]: {
      users: [],
      canInvite: canInvite(UserRole.admin, UserRole.admin),
    },
    [UserRole.owner]: {
      users: [],
      canInvite: canInvite(UserRole.admin, UserRole.owner),
    },
    [UserRole.buyer]: {
      users: [],
      canInvite: canInvite(UserRole.admin, UserRole.buyer),
    },
    [UserRole.seller]: {
      users: [],
      canInvite: canInvite(UserRole.admin, UserRole.seller),
    },
  },
  [UserRole.owner]: {
    [UserRole.seller]: {
      users: [],
      canInvite: canInvite(UserRole.owner, UserRole.seller),
    },
    [UserRole.buyer]: {
      users: [],
      canInvite: canInvite(UserRole.admin, UserRole.buyer),
    },
  },
  [UserRole.seller]: {},
  [UserRole.buyer]: {},
};

export const hasAccess = (userRole: UserRole, route: string) => {
  return roleAccess[userRole]?.some((access) => access.href === route) || false;
};

export const hasViewRoleAccess = (userRole: UserRole) =>
  structuredClone(roleViewAccess[userRole]);
