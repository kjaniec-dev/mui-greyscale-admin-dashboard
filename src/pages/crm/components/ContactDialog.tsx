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
    Avatar,
    useTheme,
    Stack,
    IconButton,
    InputAdornment,
} from '@mui/material';
import {
    Close as CloseIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Business as BusinessIcon,
    Work as JobTitleIcon,
} from '@mui/icons-material';
import type { Contact } from '../../../data/mockContacts';

interface ContactDialogProps {
    open: boolean;
    onClose: () => void;
    contact: Contact | null;
    mode: 'view' | 'edit';
    onSave?: (contact: Contact) => void;
    onEdit?: (contact: Contact) => void;
}

const STATUSES = ['Active', 'Inactive'];

export function ContactDialog({ open, onClose, contact, mode, onSave, onEdit }: ContactDialogProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const [formData, setFormData] = useState<Partial<Contact>>({});

    useEffect(() => {
        if (contact) {
            setFormData(contact);
        } else {
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                jobTitle: '',
                companyName: '',
                status: 'Active',
            });
        }
    }, [contact, open]);

    const handleChange = (field: keyof Contact, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        if (onSave && formData) {
            onSave(formData as Contact);
            onClose();
        }
    };

    const handleSwitchToEdit = () => {
        if (onEdit && contact) {
            onEdit(contact);
        }
    };

    const isViewMode = mode === 'view';
    const fullName = formData.firstName || formData.lastName ? `${formData.firstName} ${formData.lastName}`.trim() : 'New Contact';

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
                alignItems: 'center',
                gap: 2,
                pb: 2,
                borderBottom: `1px solid ${theme.palette.divider}`
            }}>
                <Avatar
                    src={contact?.avatar}
                    alt={fullName}
                    variant="rounded"
                    sx={{
                        width: 48,
                        height: 48,
                        bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                        color: 'text.primary',
                        fontSize: '1.25rem',
                        fontWeight: 600,
                    }}
                >
                    {formData.firstName?.charAt(0) || 'C'}
                    {formData.lastName?.charAt(0) || ''}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight={700}>
                        {isViewMode ? fullName : (contact ? 'Edit Contact' : 'New Contact')}
                    </Typography>
                    {isViewMode && contact && (
                        <Typography variant="body2" color="text.secondary">
                            {contact.jobTitle} • {contact.companyName}
                        </Typography>
                    )}
                </Box>
                <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 4, pb: 3 }}>
                <Stack spacing={3}>
                    {/* Basic Info */}
                    <Box>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight={600}
                            sx={{ textTransform: 'uppercase', letterSpacing: 0.5, mb: 2, display: 'block' }}
                        >
                            Basic Information
                        </Typography>
                        <Stack spacing={2.5}>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField
                                    label="First Name"
                                    value={formData.firstName || ''}
                                    onChange={(e) => handleChange('firstName', e.target.value)}
                                    fullWidth
                                    required
                                    disabled={isViewMode}
                                    slotProps={{ input: { readOnly: isViewMode } }}
                                />
                                <TextField
                                    label="Last Name"
                                    value={formData.lastName || ''}
                                    onChange={(e) => handleChange('lastName', e.target.value)}
                                    fullWidth
                                    required
                                    disabled={isViewMode}
                                    slotProps={{ input: { readOnly: isViewMode } }}
                                />
                            </Stack>
                            <TextField
                                select
                                label="Status"
                                value={formData.status || 'Active'}
                                onChange={(e) => handleChange('status', e.target.value)}
                                fullWidth
                                disabled={isViewMode}
                                slotProps={{ input: { readOnly: isViewMode } }}
                            >
                                {STATUSES.map(opt => (
                                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                ))}
                            </TextField>
                        </Stack>
                    </Box>

                    {/* Contact & Company Info */}
                    <Box>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight={600}
                            sx={{ textTransform: 'uppercase', letterSpacing: 0.5, mb: 2, display: 'block' }}
                        >
                            Contact & Company Details
                        </Typography>
                        <Stack spacing={2.5}>
                            <TextField
                                label="Email address"
                                value={formData.email || ''}
                                onChange={(e) => handleChange('email', e.target.value)}
                                fullWidth
                                disabled={isViewMode}
                                slotProps={{
                                    input: {
                                        readOnly: isViewMode,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                            />
                            <TextField
                                label="Phone Number"
                                value={formData.phone || ''}
                                onChange={(e) => handleChange('phone', e.target.value)}
                                fullWidth
                                disabled={isViewMode}
                                slotProps={{
                                    input: {
                                        readOnly: isViewMode,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PhoneIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                            />
                            <TextField
                                label="Company Name"
                                value={formData.companyName || ''}
                                onChange={(e) => handleChange('companyName', e.target.value)}
                                fullWidth
                                disabled={isViewMode}
                                slotProps={{
                                    input: {
                                        readOnly: isViewMode,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BusinessIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                            />
                            <TextField
                                label="Job Title"
                                value={formData.jobTitle || ''}
                                onChange={(e) => handleChange('jobTitle', e.target.value)}
                                fullWidth
                                disabled={isViewMode}
                                slotProps={{
                                    input: {
                                        readOnly: isViewMode,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <JobTitleIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                            />
                        </Stack>
                    </Box>
                </Stack>
            </DialogContent>

            <DialogActions sx={{ p: 2.5, borderTop: `1px solid ${theme.palette.divider}` }}>
                {isViewMode ? (
                    <>
                        <Button onClick={handleSwitchToEdit} color="inherit" sx={{ mr: 'auto' }}>
                            Edit
                        </Button>
                        <Button
                            onClick={onClose}
                            variant="contained"
                            sx={{
                                bgcolor: 'text.primary',
                                color: 'background.paper',
                                '&:hover': { bgcolor: isDarkMode ? '#404040' : '#262626' }
                            }}
                        >
                            Close
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={onClose} color="inherit">
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSave}
                            disabled={!formData.firstName || !formData.lastName}
                            sx={{
                                bgcolor: 'text.primary',
                                color: 'background.paper',
                                '&:hover': { bgcolor: isDarkMode ? '#404040' : '#262626' }
                            }}
                        >
                            Save Changes
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
}
