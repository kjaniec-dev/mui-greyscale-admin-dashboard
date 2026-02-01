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
import { InvoiceForm, type InvoiceFormData } from '../../components/forms';

export function InvoiceCreatePage() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (data: InvoiceFormData) => {
        setIsSubmitting(true);
        try {
            console.log('Creating invoice:', data);
            // TODO: Implement actual API call
            await new Promise((resolve) => setTimeout(resolve, 500));
            setShowSuccess(true);
            setTimeout(() => {
                navigate('/invoices');
            }, 1500);
        } catch (error) {
            console.error('Failed to create invoice:', error);
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
                    onClick={() => navigate('/invoices')}
                    sx={{ cursor: 'pointer' }}
                >
                    Invoices
                </Link>
                <Typography color="text.primary">Create</Typography>
            </Breadcrumbs>

            {/* Page Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Create Invoice
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Create a new invoice for a customer.
                    </Typography>
                </Box>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/invoices')}
                >
                    Back to Invoices
                </Button>
            </Box>

            {/* Form Card */}
            <Paper sx={{ p: 4, maxWidth: 800 }}>
                <InvoiceForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />

                {/* Form Actions */}
                <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/invoices')}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        form="invoice-form"
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
                        {isSubmitting ? 'Creating...' : 'Create Invoice'}
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
                    Invoice created successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
}
