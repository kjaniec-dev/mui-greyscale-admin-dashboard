import { Box, Card, CardContent, CardHeader, Typography, IconButton, alpha, Chip } from '@mui/material';
import { MoreVert, FiberManualRecord } from '@mui/icons-material';
import { lazy, Suspense, type ReactNode } from 'react';
import { ChartBodySkeleton } from '../common';

const LazyLiveChartRenderer = lazy(() =>
    import('./LiveChartRenderer').then((module) => ({ default: module.LiveChartRenderer }))
);

interface LiveChartCardProps {
    title: string;
    subtitle?: string;
    data: Array<{ timestamp: Date; value: number }>;
    height?: number;
    action?: ReactNode;
    showLiveIndicator?: boolean;
}

export function LiveChartCard({
    title,
    subtitle,
    data,
    height = 300,
    action,
    showLiveIndicator = true,
}: LiveChartCardProps) {
    return (
        <Card sx={{ height: '100%' }}>
            <CardHeader
                title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Typography variant="h6" fontWeight={600}>
                            {title}
                        </Typography>
                        {showLiveIndicator && (
                            <Chip
                                icon={
                                    <FiberManualRecord
                                        sx={{
                                            fontSize: 8,
                                            color: 'success.main',
                                            animation: 'pulse 2s ease-in-out infinite',
                                            '@keyframes pulse': {
                                                '0%, 100%': { opacity: 1 },
                                                '50%': { opacity: 0.4 },
                                            },
                                        }}
                                    />
                                }
                                label="Live"
                                size="small"
                                sx={{
                                    height: 22,
                                    fontSize: '0.65rem',
                                    bgcolor: (theme) => alpha(theme.palette.success.main, 0.1),
                                    color: 'success.main',
                                    fontWeight: 600,
                                    '& .MuiChip-icon': {
                                        ml: 0.5,
                                    },
                                }}
                            />
                        )}
                    </Box>
                }
                subheader={
                    subtitle && (
                        <Typography variant="body2" color="text.secondary">
                            {subtitle}
                        </Typography>
                    )
                }
                action={
                    action || (
                        <IconButton size="small">
                            <MoreVert />
                        </IconButton>
                    )
                }
                sx={{ pb: 0 }}
            />
            <CardContent>
                <Box sx={{ width: '100%', height }}>
                    <Suspense fallback={<ChartBodySkeleton height={height} />}>
                        <LazyLiveChartRenderer data={data} height={height} />
                    </Suspense>
                </Box>
            </CardContent>
        </Card>
    );
}
