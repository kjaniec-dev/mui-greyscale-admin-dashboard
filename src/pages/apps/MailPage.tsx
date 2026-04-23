import { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    Button,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Badge,
    TextField,
    InputAdornment,
    useTheme,
} from '@mui/material';
import {
    Create as ComposeIcon,
    Inbox as InboxIcon,
    Send as SendIcon,
    Drafts as DraftsIcon,
    Star as StarIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
} from '@mui/icons-material';
import { MailList } from './components/MailList';
import { MailDetail } from './components/MailDetail';
import { ComposeDialog } from './components/ComposeDialog';
import {
    mockEmails,
    mailFolders,
    getEmailsByFolder,
    getUnreadCount,
    type Email,
    type MailFolder,
} from '../../data/mockEmails';

const folderIcons: Record<MailFolder, React.ReactNode> = {
    inbox: <InboxIcon />,
    sent: <SendIcon />,
    drafts: <DraftsIcon />,
    starred: <StarIcon />,
    trash: <DeleteIcon />,
};

export function MailPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const [emails, setEmails] = useState<Email[]>(mockEmails);
    const [selectedFolder, setSelectedFolder] = useState<MailFolder>('inbox');
    const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [composeOpen, setComposeOpen] = useState(false);
    const [replyTo, setReplyTo] = useState<{ to: string; subject: string } | undefined>();

    const folderEmails = useMemo(() => {
        let filtered = getEmailsByFolder(selectedFolder, emails);
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (e) =>
                    e.subject.toLowerCase().includes(query) ||
                    e.from.name.toLowerCase().includes(query) ||
                    e.body.toLowerCase().includes(query)
            );
        }
        return filtered.sort((a, b) => b.date.getTime() - a.date.getTime());
    }, [emails, selectedFolder, searchQuery]);

    const handleSelectEmail = (email: Email) => {
        setSelectedEmail(email);
        // Mark as read
        if (!email.read) {
            setEmails((prev) =>
                prev.map((e) => (e.id === email.id ? { ...e, read: true } : e))
            );
        }
    };

    const handleToggleStar = (emailId: string) => {
        setEmails((prev) =>
            prev.map((e) => (e.id === emailId ? { ...e, starred: !e.starred } : e))
        );
        if (selectedEmail?.id === emailId) {
            setSelectedEmail((prev) => prev ? { ...prev, starred: !prev.starred } : null);
        }
    };

    const handleToggleRead = (emailId: string) => {
        setEmails((prev) =>
            prev.map((e) => (e.id === emailId ? { ...e, read: !e.read } : e))
        );
    };

    const handleDelete = (emailId: string) => {
        setEmails((prev) =>
            prev.map((e) =>
                e.id === emailId ? { ...e, folder: 'trash' as MailFolder } : e
            )
        );
        if (selectedEmail?.id === emailId) {
            setSelectedEmail(null);
        }
    };

    const handleReply = (email: Email) => {
        setReplyTo({ to: email.from.email, subject: email.subject });
        setComposeOpen(true);
    };

    const handleSendEmail = (newEmail: { to: string; subject: string; body: string }) => {
        const email: Email = {
            id: `email-${Date.now()}`,
            from: { name: 'Me', email: 'me@mycompany.com' },
            to: [newEmail.to],
            subject: newEmail.subject,
            body: newEmail.body,
            date: new Date(),
            read: true,
            starred: false,
            folder: 'sent',
        };
        setEmails((prev) => [email, ...prev]);
        setReplyTo(undefined);
    };

    const handleComposeClose = () => {
        setComposeOpen(false);
        setReplyTo(undefined);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: { xs: 'auto', md: 'calc(100vh - 140px)' } }}>
            {/* Page Header */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                    Mail
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Manage your emails.
                </Typography>
            </Box>

            {/* Mail Layout */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    border: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
                    borderRadius: 2,
                    overflow: 'hidden',
                }}
            >
                {/* Sidebar */}
                <Box
                    sx={{
                        width: { xs: '100%', md: 220 },
                        flexShrink: 0,
                        borderRight: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
                        bgcolor: isDarkMode ? '#1A1A1A' : '#FAFAFA',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box sx={{ p: 2 }}>
                        <Button
                            variant="contained"
                            fullWidth
                            startIcon={<ComposeIcon />}
                            onClick={() => setComposeOpen(true)}
                            sx={{
                                bgcolor: '#171717',
                                color: '#FAFAFA',
                                '&:hover': { bgcolor: '#262626' },
                            }}
                        >
                            Compose
                        </Button>
                    </Box>

                    <List sx={{ flex: 1, px: 1 }}>
                        {mailFolders.map((folder) => {
                            const unread = getUnreadCount(folder.id, emails);
                            return (
                                <ListItemButton
                                    key={folder.id}
                                    selected={selectedFolder === folder.id}
                                    onClick={() => {
                                        setSelectedFolder(folder.id);
                                        setSelectedEmail(null);
                                    }}
                                    sx={{
                                        borderRadius: 1,
                                        mb: 0.5,
                                        '&.Mui-selected': {
                                            bgcolor: isDarkMode ? '#262626' : '#E5E5E5',
                                            '&:hover': {
                                                bgcolor: isDarkMode ? '#262626' : '#E5E5E5',
                                            },
                                        },
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        {folderIcons[folder.id]}
                                    </ListItemIcon>
                                    <ListItemText primary={folder.label} />
                                    {unread > 0 && folder.id === 'inbox' && (
                                        <Badge
                                            badgeContent={unread}
                                            color="default"
                                            sx={{
                                                '& .MuiBadge-badge': {
                                                    bgcolor: isDarkMode ? '#525252' : '#A3A3A3',
                                                    color: isDarkMode ? '#E5E5E5' : '#FAFAFA',
                                                },
                                            }}
                                        />
                                    )}
                                </ListItemButton>
                            );
                        })}
                    </List>
                </Box>

                {/* Email List */}
                <Box
                    sx={{
                        width: { xs: '100%', md: 350 },
                        flexShrink: 0,
                        borderRight: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
                        display: 'flex',
                        flexDirection: 'column',
                        bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                    }}
                >
                    <Box sx={{ p: 2, borderBottom: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}` }}>
                        <TextField
                            placeholder="Search emails..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
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
                    <Box sx={{ flex: 1, overflow: 'auto' }}>
                        <MailList
                            emails={folderEmails}
                            selectedId={selectedEmail?.id || null}
                            onSelect={handleSelectEmail}
                            onToggleStar={handleToggleStar}
                            onToggleRead={handleToggleRead}
                        />
                    </Box>
                </Box>

                {/* Email Detail */}
                <MailDetail
                    email={selectedEmail}
                    onToggleStar={handleToggleStar}
                    onDelete={handleDelete}
                    onReply={handleReply}
                />
            </Box>

            {/* Compose Dialog */}
            <ComposeDialog
                open={composeOpen}
                onClose={handleComposeClose}
                onSend={handleSendEmail}
                replyTo={replyTo}
            />
        </Box>
    );
}
