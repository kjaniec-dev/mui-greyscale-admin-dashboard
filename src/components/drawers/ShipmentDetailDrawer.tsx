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
    LocalShipping as ShippingIcon,
    ShoppingCart as OrderIcon,
    Person as PersonIcon,
    CalendarToday as CalendarIcon,
    LocationOn as LocationIcon,
    AttachMoney as MoneyIcon,
    Scale as WeightIcon,
    Flight as MethodIcon,
    ConfirmationNumber as TrackingIcon,
    Business as CarrierIcon,
} from '@mui/icons-material';
import type { Shipment } from '../../data/mockShipments';
import { DetailInfoRow } from '../common/DetailInfoRow';
import { getStatusSolid } from '../../theme';
import { formatDate, formatCurrency } from '../../utils/formatters';

interface ShipmentDetailDrawerProps {
    open: boolean;
    onClose: () => void;
    shipment: Shipment | null;
}

export function ShipmentDetailDrawer({ open, onClose, shipment }: ShipmentDetailDrawerProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    if (!shipment) return null;

    const statusColors = getStatusSolid(shipment.status, isDarkMode);

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
                        Shipment Details
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
                    {/* Shipment ID and Status */}
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
                            <ShippingIcon sx={{ fontSize: 40, color: isDarkMode ? '#A3A3A3' : '#525252' }} />
                        </Box>
                        <Typography variant="h5" fontWeight={700} gutterBottom textAlign="center">
                            {shipment.id}
                        </Typography>
                        <Chip
                            label={shipment.status}
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

                    {/* Order Info */}
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
                            Order Information
                        </Typography>
                        <Stack spacing={2}>
                            <DetailInfoRow
                                icon={<OrderIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Order Number"
                                value={shipment.orderNumber}
                            />
                            <DetailInfoRow
                                icon={<PersonIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Customer"
                                value={shipment.customerName}
                            />
                        </Stack>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Carrier & Tracking */}
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
                            Carrier & Tracking
                        </Typography>
                        <Stack spacing={2}>
                            <DetailInfoRow
                                icon={<CarrierIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Carrier"
                                value={shipment.carrier}
                            />
                            <DetailInfoRow
                                icon={<TrackingIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Tracking Number"
                                value={
                                    <Typography variant="body2" fontWeight={500} sx={{ fontFamily: 'monospace' }}>
                                        {shipment.trackingNumber}
                                    </Typography>
                                }
                            />
                        </Stack>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Route */}
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
                            Route
                        </Typography>
                        <Stack spacing={2}>
                            <DetailInfoRow
                                icon={<LocationIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Origin"
                                value={shipment.origin}
                            />
                            <DetailInfoRow
                                icon={<LocationIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Destination"
                                value={shipment.destination}
                            />
                        </Stack>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Shipping Details */}
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
                            Shipping Details
                        </Typography>
                        <Stack spacing={2}>
                            <DetailInfoRow
                                icon={<MethodIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Shipping Method"
                                value={shipment.shippingMethod}
                            />
                            <DetailInfoRow
                                icon={<WeightIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Weight"
                                value={`${shipment.weight} lbs`}
                            />
                            <DetailInfoRow
                                icon={<MoneyIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Shipping Cost"
                                value={formatCurrency(shipment.shippingCost)}
                            />
                        </Stack>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Timeline */}
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
                                label="Created"
                                value={formatDate(shipment.createdAt)}
                            />
                            <DetailInfoRow
                                icon={<CalendarIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Estimated Delivery"
                                value={formatDate(shipment.estimatedDelivery)}
                            />
                            {shipment.actualDelivery && (
                                <DetailInfoRow
                                    icon={<CalendarIcon sx={{ fontSize: 20, color: isDarkMode ? '#22C55E' : '#16A34A' }} />}
                                    label="Actual Delivery"
                                    value={formatDate(shipment.actualDelivery)}
                                />
                            )}
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Drawer>
    );
}
