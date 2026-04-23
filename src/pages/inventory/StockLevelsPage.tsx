import { useState, useMemo } from 'react';
import {
    Box,
    TextField,
    Typography,
    InputAdornment,
    MenuItem,
    Select,
    FormControl,
} from '@mui/material';
import {
    Search as SearchIcon,
    FilterList as FilterIcon,
} from '@mui/icons-material';
import { StockLevelTable } from '../../components/tables';
import { StockAdjustmentDialog, type StockAdjustmentFormData } from '../../components/forms';
import { mockStockLevels, type StockLevel } from '../../data/mockStockLevels';

export function StockLevelsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [warehouseFilter, setWarehouseFilter] = useState<string>('all');
    const [addStockDialogOpen, setAddStockDialogOpen] = useState(false);
    const [removeStockDialogOpen, setRemoveStockDialogOpen] = useState(false);
    const [selectedStockLevel, setSelectedStockLevel] = useState<StockLevel | null>(null);

    // Get unique warehouses from stock levels
    const warehouses = useMemo(() => {
        const uniqueWarehouses = [...new Set(mockStockLevels.map((s) => s.warehouseName))];
        return uniqueWarehouses.sort();
    }, []);

    // Filter stock levels
    const filteredStockLevels = useMemo(() => {
        let filtered = mockStockLevels;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (stock) =>
                    stock.productName.toLowerCase().includes(query) ||
                    stock.productSku.toLowerCase().includes(query) ||
                    stock.warehouseName.toLowerCase().includes(query)
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter((stock) => stock.status === statusFilter);
        }

        if (warehouseFilter !== 'all') {
            filtered = filtered.filter((stock) => stock.warehouseName === warehouseFilter);
        }

        return filtered;
    }, [searchQuery, statusFilter, warehouseFilter]);

    const handleViewHistory = (stock: StockLevel) => {
        console.log('View history:', stock);
    };

    const handleAddStock = (stock: StockLevel) => {
        setSelectedStockLevel(stock);
        setAddStockDialogOpen(true);
    };

    const handleRemoveStock = (stock: StockLevel) => {
        setSelectedStockLevel(stock);
        setRemoveStockDialogOpen(true);
    };

    const handleStockAdjustment = async (data: StockAdjustmentFormData) => {
        console.log('Stock adjustment:', data);
        await new Promise((resolve) => setTimeout(resolve, 500));
    };

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                    Stock Levels
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Monitor inventory levels across all warehouses.
                </Typography>
            </Box>

            {/* Search and Filters */}
            <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField
                    placeholder="Search by product name, SKU, or warehouse..."
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
                <FormControl sx={{ minWidth: 200 }}>
                    <Select
                        value={warehouseFilter}
                        onChange={(e) => setWarehouseFilter(e.target.value)}
                        displayEmpty
                        startAdornment={
                            <InputAdornment position="start">
                                <FilterIcon sx={{ ml: 1 }} />
                            </InputAdornment>
                        }
                    >
                        <MenuItem value="all">All Warehouses</MenuItem>
                        {warehouses.map((warehouse) => (
                            <MenuItem key={warehouse} value={warehouse}>
                                {warehouse}
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
                        <MenuItem value="In Stock">In Stock</MenuItem>
                        <MenuItem value="Low Stock">Low Stock</MenuItem>
                        <MenuItem value="Out of Stock">Out of Stock</MenuItem>
                        <MenuItem value="Overstocked">Overstocked</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Stock Levels Table */}
            <StockLevelTable
                stockLevels={filteredStockLevels}
                onAddStock={handleAddStock}
                onRemoveStock={handleRemoveStock}
                onViewHistory={handleViewHistory}
            />

            {/* Add Stock Dialog */}
            <StockAdjustmentDialog
                open={addStockDialogOpen}
                onClose={() => {
                    setAddStockDialogOpen(false);
                    setSelectedStockLevel(null);
                }}
                onSubmit={handleStockAdjustment}
                stockLevel={selectedStockLevel}
                mode="add"
            />

            {/* Remove Stock Dialog */}
            <StockAdjustmentDialog
                open={removeStockDialogOpen}
                onClose={() => {
                    setRemoveStockDialogOpen(false);
                    setSelectedStockLevel(null);
                }}
                onSubmit={handleStockAdjustment}
                stockLevel={selectedStockLevel}
                mode="remove"
            />
        </Box>
    );
}
