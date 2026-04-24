import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Divider,
    Chip,
    Stack,
    useTheme,
    Button,
} from '@mui/material';
import {
    Close as CloseIcon,
    Person as PersonIcon,
    Email as EmailIcon,
    CalendarToday as CalendarIcon,
    AccountBalance as BankIcon,
    CreditCard as CardIcon,
    Notes as NotesIcon,
    Refresh as RetryIcon,
    PlayArrow as ProcessIcon,
    Cancel as CancelIcon,
} from '@mui/icons-material';
import type { Payout } from '../../data/mockPayouts';
import { getStatusSolid, getToneColor } from '../../theme';
import { DetailInfoRow } from '../common/DetailInfoRow';
import { formatDateTime } from '../../utils/formatters';

interface PayoutDetailDrawerProps {
    open: boolean;
    onClose: () => void;
    payout: Payout | null;
    onProcess?: (payout: Payout) => void;
    onCancel?: (payout: Payout) => void;
    onRetry?: (payout: Payout) => void;
}

export function PayoutDetailDrawer({
    open,
    onClose,
    payout,
    onProcess,
    onCancel,
    onRetry,
}: PayoutDetailDrawerProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    if (!payout) return null;

    const getPayoutStatusColor = (status: string) => getStatusSolid(status, isDarkMode);

    const typeColors: Record<string, string> = {
        Vendor: getToneColor('info', isDarkMode).solid,
        Affiliate: getToneColor('purple', isDarkMode).solid,
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            slotProps={{ paper: {
                sx: {
                    width: { xs: '100%', sm: 420 },
                    bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                },
            } }}
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
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Payout Details
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                            {payout.id}
                        </Typography>
                    </Box>
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
                    {/* Status & Amount */}
                    <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            <Chip
                                label={payout.status}
                                sx={{
                                    bgcolor: getPayoutStatusColor(payout.status).bg,
                                    color: getPayoutStatusColor(payout.status).text,
                                    fontWeight: 600,
                                    borderRadius: 1,
                                }}
                            />
                            <Chip
                                label={payout.recipientType}
                                sx={{
                                    bgcolor: typeColors[payout.recipientType],
                                    color: '#FAFAFA',
                                    fontWeight: 500,
                                    borderRadius: 1,
                                }}
                            />
                        </Box>
                        
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
                            ${payout.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </Typography>

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
                            Recipient
                        </Typography>
                        <Stack spacing={1.5}>
                            <DetailInfoRow
                                icon={<PersonIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Name"
                                value={payout.recipientName}
                            />
                            <DetailInfoRow
                                icon={<EmailIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Email"
                                value={payout.email}
                            />
                        </Stack>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Payment Info */}
                    <Box sx={{ mb: 3 }}>
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
                            Payment Details
                        </Typography>
                        <Stack spacing={1.5}>
                            <DetailInfoRow
                                icon={<BankIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Payment Method"
                                value={payout.paymentMethod}
                            />
                            <DetailInfoRow
                                icon={<CardIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Account"
                                value={payout.accountInfo}
                            />
                        </Stack>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Dates */}
                    <Box sx={{ mb: 3 }}>
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
                            Timeline
                        </Typography>
                        <Stack spacing={1.5}>
                            <DetailInfoRow
                                icon={<CalendarIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Created"
                                value={formatDateTime(payout.createdAt)}
                            />
                            {payout.processedAt && (
                                <DetailInfoRow
                                    icon={<CalendarIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                    label="Processed"
                                    value={formatDateTime(payout.processedAt)}
                                />
                            )}
                        </Stack>
                    </Box>

                    {/* Notes */}
                    {payout.notes && (
                        <>
                            <Divider sx={{ mb: 3 }} />
                            <Box sx={{ mb: 3 }}>
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
                                    Notes
                                </Typography>
                                <Box
                                    sx={{
                                        p: 2,
                                        borderRadius: 1,
                                        bgcolor: payout.status === 'Failed'
                                            ? (isDarkMode ? 'rgba(220, 38, 38, 0.1)' : 'rgba(239, 68, 68, 0.1)')
                                            : (isDarkMode ? '#262626' : '#F5F5F5'),
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 1.5,
                                    }}
                                >
                                    <NotesIcon
                                        sx={{
                                            fontSize: 20,
                                            color: payout.status === 'Failed' ? 'error.main' : (isDarkMode ? '#A3A3A3' : '#525252'),
                                            mt: 0.25,
                                        }}
                                    />
                                    <Typography
                                        variant="body2"
                                        sx={{ color: payout.status === 'Failed' ? 'error.main' : 'text.primary' }}
                                    >
                                        {payout.notes}
                                    </Typography>
                                </Box>
                            </Box>
                        </>
                    )}
                </Box>

                {/* Actions Footer */}
                {(payout.status === 'Pending' || payout.status === 'Processing' || payout.status === 'Failed') && (
                    <Box
                        sx={{
                            p: 3,
                            borderTop: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
                            display: 'flex',
                            gap: 2,
                        }}
                    >
                        {payout.status === 'Pending' && onProcess && (
                            <Button
                                variant="contained"
                                startIcon={<ProcessIcon />}
                                onClick={() => onProcess(payout)}
                                fullWidth
                            >
                                Process Payout
                            </Button>
                        )}
                        {payout.status === 'Failed' && onRetry && (
                            <Button
                                variant="contained"
                                startIcon={<RetryIcon />}
                                onClick={() => onRetry(payout)}
                                fullWidth
                            >
                                Retry Payout
                            </Button>
                        )}
                        {(payout.status === 'Pending' || payout.status === 'Processing') && onCancel && (
                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<CancelIcon />}
                                onClick={() => onCancel(payout)}
                                fullWidth={payout.status === 'Processing'}
                            >
                                Cancel
                            </Button>
                        )}
                    </Box>
                )}
            </Box>
        </Drawer>
    );
}
