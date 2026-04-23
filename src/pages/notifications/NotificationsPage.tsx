import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Button,
    Divider,
    Chip,
    IconButton,
    Tabs,
    Tab,
    useTheme,
    alpha,
} from '@mui/material';
import {
    ShoppingCart as OrderIcon,
    Person as UserIcon,
    Settings as SystemIcon,
    Email as MessageIcon,
    Payment as PaymentIcon,
    Notifications as NotificationsIcon,
    DoneAll as MarkReadIcon,
    Delete as DeleteIcon,
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
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
}

export function NotificationsPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState(mockNotifications);
    const [tab, setTab] = useState(0);

    const unreadCount = getUnreadCount(notifications);

    const filteredNotifications = tab === 0
        ? notifications
        : tab === 1
            ? notifications.filter(n => !n.read)
            : notifications.filter(n => n.read);

    const handleMarkAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const handleMarkAsRead = (id: string) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const handleDelete = (id: string) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const handleNotificationClick = (notification: Notification) => {
        handleMarkAsRead(notification.id);
        if (notification.link) {
            navigate(notification.link);
        }
    };

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                        Notifications
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage your notifications and stay updated
                    </Typography>
                </Box>
                {unreadCount > 0 && (
                    <Button
                        variant="outlined"
                        startIcon={<MarkReadIcon />}
                        onClick={handleMarkAllRead}
                        sx={{ textTransform: 'none' }}
                    >
                        Mark all as read
                    </Button>
                )}
            </Box>

            {/* Tabs */}
            <Paper sx={{ mb: 3 }}>
                <Tabs
                    value={tab}
                    onChange={(_, v) => setTab(v)}
                    sx={{
                        px: 2,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    <Tab
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                All
                                <Chip label={notifications.length} size="small" sx={{ height: 20 }} />
                            </Box>
                        }
                    />
                    <Tab
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                Unread
                                {unreadCount > 0 && (
                                    <Chip label={unreadCount} size="small" color="error" sx={{ height: 20 }} />
                                )}
                            </Box>
                        }
                    />
                    <Tab label="Read" />
                </Tabs>

                {/* Notification List */}
                <List sx={{ p: 0 }}>
                    {filteredNotifications.length === 0 ? (
                        <Box sx={{ py: 6, textAlign: 'center' }}>
                            <NotificationsIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                            <Typography color="text.secondary">
                                No notifications to show
                            </Typography>
                        </Box>
                    ) : (
                        filteredNotifications.map((notification, index) => (
                            <Box key={notification.id}>
                                <ListItem
                                    sx={{
                                        py: 2,
                                        px: 3,
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
                                    secondaryAction={
                                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                                            {!notification.read && (
                                                <IconButton
                                                    size="small"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleMarkAsRead(notification.id);
                                                    }}
                                                >
                                                    <MarkReadIcon fontSize="small" />
                                                </IconButton>
                                            )}
                                            <IconButton
                                                size="small"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(notification.id);
                                                }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    }
                                    onClick={() => handleNotificationClick(notification)}
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            sx={{
                                                bgcolor: alpha(getNotificationColor(notification.type, isDarkMode), 0.15),
                                                color: getNotificationColor(notification.type, isDarkMode),
                                                width: 48,
                                                height: 48,
                                            }}
                                        >
                                            {getNotificationIcon(notification.type)}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography
                                                    variant="body1" sx={{ fontWeight: notification.read ? 400 : 600 }}
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
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        }
                                        secondary={
                                            <Box>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                    {notification.description}
                                                </Typography>
                                                <Typography variant="caption" color="text.disabled">
                                                    {formatTimeAgo(notification.timestamp)}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                </ListItem>
                                {index < filteredNotifications.length - 1 && <Divider />}
                            </Box>
                        ))
                    )}
                </List>
            </Paper>
        </Box>
    );
}
