import { LineChart } from '@mui/x-charts/LineChart';
import { useTheme } from '@mui/material';
import { getChartColors } from '../../theme';

interface LiveChartRendererProps {
    data: Array<{ timestamp: Date; value: number }>;
    height: number;
}

export function LiveChartRenderer({ data, height }: LiveChartRendererProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const lineColor = getChartColors(isDarkMode)[0];
    const formattedData = data.map((point) => ({
        ...point,
        label: point.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }),
    }));

    return (
        <LineChart
            height={height}
            series={[
                {
                    data: formattedData.map((entry) => entry.value),
                    color: lineColor,
                    area: true,
                    curve: 'natural',
                    showMark: false,
                },
            ]}
            xAxis={[
                {
                    scaleType: 'point',
                    data: formattedData.map((entry) => entry.label),
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
                    fill: isDarkMode ? '#A3A3A3' : '#737373',
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
    );
}
