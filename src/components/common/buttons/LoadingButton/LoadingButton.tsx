'use client';

import { ButtonProps } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

interface LoadingButtonProps extends Omit<ButtonProps, 'color'> {
  isLoading: boolean;
  label: string;
  onClick?: (data?: any) => void;
}

const LoadingButton = ({
  isLoading,
  label,
  sx,
  type,
  onClick,
  variant,
  ...buttonProps
}: LoadingButtonProps) => {
  return (
    <Button
      {...buttonProps}
      fullWidth
      variant={variant ? variant : 'contained'}
      sx={{ ...sx, color: 'common.white', fontWeight: 800 }}
      type={type ? type : 'submit'}
      onClick={onClick}
    >
      {isLoading ? <CircularProgress color="inherit" size={24} /> : label}
    </Button>
  );
};

export default LoadingButton;
