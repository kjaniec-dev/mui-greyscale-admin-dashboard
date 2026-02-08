import { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    Tabs,
    Tab,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Avatar,
    Chip,
    Rating,
    Stack,
    useTheme,
    alpha,
    IconButton,
} from '@mui/material';
import {
    Search as SearchIcon,
    Download as DownloadIcon,
    Close as CloseIcon,
} from '@mui/icons-material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import {
    mockChatHistory,
    getChatHistoryStats,
    type ChatHistoryConversation,
    type ChatHistoryStatus,
} from '../../data/mockChatHistory';

type TabValue = 'All' | ChatHistoryStatus;

export function ChatHistoryPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const [searchQuery, setSearchQuery] = useState('');
    const [tabValue, setTabValue] = useState<TabValue>('All');
    const [transcriptDialog, setTranscriptDialog] = useState<ChatHistoryConversation | null>(null);

    const stats = getChatHistoryStats();

    // Filter conversations
    const filteredConversations = useMemo(() => {
        let result = mockChatHistory;

        // Filter by status tab
        if (tabValue !== 'All') {
            result = result.filter((conv) => conv.status === tabValue);
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (conv) =>
                    conv.customerName.toLowerCase().includes(query) ||
                    conv.customerEmail.toLowerCase().includes(query) ||
                    conv.agentName.toLowerCase().includes(query) ||
                    conv.tags.some((tag) => tag.toLowerCase().includes(query))
            );
        }

        return result;
    }, [searchQuery, tabValue]);

    // Count by status
    const statusCounts = useMemo(
        () => ({
            All: mockChatHistory.length,
            Resolved: mockChatHistory.filter((c) => c.status === 'Resolved').length,
            Unresolved: mockChatHistory.filter((c) => c.status === 'Unresolved').length,
            Transferred: mockChatHistory.filter((c) => c.status === 'Transferred').length,
        }),
        []
    );

    const handleViewTranscript = (conversation: ChatHistoryConversation) => {
        setTranscriptDialog(conversation);
    };

    const handleDownloadTranscript = (conversation: ChatHistoryConversation) => {
        console.log('Download transcript:', conversation.id);
        // TODO: Implement actual download logic
    };

    const getStatusColor = (status: ChatHistoryStatus): string => {
        switch (status) {
            case 'Resolved':
                return isDarkMode ? '#4ADE80' : '#22C55E';
            case 'Unresolved':
                return isDarkMode ? '#FBBF24' : '#F59E0B';
            case 'Transferred':
                return isDarkMode ? '#60A5FA' : '#3B82F6';
        }
    };

    const columns: GridColDef<ChatHistoryConversation>[] = [
        {
            field: 'customerName',
            headerName: 'Customer',
            width: 200,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar
                        sx={{
                            width: 32,
                            height: 32,
                            bgcolor: isDarkMode ? '#525252' : '#A3A3A3',
                            fontSize: '0.875rem',
                        }}
                    >
                        {params.row.customerName
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                    </Avatar>
                    <Box>
                        <Typography variant="body2" fontWeight={500}>
                            {params.value}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {params.row.customerEmail}
                        </Typography>
                    </Box>
                </Box>
            ),
        },
        {
            field: 'agentName',
            headerName: 'Agent',
            width: 140,
        },
        {
            field: 'startedAt',
            headerName: 'Start Time',
            width: 160,
            valueGetter: (_value, row) => new Date(row.startedAt).toLocaleString(),
        },
        {
            field: 'duration',
            headerName: 'Duration',
            width: 100,
            valueGetter: (_value, row) => `${row.duration} min`,
        },
        {
            field: 'messageCount',
            headerName: 'Messages',
            width: 100,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 130,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    size="small"
                    sx={{
                        bgcolor: alpha(getStatusColor(params.value), 0.15),
                        color: getStatusColor(params.value),
                        fontWeight: 500,
                        border: `1px solid ${alpha(getStatusColor(params.value), 0.3)}`,
                    }}
                />
            ),
        },
        {
            field: 'rating',
            headerName: 'Rating',
            width: 140,
            renderCell: (params) =>
                params.value ? (
                    <Rating value={params.value} size="small" readOnly />
                ) : (
                    <Typography variant="caption" color="text.disabled">
                        Not rated
                    </Typography>
                ),
        },
        {
            field: 'tags',
            headerName: 'Tags',
            width: 180,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {params.value.slice(0, 2).map((tag: string) => (
                        <Chip key={tag} label={tag} size="small" variant="outlined" />
                    ))}
                    {params.value.length > 2 && (
                        <Chip label={`+${params.value.length - 2}`} size="small" variant="outlined" />
                    )}
                </Box>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Button size="small" onClick={() => handleViewTranscript(params.row)}>
                        View
                    </Button>
                    <IconButton size="small" onClick={() => handleDownloadTranscript(params.row)}>
                        <DownloadIcon fontSize="small" />
                    </IconButton>
                </Box >
            ),
        },
    ];

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Live Chat History
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    View and manage archived customer support chat conversations
                </Typography>
            </Box>

            {/* Statistics Cards */}
            <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                <Box
                    sx={{
                        flex: '1 1 200px',
                        p: 2.5,
                        bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                        border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Total Conversations
                    </Typography>
                    <Typography variant="h4" fontWeight={700}>
                        {stats.total}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        flex: '1 1 200px',
                        p: 2.5,
                        bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                        border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Resolution Rate
                    </Typography>
                    <Typography variant="h4" fontWeight={700}>
                        {stats.resolutionRate}%
                    </Typography>
                </Box>
                <Box
                    sx={{
                        flex: '1 1 200px',
                        p: 2.5,
                        bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                        border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Avg. Rating
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="h4" fontWeight={700}>
                            {stats.avgRating}
                        </Typography>
                        <Rating value={stats.avgRating} size="small" readOnly />
                    </Box>
                </Box>
                <Box
                    sx={{
                        flex: '1 1 200px',
                        p: 2.5,
                        bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                        border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Avg. Duration
                    </Typography>
                    <Typography variant="h4" fontWeight={700}>
                        {stats.avgDuration} min
                    </Typography>
                </Box>
            </Box>

            {/* Status Tabs */}
            <Box sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
                    <Tab label={`All (${statusCounts.All})`} value="All" />
                    <Tab label={`Resolved (${statusCounts.Resolved})`} value="Resolved" />
                    <Tab label={`Unresolved (${statusCounts.Unresolved})`} value="Unresolved" />
                    <Tab label={`Transferred (${statusCounts.Transferred})`} value="Transferred" />
                </Tabs>
            </Box>

            {/* Search Bar */}
            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    placeholder="Search by customer name, email, agent, or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ maxWidth: 600 }}
                />
            </Box>

            {/* Conversations Table */}
            <DataGrid
                rows={filteredConversations}
                columns={columns}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[10, 25, 50]}
                disableRowSelectionOnClick
                autoHeight
                sx={{
                    bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                    border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                    '& .MuiDataGrid-cell:focus': {
                        outline: 'none',
                    },
                    '& .MuiDataGrid-row:hover': {
                        bgcolor: isDarkMode ? alpha('#fff', 0.04) : alpha('#000', 0.02),
                    },
                }}
            />

            {/* Transcript Dialog */}
            <Dialog
                open={!!transcriptDialog}
                onClose={() => setTranscriptDialog(null)}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                        border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                    },
                }}
            >
                {transcriptDialog && (
                    <>
                        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box>
                                <Typography variant="h6" fontWeight={600}>
                                    Chat Transcript
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {transcriptDialog.customerName} • {new Date(transcriptDialog.startedAt).toLocaleString()}
                                </Typography>
                            </Box>
                            <IconButton onClick={() => setTranscriptDialog(null)}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent dividers>
                            {/* Conversation info */}
                            <Box sx={{ mb: 3, p: 2, bgcolor: isDarkMode ? '#0A0A0A' : '#FAFAFA', borderRadius: 1 }}>
                                <Stack direction="row" spacing={3}>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">
                                            Agent
                                        </Typography>
                                        <Typography variant="body2" fontWeight={500}>
                                            {transcriptDialog.agentName}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">
                                            Duration
                                        </Typography>
                                        <Typography variant="body2" fontWeight={500}>
                                            {transcriptDialog.duration} minutes
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">
                                            Status
                                        </Typography>
                                        <Chip
                                            label={transcriptDialog.status}
                                            size="small"
                                            sx={{
                                                bgcolor: alpha(getStatusColor(transcriptDialog.status), 0.15),
                                                color: getStatusColor(transcriptDialog.status),
                                                fontWeight: 500,
                                                border: `1px solid ${alpha(getStatusColor(transcriptDialog.status), 0.3)}`,
                                            }}
                                        />
                                    </Box>
                                    {transcriptDialog.rating && (
                                        <Box>
                                            <Typography variant="caption" color="text.secondary">
                                                Rating
                                            </Typography>
                                            <Rating value={transcriptDialog.rating} size="small" readOnly />
                                        </Box>
                                    )}
                                </Stack>
                            </Box>

                            {/* Messages */}
                            <Stack spacing={2}>
                                {transcriptDialog.transcript.map((message) => (
                                    <Box
                                        key={message.id}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: message.sender === 'customer' ? 'row-reverse' : 'row',
                                            gap: 1.5,
                                            alignItems: 'flex-start',
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                width: 32,
                                                height: 32,
                                                bgcolor:
                                                    message.sender === 'customer'
                                                        ? isDarkMode
                                                            ? '#3B82F6'
                                                            : '#2563EB'
                                                        : message.sender === 'agent'
                                                            ? isDarkMode
                                                                ? '#8B5CF6'
                                                                : '#7C3AED'
                                                            : isDarkMode
                                                                ? '#525252'
                                                                : '#A3A3A3',
                                                fontSize: '0.75rem',
                                            }}
                                        >
                                            {message.sender === 'system' ? 'S' : message.senderName.split(' ').map((n) => n[0]).join('')}
                                        </Avatar>
                                        <Box
                                            sx={{
                                                maxWidth: '70%',
                                                textAlign: message.sender === 'customer' ? 'right' : 'left',
                                            }}
                                        >
                                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                                                {message.senderName} • {new Date(message.timestamp).toLocaleTimeString()}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    p: 1.5,
                                                    borderRadius: 2,
                                                    bgcolor:
                                                        message.sender === 'customer'
                                                            ? isDarkMode
                                                                ? alpha('#3B82F6', 0.15)
                                                                : alpha('#2563EB', 0.1)
                                                            : message.sender === 'agent'
                                                                ? isDarkMode
                                                                    ? alpha('#8B5CF6', 0.15)
                                                                    : alpha('#7C3AED', 0.1)
                                                                : isDarkMode
                                                                    ? alpha('#525252', 0.15)
                                                                    : alpha('#A3A3A3', 0.1),
                                                }}
                                            >
                                                <Typography variant="body2">{message.text}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                ))}
                            </Stack>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleDownloadTranscript(transcriptDialog)} startIcon={<DownloadIcon />}>
                                Download
                            </Button>
                            <Button
                                onClick={() => setTranscriptDialog(null)}
                                variant="contained"
                                sx={{
                                    bgcolor: '#171717',
                                    color: '#FAFAFA',
                                    '&:hover': { bgcolor: '#262626' },
                                }}
                            >
                                Close
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Box>
    );
}
