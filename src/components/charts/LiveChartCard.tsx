import { Box, Card, CardContent, CardHeader, Typography, IconButton, alpha, Chip, useTheme } from '@mui/material';
import { MoreVert, FiberManualRecord } from '@mui/icons-material';
import { type ReactNode } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

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
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    // Theme-aware color
    const lineColor = isDarkMode ? '#E5E5E5' : '#171717';

    // Format timestamps for x-axis
    const formattedData = data.map((point) => ({
        ...point,
        label: point.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    }));

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
                    <LineChart
                        height={height}
                        series={[
                            {
                                data: formattedData.map((d) => d.value),
                                color: lineColor,
                                area: true,
                                curve: 'natural',
                                showMark: false,
                            },
                        ]}
                        xAxis={[
                            {
                                scaleType: 'point',
                                data: formattedData.map((d) => d.label),
                                tickLabelStyle: {
                                    fontSize: 10,
                                },
                            },
                        ]}
                        sx={{
                            '& .MuiChartsAxis-line': {
                                stroke: isDarkMode ? '#404040' : '#E5E5E5',
                            },
                            '& .MuiChartsAxis-tick': {
                                stroke: isDarkMode ? '#404040' : '#E5E5E5',
                            },
                            '& .MuiChartsAxis-tickLabel': {
                                fill: '#737373',
                                fontSize: '10px',
                            },
                            '& .MuiAreaElement-root': {
                                fillOpacity: 0.1,
                            },
                        }}
                        grid={{ horizontal: true }}
                        margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
                        skipAnimation={false}
                    />
                </Box>
            </CardContent>
        </Card>
    );
}
