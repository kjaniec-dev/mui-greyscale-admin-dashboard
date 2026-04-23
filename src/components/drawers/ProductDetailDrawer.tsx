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
    Inventory as InventoryIcon,
    Category as CategoryIcon,
    AttachMoney as MoneyIcon,
    Numbers as NumbersIcon,
    CalendarToday as CalendarIcon,
    Update as UpdateIcon,
} from '@mui/icons-material';
import type { Product } from '../../data/mockProducts';
import { DetailInfoRow } from '../common/DetailInfoRow';
import { getStatusSolid } from '../../theme';
import { formatDate, formatCurrency } from '../../utils/formatters';

interface ProductDetailDrawerProps {
    open: boolean;
    onClose: () => void;
    product: Product | null;
}

export function ProductDetailDrawer({ open, onClose, product }: ProductDetailDrawerProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    if (!product) return null;

    const statusColors = getStatusSolid(product.status, isDarkMode);

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
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Product Details
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
                    {/* Product Name and Tags */}
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
                            <InventoryIcon sx={{ fontSize: 40, color: isDarkMode ? '#A3A3A3' : '#525252' }} />
                        </Box>
                        <Typography variant="h5" gutterBottom  sx={{ textAlign: 'center',  fontWeight: 700 }}>
                            {product.name}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                fontFamily: 'monospace',
                                color: isDarkMode ? '#A3A3A3' : '#737373',
                                mb: 2,
                            }}
                        >
                            {product.sku}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <Chip
                                label={product.category}
                                size="small"
                                sx={{
                                    bgcolor: isDarkMode ? '#404040' : '#E5E5E5',
                                    color: isDarkMode ? '#E5E5E5' : '#171717',
                                    fontWeight: 500,
                                    borderRadius: 1,
                                }}
                            />
                            <Chip
                                label={product.status}
                                size="small"
                                sx={{
                                    bgcolor: statusColors.bg,
                                    color: statusColors.text,
                                    fontWeight: 500,
                                    borderRadius: 1,
                                }}
                            />
                        </Stack>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Pricing & Inventory */}
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
                            Pricing & Inventory
                        </Typography>
                        <Stack spacing={2}>
                            <DetailInfoRow
                                icon={<MoneyIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Price"
                                value={formatCurrency(product.price)}
                            />
                            <DetailInfoRow
                                icon={<NumbersIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Stock Quantity"
                                value={`${product.stock} units`}
                            />
                            <DetailInfoRow
                                icon={<CategoryIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Category"
                                value={product.category}
                            />
                        </Stack>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Description */}
                    {product.description && (
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
                                    Description
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                    {product.description}
                                </Typography>
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
                            Timestamps
                        </Typography>
                        <Stack spacing={2}>
                            <DetailInfoRow
                                icon={<CalendarIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Created At"
                                value={formatDate(product.createdAt)}
                            />
                            <DetailInfoRow
                                icon={<UpdateIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Last Updated"
                                value={formatDate(product.updatedAt)}
                            />
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Drawer>
    );
}
