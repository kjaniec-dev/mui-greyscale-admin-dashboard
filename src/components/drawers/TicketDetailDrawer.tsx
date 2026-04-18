import {
    Box,
    Drawer,
    Typography,
    IconButton,
    Chip,
    Avatar,
    Divider,
    useTheme,
    Paper,
} from '@mui/material';
import {
    Close as CloseIcon,
    AccessTime as TimeIcon,
    Person as PersonIcon,
    Category as CategoryIcon,
    Assignment as AssignmentIcon,
} from '@mui/icons-material';
import type { Ticket } from '../../data/mockTickets';
import { getStatusColor } from '../../theme';

interface TicketDetailDrawerProps {
    open: boolean;
    onClose: () => void;
    ticket: Ticket | null;
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

function formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function TicketDetailDrawer({ open, onClose, ticket }: TicketDetailDrawerProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const priorityColors: Record<string, { bg: string; color: string }> = {
        Low: { bg: isDarkMode ? '#6B7280' : '#F3F4F6', color: isDarkMode ? '#FFFFFF' : '#374151' },
        Medium: { bg: isDarkMode ? '#3B82F6' : '#DBEAFE', color: isDarkMode ? '#FFFFFF' : '#1E40AF' },
        High: { bg: isDarkMode ? '#F59E0B' : '#FEF3C7', color: isDarkMode ? '#FFFFFF' : '#92400E' },
        Urgent: { bg: isDarkMode ? '#EF4444' : '#FEE2E2', color: isDarkMode ? '#FFFFFF' : '#991B1B' },
    };

    if (!ticket) return null;

    const statusStyle = getStatusColor(ticket.status, isDarkMode);
    const priorityStyle = priorityColors[ticket.priority] || priorityColors.Low;

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: { xs: '100%', sm: 450 },
                    bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                },
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    p: 3,
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    borderBottom: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
                }}
            >
                <Box>
                    <Typography
                        variant="caption"
                        sx={{ fontFamily: 'monospace', color: 'text.secondary' }}
                    >
                        {ticket.id}
                    </Typography>
                    <Typography variant="h6" fontWeight={700} sx={{ mt: 0.5 }}>
                        {ticket.subject}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1.5 }}>
                        <Chip
                            label={ticket.status}
                            size="small"
                            sx={{
                                bgcolor: statusStyle.bg,
                                color: statusStyle.text,
                                fontWeight: 500,
                            }}
                        />
                        <Chip
                            label={ticket.priority}
                            size="small"
                            sx={{
                                bgcolor: priorityStyle.bg,
                                color: priorityStyle.color,
                                fontWeight: 500,
                            }}
                        />
                    </Box>
                </Box>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </Box>

            {/* Content */}
            <Box sx={{ p: 3, overflowY: 'auto', flex: 1 }}>
                {/* Description */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                        Description
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {ticket.description}
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Info Grid */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {/* Customer */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <PersonIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Customer
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        fontSize: '0.7rem',
                                        bgcolor: isDarkMode ? '#404040' : '#E5E5E5',
                                        color: isDarkMode ? '#E5E5E5' : '#171717',
                                    }}
                                >
                                    {getInitials(ticket.customerName)}
                                </Avatar>
                                <Typography variant="body2" fontWeight={500}>
                                    {ticket.customerName}
                                </Typography>
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                                {ticket.customerEmail}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Category */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <CategoryIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Category
                            </Typography>
                            <Typography variant="body2" fontWeight={500}>
                                {ticket.category}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Assigned To */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <AssignmentIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Assigned To
                            </Typography>
                            <Typography variant="body2" fontWeight={500}>
                                {ticket.assignedTo || 'Unassigned'}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Created At */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <TimeIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Created
                            </Typography>
                            <Typography variant="body2" fontWeight={500}>
                                {formatDate(ticket.createdAt)}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Messages */}
                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    Conversation ({ticket.messages.length})
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    {ticket.messages.map((message) => (
                        <Paper
                            key={message.id}
                            elevation={0}
                            sx={{
                                p: 2,
                                bgcolor: message.sender === 'agent'
                                    ? (isDarkMode ? '#262626' : '#F5F5F5')
                                    : (isDarkMode ? '#1a1a2e' : '#EFF6FF'),
                                borderRadius: 2,
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Avatar
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        fontSize: '0.7rem',
                                        bgcolor: message.sender === 'agent'
                                            ? (isDarkMode ? '#525252' : '#D4D4D4')
                                            : (isDarkMode ? '#3B82F6' : '#93C5FD'),
                                        color: isDarkMode ? '#FAFAFA' : '#171717',
                                    }}
                                >
                                    {getInitials(message.senderName)}
                                </Avatar>
                                <Typography variant="body2" fontWeight={600}>
                                    {message.senderName}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                                    {new Date(message.createdAt).toLocaleDateString()}
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                {message.content}
                            </Typography>
                        </Paper>
                    ))}
                </Box>
            </Box>
        </Drawer>
    );
}
