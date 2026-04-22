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
    TextField,
    Grid,
    MenuItem,
    useTheme,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

export interface SupplierFormData {
    name: string;
    contactName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    status: 'Active' | 'Inactive' | 'Pending';
    rating: number;
}

interface SupplierFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: SupplierFormData) => void | Promise<void>;
    defaultValues?: Partial<SupplierFormData>;
    mode?: 'create' | 'edit';
}

const countries = [
    'China', 'Japan', 'South Korea', 'India', 'Singapore', 'Germany', 'UK',
    'Canada', 'Mexico', 'Brazil', 'Australia', 'Netherlands', 'UAE', 'Thailand', 'Vietnam'
];

export function SupplierFormDialog({
    open,
    onClose,
    onSubmit,
    defaultValues,
    mode = 'create',
}: SupplierFormDialogProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<SupplierFormData>({
        name: defaultValues?.name || '',
        contactName: defaultValues?.contactName || '',
        email: defaultValues?.email || '',
        phone: defaultValues?.phone || '',
        address: defaultValues?.address || '',
        city: defaultValues?.city || '',
        country: defaultValues?.country || 'China',
        status: defaultValues?.status || 'Pending',
        rating: defaultValues?.rating || 4.0,
    });

    const handleChange = (field: keyof SupplierFormData) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = field === 'rating' ? parseFloat(event.target.value) || 0 : event.target.value;
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSubmit(formData);
            onClose();
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const title = mode === 'create' ? 'Add New Supplier' : 'Edit Supplier';
    const submitLabel = mode === 'create' ? 'Create Supplier' : 'Save Changes';

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                    borderRadius: 2,
                },
            }}
        >
            <form onSubmit={handleSubmit}>
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
                                ? 'Fill in the details to add a new supplier.'
                                : 'Update the supplier information below.'}
                        </Typography>
                    </Box>
                    <IconButton
                        onClick={onClose}
                        disabled={isSubmitting}
                        sx={{
                            color: isDarkMode ? '#A3A3A3' : '#525252',
                            '&:hover': { bgcolor: isDarkMode ? '#262626' : '#F5F5F5' },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ pt: '24px !important', pb: 3 }}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Company Name"
                                value={formData.name}
                                onChange={handleChange('name')}
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Contact Person"
                                value={formData.contactName}
                                onChange={handleChange('contactName')}
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                type="email"
                                label="Email"
                                value={formData.email}
                                onChange={handleChange('email')}
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Phone"
                                value={formData.phone}
                                onChange={handleChange('phone')}
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                select
                                label="Status"
                                value={formData.status}
                                onChange={handleChange('status')}
                                required
                            >
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="Inactive">Inactive</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Address"
                                value={formData.address}
                                onChange={handleChange('address')}
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="City"
                                value={formData.city}
                                onChange={handleChange('city')}
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                select
                                label="Country"
                                value={formData.country}
                                onChange={handleChange('country')}
                                required
                            >
                                {countries.map((country) => (
                                    <MenuItem key={country} value={country}>
                                        {country}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Initial Rating"
                                value={formData.rating}
                                onChange={handleChange('rating')}
                                inputProps={{ min: 1, max: 5, step: 0.1 }}
                                helperText="Rating from 1.0 to 5.0"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

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
                            '&:hover': { bgcolor: isDarkMode ? '#262626' : '#F5F5F5' },
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        sx={{
                            bgcolor: isDarkMode ? '#FAFAFA' : '#171717',
                            color: isDarkMode ? '#171717' : '#FAFAFA',
                            '&:hover': { bgcolor: isDarkMode ? '#E5E5E5' : '#262626' },
                            '&:disabled': {
                                bgcolor: isDarkMode ? '#404040' : '#E5E5E5',
                                color: isDarkMode ? '#737373' : '#A3A3A3',
                            },
                        }}
                    >
                        {isSubmitting ? 'Saving...' : submitLabel}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
