import {
    Box,
    List,
    ListItemButton,
    Typography,
    IconButton,
    Avatar,
    useTheme,
} from '@mui/material';
import {
    Star as StarIcon,
    StarBorder as StarBorderIcon,
    AttachFile as AttachmentIcon,
} from '@mui/icons-material';
import type { Email } from '../../../data/mockEmails';

interface MailListProps {
    emails: Email[];
    selectedId: string | null;
    onSelect: (email: Email) => void;
    onToggleStar: (emailId: string) => void;
    onToggleRead: (emailId: string) => void;
}

function formatDate(date: Date): string {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } else if (diffDays < 7) {
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
}

export function MailList({ emails, selectedId, onSelect, onToggleStar }: MailListProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    if (emails.length === 0) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography color="text.secondary">No emails in this folder</Typography>
            </Box>
        );
    }

    return (
        <List disablePadding>
            {emails.map((email) => (
                <ListItemButton
                    key={email.id}
                    selected={selectedId === email.id}
                    onClick={() => onSelect(email)}
                    sx={{
                        py: 1.5,
                        px: 2,
                        borderBottom: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
                        bgcolor: !email.read
                            ? (isDarkMode ? '#262626' : '#FAFAFA')
                            : 'transparent',
                        '&.Mui-selected': {
                            bgcolor: isDarkMode ? '#404040' : '#E5E5E5',
                            '&:hover': {
                                bgcolor: isDarkMode ? '#404040' : '#E5E5E5',
                            },
                        },
                        '&:hover': {
                            bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                        },
                    }}
                >
                    {/* Star */}
                    <IconButton
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleStar(email.id);
                        }}
                        sx={{ mr: 1 }}
                    >
                        {email.starred ? (
                            <StarIcon sx={{ fontSize: 18, color: 'text.primary' }} />
                        ) : (
                            <StarBorderIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                        )}
                    </IconButton>

                    {/* Avatar */}
                    <Avatar
                        sx={{
                            width: 32,
                            height: 32,
                            fontSize: '0.75rem',
                            bgcolor: isDarkMode ? '#525252' : '#A3A3A3',
                            mr: 1.5,
                        }}
                    >
                        {email.from.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>

                    {/* Content */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography
                                variant="body2"
                                fontWeight={email.read ? 400 : 600}
                                noWrap
                                sx={{ flex: 1, mr: 1 }}
                            >
                                {email.from.name}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                {email.attachments && email.attachments.length > 0 && (
                                    <AttachmentIcon sx={{ fontSize: 14, color: isDarkMode ? '#737373' : '#A3A3A3' }} />
                                )}
                                <Typography variant="caption" color="text.secondary">
                                    {formatDate(email.date)}
                                </Typography>
                            </Box>
                        </Box>
                        <Typography
                            variant="body2"
                            fontWeight={email.read ? 400 : 500}
                            noWrap
                            sx={{ color: isDarkMode ? '#E5E5E5' : '#171717' }}
                        >
                            {email.subject}
                        </Typography>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            noWrap
                            sx={{ display: 'block' }}
                        >
                            {email.body.substring(0, 80)}...
                        </Typography>
                    </Box>
                </ListItemButton>
            ))}
        </List>
    );
}
