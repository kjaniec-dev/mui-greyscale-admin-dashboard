import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Typography,
    Paper,
    Chip,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Breadcrumbs,
    Link,
    Divider,
    useTheme,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Person as PersonIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocalShipping as ShippingIcon,
    Payment as PaymentIcon,

    Edit as EditIcon,
} from '@mui/icons-material';
import { mockOrders } from '../../data/mockOrders';
import { OrderTracking } from './components/OrderTracking';
import { getStatusSolid } from '../../theme';

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

export function OrderDetailsPage() {
    const navigate = useNavigate();
    const { orderId } = useParams<{ orderId: string }>();
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    // Find order by ID or orderNumber, fallback to first order for demo
    const order = mockOrders.find(o => o.id === orderId || o.orderNumber === orderId) || mockOrders[0];

    const getOrderStatusColor = (status: string) => getStatusSolid(status, isDarkMode);

    const sectionSx = {
        p: 3,
        bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
        border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
        borderRadius: 2,
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
            {/* Breadcrumbs */}
            <Breadcrumbs sx={{ mb: 2 }}>
                <Link
                    component="button"
                    underline="hover"
                    color="inherit"
                    onClick={() => navigate('/orders')}
                    sx={{ cursor: 'pointer' }}
                >
                    Orders
                </Link>
                <Typography color="text.primary">{order.orderNumber}</Typography>
            </Breadcrumbs>

            {/* Page Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <Typography variant="h4" fontWeight={700}>
                            Order {order.orderNumber}
                        </Typography>
                        <Chip
                            label={order.status}
                            sx={{
                                bgcolor: getOrderStatusColor(order.status).bg,
                                color: getOrderStatusColor(order.status).text,
                                fontWeight: 600,
                                borderRadius: 1,
                            }}
                        />
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                        Placed on {formatDate(order.createdAt)}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate('/orders')}
                    >
                        Back to Orders
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        sx={{
                            bgcolor: '#171717',
                            color: '#FAFAFA',
                            '&:hover': { bgcolor: '#262626' },
                        }}
                    >
                        Edit Order
                    </Button>
                </Box>
            </Box>

            <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' } }}>
                {/* Left Column */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Order Items */}
                    <Paper sx={sectionSx}>
                        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                            Items ({order.items.length})
                        </Typography>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 600, borderColor: isDarkMode ? '#404040' : '#E5E5E5' }}>Product</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 600, borderColor: isDarkMode ? '#404040' : '#E5E5E5' }}>Qty</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 600, borderColor: isDarkMode ? '#404040' : '#E5E5E5' }}>Unit Price</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 600, borderColor: isDarkMode ? '#404040' : '#E5E5E5' }}>Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {order.items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell sx={{ borderColor: isDarkMode ? '#404040' : '#E5E5E5' }}>
                                            <Typography variant="body2" fontWeight={500}>{item.productName}</Typography>
                                        </TableCell>
                                        <TableCell align="center" sx={{ borderColor: isDarkMode ? '#404040' : '#E5E5E5' }}>{item.quantity}</TableCell>
                                        <TableCell align="right" sx={{ borderColor: isDarkMode ? '#404040' : '#E5E5E5' }}>{formatCurrency(item.unitPrice)}</TableCell>
                                        <TableCell align="right" sx={{ borderColor: isDarkMode ? '#404040' : '#E5E5E5', fontWeight: 500 }}>
                                            {formatCurrency(item.total)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Order Summary */}
                        <Box sx={{ mt: 3, p: 2, borderRadius: 1, bgcolor: isDarkMode ? '#262626' : '#F5F5F5' }}>
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
                    </Paper>

                    {/* Customer Information */}
                    <Paper sx={sectionSx}>
                        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                            Customer Information
                        </Typography>
                        <Stack spacing={2}>
                            <InfoRow
                                icon={<PersonIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Name"
                                value={order.customer.name}
                            />
                            <InfoRow
                                icon={<EmailIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Email"
                                value={order.customer.email}
                            />
                            {order.customer.phone && (
                                <InfoRow
                                    icon={<PhoneIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                    label="Phone"
                                    value={order.customer.phone}
                                />
                            )}
                        </Stack>
                    </Paper>
                </Box>

                {/* Right Column */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Payment */}
                    <Paper sx={sectionSx}>
                        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                            Payment
                        </Typography>
                        <InfoRow
                            icon={<PaymentIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                            label={order.paymentMethod}
                            value={
                                <Chip
                                    label={order.paymentStatus}
                                    size="small"
                                    sx={{
                                        bgcolor: getOrderStatusColor(order.paymentStatus).bg,
                                        color: getOrderStatusColor(order.paymentStatus).text,
                                        fontWeight: 500,
                                        borderRadius: 1,
                                    }}
                                />
                            }
                        />
                    </Paper>

                    {/* Shipping Address */}
                    <Paper sx={sectionSx}>
                        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                            Shipping Address
                        </Typography>
                        <InfoRow
                            icon={<ShippingIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                            label="Address"
                            value={
                                <>
                                    {order.shippingAddress.street}<br />
                                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                                    {order.shippingAddress.country}
                                </>
                            }
                        />
                    </Paper>

                    {/* Timeline */}
                    {/* Timeline */}
                    <OrderTracking order={order} />
                </Box>
            </Box>
        </Box>
    );
}
