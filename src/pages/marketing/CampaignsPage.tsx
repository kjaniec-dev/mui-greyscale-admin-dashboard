import { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    Chip,
    Stack,
    IconButton,
    Menu,
    MenuItem,
    Button,
    LinearProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    useTheme,
} from '@mui/material';
import {
    Search as SearchIcon,
    MoreVert as MoreVertIcon,
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Pause as PauseIcon,
    PlayArrow as PlayIcon,
    Email as EmailIcon,
    Share as SocialIcon,
    Sms as SmsIcon,
    LocalOffer as PromoIcon,
} from '@mui/icons-material';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { DataGrid as DataGridComponent } from '@mui/x-data-grid';
import { mockCampaigns, type Campaign, type CampaignStatus, type CampaignType } from '../../data/mockCampaigns';
import { CampaignForm, type CampaignFormData } from '../../components/forms/CampaignForm';
import { getStatusSolid } from '../../theme';

const typeIcons: Record<CampaignType, React.ReactNode> = {
    email: <EmailIcon fontSize="small" />,
    social: <SocialIcon fontSize="small" />,
    sms: <SmsIcon fontSize="small" />,
    promotion: <PromoIcon fontSize="small" />,
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat('en-US');

const dateFormatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
});

export function CampaignsPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const [searchQuery, setSearchQuery] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, campaign: Campaign) => {
        setAnchorEl(event.currentTarget);
        setSelectedCampaign(campaign);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedCampaign(null);
    };

    const handleCreateClick = () => {
        setEditingCampaign(null);
        setIsFormOpen(true);
    };

    const handleEditClick = () => {
        if (selectedCampaign) {
            setEditingCampaign(selectedCampaign);
            setIsFormOpen(true);
            handleMenuClose();
        }
    };

    const handlePauseResumeClick = () => {
        if (selectedCampaign) {
            const action = selectedCampaign.status === 'paused' ? 'Resuming' : 'Pausing';
            console.log(`${action} campaign:`, selectedCampaign.name);
            handleMenuClose();
        }
    };

    const handleDeleteClick = () => {
        if (selectedCampaign) {
            console.log('Deleting campaign:', selectedCampaign.name);
            handleMenuClose();
        }
    };

    const handleFormSubmit = async (data: CampaignFormData) => {
        console.log('Form submitted:', data);
        setIsFormOpen(false);
        setEditingCampaign(null);
    };

    const handleFormCancel = () => {
        setIsFormOpen(false);
        setEditingCampaign(null);
    };

    const filteredCampaigns = useMemo(() => {
        if (!searchQuery) return mockCampaigns;
        const query = searchQuery.toLowerCase();
        return mockCampaigns.filter(
            (c) =>
                c.name.toLowerCase().includes(query) ||
                c.description.toLowerCase().includes(query) ||
                c.type.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Campaign',
            width: 280,
            renderCell: (params: GridRenderCellParams<Campaign, string>) => (
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', gap: 1.5 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 36,
                            height: 36,
                            borderRadius: 1,
                            bgcolor: 'action.hover',
                            color: 'text.secondary',
                        }}
                    >
                        {typeIcons[params.row.type]}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: 'normal' }}>
                        <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.2, mb: 0.5 }}>
                            {params.value}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize', lineHeight: 1.2 }}>
                            {params.row.type}
                        </Typography>
                    </Box>
                </Box>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params: GridRenderCellParams<Campaign, string>) => {
                const colors = getStatusSolid(params.value as CampaignStatus, isDarkMode);
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <Chip
                            label={params.value}
                            size="small"
                            sx={{
                                textTransform: 'capitalize',
                                bgcolor: colors.bg,
                                color: colors.text,
                            }}
                        />
                    </Box>
                );
            },
        },
        {
            field: 'dates',
            headerName: 'Duration',
            width: 200,
            renderCell: (params: GridRenderCellParams<Campaign>) => (
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                    <Typography variant="caption" color="text.secondary">
                        {dateFormatter.format(new Date(params.row.startDate))}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        to {dateFormatter.format(new Date(params.row.endDate))}
                    </Typography>
                </Box>
            ),
        },
        {
            field: 'budget',
            headerName: 'Budget / Spent',
            width: 180,
            renderCell: (params: GridRenderCellParams<Campaign>) => {
                const spentPercent = params.row.budget > 0
                    ? Math.min((params.row.spent / params.row.budget) * 100, 100)
                    : 0;
                return (
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', height: '100%', pr: 2 }}>
                        <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                            <Typography variant="caption" fontWeight={500}>
                                {currencyFormatter.format(params.row.spent)}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                / {currencyFormatter.format(params.row.budget)}
                            </Typography>
                        </Stack>
                        <LinearProgress
                            variant="determinate"
                            value={spentPercent}
                            sx={{ height: 6, borderRadius: 3 }}
                            color={spentPercent > 90 ? 'warning' : 'primary'}
                        />
                    </Box>
                );
            },
        },
        {
            field: 'reach',
            headerName: 'Reach',
            width: 100,
            renderCell: (params: GridRenderCellParams<Campaign, number>) => (
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <Typography variant="body2">
                        {numberFormatter.format(params.value || 0)}
                    </Typography>
                </Box>
            ),
        },
        {
            field: 'clicks',
            headerName: 'Clicks',
            width: 90,
            renderCell: (params: GridRenderCellParams<Campaign, number>) => (
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <Typography variant="body2">
                        {numberFormatter.format(params.value || 0)}
                    </Typography>
                </Box>
            ),
        },
        {
            field: 'conversions',
            headerName: 'Conv.',
            width: 80,
            renderCell: (params: GridRenderCellParams<Campaign, number>) => (
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <Typography variant="body2" fontWeight={500} color="success.main">
                        {numberFormatter.format(params.value || 0)}
                    </Typography>
                </Box>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 80,
            sortable: false,
            renderCell: (params: GridRenderCellParams<Campaign>) => (
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <IconButton onClick={(e) => handleMenuOpen(e, params.row)} size="small">
                        <MoreVertIcon fontSize="small" />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Box>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Campaigns
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage marketing campaigns across all channels.
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateClick}>
                    Create Campaign
                </Button>
            </Box>

            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    placeholder="Search campaigns..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ maxWidth: 500 }}
                />
            </Box>

            <Box sx={{ height: 850, width: '100%' }}>
                <DataGridComponent
                    rowHeight={72}
                    rows={filteredCampaigns}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[10, 25, 50]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        '& .MuiDataGrid-columnHeaders': {
                            bgcolor: 'background.default',
                        },
                    }}
                />
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleEditClick}>
                    <EditIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    Edit
                </MenuItem>
                {selectedCampaign && (selectedCampaign.status === 'active' || selectedCampaign.status === 'paused') && (
                    <MenuItem onClick={handlePauseResumeClick}>
                        {selectedCampaign.status === 'paused' ? (
                            <>
                                <PlayIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                Resume
                            </>
                        ) : (
                            <>
                                <PauseIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                Pause
                            </>
                        )}
                    </MenuItem>
                )}
                <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
                    <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                    Delete
                </MenuItem>
            </Menu>

            <Dialog open={isFormOpen} onClose={handleFormCancel} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingCampaign ? 'Edit Campaign' : 'Create New Campaign'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 1 }}>
                        <CampaignForm
                            defaultValues={editingCampaign ? {
                                name: editingCampaign.name,
                                type: editingCampaign.type,
                                status: editingCampaign.status,
                                startDate: editingCampaign.startDate ? editingCampaign.startDate.split('T')[0] : '',
                                endDate: editingCampaign.endDate ? editingCampaign.endDate.split('T')[0] : '',
                                budget: editingCampaign.budget,
                                description: editingCampaign.description,
                            } : undefined}
                            onSubmit={handleFormSubmit}
                            onCancel={handleFormCancel}
                        />
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
}
