import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// Filter out the expected Emotion warning caused by MUI DataGrid's internal styles
if (import.meta.env.DEV) {
    const originalConsoleError = console.error;
    console.error = (...args) => {
        if (typeof args[0] === 'string' && args[0].includes('The pseudo class ":first-child" is potentially unsafe when doing server-side rendering')) {
            return;
        }
        originalConsoleError(...args);
    };
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
