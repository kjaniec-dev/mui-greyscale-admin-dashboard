import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Divider,
    Chip,
    Stack,
    Rating,
    useTheme,
} from '@mui/material';
import {
    Close as CloseIcon,
    Business as BusinessIcon,
    LocationOn as LocationIcon,
    Person as PersonIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    CalendarToday as CalendarIcon,
    ShoppingCart as OrdersIcon,
    LocalShipping as DeliveryIcon,
} from '@mui/icons-material';
import type { Supplier } from '../../data/mockSuppliers';
import { DetailInfoRow } from '../common/DetailInfoRow';
import { getStatusSolid, getToneColor } from '../../theme';
import { formatDate } from '../../utils/formatters';

interface SupplierDetailDrawerProps {
    open: boolean;
    onClose: () => void;
    supplier: Supplier | null;
}

export function SupplierDetailDrawer({ open, onClose, supplier }: SupplierDetailDrawerProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    if (!supplier) return null;

    const statusColors = getStatusSolid(supplier.status, isDarkMode);

    const getDeliveryColor = () => {
        if (supplier.onTimeDelivery >= 95) return getToneColor('success', isDarkMode).solid;
        if (supplier.onTimeDelivery >= 85) return getToneColor('warning', isDarkMode).solid;
        return getToneColor('error', isDarkMode).solid;
    };

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
                        Supplier Details
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
                    {/* Supplier Name and Status */}
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
                            <BusinessIcon sx={{ fontSize: 40, color: isDarkMode ? '#A3A3A3' : '#525252' }} />
                        </Box>
                        <Typography variant="h5" fontWeight={700} gutterBottom textAlign="center">
                            {supplier.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <Rating
                                value={supplier.rating}
                                precision={0.1}
                                size="small"
                                readOnly
                                sx={{
                                    '& .MuiRating-iconFilled': {
                                        color: isDarkMode ? '#D4D4D4' : '#525252',
                                    },
                                    '& .MuiRating-iconEmpty': {
                                        color: isDarkMode ? '#404040' : '#E5E5E5',
                                    },
                                }}
                            />
                            <Typography variant="body2" color="text.secondary">
                                ({supplier.rating})
                            </Typography>
                        </Box>
                        <Chip
                            label={supplier.status}
                            size="small"
                            sx={{
                                bgcolor: statusColors.bg,
                                color: statusColors.text,
                                fontWeight: 500,
                                borderRadius: 1,
                            }}
                        />
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Performance */}
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
                            Performance
                        </Typography>
                        <Stack spacing={2}>
                            <DetailInfoRow
                                icon={<OrdersIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Total Orders"
                                value={supplier.totalOrders.toLocaleString()}
                            />
                            <DetailInfoRow
                                icon={<DeliveryIcon sx={{ fontSize: 20, color: getDeliveryColor() }} />}
                                label="On-Time Delivery"
                                value={
                                    <Typography variant="body2" fontWeight={500} sx={{ color: getDeliveryColor() }}>
                                        {supplier.onTimeDelivery}%
                                    </Typography>
                                }
                            />
                        </Stack>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Contact */}
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
                            Contact
                        </Typography>
                        <Stack spacing={2}>
                            <DetailInfoRow
                                icon={<PersonIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Contact Person"
                                value={supplier.contactName}
                            />
                            <DetailInfoRow
                                icon={<EmailIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Email"
                                value={supplier.email}
                            />
                            <DetailInfoRow
                                icon={<PhoneIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Phone"
                                value={supplier.phone}
                            />
                        </Stack>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Location */}
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
                            Location
                        </Typography>
                        <Stack spacing={2}>
                            <DetailInfoRow
                                icon={<LocationIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Address"
                                value={`${supplier.address}, ${supplier.city}, ${supplier.country}`}
                            />
                        </Stack>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

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
                            Information
                        </Typography>
                        <Stack spacing={2}>
                            <DetailInfoRow
                                icon={<CalendarIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Partner Since"
                                value={formatDate(supplier.createdAt)}
                            />
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Drawer>
    );
}
