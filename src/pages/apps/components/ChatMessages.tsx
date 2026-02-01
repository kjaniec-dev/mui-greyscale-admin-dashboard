import { useRef, useEffect } from 'react';
import { Box, Typography, Avatar, useTheme } from '@mui/material';
import type { ChatMessage, ChatUser } from '../../../data/mockChat';

interface ChatMessagesProps {
    messages: ChatMessage[];
    participant: ChatUser;
}

function formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

export function ChatMessages({ messages, participant }: ChatMessagesProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    if (messages.length === 0) {
        return (
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography color="text.secondary">No messages yet. Start the conversation!</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
            {messages.map((message, index) => {
                const isMe = message.senderId === 'me';
                const showAvatar = !isMe && (index === 0 || messages[index - 1].senderId === 'me');

                return (
                    <Box
                        key={message.id}
                        sx={{
                            display: 'flex',
                            justifyContent: isMe ? 'flex-end' : 'flex-start',
                            mb: 1.5,
                            alignItems: 'flex-end',
                            gap: 1,
                        }}
                    >
                        {/* Avatar for received messages */}
                        {!isMe && (
                            <Avatar
                                sx={{
                                    width: 28,
                                    height: 28,
                                    fontSize: '0.7rem',
                                    bgcolor: isDarkMode ? '#525252' : '#A3A3A3',
                                    visibility: showAvatar ? 'visible' : 'hidden',
                                }}
                            >
                                {participant.name.split(' ').map(n => n[0]).join('')}
                            </Avatar>
                        )}

                        {/* Message bubble */}
                        <Box
                            sx={{
                                maxWidth: '70%',
                                px: 2,
                                py: 1,
                                borderRadius: 2,
                                bgcolor: isMe
                                    ? (isDarkMode ? '#404040' : '#171717')
                                    : (isDarkMode ? '#262626' : '#E5E5E5'),
                                color: isMe
                                    ? '#FAFAFA'
                                    : (isDarkMode ? '#E5E5E5' : '#171717'),
                            }}
                        >
                            <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                                {message.text}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    display: 'block',
                                    mt: 0.5,
                                    opacity: 0.7,
                                    textAlign: isMe ? 'right' : 'left',
                                    fontSize: '0.65rem',
                                }}
                            >
                                {formatTime(message.timestamp)}
                            </Typography>
                        </Box>
                    </Box>
                );
            })}
            <div ref={messagesEndRef} />
        </Box>
    );
}
