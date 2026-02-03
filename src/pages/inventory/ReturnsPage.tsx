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
import { ReturnTable } from '../../components/tables';
import { ReturnFormDialog, type ReturnFormData } from '../../components/forms';
import { ReturnDetailDrawer } from '../../components/drawers';
import { mockReturns, type Return } from '../../data/mockReturns';

export function ReturnsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [reasonFilter, setReasonFilter] = useState<string>('all');
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [returnToEdit, setReturnToEdit] = useState<Return | null>(null);
    const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
    const [returnToView, setReturnToView] = useState<Return | null>(null);

    // Filter returns
    const filteredReturns = useMemo(() => {
        let filtered = mockReturns;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (returnItem) =>
                    returnItem.id.toLowerCase().includes(query) ||
                    returnItem.orderId.toLowerCase().includes(query) ||
                    returnItem.productName.toLowerCase().includes(query) ||
                    returnItem.customerName.toLowerCase().includes(query)
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter((returnItem) => returnItem.status === statusFilter);
        }

        if (reasonFilter !== 'all') {
            filtered = filtered.filter((returnItem) => returnItem.reason === reasonFilter);
        }

        return filtered;
    }, [searchQuery, statusFilter, reasonFilter]);

    const handleView = (returnItem: Return) => {
        setReturnToView(returnItem);
        setDetailDrawerOpen(true);
    };

    const handleApprove = (returnItem: Return) => {
        console.log('Approve return:', returnItem.id);
        // Open edit dialog with status set to Approved
        setReturnToEdit({ ...returnItem, status: 'Approved' } as Return);
        setEditDialogOpen(true);
    };

    const handleReject = (returnItem: Return) => {
        console.log('Reject return:', returnItem.id);
        // Open edit dialog with status set to Rejected
        setReturnToEdit({ ...returnItem, status: 'Rejected' } as Return);
        setEditDialogOpen(true);
    };

    const handleAddReturn = () => {
        setCreateDialogOpen(true);
    };

    const handleCreateReturn = async (data: ReturnFormData) => {
        console.log('Creating return:', data);
        await new Promise((resolve) => setTimeout(resolve, 500));
    };

    const handleEditReturn = async (data: ReturnFormData) => {
        console.log('Updating return:', returnToEdit?.id, data);
        await new Promise((resolve) => setTimeout(resolve, 500));
    };

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Returns
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage product returns and refund requests.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddReturn}
                    sx={{
                        bgcolor: '#171717',
                        color: '#FAFAFA',
                        '&:hover': {
                            bgcolor: '#262626',
                        },
                    }}
                >
                    Create Return
                </Button>
            </Box>

            {/* Search and Filters */}
            <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField
                    placeholder="Search returns by ID, order, product, or customer..."
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
                        value={reasonFilter}
                        onChange={(e) => setReasonFilter(e.target.value)}
                        displayEmpty
                        startAdornment={
                            <InputAdornment position="start">
                                <FilterIcon sx={{ ml: 1 }} />
                            </InputAdornment>
                        }
                    >
                        <MenuItem value="all">All Reasons</MenuItem>
                        <MenuItem value="Defective">Defective</MenuItem>
                        <MenuItem value="Wrong Item">Wrong Item</MenuItem>
                        <MenuItem value="Changed Mind">Changed Mind</MenuItem>
                        <MenuItem value="Not as Described">Not as Described</MenuItem>
                        <MenuItem value="Damaged">Damaged</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 150 }}>
                    <Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        displayEmpty
                    >
                        <MenuItem value="all">All Status</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Approved">Approved</MenuItem>
                        <MenuItem value="Rejected">Rejected</MenuItem>
                        <MenuItem value="Refunded">Refunded</MenuItem>
                        <MenuItem value="Replaced">Replaced</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Returns Table */}
            <ReturnTable
                returns={filteredReturns}
                onView={handleView}
                onApprove={handleApprove}
                onReject={handleReject}
            />

            {/* Create Return Dialog */}
            <ReturnFormDialog
                open={createDialogOpen}
                onClose={() => setCreateDialogOpen(false)}
                onSubmit={handleCreateReturn}
                mode="create"
            />

            {/* Edit/Process Return Dialog */}
            <ReturnFormDialog
                open={editDialogOpen}
                onClose={() => {
                    setEditDialogOpen(false);
                    setReturnToEdit(null);
                }}
                onSubmit={handleEditReturn}
                defaultValues={returnToEdit ? {
                    orderId: returnToEdit.orderId,
                    productName: returnToEdit.productName,
                    quantity: returnToEdit.quantity,
                    reason: returnToEdit.reason,
                    status: returnToEdit.status,
                    customerName: returnToEdit.customerName,
                    customerEmail: returnToEdit.customerEmail,
                    refundAmount: returnToEdit.refundAmount,
                    notes: returnToEdit.notes,
                } : undefined}
                mode="process"
            />

            {/* Return Detail Drawer */}
            <ReturnDetailDrawer
                open={detailDrawerOpen}
                onClose={() => {
                    setDetailDrawerOpen(false);
                    setReturnToView(null);
                }}
                returnItem={returnToView}
            />
        </Box>
    );
}
