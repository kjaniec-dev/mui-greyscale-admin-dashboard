import { useState, useMemo } from 'react';
import {
    Box,
    Paper,
    Typography,
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    Menu,
    MenuItem,
} from '@mui/material';
import {
    DataGrid,
    type GridColDef,
    type GridRenderCellParams,
    GridToolbarContainer,
} from '@mui/x-data-grid';
import {
    Add as AddIcon,
    Search as SearchIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    ContentCopy as DuplicateIcon,
    Email as EmailIcon,
    Code as CodeIcon,
    Notifications as AlertIcon,
    Sell as PromoIcon,
} from '@mui/icons-material';
import { mockEmailTemplates, type EmailTemplate, type EmailTemplateStatus, type EmailTemplateCategory } from '../../data/mockEmailTemplates';
import { EmailTemplateForm, type EmailTemplateFormData } from '../../components/forms/EmailTemplateForm';

// Custom toolbar for the data grid
function CustomToolbar() {
    return (
        <GridToolbarContainer sx={{ p: 2 }}>
            {/* Add any custom toolbar items here if needed */}
        </GridToolbarContainer>
    );
}

const statusColors: Record<EmailTemplateStatus, 'success' | 'default' | 'error'> = {
    Active: 'success',
    Draft: 'default',
    Archived: 'error',
};

const categoryIcons: Record<EmailTemplateCategory, React.ReactNode> = {
    Newsletter: <EmailIcon fontSize="small" />,
    Transactional: <CodeIcon fontSize="small" />,
    Promotion: <PromoIcon fontSize="small" />,
    Alert: <AlertIcon fontSize="small" />,
};

export const EmailTemplatesPage = () => {
    const [templates, setTemplates] = useState<EmailTemplate[]>(mockEmailTemplates);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuRowId, setMenuRowId] = useState<string | null>(null);

    // Filter templates based on search term
    const filteredTemplates = useMemo(() => {
        return templates.filter((template) =>
            template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.subject.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [templates, searchTerm]);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
        setAnchorEl(event.currentTarget);
        setMenuRowId(id);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuRowId(null);
    };

    const handleCreate = () => {
        setSelectedTemplate(null);
        setIsFormOpen(true);
    };

    const handleEdit = () => {
        const template = templates.find((t) => t.id === menuRowId);
        if (template) {
            setSelectedTemplate(template);
            setIsFormOpen(true);
        }
        handleMenuClose();
    };

    const handleDelete = () => {
        setTemplates((prev) => prev.filter((t) => t.id !== menuRowId));
        handleMenuClose();
    };

    const handleDuplicate = () => {
        const template = templates.find((t) => t.id === menuRowId);
        if (template) {
            const newTemplate: EmailTemplate = {
                ...template,
                id: Math.random().toString(36).substr(2, 9),
                name: `${template.name} (Copy)`,
                status: 'Draft',
                lastModified: new Date().toISOString(),
            };
            setTemplates((prev) => [newTemplate, ...prev]);
        }
        handleMenuClose();
    };

    const handleFormSubmit = (data: EmailTemplateFormData) => {
        const templateData = {
            ...data,
            category: data.category as EmailTemplateCategory,
            status: data.status as EmailTemplateStatus,
        };

        if (selectedTemplate) {
            // Update existing template
            setTemplates((prev) =>
                prev.map((t) =>
                    t.id === selectedTemplate.id
                        ? { ...t, ...templateData, lastModified: new Date().toISOString() }
                        : t
                )
            );
        } else {
            // Create new template
            const newTemplate: EmailTemplate = {
                id: Math.random().toString(36).substr(2, 9),
                ...templateData,
                lastModified: new Date().toISOString(),
            };
            setTemplates((prev) => [newTemplate, ...prev]);
        }
        setIsFormOpen(false);
    };

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Template Name',
            flex: 1.5,
            minWidth: 250,
            renderCell: (params: GridRenderCellParams) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, height: '100%', width: '100%' }}>
                    <Box
                        sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            bgcolor: 'action.hover',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'text.secondary',
                            flexShrink: 0,
                        }}
                    >
                        {categoryIcons[params.row.category as EmailTemplateCategory]}
                    </Box>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography variant="body2" fontWeight={600} noWrap>
                            {params.value}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" noWrap display="block">
                            {params.row.subject}
                        </Typography>
                    </Box>
                </Box>
            ),
        },
        {
            field: 'category',
            headerName: 'Category',
            flex: 1,
            minWidth: 150,
            renderCell: (params: GridRenderCellParams) => (
                <Chip
                    label={params.value}
                    size="small"
                    variant="outlined"
                    sx={{ borderRadius: 1 }}
                />
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params: GridRenderCellParams) => (
                <Chip
                    label={params.value}
                    size="small"
                    color={statusColors[params.value as EmailTemplateStatus]}
                    sx={{ borderRadius: 1, px: 1 }}
                />
            ),
        },
        {
            field: 'lastModified',
            headerName: 'Last Modified',
            width: 180,
            valueFormatter: (value: string) => new Date(value).toLocaleString(),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 80,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => (
                <IconButton onClick={(e) => handleMenuOpen(e, params.row.id as string)}>
                    <MoreVertIcon />
                </IconButton>
            ),
        },
    ];

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Email Templates
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage your newsletter and system email templates.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleCreate}
                    sx={{ px: 3, py: 1 }}
                >
                    Create Template
                </Button>
            </Box>

            {/* Content */}
            <Paper
                elevation={0}
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    overflow: 'hidden',
                }}
            >
                {/* Search Bar */}
                <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <TextField
                        placeholder="Search templates..."
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ maxWidth: 400 }}
                    />
                </Box>

                {/* Data Grid */}
                <DataGrid
                    rows={filteredTemplates}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[10, 25, 50]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    slots={{
                        toolbar: CustomToolbar,
                    }}
                    sx={{
                        border: 'none',
                        '& .MuiDataGrid-cell': {
                            borderColor: 'divider',
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            bgcolor: 'background.default',
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                        },
                    }}
                />
            </Paper>

            {/* Action Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleEdit}>
                    <EditIcon fontSize="small" sx={{ mr: 1 }} />
                    Edit
                </MenuItem>
                <MenuItem onClick={handleDuplicate}>
                    <DuplicateIcon fontSize="small" sx={{ mr: 1 }} />
                    Duplicate
                </MenuItem>
                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                    <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                    Delete
                </MenuItem>
            </Menu>

            {/* Create/Edit Form Dialog */}
            <Dialog
                open={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>
                    {selectedTemplate ? 'Edit Template' : 'Create New Template'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 1 }}>
                        <EmailTemplateForm
                            defaultValues={selectedTemplate || undefined}
                            onSubmit={handleFormSubmit}
                            onCancel={() => setIsFormOpen(false)}
                        />
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
};
