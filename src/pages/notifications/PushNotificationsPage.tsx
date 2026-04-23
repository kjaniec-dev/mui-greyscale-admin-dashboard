import { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Switch,
    FormGroup,
    FormControlLabel,
    Button,
    Divider,
    Alert,
    Avatar,
    useTheme,
} from '@mui/material';
import {
    NotificationsActive as NotificationsActiveIcon,
    Save as SaveIcon,
    Smartphone as MobileIcon,
    Web as WebIcon,
} from '@mui/icons-material';

export function PushNotificationsPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const [webEnabled, setWebEnabled] = useState(true);
    const [mobileEnabled, setMobileEnabled] = useState(false);

    // Notification Types
    const [notifyMarketing, setNotifyMarketing] = useState(true);
    const [notifySecurity, setNotifySecurity] = useState(true);
    const [notifyUpdates, setNotifyUpdates] = useState(false);

    const handleSave = () => {
        // Save preferences logic here
        console.log('Saved push preferences:', {
            webEnabled,
            mobileEnabled,
            preferences: {
                marketing: notifyMarketing,
                security: notifySecurity,
                updates: notifyUpdates
            }
        });
    };

    return (
        <Box sx={{ maxWidth: 800 }}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                    variant="rounded"
                    sx={{
                        bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                        color: 'text.primary',
                        width: 48,
                        height: 48,
                    }}
                >
                    <NotificationsActiveIcon />
                </Avatar>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        Push Notifications
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage your web and mobile push notification settings.
                    </Typography>
                </Box>
            </Box>

            <Paper
                sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                    border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                    borderRadius: 2,
                    overflow: 'hidden',
                    backgroundImage: 'none',
                }}
            >
                <Alert severity="info" sx={{ mb: 2 }}>
                    Push notifications are sent directly to your device via your web browser or mobile app.
                </Alert>

                <Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        Devices
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Enable or disable push notifications for specific platforms.
                    </Typography>

                    <FormGroup sx={{ gap: 2, ml: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                            <WebIcon color={webEnabled ? 'primary' : 'disabled'} />
                            <FormControlLabel
                                control={<Switch checked={webEnabled} onChange={(e) => setWebEnabled(e.target.checked)} />}
                                label="Browser (Web) Push"
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <MobileIcon color={mobileEnabled ? 'primary' : 'disabled'} />
                            <FormControlLabel
                                control={<Switch checked={mobileEnabled} onChange={(e) => setMobileEnabled(e.target.checked)} />}
                                label="Mobile App Push"
                            />
                        </Box>
                    </FormGroup>
                </Box>

                <Divider />

                <Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        Notification Types
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Choose which types of alerts you'd like to receive as push notifications.
                    </Typography>

                    <FormGroup sx={{ gap: 2, ml: 1 }}>
                        <FormControlLabel
                            control={<Switch checked={notifySecurity} onChange={(e) => setNotifySecurity(e.target.checked)} />}
                            label={
                                <Box>
                                    <Typography variant="body1" sx={{ fontWeight: 500 }}>Security Alerts</Typography>
                                    <Typography variant="body2" color="text.secondary">New logins, password changes, and suspicious activity.</Typography>
                                </Box>
                            }
                        />
                        <FormControlLabel
                            control={<Switch checked={notifyMarketing} onChange={(e) => setNotifyMarketing(e.target.checked)} />}
                            label={
                                <Box>
                                    <Typography variant="body1" sx={{ fontWeight: 500 }}>Marketing Campaigns</Typography>
                                    <Typography variant="body2" color="text.secondary">Alerts about your active campaign performance and milestones.</Typography>
                                </Box>
                            }
                        />
                        <FormControlLabel
                            control={<Switch checked={notifyUpdates} onChange={(e) => setNotifyUpdates(e.target.checked)} />}
                            label={
                                <Box>
                                    <Typography variant="body1" sx={{ fontWeight: 500 }}>System Updates</Typography>
                                    <Typography variant="body2" color="text.secondary">Platform updates, maintenance windows, and new features.</Typography>
                                </Box>
                            }
                        />
                    </FormGroup>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        startIcon={<SaveIcon />}
                        sx={{
                            bgcolor: 'text.primary',
                            color: 'background.paper',
                            '&:hover': {
                                bgcolor: isDarkMode ? '#A3A3A3' : '#404040',
                            },
                        }}
                    >
                        Save Preferences
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
