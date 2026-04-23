import {
    Box,
    Typography,
    Avatar,
    Paper,
    Chip,
    Stack,
    Button,
    Divider,
    useTheme,
} from '@mui/material';
import {
    Edit as EditIcon,
    Lock as LockIcon,
    Email as EmailIcon,
    Badge as BadgeIcon,
    CalendarToday as CalendarIcon,
    AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import { mockUsers } from '../../data/mockUsers';
import { DetailInfoRow } from '../../components/common/DetailInfoRow';
import { getStatusColor, getStatusSolid } from '../../theme';

// Use the first user as the "current" logged-in user for demo purposes
const currentUser = mockUsers[0];

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

function formatDate(date: Date | undefined): string {
    if (!date) return 'Never';
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

function formatDateTime(date: Date | undefined): string {
    if (!date) return 'Never';
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function UserProfilePage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const statusColors = getStatusSolid(currentUser.status, isDarkMode);
    const statusIndicator = getStatusColor(currentUser.status, isDarkMode);

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                    My Profile
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    View and manage your account information.
                </Typography>
            </Box>

            <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' } }}>
                {/* Profile Card */}
                <Paper
                    sx={{
                        p: 4,
                        bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                        border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                        borderRadius: 2,
                        textAlign: 'center',
                    }}
                >
                    <Avatar
                        sx={{
                            width: 100,
                            height: 100,
                            bgcolor: isDarkMode ? '#404040' : '#E5E5E5',
                            color: isDarkMode ? '#E5E5E5' : '#171717',
                            fontSize: '2.5rem',
                            fontWeight: 600,
                            mx: 'auto',
                            mb: 2,
                        }}
                    >
                        {getInitials(currentUser.name)}
                    </Avatar>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                        {currentUser.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {currentUser.email}
                    </Typography>
                    <Stack direction="row" spacing={1}  sx={{ justifyContent: 'center',  mb: 3 }}>
                        <Chip
                            label={currentUser.role}
                            size="small"
                            sx={{
                                bgcolor: isDarkMode ? '#404040' : '#E5E5E5',
                                color: isDarkMode ? '#E5E5E5' : '#171717',
                                fontWeight: 500,
                                borderRadius: 1,
                            }}
                        />
                        <Chip
                            label={currentUser.status}
                            size="small"
                            sx={{
                                bgcolor: statusColors.bg,
                                color: statusColors.text,
                                fontWeight: 500,
                                borderRadius: 1,
                            }}
                        />
                    </Stack>
                    <Divider sx={{ mb: 3 }} />
                    <Stack spacing={2}>
                        <Button
                            variant="contained"
                            startIcon={<EditIcon />}
                            fullWidth
                            sx={{
                                bgcolor: '#171717',
                                color: '#FAFAFA',
                                '&:hover': {
                                    bgcolor: '#262626',
                                },
                            }}
                        >
                            Edit Profile
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<LockIcon />}
                            fullWidth
                            sx={{
                                borderColor: isDarkMode ? '#404040' : '#E5E5E5',
                                color: isDarkMode ? '#E5E5E5' : '#171717',
                                '&:hover': {
                                    borderColor: isDarkMode ? '#525252' : '#D4D4D4',
                                    bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                                },
                            }}
                        >
                            Change Password
                        </Button>
                    </Stack>
                </Paper>

                {/* Details Panel */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Personal Information */}
                    <Paper
                        sx={{
                            p: 3,
                            bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                            border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 600,  mb: 3  }}>
                            Personal Information
                        </Typography>
                        <Stack spacing={2.5}>
                            <DetailInfoRow
                                icon={<EmailIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Email Address"
                                value={currentUser.email}
                            />
                            <DetailInfoRow
                                icon={<BadgeIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="User ID"
                                value={<span style={{ fontFamily: 'monospace' }}>{currentUser.id}</span>}
                            />
                            <DetailInfoRow
                                icon={<CalendarIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Member Since"
                                value={formatDate(currentUser.createdAt)}
                            />
                        </Stack>
                    </Paper>

                    {/* Account Activity */}
                    <Paper
                        sx={{
                            p: 3,
                            bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                            border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 600,  mb: 3  }}>
                            Account Activity
                        </Typography>
                        <Stack spacing={2.5}>
                            <DetailInfoRow
                                icon={<AccessTimeIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Last Login"
                                value={formatDateTime(currentUser.lastLogin)}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 1,
                                        bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: '50%',
                                            bgcolor: statusIndicator.text,
                                        }}
                                    />
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                        Account Status
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {currentUser.status}
                                    </Typography>
                                </Box>
                            </Box>
                        </Stack>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
}
