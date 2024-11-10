'use client';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

interface LoadingButtonProps {
  isLoading: boolean;
  label: string;
  type?: 'button' | 'submit';
  variant?: 'contained' | 'outlined';
  color?:
    | 'primary'
    | 'secondary'
    | 'inherit'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
  sx?: { [key: string]: any };
  onClick?: (data?: any) => void;
}

const LoadingButton = ({
  isLoading,
  type = 'submit',
  variant = 'contained',
  color = 'primary',
  label,
  sx,
  onClick,
}: LoadingButtonProps) => {
  return (
    <Button
      type={type}
      fullWidth
      variant={variant}
      color={color}
      sx={{ ...sx, color: 'common.white', fontWeight: 800 }}
      onClick={onClick}
    >
      {isLoading ? <CircularProgress color="inherit" size={24} /> : label}
    </Button>
  );
};

export default LoadingButton;
