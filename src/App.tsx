import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './theme';
import { ToastProvider } from './contexts';
import { router } from './routes';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
