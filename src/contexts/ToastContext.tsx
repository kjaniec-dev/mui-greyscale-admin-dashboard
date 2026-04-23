import { useState, useCallback, type ReactNode } from 'react';
import { Snackbar, Alert, type AlertColor, Slide, type SlideProps } from '@mui/material';
import { ToastContext, type ToastOptions } from './toast-context';

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
}

interface ToastProviderProps {
    children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<AlertColor>('success');
    const [duration, setDuration] = useState(4000);

    const showToast = useCallback(({ message, severity = 'success', duration = 4000 }: ToastOptions) => {
        setMessage(message);
        setSeverity(severity);
        setDuration(duration);
        setOpen(true);
    }, []);

    const success = useCallback((message: string) => {
        showToast({ message, severity: 'success' });
    }, [showToast]);

    const error = useCallback((message: string) => {
        showToast({ message, severity: 'error', duration: 6000 });
    }, [showToast]);

    const warning = useCallback((message: string) => {
        showToast({ message, severity: 'warning' });
    }, [showToast]);

    const info = useCallback((message: string) => {
        showToast({ message, severity: 'info' });
    }, [showToast]);

    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <ToastContext.Provider value={{ showToast, success, error, warning, info }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={duration}
                onClose={handleClose}
                slots={{ transition: SlideTransition }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    variant="filled"
                    sx={{
                        width: '100%',
                        minWidth: 300,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        '& .MuiAlert-message': {
                            fontWeight: 500,
                        },
                    }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </ToastContext.Provider>
    );
}
