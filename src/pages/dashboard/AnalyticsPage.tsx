import { Box, Grid, Typography } from '@mui/material';
import {
    TrendingUp as ConversionIcon,
    Visibility as VisitsIcon,
    Timer as SessionIcon,
} from '@mui/icons-material';
import { StatCard } from '../../components/cards';
import { ChartCard } from '../../components/charts';

export function AnalyticsPage() {
    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                    Analytics
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Track your website performance and user engagement.
                </Typography>
            </Box>

            {/* Stats Grid */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Total Visits"
                        value="245.8K"
                        trend={18.2}
                        icon={<VisitsIcon />}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Conversion Rate"
                        value="3.45%"
                        trend={5.7}
                        icon={<ConversionIcon />}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Avg. Session"
                        value="4m 32s"
                        trend={-1.2}
                        icon={<SessionIcon />}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Bounce Rate"
                        value="42.3%"
                        trend={-8.5}
                        icon={<VisitsIcon />}
                    />
                </Grid>
            </Grid>

            {/* Charts */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <ChartCard
                        title="Website Traffic"
                        subtitle="Visitors over the last 30 days"
                        chart={{
                            type: 'area',
                            height: 350,
                            series: [
                                {
                                    name: 'Visitors',
                                    data: [
                                        4500, 5200, 4800, 5800, 6200, 5500, 4900, 6800, 7200, 6500,
                                        7800, 8200, 7500, 8800, 9200, 8500, 7900, 8600, 9100, 8800,
                                        9500, 10200, 9800, 10500, 11200, 10800, 11500, 12200, 11800, 12500,
                                    ],
                                },
                            ],
                            xAxis: {
                                categories: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
                            },
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <ChartCard
                        title="Device Types"
                        subtitle="User device breakdown"
                        chart={{
                            type: 'donut',
                            height: 350,
                            series: [55, 35, 10],
                            labels: ['Desktop', 'Mobile', 'Tablet'],
                        }}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <ChartCard
                        title="Page Views by Section"
                        chart={{
                            type: 'bar',
                            height: 300,
                            series: [
                                {
                                    name: 'Page Views',
                                    data: [12400, 8900, 6700, 5400, 4200, 3100],
                                },
                            ],
                            xAxis: {
                                categories: ['Home', 'Products', 'Blog', 'About', 'Contact', 'Pricing'],
                            },
                            layout: 'horizontal',
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <ChartCard
                        title="Traffic by Country"
                        chart={{
                            type: 'bar',
                            height: 300,
                            series: [
                                {
                                    name: 'Visitors',
                                    data: [45000, 32000, 28000, 22000, 18000],
                                },
                            ],
                            xAxis: {
                                categories: ['United States', 'United Kingdom', 'Germany', 'France', 'Canada'],
                            },
                            layout: 'horizontal',
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
