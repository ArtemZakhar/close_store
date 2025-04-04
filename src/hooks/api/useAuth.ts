import { routePaths } from '@/constants/routePaths';
import {
  forgotPassword,
  login,
  newPassword,
} from '@/services/apiServices/authService';
import { finishRegistration } from '@/services/apiServices/userService';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) => login(data),
    onSuccess: () => {
      window.location.href = routePaths.users;
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => forgotPassword(email),
  });
};

export const useFinishRegistration = () => {
  return useMutation({
    mutationFn: (data: { data: { password: string; token: string } }) =>
      finishRegistration(data),
    onSuccess: () => {
      window.location.href = routePaths.login;
    },
  });
};

export const useNewPassword = () => {
  return useMutation({
    mutationFn: (data: { password: string; token: string }) =>
      newPassword(data),
    onSuccess: () => {
      window.location.href = routePaths.login;
    },
  });
};
