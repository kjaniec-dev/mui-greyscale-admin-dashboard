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
import type { Invoice } from '../../data/mockInvoices';
import { getStatusSolid } from '../../theme';
import { LazyDataGrid } from './LazyDataGrid';

interface InvoiceTableProps {
    invoices: Invoice[];
    onView?: (invoice: Invoice) => void;
    onEdit?: (invoice: Invoice) => void;
    onDelete?: (invoice: Invoice) => void;
}

function ActionsMenu({ invoice, onView, onEdit, onDelete }: {
    invoice: Invoice;
    onView?: (invoice: Invoice) => void;
    onEdit?: (invoice: Invoice) => void;
    onDelete?: (invoice: Invoice) => void;
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
        onView?.(invoice);
        handleClose();
    };

    const handleEdit = () => {
        onEdit?.(invoice);
        handleClose();
    };

    const handleDelete = () => {
        onDelete?.(invoice);
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

function formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

export function InvoiceTable({ invoices, onView, onEdit, onDelete }: InvoiceTableProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const columns: GridColDef[] = [
        {
            field: 'invoiceNumber',
            headerName: 'Invoice #',
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
            valueGetter: (value: Invoice['customer']) => value.name,
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
            field: 'total',
            headerName: 'Amount',
            width: 130,
            renderCell: (params) => (
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {formatCurrency(params.value)}
                </Typography>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params) => {
                const colors = getStatusSolid(params.value as string, isDarkMode);
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
            field: 'issueDate',
            headerName: 'Issue Date',
            width: 120,
            valueFormatter: (value) => formatDate(value),
        },
        {
            field: 'dueDate',
            headerName: 'Due Date',
            width: 120,
            renderCell: (params) => {
                const isOverdue = params.row.status === 'Overdue';
                return (
                    <Typography
                        variant="body2"
                        sx={{
                            color: isOverdue ? 'error.main' : 'inherit',
                            fontWeight: isOverdue ? 600 : 400,
                        }}
                    >
                        {formatDate(params.value)}
                    </Typography>
                );
            },
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 80,
            getActions: (params: GridRowParams<Invoice>) => [
                <ActionsMenu
                    key={params.row.id}
                    invoice={params.row}
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
                rows={invoices}
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
