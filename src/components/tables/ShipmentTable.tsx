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
    CheckCircle as DeliveredIcon,
} from '@mui/icons-material';
import type { Shipment } from '../../data/mockShipments';
import { getStatusSolid } from '../../theme';
import { LazyDataGrid } from './LazyDataGrid';

interface ShipmentTableProps {
    shipments: Shipment[];
    onView?: (shipment: Shipment) => void;
    onEdit?: (shipment: Shipment) => void;
    onMarkDelivered?: (shipment: Shipment) => void;
}

function ActionsMenu({ shipment, onView, onEdit, onMarkDelivered }: {
    shipment: Shipment;
    onView?: (shipment: Shipment) => void;
    onEdit?: (shipment: Shipment) => void;
    onMarkDelivered?: (shipment: Shipment) => void;
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const canMarkDelivered = shipment.status !== 'Delivered' && shipment.status !== 'Exception';

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleView = () => {
        onView?.(shipment);
        handleClose();
    };

    const handleEdit = () => {
        onEdit?.(shipment);
        handleClose();
    };

    const handleMarkDelivered = () => {
        onMarkDelivered?.(shipment);
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
                <MenuItem onClick={handleEdit}>
                    <EditIcon sx={{ mr: 1, fontSize: 20 }} />
                    Edit
                </MenuItem>
                {canMarkDelivered && (
                    <MenuItem onClick={handleMarkDelivered} sx={{ color: 'success.main' }}>
                        <DeliveredIcon sx={{ mr: 1, fontSize: 20 }} />
                        Mark Delivered
                    </MenuItem>
                )}
            </Menu>
        </>
    );
}

export function ShipmentTable({ shipments, onView, onEdit, onMarkDelivered }: ShipmentTableProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Shipment ID',
            width: 130,
            renderCell: (params) => (
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {params.value}
                </Typography>
            ),
        },
        {
            field: 'orderNumber',
            headerName: 'Order',
            width: 150,
            renderCell: (params) => (
                <Typography variant="body2" color="text.secondary">
                    {params.value}
                </Typography>
            ),
        },
        {
            field: 'customerName',
            headerName: 'Customer',
            flex: 1,
            minWidth: 150,
            renderCell: (params) => (
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {params.value}
                </Typography>
            ),
        },
        {
            field: 'carrier',
            headerName: 'Carrier',
            width: 100,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    size="small"
                    sx={{
                        bgcolor: isDarkMode ? '#404040' : '#E5E5E5',
                        color: isDarkMode ? '#E5E5E5' : '#171717',
                        fontWeight: 500,
                        borderRadius: 1,
                        fontSize: '0.75rem',
                    }}
                />
            ),
        },
        {
            field: 'trackingNumber',
            headerName: 'Tracking #',
            width: 180,
            renderCell: (params) => (
                <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                    {params.value}
                </Typography>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 140,
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
            field: 'shippingMethod',
            headerName: 'Method',
            width: 110,
            renderCell: (params) => (
                <Typography variant="body2" color="text.secondary">
                    {params.value}
                </Typography>
            ),
        },
        {
            field: 'shippingCost',
            headerName: 'Cost',
            width: 90,
            renderCell: (params) => (
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    ${params.value.toFixed(2)}
                </Typography>
            ),
        },
        {
            field: 'estimatedDelivery',
            headerName: 'Est. Delivery',
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
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 80,
            getActions: (params: GridRowParams<Shipment>) => [
                <ActionsMenu
                    key={params.row.id}
                    shipment={params.row}
                    onView={onView}
                    onEdit={onEdit}
                    onMarkDelivered={onMarkDelivered}
                />,
            ],
        },
    ];

    return (
        <Box sx={{ width: '100%' }}>
            <LazyDataGrid
                rows={shipments}
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
