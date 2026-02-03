import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Divider,
    Chip,
    Stack,
    LinearProgress,
    useTheme,
} from '@mui/material';
import {
    Close as CloseIcon,
    Warehouse as WarehouseIcon,
    LocationOn as LocationIcon,
    Person as PersonIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    CalendarToday as CalendarIcon,
    Inventory as InventoryIcon,
} from '@mui/icons-material';
import type { Warehouse } from '../../data/mockWarehouses';

interface WarehouseDetailDrawerProps {
    open: boolean;
    onClose: () => void;
    warehouse: Warehouse | null;
}

function formatDate(date: Date | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function WarehouseDetailDrawer({ open, onClose, warehouse }: WarehouseDetailDrawerProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    if (!warehouse) return null;

    const statusColors = {
        'Active': isDarkMode ? '#22C55E' : '#16A34A',
        'Inactive': isDarkMode ? '#A3A3A3' : '#525252',
        'Maintenance': isDarkMode ? '#D97706' : '#F59E0B',
    };

    const usedPercent = (warehouse.usedCapacity / warehouse.capacity) * 100;
    const getCapacityColor = () => {
        if (usedPercent >= 90) return isDarkMode ? '#DC2626' : '#EF4444';
        if (usedPercent >= 70) return isDarkMode ? '#D97706' : '#F59E0B';
        return isDarkMode ? '#22C55E' : '#16A34A';
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
                        Warehouse Details
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
                    {/* Warehouse Name and Status */}
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
                            <WarehouseIcon sx={{ fontSize: 40, color: isDarkMode ? '#A3A3A3' : '#525252' }} />
                        </Box>
                        <Typography variant="h5" fontWeight={700} gutterBottom textAlign="center">
                            {warehouse.name}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                fontFamily: 'monospace',
                                color: isDarkMode ? '#A3A3A3' : '#737373',
                                mb: 2,
                            }}
                        >
                            {warehouse.code}
                        </Typography>
                        <Chip
                            label={warehouse.status}
                            size="small"
                            sx={{
                                bgcolor: statusColors[warehouse.status],
                                color: '#FAFAFA',
                                fontWeight: 500,
                                borderRadius: 1,
                            }}
                        />
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Capacity */}
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
                            Capacity
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2" fontWeight={500}>
                                    {warehouse.usedCapacity.toLocaleString()} used
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    of {warehouse.capacity.toLocaleString()}
                                </Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={usedPercent}
                                sx={{
                                    height: 10,
                                    borderRadius: 1,
                                    bgcolor: isDarkMode ? '#404040' : '#E5E5E5',
                                    '& .MuiLinearProgress-bar': {
                                        bgcolor: getCapacityColor(),
                                        borderRadius: 1,
                                    },
                                }}
                            />
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                                {usedPercent.toFixed(1)}% utilized
                            </Typography>
                        </Box>
                        <InfoRow
                            icon={<InventoryIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                            label="Available Space"
                            value={`${(warehouse.capacity - warehouse.usedCapacity).toLocaleString()} units`}
                        />
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
                            <InfoRow
                                icon={<LocationIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Address"
                                value={`${warehouse.address}, ${warehouse.city}, ${warehouse.country}`}
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
                            <InfoRow
                                icon={<PersonIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Manager"
                                value={warehouse.manager}
                            />
                            <InfoRow
                                icon={<PhoneIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Phone"
                                value={warehouse.phone}
                            />
                            <InfoRow
                                icon={<EmailIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Email"
                                value={warehouse.email}
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
                            <InfoRow
                                icon={<CalendarIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Created At"
                                value={formatDate(warehouse.createdAt)}
                            />
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Drawer>
    );
}
