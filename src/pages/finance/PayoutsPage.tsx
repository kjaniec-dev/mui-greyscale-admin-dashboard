import { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    Select,
    FormControl,
    useTheme,
} from '@mui/material';
import {
    Search as SearchIcon,
    MoreVert as MoreVertIcon,
    FilterList as FilterIcon,
} from '@mui/icons-material';
import {
    DataGrid,
    type GridColDef,
    type GridRenderCellParams,
} from '@mui/x-data-grid';
import { mockPayouts, type Payout } from '../../data/mockPayouts';
import { PayoutDetailDrawer } from '../../components/drawers/PayoutDetailDrawer';

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const dateFormatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
});

export function PayoutsPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, payout: Payout) => {
        setAnchorEl(event.currentTarget);
        setSelectedPayout(payout);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleViewDetails = () => {
        setDrawerOpen(true);
        handleMenuClose();
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
        setSelectedPayout(null);
    };

    const handleAction = (action: string) => {
        console.log(`${action} payout:`, selectedPayout?.id);
        handleMenuClose();
    };

    const filteredPayouts = useMemo(() => {
        let filtered = mockPayouts;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (payout) =>
                    payout.recipientName.toLowerCase().includes(query) ||
                    payout.email.toLowerCase().includes(query) ||
                    payout.id.toLowerCase().includes(query)
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter((payout) => payout.status === statusFilter);
        }

        if (typeFilter !== 'all') {
            filtered = filtered.filter((payout) => payout.recipientType === typeFilter);
        }

        return filtered;
    }, [searchQuery, statusFilter, typeFilter]);

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Payout ID',
            width: 120,
            renderCell: (params: GridRenderCellParams<Payout, string>) => (
                <Typography variant="body2" fontWeight={500}>
                    {params.value}
                </Typography>
            ),
        },
        {
            field: 'recipientName',
            headerName: 'Recipient',
            flex: 1,
            minWidth: 200,
            renderCell: (params: GridRenderCellParams<Payout>) => (
                <Box>
                    <Typography variant="body2" fontWeight={500}>
                        {params.row.recipientName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {params.row.email}
                    </Typography>
                </Box>
            ),
        },
        {
            field: 'recipientType',
            headerName: 'Type',
            width: 100,
            renderCell: (params: GridRenderCellParams<Payout, string>) => (
                <Chip
                    label={params.value}
                    size="small"
                    sx={{
                        bgcolor: params.value === 'Vendor'
                            ? (isDarkMode ? '#3B82F6' : '#2563EB')
                            : (isDarkMode ? '#8B5CF6' : '#7C3AED'),
                        color: '#FAFAFA',
                        fontWeight: 500,
                        borderRadius: 1,
                    }}
                />
            ),
        },
        {
            field: 'amount',
            headerName: 'Amount',
            width: 130,
            renderCell: (params: GridRenderCellParams<Payout, number>) => (
                <Typography variant="body2" fontWeight={600}>
                    {currencyFormatter.format(params.value || 0)}
                </Typography>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params: GridRenderCellParams<Payout, string>) => {
                const statusColors: Record<string, string> = {
                    'Pending': isDarkMode ? '#D97706' : '#F59E0B',
                    'Processing': isDarkMode ? '#3B82F6' : '#2563EB',
                    'Completed': isDarkMode ? '#22C55E' : '#16A34A',
                    'Failed': isDarkMode ? '#DC2626' : '#EF4444',
                };
                return (
                    <Chip
                        label={params.value}
                        size="small"
                        sx={{
                            bgcolor: statusColors[params.value || ''] || '#737373',
                            color: '#FAFAFA',
                            fontWeight: 500,
                            borderRadius: 1,
                        }}
                    />
                );
            },
        },
        {
            field: 'paymentMethod',
            headerName: 'Method',
            width: 130,
            renderCell: (params: GridRenderCellParams<Payout, string>) => (
                <Typography variant="body2" color="text.secondary">
                    {params.value}
                </Typography>
            ),
        },
        {
            field: 'createdAt',
            headerName: 'Created',
            width: 170,
            valueFormatter: (value) => {
                return dateFormatter.format(new Date(value));
            },
        },
        {
            field: 'actions',
            headerName: '',
            width: 60,
            sortable: false,
            renderCell: (params: GridRenderCellParams<Payout>) => (
                <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, params.row)}
                >
                    <MoreVertIcon />
                </IconButton>
            ),
        },
    ];

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Payouts
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Manage vendor and affiliate payments.
                </Typography>
            </Box>

            {/* Search and Filters */}
            <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField
                    placeholder="Search by recipient name, email, or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ flex: 1, minWidth: 300 }}
                />
                <FormControl sx={{ minWidth: 150 }}>
                    <Select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        displayEmpty
                        startAdornment={
                            <InputAdornment position="start">
                                <FilterIcon sx={{ ml: 1 }} />
                            </InputAdornment>
                        }
                    >
                        <MenuItem value="all">All Types</MenuItem>
                        <MenuItem value="Vendor">Vendor</MenuItem>
                        <MenuItem value="Affiliate">Affiliate</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 150 }}>
                    <Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        displayEmpty
                    >
                        <MenuItem value="all">All Status</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Processing">Processing</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Failed">Failed</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* DataGrid */}
            <Box sx={{ width: '100%' }}>
                <DataGrid
                    rows={filteredPayouts}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10, page: 0 },
                        },
                    }}
                    pageSizeOptions={[10, 25, 50]}
                    disableRowSelectionOnClick
                    getRowHeight={() => 'auto'}
                    sx={{
                        border: 'none',
                        '& .MuiDataGrid-cell': {
                            borderColor: isDarkMode ? '#404040' : '#E5E5E5',
                            py: 1.5,
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            bgcolor: isDarkMode ? '#262626' : '#FAFAFA',
                            borderColor: isDarkMode ? '#404040' : '#E5E5E5',
                            color: isDarkMode ? '#E5E5E5' : '#171717',
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            fontWeight: 600,
                        },
                        '& .MuiDataGrid-row': {
                            '&:hover': {
                                bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                            },
                        },
                        '& .MuiDataGrid-footerContainer': {
                            borderColor: isDarkMode ? '#404040' : '#E5E5E5',
                        },
                        '& .MuiTablePagination-root': {
                            color: isDarkMode ? '#A3A3A3' : '#525252',
                        },
                    }}
                />
            </Box>

            {/* Actions Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem onClick={handleViewDetails}>
                    View Details
                </MenuItem>
                {selectedPayout?.status === 'Pending' && (
                    <MenuItem onClick={() => handleAction('Process')}>
                        Process Payout
                    </MenuItem>
                )}
                {(selectedPayout?.status === 'Pending' || selectedPayout?.status === 'Processing') && (
                    <MenuItem onClick={() => handleAction('Cancel')} sx={{ color: 'error.main' }}>
                        Cancel Payout
                    </MenuItem>
                )}
                {selectedPayout?.status === 'Failed' && (
                    <MenuItem onClick={() => handleAction('Retry')}>
                        Retry Payout
                    </MenuItem>
                )}
            </Menu>

            {/* Detail Drawer */}
            <PayoutDetailDrawer
                open={drawerOpen}
                onClose={handleDrawerClose}
                payout={selectedPayout}
            />
        </Box>
    );
}
