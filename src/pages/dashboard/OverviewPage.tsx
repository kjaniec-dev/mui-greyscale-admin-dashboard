import { Box, Grid, Typography } from '@mui/material';
import {
    People as UsersIcon,
    TrendingUp as RevenueIcon,
    ShoppingCart as OrdersIcon,
    Visibility as VisitsIcon,
} from '@mui/icons-material';
import { StatCard } from '../../components/cards';
import { ChartCard } from '../../components/charts';
import { ActivityList } from '../../components/common';

const mockActivities = [
    {
        id: '1',
        user: { name: 'John Doe', initials: 'JD' },
        action: 'created a new',
        target: 'Invoice #1234',
        time: '2 minutes ago',
        type: 'success' as const,
    },
    {
        id: '2',
        user: { name: 'Jane Smith', initials: 'JS' },
        action: 'updated',
        target: 'Product listing',
        time: '15 minutes ago',
        type: 'info' as const,
    },
    {
        id: '3',
        user: { name: 'Mike Johnson', initials: 'MJ' },
        action: 'completed order',
        target: '#5678',
        time: '1 hour ago',
        type: 'success' as const,
    },
    {
        id: '4',
        user: { name: 'Sarah Wilson', initials: 'SW' },
        action: 'added new',
        target: 'team member',
        time: '3 hours ago',
    },
    {
        id: '5',
        user: { name: 'Tom Brown', initials: 'TB' },
        action: 'deployed',
        target: 'version 2.1.0',
        time: '5 hours ago',
        type: 'success' as const,
    },
];

export function OverviewPage() {
    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4 }}>
                <Typography component="h1" variant="h4" fontWeight={700} gutterBottom>
                    Dashboard
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Welcome back! Here's what's happening with your business.
                </Typography>
            </Box>

            {/* Stats Grid */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Total Users"
                        value="12,345"
                        trend={12.5}
                        icon={<UsersIcon />}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Revenue"
                        value="$48,560"
                        trend={8.2}
                        icon={<RevenueIcon />}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Orders"
                        value="1,234"
                        trend={-2.4}
                        icon={<OrdersIcon />}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Page Views"
                        value="89.2K"
                        trend={15.7}
                        icon={<VisitsIcon />}
                    />
                </Grid>
            </Grid>

            {/* Charts Row */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <ChartCard
                        title="Revenue Overview"
                        subtitle="Monthly revenue for the current year"
                        chart={{
                            type: 'area',
                            height: 350,
                            series: [
                                {
                                    name: 'Revenue',
                                    data: [3100, 4000, 2800, 5100, 4200, 7900, 6100, 9800, 8700, 10500, 9100, 11200],
                                },
                                {
                                    name: 'Expenses',
                                    data: [2100, 2900, 2100, 3500, 3000, 5200, 4300, 6500, 5800, 7200, 6100, 7800],
                                },
                            ],
                            xAxis: {
                                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                            },
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <ChartCard
                        title="Traffic Sources"
                        subtitle="Where visitors come from"
                        chart={{
                            type: 'donut',
                            height: 350,
                            series: [44, 55, 13, 33],
                            labels: ['Direct', 'Social', 'Referral', 'Organic'],
                        }}
                    />
                </Grid>
            </Grid>

            {/* Bottom Row */}
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <ChartCard
                        title="Weekly Sales"
                        subtitle="Sales performance by day"
                        chart={{
                            type: 'bar',
                            height: 300,
                            series: [
                                {
                                    name: 'Sales',
                                    data: [44, 55, 57, 56, 61, 58, 63],
                                },
                            ],
                            xAxis: {
                                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                            },
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <ActivityList activities={mockActivities} />
                </Grid>
            </Grid>
        </Box>
    );
}
