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
    Language as WebsiteIcon,
    LocationOn as LocationIcon,
    People as PeopleIcon,
    AttachMoney as RevenueIcon,
} from '@mui/icons-material';
import type { Company } from '../../../data/mockCompanies';

interface CompanyDialogProps {
    open: boolean;
    onClose: () => void;
    company: Company | null;
    mode: 'view' | 'edit';
    onSave?: (company: Company) => void;
    onEdit?: (company: Company) => void;
}

const INDUSTRIES = ['Software', 'Finance', 'Logistics', 'Healthcare', 'Energy', 'Retail', 'Education'];
const LIFECYCLE_STAGES = ['Lead', 'Customer', 'Churned'];

export function CompanyDialog({ open, onClose, company, mode, onSave, onEdit }: CompanyDialogProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const [formData, setFormData] = useState<Partial<Company>>({});

    useEffect(() => {
        if (company) {
            setFormData(company);
        } else {
            setFormData({
                name: '',
                website: '',
                industry: '',
                lifecycleStage: 'Lead',
                location: '',
                employees: 0,
                revenue: 0,
                description: '',
            });
        }
    }, [company, open]);

    const handleChange = (field: keyof Company, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        if (onSave && formData) {
            onSave(formData as Company);
            onClose();
        }
    };

    const handleSwitchToEdit = () => {
        if (onEdit && company) {
            onEdit(company);
        }
    };

    const isViewMode = mode === 'view';

    const formatRevenue = (value: number) => {
        if (value >= 1000000) {
            return `$${(value / 1000000).toFixed(1)}M`;
        }
        return `$${value.toLocaleString()}`;
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
            {/* Header */}
            <DialogTitle sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                pb: 2,
                borderBottom: `1px solid ${theme.palette.divider}`
            }}>
                <Avatar
                    src={company?.logo}
                    alt={company?.name || 'Company'}
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
                    {company?.name?.charAt(0) || 'C'}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight={700}>
                        {isViewMode ? (company?.name || 'Company Details') : (company ? 'Edit Company' : 'New Company')}
                    </Typography>
                    {isViewMode && company && (
                        <Typography variant="body2" color="text.secondary">
                            {company.industry} • {company.location}
                        </Typography>
                    )}
                </Box>
                <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            {/* Form Content */}
            <DialogContent sx={{ pt: 4, pb: 3 }}>
                <Stack spacing={3}>
                    {/* Section: Basic Info */}
                    <Box sx={{ mt: 1 }}>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight={600}
                            sx={{ textTransform: 'uppercase', letterSpacing: 0.5, mb: 2, display: 'block' }}
                        >
                            Basic Information
                        </Typography>
                        <Stack spacing={2.5}>
                            <TextField
                                label="Company Name"
                                value={formData.name || ''}
                                onChange={(e) => handleChange('name', e.target.value)}
                                fullWidth
                                required
                                disabled={isViewMode}
                                slotProps={{
                                    input: { readOnly: isViewMode }
                                }}
                            />
                            <TextField
                                label="Website"
                                value={formData.website || ''}
                                onChange={(e) => handleChange('website', e.target.value)}
                                fullWidth
                                disabled={isViewMode}
                                slotProps={{
                                    input: {
                                        readOnly: isViewMode,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <WebsiteIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                            />
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField
                                    select
                                    label="Industry"
                                    value={formData.industry || ''}
                                    onChange={(e) => handleChange('industry', e.target.value)}
                                    fullWidth
                                    disabled={isViewMode}
                                    slotProps={{
                                        input: { readOnly: isViewMode }
                                    }}
                                >
                                    {INDUSTRIES.map(opt => (
                                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    select
                                    label="Lifecycle Stage"
                                    value={formData.lifecycleStage || ''}
                                    onChange={(e) => handleChange('lifecycleStage', e.target.value)}
                                    fullWidth
                                    disabled={isViewMode}
                                    slotProps={{
                                        input: { readOnly: isViewMode }
                                    }}
                                >
                                    {LIFECYCLE_STAGES.map(opt => (
                                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                    ))}
                                </TextField>
                            </Stack>
                        </Stack>
                    </Box>

                    {/* Section: Location & Size */}
                    <Box>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight={600}
                            sx={{ textTransform: 'uppercase', letterSpacing: 0.5, mb: 2, display: 'block' }}
                        >
                            Location & Size
                        </Typography>
                        <Stack spacing={2.5}>
                            <TextField
                                label="Location"
                                value={formData.location || ''}
                                onChange={(e) => handleChange('location', e.target.value)}
                                fullWidth
                                disabled={isViewMode}
                                slotProps={{
                                    input: {
                                        readOnly: isViewMode,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LocationIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                            />
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField
                                    label="Employees"
                                    type={isViewMode ? 'text' : 'number'}
                                    value={isViewMode ? (formData.employees?.toLocaleString() || '0') : (formData.employees || '')}
                                    onChange={(e) => handleChange('employees', parseInt(e.target.value) || 0)}
                                    fullWidth
                                    disabled={isViewMode}
                                    slotProps={{
                                        input: {
                                            readOnly: isViewMode,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PeopleIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                                                </InputAdornment>
                                            ),
                                        }
                                    }}
                                />
                                <TextField
                                    label="Annual Revenue"
                                    type={isViewMode ? 'text' : 'number'}
                                    value={isViewMode ? formatRevenue(formData.revenue || 0) : (formData.revenue || '')}
                                    onChange={(e) => handleChange('revenue', parseInt(e.target.value) || 0)}
                                    fullWidth
                                    disabled={isViewMode}
                                    helperText={!isViewMode ? 'Enter raw number (e.g., 5000000)' : undefined}
                                    slotProps={{
                                        input: {
                                            readOnly: isViewMode,
                                            startAdornment: !isViewMode ? (
                                                <InputAdornment position="start">
                                                    <RevenueIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                                                </InputAdornment>
                                            ) : undefined,
                                        }
                                    }}
                                />
                            </Stack>
                        </Stack>
                    </Box>

                    {/* Section: Description */}
                    <Box>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight={600}
                            sx={{ textTransform: 'uppercase', letterSpacing: 0.5, mb: 2, display: 'block' }}
                        >
                            About
                        </Typography>
                        <TextField
                            label="Description"
                            multiline
                            rows={3}
                            value={formData.description || ''}
                            onChange={(e) => handleChange('description', e.target.value)}
                            fullWidth
                            disabled={isViewMode}
                            placeholder={!isViewMode ? 'Brief description of the company...' : undefined}
                            slotProps={{
                                input: { readOnly: isViewMode }
                            }}
                        />
                    </Box>
                </Stack>
            </DialogContent>

            {/* Actions */}
            <DialogActions sx={{ p: 2.5, borderTop: `1px solid ${theme.palette.divider}` }}>
                {isViewMode ? (
                    <>
                        <Button
                            onClick={handleSwitchToEdit}
                            color="inherit"
                            sx={{ mr: 'auto' }}
                        >
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
                            disabled={!formData.name}
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
