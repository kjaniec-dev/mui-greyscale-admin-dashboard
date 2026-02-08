import { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Switch,
    FormControl,
    Select,
    MenuItem,
    Divider,
    Button,
    Stack,
    Snackbar,
    Alert,
    useTheme,
    FormControlLabel,
    FormGroup,
} from '@mui/material';
import {
    Save as SaveIcon,
    UnsubscribeOutlined as UnsubscribeIcon,
    NotificationsActive as SubscribeIcon,
} from '@mui/icons-material';
import type { SelectChangeEvent } from '@mui/material';

type Frequency = 'instant' | 'daily' | 'weekly' | 'never';

interface EmailPreference {
    id: string;
    label: string;
    description: string;
    enabled: boolean;
    frequency: Frequency;
    allowFrequency: boolean;
}

interface PreferenceCategory {
    title: string;
    description: string;
    preferences: EmailPreference[];
}

export function EmailPreferencesPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Digest settings
    const [digestTime, setDigestTime] = useState('09:00');
    const [digestDay, setDigestDay] = useState('monday');

    // Email preferences state
    const [preferences, setPreferences] = useState<PreferenceCategory[]>([
        {
            title: 'Account Activity',
            description: 'Notifications about your account security and important changes',
            preferences: [
                {
                    id: 'login-new-device',
                    label: 'Login from new device',
                    description: 'Get notified when your account is accessed from an unrecognized device',
                    enabled: true,
                    frequency: 'instant',
                    allowFrequency: false,
                },
                {
                    id: 'password-changes',
                    label: 'Password changes',
                    description: 'Receive confirmation when your password is changed',
                    enabled: true,
                    frequency: 'instant',
                    allowFrequency: false,
                },
                {
                    id: 'profile-updates',
                    label: 'Profile updates',
                    description: 'Get notified when your profile information is updated',
                    enabled: true,
                    frequency: 'instant',
                    allowFrequency: true,
                },
                {
                    id: '2fa-changes',
                    label: 'Two-factor authentication changes',
                    description: 'Alerts when 2FA settings are modified',
                    enabled: true,
                    frequency: 'instant',
                    allowFrequency: false,
                },
            ],
        },
        {
            title: 'Orders & Transactions',
            description: 'Updates about your purchases and financial transactions',
            preferences: [
                {
                    id: 'order-confirmations',
                    label: 'Order confirmations',
                    description: 'Receive confirmation emails for new orders',
                    enabled: true,
                    frequency: 'instant',
                    allowFrequency: false,
                },
                {
                    id: 'payment-receipts',
                    label: 'Payment receipts',
                    description: 'Get receipts for successful payments',
                    enabled: true,
                    frequency: 'instant',
                    allowFrequency: true,
                },
                {
                    id: 'refund-notifications',
                    label: 'Refund notifications',
                    description: 'Updates when refunds are processed',
                    enabled: true,
                    frequency: 'instant',
                    allowFrequency: false,
                },
                {
                    id: 'shipping-updates',
                    label: 'Shipping updates',
                    description: 'Track your order delivery status',
                    enabled: true,
                    frequency: 'instant',
                    allowFrequency: true,
                },
            ],
        },
        {
            title: 'Team & Collaboration',
            description: 'Notifications about team activity and collaboration',
            preferences: [
                {
                    id: 'team-invitations',
                    label: 'Team member invitations',
                    description: "Get notified when you're invited to join a team",
                    enabled: true,
                    frequency: 'instant',
                    allowFrequency: false,
                },
                {
                    id: 'role-changes',
                    label: 'Role changes',
                    description: 'Receive updates when your permissions are modified',
                    enabled: true,
                    frequency: 'instant',
                    allowFrequency: true,
                },
                {
                    id: 'mentions-comments',
                    label: 'Mentions and comments',
                    description: 'Get notified when someone mentions you or comments on your content',
                    enabled: true,
                    frequency: 'daily',
                    allowFrequency: true,
                },
                {
                    id: 'shared-content',
                    label: 'Shared content updates',
                    description: 'Updates on content that has been shared with you',
                    enabled: false,
                    frequency: 'weekly',
                    allowFrequency: true,
                },
            ],
        },
        {
            title: 'System & Updates',
            description: 'Platform announcements and important system information',
            preferences: [
                {
                    id: 'system-maintenance',
                    label: 'System maintenance',
                    description: 'Alerts about scheduled maintenance and downtime',
                    enabled: true,
                    frequency: 'instant',
                    allowFrequency: false,
                },
                {
                    id: 'feature-announcements',
                    label: 'Feature announcements',
                    description: 'Learn about new features and improvements',
                    enabled: true,
                    frequency: 'weekly',
                    allowFrequency: true,
                },
                {
                    id: 'policy-updates',
                    label: 'Policy updates',
                    description: 'Important updates to terms of service and privacy policy',
                    enabled: true,
                    frequency: 'instant',
                    allowFrequency: false,
                },
                {
                    id: 'security-alerts',
                    label: 'Security alerts',
                    description: 'Critical security notifications and advisories',
                    enabled: true,
                    frequency: 'instant',
                    allowFrequency: false,
                },
            ],
        },
        {
            title: 'Marketing & Promotions',
            description: 'Optional promotional content and newsletters',
            preferences: [
                {
                    id: 'product-updates',
                    label: 'Product updates',
                    description: 'News about product improvements and tips',
                    enabled: false,
                    frequency: 'weekly',
                    allowFrequency: true,
                },
                {
                    id: 'newsletter',
                    label: 'Newsletter',
                    description: 'Our monthly newsletter with insights and trends',
                    enabled: false,
                    frequency: 'weekly',
                    allowFrequency: true,
                },
                {
                    id: 'special-offers',
                    label: 'Special offers',
                    description: 'Exclusive deals and promotional discounts',
                    enabled: false,
                    frequency: 'weekly',
                    allowFrequency: true,
                },
                {
                    id: 'event-invitations',
                    label: 'Event invitations',
                    description: 'Invites to webinars, workshops, and events',
                    enabled: false,
                    frequency: 'instant',
                    allowFrequency: true,
                },
            ],
        },
    ]);

    const handleToggle = (categoryIndex: number, preferenceIndex: number) => {
        setPreferences((prev) =>
            prev.map((category, cIdx) =>
                cIdx === categoryIndex
                    ? {
                        ...category,
                        preferences: category.preferences.map((pref, pIdx) =>
                            pIdx === preferenceIndex
                                ? { ...pref, enabled: !pref.enabled }
                                : pref
                        ),
                    }
                    : category
            )
        );
    };

    const handleFrequencyChange = (
        categoryIndex: number,
        preferenceIndex: number,
        frequency: Frequency
    ) => {
        setPreferences((prev) =>
            prev.map((category, cIdx) =>
                cIdx === categoryIndex
                    ? {
                        ...category,
                        preferences: category.preferences.map((pref, pIdx) =>
                            pIdx === preferenceIndex ? { ...pref, frequency } : pref
                        ),
                    }
                    : category
            )
        );
    };

    const handleUnsubscribeAll = () => {
        setPreferences((prev) =>
            prev.map((category) => ({
                ...category,
                preferences: category.preferences.map((pref) => ({
                    ...pref,
                    enabled: false,
                })),
            }))
        );
    };

    const handleSubscribeAll = () => {
        setPreferences((prev) =>
            prev.map((category) => ({
                ...category,
                preferences: category.preferences.map((pref) => ({
                    ...pref,
                    enabled: true,
                })),
            }))
        );
    };

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        console.log('Saving preferences:', { preferences, digestTime, digestDay });
        setIsSaving(false);
        setShowSuccess(true);
    };

    const paperSx = {
        p: 3,
        mb: 3,
        bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
        border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
        borderRadius: 2,
    };

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Email Preferences
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage your email notification settings and preferences
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        variant="outlined"
                        startIcon={<UnsubscribeIcon />}
                        onClick={handleUnsubscribeAll}
                        size="small"
                    >
                        Unsubscribe All
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<SubscribeIcon />}
                        onClick={handleSubscribeAll}
                        size="small"
                    >
                        Subscribe All
                    </Button>
                </Box>
            </Box>

            <Box sx={{ maxWidth: 1000 }}>
                {/* Digest Settings */}
                <Paper sx={paperSx}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                        Digest Settings
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Configure when you want to receive email digests
                    </Typography>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                        <FormControl sx={{ flex: 1 }}>
                            <Typography variant="body2" fontWeight={500} gutterBottom>
                                Daily Digest Time
                            </Typography>
                            <Select
                                value={digestTime}
                                onChange={(e: SelectChangeEvent) => setDigestTime(e.target.value)}
                                size="small"
                            >
                                <MenuItem value="06:00">6:00 AM</MenuItem>
                                <MenuItem value="09:00">9:00 AM</MenuItem>
                                <MenuItem value="12:00">12:00 PM</MenuItem>
                                <MenuItem value="15:00">3:00 PM</MenuItem>
                                <MenuItem value="18:00">6:00 PM</MenuItem>
                                <MenuItem value="21:00">9:00 PM</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ flex: 1 }}>
                            <Typography variant="body2" fontWeight={500} gutterBottom>
                                Weekly Digest Day
                            </Typography>
                            <Select
                                value={digestDay}
                                onChange={(e: SelectChangeEvent) => setDigestDay(e.target.value)}
                                size="small"
                            >
                                <MenuItem value="monday">Monday</MenuItem>
                                <MenuItem value="tuesday">Tuesday</MenuItem>
                                <MenuItem value="wednesday">Wednesday</MenuItem>
                                <MenuItem value="thursday">Thursday</MenuItem>
                                <MenuItem value="friday">Friday</MenuItem>
                                <MenuItem value="saturday">Saturday</MenuItem>
                                <MenuItem value="sunday">Sunday</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </Paper>

                {/* Preference Categories */}
                {preferences.map((category, categoryIndex) => (
                    <Paper key={category.title} sx={paperSx}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            {category.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            {category.description}
                        </Typography>

                        <FormGroup>
                            {category.preferences.map((preference, preferenceIndex) => (
                                <Box key={preference.id}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            justifyContent: 'space-between',
                                            py: 2,
                                            gap: 2,
                                        }}
                                    >
                                        <Box sx={{ flex: 1 }}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={preference.enabled}
                                                        onChange={() =>
                                                            handleToggle(categoryIndex, preferenceIndex)
                                                        }
                                                    />
                                                }
                                                label={
                                                    <Box>
                                                        <Typography variant="body1" fontWeight={500}>
                                                            {preference.label}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {preference.description}
                                                        </Typography>
                                                    </Box>
                                                }
                                                sx={{ m: 0 }}
                                            />
                                        </Box>

                                        {preference.allowFrequency && preference.enabled && (
                                            <FormControl size="small" sx={{ minWidth: 140 }}>
                                                <Select
                                                    value={preference.frequency}
                                                    onChange={(e: SelectChangeEvent) =>
                                                        handleFrequencyChange(
                                                            categoryIndex,
                                                            preferenceIndex,
                                                            e.target.value as Frequency
                                                        )
                                                    }
                                                >
                                                    <MenuItem value="instant">Instant</MenuItem>
                                                    <MenuItem value="daily">Daily Digest</MenuItem>
                                                    <MenuItem value="weekly">Weekly Digest</MenuItem>
                                                </Select>
                                            </FormControl>
                                        )}
                                    </Box>
                                    {preferenceIndex < category.preferences.length - 1 && <Divider />}
                                </Box>
                            ))}
                        </FormGroup>
                    </Paper>
                ))}

                {/* Save Button */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                    <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                        disabled={isSaving}
                        sx={{
                            bgcolor: '#171717',
                            color: '#FAFAFA',
                            '&:hover': { bgcolor: '#262626' },
                        }}
                    >
                        {isSaving ? 'Saving...' : 'Save Preferences'}
                    </Button>
                </Box>
            </Box>

            {/* Success Snackbar */}
            <Snackbar
                open={showSuccess}
                autoHideDuration={3000}
                onClose={() => setShowSuccess(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity="success" onClose={() => setShowSuccess(false)}>
                    Email preferences saved successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
}
