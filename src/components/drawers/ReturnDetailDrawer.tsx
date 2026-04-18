import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Divider,
    Chip,
    Stack,
    useTheme,
} from '@mui/material';
import {
    Close as CloseIcon,
    AssignmentReturn as ReturnIcon,
    ShoppingCart as OrderIcon,
    Inventory as ProductIcon,
    Person as PersonIcon,
    Email as EmailIcon,
    CalendarToday as CalendarIcon,
    CheckCircle as ResolvedIcon,
    AttachMoney as MoneyIcon,
    Notes as NotesIcon,
} from '@mui/icons-material';
import type { Return } from '../../data/mockReturns';
import { DetailInfoRow } from '../common/DetailInfoRow';

interface ReturnDetailDrawerProps {
    open: boolean;
    onClose: () => void;
    returnItem: Return | null;
}

function formatDate(date: Date | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

export function ReturnDetailDrawer({ open, onClose, returnItem }: ReturnDetailDrawerProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    if (!returnItem) return null;

    const statusColors = {
        'Pending': isDarkMode ? '#D97706' : '#F59E0B',
        'Approved': isDarkMode ? '#22C55E' : '#16A34A',
        'Rejected': isDarkMode ? '#DC2626' : '#EF4444',
        'Refunded': isDarkMode ? '#3B82F6' : '#2563EB',
        'Replaced': isDarkMode ? '#8B5CF6' : '#7C3AED',
    };

    const reasonColors: Record<string, string> = {
        'Defective': isDarkMode ? '#DC2626' : '#EF4444',
        'Wrong Item': isDarkMode ? '#D97706' : '#F59E0B',
        'Changed Mind': isDarkMode ? '#525252' : '#737373',
        'Not as Described': isDarkMode ? '#D97706' : '#F59E0B',
        'Damaged': isDarkMode ? '#DC2626' : '#EF4444',
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: { xs: '100%', sm: 400 },
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
                        Return Details
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
                    {/* Return ID and Status */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                        <Box
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: 2,
                                bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 2,
                            }}
                        >
                            <ReturnIcon sx={{ fontSize: 40, color: isDarkMode ? '#A3A3A3' : '#525252' }} />
                        </Box>
                        <Typography variant="h5" fontWeight={700} gutterBottom textAlign="center">
                            {returnItem.id}
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                            <Chip
                                label={returnItem.status}
                                size="small"
                                sx={{
                                    bgcolor: statusColors[returnItem.status],
                                    color: '#FAFAFA',
                                    fontWeight: 500,
                                    borderRadius: 1,
                                }}
                            />
                            <Chip
                                label={returnItem.reason}
                                size="small"
                                sx={{
                                    bgcolor: reasonColors[returnItem.reason],
                                    color: '#FAFAFA',
                                    fontWeight: 500,
                                    borderRadius: 1,
                                }}
                            />
                        </Stack>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Order & Product */}
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
                            Order & Product
                        </Typography>
                        <Stack spacing={2}>
                            <DetailInfoRow
                                icon={<OrderIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Order ID"
                                value={returnItem.orderId}
                            />
                            <DetailInfoRow
                                icon={<ProductIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Product"
                                value={`${returnItem.productName} (Qty: ${returnItem.quantity})`}
                            />
                        </Stack>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Customer */}
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
                            Customer
                        </Typography>
                        <Stack spacing={2}>
                            <DetailInfoRow
                                icon={<PersonIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Name"
                                value={returnItem.customerName}
                            />
                            <DetailInfoRow
                                icon={<EmailIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Email"
                                value={returnItem.customerEmail}
                            />
                        </Stack>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Resolution */}
                    {(returnItem.refundAmount || returnItem.resolvedAt) && (
                        <>
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
                                    Resolution
                                </Typography>
                                <Stack spacing={2}>
                                    {returnItem.refundAmount && (
                                        <DetailInfoRow
                                            icon={<MoneyIcon sx={{ fontSize: 20, color: isDarkMode ? '#22C55E' : '#16A34A' }} />}
                                            label="Refund Amount"
                                            value={formatCurrency(returnItem.refundAmount)}
                                        />
                                    )}
                                    {returnItem.resolvedAt && (
                                        <DetailInfoRow
                                            icon={<ResolvedIcon sx={{ fontSize: 20, color: isDarkMode ? '#22C55E' : '#16A34A' }} />}
                                            label="Resolved At"
                                            value={formatDate(returnItem.resolvedAt)}
                                        />
                                    )}
                                </Stack>
                            </Box>
                            <Divider sx={{ mb: 3 }} />
                        </>
                    )}

                    {/* Notes */}
                    {returnItem.notes && (
                        <>
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
                                    Notes
                                </Typography>
                                <DetailInfoRow
                                    icon={<NotesIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                    label="Customer Note"
                                    value={returnItem.notes}
                                />
                            </Box>
                            <Divider sx={{ mb: 3 }} />
                        </>
                    )}

                    {/* Timestamps */}
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
                            Timeline
                        </Typography>
                        <Stack spacing={2}>
                            <DetailInfoRow
                                icon={<CalendarIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Requested At"
                                value={formatDate(returnItem.requestedAt)}
                            />
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Drawer>
    );
}
