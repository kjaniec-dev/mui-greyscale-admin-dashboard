import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { getChartColors } from '../../theme';
import type { BarChartConfig, ChartConfig, LineChartConfig, PieChartConfig } from './ChartCard';

interface ChartRendererProps {
    chart: ChartConfig;
    isDarkMode: boolean;
}

export function ChartRenderer({ chart, isDarkMode }: ChartRendererProps) {
    const chartColors = getChartColors(isDarkMode);
    const axisStyles = {
        '& .MuiChartsAxis-line': {
            stroke: isDarkMode ? '#404040' : '#E5E5E5',
        },
        '& .MuiChartsAxis-tick': {
            stroke: isDarkMode ? '#404040' : '#E5E5E5',
        },
        '& .MuiChartsAxis-tickLabel': {
            fill: isDarkMode ? '#A3A3A3' : '#737373',
            fontSize: '12px',
        },
        '& .MuiChartsLegend-label': {
            fill: isDarkMode ? '#A3A3A3' : '#525252',
            fontSize: '12px',
        },
    };
    const height = chart.height || 300;

    if (chart.type === 'line' || chart.type === 'area') {
        const config = chart as LineChartConfig;
        return (
            <LineChart
                height={height}
                series={config.series.map((series, index) => ({
                    data: series.data,
                    label: series.name,
                    color: chartColors[index % chartColors.length],
                    area: config.type === 'area',
                    curve: 'natural',
                }))}
                xAxis={[{
                    scaleType: 'point',
                    data: config.xAxis.categories,
                }]}
                sx={axisStyles}
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
                series={config.series.map((series, index) => ({
                    data: series.data,
                    label: series.name,
                    color: chartColors[index % chartColors.length],
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
                sx={axisStyles}
                grid={{ horizontal: !isHorizontal, vertical: isHorizontal }}
                margin={{ top: 20, right: 20, bottom: 40, left: isHorizontal ? 120 : 60 }}
            />
        );
    }

    const config = chart as PieChartConfig;
    const pieData = config.series.map((value, index) => ({
        id: index,
        value,
        label: config.labels[index],
        color: chartColors[index % chartColors.length],
    }));

    return (
        <PieChart
            height={height}
            series={[{
                data: pieData,
                innerRadius: config.type === 'donut' ? (config.innerRadius || 60) : 0,
                outerRadius: 100,
                paddingAngle: 2,
                cornerRadius: 4,
                highlightScope: { fade: 'global', highlight: 'item' },
            }]}
            sx={{
                '& .MuiChartsLegend-label': axisStyles['& .MuiChartsLegend-label'],
            }}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        />
    );
}
