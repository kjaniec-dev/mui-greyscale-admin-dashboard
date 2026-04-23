import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Stack,
    IconButton,
    useTheme,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface ComposeDialogProps {
    open: boolean;
    onClose: () => void;
    onSend: (email: { to: string; subject: string; body: string }) => void;
    replyTo?: { to: string; subject: string };
}

export function ComposeDialog({ open, onClose, onSend, replyTo }: ComposeDialogProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const [to, setTo] = useState(replyTo?.to || '');
    const [subject, setSubject] = useState(replyTo?.subject ? `Re: ${replyTo.subject}` : '');
    const [body, setBody] = useState('');

    const handleSend = () => {
        if (!to.trim() || !subject.trim()) return;
        onSend({ to, subject, body });
        setTo('');
        setSubject('');
        setBody('');
        onClose();
    };

    const handleClose = () => {
        setTo('');
        setSubject('');
        setBody('');
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            slotProps={{ paper: {
                sx: {
                    bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                    borderRadius: 2,
                    height: '80vh',
                    display: 'flex',
                    flexDirection: 'column',
                },
            } }}
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
                }}
            >
                New Message
                <IconButton onClick={handleClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 0 }}>
                <Stack sx={{ flex: 1 }}>
                    <TextField
                        placeholder="To"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        fullWidth
                        variant="standard"
                        slotProps={{ input: {
                            disableUnderline: true,
                            sx: {
                                px: 2,
                                py: 1.5,
                                borderBottom: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
                            },
                        } }}
                    />
                    <TextField
                        placeholder="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        fullWidth
                        variant="standard"
                        slotProps={{ input: {
                            disableUnderline: true,
                            sx: {
                                px: 2,
                                py: 1.5,
                                borderBottom: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
                            },
                        } }}
                    />
                    <TextField
                        placeholder="Write your message..."
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        fullWidth
                        multiline
                        variant="standard"
                        slotProps={{ input: {
                            disableUnderline: true,
                            sx: { px: 2, py: 2, flex: 1 },
                        } }}
                        sx={{ flex: 1 }}
                    />
                </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2, borderTop: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}` }}>
                <Button onClick={handleClose} color="inherit">
                    Discard
                </Button>
                <Button
                    onClick={handleSend}
                    variant="contained"
                    disabled={!to.trim() || !subject.trim()}
                    sx={{
                        bgcolor: '#171717',
                        '&:hover': { bgcolor: '#262626' },
                    }}
                >
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    );
}
