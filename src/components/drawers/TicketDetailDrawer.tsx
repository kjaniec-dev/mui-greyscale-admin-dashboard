import {
    Box,
    Drawer,
    Typography,
    IconButton,
    Chip,
    Avatar,
    Divider,
    Stack,
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
import { getStatusSolid, type StatusKey } from '../../theme';
import { DetailInfoRow } from '../common/DetailInfoRow';
import { getInitials, formatDateTime } from '../../utils/formatters';

interface TicketDetailDrawerProps {
    open: boolean;
    onClose: () => void;
    ticket: Ticket | null;
}

const priorityToTone: Record<string, StatusKey> = {
    Low: 'success',
    Medium: 'info',
    High: 'warning',
    Urgent: 'error',
};

export function TicketDetailDrawer({ open, onClose, ticket }: TicketDetailDrawerProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    if (!ticket) return null;

    const statusStyle = getStatusSolid(ticket.status, isDarkMode);
    const priorityTone = priorityToTone[ticket.priority] ?? 'info';
    const priorityColors = getStatusSolid(priorityTone, isDarkMode);
    const iconColor = isDarkMode ? '#A3A3A3' : '#525252';

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
                        <Typography variant="h6" sx={{ fontWeight: 700,  mt: 0.5  }}>
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
                                    borderRadius: 1,
                                }}
                            />
                            <Chip
                                label={ticket.priority}
                                size="small"
                                sx={{
                                    bgcolor: priorityColors.bg,
                                    color: priorityColors.text,
                                    fontWeight: 500,
                                    borderRadius: 1,
                                }}
                            />
                        </Box>
                    </Box>
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
                <Box sx={{ p: 3, overflowY: 'auto', flex: 1 }}>
                    {/* Description */}
                    <Box sx={{ mb: 3 }}>
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
                            Description
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {ticket.description}
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Info */}
                    <Box sx={{ mb: 3 }}>
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
                            Details
                        </Typography>
                        <Stack spacing={2}>
                            <DetailInfoRow
                                icon={<PersonIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Customer"
                                value={
                                    <Box>
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
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {ticket.customerName}
                                            </Typography>
                                        </Box>
                                        <Typography variant="caption" color="text.secondary">
                                            {ticket.customerEmail}
                                        </Typography>
                                    </Box>
                                }
                            />
                            <DetailInfoRow
                                icon={<CategoryIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Category"
                                value={ticket.category}
                            />
                            <DetailInfoRow
                                icon={<AssignmentIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Assigned To"
                                value={ticket.assignedTo || 'Unassigned'}
                            />
                            <DetailInfoRow
                                icon={<TimeIcon sx={{ fontSize: 20, color: iconColor }} />}
                                label="Created"
                                value={formatDateTime(ticket.createdAt)}
                            />
                        </Stack>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Messages */}
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
                                        : (isDarkMode ? '#1F1F1F' : '#FAFAFA'),
                                    borderRadius: 2,
                                    border: message.sender !== 'agent'
                                        ? `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`
                                        : 'none',
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <Avatar
                                        sx={{
                                            width: 24,
                                            height: 24,
                                            fontSize: '0.7rem',
                                            bgcolor: isDarkMode ? '#525252' : '#D4D4D4',
                                            color: isDarkMode ? '#FAFAFA' : '#171717',
                                        }}
                                    >
                                        {getInitials(message.senderName)}
                                    </Avatar>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
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
            </Box>
        </Drawer>
    );
}
