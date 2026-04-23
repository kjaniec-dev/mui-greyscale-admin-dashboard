import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    TextField,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    InputAdornment,
    Tabs,
    Tab,
    Chip,
    Card,
    CardContent,
    CardActionArea,
    Grid,
    ToggleButton,
    ToggleButtonGroup,
    Link,
    useTheme,
} from '@mui/material';
import {
    Add as AddIcon,
    Search as SearchIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    ViewList as ListIcon,
    ViewModule as GridIcon,
    RemoveRedEye as EyeIcon,
    ThumbUp as HelpfulIcon,
    Archive as ArchiveIcon,
    MenuBook as ArticleIcon,
} from '@mui/icons-material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import {
    mockArticles,
    calculateHelpfulness,
    formatArticleDate,
    getCategoryColor,
    type Article,
    type ArticleStatus,
    type ArticleCategory,
} from '../../data/mockArticles';
import { getStatusSolid } from '../../theme';

type TabValue = 'All' | ArticleCategory;
type ViewMode = 'list' | 'grid';

function ActionsMenu({
    article,
    onView,
    onEdit,
    onArchive,
}: {
    article: Article;
    onView: (article: Article) => void;
    onEdit: (article: Article) => void;
    onArchive: (article: Article) => void;
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    return (
        <>
            <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
                <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
                <MenuItem
                    onClick={() => {
                        onView(article);
                        setAnchorEl(null);
                    }}
                >
                    <EyeIcon sx={{ mr: 1, fontSize: 20 }} />
                    View
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        onEdit(article);
                        setAnchorEl(null);
                    }}
                >
                    <EditIcon sx={{ mr: 1, fontSize: 20 }} />
                    Edit
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        onArchive(article);
                        setAnchorEl(null);
                    }}
                    sx={{ color: article.status === 'Archived' ? 'success.main' : 'warning.main' }}
                >
                    <ArchiveIcon sx={{ mr: 1, fontSize: 20 }} />
                    {article.status === 'Archived' ? 'Unarchive' : 'Archive'}
                </MenuItem>
            </Menu>
        </>
    );
}

