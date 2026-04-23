import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './theme';
import { ToastProvider } from './contexts';
import { router } from './routes';
import { Box, CircularProgress } from '@mui/material';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <RouterProvider 
          router={router} 
          fallbackElement={
            <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          } 
        />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
