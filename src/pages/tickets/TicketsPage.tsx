import { useState, useMemo } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    InputAdornment,
    Tabs,
    Tab,
} from '@mui/material';
import {
    Add as AddIcon,
    Search as SearchIcon,
} from '@mui/icons-material';
import { TicketTable } from '../../components/tables';
import { TicketFormDialog, type TicketFormData } from '../../components/forms';
import { TicketDetailDrawer } from '../../components/drawers';
import { mockTickets, type Ticket, type TicketStatus } from '../../data/mockTickets';

type TabValue = 'All' | TicketStatus;

export function TicketsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [tabValue, setTabValue] = useState<TabValue>('All');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [ticketToDelete, setTicketToDelete] = useState<Ticket | null>(null);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [ticketToEdit, setTicketToEdit] = useState<Ticket | null>(null);
    const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
    const [ticketToView, setTicketToView] = useState<Ticket | null>(null);

    // Filter tickets based on search query and status tab
    const filteredTickets = useMemo(() => {
        let result = mockTickets;

        // Filter by status tab
        if (tabValue !== 'All') {
            result = result.filter((ticket) => ticket.status === tabValue);
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (ticket) =>
                    ticket.id.toLowerCase().includes(query) ||
                    ticket.subject.toLowerCase().includes(query) ||
                    ticket.customerName.toLowerCase().includes(query) ||
                    ticket.customerEmail.toLowerCase().includes(query)
            );
        }

        return result;
    }, [searchQuery, tabValue]);

    // Count tickets by status
    const statusCounts = useMemo(() => ({
        All: mockTickets.length,
        Open: mockTickets.filter(t => t.status === 'Open').length,
        'In Progress': mockTickets.filter(t => t.status === 'In Progress').length,
        Resolved: mockTickets.filter(t => t.status === 'Resolved').length,
        Closed: mockTickets.filter(t => t.status === 'Closed').length,
    }), []);

    const handleView = (ticket: Ticket) => {
        setTicketToView(ticket);
        setDetailDrawerOpen(true);
    };

    const handleEdit = (ticket: Ticket) => {
        setTicketToEdit(ticket);
        setEditDialogOpen(true);
    };

    const handleDeleteClick = (ticket: Ticket) => {
        setTicketToDelete(ticket);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (ticketToDelete) {
            console.log('Delete ticket:', ticketToDelete);
            // TODO: Implement actual delete logic
        }
        setDeleteDialogOpen(false);
        setTicketToDelete(null);
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setTicketToDelete(null);
    };

    const handleAddTicket = () => {
        setCreateDialogOpen(true);
    };

    const handleCreateTicket = async (data: TicketFormData) => {
        console.log('Creating ticket:', data);
        // TODO: Implement actual create logic
        await new Promise((resolve) => setTimeout(resolve, 500));
    };

    const handleEditTicket = async (data: TicketFormData) => {
        console.log('Updating ticket:', ticketToEdit?.id, data);
        // TODO: Implement actual update logic
        await new Promise((resolve) => setTimeout(resolve, 500));
    };

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                        Support Tickets
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage customer support requests and track issue resolution.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddTicket}
                    sx={{
                        bgcolor: '#171717',
                        color: '#FAFAFA',
                        '&:hover': {
                            bgcolor: '#262626',
                        },
                    }}
                >
                    Create Ticket
                </Button>
            </Box>

            {/* Status Tabs */}
            <Box sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tabValue}
                    onChange={(_, newValue) => setTabValue(newValue)}
                    sx={{
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 500,
                        },
                    }}
                >
                    <Tab label={`All (${statusCounts.All})`} value="All" />
                    <Tab label={`Open (${statusCounts.Open})`} value="Open" />
                    <Tab label={`In Progress (${statusCounts['In Progress']})`} value="In Progress" />
                    <Tab label={`Resolved (${statusCounts.Resolved})`} value="Resolved" />
                    <Tab label={`Closed (${statusCounts.Closed})`} value="Closed" />
                </Tabs>
            </Box>

            {/* Search Bar */}
            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    placeholder="Search tickets by ID, subject, or customer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    slotProps={{ input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    } }}
                    sx={{ maxWidth: 500 }}
                />
            </Box>

            {/* Tickets Table */}
            <TicketTable
                tickets={filteredTickets}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                aria-labelledby="delete-dialog-title"
                aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="delete-dialog-title">
                    Delete Ticket
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        Are you sure you want to delete ticket <strong>{ticketToDelete?.id}</strong>?
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="inherit">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Create Ticket Dialog */}
            <TicketFormDialog
                open={createDialogOpen}
                onClose={() => setCreateDialogOpen(false)}
                onSubmit={handleCreateTicket}
                mode="create"
            />

            {/* Edit Ticket Dialog */}
            <TicketFormDialog
                open={editDialogOpen}
                onClose={() => {
                    setEditDialogOpen(false);
                    setTicketToEdit(null);
                }}
                onSubmit={handleEditTicket}
                defaultValues={ticketToEdit ? {
                    subject: ticketToEdit.subject,
                    description: ticketToEdit.description,
                    status: ticketToEdit.status,
                    priority: ticketToEdit.priority,
                    category: ticketToEdit.category,
                } : undefined}
                mode="edit"
            />

            {/* Ticket Detail Drawer */}
            <TicketDetailDrawer
                open={detailDrawerOpen}
                onClose={() => {
                    setDetailDrawerOpen(false);
                    setTicketToView(null);
                }}
                ticket={ticketToView}
            />
        </Box>
    );
}
