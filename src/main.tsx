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

// Fix: MUI applies aria-hidden="true" to #root when a Modal/Dialog/Drawer opens.
// In React concurrent mode the focus move into the modal is deferred, so the browser
// blocks the aria-hidden write (and logs a warning) if a descendant still has focus.
// Intercepting setAttribute lets us proactively blur that element first, ensuring the
// attribute always lands before focus management catches up.
(function patchAriaHiddenFocusBlur() {
    const origSetAttribute = Element.prototype.setAttribute;
    Element.prototype.setAttribute = function (name: string, value: string) {
        if (name === 'aria-hidden' && value === 'true') {
            const focused = this.querySelector<HTMLElement>(':focus');
            if (focused) {
                focused.blur();
            }
        }
        origSetAttribute.call(this, name, value);
    };
})();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
