import { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    TextField,
    InputAdornment,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    useTheme,
} from '@mui/material';
import {
    DataGrid,
    type GridColDef,
    type GridRenderCellParams,
} from '@mui/x-data-grid';
import {
    Add as AddIcon,
    Search as SearchIcon,
    MoreVert as MoreVertIcon,
    PlayArrow as PlayIcon,
    Pause as PauseIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Schedule as ScheduleIcon,
} from '@mui/icons-material';
import {
    mockScheduledReports,
    type ScheduledReport,
    type ReportStatus,
    type ReportFormat,
    type ReportFrequency,
} from '../../data/mockScheduledReports';
import { ScheduledReportDialog } from './components/ScheduledReportDialog';
import { getStatusSolid } from '../../theme';

export function ScheduledReportsPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const [reports, setReports] = useState<ScheduledReport[]>(mockScheduledReports);
    const [searchQuery, setSearchQuery] = useState('');

    // Dialog state
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState<ScheduledReport | null>(null);

    // Menu state
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuRowId, setMenuRowId] = useState<string | null>(null);

    // Delete dialog state
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
        setAnchorEl(event.currentTarget);
        setMenuRowId(id);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuRowId(null);
    };

    const handleCreate = () => {
        setSelectedReport(null);
        setIsDialogOpen(true);
    };

    const handleEdit = () => {
        const report = reports.find(r => r.id === menuRowId);
        if (report) {
            setSelectedReport(report);
            setIsDialogOpen(true);
        }
        handleMenuClose();
    };

    const handleToggleStatus = () => {
        setReports(prev => prev.map(report => {
            if (report.id === menuRowId) {
                return {
                    ...report,
                    status: report.status === 'Active' ? 'Paused' : 'Active'
                };
            }
            return report;
        }));
        handleMenuClose();
    };

    const handleDeleteClick = () => {
        setIsDeleteDialogOpen(true);
        handleMenuClose();
    };

    const handleDeleteConfirm = () => {
        if (menuRowId) {
            setReports(prev => prev.filter(r => r.id !== menuRowId));
        }
        setIsDeleteDialogOpen(false);
        setMenuRowId(null);
    };

    const handleSaveReport = (reportData: Partial<ScheduledReport>) => {
        if (selectedReport) {
            // Update existing
            setReports(prev => prev.map(r =>
                r.id === selectedReport.id
                    ? { ...r, ...reportData } as ScheduledReport
                    : r
            ));
        } else {
            // Create new
            const newReport: ScheduledReport = {
                id: `sr-${Date.now()}`,
                reportName: reportData.reportName || 'Untitled Report',
                description: reportData.description || '',
                format: (reportData.format as ReportFormat) || 'PDF',
                frequency: (reportData.frequency as ReportFrequency) || 'Weekly',
                recipients: reportData.recipients || [],
                nextRun: new Date().toISOString(), // Mock next run
                status: 'Active',
                createdBy: 'Current User',
                createdAt: new Date().toISOString(),
            };
            setReports(prev => [newReport, ...prev]);
        }
        setIsDialogOpen(false);
    };

    const filteredReports = reports.filter(report =>
        report.reportName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const columns: GridColDef[] = [
        {
            field: 'reportName',
            headerName: 'Report Name',
            flex: 1.5,
            minWidth: 250,
            renderCell: (params: GridRenderCellParams<ScheduledReport, string>) => (
                <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {params.row.reportName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {params.row.description}
                    </Typography>
                </Box>
            ),
        },
        {
            field: 'frequency',
            headerName: 'Frequency',
            width: 130,
            renderCell: (params: GridRenderCellParams<ScheduledReport, string>) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ScheduleIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2">{params.value}</Typography>
                </Box>
            )
        },
        {
            field: 'format',
            headerName: 'Format',
            width: 100,
            renderCell: (params: GridRenderCellParams<ScheduledReport, string>) => (
                <Chip
                    label={params.value}
                    size="small"
                    variant="outlined"
                    sx={{ borderRadius: 1 }}
                />
            )
        },
        {
            field: 'recipients',
            headerName: 'Recipients',
            flex: 1,
            minWidth: 200,
            renderCell: (params: GridRenderCellParams<ScheduledReport, string[]>) => {
                const recipients = params.value || [];
                if (recipients.length === 0) return <Typography variant="body2" color="text.secondary">No recipients</Typography>;

                return (
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', my: 1 }}>
                        {recipients.slice(0, 2).map((email, idx) => (
                            <Chip key={idx} label={email} size="small" sx={{ height: 20, fontSize: '0.7rem' }} />
                        ))}
                        {recipients.length > 2 && (
                            <Chip label={`+${recipients.length - 2}`} size="small" sx={{ height: 20, fontSize: '0.7rem' }} />
                        )}
                    </Box>
                );
            }
        },
        {
            field: 'nextRun',
            headerName: 'Next Run',
            width: 160,
            valueFormatter: (value: string) => {
                if (!value) return '-';
                return new Date(value).toLocaleString(undefined, {
                    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                });
            }
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params: GridRenderCellParams<ScheduledReport, string>) => {
                const status = params.value as ReportStatus;
                const colors = getStatusSolid(status, isDarkMode);
                return (
                    <Chip
                        label={status}
                        size="small"
                        sx={{
                            bgcolor: colors.bg,
                            color: colors.text,
                            fontWeight: 600,
                            borderRadius: '6px',
                        }}
                    />
                );
            },
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 80,
            sortable: false,
            align: 'center',
            renderCell: (params: GridRenderCellParams<ScheduledReport>) => (
                <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, params.row.id)}
                >
                    <MoreVertIcon fontSize="small" />
                </IconButton>
            ),
        }
    ];

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                        Scheduled Reports
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Automate report delivery to your team or clients.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleCreate}
                    sx={{
                        bgcolor: '#171717',
                        color: '#FAFAFA',
                        '&:hover': {
                            bgcolor: '#262626',
                        },
                    }}
                >
                    Create Schedule
                </Button>
            </Box>

            <Box sx={{ width: '100%', mt: 2 }}>
                <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                    <TextField
                        size="small"
                        placeholder="Search schedules..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        slotProps={{ input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        } }}
                        sx={{ minWidth: 300, flex: 1 }}
                    />
                </Box>
                <DataGrid
                    rows={filteredReports}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10, page: 0 },
                        },
                    }}
                    pageSizeOptions={[10, 25, 50]}
                    disableRowSelectionOnClick
                    getRowHeight={() => 'auto'}
                    sx={{
                        border: 'none',
                        '& .MuiDataGrid-cell': {
                            borderColor: isDarkMode ? '#404040' : '#E5E5E5',
                            py: 1.5,
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            bgcolor: isDarkMode ? '#262626' : '#FAFAFA',
                            borderColor: isDarkMode ? '#404040' : '#E5E5E5',
                            color: isDarkMode ? '#E5E5E5' : '#171717',
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            fontWeight: 600,
                        },
                        '& .MuiDataGrid-row': {
                            '&:hover': {
                                bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                            },
                        },
                        '& .MuiDataGrid-footerContainer': {
                            borderColor: isDarkMode ? '#404040' : '#E5E5E5',
                        },
                        '& .MuiTablePagination-root': {
                            color: isDarkMode ? '#A3A3A3' : '#525252',
                        },
                    }}
                />
            </Box>

            {/* Action Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleEdit}>
                    <EditIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    Edit Schedule
                </MenuItem>
                <MenuItem onClick={handleToggleStatus}>
                    {reports.find(r => r.id === menuRowId)?.status === 'Active' ? (
                        <>
                            <PauseIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                            Pause Schedule
                        </>
                    ) : (
                        <>
                            <PlayIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                            Resume Schedule
                        </>
                    )}
                </MenuItem>
                <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
                    <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                    Delete
                </MenuItem>
            </Menu>

            {/* Delete Confirmation */}
            <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
                <DialogTitle>Delete Scheduled Report</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this scheduled report? It will no longer be sent to its recipients. This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                    <Button variant="contained" color="error" onClick={handleDeleteConfirm}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Form Dialog */}
            <ScheduledReportDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                report={selectedReport}
                onSave={handleSaveReport}
            />
        </Box>
    );
}
