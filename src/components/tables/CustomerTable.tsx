import { useState } from 'react';
import {
    DataGrid,
    type GridColDef,
} from '@mui/x-data-grid';
import {
    Avatar,
    Box,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    useTheme,
} from '@mui/material';
import {
    MoreVert as MoreVertIcon,
    Visibility as ViewIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import { type Customer } from '../../data/mockCustomers';

interface CustomerTableProps {
    customers: Customer[];
    onView?: (customer: Customer) => void;
    onEdit?: (customer: Customer) => void;
    onDelete?: (customer: Customer) => void;
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

function ActionsMenu({ customer, onView, onEdit, onDelete }: {
    customer: Customer;
    onView?: (customer: Customer) => void;
    onEdit?: (customer: Customer) => void;
    onDelete?: (customer: Customer) => void;
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
        onView?.(customer);
        handleClose();
    };

    const handleEdit = () => {
        onEdit?.(customer);
        handleClose();
    };

    const handleDelete = () => {
        onDelete?.(customer);
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

function formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value);
}

export function CustomerTable({ customers, onView, onEdit, onDelete }: CustomerTableProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Customer',
            flex: 1,
            minWidth: 200,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, width: '100%', py: 1 }}>
                    <Avatar
                        sx={{
                            width: 32,
                            height: 32,
                            flexShrink: 0,
                            mt: 0.25,
                            bgcolor: isDarkMode ? '#404040' : '#E5E5E5',
                            color: isDarkMode ? '#E5E5E5' : '#171717',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                        }}
                    >
                        {getInitials(params.value)}
                    </Avatar>
                    <Box sx={{ minWidth: 0 }}>
                        <Box sx={{ fontWeight: 500, lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis' }}>{params.value}</Box>
                        <Box sx={{ fontSize: '0.75rem', lineHeight: 1.4, color: 'text.secondary', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {params.row.email}
                        </Box>
                    </Box>
                </Box>
            ),
        },
        {
            field: 'company',
            headerName: 'Company',
            flex: 0.8,
            minWidth: 150,
            renderCell: (params) => params.value || '—',
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 160,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 100,
            renderCell: (params) => {
                const statusColors = {
                    Active: isDarkMode ? '#A3A3A3' : '#525252',
                    Inactive: isDarkMode ? '#525252' : '#A3A3A3',
                    Lead: isDarkMode ? '#737373' : '#737373',
                };
                return (
                    <Chip
                        label={params.value}
                        size="small"
                        sx={{
                            bgcolor: statusColors[params.value as keyof typeof statusColors],
                            color: isDarkMode ? '#171717' : '#FAFAFA',
                            fontWeight: 500,
                            borderRadius: 1,
                        }}
                    />
                );
            },
        },
        {
            field: 'totalOrders',
            headerName: 'Orders',
            width: 90,
            align: 'right',
            headerAlign: 'right',
        },
        {
            field: 'totalSpent',
            headerName: 'Total Spent',
            width: 120,
            align: 'right',
            headerAlign: 'right',
            valueFormatter: (value) => formatCurrency(value),
        },
        {
            field: 'createdAt',
            headerName: 'Created',
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
            headerName: 'Actions',
            width: 80,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <ActionsMenu
                    customer={params.row}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ),
        },
    ];

    return (
        <Box sx={{ width: '100%' }}>
            <DataGrid
                rows={customers}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 10, page: 0 },
                    },
                }}
                pageSizeOptions={[10, 25, 50]}
                disableRowSelectionOnClick
                sx={{
                    border: 'none',
                    '& .MuiDataGrid-cell': {
                        borderColor: isDarkMode ? '#404040' : '#E5E5E5',
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
