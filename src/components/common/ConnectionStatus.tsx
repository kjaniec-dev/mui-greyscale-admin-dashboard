import { Box, Chip, Button, alpha } from '@mui/material';
import { FiberManualRecord, Refresh } from '@mui/icons-material';
import type { ConnectionStatus as Status } from '../../hooks/useRealtimeData';

interface ConnectionStatusProps {
    status: Status;
    onReconnect?: () => void;
    showReconnectButton?: boolean;
}

const statusConfig = {
    connected: {
        color: 'success' as const,
        label: 'Connected',
        pulse: true,
    },
    connecting: {
        color: 'warning' as const,
        label: 'Connecting...',
        pulse: true,
    },
    disconnected: {
        color: 'error' as const,
        label: 'Disconnected',
        pulse: false,
    },
};

export function ConnectionStatus({
    status,
    onReconnect,
    showReconnectButton = true,
}: ConnectionStatusProps) {
    const config = statusConfig[status];

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Chip
                icon={
                    <FiberManualRecord
                        sx={{
                            fontSize: 10,
                            color: `${config.color}.main`,
                            ...(config.pulse && {
                                animation: 'statusPulse 2s ease-in-out infinite',
                                '@keyframes statusPulse': {
                                    '0%, 100%': { opacity: 1 },
                                    '50%': { opacity: 0.4 },
                                },
                            }),
                        }}
                    />
                }
                label={config.label}
                size="small"
                sx={{
                    height: 28,
                    bgcolor: (theme) => alpha(theme.palette[config.color].main, 0.1),
                    color: `${config.color}.main`,
                    fontWeight: 600,
                    '& .MuiChip-icon': {
                        ml: 0.5,
                    },
                }}
            />

            {status === 'disconnected' && showReconnectButton && onReconnect && (
                <Button
                    size="small"
                    variant="outlined"
                    startIcon={<Refresh sx={{ fontSize: 16 }} />}
                    onClick={onReconnect}
                    sx={{
                        height: 28,
                        fontSize: '0.75rem',
                        textTransform: 'none',
                    }}
                >
                    Reconnect
                </Button>
            )}
        </Box>
    );
}
