import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Paper,
    Typography,
    Breadcrumbs,
    Link,
    Snackbar,
    Alert,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { ProductForm, type ProductFormData } from '../../components/forms';

export function ProductCreatePage() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (data: ProductFormData) => {
        setIsSubmitting(true);
        try {
            console.log('Creating product:', data);
            // TODO: Implement actual API call
            await new Promise((resolve) => setTimeout(resolve, 500));
            setShowSuccess(true);
            setTimeout(() => {
                navigate('/products');
            }, 1500);
        } catch (error) {
            console.error('Failed to create product:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box>
            {/* Breadcrumbs */}
            <Breadcrumbs sx={{ mb: 2 }}>
                <Link
                    component="button"
                    underline="hover"
                    color="inherit"
                    onClick={() => navigate('/products')}
                    sx={{ cursor: 'pointer' }}
                >
                    Products
                </Link>
                <Typography color="text.primary">Create</Typography>
            </Breadcrumbs>

            {/* Page Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                        Create Product
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Add a new product to your inventory.
                    </Typography>
                </Box>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/products')}
                >
                    Back to Products
                </Button>
            </Box>

            {/* Form Card */}
            <Paper sx={{ p: 4, maxWidth: 600 }}>
                <ProductForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />

                {/* Form Actions */}
                <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/products')}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        form="product-form"
                        variant="contained"
                        disabled={isSubmitting}
                        sx={{
                            bgcolor: '#171717',
                            color: '#FAFAFA',
                            '&:hover': {
                                bgcolor: '#262626',
                            },
                        }}
                    >
                        {isSubmitting ? 'Creating...' : 'Create Product'}
                    </Button>
                </Box>
            </Paper>

            {/* Success notification */}
            <Snackbar
                open={showSuccess}
                autoHideDuration={3000}
                onClose={() => setShowSuccess(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity="success" onClose={() => setShowSuccess(false)}>
                    Product created successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
}
