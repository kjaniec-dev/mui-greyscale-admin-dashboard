import { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    FormControl,
    Select,
    MenuItem,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Divider,
    Chip,
    LinearProgress,
    Alert,
    useTheme,
    alpha,
    InputLabel,
} from '@mui/material';
import {
    Download as DownloadIcon,
    TableChart as CsvIcon,
    Description as ExcelIcon,
    PictureAsPdf as PdfIcon,
    Schedule as ScheduleIcon,
    CheckCircle as SuccessIcon,
} from '@mui/icons-material';

type ExportFormat = 'csv' | 'excel' | 'pdf';
type DataSource = 'users' | 'orders' | 'products' | 'customers' | 'invoices';

interface ExportConfig {
    format: ExportFormat;
    dataSource: DataSource;
    dateRange: string;
    columns: Record<DataSource, string[]>;
}

const dataSourceColumns: Record<DataSource, { key: string; label: string }[]> = {
    users: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role' },
        { key: 'status', label: 'Status' },
        { key: 'createdAt', label: 'Created Date' },
        { key: 'lastLogin', label: 'Last Login' },
    ],
    orders: [
        { key: 'id', label: 'Order ID' },
        { key: 'customer', label: 'Customer' },
        { key: 'items', label: 'Items' },
        { key: 'total', label: 'Total' },
        { key: 'status', label: 'Status' },
        { key: 'date', label: 'Order Date' },
        { key: 'shipping', label: 'Shipping Address' },
    ],
    products: [
        { key: 'id', label: 'Product ID' },
        { key: 'name', label: 'Product Name' },
        { key: 'sku', label: 'SKU' },
        { key: 'price', label: 'Price' },
        { key: 'stock', label: 'Stock' },
        { key: 'category', label: 'Category' },
        { key: 'status', label: 'Status' },
    ],
    customers: [
        { key: 'id', label: 'Customer ID' },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'orders', label: 'Total Orders' },
        { key: 'spent', label: 'Total Spent' },
        { key: 'createdAt', label: 'Joined Date' },
    ],
    invoices: [
        { key: 'id', label: 'Invoice ID' },
        { key: 'customer', label: 'Customer' },
        { key: 'amount', label: 'Amount' },
        { key: 'status', label: 'Status' },
        { key: 'dueDate', label: 'Due Date' },
        { key: 'paidDate', label: 'Paid Date' },
    ],
};

const formatIcons: Record<ExportFormat, React.ReactNode> = {
    csv: <CsvIcon />,
    excel: <ExcelIcon sx={{ color: 'text.secondary' }} />,
    pdf: <PdfIcon sx={{ color: 'text.secondary' }} />,
};

const formatLabels: Record<ExportFormat, string> = {
    csv: 'CSV',
    excel: 'Excel (.xlsx)',
    pdf: 'PDF',
};

