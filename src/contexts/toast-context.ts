import { createContext, useContext } from 'react';
import type { AlertColor } from '@mui/material';

export interface ToastOptions {
    message: string;
    severity?: AlertColor;
    duration?: number;
}

export interface ToastContextType {
    showToast: (options: ToastOptions) => void;
    success: (message: string) => void;
    error: (message: string) => void;
    warning: (message: string) => void;
    info: (message: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast(): ToastContextType {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
