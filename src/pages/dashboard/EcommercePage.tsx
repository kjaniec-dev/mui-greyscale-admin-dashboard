import { Box, Grid, Typography } from '@mui/material';
import {
    ShoppingCart as OrdersIcon,
    AttachMoney as RevenueIcon,
    Inventory as ProductsIcon,
    People as CustomersIcon,
} from '@mui/icons-material';
import { StatCard } from '../../components/cards';
import { ChartCard } from '../../components/charts';

export function EcommercePage() {
    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                    E-commerce
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Monitor your store performance and sales metrics.
                </Typography>
            </Box>

            {/* Stats Grid */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Total Revenue"
                        value="$128,540"
                        trend={22.4}
                        icon={<RevenueIcon />}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Total Orders"
                        value="2,845"
                        trend={15.2}
                        icon={<OrdersIcon />}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Products Sold"
                        value="8,234"
                        trend={8.7}
                        icon={<ProductsIcon />}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="New Customers"
                        value="1,456"
                        trend={12.1}
                        icon={<CustomersIcon />}
                    />
                </Grid>
            </Grid>

            {/* Charts */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <ChartCard
                        title="Revenue & Orders"
                        subtitle="Monthly comparison"
                        chart={{
                            type: 'line',
                            height: 350,
                            series: [
                                {
                                    name: 'Revenue ($K)',
                                    data: [28, 32, 25, 38, 42, 55, 48, 62, 58, 75, 68, 85],
                                },
                                {
                                    name: 'Orders',
                                    data: [180, 210, 165, 245, 275, 360, 310, 405, 380, 490, 445, 555],
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
                        title="Sales by Category"
                        chart={{
                            type: 'donut',
                            height: 350,
                            series: [35, 25, 20, 15, 5],
                            labels: ['Electronics', 'Clothing', 'Home', 'Sports', 'Other'],
                        }}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <ChartCard
                        title="Top Selling Products"
                        chart={{
                            type: 'bar',
                            height: 300,
                            series: [
                                {
                                    name: 'Units Sold',
                                    data: [1250, 980, 870, 640, 520],
                                },
                            ],
                            xAxis: {
                                categories: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
                            },
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <ChartCard
                        title="Order Status"
                        chart={{
                            type: 'donut',
                            height: 300,
                            series: [85, 72, 95],
                            labels: ['Delivered', 'Pending', 'Completed'],
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
