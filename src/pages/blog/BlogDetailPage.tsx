import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Typography,
    Paper,
    Chip,
    Avatar,
    Breadcrumbs,
    Link,
    useTheme,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Edit as EditIcon,
    Visibility as ViewIcon,
    ChatBubbleOutlined as CommentIcon,
} from '@mui/icons-material';
import { mockPosts } from '../../data/mockPosts';
import { getStatusSolid } from '../../theme';

export function BlogDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const post = mockPosts.find((p) => p.id === id);

    if (!post) {
        return (
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                    Post not found
                </Typography>
                <Button variant="outlined" onClick={() => navigate('/blog')}>
                    Back to Blog
                </Button>
            </Box>
        );
    }

    const colors = getStatusSolid(post.status, isDarkMode);

    const formatDate = (date: Date | undefined) => {
        if (!date) return '—';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <Box>
            {/* Breadcrumbs */}
            <Breadcrumbs sx={{ mb: 2 }}>
                <Link
                    component="button"
                    underline="hover"
                    color="inherit"
                    onClick={() => navigate('/blog')}
                    sx={{ cursor: 'pointer' }}
                >
                    Blog
                </Link>
                <Typography color="text.primary">{post.title.substring(0, 30)}...</Typography>
            </Breadcrumbs>

            {/* Page Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/blog')}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => navigate(`/blog/edit/${post.id}`)}
                    sx={{
                        bgcolor: '#171717',
                        color: '#FAFAFA',
                        '&:hover': { bgcolor: '#262626' },
                    }}
                >
                    Edit Post
                </Button>
            </Box>

            <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' } }}>
                {/* Main Content */}
                <Box>
                    {/* Featured Image Placeholder */}
                    <Paper
                        sx={{
                            height: 300,
                            mb: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                            background: isDarkMode
                                ? 'linear-gradient(135deg, #262626 0%, #1a1a1a 50%, #262626 100%)'
                                : 'linear-gradient(135deg, #FAFAFA 0%, #F0F0F0 50%, #FAFAFA 100%)',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Decorative pattern */}
                        <Box
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                opacity: isDarkMode ? 0.05 : 0.08,
                                backgroundImage: `radial-gradient(circle at 1px 1px, ${isDarkMode ? '#fff' : '#000'} 1px, transparent 0)`,
                                backgroundSize: '20px 20px',
                            }}
                        />
                        <Box
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: 2,
                                bgcolor: isDarkMode ? '#404040' : '#E5E5E5',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 2,
                            }}
                        >
                            <Typography variant="h2" sx={{ opacity: 0.6 }}>📝</Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            No featured image
                        </Typography>
                    </Paper>

                    {/* Title & Meta */}
                    <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            <Chip
                                label={post.status}
                                size="small"
                                sx={{
                                    bgcolor: colors.bg,
                                    color: colors.text,
                                    fontWeight: 500,
                                }}
                            />
                            <Chip label={post.category} size="small" variant="outlined" />
                        </Box>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                            {post.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                            {post.excerpt}
                        </Typography>
                    </Box>

                    {/* Content */}
                    <Paper sx={{ p: 3, mb: 3 }}>
                        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
                            {post.content}
                        </Typography>
                    </Paper>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {post.tags.map((tag, index) => (
                                <Chip
                                    key={index}
                                    label={tag}
                                    size="small"
                                    sx={{
                                        bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                                    }}
                                />
                            ))}
                        </Box>
                    )}
                </Box>

                {/* Sidebar */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Author */}
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                            Author
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: isDarkMode ? '#404040' : '#E5E5E5' }}>
                                {post.author.charAt(0)}
                            </Avatar>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                {post.author}
                            </Typography>
                        </Box>
                    </Paper>

                    {/* Stats */}
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                            Statistics
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <ViewIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                                <Typography variant="body2">
                                    {post.views.toLocaleString()} views
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CommentIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                                <Typography variant="body2">
                                    {post.comments} comments
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>

                    {/* Dates */}
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                            Timeline
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <Box>
                                <Typography variant="caption" color="text.secondary">
                                    Created
                                </Typography>
                                <Typography variant="body2">
                                    {formatDate(post.createdAt)}
                                </Typography>
                            </Box>
                            {post.publishedAt && (
                                <Box>
                                    <Typography variant="caption" color="text.secondary">
                                        Published
                                    </Typography>
                                    <Typography variant="body2">
                                        {formatDate(post.publishedAt)}
                                    </Typography>
                                </Box>
                            )}
                            <Box>
                                <Typography variant="caption" color="text.secondary">
                                    Last Updated
                                </Typography>
                                <Typography variant="body2">
                                    {formatDate(post.updatedAt)}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
}
