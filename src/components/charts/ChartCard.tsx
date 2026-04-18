import { Box, Card, CardContent, CardHeader, Typography, IconButton, useTheme } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { lazy, Suspense, type ReactNode } from 'react';
import { ChartBodySkeleton } from '../common';

const LazyChartRenderer = lazy(() =>
    import('./ChartRenderer').then((module) => ({ default: module.ChartRenderer }))
);

interface BaseChartConfig {
    height?: number;
}

export interface LineChartConfig extends BaseChartConfig {
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

export interface BarChartConfig extends BaseChartConfig {
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

export interface PieChartConfig extends BaseChartConfig {
    type: 'pie' | 'donut';
    series: number[];
    labels: string[];
    innerRadius?: number;
}

export type ChartConfig = LineChartConfig | BarChartConfig | PieChartConfig;

interface ChartCardProps {
    title: string;
    subtitle?: string;
    chart: ChartConfig;
    action?: ReactNode;
}

export function ChartCard({ title, subtitle, chart, action }: ChartCardProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

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
                    <Suspense fallback={<ChartBodySkeleton height={chart.height || 300} />}>
                        <LazyChartRenderer chart={chart} isDarkMode={isDarkMode} />
                    </Suspense>
                </Box>
            </CardContent>
        </Card>
    );
}
