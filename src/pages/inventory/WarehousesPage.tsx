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
import { WarehouseTable } from '../../components/tables';
import { WarehouseFormDialog, type WarehouseFormData } from '../../components/forms';
import { WarehouseDetailDrawer } from '../../components/drawers';
import { mockWarehouses, type Warehouse } from '../../data/mockWarehouses';

export function WarehousesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [countryFilter, setCountryFilter] = useState<string>('all');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [warehouseToDelete, setWarehouseToDelete] = useState<Warehouse | null>(null);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [warehouseToEdit, setWarehouseToEdit] = useState<Warehouse | null>(null);
    const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
    const [warehouseToView, setWarehouseToView] = useState<Warehouse | null>(null);

    // Get unique countries from warehouses
    const countries = useMemo(() => {
        const uniqueCountries = [...new Set(mockWarehouses.map((w) => w.country))];
        return uniqueCountries.sort();
    }, []);

    // Filter warehouses
    const filteredWarehouses = useMemo(() => {
        let filtered = mockWarehouses;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (warehouse) =>
                    warehouse.name.toLowerCase().includes(query) ||
                    warehouse.code.toLowerCase().includes(query) ||
                    warehouse.city.toLowerCase().includes(query) ||
                    warehouse.manager.toLowerCase().includes(query)
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter((warehouse) => warehouse.status === statusFilter);
        }

        if (countryFilter !== 'all') {
            filtered = filtered.filter((warehouse) => warehouse.country === countryFilter);
        }

        return filtered;
    }, [searchQuery, statusFilter, countryFilter]);

    const handleView = (warehouse: Warehouse) => {
        setWarehouseToView(warehouse);
        setDetailDrawerOpen(true);
    };

    const handleEdit = (warehouse: Warehouse) => {
        setWarehouseToEdit(warehouse);
        setEditDialogOpen(true);
    };

    const handleDeleteClick = (warehouse: Warehouse) => {
        setWarehouseToDelete(warehouse);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (warehouseToDelete) {
            console.log('Delete warehouse:', warehouseToDelete);
        }
        setDeleteDialogOpen(false);
        setWarehouseToDelete(null);
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setWarehouseToDelete(null);
    };

    const handleAddWarehouse = () => {
        setCreateDialogOpen(true);
    };

    const handleCreateWarehouse = async (data: WarehouseFormData) => {
        console.log('Creating warehouse:', data);
        await new Promise((resolve) => setTimeout(resolve, 500));
    };

    const handleEditWarehouse = async (data: WarehouseFormData) => {
        console.log('Updating warehouse:', warehouseToEdit?.id, data);
        await new Promise((resolve) => setTimeout(resolve, 500));
    };

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                        Warehouses
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage your warehouse locations and capacity.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddWarehouse}
                    sx={{
                        bgcolor: '#171717',
                        color: '#FAFAFA',
                        '&:hover': {
                            bgcolor: '#262626',
                        },
                    }}
                >
                    Add Warehouse
                </Button>
            </Box>

            {/* Search and Filters */}
            <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField
                    placeholder="Search warehouses by name, code, city, or manager..."
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
                        <MenuItem value="Maintenance">Maintenance</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Warehouses Table */}
            <WarehouseTable
                warehouses={filteredWarehouses}
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
                    Delete Warehouse
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        Are you sure you want to delete <strong>{warehouseToDelete?.name}</strong>?
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

            {/* Create Warehouse Dialog */}
            <WarehouseFormDialog
                open={createDialogOpen}
                onClose={() => setCreateDialogOpen(false)}
                onSubmit={handleCreateWarehouse}
                mode="create"
            />

            {/* Edit Warehouse Dialog */}
            <WarehouseFormDialog
                open={editDialogOpen}
                onClose={() => {
                    setEditDialogOpen(false);
                    setWarehouseToEdit(null);
                }}
                onSubmit={handleEditWarehouse}
                defaultValues={warehouseToEdit ? {
                    name: warehouseToEdit.name,
                    code: warehouseToEdit.code,
                    address: warehouseToEdit.address,
                    city: warehouseToEdit.city,
                    country: warehouseToEdit.country,
                    capacity: warehouseToEdit.capacity,
                    manager: warehouseToEdit.manager,
                    phone: warehouseToEdit.phone,
                    email: warehouseToEdit.email,
                    status: warehouseToEdit.status,
                } : undefined}
                mode="edit"
            />

            {/* Warehouse Detail Drawer */}
            <WarehouseDetailDrawer
                open={detailDrawerOpen}
                onClose={() => {
                    setDetailDrawerOpen(false);
                    setWarehouseToView(null);
                }}
                warehouse={warehouseToView}
            />
        </Box>
    );
}
