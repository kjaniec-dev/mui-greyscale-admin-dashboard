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
} from '@mui/material';
import {
    Add as AddIcon,
    Search as SearchIcon,
} from '@mui/icons-material';
import { CustomerTable } from '../../components/tables';
import { CustomerFormDialog, type CustomerFormData } from '../../components/forms';
import { CustomerDetailDrawer } from '../../components/drawers';
import { mockCustomers, type Customer } from '../../data/mockCustomers';

export function CustomersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [customerToEdit, setCustomerToEdit] = useState<Customer | null>(null);
    const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
    const [customerToView, setCustomerToView] = useState<Customer | null>(null);

    // Filter customers based on search query
    const filteredCustomers = useMemo(() => {
        if (!searchQuery) return mockCustomers;

        const query = searchQuery.toLowerCase();
        return mockCustomers.filter(
            (customer) =>
                customer.name.toLowerCase().includes(query) ||
                customer.email.toLowerCase().includes(query) ||
                (customer.company?.toLowerCase().includes(query) ?? false)
        );
    }, [searchQuery]);

    const handleView = (customer: Customer) => {
        setCustomerToView(customer);
        setDetailDrawerOpen(true);
    };

    const handleEdit = (customer: Customer) => {
        setCustomerToEdit(customer);
        setEditDialogOpen(true);
    };

    const handleDeleteClick = (customer: Customer) => {
        setCustomerToDelete(customer);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (customerToDelete) {
            console.log('Delete customer:', customerToDelete);
            // TODO: Implement actual delete logic
        }
        setDeleteDialogOpen(false);
        setCustomerToDelete(null);
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setCustomerToDelete(null);
    };

    const handleAddCustomer = () => {
        setCreateDialogOpen(true);
    };

    const handleCreateCustomer = async (data: CustomerFormData) => {
        console.log('Creating customer:', data);
        // TODO: Implement actual create logic (API call, state update, etc.)
        await new Promise((resolve) => setTimeout(resolve, 500));
    };

    const handleEditCustomer = async (data: CustomerFormData) => {
        console.log('Updating customer:', customerToEdit?.id, data);
        // TODO: Implement actual update logic (API call, state update, etc.)
        await new Promise((resolve) => setTimeout(resolve, 500));
    };

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Customers
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage your customer relationships and track their activity.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddCustomer}
                    sx={{
                        bgcolor: '#171717',
                        color: '#FAFAFA',
                        '&:hover': {
                            bgcolor: '#262626',
                        },
                    }}
                >
                    Add Customer
                </Button>
            </Box>

            {/* Search Bar */}
            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    placeholder="Search customers by name, email, or company..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ maxWidth: 500 }}
                />
            </Box>

            {/* Customers Table */}
            <CustomerTable
                customers={filteredCustomers}
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
                    Delete Customer
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        Are you sure you want to delete <strong>{customerToDelete?.name}</strong>?
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

            {/* Create Customer Dialog */}
            <CustomerFormDialog
                open={createDialogOpen}
                onClose={() => setCreateDialogOpen(false)}
                onSubmit={handleCreateCustomer}
                mode="create"
            />

            {/* Edit Customer Dialog */}
            <CustomerFormDialog
                open={editDialogOpen}
                onClose={() => {
                    setEditDialogOpen(false);
                    setCustomerToEdit(null);
                }}
                onSubmit={handleEditCustomer}
                defaultValues={customerToEdit ? {
                    name: customerToEdit.name,
                    email: customerToEdit.email,
                    phone: customerToEdit.phone,
                    company: customerToEdit.company,
                    status: customerToEdit.status,
                } : undefined}
                mode="edit"
            />

            {/* Customer Detail Drawer */}
            <CustomerDetailDrawer
                open={detailDrawerOpen}
                onClose={() => {
                    setDetailDrawerOpen(false);
                    setCustomerToView(null);
                }}
                customer={customerToView}
            />
        </Box>
    );
}
