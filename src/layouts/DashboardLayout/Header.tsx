import {
    AppBar,
    Toolbar,
    IconButton,
    InputBase,
    Avatar,
    Box,
    Tooltip,
    Menu,
    MenuItem,
    Typography,
    Divider,
    alpha,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Search as SearchIcon,
    DarkMode as DarkModeIcon,
    LightMode as LightModeIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    Person as PersonIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { useThemeMode, neutral } from '../../theme';
import { NotificationPanel } from '../../components/common';
import { COLLAPSED_WIDTH, DRAWER_WIDTH } from './layoutConstants';

interface HeaderProps {
    onMenuClick: () => void;
    sidebarCollapsed: boolean;
    isMobile: boolean;
}

export function Header({ onMenuClick, sidebarCollapsed, isMobile }: HeaderProps) {
    const { mode, toggleTheme } = useThemeMode();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const sidebarWidth = isMobile ? 0 : sidebarCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH;

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                width: `calc(100% - ${sidebarWidth}px)`,
                ml: `${sidebarWidth}px`,
                bgcolor: (theme) => alpha(theme.palette.background.default, 0.8),
                backdropFilter: 'blur(8px)',
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                transition: (theme) =>
                    theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {/* Left side */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {isMobile && (
                        <IconButton edge="start" color="inherit" onClick={onMenuClick}>
                            <MenuIcon sx={{ color: 'text.primary' }} />
                        </IconButton>
                    )}

                    {/* Search */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            bgcolor: 'action.hover',
                            borderRadius: 2,
                            px: 2,
                            py: 0.5,
                            minWidth: { xs: 180, md: 280 },
                        }}
                    >
                        <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
                        <InputBase
                            placeholder="Search..."
                            sx={{
                                flex: 1,
                                '& input': {
                                    fontSize: '0.875rem',
                                },
                            }}
                        />
                    </Box>
                </Box>

                {/* Right side */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {/* Theme toggle */}
                    <Tooltip title={mode === 'light' ? 'Dark mode' : 'Light mode'}>
                        <IconButton onClick={toggleTheme} sx={{ color: 'text.primary' }}>
                            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                        </IconButton>
                    </Tooltip>

                    {/* Notifications */}
                    <NotificationPanel />

                    {/* Settings */}
                    <Tooltip title="Settings">
                        <IconButton sx={{ color: 'text.primary' }}>
                            <SettingsIcon />
                        </IconButton>
                    </Tooltip>

                    {/* Profile */}
                    <Tooltip title="Account">
                        <IconButton onClick={handleProfileClick} sx={{ ml: 1 }}>
                            <Avatar
                                sx={{
                                    width: 36,
                                    height: 36,
                                    bgcolor: neutral[800],
                                    color: neutral[50],
                                    fontSize: '0.8rem',
                                    fontWeight: 600,
                                }}
                            >
                                JD
                            </Avatar>
                        </IconButton>
                    </Tooltip>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        onClick={handleClose}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        slotProps={{ paper: {
                            sx: {
                                mt: 1,
                                minWidth: 200,
                                borderRadius: 2,
                                boxShadow: (theme) =>
                                    `0 4px 20px ${alpha(theme.palette.common.black, 0.1)}`,
                            },
                        } }}
                    >
                        <Box sx={{ px: 2, py: 1.5 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                John Doe
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                admin@example.com
                            </Typography>
                        </Box>
                        <Divider />
                        <MenuItem sx={{ py: 1.5 }}>
                            <PersonIcon sx={{ mr: 2, fontSize: 20, color: 'text.secondary' }} />
                            <Typography variant="body2">Profile</Typography>
                        </MenuItem>
                        <MenuItem sx={{ py: 1.5 }}>
                            <SettingsIcon sx={{ mr: 2, fontSize: 20, color: 'text.secondary' }} />
                            <Typography variant="body2">Settings</Typography>
                        </MenuItem>
                        <Divider />
                        <MenuItem sx={{ py: 1.5, color: 'error.main' }}>
                            <LogoutIcon sx={{ mr: 2, fontSize: 20 }} />
                            <Typography variant="body2">Logout</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