export function KnowledgeBasePage() {
    const navigate = useNavigate();
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const [searchQuery, setSearchQuery] = useState('');
    const [tabValue, setTabValue] = useState<TabValue>('All');
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
    const [articleToArchive, setArticleToArchive] = useState<Article | null>(null);

    // Filter articles
    const filteredArticles = useMemo(() => {
        let result = mockArticles;
        if (tabValue !== 'All') {
            result = result.filter((article) => article.category === tabValue);
        }
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (article) =>
                    article.title.toLowerCase().includes(query) ||
                    article.excerpt.toLowerCase().includes(query) ||
                    article.tags.some((tag) => tag.toLowerCase().includes(query))
            );
        }
        return result;
    }, [searchQuery, tabValue]);

    // Category counts
    const categoryCounts = useMemo(() => {
        const counts: Record<TabValue, number> = {
            All: mockArticles.length,
            'Getting Started': 0,
            'Account & Billing': 0,
            Features: 0,
            Troubleshooting: 0,
            'API & Integrations': 0,
            Security: 0,
        };
        mockArticles.forEach((article) => {
            counts[article.category]++;
        });
        return counts;
    }, []);

    const handleView = (article: Article) => {
        navigate(`/knowledge-base/${article.id}`);
    };

    const handleEdit = (article: Article) => {
        navigate(`/knowledge-base/edit/${article.id}`);
    };

    const handleArchiveClick = (article: Article) => {
        setArticleToArchive(article);
        setArchiveDialogOpen(true);
    };

    const handleArchiveConfirm = () => {
        console.log('Archiving article:', articleToArchive?.id);
        setArchiveDialogOpen(false);
        setArticleToArchive(null);
    };

    const columns: GridColDef[] = [
        {
            field: 'title',
            headerName: 'Title',
            flex: 1.5,
            minWidth: 300,
            renderCell: (params) => (
                <Box sx={{ py: 1, width: '100%', overflow: 'hidden' }}>
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => handleView(params.row)}
                        sx={{
                            fontWeight: 500,
                            lineHeight: 1.4,
                            textAlign: 'left',
                            color: 'text.primary',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        }}
                    >
                        {params.value}
                    </Link>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                            display: 'block',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {params.row.excerpt}
                    </Typography>
                </Box>
            ),
        },
        {
            field: 'category',
            headerName: 'Category',
            width: 150,
            renderCell: (params) => {
                const colors = getCategoryColor(params.value as ArticleCategory);
                return (
                    <Chip
                        label={params.value}
                        size="small"
                        sx={{
                            bgcolor: isDarkMode ? colors.bgDark : colors.bg,
                            color: '#FFFFFF',
                            fontWeight: 500,
                            fontSize: '0.75rem',
                        }}
                    />
                );
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 100,
            renderCell: (params) => {
                const status = params.value as ArticleStatus;
                const colors = getStatusSolid(status, isDarkMode);
                return (
                    <Chip
                        label={status}
                        size="small"
                        sx={{
                            bgcolor: colors.bg,
                            color: colors.text,
                            fontWeight: 500,
                            borderRadius: 1,
                        }}
                    />
                );
            },
        },
        {
            field: 'views',
            headerName: 'Views',
            width: 90,
            align: 'right',
            headerAlign: 'right',
            valueFormatter: (value: number) => value?.toLocaleString() || '0',
        },
        {
            field: 'helpfulness',
            headerName: 'Helpful',
            width: 90,
            align: 'right',
            headerAlign: 'right',
            valueGetter: (_value, row) => calculateHelpfulness(row.helpful, row.notHelpful),
            renderCell: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <HelpfulIcon sx={{ fontSize: 16, color: 'success.main' }} />
                    <Typography variant="body2">{params.value}%</Typography>
                </Box>
            ),
        },
        {
            field: 'author',
            headerName: 'Author',
            width: 130,
        },
        {
            field: 'updatedAt',
            headerName: 'Updated',
            width: 110,
            valueFormatter: (value: Date) => formatArticleDate(value),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 80,
            sortable: false,
            renderCell: (params) => (
                <ActionsMenu
                    article={params.row}
                    onView={handleView}
                    onEdit={handleEdit}
                    onArchive={handleArchiveClick}
                />
            ),
        },
    ];

    // Grid view card
    const ArticleCard = ({ article }: { article: Article }) => {
        const categoryColors = getCategoryColor(article.category);
        const statusColors = getStatusSolid(article.status, isDarkMode);
        const helpfulnessPercent = calculateHelpfulness(article.helpful, article.notHelpful);

        return (
            <Card
                sx={{
                    bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                    border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                    boxShadow: 'none',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    '&:hover': {
                        borderColor: isDarkMode ? '#404040' : '#D4D4D4',
                        boxShadow: isDarkMode
                            ? '0 4px 12px rgba(0,0,0,0.4)'
                            : '0 4px 12px rgba(0,0,0,0.08)',
                    },
                }}
            >
                <CardActionArea
                    onClick={() => handleView(article)}
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch',
                    }}
                >
                    <Box
                        sx={{
                            height: 140,
                            bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <ArticleIcon sx={{ fontSize: 56, color: isDarkMode ? '#404040' : '#D4D4D4' }} />
                    </Box>
                    <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                            <Chip
                                label={article.status}
                                size="small"
                                sx={{
                                    bgcolor: statusColors.bg,
                                    color: statusColors.text,
                                    fontWeight: 500,
                                    borderRadius: 1,
                                    fontSize: '0.7rem',
                                }}
                            />
                            <Chip
                                label={article.category}
                                size="small"
                                sx={{
                                    bgcolor: isDarkMode ? categoryColors.bgDark : categoryColors.bg,
                                    color: '#FFFFFF',
                                    fontWeight: 500,
                                    fontSize: '0.7rem',
                                }}
                            />
                        </Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600,  mb: 1  }}>
                            {article.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
                            {article.excerpt.substring(0, 100)}...
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" color="text.secondary">
                                {article.author}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <EyeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                                    <Typography variant="caption" color="text.secondary">
                                        {article.views.toLocaleString()}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <HelpfulIcon sx={{ fontSize: 14, color: 'success.main' }} />
                                    <Typography variant="caption" color="text.secondary">
                                        {helpfulnessPercent}%
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    };

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                        Knowledge Base
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage help articles and documentation for your customers.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/knowledge-base/create')}
                    sx={{
                        bgcolor: '#171717',
                        color: '#FAFAFA',
                        '&:hover': { bgcolor: '#262626' },
                    }}
                >
                    New Article
                </Button>
            </Box>

            {/* Category Tabs */}
            <Box sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tabValue}
                    onChange={(_, newValue) => setTabValue(newValue)}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 500,
                            minWidth: 'auto',
                        },
                    }}
                >
                    <Tab label={`All (${categoryCounts.All})`} value="All" />
                    <Tab label={`Getting Started (${categoryCounts['Getting Started']})`} value="Getting Started" />
                    <Tab label={`Account & Billing (${categoryCounts['Account & Billing']})`} value="Account & Billing" />
                    <Tab label={`Features (${categoryCounts.Features})`} value="Features" />
                    <Tab label={`Troubleshooting (${categoryCounts.Troubleshooting})`} value="Troubleshooting" />
                    <Tab label={`API & Integrations (${categoryCounts['API & Integrations']})`} value="API & Integrations" />
                    <Tab label={`Security (${categoryCounts.Security})`} value="Security" />
                </Tabs>
            </Box>

            {/* Search and View Toggle */}
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                <TextField
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    slotProps={{ input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    } }}
                    sx={{ maxWidth: 400, flex: 1 }}
                />
                <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={(_, value) => value && setViewMode(value)}
                    size="small"
                >
                    <ToggleButton value="list">
                        <ListIcon />
                    </ToggleButton>
                    <ToggleButton value="grid">
                        <GridIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {/* Content */}
            {viewMode === 'list' ? (
                <DataGrid
                    rows={filteredArticles}
                    columns={columns}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pageSizeOptions={[10, 25, 50]}
                    disableRowSelectionOnClick
                    getRowHeight={() => 'auto'}
                    sx={{
                        border: 'none',
                        '& .MuiDataGrid-cell': {
                            borderColor: isDarkMode ? '#404040' : '#E5E5E5',
                            py: 1.5,
                            alignItems: 'flex-start',
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            bgcolor: isDarkMode ? '#262626' : '#FAFAFA',
                            borderColor: isDarkMode ? '#404040' : '#E5E5E5',
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            fontWeight: 600,
                        },
                        '& .MuiDataGrid-row:hover': {
                            bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                        },
                    }}
                />
            ) : (
                <Grid container spacing={3}>
                    {filteredArticles.map((article) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={article.id}>
                            <ArticleCard article={article} />
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Archive Dialog */}
            <Dialog open={archiveDialogOpen} onClose={() => setArchiveDialogOpen(false)}>
                <DialogTitle>
                    {articleToArchive?.status === 'Archived' ? 'Unarchive' : 'Archive'} Article
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to {articleToArchive?.status === 'Archived' ? 'unarchive' : 'archive'} "
                        <strong>{articleToArchive?.title}</strong>"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setArchiveDialogOpen(false)} color="inherit">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleArchiveConfirm}
                        color={articleToArchive?.status === 'Archived' ? 'success' : 'warning'}
                        variant="contained"
                    >
                        {articleToArchive?.status === 'Archived' ? 'Unarchive' : 'Archive'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
