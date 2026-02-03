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
    Alert,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import type { StockLevel } from '../../data/mockStockLevels';

export interface StockAdjustmentFormData {
    productName: string;
    warehouseName: string;
    adjustmentType: 'add' | 'remove';
    quantity: number;
    reason: string;
    currentStock: number;
}

interface StockAdjustmentDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: StockAdjustmentFormData) => void | Promise<void>;
    stockLevel?: StockLevel | null;
    mode: 'add' | 'remove';
}

const adjustmentReasons = {
    add: [
        'New shipment received',
        'Stock correction',
        'Return to inventory',
        'Transfer from another warehouse',
        'Other',
    ],
    remove: [
        'Damaged goods',
        'Stock correction',
        'Expired products',
        'Transfer to another warehouse',
        'Lost/missing',
        'Other',
    ],
};

export function StockAdjustmentDialog({
    open,
    onClose,
    onSubmit,
    stockLevel,
    mode,
}: StockAdjustmentDialogProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [reason, setReason] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stockLevel) return;

        setIsSubmitting(true);
        try {
            await onSubmit({
                productName: stockLevel.productName,
                warehouseName: stockLevel.warehouseName,
                adjustmentType: mode,
                quantity,
                reason,
                currentStock: stockLevel.quantity,
            });
            onClose();
            setQuantity(0);
            setReason('');
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const title = mode === 'add' ? 'Add Stock' : 'Remove Stock';
    const newQuantity = mode === 'add'
        ? (stockLevel?.quantity || 0) + quantity
        : (stockLevel?.quantity || 0) - quantity;

    const isRemoveError = mode === 'remove' && quantity > (stockLevel?.quantity || 0);

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
                            {mode === 'add'
                                ? 'Add inventory to this stock location.'
                                : 'Remove inventory from this stock location.'}
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
                    {stockLevel && (
                        <Box sx={{ mb: 3, p: 2, bgcolor: isDarkMode ? '#262626' : '#F5F5F5', borderRadius: 1 }}>
                            <Typography variant="body2" fontWeight={600}>
                                {stockLevel.productName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {stockLevel.warehouseName} • Current Stock: {stockLevel.quantity} units
                            </Typography>
                        </Box>
                    )}

                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                                required
                                inputProps={{ min: 1 }}
                                error={isRemoveError}
                                helperText={isRemoveError ? 'Cannot remove more than current stock' : ''}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                select
                                label="Reason"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                required
                            >
                                {adjustmentReasons[mode].map((r) => (
                                    <MenuItem key={r} value={r}>
                                        {r}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>

                    {quantity > 0 && !isRemoveError && (
                        <Alert
                            severity="info"
                            sx={{
                                mt: 3,
                                bgcolor: isDarkMode ? '#1E3A5F' : '#E3F2FD',
                                '& .MuiAlert-icon': {
                                    color: isDarkMode ? '#60A5FA' : '#1976D2',
                                },
                            }}
                        >
                            New stock level will be: <strong>{newQuantity} units</strong>
                        </Alert>
                    )}
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
                        disabled={isSubmitting || quantity <= 0 || !reason || isRemoveError}
                        sx={{
                            bgcolor: mode === 'add' ? '#16A34A' : '#DC2626',
                            color: '#FAFAFA',
                            '&:hover': { bgcolor: mode === 'add' ? '#15803D' : '#B91C1C' },
                            '&:disabled': {
                                bgcolor: isDarkMode ? '#404040' : '#E5E5E5',
                                color: isDarkMode ? '#737373' : '#A3A3A3',
                            },
                        }}
                    >
                        {isSubmitting ? 'Processing...' : title}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
