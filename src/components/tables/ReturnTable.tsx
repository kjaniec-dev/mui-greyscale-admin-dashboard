import { useState } from 'react';
import {
    type GridColDef,
    type GridRowParams,
} from '@mui/x-data-grid';
import {
    Box,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    useTheme,
} from '@mui/material';
import {
    MoreVert as MoreVertIcon,
    Visibility as ViewIcon,
    CheckCircle as ApproveIcon,
    Cancel as RejectIcon,
} from '@mui/icons-material';
import type { Return } from '../../data/mockReturns';
import { getStatusSolid } from '../../theme';
import { LazyDataGrid } from './LazyDataGrid';

interface ReturnTableProps {
    returns: Return[];
    onView?: (returnItem: Return) => void;
    onApprove?: (returnItem: Return) => void;
    onReject?: (returnItem: Return) => void;
}

function ActionsMenu({ returnItem, onView, onApprove, onReject }: {
    returnItem: Return;
    onView?: (returnItem: Return) => void;
    onApprove?: (returnItem: Return) => void;
    onReject?: (returnItem: Return) => void;
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const isPending = returnItem.status === 'Pending';

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleView = () => {
        onView?.(returnItem);
        handleClose();
    };

    const handleApprove = () => {
        onApprove?.(returnItem);
        handleClose();
    };

    const handleReject = () => {
        onReject?.(returnItem);
        handleClose();
    };

    return (
        <>
            <IconButton size="small" onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleView}>
                    <ViewIcon sx={{ mr: 1, fontSize: 20 }} />
                    View Details
                </MenuItem>
                {isPending && (
                    <MenuItem onClick={handleApprove} sx={{ color: 'success.main' }}>
                        <ApproveIcon sx={{ mr: 1, fontSize: 20 }} />
                        Approve
                    </MenuItem>
                )}
                {isPending && (
                    <MenuItem onClick={handleReject} sx={{ color: 'error.main' }}>
                        <RejectIcon sx={{ mr: 1, fontSize: 20 }} />
                        Reject
                    </MenuItem>
                )}
            </Menu>
        </>
    );
}

export function ReturnTable({ returns, onView, onApprove, onReject }: ReturnTableProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Return ID',
            width: 130,
            renderCell: (params) => (
                <Typography variant="body2" fontWeight={500}>
                    {params.value}
                </Typography>
            ),
        },
        {
            field: 'orderId',
            headerName: 'Order ID',
            width: 130,
            renderCell: (params) => (
                <Typography variant="body2" color="text.secondary">
                    {params.value}
                </Typography>
            ),
        },
        {
            field: 'productName',
            headerName: 'Product',
            flex: 1,
            minWidth: 180,
            renderCell: (params) => (
                <Box>
                    <Typography variant="body2" fontWeight={500}>
                        {params.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Qty: {params.row.quantity}
                    </Typography>
                </Box>
            ),
        },
        {
            field: 'reason',
            headerName: 'Reason',
            width: 140,
            renderCell: (params) => {
                const reasonColors: Record<string, string> = {
                    'Defective': isDarkMode ? '#DC2626' : '#EF4444',
                    'Wrong Item': isDarkMode ? '#D97706' : '#F59E0B',
                    'Changed Mind': isDarkMode ? '#525252' : '#737373',
                    'Not as Described': isDarkMode ? '#D97706' : '#F59E0B',
                    'Damaged': isDarkMode ? '#DC2626' : '#EF4444',
                };
                return (
                    <Chip
                        label={params.value}
                        size="small"
                        sx={{
                            bgcolor: reasonColors[params.value] || isDarkMode ? '#404040' : '#E5E5E5',
                            color: '#FAFAFA',
                            fontWeight: 500,
                            borderRadius: 1,
                            fontSize: '0.75rem',
                        }}
                    />
                );
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params) => {
                const statusColors = getStatusSolid(params.value as string, isDarkMode);
                return (
                    <Chip
                        label={params.value}
                        size="small"
                        sx={{
                            bgcolor: statusColors.bg,
                            color: statusColors.text,
                            fontWeight: 500,
                            borderRadius: 1,
                        }}
                    />
                );
            },
        },
        {
            field: 'customerName',
            headerName: 'Customer',
            width: 150,
            renderCell: (params) => (
                <Typography variant="body2">
                    {params.value}
                </Typography>
            ),
        },
        {
            field: 'requestedAt',
            headerName: 'Requested',
            width: 120,
            valueFormatter: (value) => {
                return new Date(value).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                });
            },
        },
        {
            field: 'refundAmount',
            headerName: 'Refund',
            width: 100,
            renderCell: (params) => (
                <Typography variant="body2" fontWeight={500}>
                    {params.value ? `$${params.value.toFixed(2)}` : '-'}
                </Typography>
            ),
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 80,
            getActions: (params: GridRowParams<Return>) => [
                <ActionsMenu
                    key={params.row.id}
                    returnItem={params.row}
                    onView={onView}
                    onApprove={onApprove}
                    onReject={onReject}
                />,
            ],
        },
    ];

    return (
        <Box sx={{ width: '100%' }}>
            <LazyDataGrid
                rows={returns}
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
    );
}
