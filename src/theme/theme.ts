import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

// Shadcn Neutral Palette
const neutral = {
  50: '#FAFAFA',
  100: '#F5F5F5',
  200: '#E5E5E5',
  300: '#D4D4D4',
  400: '#A3A3A3',
  500: '#737373',
  600: '#525252',
  700: '#404040',
  800: '#262626',
  900: '#171717',
  950: '#0A0A0A',
};

const baseTheme: ThemeOptions = {
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '0.875rem',
    },
    body1: {
      fontSize: '0.875rem',
    },
    body2: {
      fontSize: '0.75rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 600,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: 'none',
          border: '1px solid',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            fontWeight: 600,
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: 'none',
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: {
      main: neutral[900],
      light: neutral[700],
      dark: neutral[950],
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: neutral[600],
      light: neutral[400],
      dark: neutral[800],
      contrastText: '#FFFFFF',
    },
    background: {
      default: neutral[50],
      paper: '#FFFFFF',
    },
    text: {
      primary: neutral[900],
      secondary: neutral[500],
      disabled: neutral[400],
    },
    divider: neutral[200],
    grey: neutral,
    action: {
      active: neutral[600],
      hover: neutral[100],
      selected: neutral[200],
      disabled: neutral[300],
      disabledBackground: neutral[100],
    },
    success: {
      main: neutral[700],
      light: neutral[400],
      dark: neutral[900],
    },
    error: {
      main: neutral[800],
      light: neutral[500],
      dark: neutral[950],
    },
    warning: {
      main: neutral[600],
      light: neutral[400],
      dark: neutral[800],
    },
    info: {
      main: neutral[500],
      light: neutral[300],
      dark: neutral[700],
    },
  },
  components: {
    ...baseTheme.components,
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: 'none',
          border: `1px solid ${neutral[200]}`,
          backgroundColor: '#FFFFFF',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: neutral[50],
      light: neutral[100],
      dark: neutral[200],
      contrastText: neutral[950],
    },
    secondary: {
      main: neutral[400],
      light: neutral[300],
      dark: neutral[500],
      contrastText: neutral[950],
    },
    background: {
      default: neutral[950],
      paper: neutral[900],
    },
    text: {
      primary: neutral[50],
      secondary: neutral[400],
      disabled: neutral[600],
    },
    divider: neutral[800],
    grey: neutral,
    action: {
      active: neutral[400],
      hover: neutral[800],
      selected: neutral[700],
      disabled: neutral[600],
      disabledBackground: neutral[800],
    },
    success: {
      main: neutral[300],
      light: neutral[100],
      dark: neutral[400],
    },
    error: {
      main: neutral[200],
      light: neutral[100],
      dark: neutral[400],
    },
    warning: {
      main: neutral[400],
      light: neutral[200],
      dark: neutral[500],
    },
    info: {
      main: neutral[500],
      light: neutral[300],
      dark: neutral[600],
    },
  },
  components: {
    ...baseTheme.components,
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: 'none',
          border: `1px solid ${neutral[800]}`,
          backgroundColor: neutral[900],
        },
      },
    },
  },
});

export { neutral };
