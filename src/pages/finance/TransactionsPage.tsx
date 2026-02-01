import { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    Chip,
    Avatar,
    Stack,
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material';
import {
    Search as SearchIcon,
    MoreVert as MoreVertIcon,
    FileDownload as DownloadIcon,
    Visibility as ViewIcon,
} from '@mui/icons-material';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { DataGrid as DataGridComponent } from '@mui/x-data-grid';
import { mockTransactions, type Transaction, type TransactionStatus } from '../../data/mockTransactions';

const statusColors: Record<TransactionStatus, 'success' | 'warning' | 'error' | 'default' | 'info'> = {
    completed: 'success',
    pending: 'warning',
    failed: 'error',
    refunded: 'default',
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const dateFormatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
});

export function TransactionsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, transaction: Transaction) => {
        setAnchorEl(event.currentTarget);
        setSelectedTransaction(transaction);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedTransaction(null);
    };

    const filteredTransactions = useMemo(() => {
        if (!searchQuery) return mockTransactions;
        const query = searchQuery.toLowerCase();
        return mockTransactions.filter(
            (t) =>
                t.userName.toLowerCase().includes(query) ||
                t.description.toLowerCase().includes(query) ||
                t.id.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Transaction ID',
            width: 150,
            renderCell: (params: GridRenderCellParams<Transaction, string>) => (
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {params.value}
                    </Typography>
                </Box>
            ),
        },
        {
            field: 'user',
            headerName: 'User',
            width: 280,
            renderCell: (params: GridRenderCellParams<Transaction>) => (
                <Stack direction="row" spacing={1} alignItems="center" sx={{ height: '100%' }}>
                    <Avatar
                        src={params.row.userAvatar}
                        alt={params.row.userName}
                        sx={{ width: 32, height: 32 }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="body2" fontWeight={500} sx={{ lineHeight: '1.2' }}>
                            {params.row.userName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: '1.2' }}>
                            {params.row.userId}
                        </Typography>
                    </Box>
                </Stack>
            ),
        },
        {
            field: 'date',
            headerName: 'Date',
            width: 180,
            valueFormatter: (value) => {
                if (!value) return '-';
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
            field: 'amount',
            headerName: 'Amount',
            width: 120,
            renderCell: (params: GridRenderCellParams<Transaction, number>) => (
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <Typography
                        variant="body2"
                        fontWeight={600}
                        color={params.row.type === 'refund' ? 'error.main' : 'text.primary'}
                    >
                        {currencyFormatter.format(params.value!)}
                    </Typography>
                </Box>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params: GridRenderCellParams<Transaction, string>) => (
                <Chip
                    label={params.value}
                    size="small"
                    color={statusColors[params.value as TransactionStatus]}
                    variant="outlined"
                    sx={{ textTransform: 'capitalize' }}
                />
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 80,
            sortable: false,
            renderCell: (params: GridRenderCellParams<Transaction>) => (
                <IconButton onClick={(e) => handleMenuOpen(e, params.row)} size="small">
                    <MoreVertIcon fontSize="small" />
                </IconButton>
            ),
        },
    ];

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Transactions
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    View and manage payment history and transactions.
                </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    placeholder="Search transactions..."
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
                    rows={filteredTransactions}
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
                <MenuItem onClick={handleMenuClose}>
                    <ViewIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    View Details
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <DownloadIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    Download Receipt
                </MenuItem>
            </Menu>
        </Box>
    );
}