export function ExportCenterPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const [config, setConfig] = useState<ExportConfig>({
        format: 'csv',
        dataSource: 'orders',
        dateRange: 'last30',
        columns: {
            users: ['id', 'name', 'email', 'role', 'status'],
            orders: ['id', 'customer', 'items', 'total', 'status', 'date'],
            products: ['id', 'name', 'sku', 'price', 'stock'],
            customers: ['id', 'name', 'email', 'orders', 'spent'],
            invoices: ['id', 'customer', 'amount', 'status', 'dueDate'],
        },
    });

    const [isExporting, setIsExporting] = useState(false);
    const [exportSuccess, setExportSuccess] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleColumnToggle = (column: string) => {
        setConfig((prev) => {
            const currentColumns = prev.columns[prev.dataSource];
            const newColumns = currentColumns.includes(column)
                ? currentColumns.filter((c) => c !== column)
                : [...currentColumns, column];
            return {
                ...prev,
                columns: { ...prev.columns, [prev.dataSource]: newColumns },
            };
        });
    };

    const handleSelectAll = () => {
        const allColumns = dataSourceColumns[config.dataSource].map((c) => c.key);
        setConfig((prev) => ({
            ...prev,
            columns: { ...prev.columns, [prev.dataSource]: allColumns },
        }));
    };

    const handleDeselectAll = () => {
        setConfig((prev) => ({
            ...prev,
            columns: { ...prev.columns, [prev.dataSource]: [] },
        }));
    };

    const handleExport = async () => {
        setIsExporting(true);
        setProgress(0);
        setExportSuccess(false);

        // Simulate export progress
        for (let i = 0; i <= 100; i += 10) {
            await new Promise((resolve) => setTimeout(resolve, 150));
            setProgress(i);
        }

        setIsExporting(false);
        setExportSuccess(true);

        // Clear success message after 5 seconds
        setTimeout(() => setExportSuccess(false), 5000);
    };

    const sectionPaperSx = {
        p: 3,
        bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
        border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
    };

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Export Center
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Export your data in CSV, Excel, or PDF format
                </Typography>
            </Box>

            {exportSuccess && (
                <Alert
                    severity="success"
                    icon={<SuccessIcon />}
                    sx={{ mb: 3 }}
                    onClose={() => setExportSuccess(false)}
                >
                    Export completed successfully! Your file is ready to download.
                </Alert>
            )}

            <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
                {/* Left Column - Configuration */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Format Selection */}
                    <Paper sx={sectionPaperSx}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            Export Format
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
                            {(['csv', 'excel', 'pdf'] as ExportFormat[]).map((format) => (
                                <Paper
                                    key={format}
                                    onClick={() => setConfig((prev) => ({ ...prev, format }))}
                                    sx={{
                                        p: 2,
                                        flex: 1,
                                        minWidth: 100,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 1,
                                        cursor: 'pointer',
                                        border: `2px solid ${config.format === format
                                            ? theme.palette.primary.main
                                            : isDarkMode ? '#262626' : '#E5E5E5'
                                            }`,
                                        bgcolor: config.format === format
                                            ? alpha(theme.palette.primary.main, 0.08)
                                            : 'transparent',
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            borderColor: theme.palette.primary.main,
                                        },
                                    }}
                                >
                                    <Box sx={{ fontSize: 32 }}>{formatIcons[format]}</Box>
                                    <Typography variant="body2" fontWeight={500}>
                                        {formatLabels[format]}
                                    </Typography>
                                </Paper>
                            ))}
                        </Box>
                    </Paper>

                    {/* Data Source */}
                    <Paper sx={sectionPaperSx}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            Data Source
                        </Typography>
                        <FormControl fullWidth size="small" sx={{ mt: 2 }}>
                            <InputLabel>Select data to export</InputLabel>
                            <Select
                                value={config.dataSource}
                                label="Select data to export"
                                onChange={(e) =>
                                    setConfig((prev) => ({
                                        ...prev,
                                        dataSource: e.target.value as DataSource,
                                    }))
                                }
                            >
                                <MenuItem value="orders">Orders</MenuItem>
                                <MenuItem value="users">Users</MenuItem>
                                <MenuItem value="products">Products</MenuItem>
                                <MenuItem value="customers">Customers</MenuItem>
                                <MenuItem value="invoices">Invoices</MenuItem>
                            </Select>
                        </FormControl>
                    </Paper>

                    {/* Date Range */}
                    <Paper sx={sectionPaperSx}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            Date Range
                        </Typography>
                        <FormControl fullWidth size="small" sx={{ mt: 2 }}>
                            <InputLabel>Select time period</InputLabel>
                            <Select
                                value={config.dateRange}
                                label="Select time period"
                                onChange={(e) =>
                                    setConfig((prev) => ({ ...prev, dateRange: e.target.value }))
                                }
                            >
                                <MenuItem value="today">Today</MenuItem>
                                <MenuItem value="last7">Last 7 days</MenuItem>
                                <MenuItem value="last30">Last 30 days</MenuItem>
                                <MenuItem value="last90">Last 90 days</MenuItem>
                                <MenuItem value="thisMonth">This month</MenuItem>
                                <MenuItem value="lastMonth">Last month</MenuItem>
                                <MenuItem value="thisYear">This year</MenuItem>
                                <MenuItem value="all">All time</MenuItem>
                            </Select>
                        </FormControl>
                    </Paper>
                </Box>

                {/* Right Column - Columns */}
                <Box sx={{ flex: 1 }}>
                    <Paper sx={sectionPaperSx}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="subtitle1" fontWeight={600}>
                                Select Columns
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button size="small" onClick={handleSelectAll}>
                                    Select All
                                </Button>
                                <Button size="small" onClick={handleDeselectAll}>
                                    Deselect All
                                </Button>
                            </Box>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <FormGroup>
                            {dataSourceColumns[config.dataSource].map((column) => (
                                <FormControlLabel
                                    key={column.key}
                                    control={
                                        <Checkbox
                                            checked={config.columns[config.dataSource].includes(column.key)}
                                            onChange={() => handleColumnToggle(column.key)}
                                        />
                                    }
                                    label={column.label}
                                />
                            ))}
                        </FormGroup>
                    </Paper>
                </Box>
            </Box>

            {/* Export Summary & Action */}
            <Paper sx={{ ...sectionPaperSx, mt: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                        <Typography variant="body2" color="text.secondary">
                            Export Summary:
                        </Typography>
                        <Chip
                            icon={formatIcons[config.format] as React.ReactElement}
                            label={formatLabels[config.format]}
                            size="small"
                        />
                        <Chip
                            label={config.dataSource.charAt(0).toUpperCase() + config.dataSource.slice(1)}
                            size="small"
                            variant="outlined"
                        />
                        <Chip
                            icon={<ScheduleIcon />}
                            label={config.dateRange === 'all' ? 'All time' : `${config.dateRange.replace('last', 'Last ').replace('this', 'This ')}`}
                            size="small"
                            variant="outlined"
                        />
                        <Typography variant="body2" color="text.secondary">
                            {config.columns[config.dataSource].length} columns selected
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<DownloadIcon />}
                        onClick={handleExport}
                        disabled={isExporting || config.columns[config.dataSource].length === 0}
                        sx={{
                            minWidth: 160,
                            bgcolor: '#171717',
                            '&:hover': { bgcolor: '#262626' },
                        }}
                    >
                        {isExporting ? 'Exporting...' : 'Export Data'}
                    </Button>
                </Box>
                {isExporting && (
                    <Box sx={{ mt: 2 }}>
                        <LinearProgress variant="determinate" value={progress} />
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                            Preparing export... {progress}%
                        </Typography>
                    </Box>
                )}
            </Paper>
        </Box>
    );
}
