import { UserRole } from '@/types/users/userType';

export const showUserRole = (role: UserRole) => {
  if (role === UserRole.admin) {
    return 'Aдміністратор';
  }

  if (role === UserRole.owner) {
    return 'Власник';
  }

  if (role === UserRole.seller) {
    return 'Продавець';
  }

  if (role === UserRole.buyer) {
    return 'Покупець';
  }
};

export const showInviteUserRole = (role: Partial<UserRole>) => {
  if (role === UserRole.admin) {
    return 'адміністраторa';
  }

  if (role === UserRole.owner) {
    return 'власника';
  }

  if (role === UserRole.seller) {
    return 'продавця';
  }
};
