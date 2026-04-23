import {
    Box,
    Typography,
    IconButton,
    Avatar,
    Chip,
    useTheme,
} from '@mui/material';
import {
    Star as StarIcon,
    StarBorder as StarBorderIcon,
    Reply as ReplyIcon,
    Forward as ForwardIcon,
    Delete as DeleteIcon,
    AttachFile as AttachmentIcon,
} from '@mui/icons-material';
import type { Email } from '../../../data/mockEmails';

interface MailDetailProps {
    email: Email | null;
    onToggleStar: (emailId: string) => void;
    onDelete: (emailId: string) => void;
    onReply?: (email: Email) => void;
}

function formatFullDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    });
}

export function MailDetail({ email, onToggleStar, onDelete, onReply }: MailDetailProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    if (!email) {
        return (
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: isDarkMode ? '#171717' : '#FAFAFA',
                }}
            >
                <Typography color="text.secondary">Select an email to read</Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                overflow: 'hidden',
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton size="small" onClick={() => onToggleStar(email.id)}>
                        {email.starred ? (
                            <StarIcon sx={{ color: 'text.primary' }} />
                        ) : (
                            <StarBorderIcon sx={{ color: 'text.disabled' }} />
                        )}
                    </IconButton>
                    <IconButton size="small" onClick={() => onReply?.(email)}>
                        <ReplyIcon sx={{ color: isDarkMode ? '#A3A3A3' : '#525252' }} />
                    </IconButton>
                    <IconButton size="small">
                        <ForwardIcon sx={{ color: isDarkMode ? '#A3A3A3' : '#525252' }} />
                    </IconButton>
                </Box>
                <IconButton size="small" onClick={() => onDelete(email.id)} sx={{ color: 'error.main' }}>
                    <DeleteIcon />
                </IconButton>
            </Box>

            {/* Subject */}
            <Box sx={{ p: 2, borderBottom: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}` }}>
                <Typography variant="h6" sx={{ fontWeight: 600,  mb: 1  }}>
                    {email.subject}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {formatFullDate(email.date)}
                </Typography>
            </Box>

            {/* Sender info */}
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, borderBottom: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}` }}>
                <Avatar
                    sx={{
                        width: 40,
                        height: 40,
                        bgcolor: isDarkMode ? '#525252' : '#A3A3A3',
                    }}
                >
                    {email.from.name.split(' ').map(n => n[0]).join('')}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {email.from.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {email.from.email}
                    </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                    to me
                </Typography>
            </Box>

            {/* Body */}
            <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
                <Typography
                    variant="body1"
                    sx={{
                        whiteSpace: 'pre-wrap',
                        lineHeight: 1.8,
                        color: isDarkMode ? '#E5E5E5' : '#171717',
                    }}
                >
                    {email.body}
                </Typography>
            </Box>

            {/* Attachments */}
            {email.attachments && email.attachments.length > 0 && (
                <Box
                    sx={{
                        p: 2,
                        borderTop: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
                        bgcolor: isDarkMode ? '#1A1A1A' : '#FAFAFA',
                    }}
                >
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                        Attachments ({email.attachments.length})
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {email.attachments.map((att) => (
                            <Chip
                                key={att.id}
                                icon={<AttachmentIcon sx={{ fontSize: 16 }} />}
                                label={`${att.name} (${att.size})`}
                                size="small"
                                sx={{
                                    bgcolor: isDarkMode ? '#262626' : '#E5E5E5',
                                    '&:hover': { bgcolor: isDarkMode ? '#404040' : '#D4D4D4' },
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    );
}
