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
    PersonAdd as ConvertIcon,
} from '@mui/icons-material';
import { type Lead, type LeadStatus, type LeadSource } from '../../data/mockLeads';
import { getStatusSolid } from '../../theme';

interface LeadTableProps {
    leads: Lead[];
    onView?: (lead: Lead) => void;
    onEdit?: (lead: Lead) => void;
    onConvert?: (lead: Lead) => void;
    onDelete?: (lead: Lead) => void;
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

function ActionsMenu({ lead, onView, onEdit, onConvert, onDelete }: {
    lead: Lead;
    onView?: (lead: Lead) => void;
    onEdit?: (lead: Lead) => void;
    onConvert?: (lead: Lead) => void;
    onDelete?: (lead: Lead) => void;
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
        onView?.(lead);
        handleClose();
    };

    const handleEdit = () => {
        onEdit?.(lead);
        handleClose();
    };

    const handleConvert = () => {
        onConvert?.(lead);
        handleClose();
    };

    const handleDelete = () => {
        onDelete?.(lead);
        handleClose();
    };

    const canConvert = lead.status !== 'Won' && lead.status !== 'Lost';

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
                {canConvert && (
                    <MenuItem onClick={handleConvert} sx={{ color: 'success.main' }}>
                        <ConvertIcon sx={{ mr: 1, fontSize: 20 }} />
                        Convert to Customer
                    </MenuItem>
                )}
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
        maximumFractionDigits: 0,
    }).format(value);
}

function formatDate(date: Date | undefined): string {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

const sourceLabels: Record<LeadSource, string> = {
    Website: 'Website',
    Referral: 'Referral',
    LinkedIn: 'LinkedIn',
    'Cold Call': 'Cold Call',
    'Trade Show': 'Trade Show',
    Advertisement: 'Ad',
};

export function LeadTable({ leads, onView, onEdit, onConvert, onDelete }: LeadTableProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Lead',
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
            flex: 0.7,
            minWidth: 130,
        },
        {
            field: 'source',
            headerName: 'Source',
            width: 100,
            renderCell: (params) => (
                <Chip
                    label={sourceLabels[params.value as LeadSource]}
                    size="small"
                    variant="outlined"
                    sx={{
                        borderColor: isDarkMode ? '#404040' : '#E5E5E5',
                        color: isDarkMode ? '#A3A3A3' : '#525252',
                        fontSize: '0.75rem',
                    }}
                />
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 110,
            renderCell: (params) => {
                const status = params.value as LeadStatus;
                const colors = getStatusSolid(status, isDarkMode);
                return (
                    <Chip
                        label={status}
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
            field: 'value',
            headerName: 'Value',
            width: 100,
            align: 'right',
            headerAlign: 'right',
            valueFormatter: (value) => formatCurrency(value),
        },
        {
            field: 'assignedTo',
            headerName: 'Assigned To',
            width: 130,
        },
        {
            field: 'lastContactedAt',
            headerName: 'Last Contact',
            width: 110,
            valueFormatter: (value) => formatDate(value),
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
                    lead={params.row}
                    onView={onView}
                    onEdit={onEdit}
                    onConvert={onConvert}
                    onDelete={onDelete}
                />
            ),
        },
    ];

    return (
        <Box sx={{ width: '100%' }}>
            <DataGrid
                rows={leads}
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
