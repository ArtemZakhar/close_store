import { routePaths } from '@/constants/routePaths';
import { UserRole } from '@/types/users/userType';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';

export const roleAccess = {
  [UserRole.admin]: [
    {
      href: routePaths.users,
      label: 'Користувачі',
      icon: PersonOutlineOutlinedIcon,
    },
    {
      href: routePaths.goods,
      label: 'Товари',
      icon: WarehouseOutlinedIcon,
    },
  ],
  [UserRole.owner]: [
    {
      href: routePaths.users,
      label: 'Користувачі',
      icon: PersonOutlineOutlinedIcon,
    },
    {
      href: routePaths.goods,
      label: 'Товари',
      icon: WarehouseOutlinedIcon,
    },
  ],
  [UserRole.seller]: [
    {
      href: routePaths.goods,
      label: 'Товари',
      icon: WarehouseOutlinedIcon,
    },
  ],
  [UserRole.buyer]: [
    {
      href: routePaths.goods,
      label: 'Товари',
      icon: WarehouseOutlinedIcon,
    },
  ],
};

const inviteAccess: { [key in UserRole]?: UserRole[] } = {
  [UserRole.admin]: [UserRole.owner],
  [UserRole.owner]: [UserRole.buyer],
  [UserRole.seller]: [],
  [UserRole.buyer]: [],
};

export const hasAccess = (userRole: UserRole, route: string) => {
  return roleAccess[userRole]?.some((access) => access.href === route) || false;
};

export const canInvite = (role: UserRole, type: UserRole) => {
  return inviteAccess[role]?.includes(type) || false;
};
