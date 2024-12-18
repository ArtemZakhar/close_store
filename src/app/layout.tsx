import { getSession } from '@/helpers/getSession';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { Toaster } from 'react-hot-toast';

import type { Metadata } from 'next';

import ReactQueryProvider from '@/utils/providers/ReactQueryProvider';

import Navigation from '@/components/layout/Navigation';

import globalStyles from '@/styles/globalStyles';
import theme from '@/styles/theme';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export const metadata: Metadata = {
  title: 'Shop store',
  description: 'This is the private shop store',
  robots: 'noindex,nofollow',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="uk">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <ReactQueryProvider>
              <Navigation role={session?.role} />
              <Box component="main" sx={{ minHeight: '90vh' }}>
                <Toaster position="top-center" />
                <CssBaseline />
                {globalStyles}
                {children}
              </Box>
            </ReactQueryProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
