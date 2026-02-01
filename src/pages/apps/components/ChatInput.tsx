import { useState } from 'react';
import { Box, TextField, IconButton, useTheme } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

interface ChatInputProps {
    onSend: (text: string) => void;
    disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const [text, setText] = useState('');

    const handleSend = () => {
        if (!text.trim()) return;
        onSend(text.trim());
        setText('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <Box
            sx={{
                p: 2,
                borderTop: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
                bgcolor: isDarkMode ? '#1A1A1A' : '#FAFAFA',
                display: 'flex',
                gap: 1,
                alignItems: 'flex-end',
            }}
        >
            <TextField
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={handleKeyPress}
                fullWidth
                multiline
                maxRows={4}
                disabled={disabled}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        bgcolor: isDarkMode ? '#262626' : '#FFFFFF',
                    },
                }}
            />
            <IconButton
                onClick={handleSend}
                disabled={!text.trim() || disabled}
                sx={{
                    width: 44,
                    height: 44,
                    bgcolor: text.trim() ? '#171717' : (isDarkMode ? '#404040' : '#E5E5E5'),
                    color: '#FAFAFA',
                    '&:hover': {
                        bgcolor: text.trim() ? '#262626' : (isDarkMode ? '#404040' : '#E5E5E5'),
                    },
                    '&.Mui-disabled': {
                        color: isDarkMode ? '#737373' : '#A3A3A3',
                    },
                }}
            >
                <SendIcon />
            </IconButton>
        </Box>
    );
}
