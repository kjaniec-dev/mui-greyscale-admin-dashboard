import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Box,
    Grid,
    Typography,
    IconButton,
    useTheme,
    InputAdornment,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

export interface ShipmentFormData {
    orderId: string;
    orderNumber: string;
    customerName: string;
    carrier: string;
    trackingNumber: string;
    shippingMethod: string;
    weight: number;
    shippingCost: number;
    origin: string;
    destination: string;
    estimatedDelivery: string;
    status: string;
}

interface ShipmentFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: ShipmentFormData) => Promise<void>;
    defaultValues?: Partial<ShipmentFormData>;
    mode?: 'create' | 'edit';
}

const carriers = ['FedEx', 'UPS', 'USPS', 'DHL', 'Amazon'];
const methods = ['Standard', 'Express', 'Overnight', 'Freight'];
const statuses = ['Label Created', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered', 'Exception'];

const emptyForm: ShipmentFormData = {
    orderId: '',
    orderNumber: '',
    customerName: '',
    carrier: 'FedEx',
    trackingNumber: '',
    shippingMethod: 'Standard',
    weight: 0,
    shippingCost: 0,
    origin: '',
    destination: '',
    estimatedDelivery: new Date().toISOString().split('T')[0],
    status: 'Label Created',
};

export function ShipmentFormDialog({ open, onClose, onSubmit, defaultValues, mode = 'create' }: ShipmentFormDialogProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const [formData, setFormData] = useState<ShipmentFormData>(emptyForm);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (open) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormData(defaultValues ? { ...emptyForm, ...defaultValues } : emptyForm);
        }
    }, [open, defaultValues]);

    const handleChange = (field: keyof ShipmentFormData) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            await onSubmit(formData);
            onClose();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            slotProps={{ paper: {
                sx: {
                    bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                    borderRadius: 2,
                },
            } }}
        >
            <DialogTitle sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
            }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {mode === 'create' ? 'Create Shipment' : 'Edit Shipment'}
                </Typography>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 3 }}>
                <Box sx={{ pt: 1 }}>
                    <Grid container spacing={2.5}>
                        {/* Order Info */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label="Order ID"
                                value={formData.orderId}
                                onChange={handleChange('orderId')}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label="Order Number"
                                value={formData.orderNumber}
                                onChange={handleChange('orderNumber')}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                label="Customer Name"
                                value={formData.customerName}
                                onChange={handleChange('customerName')}
                                fullWidth
                                required
                            />
                        </Grid>

                        {/* Shipping Details */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label="Carrier"
                                value={formData.carrier}
                                onChange={handleChange('carrier')}
                                fullWidth
                                select
                                required
                            >
                                {carriers.map((c) => (
                                    <MenuItem key={c} value={c}>{c}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label="Tracking Number"
                                value={formData.trackingNumber}
                                onChange={handleChange('trackingNumber')}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label="Shipping Method"
                                value={formData.shippingMethod}
                                onChange={handleChange('shippingMethod')}
                                fullWidth
                                select
                                required
                            >
                                {methods.map((m) => (
                                    <MenuItem key={m} value={m}>{m}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        {mode === 'edit' && (
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    label="Status"
                                    value={formData.status}
                                    onChange={handleChange('status')}
                                    fullWidth
                                    select
                                >
                                    {statuses.map((s) => (
                                        <MenuItem key={s} value={s}>{s}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        )}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label="Weight"
                                value={formData.weight}
                                onChange={handleChange('weight')}
                                fullWidth
                                type="number"
                                slotProps={{ input: {
                                    endAdornment: <InputAdornment position="end">lbs</InputAdornment>,
                                } }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label="Shipping Cost"
                                value={formData.shippingCost}
                                onChange={handleChange('shippingCost')}
                                fullWidth
                                type="number"
                                slotProps={{ input: {
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                } }}
                            />
                        </Grid>

                        {/* Route */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label="Origin"
                                value={formData.origin}
                                onChange={handleChange('origin')}
                                fullWidth
                                placeholder="e.g. Los Angeles, CA"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label="Destination"
                                value={formData.destination}
                                onChange={handleChange('destination')}
                                fullWidth
                                placeholder="e.g. New York, NY"
                            />
                        </Grid>

                        {/* Date */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label="Estimated Delivery"
                                value={formData.estimatedDelivery}
                                onChange={handleChange('estimatedDelivery')}
                                fullWidth
                                type="date"
                                slotProps={{ inputLabel: { shrink: true } }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>

            <DialogActions sx={{
                px: 3,
                py: 2,
                borderTop: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
            }}>
                <Button onClick={onClose} disabled={isSubmitting}>
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{
                        bgcolor: isDarkMode ? '#FAFAFA' : '#171717',
                        color: isDarkMode ? '#171717' : '#FAFAFA',
                        '&:hover': { bgcolor: isDarkMode ? '#E5E5E5' : '#262626' },
                    }}
                >
                    {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Shipment' : 'Save Changes'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
