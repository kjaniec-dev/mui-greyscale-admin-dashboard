import { useState, type ReactNode } from 'react';
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
    TextField,
    useTheme,
    Tabs,
    Tab,
    InputAdornment,
} from '@mui/material';
import {
    Save as SaveIcon,
    Palette as PaletteIcon,
    Translate as LanguageIcon,
    AccessTime as TimezoneIcon,
    Visibility as VisibilityIcon,
    Tune as TuneIcon,
    Business as SiteIcon,
    Email as EmailIcon,
    Notifications as NotificationIcon,
    Security as SecurityIcon,
    Language as UrlIcon,
    AttachMoney as CurrencyIcon,
} from '@mui/icons-material';

interface SettingRowProps {
    icon: ReactNode;
    label: string;
    description?: string;
    children: ReactNode;
}

function SettingRow({ icon, label, description, children }: SettingRowProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 2,
                py: 1.5,
            }}
        >
            <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 1,
                        bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                    }}
                >
                    {icon}
                </Box>
                <Box>
                    <Typography variant="body2" fontWeight={500}>
                        {label}
                    </Typography>
                    {description && (
                        <Typography variant="caption" color="text.secondary">
                            {description}
                        </Typography>
                    )}
                </Box>
            </Box>
            <Box sx={{ flexShrink: 0 }}>{children}</Box>
        </Box>
    );
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
    return (
        <Box role="tabpanel" hidden={value !== index} sx={{ pt: 3 }}>
            {value === index && children}
        </Box>
    );
}

