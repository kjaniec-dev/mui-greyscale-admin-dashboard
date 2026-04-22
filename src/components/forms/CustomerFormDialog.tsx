import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Box,
    Typography,
    useTheme,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { CustomerForm, type CustomerFormData } from './CustomerForm';

interface CustomerFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: CustomerFormData) => void | Promise<void>;
    defaultValues?: Partial<CustomerFormData>;
    mode?: 'create' | 'edit';
}

export function CustomerFormDialog({
    open,
    onClose,
    onSubmit,
    defaultValues,
    mode = 'create',
}: CustomerFormDialogProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (data: CustomerFormData) => {
        setIsSubmitting(true);
        try {
            await onSubmit(data);
            onClose();
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const title = mode === 'create' ? 'Add New Customer' : 'Edit Customer';
    const submitLabel = mode === 'create' ? 'Create Customer' : 'Save Changes';

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                    borderRadius: 2,
                },
            }}
        >
            {/* Dialog Header */}
            <DialogTitle
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    pb: 2,
                    borderBottom: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
                }}
            >
                <Box>
                    <Typography variant="h6" fontWeight={700}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {mode === 'create'
                            ? 'Fill in the details to add a new customer.'
                            : 'Update the customer information below.'}
                    </Typography>
                </Box>
                <IconButton
                    onClick={onClose}
                    disabled={isSubmitting}
                    sx={{
                        color: isDarkMode ? '#A3A3A3' : '#525252',
                        '&:hover': {
                            bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            {/* Dialog Content */}
            <DialogContent sx={{ pt: 3, pb: 2 }}>
                <CustomerForm
                    defaultValues={defaultValues}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                />
            </DialogContent>

            {/* Dialog Actions */}
            <DialogActions
                sx={{
                    px: 3,
                    pb: 3,
                    pt: 2,
                    borderTop: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
                    gap: 1,
                }}
            >
                <Button
                    onClick={onClose}
                    disabled={isSubmitting}
                    sx={{
                        color: isDarkMode ? '#A3A3A3' : '#525252',
                        '&:hover': {
                            bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                        },
                    }}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    form="customer-form"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{
                        bgcolor: isDarkMode ? '#FAFAFA' : '#171717',
                        color: isDarkMode ? '#171717' : '#FAFAFA',
                        '&:hover': {
                            bgcolor: isDarkMode ? '#E5E5E5' : '#262626',
                        },
                        '&:disabled': {
                            bgcolor: isDarkMode ? '#404040' : '#E5E5E5',
                            color: isDarkMode ? '#737373' : '#A3A3A3',
                        },
                    }}
                >
                    {isSubmitting ? 'Saving...' : submitLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export { type CustomerFormData } from './CustomerForm';
