/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography,
    Box,
    Avatar,
    useTheme,
    Stack,
    IconButton,
} from '@mui/material';
import {
    Close as CloseIcon,
    Category as CategoryIcon,
} from '@mui/icons-material';
import type { Taxonomy } from '../../../data/mockTaxonomies';

interface TaxonomyDialogProps {
    open: boolean;
    onClose: () => void;
    item: Taxonomy | null;
    mode: 'view' | 'edit';
    type: 'Category' | 'Tag';
    onSave?: (item: Taxonomy) => void;
    onEdit?: (item: Taxonomy) => void;
}

export function TaxonomyDialog({ open, onClose, item, mode, type, onSave, onEdit }: TaxonomyDialogProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const [formData, setFormData] = useState<Partial<Taxonomy>>({});

    useEffect(() => {
        if (item) {
            setFormData(item);
        } else {
            setFormData({
                name: '',
                slug: '',
                description: '',
                count: 0,
            });
        }
    }, [item, open]);

    const handleChange = (field: keyof Taxonomy, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));

        // Auto-generate slug if name changes and we are creating a new item
        if (field === 'name' && !item) {
            const generatedSlug = (value as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            setFormData((prev) => ({ ...prev, slug: generatedSlug }));
        }
    };

    const handleSave = () => {
        if (onSave && formData) {
            onSave(formData as Taxonomy);
            onClose();
        }
    };

    const handleSwitchToEdit = () => {
        if (onEdit && item) {
            onEdit(item);
        }
    };

    const isViewMode = mode === 'view';

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                    borderRadius: 2,
                    backgroundImage: 'none',
                }
            }}
        >
            <DialogTitle sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                pt: 3,
                pb: 2,
                borderBottom: `1px solid ${theme.palette.divider}`
            }}>
                <Avatar
                    variant="rounded"
                    sx={{
                        width: 48,
                        height: 48,
                        bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                        color: 'text.primary',
                        fontSize: '1.25rem',
                        fontWeight: 600,
                    }}
                >
                    <CategoryIcon />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight={700}>
                        {isViewMode ? formData.name || `View ${type}` : (item ? `Edit ${type}` : `New ${type}`)}
                    </Typography>
                    {isViewMode && item && (
                        <Typography variant="body2" color="text.secondary">
                            /{item.slug} • {item.count} items
                        </Typography>
                    )}
                </Box>
                <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 4, pb: 3 }}>
                <Stack spacing={3}>
                    <Box sx={{ mt: 1 }}>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight={600}
                            sx={{ textTransform: 'uppercase', letterSpacing: 0.5, mb: 2, display: 'block' }}
                        >
                            Basic Information
                        </Typography>
                        <Stack spacing={2.5}>
                            <TextField
                                label="Name"
                                value={formData.name || ''}
                                onChange={(e) => handleChange('name', e.target.value)}
                                fullWidth
                                required
                                disabled={isViewMode}
                                slotProps={{ input: { readOnly: isViewMode } }}
                            />
                            <TextField
                                label="Slug"
                                value={formData.slug || ''}
                                onChange={(e) => handleChange('slug', e.target.value)}
                                fullWidth
                                required
                                disabled={isViewMode}
                                helperText={!isViewMode ? "The 'slug' is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens." : ""}
                                slotProps={{ input: { readOnly: isViewMode } }}
                            />
                            <TextField
                                label="Description"
                                value={formData.description || ''}
                                onChange={(e) => handleChange('description', e.target.value)}
                                fullWidth
                                disabled={isViewMode}
                                multiline
                                rows={3}
                                slotProps={{ input: { readOnly: isViewMode } }}
                            />
                        </Stack>
                    </Box>
                </Stack>
            </DialogContent>

            <DialogActions sx={{ p: 2.5, borderTop: `1px solid ${theme.palette.divider}` }}>
                {isViewMode ? (
                    <>
                        <Button onClick={handleSwitchToEdit} color="inherit" sx={{ mr: 'auto' }}>
                            Edit
                        </Button>
                        <Button
                            onClick={onClose}
                            variant="contained"
                            sx={{
                                bgcolor: 'text.primary',
                                color: 'background.paper',
                                '&:hover': { bgcolor: isDarkMode ? '#404040' : '#262626' }
                            }}
                        >
                            Close
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={onClose} color="inherit">
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSave}
                            disabled={!formData.name || !formData.slug}
                            sx={{
                                bgcolor: 'text.primary',
                                color: 'background.paper',
                                '&:hover': { bgcolor: isDarkMode ? '#404040' : '#262626' }
                            }}
                        >
                            Save Changes
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
}
