import { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Switch,
    FormControl,
    Select,
    MenuItem,
    Button,
    Stack,
    Snackbar,
    Alert,
    TextField,
    useTheme,
    Chip,
    Collapse,
    IconButton,
    Divider,
    Tooltip,
    InputAdornment,
} from '@mui/material';
import {
    Save as SaveIcon,
    ExpandMore as ExpandMoreIcon,
    ContentCopy as CopyIcon,
    CheckCircle as CheckIcon,
    Warning as WarningIcon,
    CreditCard as CardIcon,
    AccountBalance as BankIcon,
    Wallet as WalletIcon,
} from '@mui/icons-material';
import {
    mockPaymentGateways,
    paymentProviderInfo,
    formatTransactionFee,
    getCredentialFields,
    type PaymentGateway,
    type GatewayMode,
} from '../../data/mockPaymentGateways';

export function PaymentGatewaysPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const [gateways, setGateways] = useState<PaymentGateway[]>(mockPaymentGateways);
    const [expandedGateways, setExpandedGateways] = useState<Set<string>>(new Set(['gateway-001']));
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setIsSaving(false);
        setSnackbarMessage('Payment gateway settings saved successfully!');
        setShowSuccess(true);
    };

    const handleToggleGateway = (id: string, enabled: boolean) => {
        setGateways(gateways.map((g) => (g.id === id ? { ...g, enabled } : g)));
        if (enabled && !expandedGateways.has(id)) {
            setExpandedGateways(new Set([...expandedGateways, id]));
        }
    };

    const handleModeChange = (id: string, mode: GatewayMode) => {
        setGateways(gateways.map((g) => (g.id === id ? { ...g, mode } : g)));
    };

    const handleCredentialChange = (
        id: string,
        key: keyof PaymentGateway['credentials'],
        value: string
    ) => {
        setGateways(
            gateways.map((g) =>
                g.id === id
                    ? { ...g, credentials: { ...g.credentials, [key]: value } }
                    : g
            )
        );
    };

    const handleToggleExpand = (id: string) => {
        const newExpanded = new Set(expandedGateways);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedGateways(newExpanded);
    };

    const handleCopyWebhook = async (url: string) => {
        await navigator.clipboard.writeText(url);
        setSnackbarMessage('Webhook URL copied to clipboard');
        setShowSuccess(true);
    };

    const handleTestConnection = (gateway: PaymentGateway) => {
        setSnackbarMessage(`Testing connection to ${gateway.name}...`);
        setShowSuccess(true);
        setTimeout(() => {
            setSnackbarMessage(`${gateway.name} connection successful!`);
            setShowSuccess(true);
        }, 1500);
    };

    const sectionPaperSx = {
        p: 3,
        bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
        border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
        borderRadius: 2,
    };

    const inputSx = {
        bgcolor: isDarkMode ? '#0A0A0A' : '#FAFAFA',
    };

    const enabledGateways = gateways.filter((g) => g.enabled);

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                        Payment Gateways
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Configure payment providers to accept online payments
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

            {/* Security Alert */}
            {enabledGateways.length > 0 && (
                <Alert severity="info" icon={<WarningIcon />} sx={{ mb: 3 }}>
                    Payment processing is PCI DSS compliant. Never store sensitive card data directly in your systems.
                </Alert>
            )}

            {/* Active Gateways Summary */}
            {enabledGateways.length > 0 && (
                <Paper sx={{ ...sectionPaperSx, mb: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        Active Payment Methods
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {enabledGateways.map((gateway) => (
                            <Chip
                                key={gateway.id}
                                label={`${gateway.name} (${gateway.mode})`}
                                color={gateway.mode === 'live' ? 'success' : 'warning'}
                                icon={<CheckIcon />}
                            />
                        ))}
                    </Box>
                </Paper>
            )}

            {/* Payment Gateway Cards */}
            <Stack spacing={3}>
                {gateways.map((gateway) => {
                    const providerInfo = paymentProviderInfo[gateway.provider];
                    const isExpanded = expandedGateways.has(gateway.id);
                    const credentialFields = getCredentialFields(gateway.provider);

                    return (
                        <Paper key={gateway.id} sx={sectionPaperSx}>
                            {/* Gateway Header */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    mb: gateway.enabled ? 2 : 0,
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                                    <Box
                                        sx={{
                                            width: 56,
                                            height: 56,
                                            borderRadius: 2,
                                            bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '28px',
                                        }}
                                    >
                                        {providerInfo.icon}
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                {providerInfo.displayName}
                                            </Typography>
                                            {gateway.enabled && (
                                                <Chip
                                                    label={gateway.mode === 'live' ? 'Live' : 'Test'}
                                                    size="small"
                                                    color={gateway.mode === 'live' ? 'success' : 'warning'}
                                                />
                                            )}
                                        </Box>
                                        <Typography variant="body2" color="text.secondary">
                                            {providerInfo.description}
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                                            {gateway.supported.cards && (
                                                <Chip
                                                    icon={<CardIcon />}
                                                    label="Cards"
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            )}
                                            {gateway.supported.ach && (
                                                <Chip
                                                    icon={<BankIcon />}
                                                    label="ACH"
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            )}
                                            {gateway.supported.wallets && (
                                                <Chip
                                                    icon={<WalletIcon />}
                                                    label="Wallets"
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            )}
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Switch
                                        checked={gateway.enabled}
                                        onChange={(e) => handleToggleGateway(gateway.id, e.target.checked)}
                                    />
                                    {gateway.enabled && (
                                        <IconButton
                                            onClick={() => handleToggleExpand(gateway.id)}
                                            sx={{
                                                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                                transition: 'transform 0.2s',
                                            }}
                                        >
                                            <ExpandMoreIcon />
                                        </IconButton>
                                    )}
                                </Box>
                            </Box>

                            {/* Gateway Configuration (Collapsible) */}
                            <Collapse in={gateway.enabled && isExpanded}>
                                <Divider sx={{ my: 2 }} />
                                <Stack spacing={2.5}>
                                    {/* Mode Selection */}
                                    <Box>
                                        <Typography variant="body2" gutterBottom sx={{ fontWeight: 500 }}>
                                            Mode
                                        </Typography>
                                        <FormControl size="small" fullWidth sx={{ maxWidth: 200 }}>
                                            <Select
                                                value={gateway.mode}
                                                onChange={(e) =>
                                                    handleModeChange(gateway.id, e.target.value as GatewayMode)
                                                }
                                                sx={inputSx}
                                            >
                                                <MenuItem value="test">Test Mode</MenuItem>
                                                <MenuItem value="live">Live Mode</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                                            {gateway.mode === 'test'
                                                ? 'Use test API keys for development'
                                                : 'Live mode processes real payments'}
                                        </Typography>
                                    </Box>

                                    {/* API Credentials */}
                                    <Box>
                                        <Typography variant="body2" gutterBottom sx={{ fontWeight: 500 }}>
                                            API Credentials
                                        </Typography>
                                        <Stack spacing={1.5}>
                                            {credentialFields.map((field) => (
                                                <TextField
                                                    key={field.key}
                                                    size="small"
                                                    label={field.label}
                                                    type={field.type || 'text'}
                                                    value={gateway.credentials[field.key] || ''}
                                                    onChange={(e) =>
                                                        handleCredentialChange(gateway.id, field.key, e.target.value)
                                                    }
                                                    fullWidth
                                                    sx={inputSx}
                                                />
                                            ))}
                                        </Stack>
                                    </Box>

                                    {/* Webhook URL */}
                                    {gateway.webhookUrl && (
                                        <Box>
                                            <Typography variant="body2" gutterBottom sx={{ fontWeight: 500 }}>
                                                Webhook URL
                                            </Typography>
                                            <TextField
                                                size="small"
                                                value={gateway.webhookUrl}
                                                fullWidth
                                                slotProps={{ input: {
                                                    readOnly: true,
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <Tooltip title="Copy URL">
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => handleCopyWebhook(gateway.webhookUrl!)}
                                                                >
                                                                    <CopyIcon fontSize="small" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </InputAdornment>
                                                    ),
                                                } }}
                                                sx={inputSx}
                                            />
                                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                                                Configure this URL in your {gateway.name} dashboard
                                            </Typography>
                                        </Box>
                                    )}

                                    {/* Transaction Fee */}
                                    <Box>
                                        <Typography variant="body2" gutterBottom sx={{ fontWeight: 500 }}>
                                            Transaction Fee
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {formatTransactionFee(gateway.transactionFee)} per transaction
                                        </Typography>
                                    </Box>

                                    {/* Test Connection Button */}
                                    <Box>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => handleTestConnection(gateway)}
                                        >
                                            Test Connection
                                        </Button>
                                    </Box>
                                </Stack>
                            </Collapse>
                        </Paper>
                    );
                })}
            </Stack>

            {/* Snackbar */}
            <Snackbar
                open={showSuccess}
                autoHideDuration={3000}
                onClose={() => setShowSuccess(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity="success" onClose={() => setShowSuccess(false)}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}
