import { useState } from 'react';
import {
    Box,
    Avatar,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    useTheme,
} from '@mui/material';
import {
    DataGrid,
    type GridColDef,
} from '@mui/x-data-grid';
import {
    MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import type { Ticket } from '../../data/mockTickets';
import { getStatusSolid } from '../../theme';

interface TicketTableProps {
    tickets: Ticket[];
    onView?: (ticket: Ticket) => void;
    onEdit?: (ticket: Ticket) => void;
    onDelete?: (ticket: Ticket) => void;
}

// Actions menu component
function ActionsMenu({ ticket, onView, onEdit, onDelete }: {
    ticket: Ticket;
    onView?: (ticket: Ticket) => void;
    onEdit?: (ticket: Ticket) => void;
    onDelete?: (ticket: Ticket) => void;
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleView = () => {
        handleClose();
        onView?.(ticket);
    };

    const handleEdit = () => {
        handleClose();
        onEdit?.(ticket);
    };

    const handleDelete = () => {
        handleClose();
        onDelete?.(ticket);
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
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem onClick={handleView}>View</MenuItem>
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>Delete</MenuItem>
            </Menu>
        </>
    );
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

export function TicketTable({ tickets, onView, onEdit, onDelete }: TicketTableProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const priorityColors: Record<string, { bg: string; color: string }> = {
        Low: {
            bg: isDarkMode ? '#6B7280' : '#F3F4F6',
            color: isDarkMode ? '#FFFFFF' : '#374151'
        },
        Medium: {
            bg: isDarkMode ? '#3B82F6' : '#DBEAFE',
            color: isDarkMode ? '#FFFFFF' : '#1E40AF'
        },
        High: {
            bg: isDarkMode ? '#F59E0B' : '#FEF3C7',
            color: isDarkMode ? '#FFFFFF' : '#92400E'
        },
        Urgent: {
            bg: isDarkMode ? '#EF4444' : '#FEE2E2',
            color: isDarkMode ? '#FFFFFF' : '#991B1B'
        },
    };

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Ticket ID',
            width: 110,
            renderCell: (params) => (
                <Box sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
                    {params.value}
                </Box>
            ),
        },
        {
            field: 'subject',
            headerName: 'Subject',
            flex: 1,
            minWidth: 200,
            renderCell: (params) => (
                <Box sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontWeight: 500,
                }}>
                    {params.value}
                </Box>
            ),
        },
        {
            field: 'customerName',
            headerName: 'Customer',
            width: 180,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar
                        sx={{
                            width: 28,
                            height: 28,
                            bgcolor: isDarkMode ? '#404040' : '#E5E5E5',
                            color: isDarkMode ? '#E5E5E5' : '#171717',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                        }}
                    >
                        {getInitials(params.value)}
                    </Avatar>
                    <Box sx={{ fontWeight: 500 }}>{params.value}</Box>
                </Box>
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
            field: 'priority',
            headerName: 'Priority',
            width: 100,
            renderCell: (params) => {
                const colors = priorityColors[params.value] || priorityColors.Low;
                return (
                    <Chip
                        label={params.value}
                        size="small"
                        sx={{
                            bgcolor: colors.bg,
                            color: colors.color,
                            fontWeight: 500,
                            borderRadius: 1,
                        }}
                    />
                );
            },
        },
        {
            field: 'category',
            headerName: 'Category',
            width: 130,
        },
        {
            field: 'assignedTo',
            headerName: 'Assigned To',
            width: 140,
            renderCell: (params) => params.value || '—',
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
                    ticket={params.row}
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
                rows={tickets}
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
