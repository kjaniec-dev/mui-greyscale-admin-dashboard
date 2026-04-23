import { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    Switch,
    FormControlLabel,
    Avatar,
    Stack,
    Snackbar,
    Alert,
    useTheme,
} from '@mui/material';
import {
    Save as SaveIcon,
    Lock as LockIcon,
    Notifications as NotificationsIcon,
    Security as SecurityIcon,
    Delete as DeleteIcon,
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

export function UserAccountPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Account settings state
    const [settings, setSettings] = useState({
        name: currentUser.name,
        email: currentUser.email,
        emailNotifications: true,
        pushNotifications: false,
        twoFactorAuth: false,
        marketingEmails: true,
    });

    const handleSaveProfile = async () => {
        setIsSaving(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        setIsSaving(false);
        setShowSuccess(true);
    };

    const handleSettingChange = (key: keyof typeof settings) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    const sectionPaperSx = {
        p: 3,
        bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
        border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
        borderRadius: 2,
    };

    const inputSx = {
        '& .MuiInputBase-root': {
            bgcolor: isDarkMode ? '#0A0A0A' : '#FAFAFA',
        },
    };

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                    Account Settings
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Manage your account preferences and security settings.
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 800 }}>
                {/* Profile Section */}
                <Paper sx={sectionPaperSx}>
                    <Typography variant="h6" sx={{ fontWeight: 600,  mb: 3  }}>
                        Profile Information
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                        <Avatar
                            sx={{
                                width: 80,
                                height: 80,
                                bgcolor: isDarkMode ? '#404040' : '#E5E5E5',
                                color: isDarkMode ? '#E5E5E5' : '#171717',
                                fontSize: '1.75rem',
                                fontWeight: 600,
                            }}
                        >
                            {getInitials(settings.name)}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                            <Stack spacing={2}>
                                <TextField
                                    label="Full Name"
                                    value={settings.name}
                                    onChange={handleSettingChange('name')}
                                    fullWidth
                                    sx={inputSx}
                                />
                                <TextField
                                    label="Email Address"
                                    value={settings.email}
                                    onChange={handleSettingChange('email')}
                                    fullWidth
                                    type="email"
                                    sx={inputSx}
                                />
                            </Stack>
                        </Box>
                    </Box>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={handleSaveProfile}
                            disabled={isSaving}
                            sx={{
                                bgcolor: '#171717',
                                color: '#FAFAFA',
                                '&:hover': { bgcolor: '#262626' },
                            }}
                        >
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </Box>
                </Paper>

                {/* Password Section */}
                <Paper sx={sectionPaperSx}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                        <LockIcon sx={{ color: isDarkMode ? '#A3A3A3' : '#525252' }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Password
                        </Typography>
                    </Box>
                    <Stack spacing={2}>
                        <TextField
                            label="Current Password"
                            type="password"
                            fullWidth
                            sx={inputSx}
                        />
                        <TextField
                            label="New Password"
                            type="password"
                            fullWidth
                            sx={inputSx}
                        />
                        <TextField
                            label="Confirm New Password"
                            type="password"
                            fullWidth
                            sx={inputSx}
                        />
                    </Stack>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="outlined"
                            sx={{
                                borderColor: isDarkMode ? '#404040' : '#E5E5E5',
                                color: isDarkMode ? '#E5E5E5' : '#171717',
                            }}
                        >
                            Update Password
                        </Button>
                    </Box>
                </Paper>

                {/* Notifications Section */}
                <Paper sx={sectionPaperSx}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                        <NotificationsIcon sx={{ color: isDarkMode ? '#A3A3A3' : '#525252' }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Notifications
                        </Typography>
                    </Box>
                    <Stack spacing={1}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.emailNotifications}
                                    onChange={handleSettingChange('emailNotifications')}
                                />
                            }
                            label="Email notifications"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.pushNotifications}
                                    onChange={handleSettingChange('pushNotifications')}
                                />
                            }
                            label="Push notifications"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.marketingEmails}
                                    onChange={handleSettingChange('marketingEmails')}
                                />
                            }
                            label="Marketing emails"
                        />
                    </Stack>
                </Paper>

                {/* Security Section */}
                <Paper sx={sectionPaperSx}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                        <SecurityIcon sx={{ color: isDarkMode ? '#A3A3A3' : '#525252' }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Security
                        </Typography>
                    </Box>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={settings.twoFactorAuth}
                                onChange={handleSettingChange('twoFactorAuth')}
                            />
                        }
                        label="Enable two-factor authentication"
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 6, mt: -0.5 }}>
                        Add an extra layer of security to your account.
                    </Typography>
                </Paper>

                {/* Danger Zone */}
                <Paper sx={{ ...sectionPaperSx, borderColor: isDarkMode ? '#7f1d1d' : '#fecaca' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600,  mb: 1, color: 'error.main'  }}>
                        Danger Zone
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Once you delete your account, there is no going back. Please be certain.
                    </Typography>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                    >
                        Delete Account
                    </Button>
                </Paper>
            </Box>

            {/* Success notification */}
            <Snackbar
                open={showSuccess}
                autoHideDuration={3000}
                onClose={() => setShowSuccess(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity="success" onClose={() => setShowSuccess(false)}>
                    Settings saved successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
}
