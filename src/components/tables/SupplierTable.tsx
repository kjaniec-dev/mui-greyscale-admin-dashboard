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
    Rating,
    useTheme,
} from '@mui/material';
import {
    MoreVert as MoreVertIcon,
    Visibility as ViewIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import type { Supplier } from '../../data/mockSuppliers';
import { getStatusSolid } from '../../theme';
import { LazyDataGrid } from './LazyDataGrid';

interface SupplierTableProps {
    suppliers: Supplier[];
    onView?: (supplier: Supplier) => void;
    onEdit?: (supplier: Supplier) => void;
    onDelete?: (supplier: Supplier) => void;
}

function ActionsMenu({ supplier, onView, onEdit, onDelete }: {
    supplier: Supplier;
    onView?: (supplier: Supplier) => void;
    onEdit?: (supplier: Supplier) => void;
    onDelete?: (supplier: Supplier) => void;
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
        onView?.(supplier);
        handleClose();
    };

    const handleEdit = () => {
        onEdit?.(supplier);
        handleClose();
    };

    const handleDelete = () => {
        onDelete?.(supplier);
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

export function SupplierTable({ suppliers, onView, onEdit, onDelete }: SupplierTableProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Supplier',
            flex: 1,
            minWidth: 200,
            renderCell: (params) => (
                <Box>
                    <Typography variant="body2" fontWeight={500}>
                        {params.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {params.row.contactName}
                    </Typography>
                </Box>
            ),
        },
        {
            field: 'city',
            headerName: 'Location',
            width: 150,
            renderCell: (params) => (
                <Box>
                    <Typography variant="body2">
                        {params.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {params.row.country}
                    </Typography>
                </Box>
            ),
        },
        {
            field: 'rating',
            headerName: 'Rating',
            width: 140,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Rating
                        value={params.value}
                        precision={0.1}
                        size="small"
                        readOnly
                        sx={{
                            '& .MuiRating-iconFilled': {
                                color: isDarkMode ? '#D4D4D4' : '#525252',
                            },
                            '& .MuiRating-iconEmpty': {
                                color: isDarkMode ? '#404040' : '#E5E5E5',
                            },
                        }}
                    />
                    <Typography variant="caption" color="text.secondary">
                        ({params.value})
                    </Typography>
                </Box>
            ),
        },
        {
            field: 'totalOrders',
            headerName: 'Orders',
            width: 100,
            renderCell: (params) => (
                <Typography variant="body2" fontWeight={500}>
                    {params.value}
                </Typography>
            ),
        },
        {
            field: 'onTimeDelivery',
            headerName: 'On-Time %',
            width: 110,
            renderCell: (params) => {
                const getColor = () => {
                    if (params.value >= 95) return isDarkMode ? '#22C55E' : '#16A34A';
                    if (params.value >= 85) return isDarkMode ? '#D97706' : '#F59E0B';
                    return isDarkMode ? '#DC2626' : '#EF4444';
                };
                return (
                    <Typography variant="body2" fontWeight={500} sx={{ color: getColor() }}>
                        {params.value}%
                    </Typography>
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
            field: 'email',
            headerName: 'Email',
            width: 200,
            renderCell: (params) => (
                <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {params.value}
                </Typography>
            ),
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 80,
            getActions: (params: GridRowParams<Supplier>) => [
                <ActionsMenu
                    key={params.row.id}
                    supplier={params.row}
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
                rows={suppliers}
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
