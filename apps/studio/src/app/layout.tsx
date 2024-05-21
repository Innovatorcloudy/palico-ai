import { Box } from '@mui/material';
import Sidebar from '../components/layout/sidebar';
import { ThemeProvider } from '@palico-ai/components';
import './global.css';

export const metadata = {
  title: 'Palico Studio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Box
            sx={{
              display: 'flex',
              backgroundColor: 'background.default',
            }}
          >
            <Sidebar />
            <Box
              sx={{
                width: '100%',
                overflow: 'auto',
              }}
            >
              {children}
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}