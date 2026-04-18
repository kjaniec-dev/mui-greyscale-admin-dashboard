import { useState } from 'react';
import {
    type GridColDef,
    type GridRowParams,
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
import { type User } from '../../data/mockUsers';
import { getStatusSolid } from '../../theme';
import { LazyDataGrid } from './LazyDataGrid';

interface UserTableProps {
    users: User[];
    onView?: (user: User) => void;
    onEdit?: (user: User) => void;
    onDelete?: (user: User) => void;
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

function ActionsMenu({ user, onView, onEdit, onDelete }: {
    user: User;
    onView?: (user: User) => void;
    onEdit?: (user: User) => void;
    onDelete?: (user: User) => void;
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
        onView?.(user);
        handleClose();
    };

    const handleEdit = () => {
        onEdit?.(user);
        handleClose();
    };

    const handleDelete = () => {
        onDelete?.(user);
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

export function UserTable({ users, onView, onEdit, onDelete }: UserTableProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            minWidth: 200,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar
                        sx={{
                            width: 32,
                            height: 32,
                            bgcolor: isDarkMode ? '#404040' : '#E5E5E5',
                            color: isDarkMode ? '#E5E5E5' : '#171717',
                            fontSize: '0.875rem',
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
            field: 'email',
            headerName: 'Email',
            flex: 1,
            minWidth: 220,
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 120,
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
            field: 'createdAt',
            headerName: 'Created',
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
            getActions: (params: GridRowParams<User>) => [
                <ActionsMenu
                    key={params.row.id}
                    user={params.row}
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
                rows={users}
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
