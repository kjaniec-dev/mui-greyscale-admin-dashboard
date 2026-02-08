import { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Chip,
    Alert,
    Divider,
    useTheme,
    alpha,
    Snackbar,
    Tooltip,
} from '@mui/material';
import {
    Computer as DesktopIcon,
    PhoneAndroid as MobileIcon,
    Tablet as TabletIcon,
    LocationOn as LocationIcon,
    AccessTime as TimeIcon,
    Delete as DeleteIcon,
    Shield as ShieldIcon,
    Logout as LogoutIcon,
} from '@mui/icons-material';
import {
    mockSessions,
    deviceLabels,
    formatRelativeTime,
    type Session,
} from '../../data/mockSessions';

const deviceIcons = {
    desktop: DesktopIcon,
    mobile: MobileIcon,
    tablet: TabletIcon,
};

export function SessionsPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const [sessions, setSessions] = useState<Session[]>(mockSessions);
    const [terminateDialogOpen, setTerminateDialogOpen] = useState(false);
    const [terminateAllDialogOpen, setTerminateAllDialogOpen] = useState(false);
    const [selectedSession, setSelectedSession] = useState<Session | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const currentSession = sessions.find((s) => s.isCurrent);
    const otherSessions = sessions.filter((s) => !s.isCurrent);

    const handleTerminateSession = () => {
        if (selectedSession) {
            setSessions(sessions.filter((s) => s.id !== selectedSession.id));
            setTerminateDialogOpen(false);
            setSelectedSession(null);
            showSnackbar('Session terminated successfully');
        }
    };

    const handleTerminateAllOthers = () => {
        setSessions(sessions.filter((s) => s.isCurrent));
        setTerminateAllDialogOpen(false);
        showSnackbar('All other sessions terminated');
    };

    const showSnackbar = (message: string) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const sectionPaperSx = {
        p: 3,
        bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
        border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
    };

    const renderSessionCard = (session: Session) => {
        const DeviceIcon = deviceIcons[session.device];

        return (
            <Box
                key={session.id}
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    py: 2.5,
                    gap: 2,
                }}
            >
                <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
                    <Box
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 1.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: session.isCurrent
                                ? alpha(theme.palette.success.main, 0.1)
                                : isDarkMode
                                    ? '#262626'
                                    : '#F5F5F5',
                            color: session.isCurrent
                                ? theme.palette.success.main
                                : isDarkMode
                                    ? '#A3A3A3'
                                    : '#525252',
                            flexShrink: 0,
                        }}
                    >
                        <DeviceIcon />
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                            <Typography variant="body1" fontWeight={600}>
                                {session.browser} on {session.os}
                            </Typography>
                            {session.isCurrent && (
                                <Chip
                                    label="This device"
                                    size="small"
                                    color="success"
                                    sx={{ height: 22 }}
                                />
                            )}
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {deviceLabels[session.device]}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 2,
                                '& > *': {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                },
                            }}
                        >
                            <Typography variant="caption" color="text.secondary">
                                <LocationIcon sx={{ fontSize: 14 }} />
                                {session.location}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                IP: {session.ipAddress}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                <TimeIcon sx={{ fontSize: 14 }} />
                                {session.isCurrent ? 'Active now' : formatRelativeTime(session.lastActive)}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                {!session.isCurrent && (
                    <Tooltip title="Terminate session">
                        <IconButton
                            size="small"
                            color="error"
                            onClick={() => {
                                setSelectedSession(session);
                                setTerminateDialogOpen(true);
                            }}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                )}
            </Box>
        );
    };

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Active Sessions
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Manage your active sessions across different devices and browsers
                </Typography>
            </Box>

            {/* Info Alert */}
            <Alert severity="info" icon={<ShieldIcon />} sx={{ mb: 3 }}>
                If you notice any unfamiliar sessions, terminate them immediately and consider changing your password.
            </Alert>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 800 }}>
                {/* Current Session */}
                {currentSession && (
                    <Paper sx={sectionPaperSx}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Current Session
                        </Typography>
                        {renderSessionCard(currentSession)}
                    </Paper>
                )}

                {/* Other Sessions */}
                <Paper sx={sectionPaperSx}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mb: 2,
                        }}
                    >
                        <Typography variant="h6" fontWeight={600}>
                            Other Sessions ({otherSessions.length})
                        </Typography>
                        {otherSessions.length > 0 && (
                            <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                startIcon={<LogoutIcon />}
                                onClick={() => setTerminateAllDialogOpen(true)}
                            >
                                Terminate All
                            </Button>
                        )}
                    </Box>
                    {otherSessions.length === 0 ? (
                        <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                            No other active sessions found.
                        </Typography>
                    ) : (
                        otherSessions.map((session, index) => (
                            <Box key={session.id}>
                                {index > 0 && <Divider />}
                                {renderSessionCard(session)}
                            </Box>
                        ))
                    )}
                </Paper>

                {/* Security Tips */}
                <Paper sx={sectionPaperSx}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                        Security Tips
                    </Typography>
                    <Box component="ul" sx={{ m: 0, pl: 3 }}>
                        <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Regularly review your active sessions and terminate any you don't recognize
                        </Typography>
                        <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Use strong, unique passwords and enable two-factor authentication
                        </Typography>
                        <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Always sign out when using shared or public computers
                        </Typography>
                        <Typography component="li" variant="body2" color="text.secondary">
                            Be cautious of sessions from unfamiliar locations or IP addresses
                        </Typography>
                    </Box>
                </Paper>
            </Box>

            {/* Terminate Single Session Dialog */}
            <Dialog open={terminateDialogOpen} onClose={() => setTerminateDialogOpen(false)}>
                <DialogTitle>Terminate Session</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to terminate the session on{' '}
                        <strong>
                            {selectedSession?.browser} ({selectedSession?.os})
                        </strong>
                        ?
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        This will log out the device immediately.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setTerminateDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleTerminateSession} color="error" variant="contained">
                        Terminate
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Terminate All Dialog */}
            <Dialog open={terminateAllDialogOpen} onClose={() => setTerminateAllDialogOpen(false)}>
                <DialogTitle>Terminate All Other Sessions</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to terminate all {otherSessions.length} other session
                        {otherSessions.length !== 1 ? 's' : ''}?
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        This will log out all devices except your current one.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setTerminateAllDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleTerminateAllOthers} color="error" variant="contained">
                        Terminate All
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </Box>
    );
}
