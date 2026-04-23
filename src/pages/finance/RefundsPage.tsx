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
    useTheme,
} from '@mui/material';
import {
    Search as SearchIcon,
    MoreVert as MoreVertIcon,
    Check as ApproveIcon,
    Close as RejectIcon,
    Visibility as ViewIcon,
} from '@mui/icons-material';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { DataGrid as DataGridComponent } from '@mui/x-data-grid';
import { mockRefunds, type Refund } from '../../data/mockRefunds';
import { getStatusSolid } from '../../theme';

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const dateFormatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
});

export function RefundsPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const [searchQuery, setSearchQuery] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedRefund, setSelectedRefund] = useState<Refund | null>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, refund: Refund) => {
        setAnchorEl(event.currentTarget);
        setSelectedRefund(refund);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRefund(null);
    };

    const filteredRefunds = useMemo(() => {
        if (!searchQuery) return mockRefunds;
        const query = searchQuery.toLowerCase();
        return mockRefunds.filter(
            (r) =>
                r.userName.toLowerCase().includes(query) ||
                r.reason.toLowerCase().includes(query) ||
                r.id.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Refund ID',
            width: 120,
            renderCell: (params: GridRenderCellParams<Refund, string>) => (
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {params.value}
                    </Typography>
                </Box>
            ),
        },
        {
            field: 'transactionId',
            headerName: 'Original TRX',
            width: 150,
            renderCell: (params: GridRenderCellParams<Refund, string>) => (
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
            renderCell: (params: GridRenderCellParams<Refund>) => (
                <Stack direction="row" spacing={1}  sx={{ alignItems: 'center',  height: '100%' }}>
                    <Avatar
                        src={params.row.userAvatar}
                        alt={params.row.userName}
                        sx={{ width: 32, height: 32 }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="body2" sx={{ fontWeight: 500,  lineHeight: '1.2'  }}>
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
            field: 'amount',
            headerName: 'Amount',
            width: 120,
            renderCell: (params: GridRenderCellParams<Refund, number>) => (
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {currencyFormatter.format(params.value!)}
                    </Typography>
                </Box>
            ),
        },
        {
            field: 'reason',
            headerName: 'Reason',
            flex: 1,
            minWidth: 200,
        },
        {
            field: 'requestedAt',
            headerName: 'Requested',
            width: 180,
            valueFormatter: (value) => {
                if (!value) return '-';
                const date = new Date(value);
                return isNaN(date.getTime()) ? 'Invalid Date' : dateFormatter.format(date);
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params: GridRenderCellParams<Refund, string>) => (
                (() => {
                    const { bg, text } = getStatusSolid(params.value || '', isDarkMode);
                    return (
                        <Chip
                            label={params.value}
                            size="small"
                            sx={{ textTransform: 'capitalize', bgcolor: bg, color: text }}
                        />
                    );
                })()
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 80,
            sortable: false,
            renderCell: (params: GridRenderCellParams<Refund>) => (
                <IconButton onClick={(e) => handleMenuOpen(e, params.row)} size="small">
                    <MoreVertIcon fontSize="small" />
                </IconButton>
            ),
        },
    ];

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                    Refunds
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Manage refund requests and processed returns.
                </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    placeholder="Search refunds by user, ID, or reason..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    slotProps={{ input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    } }}
                    sx={{ maxWidth: 500 }}
                />
            </Box>

            <Box sx={{ height: 850, width: '100%' }}>
                <DataGridComponent
                    rowHeight={72}
                    rows={filteredRefunds}
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
                {selectedRefund?.status === 'pending' && (
                    <Box>
                        <MenuItem onClick={handleMenuClose}>
                            <ApproveIcon fontSize="small" sx={{ mr: 1, color: 'success.main' }} />
                            Approve Refund
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose}>
                            <RejectIcon fontSize="small" sx={{ mr: 1, color: 'error.main' }} />
                            Reject Refund
                        </MenuItem>
                    </Box>
                )}
            </Menu>
        </Box>
    );
}
