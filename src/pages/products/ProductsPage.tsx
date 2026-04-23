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
import { ProductTable } from '../../components/tables';
import { ProductFormDialog, type ProductFormData } from '../../components/forms';
import { ProductDetailDrawer } from '../../components/drawers';
import { mockProducts, type Product } from '../../data/mockProducts';

export function ProductsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);
    const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
    const [productToView, setProductToView] = useState<Product | null>(null);

    // Filter products based on search query and filters
    const filteredProducts = useMemo(() => {
        let filtered = mockProducts;

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (product) =>
                    product.name.toLowerCase().includes(query) ||
                    product.sku.toLowerCase().includes(query) ||
                    product.category.toLowerCase().includes(query)
            );
        }

        // Apply category filter
        if (categoryFilter !== 'all') {
            filtered = filtered.filter((product) => product.category === categoryFilter);
        }

        // Apply status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter((product) => product.status === statusFilter);
        }

        return filtered;
    }, [searchQuery, categoryFilter, statusFilter]);

    const handleView = (product: Product) => {
        setProductToView(product);
        setDetailDrawerOpen(true);
    };

    const handleEdit = (product: Product) => {
        setProductToEdit(product);
        setEditDialogOpen(true);
    };

    const handleDeleteClick = (product: Product) => {
        setProductToDelete(product);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (productToDelete) {
            console.log('Delete product:', productToDelete);
            // TODO: Implement actual delete logic
        }
        setDeleteDialogOpen(false);
        setProductToDelete(null);
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setProductToDelete(null);
    };

    const handleAddProduct = () => {
        setCreateDialogOpen(true);
    };

    const handleCreateProduct = async (data: ProductFormData) => {
        console.log('Creating product:', data);
        // TODO: Implement actual create logic (API call, state update, etc.)
        // For now, just simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 500));
    };

    const handleEditProduct = async (data: ProductFormData) => {
        console.log('Updating product:', productToEdit?.id, data);
        // TODO: Implement actual update logic (API call, state update, etc.)
        // For now, just simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 500));
    };

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                        Products
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage your product inventory and pricing.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddProduct}
                    sx={{
                        bgcolor: '#171717',
                        color: '#FAFAFA',
                        '&:hover': {
                            bgcolor: '#262626',
                        },
                    }}
                >
                    Add Product
                </Button>
            </Box>

            {/* Search and Filters */}
            <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField
                    placeholder="Search products by name, SKU, or category..."
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
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        displayEmpty
                        startAdornment={
                            <InputAdornment position="start">
                                <FilterIcon sx={{ ml: 1 }} />
                            </InputAdornment>
                        }
                    >
                        <MenuItem value="all">All Categories</MenuItem>
                        <MenuItem value="Electronics">Electronics</MenuItem>
                        <MenuItem value="Clothing">Clothing</MenuItem>
                        <MenuItem value="Food">Food</MenuItem>
                        <MenuItem value="Books">Books</MenuItem>
                        <MenuItem value="Home">Home</MenuItem>
                        <MenuItem value="Sports">Sports</MenuItem>
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
                    </Select>
                </FormControl>
            </Box>

            {/* Products Table */}
            <ProductTable
                products={filteredProducts}
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
                    Delete Product
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        Are you sure you want to delete <strong>{productToDelete?.name}</strong>?
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

            {/* Create Product Dialog */}
            <ProductFormDialog
                open={createDialogOpen}
                onClose={() => setCreateDialogOpen(false)}
                onSubmit={handleCreateProduct}
                mode="create"
            />

            {/* Edit Product Dialog */}
            <ProductFormDialog
                open={editDialogOpen}
                onClose={() => {
                    setEditDialogOpen(false);
                    setProductToEdit(null);
                }}
                onSubmit={handleEditProduct}
                defaultValues={productToEdit ? {
                    name: productToEdit.name,
                    sku: productToEdit.sku,
                    category: productToEdit.category,
                    price: productToEdit.price,
                    stock: productToEdit.stock,
                    status: productToEdit.status,
                    description: productToEdit.description || '',
                } : undefined}
                mode="edit"
            />

            {/* Product Detail Drawer */}
            <ProductDetailDrawer
                open={detailDrawerOpen}
                onClose={() => {
                    setDetailDrawerOpen(false);
                    setProductToView(null);
                }}
                product={productToView}
            />
        </Box>
    );
}
