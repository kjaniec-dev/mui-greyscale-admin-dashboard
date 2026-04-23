import { Box, Card, CardContent, Typography, alpha, Chip } from '@mui/material';
import { TrendingUp, TrendingDown, FiberManualRecord } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';

interface LiveStatCardProps {
    title: string;
    value: string | number;
    previousValue?: string | number;
    trend?: number;
    trendLabel?: string;
    icon?: ReactNode;
    color?: string;
    showLiveIndicator?: boolean;
}

export function LiveStatCard({
    title,
    value,
    previousValue,
    trend,
    trendLabel = 'vs last update',
    icon,
    color,
    showLiveIndicator = true,
}: LiveStatCardProps) {
    const isPositive = trend && trend > 0;
    const isNegative = trend && trend < 0;
    const valueChanged = previousValue !== undefined && previousValue !== value;

    return (
        <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
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
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        height: 24,
                        fontSize: '0.7rem',
                        bgcolor: (theme) => alpha(theme.palette.success.main, 0.1),
                        color: 'success.main',
                        fontWeight: 600,
                        '& .MuiChip-icon': {
                            ml: 0.5,
                        },
                    }}
                />
            )}
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        {title}
                    </Typography>
                    {icon && (
                        <Box
                            sx={{
                                width: 48,
                                height: 48,
                                borderRadius: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: (theme) => alpha(color || theme.palette.primary.main, 0.1),
                                color: color || 'primary.main',
                            }}
                        >
                            {icon}
                        </Box>
                    )}
                </Box>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={String(value)}
                        initial={valueChanged ? { scale: 1.05, opacity: 0.6 } : false}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Typography variant="h3" sx={{ fontWeight: 700,  mb: 1  }}>
                            {value}
                        </Typography>
                    </motion.div>
                </AnimatePresence>

                {trend !== undefined && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.25,
                                color: isPositive ? 'success.main' : isNegative ? 'error.main' : 'text.secondary',
                            }}
                        >
                            {isPositive && <TrendingUp sx={{ fontSize: 18 }} />}
                            {isNegative && <TrendingDown sx={{ fontSize: 18 }} />}
                            <Typography
                                variant="body2"
                                color={isPositive ? 'success.main' : isNegative ? 'error.main' : 'text.secondary'} sx={{ fontWeight: 600 }}
                            >
                                {isPositive ? '+' : ''}{Math.abs(trend) < 0.1 ? '0.0' : trend.toFixed(1)}%
                            </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                            {trendLabel}
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}
