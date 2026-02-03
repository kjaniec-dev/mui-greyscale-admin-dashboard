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

export interface WarehouseFormData {
    name: string;
    code: string;
    address: string;
    city: string;
    country: string;
    capacity: number;
    manager: string;
    phone: string;
    email: string;
    status: 'Active' | 'Inactive' | 'Maintenance';
}

interface WarehouseFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: WarehouseFormData) => void | Promise<void>;
    defaultValues?: Partial<WarehouseFormData>;
    mode?: 'create' | 'edit';
}

const countries = [
    'USA', 'Canada', 'UK', 'Germany', 'France', 'Australia', 'Japan', 'China', 'India', 'Brazil'
];

export function WarehouseFormDialog({
    open,
    onClose,
    onSubmit,
    defaultValues,
    mode = 'create',
}: WarehouseFormDialogProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<WarehouseFormData>({
        name: defaultValues?.name || '',
        code: defaultValues?.code || '',
        address: defaultValues?.address || '',
        city: defaultValues?.city || '',
        country: defaultValues?.country || 'USA',
        capacity: defaultValues?.capacity || 10000,
        manager: defaultValues?.manager || '',
        phone: defaultValues?.phone || '',
        email: defaultValues?.email || '',
        status: defaultValues?.status || 'Active',
    });

    const handleChange = (field: keyof WarehouseFormData) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = field === 'capacity' ? parseInt(event.target.value) || 0 : event.target.value;
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

    const title = mode === 'create' ? 'Add New Warehouse' : 'Edit Warehouse';
    const submitLabel = mode === 'create' ? 'Create Warehouse' : 'Save Changes';

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
                                ? 'Fill in the details to add a new warehouse.'
                                : 'Update the warehouse information below.'}
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
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Warehouse Name"
                                value={formData.name}
                                onChange={handleChange('name')}
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Warehouse Code"
                                value={formData.code}
                                onChange={handleChange('code')}
                                required
                                placeholder="e.g., WH-001"
                            />
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
                                label="Capacity (units)"
                                value={formData.capacity}
                                onChange={handleChange('capacity')}
                                required
                                inputProps={{ min: 1 }}
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
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="Inactive">Inactive</MenuItem>
                                <MenuItem value="Maintenance">Maintenance</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Manager Name"
                                value={formData.manager}
                                onChange={handleChange('manager')}
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
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                type="email"
                                label="Email"
                                value={formData.email}
                                onChange={handleChange('email')}
                                required
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
                            bgcolor: '#171717',
                            color: '#FAFAFA',
                            '&:hover': { bgcolor: '#262626' },
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
