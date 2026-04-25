import { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Chip,
    IconButton,
    Avatar,
    useTheme,
} from '@mui/material';
import {
    DataGrid,
    type GridColDef,
    type GridRenderCellParams,
    GridToolbar,
} from '@mui/x-data-grid';
import {
    Visibility as ViewIcon,
    Edit as EditIcon,
    Business as BusinessIcon,
} from '@mui/icons-material';
import { mockCompanies, type Company } from '../../data/mockCompanies';
import { CompanyDialog } from './components/CompanyDialog';
import { getStatusColor } from '../../theme';

export function CompaniesPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
    const [dialogMode, setDialogMode] = useState<'view' | 'edit'>('view');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleView = (company: Company) => {
        setSelectedCompany(company);
        setDialogMode('view');
        setIsDialogOpen(true);
    };

    const handleEdit = (company: Company) => {
        setSelectedCompany(company);
        setDialogMode('edit');
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedCompany(null);
    };

    const handleSaveCompany = (updatedCompany: Company) => {
        // In a real app, you would make an API call here
        console.log('Saving company:', updatedCompany);
        // Update local mock data (for demo purposes)
        const index = mockCompanies.findIndex(c => c.id === updatedCompany.id);
        if (index !== -1) {
            mockCompanies[index] = updatedCompany;
        }
        handleCloseDialog();
    };

    const getLifecycleColor = (stage: Company['lifecycleStage']) => {
        return getStatusColor(stage, isDarkMode);
    };

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Company',
            flex: 1.5,
            minWidth: 250,
            renderCell: (params: GridRenderCellParams<Company, string>) => {
                const company = params.row;
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                            src={company.logo}
                            alt={company.name}
                            sx={{
                                width: 40,
                                height: 40,
                                bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                                color: isDarkMode ? '#FAFAFA' : '#171717',
                                fontSize: '1rem',
                                fontWeight: 600,
                            }}
                        >
                            {company.name.charAt(0)}
                        </Avatar>
                        <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {company.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {company.website}
                            </Typography>
                        </Box>
                    </Box>
                );
            },
        },
        {
            field: 'industry',
            headerName: 'Industry',
            flex: 1,
            minWidth: 150,
        },
        {
            field: 'location',
            headerName: 'Location',
            flex: 1,
            minWidth: 150,
        },
        {
            field: 'revenue',
            headerName: 'Revenue',
            width: 150,
            valueFormatter: (value: number) => {
                return new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0,
                }).format(value);
            },
        },
        {
            field: 'lifecycleStage',
            headerName: 'Stage',
            width: 130,
            renderCell: (params: GridRenderCellParams<Company, string>) => {
                const stage = params.value as Company['lifecycleStage'];
                const colors = getLifecycleColor(stage);
                return (
                    <Chip
                        label={stage}
                        size="small"
                        sx={{
                            bgcolor: colors.bg,
                            color: colors.text,
                            fontWeight: 600,
                            borderRadius: '6px',
                            height: 24,
                        }}
                    />
                );
            },
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            sortable: false,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params: GridRenderCellParams<Company>) => (
                <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                    <IconButton
                        size="small"
                        onClick={() => handleView(params.row)}
                        sx={{ color: 'text.secondary' }}
                        title="View Details"
                    >
                        <ViewIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => handleEdit(params.row)}
                        sx={{ color: 'text.secondary' }}
                        title="Edit Company"
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Box>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                    variant="rounded"
                    sx={{
                        bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                        color: 'text.primary',
                        width: 48,
                        height: 48,
                    }}
                >
                    <BusinessIcon />
                </Avatar>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        Companies
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage your B2B relationships and accounts.
                    </Typography>
                </Box>
            </Box>

            <Paper
                sx={{
                    width: '100%',
                    bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                    border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                    borderRadius: 2,
                    '& .MuiDataGrid-root': {
                        border: 'none',
                    },
                    '& .MuiDataGrid-cell': {
                        borderColor: isDarkMode ? '#262626' : '#E5E5E5',
                        display: 'flex',
                        alignItems: 'center',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        borderColor: isDarkMode ? '#262626' : '#E5E5E5',
                        bgcolor: isDarkMode ? '#171717' : '#FAFAFA',
                    },
                    '& .MuiDataGrid-row:hover': {
                        bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                    },
                }}
            >
                <DataGrid
                    autoHeight
                    rows={mockCompanies}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10, page: 0 },
                        },
                    }}
                    pageSizeOptions={[10, 25, 50]}
                    disableRowSelectionOnClick
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                        },
                    }}
                    sx={{
                        '& .MuiDataGrid-toolbarContainer': {
                            p: 2,
                            borderBottom: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                        },
                    }}
                />
            </Paper>



            <CompanyDialog
                open={isDialogOpen}
                onClose={handleCloseDialog}
                company={selectedCompany}
                mode={dialogMode}
                onSave={handleSaveCompany}
                onEdit={handleEdit}
            />
        </Box>
    );
}
