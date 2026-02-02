import { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    TextField,
    InputAdornment,
    ToggleButton,
    ToggleButtonGroup,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    useTheme,
    alpha,
} from '@mui/material';
import {
    Add as AddIcon,
    Search as SearchIcon,
    GridView as GridViewIcon,
    ViewList as ListViewIcon,
    Assessment as ReportsIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ReportCard } from '../../components/cards';
import {
    mockSavedReports,
    type SavedReport,
    type DataSourceType,
    dataSourceLabels,
} from '../../data/mockReports';

export function ReportsListPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const navigate = useNavigate();

    const [reports, setReports] = useState<SavedReport[]>(mockSavedReports);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [filterDataSource, setFilterDataSource] = useState<DataSourceType | 'all'>('all');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [reportToDelete, setReportToDelete] = useState<string | null>(null);

    // Filter reports
    const filteredReports = reports.filter((report) => {
        const matchesSearch =
            report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDataSource =
            filterDataSource === 'all' || report.config.dataSource === filterDataSource;
        return matchesSearch && matchesDataSource;
    });

    // Sort favorites first
    const sortedReports = [...filteredReports].sort((a, b) => {
        if (a.isFavorite && !b.isFavorite) return -1;
        if (!a.isFavorite && b.isFavorite) return 1;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    const handleEdit = (id: string) => {
        navigate(`/reports/${id}/edit`);
    };

    const handleDuplicate = (id: string) => {
        const reportToDuplicate = reports.find((r) => r.id === id);
        if (reportToDuplicate) {
            const newReport: SavedReport = {
                ...reportToDuplicate,
                id: `report-${Date.now()}`,
                name: `${reportToDuplicate.name} (Copy)`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                isFavorite: false,
            };
            setReports([newReport, ...reports]);
        }
    };

    const handleDeleteClick = (id: string) => {
        setReportToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (reportToDelete) {
            setReports(reports.filter((r) => r.id !== reportToDelete));
        }
        setDeleteDialogOpen(false);
        setReportToDelete(null);
    };

    const handleToggleFavorite = (id: string) => {
        setReports(
            reports.map((r) => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r))
        );
    };

    const handleExport = (id: string) => {
        // Navigate to export center with pre-selected report data
        console.log('Export report:', id);
    };

    const handleRun = (id: string) => {
        // Open report in view mode
        navigate(`/reports/${id}/edit`);
    };

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Reports
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Create and manage custom reports with your data.
                </Typography>
            </Box>

            {/* Toolbar */}
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    mb: 3,
                    flexWrap: 'wrap',
                    alignItems: 'center',
                }}
            >
                <TextField
                    placeholder="Search reports..."
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ minWidth: 250 }}
                />

                {/* Data source filter */}
                <ToggleButtonGroup
                    value={filterDataSource}
                    exclusive
                    onChange={(_, value) => value && setFilterDataSource(value)}
                    size="small"
                >
                    <ToggleButton value="all">All</ToggleButton>
                    {Object.entries(dataSourceLabels).map(([key, label]) => (
                        <ToggleButton key={key} value={key}>
                            {label}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>

                <Box sx={{ flexGrow: 1 }} />

                {/* View mode toggle */}
                <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={(_, value) => value && setViewMode(value)}
                    size="small"
                >
                    <ToggleButton value="grid">
                        <GridViewIcon fontSize="small" />
                    </ToggleButton>
                    <ToggleButton value="list">
                        <ListViewIcon fontSize="small" />
                    </ToggleButton>
                </ToggleButtonGroup>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/reports/new')}
                    sx={{
                        bgcolor: '#171717',
                        '&:hover': { bgcolor: '#262626' },
                    }}
                >
                    New Report
                </Button>
            </Box>

            {/* Reports Grid/List */}
            {sortedReports.length > 0 ? (
                <Grid container spacing={3}>
                    {sortedReports.map((report) => (
                        <Grid
                            key={report.id}
                            size={{
                                xs: 12,
                                sm: viewMode === 'grid' ? 6 : 12,
                                md: viewMode === 'grid' ? 4 : 12,
                                lg: viewMode === 'grid' ? 3 : 12,
                            }}
                        >
                            <ReportCard
                                id={report.id}
                                name={report.name}
                                description={report.description}
                                dataSource={report.config.dataSource}
                                chartType={report.config.chartType}
                                updatedAt={report.updatedAt}
                                isFavorite={report.isFavorite}
                                onEdit={handleEdit}
                                onDuplicate={handleDuplicate}
                                onDelete={handleDeleteClick}
                                onRun={handleRun}
                                onExport={handleExport}
                                onToggleFavorite={handleToggleFavorite}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                /* Empty State */
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 10,
                        px: 3,
                        textAlign: 'center',
                        bgcolor: isDarkMode ? alpha('#FFFFFF', 0.02) : alpha('#000000', 0.02),
                        borderRadius: 2,
                        border: `1px dashed ${isDarkMode ? '#404040' : '#D4D4D4'}`,
                    }}
                >
                    <Box
                        sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2,
                        }}
                    >
                        <ReportsIcon sx={{ fontSize: 40, color: '#737373' }} />
                    </Box>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                        {searchQuery || filterDataSource !== 'all'
                            ? 'No reports found'
                            : 'No reports yet'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
                        {searchQuery || filterDataSource !== 'all'
                            ? 'Try adjusting your search or filter criteria.'
                            : 'Create your first custom report to visualize and analyze your data.'}
                    </Typography>
                    {!searchQuery && filterDataSource === 'all' && (
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => navigate('/reports/new')}
                            sx={{
                                bgcolor: '#171717',
                                '&:hover': { bgcolor: '#262626' },
                            }}
                        >
                            Create Your First Report
                        </Button>
                    )}
                </Box>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Delete Report</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this report? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
