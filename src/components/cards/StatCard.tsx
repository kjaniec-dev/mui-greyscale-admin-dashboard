import { Box, Card, CardContent, Typography, alpha } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import type { ReactNode } from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    trend?: number;
    trendLabel?: string;
    icon?: ReactNode;
    color?: string;
}

export function StatCard({
    title,
    value,
    trend,
    trendLabel = 'vs last month',
    icon,
    color,
}: StatCardProps) {
    const isPositive = trend && trend > 0;
    const isNegative = trend && trend < 0;

    return (
        <Card sx={{ height: '100%' }}>
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

                <Typography variant="h3" sx={{ fontWeight: 700,  mb: 1  }}>
                    {value}
                </Typography>

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
                                {isPositive ? '+' : ''}
                                {trend}%
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
