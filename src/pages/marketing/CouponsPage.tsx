import { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    Chip,
    Stack,
    IconButton,
    Menu,
    MenuItem,
    Button,
    LinearProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    useTheme,
} from '@mui/material';
import {
    Search as SearchIcon,
    MoreVert as MoreVertIcon,
    Add as AddIcon,
    ContentCopy as CopyIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Block as DisableIcon,
} from '@mui/icons-material';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { DataGrid as DataGridComponent } from '@mui/x-data-grid';
import { mockCoupons, type Coupon, type CouponStatus } from '../../data/mockCoupons';
import { CouponForm, type CouponFormData } from '../../components/forms/CouponForm';
import { getStatusSolid } from '../../theme';

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const dateFormatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
});

export function CouponsPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const [searchQuery, setSearchQuery] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, coupon: Coupon) => {
        setAnchorEl(event.currentTarget);
        setSelectedCoupon(coupon);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedCoupon(null);
    };

    const handleCreateClick = () => {
        setEditingCoupon(null);
        setIsFormOpen(true);
    };

    const handleEditClick = () => {
        if (selectedCoupon) {
            setEditingCoupon(selectedCoupon);
            setIsFormOpen(true);
            handleMenuClose();
        }
    };

    const handleDeactivateClick = () => {
        if (selectedCoupon) {
            console.log('Deactivating coupon:', selectedCoupon.code);
            // Mock API call: update status to disabled
            // In a real app, we'd update the list or refetch
            handleMenuClose();
        }
    };

    const handleDeleteClick = () => {
        if (selectedCoupon) {
            console.log('Deleting coupon:', selectedCoupon.code);
            // Mock API call: delete coupon
            handleMenuClose();
        }
    };

    const handleFormSubmit = async (data: CouponFormData) => {
        console.log('Form submitted:', data);
        // Here you would typically make an API call
        // For now, we'll just close the modal
        setIsFormOpen(false);
        setEditingCoupon(null);
    };

    const handleFormCancel = () => {
        setIsFormOpen(false);
        setEditingCoupon(null);
    };

    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        // Could add toast notification here
    };

    const filteredCoupons = useMemo(() => {
        if (!searchQuery) return mockCoupons;
        const query = searchQuery.toLowerCase();
        return mockCoupons.filter(
            (c) =>
                c.code.toLowerCase().includes(query) ||
                c.description.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    const columns: GridColDef[] = [
        {
            field: 'code',
            headerName: 'Coupon Code',
            width: 220,
            renderCell: (params: GridRenderCellParams<Coupon, string>) => (
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', gap: 1 }}>
                    <Typography
                        variant="body2"
                        fontWeight={600}
                        sx={{ fontFamily: 'monospace', letterSpacing: 1 }}
                    >
                        {params.value}
                    </Typography>
                    <IconButton size="small" onClick={() => handleCopyCode(params.value!)}>
                        <CopyIcon fontSize="small" sx={{ fontSize: 14 }} />
                    </IconButton>
                </Box>
            ),
        },
        {
            field: 'value',
            headerName: 'Discount',
            width: 140,
            renderCell: (params: GridRenderCellParams<Coupon>) => (
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <Typography variant="body2" fontWeight={500}>
                        {params.row.type === 'percentage'
                            ? `${params.row.value}% OFF`
                            : `${currencyFormatter.format(params.row.value)} OFF`}
                    </Typography>
                </Box>
            ),
        },
        {
            field: 'usage',
            headerName: 'Usage',
            width: 200,
            renderCell: (params: GridRenderCellParams<Coupon>) => {
                const usagePercent = Math.min((params.row.usageCount / params.row.maxUsage) * 100, 100);
                return (
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', height: '100%', pr: 2 }}>
                        <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                            <Typography variant="caption" color="text.secondary">
                                {params.row.usageCount} / {params.row.maxUsage}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {usagePercent.toFixed(0)}%
                            </Typography>
                        </Stack>
                        <LinearProgress variant="determinate" value={usagePercent} sx={{ height: 6, borderRadius: 3 }} />
                    </Box>
                );
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params: GridRenderCellParams<Coupon, string>) => {
                const colors = getStatusSolid(params.value as CouponStatus, isDarkMode);
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <Chip
                            label={params.value}
                            size="small"
                            sx={{
                                textTransform: 'capitalize',
                                bgcolor: colors.bg,
                                color: colors.text,
                            }}
                        />
                    </Box>
                );
            },
        },
        {
            field: 'expirationDate',
            headerName: 'Expires',
            width: 150,
            valueFormatter: (value) => {
                if (!value) return 'Never';
                const date = new Date(value);
                return isNaN(date.getTime()) ? 'Invalid Date' : dateFormatter.format(date);
            },
        },
        {
            field: 'description',
            headerName: 'Description',
            flex: 1,
            minWidth: 200,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 80,
            sortable: false,
            renderCell: (params: GridRenderCellParams<Coupon>) => (
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <IconButton onClick={(e) => handleMenuOpen(e, params.row)} size="small">
                        <MoreVertIcon fontSize="small" />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Box>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Coupons
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage discount codes and promotional campaigns.
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateClick}>
                    Create Coupon
                </Button>
            </Box>

            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    placeholder="Search coupons..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ maxWidth: 500 }}
                />
            </Box>

            <Box sx={{ height: 850, width: '100%' }}>
                <DataGridComponent
                    rowHeight={72}
                    rows={filteredCoupons}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[10, 25, 50]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        '& .MuiDataGrid-columnHeaders': {
                            bgcolor: 'background.default',
                        },
                    }}
                />
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleEditClick}>
                    <EditIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    Edit
                </MenuItem>
                <MenuItem onClick={handleDeactivateClick}>
                    <DisableIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    Deactivate
                </MenuItem>
                <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
                    <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                    Delete
                </MenuItem>
            </Menu>

            <Dialog open={isFormOpen} onClose={handleFormCancel} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 1 }}>
                        <CouponForm
                            defaultValues={editingCoupon ? {
                                code: editingCoupon.code,
                                type: editingCoupon.type,
                                value: editingCoupon.value,
                                maxUsage: editingCoupon.maxUsage,
                                status: editingCoupon.status,
                                expirationDate: editingCoupon.expirationDate ? editingCoupon.expirationDate.split('T')[0] : '',
                                description: editingCoupon.description,
                            } : undefined}
                            onSubmit={handleFormSubmit}
                            onCancel={handleFormCancel}
                        />
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
}
