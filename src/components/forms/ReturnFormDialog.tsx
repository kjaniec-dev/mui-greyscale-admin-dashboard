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

export interface ReturnFormData {
    orderId: string;
    productName: string;
    quantity: number;
    reason: 'Defective' | 'Wrong Item' | 'Changed Mind' | 'Not as Described' | 'Damaged';
    status: 'Pending' | 'Approved' | 'Rejected' | 'Refunded' | 'Replaced';
    customerName: string;
    customerEmail: string;
    refundAmount?: number;
    notes?: string;
}

interface ReturnFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: ReturnFormData) => void | Promise<void>;
    defaultValues?: Partial<ReturnFormData>;
    mode?: 'create' | 'process';
}

const reasons: ReturnFormData['reason'][] = [
    'Defective', 'Wrong Item', 'Changed Mind', 'Not as Described', 'Damaged'
];

const statuses: ReturnFormData['status'][] = [
    'Pending', 'Approved', 'Rejected', 'Refunded', 'Replaced'
];

export function ReturnFormDialog({
    open,
    onClose,
    onSubmit,
    defaultValues,
    mode = 'create',
}: ReturnFormDialogProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<ReturnFormData>({
        orderId: defaultValues?.orderId || '',
        productName: defaultValues?.productName || '',
        quantity: defaultValues?.quantity || 1,
        reason: defaultValues?.reason || 'Defective',
        status: defaultValues?.status || 'Pending',
        customerName: defaultValues?.customerName || '',
        customerEmail: defaultValues?.customerEmail || '',
        refundAmount: defaultValues?.refundAmount || 0,
        notes: defaultValues?.notes || '',
    });

    const handleChange = (field: keyof ReturnFormData) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        let value: string | number = event.target.value;
        if (field === 'quantity' || field === 'refundAmount') {
            value = parseFloat(event.target.value) || 0;
        }
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

    const title = mode === 'create' ? 'Create Return Request' : 'Process Return';
    const submitLabel = mode === 'create' ? 'Submit Request' : 'Update Return';

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
                                ? 'Fill in the details for the return request.'
                                : 'Update the return status and resolution.'}
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
                                label="Order ID"
                                value={formData.orderId}
                                onChange={handleChange('orderId')}
                                required
                                disabled={mode === 'process'}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Product Name"
                                value={formData.productName}
                                onChange={handleChange('productName')}
                                required
                                disabled={mode === 'process'}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Quantity"
                                value={formData.quantity}
                                onChange={handleChange('quantity')}
                                required
                                inputProps={{ min: 1 }}
                                disabled={mode === 'process'}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                select
                                label="Reason"
                                value={formData.reason}
                                onChange={handleChange('reason')}
                                required
                                disabled={mode === 'process'}
                            >
                                {reasons.map((reason) => (
                                    <MenuItem key={reason} value={reason}>
                                        {reason}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Customer Name"
                                value={formData.customerName}
                                onChange={handleChange('customerName')}
                                required
                                disabled={mode === 'process'}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                type="email"
                                label="Customer Email"
                                value={formData.customerEmail}
                                onChange={handleChange('customerEmail')}
                                required
                                disabled={mode === 'process'}
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
                                {statuses.map((status) => (
                                    <MenuItem key={status} value={status}>
                                        {status}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Refund Amount"
                                value={formData.refundAmount}
                                onChange={handleChange('refundAmount')}
                                inputProps={{ min: 0, step: 0.01 }}
                                helperText="Enter amount if refunding"
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="Notes"
                                value={formData.notes}
                                onChange={handleChange('notes')}
                                placeholder="Additional notes about the return..."
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
