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
import { getStatusSolid, statusPalette } from '../../theme';
import { DetailInfoRow } from '../common/DetailInfoRow';
import { getInitials, formatDate, formatCurrencyCompact } from '../../utils/formatters';

interface LeadDetailDrawerProps {
    open: boolean;
    onClose: () => void;
    lead: Lead | null;
    onConvert?: (lead: Lead) => void;
}

export function LeadDetailDrawer({ open, onClose, lead, onConvert }: LeadDetailDrawerProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    if (!lead) return null;

    const colors = getStatusSolid(lead.status, isDarkMode);
    const iconColor = isDarkMode ? '#A3A3A3' : '#525252';
    const canConvert = lead.status !== 'Won' && lead.status !== 'Lost';

    const convertBg = isDarkMode ? statusPalette.success.dark : statusPalette.success.light;
    const convertHoverBg = statusPalette.success.light;

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            slotProps={{ paper: {
                sx: {
                    width: { xs: '100%', sm: 420 },
                    bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                },
            } }}
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
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
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
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
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
                                    bgcolor: convertBg,
                                    color: '#FFFFFF',
                                    '&:hover': {
                                        bgcolor: convertHoverBg,
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
                            <DetailInfoRow
                                icon={<EmailIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Email"
                                value={lead.email}
                            />
                            <DetailInfoRow
                                icon={<PhoneIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Phone"
                                value={lead.phone}
                            />
                            <DetailInfoRow
                                icon={<BusinessIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Company"
                                value={lead.company}
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
                            <DetailInfoRow
                                icon={<SourceIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Source"
                                value={lead.source}
                            />
                            <DetailInfoRow
                                icon={<ValueIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Estimated Value"
                                value={formatCurrencyCompact(lead.value)}
                            />
                            <DetailInfoRow
                                icon={<AssignedIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Assigned To"
                                value={lead.assignedTo}
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
                            <DetailInfoRow
                                icon={<CalendarIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Created"
                                value={formatDate(lead.createdAt)}
                            />
                            <DetailInfoRow
                                icon={<CalendarIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Last Contacted"
                                value={formatDate(lead.lastContactedAt, 'Never')}
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
                                <DetailInfoRow
                                    icon={<NotesIcon sx={{ fontSize: 20, color: iconColor }} />}
                                    label="Note"
                                    value={lead.notes}
                                />
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
        </Drawer>
    );
}
