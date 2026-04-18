import { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    useTheme,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    alpha,
} from '@mui/material';
import {
    Mouse as ClickIcon,
    CalendarMonth as ActivityIcon,
} from '@mui/icons-material';

function getDeterministicValue(day: number, hour: number, offset: number, range: number, base: number) {
    return ((day * 37 + hour * 17 + offset) % range) + base;
}

// --- Activity Heatmap Component ---
const ActivityHeatmap = () => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const hours = Array.from({ length: 24 }, (_, i) => i);

    // Mock data: value 0-100 indicating activity intensity
    const getIntensity = (day: number, hour: number) => {
        // Higher activity on weekdays during working hours
        if (day > 0 && day < 6) {
            if (hour >= 9 && hour <= 17) return getDeterministicValue(day, hour, 13, 60, 40);
            if (hour >= 18 && hour <= 22) return getDeterministicValue(day, hour, 7, 40, 10);
        } else {
            // Weekend
            if (hour >= 10 && hour <= 20) return getDeterministicValue(day, hour, 3, 30, 10);
        }
        return getDeterministicValue(day, hour, 1, 15, 0); // Low baseline
    };

    const heatmapData = days.map((dayLabel, dIdx) => ({
        day: dayLabel,
        hours: hours.map(h => ({
            hour: h,
            value: getIntensity(dIdx, h)
        }))
    }));

    const getColor = (value: number) => {
        // Base colors adapt to theme
        if (value === 0) return isDarkMode ? '#262626' : '#F5F5F5';
        
        // A nice primary color gradient (greyscale/blueish to fit the dashboard)
        if (value < 20) return isDarkMode ? '#3f3f46' : '#e4e4e7';
        if (value < 40) return isDarkMode ? '#52525b' : '#d4d4d8';
        if (value < 60) return isDarkMode ? '#71717a' : '#a1a1aa';
        if (value < 80) return isDarkMode ? '#a1a1aa' : '#71717a';
        return isDarkMode ? '#e4e4e7' : '#3f3f46';
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
                {/* Y-axis labels (Days) */}
                <Box sx={{ display: 'flex', flexDirection: 'column', pr: 2, pt: '24px', gap: '2px', justifyContent: 'space-between' }}>
                    {days.map(day => (
                        <Typography key={day} variant="caption" color="text.secondary" sx={{ height: 20, display: 'flex', alignItems: 'center' }}>
                            {day}
                        </Typography>
                    ))}
                </Box>
                
                {/* Heatmap Grid */}
                <Box sx={{ flex: 1, overflowX: 'auto' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 800 }}>
                        {/* X-axis labels (Hours) */}
                        <Box sx={{ display: 'flex', gap: '2px', mb: 1, height: 20 }}>
                            {hours.map(hour => (
                                <Typography key={hour} variant="caption" color="text.secondary" sx={{ flex: 1, textAlign: 'center' }}>
                                    {hour % 12 === 0 ? 12 : hour % 12}{hour >= 12 ? 'p' : 'a'}
                                </Typography>
                            ))}
                        </Box>

                        {/* Cells */}
                        {heatmapData.map((row) => (
                            <Box key={row.day} sx={{ display: 'flex', gap: '2px', height: 20 }}>
                                {row.hours.map((cell) => (
                                    <Tooltip 
                                        key={cell.hour} 
                                        title={`${row.day} ${cell.hour}:00 - Activity: ${cell.value}%`}
                                        arrow
                                        placement="top"
                                    >
                                        <Box
                                            sx={{
                                                flex: 1,
                                                bgcolor: getColor(cell.value),
                                                borderRadius: '2px',
                                                cursor: 'pointer',
                                                transition: 'transform 0.1s, filter 0.1s',
                                                '&:hover': {
                                                    filter: 'brightness(1.2)',
                                                    transform: 'scale(1.1)',
                                                    zIndex: 1,
                                                }
                                            }}
                                        />
                                    </Tooltip>
                                ))}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
            
            {/* Legend */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1, mt: 3 }}>
                <Typography variant="caption" color="text.secondary">Less</Typography>
                {[0, 15, 35, 55, 75, 95].map(val => (
                    <Box 
                        key={val} 
                        sx={{ 
                            width: 16, height: 16, 
                            bgcolor: getColor(val), 
                            borderRadius: '2px' 
                        }} 
                    />
                ))}
                <Typography variant="caption" color="text.secondary">More</Typography>
            </Box>
        </Box>
    );
};

// --- Click Heatmap Component ---
const ClickHeatmapOverlay = () => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    // Mock click regions overlaying a pseudo-wireframe
    const hotspots = [
        { top: '10%', left: '50%', width: 120, height: 40, intensity: 90, label: 'Main CTA' },
        { top: '5%', left: '10%', width: 150, height: 30, intensity: 45, label: 'Logo / Home' },
        { top: '5%', left: '80%', width: 100, height: 30, intensity: 65, label: 'Login Rec' },
        { top: '30%', left: '25%', width: 250, height: 200, intensity: 30, label: 'Feature 1' },
        { top: '30%', left: '60%', width: 250, height: 200, intensity: 20, label: 'Feature 2' },
        { top: '70%', left: '40%', width: 200, height: 50, intensity: 15, label: 'Secondary CTA' },
        { top: '90%', left: '50%', width: 300, height: 40, intensity: 5, label: 'Footer Links' },
    ];

    const getHotspotColor = (intensity: number) => {
        // Red = hot, Blue = cold. CSS radial gradient representation
        // Using semi-transparent colors for overlay effect
        if (intensity > 80) return alpha('#ef4444', 0.6); // Red
        if (intensity > 60) return alpha('#f97316', 0.5); // Orange
        if (intensity > 40) return alpha('#eab308', 0.5); // Yellow
        if (intensity > 20) return alpha('#22c55e', 0.4); // Green
        return alpha('#3b82f6', 0.3); // Blue
    };

    return (
        <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
            <Box 
                sx={{ 
                    position: 'relative', 
                    width: '100%', 
                    maxWidth: 900, 
                    height: 600,
                    bgcolor: isDarkMode ? '#262626' : '#e5e5e5',
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    overflow: 'hidden',
                }}
            >
                {/* Pseudo User Interface wireframe details */}
                <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}`, display: 'flex', justifyContent: 'space-between', bgcolor: isDarkMode ? '#171717' : '#f5f5f5' }}>
                    <Box sx={{ width: 120, height: 24, bgcolor: theme.palette.divider, borderRadius: 1 }} />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {[1, 2, 3].map(i => <Box key={i} sx={{ width: 60, height: 24, bgcolor: theme.palette.divider, borderRadius: 1 }} />)}
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 10, gap: 4 }}>
                    <Box sx={{ width: '40%', height: 40, bgcolor: theme.palette.divider, borderRadius: 1 }} />
                    <Box sx={{ width: '60%', height: 20, bgcolor: theme.palette.divider, borderRadius: 1 }} />
                    <Box sx={{ width: 140, height: 48, bgcolor: isDarkMode ? '#525252' : '#a3a3a3', borderRadius: 4 }} />
                </Box>

                {/* Heatmap Overlay */}
                <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                    {hotspots.map((spot, i) => (
                        <Tooltip key={i} title={`${spot.label}: ${spot.intensity}% Clicks`} arrow>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: spot.top,
                                    left: spot.left,
                                    width: spot.width,
                                    height: spot.height,
                                    transform: 'translate(-50%, -50%)',
                                    borderRadius: '50%',
                                    bgcolor: getHotspotColor(spot.intensity),
                                    filter: 'blur(15px)',
                                    pointerEvents: 'auto', // enable tooltip on hover
                                    cursor: 'help',
                                }}
                            />
                        </Tooltip>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};


export function HeatmapsPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const [viewMode, setViewMode] = useState<'activity' | 'clicks'>('activity');

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Behavior Heatmaps
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Visualize user engagement patterns and activity hotspots.
                    </Typography>
                </Box>
                
                <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={(_, val) => val && setViewMode(val)}
                    size="small"
                >
                    <ToggleButton value="activity" sx={{ px: 2 }}>
                        <ActivityIcon fontSize="small" sx={{ mr: 1 }} />
                        Activity Chart
                    </ToggleButton>
                    <ToggleButton value="clicks" sx={{ px: 2 }}>
                        <ClickIcon fontSize="small" sx={{ mr: 1 }} />
                        Click Tracking
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {/* Main Content Area */}
            <Paper
                sx={{
                    bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                    border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                    borderRadius: 2,
                    overflow: 'hidden',
                }}
            >
                {/* View Header */}
                <Box sx={{ p: 3, borderBottom: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}` }}>
                    <Typography variant="h6" fontWeight={600}>
                        {viewMode === 'activity' ? 'Hourly Activity by Day' : 'Page Click Distribution'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {viewMode === 'activity' 
                            ? 'Shows when your users are most active on the platform. Darker blocks mean higher activity.' 
                            : 'Overlay of user click behavior on the homepage over the last 7 days.'}
                    </Typography>
                </Box>

                {/* View Content */}
                {viewMode === 'activity' ? <ActivityHeatmap /> : <ClickHeatmapOverlay />}
            </Paper>
        </Box>
    );
}
