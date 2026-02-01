import { Box, Container, Paper, Typography, useTheme } from '@mui/material';
import { Outlet, Link } from 'react-router-dom';

export function AuthLayout() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: isDarkMode ? '#0A0A0A' : '#F5F5F5',
                py: 4,
            }}
        >
            <Container maxWidth="sm">
                {/* Logo/Brand */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                        <Typography
                            variant="h4"
                            fontWeight={800}
                            sx={{
                                background: isDarkMode
                                    ? 'linear-gradient(135deg, #FAFAFA 0%, #A3A3A3 100%)'
                                    : 'linear-gradient(135deg, #171717 0%, #525252 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                letterSpacing: '-0.02em',
                            }}
                        >
                            Dashboard
                        </Typography>
                    </Link>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Admin Panel
                    </Typography>
                </Box>

                {/* Auth Card */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        borderRadius: 2,
                        bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                        border: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
                    }}
                >
                    <Outlet />
                </Paper>

                {/* Footer */}
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', textAlign: 'center', mt: 3 }}
                >
                    © 2026 Dashboard. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
}
