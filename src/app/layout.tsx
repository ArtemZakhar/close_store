import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { Toaster } from 'react-hot-toast';

import type { Metadata } from 'next';

import globalStyles from '@/styles/globalStyles';
import theme from '@/styles/theme';

export const metadata: Metadata = {
  title: 'Shop store',
  description: 'This is the private shop store',
  robots: 'noindex,nofollow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Box component="main" sx={{ minHeight: '90vh' }}>
              <Toaster position="top-center" />
              <CssBaseline />
              {globalStyles}
              {children}
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
