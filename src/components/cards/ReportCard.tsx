import { Box, Card, CardContent, Typography, IconButton, Menu, MenuItem, Chip, alpha, useTheme } from '@mui/material';
import {
    MoreVert as MoreIcon,
    Edit as EditIcon,
    ContentCopy as DuplicateIcon,
    Delete as DeleteIcon,
    PlayArrow as RunIcon,
    Download as ExportIcon,
    Star as StarIcon,
    StarBorder as StarBorderIcon,
    BarChart as BarChartIcon,
    ShowChart as LineChartIcon,
    PieChart as PieChartIcon,
    DonutLarge as DonutChartIcon,
    TableChart as TableIcon,
    TrendingUp as AreaChartIcon,
} from '@mui/icons-material';
import { useState, type MouseEvent, type ReactElement } from 'react';
import { type ChartType, type DataSourceType, dataSourceLabels } from '../../data/mockReports';

interface ReportCardProps {
    id: string;
    name: string;
    description?: string;
    dataSource: DataSourceType;
    chartType: ChartType;
    updatedAt: string;
    isFavorite: boolean;
    onEdit?: (id: string) => void;
    onDuplicate?: (id: string) => void;
    onDelete?: (id: string) => void;
    onRun?: (id: string) => void;
    onExport?: (id: string) => void;
    onToggleFavorite?: (id: string) => void;
}

const chartIcons: Record<ChartType, ReactElement> = {
    bar: <BarChartIcon />,
    line: <LineChartIcon />,
    area: <AreaChartIcon />,
    pie: <PieChartIcon />,
    donut: <DonutChartIcon />,
    table: <TableIcon />,
};

const chartLabels: Record<ChartType, string> = {
    bar: 'Bar Chart',
    line: 'Line Chart',
    area: 'Area Chart',
    pie: 'Pie Chart',
    donut: 'Donut Chart',
    table: 'Data Table',
};

export function ReportCard({
    id,
    name,
    description,
    dataSource,
    chartType,
    updatedAt,
    isFavorite,
    onEdit,
    onDuplicate,
    onDelete,
    onRun,
    onExport,
    onToggleFavorite,
}: ReportCardProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleAction = (action: ((id: string) => void) | undefined) => {
        handleMenuClose();
        if (action) action(id);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: isDarkMode
                        ? '0 8px 24px rgba(0,0,0,0.4)'
                        : '0 8px 24px rgba(0,0,0,0.12)',
                    borderColor: isDarkMode ? '#404040' : '#D4D4D4',
                },
            }}
            onClick={() => onEdit?.(id)}
        >
            {/* Chart type visual header */}
            <Box
                sx={{
                    height: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: isDarkMode ? alpha('#FFFFFF', 0.03) : alpha('#000000', 0.02),
                    borderBottom: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                    position: 'relative',
                }}
            >
                <Box
                    sx={{
                        fontSize: 48,
                        color: isDarkMode ? '#525252' : '#A3A3A3',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {chartIcons[chartType]}
                </Box>
                {/* Favorite button */}
                <IconButton
                    size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite?.(id);
                    }}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        color: isFavorite ? '#F59E0B' : isDarkMode ? '#525252' : '#A3A3A3',
                    }}
                >
                    {isFavorite ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
                {/* Actions menu */}
                <IconButton
                    size="small"
                    onClick={handleMenuOpen}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                    }}
                >
                    <MoreIcon />
                </IconButton>
            </Box>

            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom noWrap>
                    {name}
                </Typography>
                {description && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mb: 2,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {description}
                    </Typography>
                )}

                <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip
                            label={dataSourceLabels[dataSource]}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.75rem' }}
                        />
                        <Chip
                            label={chartLabels[chartType]}
                            size="small"
                            sx={{
                                fontSize: '0.75rem',
                                bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                            }}
                        />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                        Updated {formatDate(updatedAt)}
                    </Typography>
                </Box>
            </CardContent>

            {/* Actions Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                onClick={(e) => e.stopPropagation()}
            >
                <MenuItem onClick={() => handleAction(onRun)}>
                    <RunIcon fontSize="small" sx={{ mr: 1 }} />
                    Run Report
                </MenuItem>
                <MenuItem onClick={() => handleAction(onEdit)}>
                    <EditIcon fontSize="small" sx={{ mr: 1 }} />
                    Edit
                </MenuItem>
                <MenuItem onClick={() => handleAction(onDuplicate)}>
                    <DuplicateIcon fontSize="small" sx={{ mr: 1 }} />
                    Duplicate
                </MenuItem>
                <MenuItem onClick={() => handleAction(onExport)}>
                    <ExportIcon fontSize="small" sx={{ mr: 1 }} />
                    Export
                </MenuItem>
                <MenuItem onClick={() => handleAction(onDelete)} sx={{ color: 'error.main' }}>
                    <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                    Delete
                </MenuItem>
            </Menu>
        </Card>
    );
}
