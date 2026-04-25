import { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Tabs,
    Tab,
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
    Category as CategoryIcon,
} from '@mui/icons-material';
import { mockCategories, mockTags, type Taxonomy } from '../../data/mockTaxonomies';
import { TaxonomyDialog } from './components/TaxonomyDialog';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`taxonomy-tabpanel-${index}`}
            aria-labelledby={`taxonomy-tab-${index}`}
            {...other}
            style={{ height: '100%' }}
        >
            {value === index && (
                <Box sx={{ height: '100%' }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `taxonomy-tab-${index}`,
        'aria-controls': `taxonomy-tabpanel-${index}`,
    };
}

export function CategoriesPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const [tabValue, setTabValue] = useState(0);

    const [selectedItem, setSelectedItem] = useState<Taxonomy | null>(null);
    const [dialogMode, setDialogMode] = useState<'view' | 'edit'>('view');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleView = (item: Taxonomy) => {
        setSelectedItem(item);
        setDialogMode('view');
        setIsDialogOpen(true);
    };

    const handleEdit = (item: Taxonomy) => {
        setSelectedItem(item);
        setDialogMode('edit');
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedItem(null);
    };

    const handleSaveItem = (updatedItem: Taxonomy) => {
        console.log('Saving item:', updatedItem);
        const dataSource = tabValue === 0 ? mockCategories : mockTags;
        const index = dataSource.findIndex(i => i.id === updatedItem.id);
        if (index !== -1) {
            dataSource[index] = updatedItem;
        }
        handleCloseDialog();
    };

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1.5,
            minWidth: 200,
            renderCell: (params: GridRenderCellParams<Taxonomy, string>) => {
                const item = params.row;
                return (
                    <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {item.name}
                        </Typography>
                    </Box>
                );
            },
        },
        {
            field: 'slug',
            headerName: 'Slug',
            flex: 1,
            minWidth: 150,
        },
        {
            field: 'description',
            headerName: 'Description',
            flex: 2,
            minWidth: 250,
        },
        {
            field: 'count',
            headerName: 'Count',
            width: 100,
            type: 'number',
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            sortable: false,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params: GridRenderCellParams<Taxonomy>) => (
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
                        title="Edit Item"
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
                    <CategoryIcon />
                </Avatar>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        Categories & Tags
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage taxonomies for your content.
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="taxonomy tabs">
                    <Tab label="Categories" {...a11yProps(0)} />
                    <Tab label="Tags" {...a11yProps(1)} />
                </Tabs>
            </Box>

            <Paper
                sx={{
                    width: '100%',
                    bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                    border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                    borderRadius: 2,
                    overflow: 'hidden',
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
                <CustomTabPanel value={tabValue} index={0}>
                    <DataGrid
                        autoHeight
                        rows={mockCategories}
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
                </CustomTabPanel>

                <CustomTabPanel value={tabValue} index={1}>
                    <DataGrid
                        autoHeight
                        rows={mockTags}
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
                </CustomTabPanel>
            </Paper>

            <TaxonomyDialog
                open={isDialogOpen}
                onClose={handleCloseDialog}
                item={selectedItem}
                mode={dialogMode}
                type={tabValue === 0 ? 'Category' : 'Tag'}
                onSave={handleSaveItem}
                onEdit={handleEdit}
            />
        </Box>
    );
}