export function SettingsPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    // Settings state
    const [settings, setSettings] = useState({
        // Site Configuration
        siteName: 'Admin Dashboard',
        siteUrl: 'https://admin.example.com',
        siteDescription: 'A modern admin dashboard for managing your business',
        supportEmail: 'support@example.com',
        currency: 'USD',
        dateFormat: 'MM/DD/YYYY',

        // General
        timezone: 'America/New_York',
        language: 'en',

        // Appearance
        darkMode: isDarkMode,
        density: 'comfortable',
        sidebarCollapsed: false,
        animations: true,

        // Email
        smtpHost: 'smtp.example.com',
        smtpPort: '587',
        smtpUser: 'noreply@example.com',
        smtpSecure: true,
        emailFromName: 'Admin Dashboard',

        // Notifications
        emailNotifications: true,
        orderNotifications: true,
        userNotifications: true,
        systemNotifications: true,
        marketingEmails: false,

        // Security
        twoFactorAuth: false,
        sessionTimeout: '30',
        passwordExpiry: '90',
        loginAttempts: '5',

        // Privacy
        analytics: true,
        cookies: true,
    });

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setIsSaving(false);
        setShowSuccess(true);
    };

    const handleChange = <K extends keyof typeof settings>(
        key: K,
        value: (typeof settings)[K]
    ) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    const sectionPaperSx = {
        p: 3,
        bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
        border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
        borderRadius: 2,
    };

    const selectSx = {
        bgcolor: isDarkMode ? '#0A0A0A' : '#FAFAFA',
        minWidth: 200,
    };

    const inputSx = {
        bgcolor: isDarkMode ? '#0A0A0A' : '#FAFAFA',
        minWidth: 280,
    };

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Settings
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Configure your application preferences and behavior.
                    </Typography>
                </Box>
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
                    {isSaving ? 'Saving...' : 'Save Settings'}
                </Button>
            </Box>

            {/* Tabs */}
            <Paper sx={{ mb: 3, px: 2 }}>
                <Tabs
                    value={activeTab}
                    onChange={(_, v) => setActiveTab(v)}
                    sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
                >
                    <Tab icon={<SiteIcon />} iconPosition="start" label="Site" />
                    <Tab icon={<PaletteIcon />} iconPosition="start" label="Appearance" />
                    <Tab icon={<EmailIcon />} iconPosition="start" label="Email" />
                    <Tab icon={<NotificationIcon />} iconPosition="start" label="Notifications" />
                    <Tab icon={<SecurityIcon />} iconPosition="start" label="Security" />
                </Tabs>
            </Paper>

            <Box sx={{ maxWidth: 900 }}>
                {/* Site Configuration Tab */}
                <TabPanel value={activeTab} index={0}>
                    <Stack spacing={3}>
                        <Paper sx={sectionPaperSx}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <SiteIcon sx={{ color: isDarkMode ? '#A3A3A3' : '#525252' }} />
                                <Typography variant="h6" fontWeight={600}>
                                    Site Information
                                </Typography>
                            </Box>
                            <Stack divider={<Divider />}>
                                <SettingRow
                                    icon={<SiteIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                    label="Site Name"
                                    description="Your application's display name"
                                >
                                    <TextField
                                        size="small"
                                        value={settings.siteName}
                                        onChange={(e) => handleChange('siteName', e.target.value)}
                                        sx={inputSx}
                                    />
                                </SettingRow>
                                <SettingRow
                                    icon={<UrlIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                    label="Site URL"
                                    description="Your application's public URL"
                                >
                                    <TextField
                                        size="small"
                                        value={settings.siteUrl}
                                        onChange={(e) => handleChange('siteUrl', e.target.value)}
                                        sx={inputSx}
                                    />
                                </SettingRow>
                                <SettingRow
                                    icon={<EmailIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                    label="Support Email"
                                    description="Email for support inquiries"
                                >
                                    <TextField
                                        size="small"
                                        value={settings.supportEmail}
                                        onChange={(e) => handleChange('supportEmail', e.target.value)}
                                        sx={inputSx}
                                    />
                                </SettingRow>
                            </Stack>
                        </Paper>

                        <Paper sx={sectionPaperSx}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <TuneIcon sx={{ color: isDarkMode ? '#A3A3A3' : '#525252' }} />
                                <Typography variant="h6" fontWeight={600}>
                                    Regional Settings
                                </Typography>
                            </Box>
                            <Stack divider={<Divider />}>
                                <SettingRow
                                    icon={<LanguageIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                    label="Language"
                                    description="Select your preferred language"
                                >
                                    <FormControl size="small">
                                        <Select
                                            value={settings.language}
                                            onChange={(e) => handleChange('language', e.target.value)}
                                            sx={selectSx}
                                        >
                                            <MenuItem value="en">English</MenuItem>
                                            <MenuItem value="es">Español</MenuItem>
                                            <MenuItem value="fr">Français</MenuItem>
                                            <MenuItem value="de">Deutsch</MenuItem>
                                            <MenuItem value="pl">Polski</MenuItem>
                                        </Select>
                                    </FormControl>
                                </SettingRow>
                                <SettingRow
                                    icon={<TimezoneIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                    label="Timezone"
                                    description="Set your local timezone"
                                >
                                    <FormControl size="small">
                                        <Select
                                            value={settings.timezone}
                                            onChange={(e) => handleChange('timezone', e.target.value)}
                                            sx={selectSx}
                                        >
                                            <MenuItem value="America/New_York">Eastern Time (ET)</MenuItem>
                                            <MenuItem value="America/Chicago">Central Time (CT)</MenuItem>
                                            <MenuItem value="America/Denver">Mountain Time (MT)</MenuItem>
                                            <MenuItem value="America/Los_Angeles">Pacific Time (PT)</MenuItem>
                                            <MenuItem value="Europe/London">GMT/BST</MenuItem>
                                            <MenuItem value="Europe/Warsaw">Central European (CET)</MenuItem>
                                        </Select>
                                    </FormControl>
                                </SettingRow>
                                <SettingRow
                                    icon={<CurrencyIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                    label="Currency"
                                    description="Default currency for pricing"
                                >
                                    <FormControl size="small">
                                        <Select
                                            value={settings.currency}
                                            onChange={(e) => handleChange('currency', e.target.value)}
                                            sx={selectSx}
                                        >
                                            <MenuItem value="USD">USD ($)</MenuItem>
                                            <MenuItem value="EUR">EUR (€)</MenuItem>
                                            <MenuItem value="GBP">GBP (£)</MenuItem>
                                            <MenuItem value="PLN">PLN (zł)</MenuItem>
                                        </Select>
                                    </FormControl>
                                </SettingRow>
                            </Stack>
                        </Paper>
                    </Stack>
                </TabPanel>

                {/* Appearance Tab */}
                <TabPanel value={activeTab} index={1}>
                    <Paper sx={sectionPaperSx}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                            <PaletteIcon sx={{ color: isDarkMode ? '#A3A3A3' : '#525252' }} />
                            <Typography variant="h6" fontWeight={600}>
                                Theme & Display
                            </Typography>
                        </Box>
                        <Stack divider={<Divider />}>
                            <SettingRow
                                icon={<VisibilityIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Dark Mode"
                                description="Use dark theme for the interface"
                            >
                                <Switch
                                    checked={settings.darkMode}
                                    onChange={(e) => handleChange('darkMode', e.target.checked)}
                                />
                            </SettingRow>
                            <SettingRow
                                icon={<TuneIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Density"
                                description="Adjust spacing of UI elements"
                            >
                                <FormControl size="small">
                                    <Select
                                        value={settings.density}
                                        onChange={(e) => handleChange('density', e.target.value)}
                                        sx={selectSx}
                                    >
                                        <MenuItem value="comfortable">Comfortable</MenuItem>
                                        <MenuItem value="compact">Compact</MenuItem>
                                        <MenuItem value="standard">Standard</MenuItem>
                                    </Select>
                                </FormControl>
                            </SettingRow>
                            <SettingRow
                                icon={<PaletteIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Animations"
                                description="Enable interface animations and transitions"
                            >
                                <Switch
                                    checked={settings.animations}
                                    onChange={(e) => handleChange('animations', e.target.checked)}
                                />
                            </SettingRow>
                            <SettingRow
                                icon={<TuneIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Sidebar Collapsed"
                                description="Start with sidebar in collapsed state"
                            >
                                <Switch
                                    checked={settings.sidebarCollapsed}
                                    onChange={(e) => handleChange('sidebarCollapsed', e.target.checked)}
                                />
                            </SettingRow>
                        </Stack>
                    </Paper>
                </TabPanel>

                {/* Email Tab */}
                <TabPanel value={activeTab} index={2}>
                    <Paper sx={sectionPaperSx}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                            <EmailIcon sx={{ color: isDarkMode ? '#A3A3A3' : '#525252' }} />
                            <Typography variant="h6" fontWeight={600}>
                                SMTP Configuration
                            </Typography>
                        </Box>
                        <Stack divider={<Divider />}>
                            <SettingRow
                                icon={<EmailIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="SMTP Host"
                                description="Your mail server hostname"
                            >
                                <TextField
                                    size="small"
                                    value={settings.smtpHost}
                                    onChange={(e) => handleChange('smtpHost', e.target.value)}
                                    sx={inputSx}
                                />
                            </SettingRow>
                            <SettingRow
                                icon={<TuneIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="SMTP Port"
                                description="Mail server port (587, 465, 25)"
                            >
                                <TextField
                                    size="small"
                                    value={settings.smtpPort}
                                    onChange={(e) => handleChange('smtpPort', e.target.value)}
                                    sx={{ ...inputSx, minWidth: 100 }}
                                />
                            </SettingRow>
                            <SettingRow
                                icon={<EmailIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="SMTP Username"
                                description="Authentication username"
                            >
                                <TextField
                                    size="small"
                                    value={settings.smtpUser}
                                    onChange={(e) => handleChange('smtpUser', e.target.value)}
                                    sx={inputSx}
                                />
                            </SettingRow>
                            <SettingRow
                                icon={<SecurityIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Use TLS/SSL"
                                description="Enable secure connection"
                            >
                                <Switch
                                    checked={settings.smtpSecure}
                                    onChange={(e) => handleChange('smtpSecure', e.target.checked)}
                                />
                            </SettingRow>
                            <SettingRow
                                icon={<SiteIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="From Name"
                                description="Display name for outgoing emails"
                            >
                                <TextField
                                    size="small"
                                    value={settings.emailFromName}
                                    onChange={(e) => handleChange('emailFromName', e.target.value)}
                                    sx={inputSx}
                                />
                            </SettingRow>
                        </Stack>
                    </Paper>
                </TabPanel>

                {/* Notifications Tab */}
                <TabPanel value={activeTab} index={3}>
                    <Paper sx={sectionPaperSx}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                            <NotificationIcon sx={{ color: isDarkMode ? '#A3A3A3' : '#525252' }} />
                            <Typography variant="h6" fontWeight={600}>
                                Notification Preferences
                            </Typography>
                        </Box>
                        <Stack divider={<Divider />}>
                            <SettingRow
                                icon={<EmailIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Email Notifications"
                                description="Receive notifications via email"
                            >
                                <Switch
                                    checked={settings.emailNotifications}
                                    onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                                />
                            </SettingRow>
                            <SettingRow
                                icon={<NotificationIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Order Updates"
                                description="Notifications for new and updated orders"
                            >
                                <Switch
                                    checked={settings.orderNotifications}
                                    onChange={(e) => handleChange('orderNotifications', e.target.checked)}
                                />
                            </SettingRow>
                            <SettingRow
                                icon={<NotificationIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="User Activity"
                                description="Notifications for user signups and actions"
                            >
                                <Switch
                                    checked={settings.userNotifications}
                                    onChange={(e) => handleChange('userNotifications', e.target.checked)}
                                />
                            </SettingRow>
                            <SettingRow
                                icon={<NotificationIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="System Alerts"
                                description="Critical system notifications"
                            >
                                <Switch
                                    checked={settings.systemNotifications}
                                    onChange={(e) => handleChange('systemNotifications', e.target.checked)}
                                />
                            </SettingRow>
                            <SettingRow
                                icon={<EmailIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Marketing Emails"
                                description="Receive product updates and tips"
                            >
                                <Switch
                                    checked={settings.marketingEmails}
                                    onChange={(e) => handleChange('marketingEmails', e.target.checked)}
                                />
                            </SettingRow>
                        </Stack>
                    </Paper>
                </TabPanel>

                {/* Security Tab */}
                <TabPanel value={activeTab} index={4}>
                    <Stack spacing={3}>
                        <Paper sx={sectionPaperSx}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <SecurityIcon sx={{ color: isDarkMode ? '#A3A3A3' : '#525252' }} />
                                <Typography variant="h6" fontWeight={600}>
                                    Authentication
                                </Typography>
                            </Box>
                            <Stack divider={<Divider />}>
                                <SettingRow
                                    icon={<SecurityIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                    label="Two-Factor Authentication"
                                    description="Require 2FA for all admin accounts"
                                >
                                    <Switch
                                        checked={settings.twoFactorAuth}
                                        onChange={(e) => handleChange('twoFactorAuth', e.target.checked)}
                                    />
                                </SettingRow>
                                <SettingRow
                                    icon={<TimezoneIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                    label="Session Timeout"
                                    description="Auto-logout after inactivity (minutes)"
                                >
                                    <TextField
                                        size="small"
                                        type="number"
                                        value={settings.sessionTimeout}
                                        onChange={(e) => handleChange('sessionTimeout', e.target.value)}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">min</InputAdornment>,
                                        }}
                                        sx={{ ...inputSx, minWidth: 120 }}
                                    />
                                </SettingRow>
                                <SettingRow
                                    icon={<SecurityIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                    label="Password Expiry"
                                    description="Force password change after days"
                                >
                                    <TextField
                                        size="small"
                                        type="number"
                                        value={settings.passwordExpiry}
                                        onChange={(e) => handleChange('passwordExpiry', e.target.value)}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">days</InputAdornment>,
                                        }}
                                        sx={{ ...inputSx, minWidth: 120 }}
                                    />
                                </SettingRow>
                                <SettingRow
                                    icon={<SecurityIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                    label="Max Login Attempts"
                                    description="Lock account after failed attempts"
                                >
                                    <TextField
                                        size="small"
                                        type="number"
                                        value={settings.loginAttempts}
                                        onChange={(e) => handleChange('loginAttempts', e.target.value)}
                                        sx={{ ...inputSx, minWidth: 100 }}
                                    />
                                </SettingRow>
                            </Stack>
                        </Paper>

                        <Paper sx={sectionPaperSx}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <VisibilityIcon sx={{ color: isDarkMode ? '#A3A3A3' : '#525252' }} />
                                <Typography variant="h6" fontWeight={600}>
                                    Privacy
                                </Typography>
                            </Box>
                            <Stack divider={<Divider />}>
                                <SettingRow
                                    icon={<TuneIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                    label="Analytics"
                                    description="Help improve the app by sending usage data"
                                >
                                    <Switch
                                        checked={settings.analytics}
                                        onChange={(e) => handleChange('analytics', e.target.checked)}
                                    />
                                </SettingRow>
                                <SettingRow
                                    icon={<TuneIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                    label="Cookies"
                                    description="Allow cookies for enhanced functionality"
                                >
                                    <Switch
                                        checked={settings.cookies}
                                        onChange={(e) => handleChange('cookies', e.target.checked)}
                                    />
                                </SettingRow>
                            </Stack>
                        </Paper>
                    </Stack>
                </TabPanel>
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
