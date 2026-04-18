import { Box, Grid, Typography, Card, CardContent, CardHeader, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider, useTheme } from '@mui/material';
import {
    People as VisitorsIcon,
    ShoppingCart as OrdersIcon,
    AttachMoney as RevenueIcon,
    TrendingUp as ConversionIcon,
    ShoppingBag,
    PersonAdd,
    Visibility,
    Sell,
    MoreVert,
} from '@mui/icons-material';
import { LiveStatCard } from '../../components/cards/LiveStatCard';
import { LiveChartCard } from '../../components/charts/LiveChartCard';
import { ConnectionStatus } from '../../components/common/ConnectionStatus';
import { useRealtimeData } from '../../hooks/useRealtimeData';
import type { RealtimeActivity } from '../../data/realtimeData';
import { getToneColor } from '../../theme';

// Icon map for activity types
const activityIcons: Record<string, React.ReactNode> = {
    order: <ShoppingBag sx={{ fontSize: 20 }} />,
    visitor: <Visibility sx={{ fontSize: 20 }} />,
    sale: <Sell sx={{ fontSize: 20 }} />,
    signup: <PersonAdd sx={{ fontSize: 20 }} />,
};

const activityToneByType = {
    order: 'info',
    sale: 'success',
    signup: 'warning',
    visitor: 'info',
} as const;

// Format metric value based on format type
function formatValue(value: number, format?: string, unit?: string): string {
    if (format === 'currency') {
        return `${unit || '$'}${value.toLocaleString()}`;
    }
    if (format === 'percent') {
        return `${value}${unit || '%'}`;
    }
    return value.toLocaleString();
}

// Calculate trend percentage
function calculateTrend(current: number, previous: number): number {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
}

// Format relative time
function formatRelativeTime(date: Date): string {
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffSeconds < 60) return 'Just now';
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
    return `${Math.floor(diffSeconds / 3600)}h ago`;
}

function ActivityItem({ activity }: { activity: RealtimeActivity }) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const tone = activityToneByType[activity.type as keyof typeof activityToneByType] ?? 'info';
    const { text, bg } = getToneColor(tone, isDarkMode);

    return (
        <ListItem
            sx={{
                py: 1.5,
                px: 0,
                borderRadius: 1,
            }}
        >
            <ListItemIcon sx={{ minWidth: 40 }}>
                <Box
                    sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: bg,
                        color: text,
                    }}
                >
                    {activityIcons[activity.type]}
                </Box>
            </ListItemIcon>
            <ListItemText
                primary={activity.message}
                secondary={formatRelativeTime(activity.timestamp)}
                primaryTypographyProps={{
                    variant: 'body2',
                    fontWeight: 500,
                    noWrap: true,
                }}
                secondaryTypographyProps={{
                    variant: 'caption',
                }}
            />
        </ListItem>
    );
}

export function RealTimePage() {
    const { data, status, connect } = useRealtimeData({
        updateInterval: 3000,
        chartMaxPoints: 20,
        activitiesMaxItems: 8,
    });

    const metricIcons = [
        <VisitorsIcon key="visitors" />,
        <OrdersIcon key="orders" />,
        <RevenueIcon key="revenue" />,
        <ConversionIcon key="conversion" />,
    ];

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Real-time Dashboard
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Live metrics updated every 3 seconds. Last update: {data.lastUpdated.toLocaleTimeString()}
                    </Typography>
                </Box>
                <ConnectionStatus status={status} onReconnect={connect} />
            </Box>

            {/* Live Stats Grid */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {data.metrics.map((metric, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={metric.id}>
                        <LiveStatCard
                            title={metric.label}
                            value={formatValue(metric.value, metric.format, metric.unit)}
                            previousValue={formatValue(metric.previousValue, metric.format, metric.unit)}
                            trend={calculateTrend(metric.value, metric.previousValue)}
                            icon={metricIcons[index]}
                            showLiveIndicator={status === 'connected'}
                        />
                    </Grid>
                ))}
            </Grid>

            {/* Charts and Activity Feed */}
            <Grid container spacing={3}>
                {/* Live Chart */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <LiveChartCard
                        title="Live Traffic"
                        subtitle="Active visitors in real-time"
                        data={data.chartData}
                        height={350}
                        showLiveIndicator={status === 'connected'}
                    />
                </Grid>

                {/* Activity Feed */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ height: '100%' }}>
                        <CardHeader
                            title={
                                <Typography variant="h6" fontWeight={600}>
                                    Live Activity
                                </Typography>
                            }
                            action={
                                <IconButton size="small">
                                    <MoreVert />
                                </IconButton>
                            }
                        />
                        <Divider />
                        <CardContent sx={{ p: 2, pt: 0, maxHeight: 380, overflow: 'auto' }}>
                            <List disablePadding>
                                {data.activities.map((activity, index) => (
                                    <Box key={activity.id}>
                                        <ActivityItem activity={activity} />
                                        {index < data.activities.length - 1 && (
                                            <Divider sx={{ my: 0.5 }} />
                                        )}
                                    </Box>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
