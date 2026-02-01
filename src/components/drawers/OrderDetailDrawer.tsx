import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Divider,
    Chip,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    useTheme,
} from '@mui/material';
import {
    Close as CloseIcon,
    Person as PersonIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocalShipping as ShippingIcon,
    Payment as PaymentIcon,
    CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import type { Order } from '../../data/mockOrders';

interface OrderDetailDrawerProps {
    open: boolean;
    onClose: () => void;
    order: Order | null;
}

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

function formatDate(date: Date | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function OrderDetailDrawer({ open, onClose, order }: OrderDetailDrawerProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    if (!order) return null;

    const statusColors = {
        Pending: { bg: isDarkMode ? '#525252' : '#A3A3A3', text: isDarkMode ? '#FAFAFA' : '#171717' },
        Processing: { bg: isDarkMode ? '#1E40AF' : '#3B82F6', text: '#FAFAFA' },
        Shipped: { bg: isDarkMode ? '#7C3AED' : '#8B5CF6', text: '#FAFAFA' },
        Delivered: { bg: isDarkMode ? '#A3A3A3' : '#525252', text: isDarkMode ? '#171717' : '#FAFAFA' },
        Cancelled: { bg: isDarkMode ? '#DC2626' : '#EF4444', text: '#FAFAFA' },
    };

    const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
                sx={{
                    width: 36,
                    height: 36,
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
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: { xs: '100%', sm: 480 },
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
                    <Box>
                        <Typography variant="h6" fontWeight={700}>
                            Order Details
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                            {order.orderNumber}
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
                    {/* Status & Date */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                        <Chip
                            label={order.status}
                            sx={{
                                bgcolor: statusColors[order.status].bg,
                                color: statusColors[order.status].text,
                                fontWeight: 600,
                                borderRadius: 1,
                            }}
                        />
                        <Typography variant="body2" color="text.secondary">
                            {formatDate(order.createdAt)}
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Customer Info */}
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
                            Customer
                        </Typography>
                        <Stack spacing={1.5}>
                            <InfoRow
                                icon={<PersonIcon sx={{ fontSize: 18, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Name"
                                value={order.customer.name}
                            />
                            <InfoRow
                                icon={<EmailIcon sx={{ fontSize: 18, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Email"
                                value={order.customer.email}
                            />
                            {order.customer.phone && (
                                <InfoRow
                                    icon={<PhoneIcon sx={{ fontSize: 18, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                    label="Phone"
                                    value={order.customer.phone}
                                />
                            )}
                        </Stack>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Order Items */}
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
                            Items ({order.items.length})
                        </Typography>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 600, borderColor: isDarkMode ? '#404040' : '#E5E5E5' }}>Product</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 600, borderColor: isDarkMode ? '#404040' : '#E5E5E5' }}>Qty</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 600, borderColor: isDarkMode ? '#404040' : '#E5E5E5' }}>Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {order.items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell sx={{ borderColor: isDarkMode ? '#404040' : '#E5E5E5' }}>
                                            <Typography variant="body2" fontWeight={500}>{item.productName}</Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {formatCurrency(item.unitPrice)} each
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center" sx={{ borderColor: isDarkMode ? '#404040' : '#E5E5E5' }}>{item.quantity}</TableCell>
                                        <TableCell align="right" sx={{ borderColor: isDarkMode ? '#404040' : '#E5E5E5', fontWeight: 500 }}>
                                            {formatCurrency(item.total)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>

                    {/* Order Summary */}
                    <Box
                        sx={{
                            p: 2,
                            borderRadius: 1,
                            bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                            mb: 3,
                        }}
                    >
                        <Stack spacing={1}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" color="text.secondary">Subtotal</Typography>
                                <Typography variant="body2">{formatCurrency(order.subtotal)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" color="text.secondary">Tax</Typography>
                                <Typography variant="body2">{formatCurrency(order.tax)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" color="text.secondary">Shipping</Typography>
                                <Typography variant="body2">{order.shipping === 0 ? 'Free' : formatCurrency(order.shipping)}</Typography>
                            </Box>
                            <Divider />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body1" fontWeight={700}>Total</Typography>
                                <Typography variant="body1" fontWeight={700}>{formatCurrency(order.total)}</Typography>
                            </Box>
                        </Stack>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Payment & Shipping */}
                    <Stack spacing={3}>
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
                                Payment
                            </Typography>
                            <InfoRow
                                icon={<PaymentIcon sx={{ fontSize: 18, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label={order.paymentMethod}
                                value={
                                    <Chip
                                        label={order.paymentStatus}
                                        size="small"
                                        sx={{
                                            bgcolor: order.paymentStatus === 'Paid'
                                                ? (isDarkMode ? '#A3A3A3' : '#525252')
                                                : order.paymentStatus === 'Pending'
                                                    ? (isDarkMode ? '#D97706' : '#F59E0B')
                                                    : (isDarkMode ? '#DC2626' : '#EF4444'),
                                            color: order.paymentStatus === 'Paid'
                                                ? (isDarkMode ? '#171717' : '#FAFAFA')
                                                : '#FAFAFA',
                                            fontWeight: 500,
                                            borderRadius: 1,
                                        }}
                                    />
                                }
                            />
                        </Box>

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
                                Shipping Address
                            </Typography>
                            <InfoRow
                                icon={<ShippingIcon sx={{ fontSize: 18, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Address"
                                value={
                                    <>
                                        {order.shippingAddress.street}<br />
                                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                                        {order.shippingAddress.country}
                                    </>
                                }
                            />
                        </Box>

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
                            <InfoRow
                                icon={<CalendarIcon sx={{ fontSize: 18, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Last Updated"
                                value={formatDate(order.updatedAt)}
                            />
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </Drawer>
    );
}
