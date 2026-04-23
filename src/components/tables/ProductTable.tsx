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
import type { Product } from '../../data/mockProducts';
import { getStatusSolid } from '../../theme';
import { LazyDataGrid } from './LazyDataGrid';

interface ProductTableProps {
    products: Product[];
    onView?: (product: Product) => void;
    onEdit?: (product: Product) => void;
    onDelete?: (product: Product) => void;
}

function ActionsMenu({ product, onView, onEdit, onDelete }: {
    product: Product;
    onView?: (product: Product) => void;
    onEdit?: (product: Product) => void;
    onDelete?: (product: Product) => void;
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
        onView?.(product);
        handleClose();
    };

    const handleEdit = () => {
        onEdit?.(product);
        handleClose();
    };

    const handleDelete = () => {
        onDelete?.(product);
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

export function ProductTable({ products, onView, onEdit, onDelete }: ProductTableProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Product Name',
            flex: 1,
            minWidth: 200,
            renderCell: (params) => (
                <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {params.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {params.row.sku}
                    </Typography>
                </Box>
            ),
        },
        {
            field: 'category',
            headerName: 'Category',
            width: 130,
            renderCell: (params) => (
                <Chip
                    label={params.value}
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
            field: 'price',
            headerName: 'Price',
            width: 120,
            valueFormatter: (value: number) => `$${value.toFixed(2)}`,
            renderCell: (params) => (
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    ${params.value.toFixed(2)}
                </Typography>
            ),
        },
        {
            field: 'stock',
            headerName: 'Stock',
            width: 100,
            renderCell: (params) => (
                <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, 
                        color: params.value === 0
                            ? 'error.main'
                            : params.value < 20
                                ? isDarkMode ? '#D97706' : '#F59E0B'
                                : 'inherit',
                     }}
                >
                    {params.value}
                </Typography>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 130,
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
            field: 'updatedAt',
            headerName: 'Last Updated',
            width: 140,
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
            getActions: (params: GridRowParams<Product>) => [
                <ActionsMenu
                    key={params.row.id}
                    product={params.row}
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
                rows={products}
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
