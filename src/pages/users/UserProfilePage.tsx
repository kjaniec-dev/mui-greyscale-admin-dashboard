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

    const statusColors = {
        Active: isDarkMode ? '#A3A3A3' : '#525252',
        Inactive: isDarkMode ? '#525252' : '#A3A3A3',
        Pending: isDarkMode ? '#737373' : '#737373',
    };

    const roleColors = {
        Admin: isDarkMode ? '#404040' : '#E5E5E5',
        Manager: isDarkMode ? '#404040' : '#E5E5E5',
        User: isDarkMode ? '#404040' : '#E5E5E5',
    };

    const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) => (
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
                {icon}
            </Box>
            <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary" display="block">
                    {label}
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                    {value}
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
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
                    <Typography variant="h5" fontWeight={700} gutterBottom>
                        {currentUser.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {currentUser.email}
                    </Typography>
                    <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 3 }}>
                        <Chip
                            label={currentUser.role}
                            size="small"
                            sx={{
                                bgcolor: roleColors[currentUser.role],
                                color: isDarkMode ? '#E5E5E5' : '#171717',
                                fontWeight: 500,
                                borderRadius: 1,
                            }}
                        />
                        <Chip
                            label={currentUser.status}
                            size="small"
                            sx={{
                                bgcolor: statusColors[currentUser.status],
                                color: isDarkMode ? '#171717' : '#FAFAFA',
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
                        <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                            Personal Information
                        </Typography>
                        <Stack spacing={2.5}>
                            <InfoRow
                                icon={<EmailIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Email Address"
                                value={currentUser.email}
                            />
                            <InfoRow
                                icon={<BadgeIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="User ID"
                                value={<span style={{ fontFamily: 'monospace' }}>{currentUser.id}</span>}
                            />
                            <InfoRow
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
                        <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                            Account Activity
                        </Typography>
                        <Stack spacing={2.5}>
                            <InfoRow
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
                                            bgcolor: currentUser.status === 'Active'
                                                ? (isDarkMode ? '#A3A3A3' : '#525252')
                                                : (isDarkMode ? '#525252' : '#A3A3A3'),
                                        }}
                                    />
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="caption" color="text.secondary" display="block">
                                        Account Status
                                    </Typography>
                                    <Typography variant="body2" fontWeight={500}>
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
