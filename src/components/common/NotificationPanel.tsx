import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    IconButton,
    Popover,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Button,
    Divider,
    Badge,
    useTheme,
    alpha,
} from '@mui/material';
import {
    ShoppingCart as OrderIcon,
    Person as UserIcon,
    Settings as SystemIcon,
    Email as MessageIcon,
    Payment as PaymentIcon,
    DoneAll as MarkReadIcon,
    Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { mockNotifications, getUnreadCount, type Notification, type NotificationType } from '../../data/mockNotifications';
import { notificationTypeColors } from '../../theme';

function getNotificationIcon(type: NotificationType) {
    switch (type) {
        case 'order':
            return <OrderIcon />;
        case 'user':
            return <UserIcon />;
        case 'system':
            return <SystemIcon />;
        case 'message':
            return <MessageIcon />;
        case 'payment':
            return <PaymentIcon />;
        default:
            return <NotificationsIcon />;
    }
}

function getNotificationColor(type: NotificationType, isDarkMode: boolean): string {
    const colors = notificationTypeColors[type] || notificationTypeColors.system;
    return isDarkMode ? colors.dark : colors.light;
}

function formatTimeAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays}d ago`;
}

export function NotificationPanel() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [notifications, setNotifications] = useState(mockNotifications);

    const unreadCount = getUnreadCount(notifications);
    const open = Boolean(anchorEl);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleViewAll = () => {
        handleClose();
        navigate('/notifications');
    };

    const handleMarkAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const handleNotificationClick = (notification: Notification) => {
        // Mark as read
        setNotifications(notifications.map(n =>
            n.id === notification.id ? { ...n, read: true } : n
        ));
        // Navigate if link exists
        if (notification.link) {
            window.location.href = notification.link;
        }
        handleClose();
    };

    return (
        <>
            <IconButton onClick={handleOpen} sx={{ color: 'text.primary' }}>
                <Badge badgeContent={unreadCount} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        width: 380,
                        maxHeight: 480,
                        mt: 1,
                        borderRadius: 2,
                        boxShadow: isDarkMode
                            ? '0 8px 32px rgba(0,0,0,0.4)'
                            : '0 8px 32px rgba(0,0,0,0.12)',
                    },
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        p: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                            Notifications
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            You have {unreadCount} unread messages
                        </Typography>
                    </Box>
                    {unreadCount > 0 && (
                        <Button
                            size="small"
                            startIcon={<MarkReadIcon />}
                            onClick={handleMarkAllRead}
                            sx={{ textTransform: 'none' }}
                        >
                            Mark all read
                        </Button>
                    )}
                </Box>

                {/* Notification List */}
                <List sx={{ p: 0, maxHeight: 340, overflow: 'auto' }}>
                    {notifications.map((notification, index) => (
                        <Box key={notification.id}>
                            <ListItem
                                component="div"
                                onClick={() => handleNotificationClick(notification)}
                                sx={{
                                    py: 1.5,
                                    px: 2,
                                    cursor: 'pointer',
                                    bgcolor: notification.read
                                        ? 'transparent'
                                        : alpha(theme.palette.primary.main, isDarkMode ? 0.08 : 0.04),
                                    '&:hover': {
                                        bgcolor: isDarkMode
                                            ? alpha('#fff', 0.04)
                                            : alpha('#000', 0.04),
                                    },
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        sx={{
                                            bgcolor: alpha(getNotificationColor(notification.type, isDarkMode), 0.15),
                                            color: getNotificationColor(notification.type, isDarkMode),
                                            width: 40,
                                            height: 40,
                                        }}
                                    >
                                        {getNotificationIcon(notification.type)}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography
                                                variant="body2"
                                                fontWeight={notification.read ? 400 : 600}
                                                sx={{ flex: 1 }}
                                            >
                                                {notification.title}
                                            </Typography>
                                            {!notification.read && (
                                                <Box
                                                    sx={{
                                                        width: 8,
                                                        height: 8,
                                                        borderRadius: '50%',
                                                        bgcolor: 'primary.main',
                                                        flexShrink: 0,
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    }
                                    secondary={
                                        <Box>
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                                sx={{
                                                    display: 'block',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                {notification.description}
                                            </Typography>
                                            <Typography variant="caption" color="text.disabled">
                                                {formatTimeAgo(notification.timestamp)}
                                            </Typography>
                                        </Box>
                                    }
                                />
                            </ListItem>
                            {index < notifications.length - 1 && (
                                <Divider component="li" sx={{ mx: 2 }} />
                            )}
                        </Box>
                    ))}
                </List>

                {/* Footer */}
                <Divider />
                <Box sx={{ p: 1.5, textAlign: 'center' }}>
                    <Button
                        size="small"
                        sx={{ textTransform: 'none' }}
                        onClick={handleViewAll}
                    >
                        View all notifications
                    </Button>
                </Box>
            </Popover>
        </>
    );
}
