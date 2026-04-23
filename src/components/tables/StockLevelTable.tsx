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
    Add as AddIcon,
    Remove as RemoveIcon,
    History as HistoryIcon,
} from '@mui/icons-material';
import type { StockLevel } from '../../data/mockStockLevels';
import { getStatusSolid } from '../../theme';
import { LazyDataGrid } from './LazyDataGrid';

interface StockLevelTableProps {
    stockLevels: StockLevel[];
    onAddStock?: (stockLevel: StockLevel) => void;
    onRemoveStock?: (stockLevel: StockLevel) => void;
    onViewHistory?: (stockLevel: StockLevel) => void;
}

function ActionsMenu({ stockLevel, onAddStock, onRemoveStock, onViewHistory }: {
    stockLevel: StockLevel;
    onAddStock?: (stockLevel: StockLevel) => void;
    onRemoveStock?: (stockLevel: StockLevel) => void;
    onViewHistory?: (stockLevel: StockLevel) => void;
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAddStock = () => {
        onAddStock?.(stockLevel);
        handleClose();
    };

    const handleRemoveStock = () => {
        onRemoveStock?.(stockLevel);
        handleClose();
    };

    const handleViewHistory = () => {
        onViewHistory?.(stockLevel);
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
                <MenuItem onClick={handleAddStock} sx={{ color: 'success.main' }}>
                    <AddIcon sx={{ mr: 1, fontSize: 20 }} />
                    Add Stock
                </MenuItem>
                <MenuItem onClick={handleRemoveStock} sx={{ color: 'warning.main' }}>
                    <RemoveIcon sx={{ mr: 1, fontSize: 20 }} />
                    Remove Stock
                </MenuItem>
                <MenuItem onClick={handleViewHistory}>
                    <HistoryIcon sx={{ mr: 1, fontSize: 20 }} />
                    View History
                </MenuItem>
            </Menu>
        </>
    );
}

export function StockLevelTable({ stockLevels, onAddStock, onRemoveStock, onViewHistory }: StockLevelTableProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const columns: GridColDef[] = [
        {
            field: 'productName',
            headerName: 'Product',
            flex: 1,
            minWidth: 200,
            renderCell: (params) => (
                <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {params.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {params.row.productSku}
                    </Typography>
                </Box>
            ),
        },
        {
            field: 'warehouseName',
            headerName: 'Warehouse',
            width: 180,
            renderCell: (params) => (
                <Box>
                    <Typography variant="body2">
                        {params.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {params.row.warehouseCode}
                    </Typography>
                </Box>
            ),
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            width: 120,
            renderCell: (params) => {
                const status = params.row.status;
                const getColor = () => {
                    if (status === 'Critical') return isDarkMode ? '#DC2626' : '#EF4444';
                    if (status === 'Low') return isDarkMode ? '#D97706' : '#F59E0B';
                    if (status === 'Overstocked') return isDarkMode ? '#3B82F6' : '#2563EB';
                    return isDarkMode ? '#E5E5E5' : '#171717';
                };
                return (
                    <Typography variant="body2" sx={{ fontWeight: 600,  color: getColor()  }}>
                        {params.value.toLocaleString()}
                    </Typography>
                );
            },
        },
        {
            field: 'minQuantity',
            headerName: 'Min / Max',
            width: 120,
            renderCell: (params) => (
                <Typography variant="body2" color="text.secondary">
                    {params.value} / {params.row.maxQuantity}
                </Typography>
            ),
        },
        {
            field: 'reorderPoint',
            headerName: 'Reorder At',
            width: 100,
            renderCell: (params) => (
                <Typography variant="body2" color="text.secondary">
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
            field: 'lastUpdated',
            headerName: 'Last Updated',
            width: 130,
            valueFormatter: (value) => {
                return new Date(value).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                });
            },
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 80,
            getActions: (params: GridRowParams<StockLevel>) => [
                <ActionsMenu
                    key={params.row.id}
                    stockLevel={params.row}
                    onAddStock={onAddStock}
                    onRemoveStock={onRemoveStock}
                    onViewHistory={onViewHistory}
                />,
            ],
        },
    ];

    return (
        <Box sx={{ width: '100%' }}>
            <LazyDataGrid
                rows={stockLevels}
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
