import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Paper,
    Typography,
    TextField,
    MenuItem,
    FormControl,
    FormLabel,
    Select,
    Breadcrumbs,
    Link,
    Snackbar,
    Alert,
    Chip,
    useTheme,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Image as ImageIcon } from '@mui/icons-material';

const categories = ['Technology', 'Business', 'Design', 'Marketing', 'Lifestyle', 'News'];
const statuses = ['Draft', 'Published', 'Scheduled'];

export function BlogCreatePage() {
    const navigate = useNavigate();
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        category: 'Technology',
        status: 'Draft',
        tags: '',
        featuredImage: '',
    });

    const handleChange = (field: keyof typeof formData) => (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { value: string } }
    ) => {
        setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            console.log('Creating blog post:', formData);
            // TODO: Implement actual API call
            await new Promise((resolve) => setTimeout(resolve, 500));
            setShowSuccess(true);
            setTimeout(() => {
                navigate('/blog');
            }, 1500);
        } catch (error) {
            console.error('Failed to create blog post:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputSx = {
        '& .MuiInputBase-root': {
            bgcolor: isDarkMode ? '#0A0A0A' : '#FAFAFA',
        },
    };

    const labelSx = {
        mb: 1,
        fontSize: '0.875rem',
        fontWeight: 500,
        color: isDarkMode ? '#E5E5E5' : '#171717',
    };

    const parsedTags = formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

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
                <Typography color="text.primary">Create</Typography>
            </Breadcrumbs>

            {/* Page Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                        Create Blog Post
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Write and publish a new blog article.
                    </Typography>
                </Box>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/blog')}
                >
                    Back to Blog
                </Button>
            </Box>

            {/* Form */}
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' } }}
            >
                {/* Main Content */}
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600,  mb: 3  }}>
                        Content
                    </Typography>

                    <TextField
                        label="Title"
                        placeholder="Enter post title..."
                        value={formData.title}
                        onChange={handleChange('title')}
                        fullWidth
                        required
                        disabled={isSubmitting}
                        sx={{ ...inputSx, mb: 3 }}
                    />

                    <TextField
                        label="Excerpt"
                        placeholder="Brief summary of the post..."
                        value={formData.excerpt}
                        onChange={handleChange('excerpt')}
                        fullWidth
                        multiline
                        rows={2}
                        disabled={isSubmitting}
                        sx={{ ...inputSx, mb: 3 }}
                    />

                    <TextField
                        label="Content"
                        placeholder="Write your blog post content here..."
                        value={formData.content}
                        onChange={handleChange('content')}
                        fullWidth
                        required
                        multiline
                        rows={15}
                        disabled={isSubmitting}
                        sx={inputSx}
                        helperText="Supports basic markdown formatting"
                    />
                </Paper>

                {/* Sidebar */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Publish Settings */}
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600,  mb: 3  }}>
                            Publish
                        </Typography>

                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <FormLabel sx={labelSx}>Status</FormLabel>
                            <Select
                                value={formData.status}
                                onChange={(event) => setFormData((prev) => ({ ...prev, status: event.target.value }))}
                                disabled={isSubmitting}
                                sx={{ bgcolor: isDarkMode ? '#0A0A0A' : '#FAFAFA' }}
                            >
                                {statuses.map((status) => (
                                    <MenuItem key={status} value={status}>{status}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <FormLabel sx={labelSx}>Category</FormLabel>
                            <Select
                                value={formData.category}
                                onChange={(event) => setFormData((prev) => ({ ...prev, category: event.target.value }))}
                                disabled={isSubmitting}
                                sx={{ bgcolor: isDarkMode ? '#0A0A0A' : '#FAFAFA' }}
                            >
                                {categories.map((cat) => (
                                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Paper>

                    {/* Featured Image */}
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600,  mb: 2  }}>
                            Featured Image
                        </Typography>

                        <Box
                            sx={{
                                border: `2px dashed ${isDarkMode ? '#404040' : '#D4D4D4'}`,
                                borderRadius: 1,
                                p: 4,
                                textAlign: 'center',
                                bgcolor: isDarkMode ? '#0A0A0A' : '#FAFAFA',
                                cursor: 'pointer',
                                '&:hover': {
                                    borderColor: isDarkMode ? '#525252' : '#A3A3A3',
                                },
                            }}
                        >
                            <ImageIcon sx={{ fontSize: 48, color: isDarkMode ? '#525252' : '#A3A3A3', mb: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                                Click to upload or drag & drop
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                PNG, JPG up to 5MB
                            </Typography>
                        </Box>
                    </Paper>

                    {/* Tags */}
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600,  mb: 2  }}>
                            Tags
                        </Typography>

                        <TextField
                            placeholder="Enter tags, separated by commas"
                            value={formData.tags}
                            onChange={handleChange('tags')}
                            fullWidth
                            disabled={isSubmitting}
                            sx={inputSx}
                            helperText="Press comma to add a tag"
                        />

                        {parsedTags.length > 0 && (
                            <Box sx={{ mt: 2, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                {parsedTags.map((tag, index) => (
                                    <Chip
                                        key={index}
                                        label={tag}
                                        size="small"
                                        sx={{
                                            bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                                            color: isDarkMode ? '#E5E5E5' : '#171717',
                                        }}
                                    />
                                ))}
                            </Box>
                        )}
                    </Paper>

                    {/* Actions */}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => navigate('/blog')}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={isSubmitting}
                            sx={{
                                bgcolor: '#171717',
                                color: '#FAFAFA',
                                '&:hover': { bgcolor: '#262626' },
                            }}
                        >
                            {isSubmitting ? 'Publishing...' : 'Publish'}
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* Success notification */}
            <Snackbar
                open={showSuccess}
                autoHideDuration={3000}
                onClose={() => setShowSuccess(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity="success" onClose={() => setShowSuccess(false)}>
                    Blog post created successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
}
