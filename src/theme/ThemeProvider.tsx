import { useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import { ThemeContext, type ThemeMode } from './themeContext';

interface ThemeProviderProps {
    children: ReactNode;
    defaultMode?: ThemeMode;
}

export function ThemeProvider({ children, defaultMode = 'light' }: ThemeProviderProps) {
    const [mode, setMode] = useState<ThemeMode>(() => {
        const saved = localStorage.getItem('theme-mode');
        return (saved as ThemeMode) || defaultMode;
    });

    const toggleTheme = () => {
        setMode((prev) => {
            const newMode = prev === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme-mode', newMode);
            return newMode;
        });
    };

    const handleSetMode = (newMode: ThemeMode) => {
        setMode(newMode);
        localStorage.setItem('theme-mode', newMode);
    };

    const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

    const value = useMemo(
        () => ({
            mode,
            toggleTheme,
            setMode: handleSetMode,
        }),
        [mode]
    );

    return (
        <ThemeContext.Provider value={value}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
}
