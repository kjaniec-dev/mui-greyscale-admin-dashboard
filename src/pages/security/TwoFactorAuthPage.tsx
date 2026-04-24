import { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    IconButton,
    Stepper,
    Step,
    StepLabel,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Chip,
    Alert,
    Divider,
    useTheme,
    alpha,
} from '@mui/material';
import {
    Security as SecurityIcon,
    Smartphone as PhoneIcon,
    Email as EmailIcon,
    Key as KeyIcon,
    CheckCircle as EnabledIcon,
    Cancel as DisabledIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    QrCode2 as QrCodeIcon,
    ContentCopy as CopyIcon,
    Refresh as RefreshIcon,
} from '@mui/icons-material';

type TwoFactorMethod = 'authenticator' | 'sms' | 'email' | 'backup';

interface TwoFactorConfig {
    enabled: boolean;
    methods: {
        authenticator: { enabled: boolean; setupDate?: string };
        sms: { enabled: boolean; phone?: string };
        email: { enabled: boolean; email?: string };
        backup: { enabled: boolean; codesRemaining?: number };
    };
}

const setupSteps = ['Choose method', 'Scan QR code', 'Verify code'];

export function TwoFactorAuthPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const [config, setConfig] = useState<TwoFactorConfig>({
        enabled: true,
        methods: {
            authenticator: { enabled: true, setupDate: '2024-01-15' },
            sms: { enabled: false },
            email: { enabled: true, email: 'john@example.com' },
            backup: { enabled: true, codesRemaining: 8 },
        },
    });

    const [setupDialogOpen, setSetupDialogOpen] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState<TwoFactorMethod | null>(null);
    const [activeStep, setActiveStep] = useState(0);
    const [verificationCode, setVerificationCode] = useState('');
    const [showBackupCodes, setShowBackupCodes] = useState(false);
    const [backupCodes] = useState([
        'ABCD-1234-EFGH',
        'IJKL-5678-MNOP',
        'QRST-9012-UVWX',
        'YZ12-3456-7890',
        'BCDE-FGHI-JKLM',
        'NOPQ-RSTU-VWXY',
        'Z123-4567-890A',
        'BCDE-FGHI-JKLM',
    ]);

    const handleOpenSetup = (method: TwoFactorMethod) => {
        setSelectedMethod(method);
        setActiveStep(0);
        setVerificationCode('');
        setSetupDialogOpen(true);
    };

    const handleCompleteSetup = () => {
        if (selectedMethod) {
            setConfig((prev) => ({
                ...prev,
                methods: {
                    ...prev.methods,
                    [selectedMethod]: {
                        enabled: true,
                        setupDate: new Date().toISOString().split('T')[0],
                        ...(selectedMethod === 'backup' && { codesRemaining: 8 }),
                    },
                },
            }));
        }
        setSetupDialogOpen(false);
    };

    const handleDisableMethod = (method: TwoFactorMethod) => {
        setConfig((prev) => ({
            ...prev,
            methods: {
                ...prev.methods,
                [method]: { enabled: false },
            },
        }));
    };

    const handleRegenerateBackupCodes = () => {
        setConfig((prev) => ({
            ...prev,
            methods: {
                ...prev.methods,
                backup: { enabled: true, codesRemaining: 8 },
            },
        }));
        setShowBackupCodes(true);
    };

    const sectionPaperSx = {
        p: 3,
        bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
        border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
    };

    const methodConfig = [
        {
            key: 'authenticator' as TwoFactorMethod,
            icon: <PhoneIcon />,
            title: 'Authenticator App',
            description: 'Use Google Authenticator, Authy, or similar apps',
            recommended: true,
        },
        {
            key: 'sms' as TwoFactorMethod,
            icon: <PhoneIcon />,
            title: 'SMS Verification',
            description: 'Receive codes via text message',
            recommended: false,
        },
        {
            key: 'email' as TwoFactorMethod,
            icon: <EmailIcon />,
            title: 'Email Verification',
            description: 'Receive codes via email',
            recommended: false,
        },
        {
            key: 'backup' as TwoFactorMethod,
            icon: <KeyIcon />,
            title: 'Backup Codes',
            description: 'One-time use codes for emergency access',
            recommended: true,
        },
    ];

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                    Two-Factor Authentication
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Add an extra layer of security to your account
                </Typography>
            </Box>

            {/* Status Alert */}
            <Alert
                severity={config.enabled && Object.values(config.methods).some((m) => m.enabled) ? 'success' : 'warning'}
                icon={config.enabled ? <EnabledIcon /> : <DisabledIcon />}
                sx={{ mb: 3 }}
            >
                {config.enabled && Object.values(config.methods).some((m) => m.enabled)
                    ? 'Two-factor authentication is enabled for your account.'
                    : 'Two-factor authentication is not fully configured. Please enable at least one method.'}
            </Alert>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 800 }}>
                {/* Available Methods */}
                <Paper sx={sectionPaperSx}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                        <SecurityIcon sx={{ color: isDarkMode ? '#A3A3A3' : '#525252' }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Authentication Methods
                        </Typography>
                    </Box>
                    <List disablePadding>
                        {methodConfig.map((method, index) => {
                            const methodState = config.methods[method.key];
                            return (
                                <Box key={method.key}>
                                    {index > 0 && <Divider />}
                                    <ListItem sx={{ py: 2, px: 0, flexDirection: 'row', flexWrap: 'wrap', alignItems: { xs: 'flex-start', sm: 'center' } }}>
                                        <ListItemIcon sx={{ mt: { xs: 0.5, sm: 0 }, mb: { xs: 0, sm: 0 }, mr: 2, minWidth: 'auto' }}>
                                            <Box
                                                sx={{
                                                    width: 44,
                                                    height: 44,
                                                    borderRadius: 1.5,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    bgcolor: methodState.enabled
                                                        ? alpha(theme.palette.success.main, 0.1)
                                                        : isDarkMode ? '#262626' : '#F5F5F5',
                                                    color: methodState.enabled
                                                        ? theme.palette.success.main
                                                        : isDarkMode ? '#A3A3A3' : '#525252',
                                                }}
                                            >
                                                {method.icon}
                                            </Box>
                                        </ListItemIcon>
                                        <ListItemText
                                            sx={{ m: 0 }}
                                            primary={
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', mb: { xs: 0.5, sm: 0 } }}>
                                                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                        {method.title}
                                                    </Typography>
                                                    {method.recommended && (
                                                        <Chip label="Recommended" size="small" color="primary" variant="outlined" />
                                                    )}
                                                    {methodState.enabled && (
                                                        <Chip label="Enabled" size="small" color="success" />
                                                    )}
                                                </Box>
                                            }
                                            secondary={
                                                <Typography variant="body2" color="text.secondary" sx={{ mt: { xs: 1, sm: 0.5 } }}>
                                                    {method.description}
                                                    {method.key === 'backup' && config.methods.backup.enabled && config.methods.backup.codesRemaining && (
                                                        <> • {config.methods.backup.codesRemaining} codes remaining</>
                                                    )}
                                                </Typography>
                                            }
                                        />
                                        <Box sx={{ mt: { xs: 1, sm: 0 }, ml: 'auto' }}>
                                            {methodState.enabled ? (
                                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                    {method.key === 'backup' && (
                                                        <>
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                onClick={() => setShowBackupCodes(true)}
                                                            >
                                                                View Codes
                                                            </Button>
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                startIcon={<RefreshIcon />}
                                                                onClick={handleRegenerateBackupCodes}
                                                            >
                                                                Regenerate
                                                            </Button>
                                                        </>
                                                    )}
                                                    {method.key !== 'backup' && (
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleDisableMethod(method.key)}
                                                            color="error"
                                                        >
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    )}
                                                </Box>
                                            ) : (
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    startIcon={<AddIcon />}
                                                    onClick={() => handleOpenSetup(method.key)}
                                                >
                                                    Setup
                                                </Button>
                                            )}
                                        </Box>
                                    </ListItem>
                                </Box>
                            );
                        })}
                    </List>
                </Paper>

                {/* Security Tips */}
                <Paper sx={sectionPaperSx}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        Security Tips
                    </Typography>
                    <Box component="ul" sx={{ m: 0, pl: 3 }}>
                        <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Use an authenticator app for the most secure 2FA method
                        </Typography>
                        <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Always keep backup codes in a safe place
                        </Typography>
                        <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Never share your 2FA codes with anyone
                        </Typography>
                        <Typography component="li" variant="body2" color="text.secondary">
                            Enable at least two authentication methods for redundancy
                        </Typography>
                    </Box>
                </Paper>
            </Box>

            {/* Setup Dialog */}
            <Dialog open={setupDialogOpen} onClose={() => setSetupDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Setup {methodConfig.find((m) => m.key === selectedMethod)?.title}
                </DialogTitle>
                <DialogContent>
                    {selectedMethod === 'authenticator' && (
                        <Box>
                            <Stepper activeStep={activeStep} sx={{ mb: 4, mt: 2 }}>
                                {setupSteps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>

                            {activeStep === 0 && (
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="body1" gutterBottom>
                                        You'll need an authenticator app like:
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, my: 3 }}>
                                        {['Google Authenticator', 'Authy', 'Microsoft Authenticator'].map((app) => (
                                            <Chip key={app} label={app} variant="outlined" />
                                        ))}
                                    </Box>
                                    <Button variant="contained" onClick={() => setActiveStep(1)}>
                                        I have an app
                                    </Button>
                                </Box>
                            )}

                            {activeStep === 1 && (
                                <Box sx={{ textAlign: 'center' }}>
                                    <Box
                                        sx={{
                                            width: 200,
                                            height: 200,
                                            bgcolor: '#FFF',
                                            border: '1px solid #E5E5E5',
                                            borderRadius: 2,
                                            mx: 'auto',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mb: 2,
                                        }}
                                    >
                                        <QrCodeIcon sx={{ fontSize: 120, color: '#171717' }} />
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Scan this QR code with your authenticator app
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Or enter this code manually: <strong>ABCD-EFGH-IJKL-MNOP</strong>
                                        <IconButton size="small" sx={{ ml: 0.5 }}>
                                            <CopyIcon fontSize="small" />
                                        </IconButton>
                                    </Typography>
                                    <Box sx={{ mt: 3 }}>
                                        <Button variant="contained" onClick={() => setActiveStep(2)}>
                                            Continue
                                        </Button>
                                    </Box>
                                </Box>
                            )}

                            {activeStep === 2 && (
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="body1" gutterBottom>
                                        Enter the 6-digit code from your app
                                    </Typography>
                                    <TextField
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                        placeholder="000000"
                                        slotProps={{ htmlInput: {
                                            maxLength: 6,
                                            style: { textAlign: 'center', fontSize: 24, letterSpacing: 8 },
                                        } }}
                                        sx={{ my: 3, width: 200 }}
                                    />
                                    <Box>
                                        <Button
                                            variant="contained"
                                            onClick={handleCompleteSetup}
                                            disabled={verificationCode.length !== 6}
                                        >
                                            Verify & Enable
                                        </Button>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    )}

                    {selectedMethod === 'backup' && (
                        <Box sx={{ textAlign: 'center', py: 2 }}>
                            <Typography variant="body1" gutterBottom>
                                Generate backup codes for emergency access
                            </Typography>
                            <Alert severity="warning" sx={{ my: 2, textAlign: 'left' }}>
                                Store these codes securely. Each code can only be used once.
                            </Alert>
                            <Button variant="contained" onClick={handleCompleteSetup}>
                                Generate Backup Codes
                            </Button>
                        </Box>
                    )}

                    {(selectedMethod === 'sms' || selectedMethod === 'email') && (
                        <Box sx={{ py: 2 }}>
                            <TextField
                                fullWidth
                                label={selectedMethod === 'sms' ? 'Phone Number' : 'Email Address'}
                                placeholder={selectedMethod === 'sms' ? '+1 (555) 123-4567' : 'you@example.com'}
                                sx={{ mb: 3 }}
                            />
                            <Button variant="contained" fullWidth onClick={handleCompleteSetup}>
                                Send Verification Code
                            </Button>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 3, pt: 0 }}>
                    <Button onClick={() => setSetupDialogOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>

            {/* Backup Codes Dialog */}
            <Dialog open={showBackupCodes} onClose={() => setShowBackupCodes(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Backup Codes</DialogTitle>
                <DialogContent>
                    <Alert severity="warning" sx={{ mb: 3 }}>
                        Save these codes in a secure location. Each code can only be used once.
                    </Alert>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: 1,
                            p: 2,
                            bgcolor: isDarkMode ? '#0A0A0A' : '#F5F5F5',
                            borderRadius: 1,
                            fontFamily: 'monospace',
                        }}
                    >
                        {backupCodes.map((code, index) => (
                            <Typography key={index} variant="body2" sx={{ py: 0.5 }}>
                                {code}
                            </Typography>
                        ))}
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button startIcon={<CopyIcon />} onClick={() => navigator.clipboard.writeText(backupCodes.join('\n'))}>
                        Copy All
                    </Button>
                    <Button variant="contained" onClick={() => setShowBackupCodes(false)}>
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
