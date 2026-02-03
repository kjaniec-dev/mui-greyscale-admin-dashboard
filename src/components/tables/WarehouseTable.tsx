import { useState } from 'react';
import {
    DataGrid,
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
    LinearProgress,
    useTheme,
} from '@mui/material';
import {
    MoreVert as MoreVertIcon,
    Visibility as ViewIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import type { Warehouse } from '../../data/mockWarehouses';

interface WarehouseTableProps {
    warehouses: Warehouse[];
    onView?: (warehouse: Warehouse) => void;
    onEdit?: (warehouse: Warehouse) => void;
    onDelete?: (warehouse: Warehouse) => void;
}

function ActionsMenu({ warehouse, onView, onEdit, onDelete }: {
    warehouse: Warehouse;
    onView?: (warehouse: Warehouse) => void;
    onEdit?: (warehouse: Warehouse) => void;
    onDelete?: (warehouse: Warehouse) => void;
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
        onView?.(warehouse);
        handleClose();
    };

    const handleEdit = () => {
        onEdit?.(warehouse);
        handleClose();
    };

    const handleDelete = () => {
        onDelete?.(warehouse);
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

export function WarehouseTable({ warehouses, onView, onEdit, onDelete }: WarehouseTableProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Warehouse',
            flex: 1,
            minWidth: 200,
            renderCell: (params) => (
                <Box>
                    <Typography variant="body2" fontWeight={500}>
                        {params.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {params.row.code}
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
            field: 'capacity',
            headerName: 'Capacity',
            width: 180,
            renderCell: (params) => {
                const usedPercent = (params.row.usedCapacity / params.value) * 100;
                const getColor = () => {
                    if (usedPercent >= 90) return isDarkMode ? '#DC2626' : '#EF4444';
                    if (usedPercent >= 70) return isDarkMode ? '#D97706' : '#F59E0B';
                    return isDarkMode ? '#525252' : '#A3A3A3';
                };
                return (
                    <Box sx={{ width: '100%', pr: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="caption">
                                {params.row.usedCapacity.toLocaleString()}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                / {params.value.toLocaleString()}
                            </Typography>
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={usedPercent}
                            sx={{
                                height: 6,
                                borderRadius: 1,
                                bgcolor: isDarkMode ? '#404040' : '#E5E5E5',
                                '& .MuiLinearProgress-bar': {
                                    bgcolor: getColor(),
                                    borderRadius: 1,
                                },
                            }}
                        />
                    </Box>
                );
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 130,
            renderCell: (params) => {
                const statusColors = {
                    'Active': isDarkMode ? '#22C55E' : '#16A34A',
                    'Inactive': isDarkMode ? '#A3A3A3' : '#525252',
                    'Maintenance': isDarkMode ? '#D97706' : '#F59E0B',
                };
                return (
                    <Chip
                        label={params.value}
                        size="small"
                        sx={{
                            bgcolor: statusColors[params.value as keyof typeof statusColors],
                            color: '#FAFAFA',
                            fontWeight: 500,
                            borderRadius: 1,
                        }}
                    />
                );
            },
        },
        {
            field: 'manager',
            headerName: 'Manager',
            width: 150,
            renderCell: (params) => (
                <Typography variant="body2">
                    {params.value}
                </Typography>
            ),
        },
        {
            field: 'phone',
            headerName: 'Contact',
            width: 150,
            renderCell: (params) => (
                <Typography variant="body2" color="text.secondary">
                    {params.value}
                </Typography>
            ),
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 80,
            getActions: (params: GridRowParams<Warehouse>) => [
                <ActionsMenu
                    key={params.row.id}
                    warehouse={params.row}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />,
            ],
        },
    ];

    return (
        <Box sx={{ width: '100%' }}>
            <DataGrid
                rows={warehouses}
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
