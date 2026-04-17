import { useState, useMemo } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
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
import { ShipmentTable } from '../../components/tables/ShipmentTable';
import { ShipmentFormDialog, type ShipmentFormData } from '../../components/forms/ShipmentFormDialog';
import { ShipmentDetailDrawer } from '../../components/drawers/ShipmentDetailDrawer';
import { mockShipments, type Shipment } from '../../data/mockShipments';

export function ShippingPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [carrierFilter, setCarrierFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [shipmentToEdit, setShipmentToEdit] = useState<Shipment | null>(null);
    const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
    const [shipmentToView, setShipmentToView] = useState<Shipment | null>(null);

    // Filter shipments
    const filteredShipments = useMemo(() => {
        let filtered = mockShipments;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (shipment) =>
                    shipment.id.toLowerCase().includes(query) ||
                    shipment.orderNumber.toLowerCase().includes(query) ||
                    shipment.trackingNumber.toLowerCase().includes(query) ||
                    shipment.customerName.toLowerCase().includes(query)
            );
        }

        if (carrierFilter !== 'all') {
            filtered = filtered.filter((shipment) => shipment.carrier === carrierFilter);
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter((shipment) => shipment.status === statusFilter);
        }

        return filtered;
    }, [searchQuery, carrierFilter, statusFilter]);

    const handleView = (shipment: Shipment) => {
        setShipmentToView(shipment);
        setDetailDrawerOpen(true);
    };

    const handleEdit = (shipment: Shipment) => {
        setShipmentToEdit(shipment);
        setEditDialogOpen(true);
    };

    const handleMarkDelivered = (shipment: Shipment) => {
        console.log('Mark delivered:', shipment.id);
        setShipmentToEdit({ ...shipment, status: 'Delivered' } as Shipment);
        setEditDialogOpen(true);
    };

    const handleAddShipment = () => {
        setCreateDialogOpen(true);
    };

    const handleCreateShipment = async (data: ShipmentFormData) => {
        console.log('Creating shipment:', data);
        await new Promise((resolve) => setTimeout(resolve, 500));
    };

    const handleEditShipment = async (data: ShipmentFormData) => {
        console.log('Updating shipment:', shipmentToEdit?.id, data);
        await new Promise((resolve) => setTimeout(resolve, 500));
    };

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Shipping
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage shipments, track packages, and monitor carrier deliveries.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddShipment}
                    sx={{
                        bgcolor: '#171717',
                        color: '#FAFAFA',
                        '&:hover': {
                            bgcolor: '#262626',
                        },
                    }}
                >
                    Create Shipment
                </Button>
            </Box>

            {/* Search and Filters */}
            <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField
                    placeholder="Search by ID, order, tracking #, or customer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ flex: 1, minWidth: 300 }}
                />
                <FormControl sx={{ minWidth: 150 }}>
                    <Select
                        value={carrierFilter}
                        onChange={(e) => setCarrierFilter(e.target.value)}
                        displayEmpty
                        startAdornment={
                            <InputAdornment position="start">
                                <FilterIcon sx={{ ml: 1 }} />
                            </InputAdornment>
                        }
                    >
                        <MenuItem value="all">All Carriers</MenuItem>
                        <MenuItem value="FedEx">FedEx</MenuItem>
                        <MenuItem value="UPS">UPS</MenuItem>
                        <MenuItem value="USPS">USPS</MenuItem>
                        <MenuItem value="DHL">DHL</MenuItem>
                        <MenuItem value="Amazon">Amazon</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 170 }}>
                    <Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        displayEmpty
                    >
                        <MenuItem value="all">All Status</MenuItem>
                        <MenuItem value="Label Created">Label Created</MenuItem>
                        <MenuItem value="Picked Up">Picked Up</MenuItem>
                        <MenuItem value="In Transit">In Transit</MenuItem>
                        <MenuItem value="Out for Delivery">Out for Delivery</MenuItem>
                        <MenuItem value="Delivered">Delivered</MenuItem>
                        <MenuItem value="Exception">Exception</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Shipments Table */}
            <ShipmentTable
                shipments={filteredShipments}
                onView={handleView}
                onEdit={handleEdit}
                onMarkDelivered={handleMarkDelivered}
            />

            {/* Create Shipment Dialog */}
            <ShipmentFormDialog
                open={createDialogOpen}
                onClose={() => setCreateDialogOpen(false)}
                onSubmit={handleCreateShipment}
                mode="create"
            />

            {/* Edit Shipment Dialog */}
            <ShipmentFormDialog
                open={editDialogOpen}
                onClose={() => {
                    setEditDialogOpen(false);
                    setShipmentToEdit(null);
                }}
                onSubmit={handleEditShipment}
                defaultValues={shipmentToEdit ? {
                    orderId: shipmentToEdit.orderId,
                    orderNumber: shipmentToEdit.orderNumber,
                    customerName: shipmentToEdit.customerName,
                    carrier: shipmentToEdit.carrier,
                    trackingNumber: shipmentToEdit.trackingNumber,
                    shippingMethod: shipmentToEdit.shippingMethod,
                    weight: shipmentToEdit.weight,
                    shippingCost: shipmentToEdit.shippingCost,
                    origin: shipmentToEdit.origin,
                    destination: shipmentToEdit.destination,
                    estimatedDelivery: new Date(shipmentToEdit.estimatedDelivery).toISOString().split('T')[0],
                    status: shipmentToEdit.status,
                } : undefined}
                mode="edit"
            />

            {/* Shipment Detail Drawer */}
            <ShipmentDetailDrawer
                open={detailDrawerOpen}
                onClose={() => {
                    setDetailDrawerOpen(false);
                    setShipmentToView(null);
                }}
                shipment={shipmentToView}
            />
        </Box>
    );
}
