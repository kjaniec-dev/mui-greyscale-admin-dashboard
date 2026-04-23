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
    CardMedia,
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
    Delete as DeleteIcon,
    ViewList as ListIcon,
    ViewModule as GridIcon,
    RemoveRedEye as EyeIcon,
    ChatBubbleOutlined as CommentIcon,
} from '@mui/icons-material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { mockPosts, type BlogPost, type BlogPostStatus } from '../../data/mockPosts';
import { getStatusSolid } from '../../theme';

type TabValue = 'All' | BlogPostStatus;
type ViewMode = 'list' | 'grid';

function formatDate(date: Date | undefined): string {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

function ActionsMenu({ post, onView, onEdit, onDelete }: {
    post: BlogPost;
    onView: (post: BlogPost) => void;
    onEdit: (post: BlogPost) => void;
    onDelete: (post: BlogPost) => void;
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    return (
        <>
            <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
                <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
                <MenuItem onClick={() => { onView(post); setAnchorEl(null); }}>
                    <EyeIcon sx={{ mr: 1, fontSize: 20 }} />
                    View
                </MenuItem>
                <MenuItem onClick={() => { onEdit(post); setAnchorEl(null); }}>
                    <EditIcon sx={{ mr: 1, fontSize: 20 }} />
                    Edit
                </MenuItem>
                <MenuItem onClick={() => { onDelete(post); setAnchorEl(null); }} sx={{ color: 'error.main' }}>
                    <DeleteIcon sx={{ mr: 1, fontSize: 20 }} />
                    Delete
                </MenuItem>
            </Menu>
        </>
    );
}

export function BlogPostsPage() {
    const navigate = useNavigate();
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const [searchQuery, setSearchQuery] = useState('');
    const [tabValue, setTabValue] = useState<TabValue>('All');
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);

    // Filter posts
    const filteredPosts = useMemo(() => {
        let result = mockPosts;
        if (tabValue !== 'All') {
            result = result.filter((post) => post.status === tabValue);
        }
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (post) =>
                    post.title.toLowerCase().includes(query) ||
                    post.author.toLowerCase().includes(query) ||
                    post.category.toLowerCase().includes(query)
            );
        }
        return result;
    }, [searchQuery, tabValue]);

    // Status counts
    const statusCounts = useMemo(() => ({
        All: mockPosts.length,
        Published: mockPosts.filter(p => p.status === 'Published').length,
        Draft: mockPosts.filter(p => p.status === 'Draft').length,
        Scheduled: mockPosts.filter(p => p.status === 'Scheduled').length,
    }), []);

    const getPostStatusColor = (status: string) => {
        // Import centralized helper
        const { bg, text } = getStatusSolid(status, isDarkMode);
        return { bg, bgDark: bg, text }; // bgDark is same since getStatusSolid is already mode-aware
    };

    const handleView = (post: BlogPost) => {
        navigate(`/blog/${post.id}`);
    };

    const handleEdit = (post: BlogPost) => {
        navigate(`/blog/edit/${post.id}`);
    };

    const handleDeleteClick = (post: BlogPost) => {
        setPostToDelete(post);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        console.log('Deleting post:', postToDelete?.id);
        setDeleteDialogOpen(false);
        setPostToDelete(null);
    };

    const columns: GridColDef[] = [
        {
            field: 'title',
            headerName: 'Title',
            flex: 1.5,
            minWidth: 250,
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
            field: 'author',
            headerName: 'Author',
            width: 130,
        },
        {
            field: 'category',
            headerName: 'Category',
            width: 110,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    size="small"
                    variant="outlined"
                    sx={{
                        borderColor: isDarkMode ? '#404040' : '#E5E5E5',
                        color: isDarkMode ? '#A3A3A3' : '#525252',
                        fontSize: '0.75rem',
                    }}
                />
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 100,
            renderCell: (params) => {
                const status = params.value as BlogPostStatus;
                const colors = getPostStatusColor(status);
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
            width: 80,
            align: 'right',
            headerAlign: 'right',
            valueFormatter: (value: number) => value?.toLocaleString() || '0',
        },
        {
            field: 'comments',
            headerName: 'Comments',
            width: 90,
            align: 'right',
            headerAlign: 'right',
        },
        {
            field: 'publishedAt',
            headerName: 'Published',
            width: 110,
            valueFormatter: (value: Date) => formatDate(value),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 80,
            sortable: false,
            renderCell: (params) => (
                <ActionsMenu
                    post={params.row}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                />
            ),
        },
    ];

    // Grid view card
    const BlogCard = ({ post }: { post: BlogPost }) => {
        const colors = getPostStatusColor(post.status);
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
                    onClick={() => handleView(post)}
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch',
                    }}
                >
                    <CardMedia
                        sx={{
                            height: 160,
                            bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="h4" sx={{ color: isDarkMode ? '#404040' : '#D4D4D4' }}>
                            📝
                        </Typography>
                    </CardMedia>
                    <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                            <Chip
                                label={post.status}
                                size="small"
                                sx={{
                                    bgcolor: colors.bg,
                                    color: colors.text,
                                    fontWeight: 500,
                                    borderRadius: 1,
                                    fontSize: '0.7rem',
                                }}
                            />
                            <Chip
                                label={post.category}
                                size="small"
                                variant="outlined"
                                sx={{ fontSize: '0.7rem' }}
                            />
                        </Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600,  mb: 1  }}>
                            {post.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
                            {post.excerpt.substring(0, 80)}...
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" color="text.secondary">
                                By {post.author}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <EyeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                                    <Typography variant="caption" color="text.secondary">
                                        {post.views.toLocaleString()}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <CommentIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                                    <Typography variant="caption" color="text.secondary">
                                        {post.comments}
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
                        Blog Posts
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage your blog articles and content.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/blog/create')}
                    sx={{
                        bgcolor: '#171717',
                        color: '#FAFAFA',
                        '&:hover': { bgcolor: '#262626' },
                    }}
                >
                    New Post
                </Button>
            </Box>

            {/* Status Tabs */}
            <Box sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tabValue}
                    onChange={(_, newValue) => setTabValue(newValue)}
                    sx={{
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 500,
                            minWidth: 'auto',
                        },
                    }}
                >
                    <Tab label={`All (${statusCounts.All})`} value="All" />
                    <Tab label={`Published (${statusCounts.Published})`} value="Published" />
                    <Tab label={`Draft (${statusCounts.Draft})`} value="Draft" />
                    <Tab label={`Scheduled (${statusCounts.Scheduled})`} value="Scheduled" />
                </Tabs>
            </Box>

            {/* Search and View Toggle */}
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                <TextField
                    placeholder="Search posts..."
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
                    rows={filteredPosts}
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
                    {filteredPosts.map((post) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={post.id}>
                            <BlogCard post={post} />
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Delete Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Delete Post</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete "<strong>{postToDelete?.title}</strong>"?
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="inherit">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
