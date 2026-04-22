import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Divider,
    Avatar,
    Chip,
    Stack,
    useTheme,
} from '@mui/material';
import {
    Close as CloseIcon,
    Email as EmailIcon,
    CalendarToday as CalendarIcon,
    AccessTime as AccessTimeIcon,
    Badge as BadgeIcon,
} from '@mui/icons-material';
import type { User } from '../../data/mockUsers';
import { getStatusSolid } from '../../theme';
import { DetailInfoRow } from '../common/DetailInfoRow';
import { getInitials, formatDateTime } from '../../utils/formatters';

interface UserDetailDrawerProps {
    open: boolean;
    onClose: () => void;
    user: User | null;
}

export function UserDetailDrawer({ open, onClose, user }: UserDetailDrawerProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    if (!user) return null;

    const statusColors = getStatusSolid(user.status, isDarkMode);
    const iconColor = isDarkMode ? '#A3A3A3' : '#525252';

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: { xs: '100%', sm: 420 },
                    bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                },
            }}
        >
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <Box
                    sx={{
                        p: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
                    }}
                >
                    <Typography variant="h6" fontWeight={700}>
                        User Details
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            color: isDarkMode ? '#A3A3A3' : '#525252',
                            '&:hover': {
                                bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Content */}
                <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
                    {/* User Avatar and Name */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                        <Avatar
                            sx={{
                                width: 80,
                                height: 80,
                                bgcolor: isDarkMode ? '#404040' : '#E5E5E5',
                                color: isDarkMode ? '#E5E5E5' : '#171717',
                                fontSize: '2rem',
                                fontWeight: 600,
                                mb: 2,
                            }}
                        >
                            {getInitials(user.name)}
                        </Avatar>
                        <Typography variant="h5" fontWeight={700} gutterBottom>
                            {user.name}
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                            <Chip
                                label={user.role}
                                size="small"
                                sx={{
                                    bgcolor: isDarkMode ? '#404040' : '#E5E5E5',
                                    color: isDarkMode ? '#E5E5E5' : '#171717',
                                    fontWeight: 500,
                                    borderRadius: 1,
                                }}
                            />
                            <Chip
                                label={user.status}
                                size="small"
                                sx={{
                                    bgcolor: statusColors.bg,
                                    color: statusColors.text,
                                    fontWeight: 500,
                                    borderRadius: 1,
                                }}
                            />
                        </Stack>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Contact Information */}
                    <Box sx={{ mb: 4 }}>
                        <Typography
                            variant="overline"
                            sx={{
                                color: isDarkMode ? '#A3A3A3' : '#737373',
                                fontWeight: 600,
                                letterSpacing: 1,
                                mb: 2,
                                display: 'block',
                            }}
                        >
                            Contact Information
                        </Typography>
                        <Stack spacing={2}>
                            <DetailInfoRow
                                icon={<EmailIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Email Address"
                                value={user.email}
                            />
                            <DetailInfoRow
                                icon={<BadgeIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="User ID"
                                value={
                                    <Typography variant="body2" fontWeight={500} sx={{ fontFamily: 'monospace' }}>
                                        {user.id}
                                    </Typography>
                                }
                            />
                        </Stack>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Account Information */}
                    <Box>
                        <Typography
                            variant="overline"
                            sx={{
                                color: isDarkMode ? '#A3A3A3' : '#737373',
                                fontWeight: 600,
                                letterSpacing: 1,
                                mb: 2,
                                display: 'block',
                            }}
                        >
                            Account Information
                        </Typography>
                        <Stack spacing={2}>
                            <DetailInfoRow
                                icon={<CalendarIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Created At"
                                value={formatDateTime(user.createdAt, 'Never')}
                            />
                            <DetailInfoRow
                                icon={<AccessTimeIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Last Login"
                                value={formatDateTime(user.lastLogin, 'Never')}
                            />
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Drawer>
    );
}
