import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Typography,
    Box,
    useTheme,
    Stack,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import type { Deal } from '../../../data/mockDeals';

interface DealDialogProps {
    open: boolean;
    onClose: () => void;
    deal?: Deal | null;
    onSave: (deal: Partial<Deal>) => void;
}

const STAGES: Deal['stage'][] = ['New', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'];
const PRIORITIES: Deal['priority'][] = ['Low', 'Medium', 'High'];

export function DealDialog({ open, onClose, deal, onSave }: DealDialogProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const getDefaultFormData = (): Partial<Deal> => ({
        title: '',
        companyName: '',
        amount: 0,
        stage: 'New',
        priority: 'Medium',
        closingDate: new Date(),
    });

    const [formData, setFormData] = useState<Partial<Deal>>(getDefaultFormData());

    useEffect(() => {
        if (deal) {
            setFormData({
                ...deal,
                closingDate: deal.closingDate instanceof Date ? deal.closingDate : new Date(deal.closingDate),
            });
        } else {
            setFormData(getDefaultFormData());
        }
    }, [deal, open]);

    const handleChange = (field: keyof Deal, value: unknown) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    const formatDateForInput = (date: Date | undefined) => {
        if (!date) return '';
        const d = date instanceof Date ? date : new Date(date);
        return d.toISOString().split('T')[0];
    };

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
                    backgroundImage: 'none',
                }
            }}
        >
            <DialogTitle sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: `1px solid ${theme.palette.divider}`,
                pb: 2
            }}>
                <Typography variant="h6" fontWeight={700}>
                    {deal ? 'Edit Deal' : 'New Deal'}
                </Typography>
                <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 4, pb: 3 }}>
                <Stack spacing={3}>
                    {/* Deal Info */}
                    <Box sx={{ mt: 1 }}>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight={600}
                            sx={{ textTransform: 'uppercase', letterSpacing: 0.5, mb: 2, display: 'block' }}
                        >
                            Deal Information
                        </Typography>
                        <Stack spacing={2.5}>
                            <TextField
                                label="Deal Title"
                                value={formData.title || ''}
                                onChange={(e) => handleChange('title', e.target.value)}
                                fullWidth
                                required
                                placeholder="e.g., Enterprise License Renewal"
                            />
                            <TextField
                                label="Company Name"
                                value={formData.companyName || ''}
                                onChange={(e) => handleChange('companyName', e.target.value)}
                                fullWidth
                                required
                                placeholder="e.g., Acme Corp"
                            />
                        </Stack>
                    </Box>

                    {/* Value & Stage */}
                    <Box>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight={600}
                            sx={{ textTransform: 'uppercase', letterSpacing: 0.5, mb: 2, display: 'block' }}
                        >
                            Value & Stage
                        </Typography>
                        <Stack spacing={2.5}>
                            <TextField
                                label="Deal Value"
                                type="number"
                                value={formData.amount || ''}
                                onChange={(e) => handleChange('amount', Number(e.target.value))}
                                fullWidth
                                slotProps={{
                                    input: {
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    }
                                }}
                            />
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField
                                    select
                                    label="Stage"
                                    value={formData.stage || 'New'}
                                    onChange={(e) => handleChange('stage', e.target.value)}
                                    fullWidth
                                >
                                    {STAGES.map(stage => (
                                        <MenuItem key={stage} value={stage}>{stage}</MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    select
                                    label="Priority"
                                    value={formData.priority || 'Medium'}
                                    onChange={(e) => handleChange('priority', e.target.value)}
                                    fullWidth
                                >
                                    {PRIORITIES.map(p => (
                                        <MenuItem key={p} value={p}>{p}</MenuItem>
                                    ))}
                                </TextField>
                            </Stack>
                        </Stack>
                    </Box>

                    {/* Timeline */}
                    <Box>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight={600}
                            sx={{ textTransform: 'uppercase', letterSpacing: 0.5, mb: 2, display: 'block' }}
                        >
                            Timeline
                        </Typography>
                        <TextField
                            label="Expected Close Date"
                            type="date"
                            value={formatDateForInput(formData.closingDate as Date)}
                            onChange={(e) => handleChange('closingDate', new Date(e.target.value))}
                            fullWidth
                            slotProps={{
                                inputLabel: { shrink: true }
                            }}
                        />
                    </Box>
                </Stack>
            </DialogContent>

            <DialogActions sx={{ p: 2.5, borderTop: `1px solid ${theme.palette.divider}` }}>
                <Button onClick={onClose} color="inherit">
                    Cancel
                </Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    disabled={!formData.title || !formData.companyName}
                    sx={{
                        bgcolor: 'text.primary',
                        color: 'background.paper',
                        '&:hover': { bgcolor: isDarkMode ? '#404040' : '#262626' },
                    }}
                >
                    {deal ? 'Update Deal' : 'Create Deal'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
