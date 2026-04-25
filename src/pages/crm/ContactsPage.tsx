import { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Chip,
    IconButton,
    Avatar,
    useTheme,
} from '@mui/material';
import {
    DataGrid,
    type GridColDef,
    type GridRenderCellParams,
    GridToolbar,
} from '@mui/x-data-grid';
import {
    Visibility as ViewIcon,
    Edit as EditIcon,
    Contacts as ContactsIcon,
} from '@mui/icons-material';
import { mockContacts, type Contact } from '../../data/mockContacts';
import { ContactDialog } from './components/ContactDialog';
import { getStatusSolid } from '../../theme';

export function ContactsPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [dialogMode, setDialogMode] = useState<'view' | 'edit'>('view');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleView = (contact: Contact) => {
        setSelectedContact(contact);
        setDialogMode('view');
        setIsDialogOpen(true);
    };

    const handleEdit = (contact: Contact) => {
        setSelectedContact(contact);
        setDialogMode('edit');
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedContact(null);
    };

    const handleSaveContact = (updatedContact: Contact) => {
        console.log('Saving contact:', updatedContact);
        const index = mockContacts.findIndex(c => c.id === updatedContact.id);
        if (index !== -1) {
            mockContacts[index] = updatedContact;
        }
        handleCloseDialog();
    };

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Contact',
            flex: 1.5,
            minWidth: 250,
            renderCell: (params: GridRenderCellParams<Contact, string>) => {
                const contact = params.row;
                const fullName = `${contact.firstName} ${contact.lastName}`;
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                            src={contact.avatar}
                            alt={fullName}
                            sx={{
                                width: 40,
                                height: 40,
                                bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                                color: isDarkMode ? '#FAFAFA' : '#171717',
                                fontSize: '1rem',
                                fontWeight: 600,
                            }}
                        >
                            {contact.firstName.charAt(0)}{contact.lastName.charAt(0)}
                        </Avatar>
                        <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {fullName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {contact.jobTitle}
                            </Typography>
                        </Box>
                    </Box>
                );
            },
        },
        {
            field: 'companyName',
            headerName: 'Company',
            flex: 1,
            minWidth: 150,
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
            minWidth: 200,
        },
        {
            field: 'phone',
            headerName: 'Phone',
            flex: 1,
            minWidth: 150,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params: GridRenderCellParams<Contact, string>) => {
                const status = params.value as Contact['status'];
                const colors = getStatusSolid(status, isDarkMode);
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
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            sortable: false,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params: GridRenderCellParams<Contact>) => (
                <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                    <IconButton
                        size="small"
                        onClick={() => handleView(params.row)}
                        sx={{ color: 'text.secondary' }}
                        title="View Details"
                    >
                        <ViewIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => handleEdit(params.row)}
                        sx={{ color: 'text.secondary' }}
                        title="Edit Contact"
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Box>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                    variant="rounded"
                    sx={{
                        bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                        color: 'text.primary',
                        width: 48,
                        height: 48,
                    }}
                >
                    <ContactsIcon />
                </Avatar>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        Contacts
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage your customer and lead contacts.
                    </Typography>
                </Box>
            </Box>

            <Paper
                sx={{
                    width: '100%',
                    bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                    border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                    borderRadius: 2,
                    overflow: 'hidden',
                    '& .MuiDataGrid-root': {
                        border: 'none',
                    },
                    '& .MuiDataGrid-cell': {
                        borderColor: isDarkMode ? '#262626' : '#E5E5E5',
                        display: 'flex',
                        alignItems: 'center',
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
                    autoHeight
                    rows={mockContacts}
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

            <ContactDialog
                open={isDialogOpen}
                onClose={handleCloseDialog}
                contact={selectedContact}
                mode={dialogMode}
                onSave={handleSaveContact}
                onEdit={handleEdit}
            />
        </Box>
    );
}
