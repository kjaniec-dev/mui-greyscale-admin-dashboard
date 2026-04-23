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
    MenuItem,
    Select,
    FormControl,
} from '@mui/material';
import {
    Add as AddIcon,
    Search as SearchIcon,
    FilterList as FilterIcon,
} from '@mui/icons-material';
import { InvoiceTable } from '../../components/tables';
import { InvoiceDetailDrawer } from '../../components/drawers';
import { mockInvoices, type Invoice } from '../../data/mockInvoices';

export function InvoicesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [invoiceToDelete, setInvoiceToDelete] = useState<Invoice | null>(null);
    const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
    const [invoiceToView, setInvoiceToView] = useState<Invoice | null>(null);

    // Filter invoices based on search query and status filter
    const filteredInvoices = useMemo(() => {
        let filtered = mockInvoices;

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (invoice) =>
                    invoice.invoiceNumber.toLowerCase().includes(query) ||
                    invoice.customer.name.toLowerCase().includes(query) ||
                    invoice.customer.email.toLowerCase().includes(query)
            );
        }

        // Apply status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter((invoice) => invoice.status === statusFilter);
        }

        return filtered;
    }, [searchQuery, statusFilter]);

    const handleView = (invoice: Invoice) => {
        setInvoiceToView(invoice);
        setDetailDrawerOpen(true);
    };

    const handleEdit = (invoice: Invoice) => {
        console.log('Edit invoice:', invoice);
        // TODO: Open edit dialog
    };

    const handleDeleteClick = (invoice: Invoice) => {
        setInvoiceToDelete(invoice);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (invoiceToDelete) {
            console.log('Delete invoice:', invoiceToDelete);
            // TODO: Implement actual delete logic
        }
        setDeleteDialogOpen(false);
        setInvoiceToDelete(null);
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setInvoiceToDelete(null);
    };

    const handleCreateInvoice = () => {
        console.log('Create new invoice');
        // TODO: Open create dialog
    };

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                        Invoices
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage and track your invoices.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleCreateInvoice}
                    sx={{
                        bgcolor: '#171717',
                        color: '#FAFAFA',
                        '&:hover': {
                            bgcolor: '#262626',
                        },
                    }}
                >
                    Create Invoice
                </Button>
            </Box>

            {/* Search and Filters */}
            <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField
                    placeholder="Search by invoice number, customer name, or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    slotProps={{ input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    } }}
                    sx={{ flex: 1, minWidth: 300 }}
                />
                <FormControl sx={{ minWidth: 150 }}>
                    <Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        displayEmpty
                        startAdornment={
                            <InputAdornment position="start">
                                <FilterIcon sx={{ ml: 1 }} />
                            </InputAdornment>
                        }
                    >
                        <MenuItem value="all">All Status</MenuItem>
                        <MenuItem value="Draft">Draft</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Paid">Paid</MenuItem>
                        <MenuItem value="Overdue">Overdue</MenuItem>
                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Invoices Table */}
            <InvoiceTable
                invoices={filteredInvoices}
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
                    Delete Invoice
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        Are you sure you want to delete invoice <strong>{invoiceToDelete?.invoiceNumber}</strong>?
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

            {/* Invoice Detail Drawer */}
            <InvoiceDetailDrawer
                open={detailDrawerOpen}
                onClose={() => {
                    setDetailDrawerOpen(false);
                    setInvoiceToView(null);
                }}
                invoice={invoiceToView}
            />
        </Box>
    );
}
