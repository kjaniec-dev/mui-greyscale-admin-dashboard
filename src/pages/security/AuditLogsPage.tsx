import { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    Chip,
    Avatar,
    Stack,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Drawer,
    Divider,
    Button,
} from '@mui/material';
import {
    Search as SearchIcon,
    FilterList as FilterIcon,
    Close as CloseIcon,
    OpenInNew as OpenIcon,
    Computer as DeviceIcon,
    Schedule as TimeIcon,
    Person as UserIcon,
    Description as ResourceIcon,
} from '@mui/icons-material';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { DataGrid as DataGridComponent } from '@mui/x-data-grid';
import {
    mockAuditLogs,
    actionLabels,
    resourceLabels,
    actionColors,
    type AuditLogEntry,
    type AuditAction,
    type AuditStatus,
} from '../../data/mockAuditLogs';

const statusColors: Record<AuditStatus, 'success' | 'error' | 'warning'> = {
    success: 'success',
    failed: 'error',
    warning: 'warning',
};

const dateFormatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
});

export function AuditLogsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [actionFilter, setActionFilter] = useState<string>('all');
    const [resourceFilter, setResourceFilter] = useState<string>('all');
    const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleRowClick = (log: AuditLogEntry) => {
        setSelectedLog(log);
        setDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setDrawerOpen(false);
        setSelectedLog(null);
    };

    const filteredLogs = useMemo(() => {
        return mockAuditLogs.filter((log) => {
            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesSearch =
                    log.userName.toLowerCase().includes(query) ||
                    log.userEmail.toLowerCase().includes(query) ||
                    log.action.toLowerCase().includes(query) ||
                    log.resource.toLowerCase().includes(query) ||
                    log.ipAddress.includes(query) ||
                    (log.resourceName?.toLowerCase().includes(query) ?? false) ||
                    (log.details?.toLowerCase().includes(query) ?? false);
                if (!matchesSearch) return false;
            }

            // Action filter
            if (actionFilter !== 'all' && log.action !== actionFilter) {
                return false;
            }

            // Resource filter
            if (resourceFilter !== 'all' && log.resource !== resourceFilter) {
                return false;
            }

            return true;
        });
    }, [searchQuery, actionFilter, resourceFilter]);

    const columns: GridColDef[] = [
        {
            field: 'timestamp',
            headerName: 'Timestamp',
            width: 180,
            valueFormatter: (value) => {
                if (!value) return '-';
                const date = new Date(value);
                return isNaN(date.getTime()) ? 'Invalid Date' : dateFormatter.format(date);
            },
        },
        {
            field: 'user',
            headerName: 'User',
            width: 220,
            renderCell: (params: GridRenderCellParams<AuditLogEntry>) => (
                <Stack direction="row" spacing={1} alignItems="center" sx={{ height: '100%' }}>
                    <Avatar
                        src={params.row.userAvatar}
                        alt={params.row.userName}
                        sx={{ width: 32, height: 32 }}
                    >
                        {params.row.userName.charAt(0)}
                    </Avatar>
                    <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        <Typography variant="body2" fontWeight={500} sx={{ lineHeight: '1.2' }} noWrap>
                            {params.row.userName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: '1.2' }} noWrap>
                            {params.row.userEmail}
                        </Typography>
                    </Box>
                </Stack>
            ),
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 160,
            renderCell: (params: GridRenderCellParams<AuditLogEntry, AuditAction>) => (
                <Chip
                    label={actionLabels[params.value!]}
                    size="small"
                    color={actionColors[params.value!]}
                    variant="outlined"
                    sx={{ fontWeight: 500 }}
                />
            ),
        },
        {
            field: 'resource',
            headerName: 'Resource',
            width: 140,
            renderCell: (params: GridRenderCellParams<AuditLogEntry>) => (
                <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%', justifyContent: 'center' }}>
                    <Typography variant="body2" fontWeight={500} sx={{ lineHeight: '1.2' }} noWrap>
                        {resourceLabels[params.row.resource]}
                    </Typography>
                    {params.row.resourceName && (
                        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: '1.2' }} noWrap>
                            {params.row.resourceName}
                        </Typography>
                    )}
                </Box>
            ),
        },
        {
            field: 'ipAddress',
            headerName: 'IP Address',
            width: 140,
            renderCell: (params: GridRenderCellParams<AuditLogEntry, string>) => (
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: 12 }}>
                        {params.value}
                    </Typography>
                </Box>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 100,
            renderCell: (params: GridRenderCellParams<AuditLogEntry, AuditStatus>) => (
                <Chip
                    label={params.value}
                    size="small"
                    color={statusColors[params.value!]}
                    sx={{ textTransform: 'capitalize' }}
                />
            ),
        },
        {
            field: 'actions',
            headerName: '',
            width: 60,
            sortable: false,
            renderCell: (params: GridRenderCellParams<AuditLogEntry>) => (
                <IconButton
                    size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(params.row);
                    }}
                >
                    <OpenIcon fontSize="small" />
                </IconButton>
            ),
        },
    ];

    const uniqueActions = [...new Set(mockAuditLogs.map((log) => log.action))];
    const uniqueResources = [...new Set(mockAuditLogs.map((log) => log.resource))];

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Audit Logs
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Track and monitor all user activity and system events.
                </Typography>
            </Box>

            {/* Filters */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
                <TextField
                    placeholder="Search logs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ minWidth: 300 }}
                />

                <FormControl sx={{ minWidth: 160 }}>
                    <InputLabel>Action</InputLabel>
                    <Select
                        value={actionFilter}
                        label="Action"
                        onChange={(e) => setActionFilter(e.target.value)}
                        startAdornment={<FilterIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                    >
                        <MenuItem value="all">All Actions</MenuItem>
                        {uniqueActions.map((action) => (
                            <MenuItem key={action} value={action}>
                                {actionLabels[action]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 160 }}>
                    <InputLabel>Resource</InputLabel>
                    <Select
                        value={resourceFilter}
                        label="Resource"
                        onChange={(e) => setResourceFilter(e.target.value)}
                    >
                        <MenuItem value="all">All Resources</MenuItem>
                        {uniqueResources.map((resource) => (
                            <MenuItem key={resource} value={resource}>
                                {resourceLabels[resource]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {(actionFilter !== 'all' || resourceFilter !== 'all' || searchQuery) && (
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setSearchQuery('');
                            setActionFilter('all');
                            setResourceFilter('all');
                        }}
                        startIcon={<CloseIcon />}
                    >
                        Clear
                    </Button>
                )}
            </Stack>

            {/* Results count */}
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Showing {filteredLogs.length} of {mockAuditLogs.length} log entries
            </Typography>

            {/* DataGrid */}
            <Box sx={{ height: 700, width: '100%' }}>
                <DataGridComponent
                    rowHeight={64}
                    rows={filteredLogs}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10 },
                        },
                        sorting: {
                            sortModel: [{ field: 'timestamp', sort: 'desc' }],
                        },
                    }}
                    pageSizeOptions={[10, 25, 50, 100]}
                    disableRowSelectionOnClick
                    onRowClick={(params) => handleRowClick(params.row)}
                    sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        '& .MuiDataGrid-columnHeaders': {
                            bgcolor: 'background.default',
                        },
                        '& .MuiDataGrid-row': {
                            cursor: 'pointer',
                        },
                    }}
                />
            </Box>

            {/* Log Detail Drawer */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleCloseDrawer}
                PaperProps={{
                    sx: { width: { xs: '100%', sm: 420 } },
                }}
            >
                {selectedLog && (
                    <Box sx={{ p: 3 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                            <Typography variant="h6" fontWeight={600}>
                                Log Details
                            </Typography>
                            <IconButton onClick={handleCloseDrawer}>
                                <CloseIcon />
                            </IconButton>
                        </Stack>

                        <Stack spacing={3}>
                            {/* User Info */}
                            <Box>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                    <UserIcon fontSize="small" color="action" />
                                    <Typography variant="subtitle2" color="text.secondary">
                                        User
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Avatar src={selectedLog.userAvatar} sx={{ width: 40, height: 40 }}>
                                        {selectedLog.userName.charAt(0)}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="body1" fontWeight={500}>
                                            {selectedLog.userName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {selectedLog.userEmail}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>

                            <Divider />

                            {/* Action & Status */}
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Action
                                </Typography>
                                <Stack direction="row" spacing={1}>
                                    <Chip
                                        label={actionLabels[selectedLog.action]}
                                        color={actionColors[selectedLog.action]}
                                        variant="outlined"
                                    />
                                    <Chip
                                        label={selectedLog.status}
                                        color={statusColors[selectedLog.status]}
                                        sx={{ textTransform: 'capitalize' }}
                                    />
                                </Stack>
                            </Box>

                            <Divider />

                            {/* Resource */}
                            <Box>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                    <ResourceIcon fontSize="small" color="action" />
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Resource
                                    </Typography>
                                </Stack>
                                <Typography variant="body1" fontWeight={500}>
                                    {resourceLabels[selectedLog.resource]}
                                </Typography>
                                {selectedLog.resourceName && (
                                    <Typography variant="body2" color="text.secondary">
                                        {selectedLog.resourceName}
                                    </Typography>
                                )}
                                {selectedLog.resourceId && (
                                    <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                                        ID: {selectedLog.resourceId}
                                    </Typography>
                                )}
                            </Box>

                            <Divider />

                            {/* Timestamp */}
                            <Box>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                    <TimeIcon fontSize="small" color="action" />
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Timestamp
                                    </Typography>
                                </Stack>
                                <Typography variant="body1">
                                    {dateFormatter.format(new Date(selectedLog.timestamp))}
                                </Typography>
                            </Box>

                            <Divider />

                            {/* Device Info */}
                            <Box>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                    <DeviceIcon fontSize="small" color="action" />
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Device Information
                                    </Typography>
                                </Stack>
                                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                    IP: {selectedLog.ipAddress}
                                </Typography>
                                {selectedLog.userAgent && (
                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                                        {selectedLog.userAgent}
                                    </Typography>
                                )}
                            </Box>

                            {selectedLog.details && (
                                <>
                                    <Divider />
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                            Details
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                p: 2,
                                                bgcolor: 'action.hover',
                                                borderRadius: 1,
                                            }}
                                        >
                                            {selectedLog.details}
                                        </Typography>
                                    </Box>
                                </>
                            )}

                            {/* Log ID */}
                            <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                                <Typography variant="caption" color="text.secondary">
                                    Log ID: <code>{selectedLog.id}</code>
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                )}
            </Drawer>
        </Box>
    );
}
