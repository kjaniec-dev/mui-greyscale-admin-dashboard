import { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    TextField,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Divider,
    IconButton,
    useTheme,
    alpha,
    Chip,
    Tooltip,
} from '@mui/material';
import {
    ArrowBack as BackIcon,
    Save as SaveIcon,
    Download as ExportIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    BarChart as BarChartIcon,
    ShowChart as LineChartIcon,
    PieChart as PieChartIcon,
    DonutLarge as DonutChartIcon,
    TableChart as TableIcon,
    TrendingUp as AreaChartIcon,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { ChartCard } from '../../components/charts';
import {
    mockSavedReports,
    dataSourceFields,
    dataSourceLabels,
    filterOperators,
    generateMockChartData,
    type DataSourceType,
    type ChartType,
    type ReportConfig,
    type ReportFilter,
} from '../../data/mockReports';

const chartIcons: Record<ChartType, React.ReactElement> = {
    bar: <BarChartIcon />,
    line: <LineChartIcon />,
    area: <AreaChartIcon />,
    pie: <PieChartIcon />,
    donut: <DonutChartIcon />,
    table: <TableIcon />,
};

const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'last7', label: 'Last 7 days' },
    { value: 'last30', label: 'Last 30 days' },
    { value: 'last90', label: 'Last 90 days' },
    { value: 'thisMonth', label: 'This month' },
    { value: 'lastMonth', label: 'Last month' },
    { value: 'thisYear', label: 'This year' },
    { value: 'all', label: 'All time' },
];

