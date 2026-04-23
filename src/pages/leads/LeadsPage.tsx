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
import { LeadTable } from '../../components/tables';
import { LeadFormDialog, type LeadFormData } from '../../components/forms';
import { LeadDetailDrawer } from '../../components/drawers';
import { mockLeads, type Lead, type LeadStatus } from '../../data/mockLeads';

type TabValue = 'All' | LeadStatus;

export function LeadsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [tabValue, setTabValue] = useState<TabValue>('All');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
    const [convertDialogOpen, setConvertDialogOpen] = useState(false);
    const [leadToConvert, setLeadToConvert] = useState<Lead | null>(null);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [leadToEdit, setLeadToEdit] = useState<Lead | null>(null);
    const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
    const [leadToView, setLeadToView] = useState<Lead | null>(null);

    // Filter leads based on search query and status tab
    const filteredLeads = useMemo(() => {
        let result = mockLeads;

        // Filter by status tab
        if (tabValue !== 'All') {
            result = result.filter((lead) => lead.status === tabValue);
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (lead) =>
                    lead.id.toLowerCase().includes(query) ||
                    lead.name.toLowerCase().includes(query) ||
                    lead.email.toLowerCase().includes(query) ||
                    lead.company.toLowerCase().includes(query)
            );
        }

        return result;
    }, [searchQuery, tabValue]);

    // Count leads by status
    const statusCounts = useMemo(() => ({
        All: mockLeads.length,
        New: mockLeads.filter(l => l.status === 'New').length,
        Contacted: mockLeads.filter(l => l.status === 'Contacted').length,
        Qualified: mockLeads.filter(l => l.status === 'Qualified').length,
        Proposal: mockLeads.filter(l => l.status === 'Proposal').length,
        Negotiation: mockLeads.filter(l => l.status === 'Negotiation').length,
        Won: mockLeads.filter(l => l.status === 'Won').length,
        Lost: mockLeads.filter(l => l.status === 'Lost').length,
    }), []);

    const handleView = (lead: Lead) => {
        setLeadToView(lead);
        setDetailDrawerOpen(true);
    };

    const handleEdit = (lead: Lead) => {
        setLeadToEdit(lead);
        setEditDialogOpen(true);
    };

    const handleConvertClick = (lead: Lead) => {
        setLeadToConvert(lead);
        setConvertDialogOpen(true);
    };

    const handleConvertConfirm = () => {
        if (leadToConvert) {
            console.log('Converting lead to customer:', leadToConvert);
            // TODO: Implement actual conversion logic
            // This would typically:
            // 1. Create a new customer record
            // 2. Update lead status to 'Won'
            // 3. Link customer to lead for tracking
        }
        setConvertDialogOpen(false);
        setLeadToConvert(null);
    };

    const handleConvertCancel = () => {
        setConvertDialogOpen(false);
        setLeadToConvert(null);
    };

    const handleDeleteClick = (lead: Lead) => {
        setLeadToDelete(lead);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (leadToDelete) {
            console.log('Delete lead:', leadToDelete);
            // TODO: Implement actual delete logic
        }
        setDeleteDialogOpen(false);
        setLeadToDelete(null);
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setLeadToDelete(null);
    };

    const handleAddLead = () => {
        setCreateDialogOpen(true);
    };

    const handleCreateLead = async (data: LeadFormData) => {
        console.log('Creating lead:', data);
        // TODO: Implement actual create logic
        await new Promise((resolve) => setTimeout(resolve, 500));
    };

    const handleEditLead = async (data: LeadFormData) => {
        console.log('Updating lead:', leadToEdit?.id, data);
        // TODO: Implement actual update logic
        await new Promise((resolve) => setTimeout(resolve, 500));
    };

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                        Leads
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Track and convert potential customers through the sales pipeline.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddLead}
                    sx={{
                        bgcolor: '#171717',
                        color: '#FAFAFA',
                        '&:hover': {
                            bgcolor: '#262626',
                        },
                    }}
                >
                    Add Lead
                </Button>
            </Box>

            {/* Status Tabs */}
            <Box sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tabValue}
                    onChange={(_, newValue) => setTabValue(newValue)}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 500,
                            minWidth: 'auto',
                        },
                    }}
                >
                    <Tab label={`All (${statusCounts.All})`} value="All" />
                    <Tab label={`New (${statusCounts.New})`} value="New" />
                    <Tab label={`Contacted (${statusCounts.Contacted})`} value="Contacted" />
                    <Tab label={`Qualified (${statusCounts.Qualified})`} value="Qualified" />
                    <Tab label={`Proposal (${statusCounts.Proposal})`} value="Proposal" />
                    <Tab label={`Negotiation (${statusCounts.Negotiation})`} value="Negotiation" />
                    <Tab label={`Won (${statusCounts.Won})`} value="Won" />
                    <Tab label={`Lost (${statusCounts.Lost})`} value="Lost" />
                </Tabs>
            </Box>

            {/* Search Bar */}
            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    placeholder="Search leads by name, email, or company..."
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

            {/* Leads Table */}
            <LeadTable
                leads={filteredLeads}
                onView={handleView}
                onEdit={handleEdit}
                onConvert={handleConvertClick}
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
                    Delete Lead
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        Are you sure you want to delete lead <strong>{leadToDelete?.name}</strong>?
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

            {/* Convert to Customer Confirmation Dialog */}
            <Dialog
                open={convertDialogOpen}
                onClose={handleConvertCancel}
                aria-labelledby="convert-dialog-title"
                aria-describedby="convert-dialog-description"
            >
                <DialogTitle id="convert-dialog-title">
                    Convert Lead to Customer
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="convert-dialog-description">
                        You are about to convert <strong>{leadToConvert?.name}</strong> from{' '}
                        <strong>{leadToConvert?.company}</strong> into a customer.
                        This will create a new customer record and mark this lead as won.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConvertCancel} color="inherit">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConvertConfirm}
                        variant="contained"
                        sx={{
                            bgcolor: '#22C55E',
                            '&:hover': { bgcolor: '#16A34A' },
                        }}
                    >
                        Convert
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Create Lead Dialog */}
            <LeadFormDialog
                open={createDialogOpen}
                onClose={() => setCreateDialogOpen(false)}
                onSubmit={handleCreateLead}
                mode="create"
            />

            {/* Edit Lead Dialog */}
            <LeadFormDialog
                open={editDialogOpen}
                onClose={() => {
                    setEditDialogOpen(false);
                    setLeadToEdit(null);
                }}
                onSubmit={handleEditLead}
                defaultValues={leadToEdit ? {
                    name: leadToEdit.name,
                    email: leadToEdit.email,
                    phone: leadToEdit.phone,
                    company: leadToEdit.company,
                    source: leadToEdit.source,
                    status: leadToEdit.status,
                    value: leadToEdit.value,
                    assignedTo: leadToEdit.assignedTo,
                    notes: leadToEdit.notes,
                } : undefined}
                mode="edit"
            />

            {/* Lead Detail Drawer */}
            <LeadDetailDrawer
                open={detailDrawerOpen}
                onClose={() => {
                    setDetailDrawerOpen(false);
                    setLeadToView(null);
                }}
                lead={leadToView}
                onConvert={handleConvertClick}
            />
        </Box>
    );
}
