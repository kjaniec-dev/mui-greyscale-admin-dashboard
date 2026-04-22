import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Divider,
    Avatar,
    Chip,
    Stack,
    useTheme,
} from '@mui/material';
import {
    Close as CloseIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Business as BusinessIcon,
    LocationOn as LocationIcon,
    ShoppingCart as OrdersIcon,
    AttachMoney as MoneyIcon,
    CalendarToday as CalendarIcon,
    LocalOffer as TagIcon,
} from '@mui/icons-material';
import type { Customer } from '../../data/mockCustomers';
import { getStatusSolid } from '../../theme';
import { DetailInfoRow } from '../common/DetailInfoRow';
import { getInitials, formatDate, formatCurrency } from '../../utils/formatters';

interface CustomerDetailDrawerProps {
    open: boolean;
    onClose: () => void;
    customer: Customer | null;
}

export function CustomerDetailDrawer({ open, onClose, customer }: CustomerDetailDrawerProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    if (!customer) return null;

    const statusColors = getStatusSolid(customer.status, isDarkMode);

    const iconColor = isDarkMode ? '#A3A3A3' : '#525252';

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: { xs: '100%', sm: 420 },
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
                        Customer Details
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
                    {/* Customer Avatar and Name */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                        <Avatar
                            sx={{
                                width: 80,
                                height: 80,
                                bgcolor: isDarkMode ? '#404040' : '#E5E5E5',
                                color: isDarkMode ? '#E5E5E5' : '#171717',
                                fontSize: '2rem',
                                fontWeight: 600,
                                mb: 2,
                            }}
                        >
                            {getInitials(customer.name)}
                        </Avatar>
                        <Typography variant="h5" fontWeight={700} gutterBottom>
                            {customer.name}
                        </Typography>
                        {customer.company && (
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                {customer.company}
                            </Typography>
                        )}
                        <Chip
                            label={customer.status}
                            size="small"
                            sx={{
                                mt: 1,
                                bgcolor: statusColors.bg,
                                color: statusColors.text,
                                fontWeight: 500,
                                borderRadius: 1,
                            }}
                        />
                    </Box>

                    {/* Tags */}
                    {customer.tags.length > 0 && (
                        <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                            {customer.tags.map((tag) => (
                                <Chip
                                    key={tag}
                                    label={tag}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                        borderColor: isDarkMode ? '#404040' : '#E5E5E5',
                                        color: isDarkMode ? '#A3A3A3' : '#525252',
                                    }}
                                />
                            ))}
                        </Box>
                    )}

                    <Divider sx={{ mb: 3 }} />

                    {/* Contact Information */}
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
                            Contact Information
                        </Typography>
                        <Stack spacing={2}>
                            <DetailInfoRow
                                icon={<EmailIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Email"
                                value={customer.email}
                            />
                            <DetailInfoRow
                                icon={<PhoneIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Phone"
                                value={customer.phone}
                            />
                            {customer.company && (
                                <DetailInfoRow
                                    icon={<BusinessIcon sx={{ fontSize: 20, color: iconColor }} />}
                                    label="Company"
                                    value={customer.company}
                                />
                            )}
                        </Stack>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Address */}
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
                            Address
                        </Typography>
                        <Stack spacing={2}>
                            <DetailInfoRow
                                icon={<LocationIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Location"
                                value={
                                    <>
                                        {customer.address.street}<br />
                                        {customer.address.city}, {customer.address.state} {customer.address.zipCode}<br />
                                        {customer.address.country}
                                    </>
                                }
                            />
                        </Stack>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Order Statistics */}
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
                            Order History
                        </Typography>
                        <Stack spacing={2}>
                            <DetailInfoRow
                                icon={<OrdersIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Total Orders"
                                value={customer.totalOrders.toString()}
                            />
                            <DetailInfoRow
                                icon={<MoneyIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Total Spent"
                                value={formatCurrency(customer.totalSpent)}
                            />
                            <DetailInfoRow
                                icon={<CalendarIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Last Order"
                                value={formatDate(customer.lastOrderDate, 'Never')}
                            />
                        </Stack>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Account Info */}
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
                            Account
                        </Typography>
                        <Stack spacing={2}>
                            <DetailInfoRow
                                icon={<TagIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Customer ID"
                                value={<span style={{ fontFamily: 'monospace' }}>{customer.id}</span>}
                            />
                            <DetailInfoRow
                                icon={<CalendarIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Customer Since"
                                value={formatDate(customer.createdAt)}
                            />
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Drawer>
    );
}
