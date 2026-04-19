import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Typography,
    Avatar,
    IconButton,
    Tooltip,
    Divider,
    alpha,
} from '@mui/material';
import {
    ExpandLess,
    ExpandMore,
    ChevronLeft,
    ChevronRight,
} from '@mui/icons-material';
import { navConfig } from './navConfig';
import type { NavItem, NavSection } from './navConfig';
import { getSidebarNavigationTarget } from './sidebarNavigation';
import { neutral } from '../../theme';
import { COLLAPSED_WIDTH, DRAWER_WIDTH } from './layoutConstants';

interface SidebarProps {
    open: boolean;
    collapsed: boolean;
    onToggleCollapse: () => void;
    onClose?: () => void;
    variant?: 'permanent' | 'temporary';
}

export function Sidebar({
    open,
    collapsed,
    onToggleCollapse,
    onClose,
    variant = 'permanent',
}: SidebarProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

    const handleToggleSection = (path: string) => {
        setOpenSections((prev) => ({
            ...prev,
            [path]: !prev[path],
        }));
    };

    const handleNavigate = (path: string) => {
        navigate(path);
        if (variant === 'temporary' && onClose) {
            onClose();
        }
    };

    const isActive = (path: string) => location.pathname === path;
    const isParentActive = (item: NavItem) =>
        item.children?.some((child) => location.pathname === child.path) ||
        location.pathname === item.path;

    const renderNavItem = (item: NavItem, depth: number = 0) => {
        const hasChildren = item.children && item.children.length > 0;
        const isOpen = openSections[item.path] ?? isParentActive(item);
        const active = isActive(item.path);
        const Icon = item.icon;
        const navigationTarget = getSidebarNavigationTarget(item, collapsed);

        return (
            <Box key={item.path}>
                <ListItemButton
                    onClick={() => {
                        if (hasChildren && !collapsed) {
                            handleToggleSection(item.path);
                            return;
                        }

                        handleNavigate(navigationTarget);
                    }}
                    sx={{
                        minHeight: 44,
                        borderRadius: 1,
                        mx: collapsed ? 1 : 1.5,
                        mb: 0.5,
                        pl: collapsed ? 2 : 2 + depth * 2,
                        justifyContent: collapsed ? 'center' : 'flex-start',
                        bgcolor: active ? (theme) => alpha(theme.palette.primary.main, 0.08) : 'transparent',
                        color: active ? 'primary.main' : 'text.secondary',
                        '&:hover': {
                            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                        },
                    }}
                >
                    {Icon && (
                        <ListItemIcon
                            sx={{
                                minWidth: collapsed ? 0 : 40,
                                color: active || isParentActive(item) ? 'primary.main' : 'text.secondary',
                                justifyContent: 'center',
                            }}
                        >
                            <Icon fontSize="small" />
                        </ListItemIcon>
                    )}
                    {!collapsed && (
                        <>
                            <ListItemText
                                primary={item.title}
                                primaryTypographyProps={{
                                    variant: 'body2',
                                    fontWeight: active ? 600 : 400,
                                }}
                            />
                            {hasChildren && (isOpen ? <ExpandLess /> : <ExpandMore />)}
                        </>
                    )}
                </ListItemButton>
                {hasChildren && !collapsed && (
                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {item.children?.map((child) => renderNavItem(child, depth + 1))}
                        </List>
                    </Collapse>
                )}
            </Box>
        );
    };

    const renderSection = (section: NavSection) => (
        <Box key={section.title} sx={{ mb: 2 }}>
            {!collapsed && (
                <Typography
                    variant="overline"
                    sx={{
                        px: 3,
                        py: 1,
                        display: 'block',
                        color: 'text.secondary',
                        fontWeight: 700,
                        fontSize: '0.625rem',
                        letterSpacing: '0.1em',
                    }}
                >
                    {section.title}
                </Typography>
            )}
            <List component="nav" disablePadding>
                {section.items.map((item) => renderNavItem(item))}
            </List>
        </Box>
    );

    const drawerContent = (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.paper',
            }}
        >
            {/* Logo / Brand */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: collapsed ? 'center' : 'space-between',
                    px: collapsed ? 1 : 2.5,
                    py: 2,
                    minHeight: 64,
                }}
            >
                {!collapsed && (
                    <Typography variant="h6" fontWeight={700} color="text.primary">
                        Dashboard
                    </Typography>
                )}
                <Tooltip title={collapsed ? 'Expand' : 'Collapse'}>
                    <IconButton onClick={onToggleCollapse} size="small">
                        {collapsed ? <ChevronRight /> : <ChevronLeft />}
                    </IconButton>
                </Tooltip>
            </Box>

            <Divider />

            {/* Navigation */}
            <Box sx={{ flexGrow: 1, overflow: 'auto', py: 2 }}>
                {navConfig.map(renderSection)}
            </Box>

            <Divider />

            {/* User info at bottom */}
            <Box
                sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    justifyContent: collapsed ? 'center' : 'flex-start',
                }}
            >
                <Avatar
                    sx={{
                        width: 40,
                        height: 40,
                        bgcolor: neutral[800],
                        color: neutral[50],
                        fontSize: '0.875rem',
                        fontWeight: 600,
                    }}
                >
                    JD
                </Avatar>
                {!collapsed && (
                    <Box sx={{ minWidth: 0 }}>
                        <Typography variant="body2" fontWeight={600} noWrap>
                            John Doe
                        </Typography>
                        <Typography variant="caption" color="text.secondary" noWrap>
                            admin@example.com
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );

    return (
        <Drawer
            variant={variant}
            open={open}
            onClose={onClose}
            sx={{
                width: collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
                    boxSizing: 'border-box',
                    borderRight: (theme) => `1px solid ${theme.palette.divider}`,
                    transition: (theme) =>
                        theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                },
            }}
        >
            {drawerContent}
        </Drawer>
    );
}
