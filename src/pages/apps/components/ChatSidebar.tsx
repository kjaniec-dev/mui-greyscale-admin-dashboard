import {
    Box,
    List,
    ListItemButton,
    Typography,
    Avatar,
    Badge,
    TextField,
    InputAdornment,
    useTheme,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import type { Conversation } from '../../../data/mockChat';
import { getLastMessage, formatMessageTime } from '../../../data/mockChat';

interface ChatSidebarProps {
    conversations: Conversation[];
    selectedId: string | null;
    onSelect: (conversation: Conversation) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export function ChatSidebar({
    conversations,
    selectedId,
    onSelect,
    searchQuery,
    onSearchChange,
}: ChatSidebarProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <Box
            sx={{
                width: 320,
                flexShrink: 0,
                borderRight: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
                display: 'flex',
                flexDirection: 'column',
                bgcolor: isDarkMode ? '#1A1A1A' : '#FAFAFA',
            }}
        >
            {/* Search */}
            <Box sx={{ p: 2 }}>
                <TextField
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    fullWidth
                    size="small"
                    slotProps={{ input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ fontSize: 20 }} />
                            </InputAdornment>
                        ),
                    } }}
                />
            </Box>

            {/* Conversations List */}
            <List sx={{ flex: 1, overflow: 'auto', px: 1 }}>
                {conversations.map((conv) => {
                    const lastMessage = getLastMessage(conv);
                    return (
                        <ListItemButton
                            key={conv.id}
                            selected={selectedId === conv.id}
                            onClick={() => onSelect(conv)}
                            sx={{
                                borderRadius: 1,
                                mb: 0.5,
                                py: 1.5,
                                '&.Mui-selected': {
                                    bgcolor: isDarkMode ? '#262626' : '#E5E5E5',
                                    '&:hover': {
                                        bgcolor: isDarkMode ? '#262626' : '#E5E5E5',
                                    },
                                },
                            }}
                        >
                            {/* Avatar with online badge */}
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                                sx={{
                                    mr: 1.5,
                                    '& .MuiBadge-badge': {
                                        bgcolor: conv.participant.online ? '#22C55E' : 'transparent',
                                        border: conv.participant.online
                                            ? `2px solid ${isDarkMode ? '#1A1A1A' : '#FAFAFA'}`
                                            : 'none',
                                    },
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: 44,
                                        height: 44,
                                        bgcolor: isDarkMode ? '#525252' : '#A3A3A3',
                                    }}
                                >
                                    {conv.participant.name.split(' ').map(n => n[0]).join('')}
                                </Avatar>
                            </Badge>

                            {/* Content */}
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.25 }}>
                                    <Typography variant="body2" noWrap sx={{ fontWeight: conv.unreadCount > 0 ? 600 : 400 }}>
                                        {conv.participant.name}
                                    </Typography>
                                    {lastMessage && (
                                        <Typography variant="caption" color="text.secondary">
                                            {formatMessageTime(lastMessage.timestamp)}
                                        </Typography>
                                    )}
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        noWrap
                                        sx={{
                                            flex: 1,
                                            fontWeight: conv.unreadCount > 0 ? 500 : 400,
                                            color: conv.unreadCount > 0 ? (isDarkMode ? '#E5E5E5' : '#171717') : undefined,
                                        }}
                                    >
                                        {lastMessage?.text || 'No messages yet'}
                                    </Typography>
                                    {conv.unreadCount > 0 && (
                                        <Box
                                            sx={{
                                                minWidth: 18,
                                                height: 18,
                                                borderRadius: '50%',
                                                bgcolor: isDarkMode ? '#525252' : '#171717',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontSize: '0.65rem',
                                                    fontWeight: 600,
                                                    color: '#FAFAFA',
                                                }}
                                            >
                                                {conv.unreadCount}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </ListItemButton>
                    );
                })}
            </List>
        </Box>
    );
}
