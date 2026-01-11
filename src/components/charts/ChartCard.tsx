import { Box, Card, CardContent, CardHeader, Typography, IconButton, useTheme } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { type ReactNode } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';


interface BaseChartConfig {
    height?: number;
}

interface LineChartConfig extends BaseChartConfig {
    type: 'line' | 'area';
    series: Array<{
        name: string;
        data: number[];
        area?: boolean;
    }>;
    xAxis: {
        categories: string[];
    };
}

interface BarChartConfig extends BaseChartConfig {
    type: 'bar';
    series: Array<{
        name: string;
        data: number[];
    }>;
    xAxis: {
        categories: string[];
    };
    layout?: 'horizontal' | 'vertical';
}

interface PieChartConfig extends BaseChartConfig {
    type: 'pie' | 'donut';
    series: number[];
    labels: string[];
    innerRadius?: number;
}

type ChartConfig = LineChartConfig | BarChartConfig | PieChartConfig;

interface ChartCardProps {
    title: string;
    subtitle?: string;
    chart: ChartConfig;
    action?: ReactNode;
}

export function ChartCard({ title, subtitle, chart, action }: ChartCardProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    // Theme-aware color palette
    // In dark mode, use lighter colors for better visibility
    const CHART_COLORS = isDarkMode
        ? ['#E5E5E5', '#A3A3A3', '#737373', '#525252', '#404040']
        : ['#171717', '#525252', '#737373', '#A3A3A3', '#D4D4D4'];

    const renderChart = () => {
        const height = chart.height || 300;

        if (chart.type === 'line' || chart.type === 'area') {
            const config = chart as LineChartConfig;
            return (
                <LineChart
                    height={height}
                    series={config.series.map((s, index) => ({
                        data: s.data,
                        label: s.name,
                        color: CHART_COLORS[index % CHART_COLORS.length],
                        area: chart.type === 'area',
                        curve: 'natural',
                    }))}
                    xAxis={[{
                        scaleType: 'point',
                        data: config.xAxis.categories,
                    }]}
                    sx={{
                        '& .MuiChartsAxis-line': {
                            stroke: '#E5E5E5',
                        },
                        '& .MuiChartsAxis-tick': {
                            stroke: '#E5E5E5',
                        },
                        '& .MuiChartsAxis-tickLabel': {
                            fill: '#737373',
                            fontSize: '12px',
                        },
                        '& .MuiChartsLegend-label': {
                            fill: '#525252',
                            fontSize: '12px',
                        },
                    }}
                    grid={{ horizontal: true }}
                    margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
                />
            );
        }

        if (chart.type === 'bar') {
            const config = chart as BarChartConfig;
            const isHorizontal = config.layout === 'horizontal';

            return (
                <BarChart
                    height={height}
                    series={config.series.map((s, index) => ({
                        data: s.data,
                        label: s.name,
                        color: CHART_COLORS[index % CHART_COLORS.length],
                    }))}
                    xAxis={isHorizontal ? undefined : [{
                        scaleType: 'band',
                        data: config.xAxis.categories,
                    }]}
                    yAxis={isHorizontal ? [{
                        scaleType: 'band',
                        data: config.xAxis.categories,
                    }] : undefined}
                    layout={isHorizontal ? 'horizontal' : 'vertical'}
                    sx={{
                        '& .MuiChartsAxis-line': {
                            stroke: '#E5E5E5',
                        },
                        '& .MuiChartsAxis-tick': {
                            stroke: '#E5E5E5',
                        },
                        '& .MuiChartsAxis-tickLabel': {
                            fill: '#737373',
                            fontSize: '12px',
                        },
                        '& .MuiChartsLegend-label': {
                            fill: '#525252',
                            fontSize: '12px',
                        },
                    }}
                    grid={{ horizontal: !isHorizontal, vertical: isHorizontal }}
                    margin={{ top: 20, right: 20, bottom: 40, left: isHorizontal ? 120 : 60 }}
                />
            );
        }

        if (chart.type === 'pie' || chart.type === 'donut') {
            const config = chart as PieChartConfig;
            const pieData = config.series.map((value, index) => ({
                id: index,
                value,
                label: config.labels[index],
                color: CHART_COLORS[index % CHART_COLORS.length],
            }));

            return (
                <PieChart
                    height={height}
                    series={[{
                        data: pieData,
                        innerRadius: chart.type === 'donut' ? (config.innerRadius || 60) : 0,
                        outerRadius: 100,
                        paddingAngle: 2,
                        cornerRadius: 4,
                        highlightScope: { fade: 'global', highlight: 'item' },
                    }]}
                    sx={{
                        '& .MuiChartsLegend-label': {
                            fill: '#525252',
                            fontSize: '12px',
                        },
                    }}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                />
            );
        }

        return null;
    };

    return (
        <Card sx={{ height: '100%' }}>
            <CardHeader
                title={
                    <Typography variant="h6" fontWeight={600}>
                        {title}
                    </Typography>
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
                <Box sx={{ width: '100%', height: chart.height || 300 }}>
                    {renderChart()}
                </Box>
            </CardContent>
        </Card>
    );
}
