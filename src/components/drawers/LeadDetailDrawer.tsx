import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Divider,
    Avatar,
    Chip,
    Stack,
    Button,
    useTheme,
} from '@mui/material';
import {
    Close as CloseIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Business as BusinessIcon,
    CalendarToday as CalendarIcon,
    TrendingUp as ValueIcon,
    Person as AssignedIcon,
    Source as SourceIcon,
    Notes as NotesIcon,
    PersonAdd as ConvertIcon,
} from '@mui/icons-material';
import type { Lead } from '../../data/mockLeads';
import { getStatusSolid } from '../../theme';

interface LeadDetailDrawerProps {
    open: boolean;
    onClose: () => void;
    lead: Lead | null;
    onConvert?: (lead: Lead) => void;
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

function formatDate(date: Date | undefined): string {
    if (!date) return 'Never';
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(value);
}

function InfoRow({ icon, label, value, isDarkMode }: {
    icon: React.ReactNode;
    label: string;
    value: string | React.ReactNode;
    isDarkMode: boolean;
}) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
                sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1,
                    bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {icon}
            </Box>
            <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary" display="block">
                    {label}
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                    {value}
                </Typography>
            </Box>
        </Box>
    );
}

export function LeadDetailDrawer({ open, onClose, lead, onConvert }: LeadDetailDrawerProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    if (!lead) return null;

    const colors = getStatusSolid(lead.status, isDarkMode);
    const iconColor = isDarkMode ? '#A3A3A3' : '#525252';
    const canConvert = lead.status !== 'Won' && lead.status !== 'Lost';

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: { xs: '100%', sm: 420 },
                    bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                },
            }}
        >
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <Box
                    sx={{
                        p: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
                    }}
                >
                    <Typography variant="h6" fontWeight={700}>
                        Lead Details
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            color: isDarkMode ? '#A3A3A3' : '#525252',
                            '&:hover': {
                                bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Content */}
                <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
                    {/* Lead Avatar and Name */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                        <Avatar
                            sx={{
                                width: 80,
                                height: 80,
                                bgcolor: isDarkMode ? '#404040' : '#E5E5E5',
                                color: isDarkMode ? '#E5E5E5' : '#171717',
                                fontSize: '2rem',
                                fontWeight: 600,
                                mb: 2,
                            }}
                        >
                            {getInitials(lead.name)}
                        </Avatar>
                        <Typography variant="h5" fontWeight={700} gutterBottom>
                            {lead.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {lead.company}
                        </Typography>
                        <Chip
                            label={lead.status}
                            size="small"
                            sx={{
                                mt: 1,
                                bgcolor: colors.bg,
                                color: colors.text,
                                fontWeight: 500,
                                borderRadius: 1,
                            }}
                        />
                    </Box>

                    {/* Convert Button */}
                    {canConvert && (
                        <Box sx={{ mb: 3 }}>
                            <Button
                                fullWidth
                                variant="contained"
                                startIcon={<ConvertIcon />}
                                onClick={() => onConvert?.(lead)}
                                sx={{
                                    bgcolor: '#22C55E',
                                    color: '#FFFFFF',
                                    '&:hover': {
                                        bgcolor: '#16A34A',
                                    },
                                }}
                            >
                                Convert to Customer
                            </Button>
                        </Box>
                    )}

                    <Divider sx={{ mb: 3 }} />

                    {/* Contact Information */}
                    <Box sx={{ mb: 4 }}>
                        <Typography
                            variant="overline"
                            sx={{
                                color: isDarkMode ? '#A3A3A3' : '#737373',
                                fontWeight: 600,
                                letterSpacing: 1,
                                mb: 2,
                                display: 'block',
                            }}
                        >
                            Contact Information
                        </Typography>
                        <Stack spacing={2}>
                            <InfoRow
                                icon={<EmailIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Email"
                                value={lead.email}
                                isDarkMode={isDarkMode}
                            />
                            <InfoRow
                                icon={<PhoneIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Phone"
                                value={lead.phone}
                                isDarkMode={isDarkMode}
                            />
                            <InfoRow
                                icon={<BusinessIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Company"
                                value={lead.company}
                                isDarkMode={isDarkMode}
                            />
                        </Stack>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Lead Details */}
                    <Box sx={{ mb: 4 }}>
                        <Typography
                            variant="overline"
                            sx={{
                                color: isDarkMode ? '#A3A3A3' : '#737373',
                                fontWeight: 600,
                                letterSpacing: 1,
                                mb: 2,
                                display: 'block',
                            }}
                        >
                            Lead Details
                        </Typography>
                        <Stack spacing={2}>
                            <InfoRow
                                icon={<SourceIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Source"
                                value={lead.source}
                                isDarkMode={isDarkMode}
                            />
                            <InfoRow
                                icon={<ValueIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Estimated Value"
                                value={formatCurrency(lead.value)}
                                isDarkMode={isDarkMode}
                            />
                            <InfoRow
                                icon={<AssignedIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Assigned To"
                                value={lead.assignedTo}
                                isDarkMode={isDarkMode}
                            />
                        </Stack>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Timeline */}
                    <Box sx={{ mb: 4 }}>
                        <Typography
                            variant="overline"
                            sx={{
                                color: isDarkMode ? '#A3A3A3' : '#737373',
                                fontWeight: 600,
                                letterSpacing: 1,
                                mb: 2,
                                display: 'block',
                            }}
                        >
                            Timeline
                        </Typography>
                        <Stack spacing={2}>
                            <InfoRow
                                icon={<CalendarIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Created"
                                value={formatDate(lead.createdAt)}
                                isDarkMode={isDarkMode}
                            />
                            <InfoRow
                                icon={<CalendarIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Last Contacted"
                                value={formatDate(lead.lastContactedAt)}
                                isDarkMode={isDarkMode}
                            />
                        </Stack>
                    </Box>

                    {/* Notes */}
                    {lead.notes && (
                        <>
                            <Divider sx={{ mb: 3 }} />
                            <Box>
                                <Typography
                                    variant="overline"
                                    sx={{
                                        color: isDarkMode ? '#A3A3A3' : '#737373',
                                        fontWeight: 600,
                                        letterSpacing: 1,
                                        mb: 2,
                                        display: 'block',
                                    }}
                                >
                                    Notes
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Box
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 1,
                                            bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                        }}
                                    >
                                        <NotesIcon sx={{ fontSize: 20, color: iconColor }} />
                                    </Box>
                                    <Typography variant="body2" sx={{ color: isDarkMode ? '#A3A3A3' : '#525252' }}>
                                        {lead.notes}
                                    </Typography>
                                </Box>
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
        </Drawer>
    );
}
