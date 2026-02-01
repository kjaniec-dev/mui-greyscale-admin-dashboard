import { Box, Skeleton, Paper, useTheme } from '@mui/material';

interface TableSkeletonProps {
    rows?: number;
    columns?: number;
    hasCheckbox?: boolean;
}

export function TableSkeleton({ rows = 5, columns = 5, hasCheckbox = true }: TableSkeletonProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <Paper
            sx={{
                overflow: 'hidden',
                border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    bgcolor: isDarkMode ? '#1a1a1a' : '#FAFAFA',
                }}
            >
                {hasCheckbox && <Skeleton variant="rectangular" width={20} height={20} sx={{ borderRadius: 0.5 }} />}
                {Array.from({ length: columns }).map((_, i) => (
                    <Skeleton
                        key={i}
                        variant="text"
                        width={i === 0 ? '25%' : `${60 / (columns - 1)}%`}
                        height={24}
                    />
                ))}
            </Box>

            {/* Rows */}
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <Box
                    key={rowIndex}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        borderBottom: rowIndex < rows - 1 ? `1px solid ${theme.palette.divider}` : 'none',
                    }}
                >
                    {hasCheckbox && <Skeleton variant="rectangular" width={20} height={20} sx={{ borderRadius: 0.5 }} />}
                    {Array.from({ length: columns }).map((_, colIndex) => (
                        <Skeleton
                            key={colIndex}
                            variant="text"
                            width={colIndex === 0 ? '25%' : `${60 / (columns - 1)}%`}
                            height={20}
                        />
                    ))}
                </Box>
            ))}
        </Paper>
    );
}

interface CardSkeletonProps {
    hasImage?: boolean;
    imageHeight?: number;
}

export function CardSkeleton({ hasImage = true, imageHeight = 140 }: CardSkeletonProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <Paper
            sx={{
                overflow: 'hidden',
                border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
            }}
        >
            {hasImage && (
                <Skeleton variant="rectangular" width="100%" height={imageHeight} animation="wave" />
            )}
            <Box sx={{ p: 2 }}>
                <Skeleton variant="text" width="80%" height={28} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="100%" height={16} />
                <Skeleton variant="text" width="60%" height={16} />
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
                    <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
                </Box>
            </Box>
        </Paper>
    );
}

interface CardGridSkeletonProps {
    count?: number;
    columns?: number;
    hasImage?: boolean;
}

export function CardGridSkeleton({ count = 6, columns = 3, hasImage = true }: CardGridSkeletonProps) {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: `repeat(${columns}, 1fr)`,
                },
                gap: 3,
            }}
        >
            {Array.from({ length: count }).map((_, i) => (
                <CardSkeleton key={i} hasImage={hasImage} />
            ))}
        </Box>
    );
}

export function StatCardSkeleton() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <Paper
            sx={{
                p: 3,
                border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" width={80} height={20} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width={120} height={40} />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                        <Skeleton variant="text" width={40} height={16} />
                        <Skeleton variant="text" width={60} height={16} />
                    </Box>
                </Box>
                <Skeleton variant="circular" width={48} height={48} />
            </Box>
        </Paper>
    );
}

interface StatGridSkeletonProps {
    count?: number;
}

export function StatGridSkeleton({ count = 4 }: StatGridSkeletonProps) {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: `repeat(${count}, 1fr)`,
                },
                gap: 3,
            }}
        >
            {Array.from({ length: count }).map((_, i) => (
                <StatCardSkeleton key={i} />
            ))}
        </Box>
    );
}

export function ChartSkeleton({ height = 300 }: { height?: number }) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <Paper
            sx={{
                p: 3,
                border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Skeleton variant="text" width={150} height={28} />
                <Skeleton variant="rectangular" width={100} height={32} sx={{ borderRadius: 1 }} />
            </Box>
            <Skeleton variant="rectangular" width="100%" height={height} sx={{ borderRadius: 1 }} animation="wave" />
        </Paper>
    );
}

export function ListSkeleton({ rows = 5 }: { rows?: number }) {
    return (
        <Box>
            {Array.from({ length: rows }).map((_, i) => (
                <Box
                    key={i}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        py: 1.5,
                    }}
                >
                    <Skeleton variant="circular" width={40} height={40} />
                    <Box sx={{ flex: 1 }}>
                        <Skeleton variant="text" width="60%" height={20} />
                        <Skeleton variant="text" width="40%" height={16} />
                    </Box>
                    <Skeleton variant="text" width={60} height={16} />
                </Box>
            ))}
        </Box>
    );
}

export function FormSkeleton({ fields = 4 }: { fields?: number }) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <Paper
            sx={{
                p: 3,
                border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
            }}
        >
            <Skeleton variant="text" width={200} height={32} sx={{ mb: 3 }} />
            {Array.from({ length: fields }).map((_, i) => (
                <Box key={i} sx={{ mb: 3 }}>
                    <Skeleton variant="text" width={100} height={20} sx={{ mb: 1 }} />
                    <Skeleton variant="rectangular" width="100%" height={40} sx={{ borderRadius: 1 }} />
                </Box>
            ))}
            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                <Skeleton variant="rectangular" width={100} height={40} sx={{ borderRadius: 1 }} />
                <Skeleton variant="rectangular" width={80} height={40} sx={{ borderRadius: 1 }} />
            </Box>
        </Paper>
    );
}
