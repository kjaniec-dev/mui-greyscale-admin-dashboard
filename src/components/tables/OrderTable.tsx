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
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import type { Order } from '../../data/mockOrders';
import { getStatusSolid } from '../../theme';
import { LazyDataGrid } from './LazyDataGrid';

interface OrderTableProps {
    orders: Order[];
    onView?: (order: Order) => void;
    onEdit?: (order: Order) => void;
    onDelete?: (order: Order) => void;
}

function ActionsMenu({ order, onView, onEdit, onDelete }: {
    order: Order;
    onView?: (order: Order) => void;
    onEdit?: (order: Order) => void;
    onDelete?: (order: Order) => void;
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleView = () => {
        onView?.(order);
        handleClose();
    };

    const handleEdit = () => {
        onEdit?.(order);
        handleClose();
    };

    const handleDelete = () => {
        onDelete?.(order);
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
                    View
                </MenuItem>
                <MenuItem onClick={handleEdit}>
                    <EditIcon sx={{ mr: 1, fontSize: 20 }} />
                    Edit
                </MenuItem>
                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                    <DeleteIcon sx={{ mr: 1, fontSize: 20 }} />
                    Delete
                </MenuItem>
            </Menu>
        </>
    );
}

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

export function OrderTable({ orders, onView, onEdit, onDelete }: OrderTableProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const getOrderStatusColor = (status: string) => getStatusSolid(status, isDarkMode);

    const columns: GridColDef[] = [
        {
            field: 'orderNumber',
            headerName: 'Order #',
            width: 150,
            renderCell: (params) => (
                <Typography variant="body2" sx={{ fontWeight: 600,  fontFamily: 'monospace'  }}>
                    {params.value}
                </Typography>
            ),
        },
        {
            field: 'customer',
            headerName: 'Customer',
            flex: 1,
            minWidth: 180,
            valueGetter: (value: Order['customer']) => value.name,
            renderCell: (params) => (
                <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {params.row.customer.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {params.row.customer.email}
                    </Typography>
                </Box>
            ),
        },
        {
            field: 'items',
            headerName: 'Items',
            width: 80,
            valueGetter: (value: Order['items']) => value.length,
            renderCell: (params) => (
                <Chip
                    label={`${params.row.items.length} item${params.row.items.length > 1 ? 's' : ''}`}
                    size="small"
                    sx={{
                        bgcolor: isDarkMode ? '#404040' : '#E5E5E5',
                        color: isDarkMode ? '#E5E5E5' : '#171717',
                        fontWeight: 500,
                        borderRadius: 1,
                    }}
                />
            ),
        },
        {
            field: 'total',
            headerName: 'Total',
            width: 120,
            renderCell: (params) => (
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {formatCurrency(params.value)}
                </Typography>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 130,
            renderCell: (params) => {
                const colors = getOrderStatusColor(params.value as string);
                return (
                    <Chip
                        label={params.value}
                        size="small"
                        sx={{
                            bgcolor: colors.bg,
                            color: colors.text,
                            fontWeight: 500,
                            borderRadius: 1,
                        }}
                    />
                );
            },
        },
        {
            field: 'paymentStatus',
            headerName: 'Payment',
            width: 110,
            renderCell: (params) => {
                const paymentColor = getOrderStatusColor(params.value as string);
                return (
                    <Typography
                        variant="caption"
                        sx={{ fontWeight: 500, 
                            color: paymentColor.bg,
                         }}
                    >
                        {params.value}
                    </Typography>
                );
            },
        },
        {
            field: 'createdAt',
            headerName: 'Date',
            width: 120,
            valueFormatter: (value) => {
                return new Date(value).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                });
            },
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 80,
            getActions: (params: GridRowParams<Order>) => [
                <ActionsMenu
                    key={params.row.id}
                    order={params.row}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />,
            ],
        },
    ];

    return (
        <Box sx={{ width: '100%' }}>
            <LazyDataGrid
                rows={orders}
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
