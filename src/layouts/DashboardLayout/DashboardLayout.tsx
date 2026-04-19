import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { COLLAPSED_WIDTH, DRAWER_WIDTH } from './layoutConstants';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function DashboardLayout() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleToggleCollapse = () => {
        setSidebarCollapsed((prev) => !prev);
    };

    const handleMobileToggle = () => {
        setMobileOpen((prev) => !prev);
    };

    const sidebarWidth = sidebarCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH;

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            {/* Mobile drawer */}
            {isMobile ? (
                mobileOpen ? (
                    <Sidebar
                        open={mobileOpen}
                        collapsed={false}
                        onToggleCollapse={handleMobileToggle}
                        onClose={handleMobileToggle}
                        variant="temporary"
                    />
                ) : null
            ) : (
                /* Desktop sidebar */
                <Sidebar
                    open={true}
                    collapsed={sidebarCollapsed}
                    onToggleCollapse={handleToggleCollapse}
                    variant="permanent"
                />
            )}

            {/* Main content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    width: isMobile ? '100%' : `calc(100% - ${sidebarWidth}px)`,
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                }}
            >
                <Header
                    onMenuClick={handleMobileToggle}
                    sidebarCollapsed={sidebarCollapsed}
                    isMobile={isMobile}
                />

                {/* Page content */}
                <Box
                    sx={{
                        flexGrow: 1,
                        pt: { xs: 8, sm: 9 },
                        pb: 4,
                        px: { xs: 2, sm: 3, md: 4 },
                        bgcolor: 'background.default',
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}
