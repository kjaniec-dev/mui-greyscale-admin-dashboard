import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Chip,
    Autocomplete,
    Stack,
    Snackbar,
    Alert,
    useTheme,
} from '@mui/material';
import {
    Save as SaveIcon,
    Cancel as CancelIcon,
    Publish as PublishIcon,
} from '@mui/icons-material';
import {
    mockArticles,
    type ArticleCategory,
    type ArticleStatus,
} from '../../data/mockArticles';

const CATEGORIES: ArticleCategory[] = [
    'Getting Started',
    'Account & Billing',
    'Features',
    'Troubleshooting',
    'API & Integrations',
    'Security',
];

const ALL_TAGS = [
    'account',
    'setup',
    'registration',
    'dashboard',
    'navigation',
    'ui',
    'pricing',
    'subscription',
    'plans',
    'billing',
    'upgrade',
    'payment',
    'invoices',
    'reports',
    'analytics',
    'data',
    'team',
    'collaboration',
    'permissions',
    'login',
    'password',
    'access',
    'security',
    '2fa',
    'api',
    'integration',
    'developer',
    'webhooks',
    'events',
    'privacy',
    'gdpr',
    'compliance',
    'integrations',
    'tools',
    'apps',
    'performance',
    'optimization',
    'tips',
    'mobile',
    'app',
    'ios',
    'android',
];

export function ArticleCreatePage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const isEditing = Boolean(id);
    const existingArticle = isEditing ? mockArticles.find((a) => a.id === id) : null;

    const [formData, setFormData] = useState({
        title: existingArticle?.title || '',
        category: existingArticle?.category || ('Getting Started' as ArticleCategory),
        excerpt: existingArticle?.excerpt || '',
        content: existingArticle?.content || '',
        tags: existingArticle?.tags || ([] as string[]),
        status: existingArticle?.status || ('Draft' as ArticleStatus),
        relatedArticles: existingArticle?.relatedArticles || ([] as string[]),
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (field: keyof typeof formData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async (publish: boolean = false) => {
        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 500));

        const finalStatus = publish ? 'Published' : formData.status;
        console.log('Saving article:', { ...formData, status: finalStatus });

        setIsSaving(false);
        setShowSuccess(true);

        setTimeout(() => {
            navigate('/knowledge-base');
        }, 1000);
    };

    const paperSx = {
        p: 3,
        bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
        border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
        borderRadius: 2,
    };

    const inputSx = {
        bgcolor: isDarkMode ? '#0A0A0A' : '#FAFAFA',
    };

    const availableRelatedArticles = mockArticles.filter((a) => a.id !== id);

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    {isEditing ? 'Edit Article' : 'Create New Article'}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {isEditing
                        ? 'Update article information and content'
                        : 'Write a helpful article for your knowledge base'}
                </Typography>
            </Box>

            <Box sx={{ maxWidth: 900 }}>
                <Stack spacing={3}>
                    {/* Basic Information */}
                    <Paper sx={paperSx}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Basic Information
                        </Typography>
                        <Stack spacing={2.5} sx={{ mt: 2 }}>
                            <TextField
                                label="Article Title"
                                value={formData.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                fullWidth
                                required
                                placeholder="e.g., How to Reset Your Password"
                                sx={inputSx}
                            />

                            <FormControl fullWidth required>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={formData.category}
                                    onChange={(e) => handleChange('category', e.target.value)}
                                    label="Category"
                                    sx={inputSx}
                                >
                                    {CATEGORIES.map((cat) => (
                                        <MenuItem key={cat} value={cat}>
                                            {cat}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                label="Excerpt"
                                value={formData.excerpt}
                                onChange={(e) => handleChange('excerpt', e.target.value)}
                                fullWidth
                                multiline
                                rows={2}
                                placeholder="A brief summary of what this article covers..."
                                helperText="This appears in article listings and search results"
                                sx={inputSx}
                            />

                            <Autocomplete
                                multiple
                                options={ALL_TAGS}
                                value={formData.tags}
                                onChange={(_, newValue) => handleChange('tags', newValue)}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip
                                            {...getTagProps({ index })}
                                            key={option}
                                            label={option}
                                            size="small"
                                        />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Tags"
                                        placeholder="Select tags"
                                        helperText="Add relevant tags to help users find this article"
                                    />
                                )}
                                sx={inputSx}
                            />
                        </Stack>
                    </Paper>

                    {/* Content */}
                    <Paper sx={paperSx}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Article Content
                        </Typography>
                        <TextField
                            value={formData.content}
                            onChange={(e) => handleChange('content', e.target.value)}
                            fullWidth
                            required
                            multiline
                            rows={20}
                            placeholder="Write your article content here. You can use Markdown formatting..."
                            helperText="Supports Markdown formatting"
                            sx={{ ...inputSx, mt: 2 }}
                        />
                    </Paper>

                    {/* Related Articles */}
                    <Paper sx={paperSx}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Related Articles
                        </Typography>
                        <Autocomplete
                            multiple
                            options={availableRelatedArticles}
                            getOptionLabel={(option) => option.title}
                            value={availableRelatedArticles.filter((a) =>
                                formData.relatedArticles.includes(a.id)
                            )}
                            onChange={(_, newValue) =>
                                handleChange(
                                    'relatedArticles',
                                    newValue.map((a) => a.id)
                                )
                            }
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        {...getTagProps({ index })}
                                        key={option.id}
                                        label={option.title}
                                        size="small"
                                    />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Select related articles"
                                    helperText="Link to other helpful articles"
                                />
                            )}
                            sx={{ ...inputSx, mt: 2 }}
                        />
                    </Paper>

                    {/* Publishing Options */}
                    <Paper sx={paperSx}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Publishing Options
                        </Typography>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={formData.status}
                                onChange={(e) => handleChange('status', e.target.value)}
                                label="Status"
                                sx={inputSx}
                            >
                                <MenuItem value="Draft">Draft</MenuItem>
                                <MenuItem value="Published">Published</MenuItem>
                                <MenuItem value="Archived">Archived</MenuItem>
                            </Select>
                        </FormControl>
                    </Paper>

                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                        <Button
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            onClick={() => navigate('/knowledge-base')}
                            disabled={isSaving}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<SaveIcon />}
                            onClick={() => handleSave(false)}
                            disabled={isSaving || !formData.title || !formData.content}
                        >
                            {isSaving ? 'Saving...' : 'Save as Draft'}
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<PublishIcon />}
                            onClick={() => handleSave(true)}
                            disabled={isSaving || !formData.title || !formData.content}
                            sx={{
                                bgcolor: '#171717',
                                color: '#FAFAFA',
                                '&:hover': { bgcolor: '#262626' },
                            }}
                        >
                            {isSaving ? 'Publishing...' : 'Publish Article'}
                        </Button>
                    </Box>
                </Stack>
            </Box>

            {/* Success Snackbar */}
            <Snackbar
                open={showSuccess}
                autoHideDuration={3000}
                onClose={() => setShowSuccess(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity="success" onClose={() => setShowSuccess(false)}>
                    Article {isEditing ? 'updated' : 'created'} successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
}
