import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Typography,
    useTheme,
} from '@mui/material';
import { type ScheduledReport } from '../../../data/mockScheduledReports';

interface ScheduledReportDialogProps {
    open: boolean;
    onClose: () => void;
    report: ScheduledReport | null;
    onSave: (report: Partial<ScheduledReport>) => void;
}

export function ScheduledReportDialog({ open, onClose, report, onSave }: ScheduledReportDialogProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const [formData, setFormData] = useState<Partial<ScheduledReport>>({
        reportName: '',
        description: '',
        format: 'PDF',
        frequency: 'Weekly',
        recipients: [],
    });

    const [recipientInput, setRecipientInput] = useState('');

    useEffect(() => {
        if (report && open) {
            setFormData(report);
        } else if (open) {
            setFormData({
                reportName: '',
                description: '',
                format: 'PDF',
                frequency: 'Weekly',
                recipients: [],
            });
        }
        setRecipientInput('');
    }, [report, open]);

    const handleRecipientKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && recipientInput.trim()) {
            e.preventDefault();
            const email = recipientInput.trim();
            // Basic email validation
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setFormData(prev => ({
                    ...prev,
                    recipients: [...(prev.recipients || []), email]
                }));
                setRecipientInput('');
            }
        }
    };

    const handleRemoveRecipient = (emailToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            recipients: (prev.recipients || []).filter(email => email !== emailToRemove)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>
                    {report ? 'Edit Scheduled Report' : 'Create Scheduled Report'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
                        <TextField
                            label="Report Name"
                            required
                            fullWidth
                            value={formData.reportName}
                            onChange={(e) => setFormData({ ...formData, reportName: e.target.value })}
                        />

                        <TextField
                            label="Description"
                            fullWidth
                            multiline
                            rows={2}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <FormControl fullWidth required>
                                <InputLabel>Format</InputLabel>
                                <Select
                                    value={formData.format || 'PDF'}
                                    label="Format"
                                    onChange={(e) => setFormData({ ...formData, format: e.target.value as any })}
                                >
                                    <MenuItem value="PDF">PDF</MenuItem>
                                    <MenuItem value="CSV">CSV</MenuItem>
                                    <MenuItem value="Excel">Excel</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth required>
                                <InputLabel>Frequency</InputLabel>
                                <Select
                                    value={formData.frequency || 'Weekly'}
                                    label="Frequency"
                                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value as any })}
                                >
                                    <MenuItem value="Daily">Daily</MenuItem>
                                    <MenuItem value="Weekly">Weekly</MenuItem>
                                    <MenuItem value="Monthly">Monthly</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box>
                            <TextField
                                label="Recipients (Press Enter to add)"
                                fullWidth
                                value={recipientInput}
                                onChange={(e) => setRecipientInput(e.target.value)}
                                onKeyDown={handleRecipientKeyDown}
                                placeholder="email@example.com"
                                helperText="Type an email address and press Enter"
                            />

                            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {(formData.recipients || []).map((email, idx) => (
                                    <Chip
                                        key={idx}
                                        label={email}
                                        onDelete={() => handleRemoveRecipient(email)}
                                        sx={{
                                            bgcolor: isDarkMode ? '#262626' : '#F5F5F5'
                                        }}
                                    />
                                ))}
                                {(formData.recipients || []).length === 0 && (
                                    <Typography variant="body2" color="text.secondary">
                                        No recipients added yet.
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2.5 }}>
                    <Button onClick={onClose} color="inherit">
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            bgcolor: '#171717',
                            color: '#FAFAFA',
                            '&:hover': { bgcolor: '#262626' },
                        }}
                    >
                        {report ? 'Save Changes' : 'Create Schedule'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
