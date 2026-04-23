import { useState, useMemo } from 'react';
import { Box, Typography, Avatar, Badge, useTheme } from '@mui/material';
import { ChatSidebar } from './components/ChatSidebar';
import { ChatMessages } from './components/ChatMessages';
import { ChatInput } from './components/ChatInput';
import { conversations as initialConversations, type Conversation, type ChatMessage } from '../../data/mockChat';

export function ChatPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
    const [selectedConvId, setSelectedConvId] = useState<string | null>(conversations[0]?.id || null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredConversations = useMemo(() => {
        if (!searchQuery) return conversations;
        const query = searchQuery.toLowerCase();
        return conversations.filter((conv) =>
            conv.participant.name.toLowerCase().includes(query)
        );
    }, [conversations, searchQuery]);

    const selectedConversation = conversations.find((c) => c.id === selectedConvId);

    const handleSelectConversation = (conversation: Conversation) => {
        setSelectedConvId(conversation.id);
        // Mark as read
        if (conversation.unreadCount > 0) {
            setConversations((prev) =>
                prev.map((c) => (c.id === conversation.id ? { ...c, unreadCount: 0 } : c))
            );
        }
    };

    const handleSendMessage = (text: string) => {
        if (!selectedConvId) return;

        const newMessage: ChatMessage = {
            id: `msg-${Date.now()}`,
            senderId: 'me',
            text,
            timestamp: new Date(),
        };

        setConversations((prev) =>
            prev.map((c) =>
                c.id === selectedConvId
                    ? { ...c, messages: [...c.messages, newMessage] }
                    : c
            )
        );
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)' }}>
            {/* Page Header */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                    Chat
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Connect with your team.
                </Typography>
            </Box>

            {/* Chat Layout */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    border: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
                    borderRadius: 2,
                    overflow: 'hidden',
                }}
            >
                {/* Sidebar */}
                <ChatSidebar
                    conversations={filteredConversations}
                    selectedId={selectedConvId}
                    onSelect={handleSelectConversation}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />

                {/* Chat Area */}
                {selectedConversation ? (
                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                        }}
                    >
                        {/* Chat Header */}
                        <Box
                            sx={{
                                p: 2,
                                borderBottom: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                            }}
                        >
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                                sx={{
                                    '& .MuiBadge-badge': {
                                        bgcolor: selectedConversation.participant.online ? '#22C55E' : 'transparent',
                                        border: selectedConversation.participant.online
                                            ? `2px solid ${isDarkMode ? '#171717' : '#FFFFFF'}`
                                            : 'none',
                                    },
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        bgcolor: isDarkMode ? '#525252' : '#A3A3A3',
                                    }}
                                >
                                    {selectedConversation.participant.name.split(' ').map(n => n[0]).join('')}
                                </Avatar>
                            </Badge>
                            <Box>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                    {selectedConversation.participant.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {selectedConversation.participant.online ? 'Online' : 'Offline'}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Messages */}
                        <ChatMessages
                            messages={selectedConversation.messages}
                            participant={selectedConversation.participant}
                        />

                        {/* Input */}
                        <ChatInput onSend={handleSendMessage} />
                    </Box>
                ) : (
                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: isDarkMode ? '#171717' : '#FAFAFA',
                        }}
                    >
                        <Typography color="text.secondary">
                            Select a conversation to start chatting
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
