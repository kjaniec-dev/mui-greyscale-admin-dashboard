import { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Chip,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    useTheme,
    Divider,
} from '@mui/material';
import {
    DataGrid,
    type GridColDef,
    type GridRenderCellParams,
    GridToolbar,
} from '@mui/x-data-grid';
import {
    MoreVert as MoreVertIcon,
    Visibility as ViewIcon,
    Edit as EditIcon,
    Cancel as CancelIcon,
    Pause as PauseIcon,
} from '@mui/icons-material';
import { mockSubscriptions, type Subscription } from '../../data/mockSubscriptions';

export function SubscriptionsPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const getStatusColor = (status: Subscription['status']) => {
        switch (status) {
            case 'Active':
                return { bg: isDarkMode ? '#064E3B' : '#ECFDF5', text: isDarkMode ? '#34D399' : '#059669' };
            case 'Past Due':
                return { bg: isDarkMode ? '#7F1D1D' : '#FEF2F2', text: isDarkMode ? '#F87171' : '#DC2626' };
            case 'Cancelled':
                return { bg: isDarkMode ? '#262626' : '#F3F4F6', text: isDarkMode ? '#A3A3A3' : '#6B7280' };
            case 'Paused':
                return { bg: isDarkMode ? '#78350F' : '#FFFBEB', text: isDarkMode ? '#FBBF24' : '#D97706' };
            default:
                return { bg: 'default', text: 'default' };
        }
    };

    const columns: GridColDef[] = [
        {
            field: 'user',
            headerName: 'Subscriber',
            flex: 1.5,
            minWidth: 220,
            renderCell: (params: GridRenderCellParams<Subscription, Subscription['user']>) => {
                const user = params.value;
                if (!user) return null;
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                            src={user.avatar}
                            alt={user.name}
                            sx={{
                                width: 32,
                                height: 32,
                                bgcolor: isDarkMode ? '#404040' : '#E5E5E5',
                                color: isDarkMode ? '#FAFAFA' : '#171717',
                                fontSize: '0.875rem',
                            }}
                        >
                            {user.name.charAt(0)}
                        </Avatar>
                        <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
                            <Typography variant="body2" fontWeight={500}>
                                {user.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {user.email}
                            </Typography>
                        </Box>
                    </Box>
                );
            },
        },
        {
            field: 'plan',
            headerName: 'Plan',
            flex: 1,
            minWidth: 150,
            valueGetter: (_, row: Subscription) => row.plan.name,
            renderCell: (params: GridRenderCellParams<Subscription, Subscription['plan']>) => {
                const plan = params.value;
                if (!plan) return null;
                return (
                    <Box>
                        <Typography variant="body2" fontWeight={500}>
                            {plan.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            ${plan.price}/{plan.interval === 'Monthly' ? 'mo' : 'yr'}
                        </Typography>
                    </Box>
                );
            }
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params: GridRenderCellParams<Subscription, string>) => {
                const status = params.value as Subscription['status'];
                const colors = getStatusColor(status);
                return (
                    <Chip
                        label={status}
                        size="small"
                        sx={{
                            bgcolor: colors.bg,
                            color: colors.text,
                            fontWeight: 600,
                            borderRadius: '6px',
                            height: 24,
                        }}
                    />
                );
            },
        },
        {
            field: 'nextBillingDate',
            headerName: 'Next Billing',
            width: 150,
            type: 'date',
            valueGetter: (value) => value && new Date(value),
            renderCell: (params: GridRenderCellParams<Subscription, Date>) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <Typography variant="body2" color="text.secondary">
                            {params.value?.toLocaleDateString()}
                        </Typography>
                    </Box>
                );
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 80,
            sortable: false,
            renderCell: () => (
                <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e)}
                    sx={{ color: 'text.secondary' }}
                >
                    <MoreVertIcon fontSize="small" />
                </IconButton>
            ),
        },
    ];

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Subscriptions
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Manage recurring billing and subscriber plans.
                </Typography>
            </Box>

            <Paper
                sx={{
                    height: 700,
                    width: '100%',
                    bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                    border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                    borderRadius: 2,
                    '& .MuiDataGrid-root': {
                        border: 'none',
                    },
                    '& .MuiDataGrid-cell': {
                        borderColor: isDarkMode ? '#262626' : '#E5E5E5',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        borderColor: isDarkMode ? '#262626' : '#E5E5E5',
                        bgcolor: isDarkMode ? '#171717' : '#FAFAFA',
                    },
                    '& .MuiDataGrid-row:hover': {
                        bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                    },
                }}
            >
                <DataGrid
                    rows={mockSubscriptions}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10, page: 0 },
                        },
                    }}
                    pageSizeOptions={[10, 25, 50]}
                    disableRowSelectionOnClick
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                        },
                    }}
                    sx={{
                        '& .MuiDataGrid-toolbarContainer': {
                            p: 2,
                            borderBottom: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                        },
                    }}
                />
            </Paper>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: {
                        minWidth: 160,
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                        border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                        bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                    },
                }}
            >
                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                        <ViewIcon fontSize="small" sx={{ color: isDarkMode ? '#FAFAFA' : '#171717' }} />
                    </ListItemIcon>
                    <Typography variant="body2">View Details</Typography>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" sx={{ color: isDarkMode ? '#FAFAFA' : '#171717' }} />
                    </ListItemIcon>
                    <Typography variant="body2">Change Plan</Typography>
                </MenuItem>
                <Divider sx={{ my: 1, borderColor: isDarkMode ? '#262626' : '#E5E5E5' }} />
                <MenuItem onClick={handleMenuClose} sx={{ color: 'warning.main' }}>
                    <ListItemIcon>
                        <PauseIcon fontSize="small" color="warning" />
                    </ListItemIcon>
                    <Typography variant="body2">Pause Subscription</Typography>
                </MenuItem>
                <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
                    <ListItemIcon>
                        <CancelIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    <Typography variant="body2">Cancel Subscription</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
}
