'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import React, { ErrorInfo } from 'react';

import { styles } from './ErrorBoundary.styles';

type Props = {
  children: React.ReactNode;
  height?: string;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('ErrorBoundary caught an error: ', { error, errorInfo });
  }
  render() {
    if (this.state.hasError) {
      return (
        <Box sx={styles.container(this.props.height)}>
          <Typography variant="h2" align="center">
            Ой, трапилась помилочка 🙁
          </Typography>

          <Button
            type="button"
            sx={styles.button}
            variant="contained"
            onClick={() => this.setState({ hasError: false })}
          >
            Спробуємо ще раз?
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
