import { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Chip,
    Stack,
    Divider,
    useTheme,
    alpha,
} from '@mui/material';
import {
    Receipt as TaxIcon,
    TrendingUp as RevenueIcon,
    AccountBalance as TaxOwedIcon,
    Paid as PaidIcon,
    Download as DownloadIcon,
    PictureAsPdf as PdfIcon,
} from '@mui/icons-material';
import {
    DataGrid,
    type GridColDef,
    type GridRenderCellParams,
} from '@mui/x-data-grid';
import {
    mockTaxSummaries,
    mockQuarterlyTax,
    taxCategories,
    availableYears,
    type QuarterlyTax,
} from '../../data/mockTaxReports';
import { getStatusSolid, getToneColor } from '../../theme';

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
});

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    color: string;
    subtitle?: string;
}

function StatCard({ title, value, icon, color, subtitle }: StatCardProps) {

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        {title}
                    </Typography>
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 1.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: alpha(color, 0.1),
                            color: color,
                        }}
                    >
                        {icon}
                    </Box>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700,  mb: 0.5  }}>
                    {value}
                </Typography>
                {subtitle && (
                    <Typography variant="caption" color="text.secondary">
                        {subtitle}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}

export function TaxReportsPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const [selectedYear, setSelectedYear] = useState(2024);

    const summary = useMemo(() => mockTaxSummaries[selectedYear], [selectedYear]);
    const quarterlyData = useMemo(() => mockQuarterlyTax[selectedYear] || [], [selectedYear]);

    const handleExportCSV = () => {
        // In a real app, this would generate and download a CSV
        console.log('Exporting CSV for year:', selectedYear);
        alert(`CSV export for ${selectedYear} tax report initiated`);
    };

    const handleExportPDF = () => {
        // In a real app, this would generate and download a PDF
        console.log('Exporting PDF for year:', selectedYear);
        alert(`PDF export for ${selectedYear} tax report initiated`);
    };

    const columns: GridColDef[] = [
        {
            field: 'quarter',
            headerName: 'Quarter',
            width: 100,
            renderCell: (params: GridRenderCellParams<QuarterlyTax, string>) => (
                <Chip
                    label={params.value}
                    size="small"
                    sx={{
                        bgcolor: isDarkMode ? '#404040' : '#E5E5E5',
                        color: isDarkMode ? '#FAFAFA' : '#171717',
                        fontWeight: 600,
                    }}
                />
            ),
        },
        {
            field: 'period',
            headerName: 'Period',
            width: 160,
        },
        {
            field: 'salesAmount',
            headerName: 'Sales',
            width: 140,
            renderCell: (params: GridRenderCellParams<QuarterlyTax, number>) => (
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {currencyFormatter.format(params.value || 0)}
                </Typography>
            ),
        },
        {
            field: 'taxableAmount',
            headerName: 'Taxable',
            width: 140,
            renderCell: (params: GridRenderCellParams<QuarterlyTax, number>) => (
                <Typography variant="body2">
                    {currencyFormatter.format(params.value || 0)}
                </Typography>
            ),
        },
        {
            field: 'taxCollected',
            headerName: 'Tax Collected',
            width: 140,
            renderCell: (params: GridRenderCellParams<QuarterlyTax, number>) => (
                <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
                    {currencyFormatter.format(params.value || 0)}
                </Typography>
            ),
        },
        {
            field: 'taxRate',
            headerName: 'Rate',
            width: 80,
            renderCell: (params: GridRenderCellParams<QuarterlyTax, number>) => (
                <Typography variant="body2" color="text.secondary">
                    {params.value}%
                </Typography>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params: GridRenderCellParams<QuarterlyTax, string>) => {
                const { bg, text } = getStatusSolid(params.value || '', isDarkMode);
                return (
                    <Chip
                        label={params.value}
                        size="small"
                        sx={{
                            bgcolor: bg,
                            color: text,
                            fontWeight: 500,
                            borderRadius: 1,
                        }}
                    />
                );
            },
        },
        {
            field: 'dueDate',
            headerName: 'Due Date',
            width: 130,
            valueFormatter: (value) => dateFormatter.format(new Date(value)),
        },
        {
            field: 'filedDate',
            headerName: 'Filed Date',
            width: 130,
            valueFormatter: (value) => value ? dateFormatter.format(new Date(value)) : '—',
        },
    ];

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                        Tax Reports
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        View tax summaries, quarterly breakdowns, and export documentation.
                    </Typography>
                </Box>
                <Stack direction="row" spacing={2}  sx={{ alignItems: 'center' }}>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Year</InputLabel>
                        <Select
                            value={selectedYear}
                            label="Year"
                            onChange={(e) => setSelectedYear(e.target.value as number)}
                        >
                            {availableYears.map((year) => (
                                <MenuItem key={year} value={year}>{year}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                        onClick={handleExportCSV}
                        size="small"
                    >
                        CSV
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<PdfIcon />}
                        onClick={handleExportPDF}
                        size="small"
                    >
                        PDF
                    </Button>
                </Stack>
            </Box>

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Total Revenue"
                        value={currencyFormatter.format(summary?.totalRevenue || 0)}
                        icon={<RevenueIcon />}
                        color={isDarkMode ? '#A3A3A3' : '#525252'}
                        subtitle={`Fiscal Year ${selectedYear}`}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Taxable Income"
                        value={currencyFormatter.format(summary?.taxableIncome || 0)}
                        icon={<TaxIcon />}
                        color={isDarkMode ? '#A3A3A3' : '#525252'}
                        subtitle="After deductions"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Tax Collected"
                        value={currencyFormatter.format(summary?.taxCollected || 0)}
                        icon={<PaidIcon />}
                        color={isDarkMode ? '#A3A3A3' : '#525252'}
                        subtitle="From sales"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Balance Due"
                        value={currencyFormatter.format(summary?.balance || 0)}
                        icon={<TaxOwedIcon />}
                        color={isDarkMode ? '#A3A3A3' : '#525252'}
                        subtitle={summary?.balance === 0 ? 'All paid' : 'Pending payment'}
                    />
                </Grid>
            </Grid>

            {/* Quarterly Breakdown */}
            <Card sx={{ mb: 4 }}>
                <Box sx={{ p: 3, pb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Quarterly Breakdown
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Tax filings and payments by quarter for {selectedYear}
                    </Typography>
                </Box>
                <DataGrid
                    rows={quarterlyData}
                    columns={columns}
                    autoHeight
                    disableRowSelectionOnClick
                    hideFooter
                    sx={{
                        border: 'none',
                        '& .MuiDataGrid-cell': {
                            borderColor: isDarkMode ? '#404040' : '#E5E5E5',
                            display: 'flex',
                            alignItems: 'center',
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            bgcolor: isDarkMode ? '#262626' : '#FAFAFA',
                            borderColor: isDarkMode ? '#404040' : '#E5E5E5',
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            fontWeight: 600,
                        },
                    }}
                />
            </Card>

            {/* Tax Rates Info */}
            <Card>
                <Box sx={{ p: 3, pb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Applied Tax Rates
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Tax rates by category
                    </Typography>
                </Box>
                <Divider />
                <Box sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                        {taxCategories.map((category) => (
                            <Grid size={{ xs: 12, md: 4 }} key={category.id}>
                                {(() => {
                                    const chipTone =
                                        category.rate === 0
                                            ? getToneColor('success', isDarkMode)
                                            : category.rate < 8
                                                ? getToneColor('info', isDarkMode)
                                                : null;
                                    return (
                                <Box
                                    sx={{
                                        p: 2.5,
                                        borderRadius: 2,
                                        bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                                    }}
                                >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                            {category.category}
                                        </Typography>
                                        <Chip
                                            label={`${category.rate}%`}
                                            size="small"
                                            sx={{
                                                bgcolor: chipTone?.solid ?? (isDarkMode ? '#737373' : '#525252'),
                                                color: chipTone ? (isDarkMode ? '#171717' : '#FAFAFA') : '#FAFAFA',
                                                fontWeight: 600,
                                            }}
                                        />
                                    </Box>
                                    <Typography variant="body2" color="text.secondary">
                                        {category.description}
                                    </Typography>
                                </Box>
                                    );
                                })()}
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Card>
        </Box>
    );
}