export function ReportBuilderPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    // Load existing report if editing
    const existingReport = id ? mockSavedReports.find((r) => r.id === id) : null;

    const [reportName, setReportName] = useState(existingReport?.name || '');
    const [description, setDescription] = useState(existingReport?.description || '');
    const [config, setConfig] = useState<ReportConfig>(
        existingReport?.config || {
            dataSource: 'orders',
            columns: ['date', 'total', 'items', 'status'],
            filters: [],
            groupBy: 'date',
            dateRange: 'last30',
            chartType: 'bar',
            chartTitle: '',
        }
    );

    // Generate chart data based on config
    const chartData = useMemo(() => generateMockChartData(config), [config]);

    // Get available fields for current data source
    const availableFields = dataSourceFields[config.dataSource];

    const handleDataSourceChange = (newSource: DataSourceType) => {
        const newFields = dataSourceFields[newSource];
        setConfig({
            ...config,
            dataSource: newSource,
            columns: newFields.slice(0, 4).map((f) => f.key),
            filters: [],
            groupBy: newFields[0]?.key,
        });
    };

    const handleColumnToggle = (columnKey: string) => {
        setConfig((prev) => ({
            ...prev,
            columns: prev.columns.includes(columnKey)
                ? prev.columns.filter((c) => c !== columnKey)
                : [...prev.columns, columnKey],
        }));
    };

    const handleAddFilter = () => {
        const newFilter: ReportFilter = {
            id: `filter-${Date.now()}`,
            field: availableFields[0]?.key || '',
            operator: 'equals',
            value: '',
        };
        setConfig((prev) => ({
            ...prev,
            filters: [...prev.filters, newFilter],
        }));
    };

    const handleUpdateFilter = (filterId: string, updates: Partial<ReportFilter>) => {
        setConfig((prev) => ({
            ...prev,
            filters: prev.filters.map((f) =>
                f.id === filterId ? { ...f, ...updates } : f
            ),
        }));
    };

    const handleRemoveFilter = (filterId: string) => {
        setConfig((prev) => ({
            ...prev,
            filters: prev.filters.filter((f) => f.id !== filterId),
        }));
    };

    const handleSave = () => {
        // In a real app, this would save to backend
        console.log('Saving report:', { name: reportName, description, config });
        navigate('/reports');
    };

    const sectionPaperSx = {
        p: 3,
        bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
        border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
    };

    // Build chart config for preview
    const getChartConfig = () => {
        const { chartType } = config;

        if (chartType === 'table') {
            return null; // Table view handled separately
        }

        if (chartType === 'pie' || chartType === 'donut') {
            return {
                type: chartType as 'pie' | 'donut',
                height: 350,
                series: chartData.values,
                labels: chartData.labels,
            };
        }

        return {
            type: chartType as 'bar' | 'line' | 'area',
            height: 350,
            series: [{ name: 'Value', data: chartData.values }],
            xAxis: { categories: chartData.labels },
        };
    };

    return (
        <Box>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <IconButton onClick={() => navigate('/reports')}>
                    <BackIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {id ? 'Edit Report' : 'New Report'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Configure your data source, filters, and visualization.
                    </Typography>
                </Box>
                <Button
                    variant="outlined"
                    startIcon={<ExportIcon />}
                    sx={{ mr: 1 }}
                >
                    Export
                </Button>
                <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    disabled={!reportName.trim()}
                    sx={{
                        bgcolor: '#171717',
                        '&:hover': { bgcolor: '#262626' },
                    }}
                >
                    Save Report
                </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', lg: 'row' } }}>
                {/* Left Panel - Configuration */}
                <Box sx={{ flex: '0 0 400px', display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Report Info */}
                    <Paper sx={sectionPaperSx}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                            Report Details
                        </Typography>
                        <TextField
                            fullWidth
                            label="Report Name"
                            value={reportName}
                            onChange={(e) => setReportName(e.target.value)}
                            size="small"
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Description (optional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            size="small"
                            multiline
                            rows={2}
                        />
                    </Paper>

                    {/* Data Source */}
                    <Paper sx={sectionPaperSx}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                            Data Source
                        </Typography>
                        <FormControl fullWidth size="small" sx={{ mt: 1 }}>
                            <InputLabel>Select data source</InputLabel>
                            <Select
                                value={config.dataSource}
                                label="Select data source"
                                onChange={(e) =>
                                    handleDataSourceChange(e.target.value as DataSourceType)
                                }
                            >
                                {Object.entries(dataSourceLabels).map(([key, label]) => (
                                    <MenuItem key={key} value={key}>
                                        {label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Paper>

                    {/* Date Range */}
                    <Paper sx={sectionPaperSx}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                            Date Range
                        </Typography>
                        <FormControl fullWidth size="small" sx={{ mt: 1 }}>
                            <InputLabel>Time period</InputLabel>
                            <Select
                                value={config.dateRange}
                                label="Time period"
                                onChange={(e) =>
                                    setConfig({ ...config, dateRange: e.target.value })
                                }
                            >
                                {dateRangeOptions.map((opt) => (
                                    <MenuItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Paper>

                    {/* Columns */}
                    <Paper sx={sectionPaperSx}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                            Columns / Metrics
                        </Typography>
                        <FormGroup sx={{ mt: 1 }}>
                            {availableFields.map((field) => (
                                <FormControlLabel
                                    key={field.key}
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={config.columns.includes(field.key)}
                                            onChange={() => handleColumnToggle(field.key)}
                                        />
                                    }
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            {field.label}
                                            <Chip
                                                label={field.type}
                                                size="small"
                                                sx={{
                                                    fontSize: '0.65rem',
                                                    height: 18,
                                                    bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                                                }}
                                            />
                                        </Box>
                                    }
                                />
                            ))}
                        </FormGroup>
                    </Paper>

                    {/* Group By */}
                    <Paper sx={sectionPaperSx}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                            Group By
                        </Typography>
                        <FormControl fullWidth size="small" sx={{ mt: 1 }}>
                            <InputLabel>Group data by</InputLabel>
                            <Select
                                value={config.groupBy || ''}
                                label="Group data by"
                                onChange={(e) =>
                                    setConfig({ ...config, groupBy: e.target.value })
                                }
                            >
                                <MenuItem value="">None</MenuItem>
                                {availableFields.map((field) => (
                                    <MenuItem key={field.key} value={field.key}>
                                        {field.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Paper>

                    {/* Filters */}
                    <Paper sx={sectionPaperSx}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                Filters
                            </Typography>
                            <Button
                                size="small"
                                startIcon={<AddIcon />}
                                onClick={handleAddFilter}
                            >
                                Add Filter
                            </Button>
                        </Box>

                        {config.filters.length === 0 ? (
                            <Typography variant="body2" color="text.secondary">
                                No filters applied. Add filters to refine your data.
                            </Typography>
                        ) : (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {config.filters.map((filter) => (
                                    <Box
                                        key={filter.id}
                                        sx={{
                                            display: 'flex',
                                            gap: 1,
                                            alignItems: 'flex-start',
                                            p: 1.5,
                                            bgcolor: isDarkMode ? alpha('#FFFFFF', 0.02) : alpha('#000000', 0.02),
                                            borderRadius: 1,
                                        }}
                                    >
                                        <FormControl size="small" sx={{ minWidth: 120 }}>
                                            <Select
                                                value={filter.field}
                                                onChange={(e) =>
                                                    handleUpdateFilter(filter.id, { field: e.target.value })
                                                }
                                            >
                                                {availableFields.map((field) => (
                                                    <MenuItem key={field.key} value={field.key}>
                                                        {field.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl size="small" sx={{ minWidth: 100 }}>
                                            <Select
                                                value={filter.operator}
                                                onChange={(e) =>
                                                    handleUpdateFilter(filter.id, {
                                                        operator: e.target.value as ReportFilter['operator'],
                                                    })
                                                }
                                            >
                                                {filterOperators.map((op) => (
                                                    <MenuItem key={op.value} value={op.value}>
                                                        {op.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            size="small"
                                            placeholder="Value"
                                            value={filter.value}
                                            onChange={(e) =>
                                                handleUpdateFilter(filter.id, { value: e.target.value })
                                            }
                                            sx={{ flex: 1 }}
                                        />
                                        <Tooltip title="Remove filter">
                                            <IconButton
                                                size="small"
                                                onClick={() => handleRemoveFilter(filter.id)}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Paper>
                </Box>

                {/* Right Panel - Visualization */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Chart Type Selection */}
                    <Paper sx={sectionPaperSx}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                            Chart Type
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
                            {(Object.keys(chartIcons) as ChartType[]).map((type) => (
                                <Paper
                                    key={type}
                                    onClick={() => setConfig({ ...config, chartType: type })}
                                    sx={{
                                        p: 2,
                                        minWidth: 80,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 0.5,
                                        cursor: 'pointer',
                                        border: `2px solid ${config.chartType === type
                                                ? theme.palette.primary.main
                                                : isDarkMode
                                                    ? '#262626'
                                                    : '#E5E5E5'
                                            }`,
                                        bgcolor:
                                            config.chartType === type
                                                ? alpha(theme.palette.primary.main, 0.08)
                                                : 'transparent',
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            borderColor: theme.palette.primary.main,
                                        },
                                    }}
                                >
                                    <Box sx={{ fontSize: 28, color: isDarkMode ? '#A3A3A3' : '#525252' }}>
                                        {chartIcons[type]}
                                    </Box>
                                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </Typography>
                                </Paper>
                            ))}
                        </Box>
                    </Paper>

                    {/* Chart Title */}
                    <Paper sx={sectionPaperSx}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                            Chart Title
                        </Typography>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter chart title..."
                            value={config.chartTitle || ''}
                            onChange={(e) => setConfig({ ...config, chartTitle: e.target.value })}
                            sx={{ mt: 1 }}
                        />
                    </Paper>

                    {/* Chart Preview */}
                    <Paper sx={{ ...sectionPaperSx, flex: 1, minHeight: 400 }}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                            Preview
                        </Typography>
                        <Divider sx={{ my: 2 }} />

                        {config.chartType === 'table' ? (
                            <Box sx={{ overflow: 'auto' }}>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    Table preview showing data from {dataSourceLabels[config.dataSource]}
                                </Typography>
                                {/* Simple table preview */}
                                <Box
                                    component="table"
                                    sx={{
                                        width: '100%',
                                        borderCollapse: 'collapse',
                                        '& th, & td': {
                                            p: 1.5,
                                            textAlign: 'left',
                                            borderBottom: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                                        },
                                        '& th': {
                                            fontWeight: 600,
                                            bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                                        },
                                    }}
                                >
                                    <thead>
                                        <tr>
                                            {config.columns.map((col) => {
                                                const field = availableFields.find((f) => f.key === col);
                                                return <th key={col}>{field?.label || col}</th>;
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[1, 2, 3, 4, 5].map((row) => (
                                            <tr key={row}>
                                                {config.columns.map((col, idx) => (
                                                    <td key={col}>Sample Data {row}-{idx + 1}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </Box>
                            </Box>
                        ) : (
                            <ChartCard
                                title={config.chartTitle || `${dataSourceLabels[config.dataSource]} Report`}
                                subtitle={`Grouped by ${config.groupBy || 'none'}`}
                                chart={getChartConfig()!}
                            />
                        )}
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
}
