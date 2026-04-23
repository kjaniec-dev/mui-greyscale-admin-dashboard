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
import { SupplierTable } from '../../components/tables';
import { SupplierFormDialog, type SupplierFormData } from '../../components/forms';
import { SupplierDetailDrawer } from '../../components/drawers';
import { mockSuppliers, type Supplier } from '../../data/mockSuppliers';

export function SuppliersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [countryFilter, setCountryFilter] = useState<string>('all');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [supplierToDelete, setSupplierToDelete] = useState<Supplier | null>(null);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [supplierToEdit, setSupplierToEdit] = useState<Supplier | null>(null);
    const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
    const [supplierToView, setSupplierToView] = useState<Supplier | null>(null);

    // Get unique countries from suppliers
    const countries = useMemo(() => {
        const uniqueCountries = [...new Set(mockSuppliers.map((s) => s.country))];
        return uniqueCountries.sort();
    }, []);

    // Filter suppliers
    const filteredSuppliers = useMemo(() => {
        let filtered = mockSuppliers;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (supplier) =>
                    supplier.name.toLowerCase().includes(query) ||
                    supplier.contactName.toLowerCase().includes(query) ||
                    supplier.email.toLowerCase().includes(query) ||
                    supplier.city.toLowerCase().includes(query)
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter((supplier) => supplier.status === statusFilter);
        }

        if (countryFilter !== 'all') {
            filtered = filtered.filter((supplier) => supplier.country === countryFilter);
        }

        return filtered;
    }, [searchQuery, statusFilter, countryFilter]);

    const handleView = (supplier: Supplier) => {
        setSupplierToView(supplier);
        setDetailDrawerOpen(true);
    };

    const handleEdit = (supplier: Supplier) => {
        setSupplierToEdit(supplier);
        setEditDialogOpen(true);
    };

    const handleDeleteClick = (supplier: Supplier) => {
        setSupplierToDelete(supplier);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (supplierToDelete) {
            console.log('Delete supplier:', supplierToDelete);
        }
        setDeleteDialogOpen(false);
        setSupplierToDelete(null);
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setSupplierToDelete(null);
    };

    const handleAddSupplier = () => {
        setCreateDialogOpen(true);
    };

    const handleCreateSupplier = async (data: SupplierFormData) => {
        console.log('Creating supplier:', data);
        await new Promise((resolve) => setTimeout(resolve, 500));
    };

    const handleEditSupplier = async (data: SupplierFormData) => {
        console.log('Updating supplier:', supplierToEdit?.id, data);
        await new Promise((resolve) => setTimeout(resolve, 500));
    };

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                        Suppliers
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage your supplier relationships and performance.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddSupplier}
                    sx={{
                        bgcolor: '#171717',
                        color: '#FAFAFA',
                        '&:hover': {
                            bgcolor: '#262626',
                        },
                    }}
                >
                    Add Supplier
                </Button>
            </Box>

            {/* Search and Filters */}
            <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField
                    placeholder="Search suppliers by name, contact, email, or city..."
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
                        value={countryFilter}
                        onChange={(e) => setCountryFilter(e.target.value)}
                        displayEmpty
                        startAdornment={
                            <InputAdornment position="start">
                                <FilterIcon sx={{ ml: 1 }} />
                            </InputAdornment>
                        }
                    >
                        <MenuItem value="all">All Countries</MenuItem>
                        {countries.map((country) => (
                            <MenuItem key={country} value={country}>
                                {country}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 150 }}>
                    <Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        displayEmpty
                    >
                        <MenuItem value="all">All Status</MenuItem>
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Suppliers Table */}
            <SupplierTable
                suppliers={filteredSuppliers}
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
                    Delete Supplier
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        Are you sure you want to delete <strong>{supplierToDelete?.name}</strong>?
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

            {/* Create Supplier Dialog */}
            <SupplierFormDialog
                open={createDialogOpen}
                onClose={() => setCreateDialogOpen(false)}
                onSubmit={handleCreateSupplier}
                mode="create"
            />

            {/* Edit Supplier Dialog */}
            <SupplierFormDialog
                open={editDialogOpen}
                onClose={() => {
                    setEditDialogOpen(false);
                    setSupplierToEdit(null);
                }}
                onSubmit={handleEditSupplier}
                defaultValues={supplierToEdit ? {
                    name: supplierToEdit.name,
                    contactName: supplierToEdit.contactName,
                    email: supplierToEdit.email,
                    phone: supplierToEdit.phone,
                    address: supplierToEdit.address,
                    city: supplierToEdit.city,
                    country: supplierToEdit.country,
                    status: supplierToEdit.status,
                    rating: supplierToEdit.rating,
                } : undefined}
                mode="edit"
            />

            {/* Supplier Detail Drawer */}
            <SupplierDetailDrawer
                open={detailDrawerOpen}
                onClose={() => {
                    setDetailDrawerOpen(false);
                    setSupplierToView(null);
                }}
                supplier={supplierToView}
            />
        </Box>
    );
}
