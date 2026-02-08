import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Breadcrumbs,
    Link,
    Chip,
    Button,
    Paper,
    Divider,
    Stack,
    useTheme,
    Card,
    CardContent,
    CardActionArea,
} from '@mui/material';
import {
    ArrowBack as BackIcon,
    Edit as EditIcon,
    Archive as ArchiveIcon,
    Delete as DeleteIcon,
    ThumbUp as ThumbUpIcon,
    ThumbDown as ThumbDownIcon,
    RemoveRedEye as ViewIcon,
    MenuBook as ArticleIcon,
} from '@mui/icons-material';
import {
    mockArticles,
    calculateHelpfulness,
    formatArticleDate,
    getCategoryColor,
    type ArticleStatus,
} from '../../data/mockArticles';

export function ArticleDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    // Find the article
    const article = mockArticles.find((a) => a.id === id);

    const [helpfulVotes, setHelpfulVotes] = useState(article?.helpful || 0);
    const [notHelpfulVotes, setNotHelpfulVotes] = useState(article?.notHelpful || 0);

    if (!article) {
        return (
            <Box>
                <Typography variant="h4">Article Not Found</Typography>
                <Button onClick={() => navigate('/knowledge-base')} sx={{ mt: 2 }}>
                    Back to Knowledge Base
                </Button>
            </Box>
        );
    }

    const categoryColors = getCategoryColor(article.category);
    const helpfulnessPercent = calculateHelpfulness(helpfulVotes, notHelpfulVotes);
    const relatedArticles = mockArticles.filter((a) =>
        article.relatedArticles.includes(a.id)
    );

    const statusColors: Record<ArticleStatus, { bg: string; bgDark: string }> = {
        Published: { bg: '#22C55E', bgDark: '#4ADE80' },
        Draft: { bg: '#737373', bgDark: '#A3A3A3' },
        Archived: { bg: '#EF4444', bgDark: '#F87171' },
    };

    const statusColor = statusColors[article.status];

    const handleHelpful = (helpful: boolean) => {
        if (helpful) {
            setHelpfulVotes(helpfulVotes + 1);
        } else {
            setNotHelpfulVotes(notHelpfulVotes + 1);
        }
    };

    return (
        <Box>
            {/* Breadcrumbs */}
            <Breadcrumbs sx={{ mb: 3 }}>
                <Link
                    component="button"
                    variant="body2"
                    onClick={() => navigate('/knowledge-base')}
                    sx={{ cursor: 'pointer', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                    Knowledge Base
                </Link>
                <Link
                    component="button"
                    variant="body2"
                    onClick={() => navigate(`/knowledge-base?category=${article.category}`)}
                    sx={{ cursor: 'pointer', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                    {article.category}
                </Link>
                <Typography color="text.primary" variant="body2">
                    {article.title}
                </Typography>
            </Breadcrumbs>

            {/* Back Button */}
            <Button
                startIcon={<BackIcon />}
                onClick={() => navigate('/knowledge-base')}
                sx={{ mb: 3 }}
            >
                Back to Articles
            </Button>

            <Box sx={{ maxWidth: 900 }}>
                {/* Article Header */}
                <Paper
                    sx={{
                        p: 4,
                        mb: 3,
                        bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                        border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                    }}
                >
                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                        <Chip
                            label={article.status}
                            size="small"
                            sx={{
                                bgcolor: isDarkMode ? statusColor.bgDark : statusColor.bg,
                                color: '#FFFFFF',
                                fontWeight: 500,
                            }}
                        />
                        <Chip
                            label={article.category}
                            size="small"
                            sx={{
                                bgcolor: isDarkMode ? categoryColors.bgDark : categoryColors.bg,
                                color: '#FFFFFF',
                                fontWeight: 500,
                            }}
                        />
                        {article.tags.map((tag) => (
                            <Chip
                                key={tag}
                                label={tag}
                                size="small"
                                variant="outlined"
                                sx={{ borderColor: isDarkMode ? '#404040' : '#D4D4D4' }}
                            />
                        ))}
                    </Box>

                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        {article.title}
                    </Typography>

                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        {article.excerpt}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 3, mt: 3, flexWrap: 'wrap', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            By {article.author}
                        </Typography>
                        <Divider orientation="vertical" flexItem />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <ViewIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                                {article.views.toLocaleString()} views
                            </Typography>
                        </Box>
                        {article.publishedAt && (
                            <>
                                <Divider orientation="vertical" flexItem />
                                <Typography variant="body2" color="text.secondary">
                                    Published {formatArticleDate(article.publishedAt)}
                                </Typography>
                            </>
                        )}
                        <Divider orientation="vertical" flexItem />
                        <Typography variant="body2" color="text.secondary">
                            Updated {formatArticleDate(article.updatedAt)}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
                        <Button
                            variant="contained"
                            startIcon={<EditIcon />}
                            onClick={() => navigate(`/knowledge-base/edit/${article.id}`)}
                            sx={{
                                bgcolor: '#171717',
                                color: '#FAFAFA',
                                '&:hover': { bgcolor: '#262626' },
                            }}
                        >
                            Edit Article
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<ArchiveIcon />}
                            color={article.status === 'Archived' ? 'success' : 'warning'}
                        >
                            {article.status === 'Archived' ? 'Unarchive' : 'Archive'}
                        </Button>
                        <Button variant="outlined" startIcon={<DeleteIcon />} color="error">
                            Delete
                        </Button>
                    </Box>
                </Paper>

                {/* Article Content */}
                <Paper
                    sx={{
                        p: 4,
                        mb: 3,
                        bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                        border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            whiteSpace: 'pre-line',
                            lineHeight: 1.8,
                            '& h1': { fontSize: '2rem', fontWeight: 700, mt: 3, mb: 2 },
                            '& h2': { fontSize: '1.5rem', fontWeight: 600, mt: 2.5, mb: 1.5 },
                            '& h3': { fontSize: '1.25rem', fontWeight: 600, mt: 2, mb: 1 },
                            '& ul, & ol': { pl: 3, my: 2 },
                            '& li': { mb: 0.5 },
                            '& code': {
                                bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                fontFamily: 'monospace',
                            },
                        }}
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                </Paper>

                {/* Helpfulness Section */}
                <Paper
                    sx={{
                        p: 3,
                        mb: 3,
                        bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                        border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                    }}
                >
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                        Was this article helpful?
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 2 }}>
                        <Button
                            variant="outlined"
                            startIcon={<ThumbUpIcon />}
                            onClick={() => handleHelpful(true)}
                            color="success"
                        >
                            Yes ({helpfulVotes})
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<ThumbDownIcon />}
                            onClick={() => handleHelpful(false)}
                            color="error"
                        >
                            No ({notHelpfulVotes})
                        </Button>
                        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                            {helpfulnessPercent}% found this helpful
                        </Typography>
                    </Box>
                </Paper>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <Paper
                        sx={{
                            p: 3,
                            bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                            border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                        }}
                    >
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Related Articles
                        </Typography>
                        <Stack spacing={2} sx={{ mt: 2 }}>
                            {relatedArticles.map((related) => {
                                const relatedCategoryColors = getCategoryColor(related.category);
                                return (
                                    <Card
                                        key={related.id}
                                        sx={{
                                            bgcolor: isDarkMode ? '#0A0A0A' : '#FAFAFA',
                                            border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                                            boxShadow: 'none',
                                            '&:hover': {
                                                borderColor: isDarkMode ? '#404040' : '#D4D4D4',
                                            },
                                        }}
                                    >
                                        <CardActionArea onClick={() => navigate(`/knowledge-base/${related.id}`)}>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                                    <ArticleIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                                                    <Chip
                                                        label={related.category}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: isDarkMode
                                                                ? relatedCategoryColors.bgDark
                                                                : relatedCategoryColors.bg,
                                                            color: '#FFFFFF',
                                                            fontSize: '0.7rem',
                                                        }}
                                                    />
                                                </Box>
                                                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                                                    {related.title}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {related.excerpt.substring(0, 120)}...
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                );
                            })}
                        </Stack>
                    </Paper>
                )}
            </Box>
        </Box>
    );
}
