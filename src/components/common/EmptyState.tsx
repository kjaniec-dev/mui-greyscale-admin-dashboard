import { Box, Typography, Button, Paper, useTheme, alpha } from '@mui/material';
import {
    SearchOff as NoSearchIcon,
    Inbox as NoDataIcon,
    Error as ErrorIcon,
    Add as AddIcon,
    FilterList as NoFilterIcon,
} from '@mui/icons-material';
import type { ReactNode } from 'react';

type EmptyStateType = 'no-data' | 'no-results' | 'error' | 'no-filter';

interface EmptyStateProps {
    type?: EmptyStateType;
    title?: string;
    description?: string;
    icon?: ReactNode;
    action?: {
        label: string;
        onClick: () => void;
        startIcon?: ReactNode;
    };
    compact?: boolean;
}

const defaultConfig: Record<EmptyStateType, { icon: ReactNode; title: string; description: string }> = {
    'no-data': {
        icon: <NoDataIcon />,
        title: 'No data yet',
        description: 'Get started by adding your first item',
    },
    'no-results': {
        icon: <NoSearchIcon />,
        title: 'No results found',
        description: 'Try adjusting your search or filter criteria',
    },
    'error': {
        icon: <ErrorIcon />,
        title: 'Something went wrong',
        description: 'An error occurred while loading the data',
    },
    'no-filter': {
        icon: <NoFilterIcon />,
        title: 'No matching items',
        description: 'No items match your current filters',
    },
};

export function EmptyState({
    type = 'no-data',
    title,
    description,
    icon,
    action,
    compact = false,
}: EmptyStateProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const config = defaultConfig[type];

    const displayIcon = icon || config.icon;
    const displayTitle = title || config.title;
    const displayDescription = description || config.description;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: compact ? 4 : 8,
                px: 3,
                textAlign: 'center',
            }}
        >
            {/* Icon container */}
            <Box
                sx={{
                    width: compact ? 64 : 96,
                    height: compact ? 64 : 96,
                    borderRadius: '50%',
                    bgcolor: isDarkMode ? alpha('#fff', 0.05) : alpha('#000', 0.04),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: compact ? 2 : 3,
                    '& .MuiSvgIcon-root': {
                        fontSize: compact ? 32 : 48,
                        color: 'text.disabled',
                    },
                }}
            >
                {displayIcon}
            </Box>

            {/* Title */}
            <Typography
                variant={compact ? 'subtitle1' : 'h6'}
                fontWeight={600}
                color="text.primary"
                gutterBottom
            >
                {displayTitle}
            </Typography>

            {/* Description */}
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ maxWidth: 360, mb: action ? 3 : 0 }}
            >
                {displayDescription}
            </Typography>

            {/* Action button */}
            {action && (
                <Button
                    variant="contained"
                    onClick={action.onClick}
                    startIcon={action.startIcon || <AddIcon />}
                    sx={{ mt: 1 }}
                >
                    {action.label}
                </Button>
            )}
        </Box>
    );
}

interface TableEmptyStateProps extends EmptyStateProps {
    colSpan?: number;
}

export function TableEmptyState({ colSpan = 5, ...props }: TableEmptyStateProps) {
    return (
        <tr>
            <td colSpan={colSpan}>
                <EmptyState {...props} />
            </td>
        </tr>
    );
}

export function CardEmptyState(props: EmptyStateProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <Paper
            sx={{
                border: `1px dashed ${isDarkMode ? '#404040' : '#D4D4D4'}`,
                bgcolor: 'transparent',
            }}
        >
            <EmptyState {...props} />
        </Paper>
    );
}
