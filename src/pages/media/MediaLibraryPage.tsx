import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    IconButton,
    Grid,
    Card,
    CardMedia,
    CardContent,
    TextField,
    InputAdornment,
    ToggleButtonGroup,
    ToggleButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    LinearProgress,
    Breadcrumbs,
    Link,
    useTheme,
    alpha,
} from '@mui/material';
import {
    CloudUpload as UploadIcon,
    GridView as GridViewIcon,
    ViewList as ListViewIcon,
    Search as SearchIcon,
    MoreVert as MoreIcon,
    Delete as DeleteIcon,
    Download as DownloadIcon,
    Edit as EditIcon,
    Folder as FolderIcon,
    Image as ImageIcon,
    VideoFile as VideoIcon,
    PictureAsPdf as PdfIcon,
    Description as DocIcon,
    CreateNewFolder as NewFolderIcon,
    ContentCopy as CopyIcon,
    Info as InfoIcon,
} from '@mui/icons-material';

interface MediaFile {
    id: string;
    name: string;
    type: 'image' | 'video' | 'pdf' | 'document' | 'folder';
    size?: string;
    url?: string;
    uploadedAt?: string;
    modifiedAt?: string;
}

const mockFiles: MediaFile[] = [
    { id: '1', name: 'Marketing', type: 'folder', modifiedAt: '2024-01-20' },
    { id: '2', name: 'Products', type: 'folder', modifiedAt: '2024-01-18' },
    { id: '3', name: 'hero-banner.jpg', type: 'image', size: '2.4 MB', url: 'https://picsum.photos/seed/hero/400/300', uploadedAt: '2024-01-15' },
    { id: '4', name: 'product-1.jpg', type: 'image', size: '1.8 MB', url: 'https://picsum.photos/seed/prod1/400/300', uploadedAt: '2024-01-14' },
    { id: '5', name: 'product-2.jpg', type: 'image', size: '2.1 MB', url: 'https://picsum.photos/seed/prod2/400/300', uploadedAt: '2024-01-14' },
    { id: '6', name: 'product-3.jpg', type: 'image', size: '1.5 MB', url: 'https://picsum.photos/seed/prod3/400/300', uploadedAt: '2024-01-13' },
    { id: '7', name: 'promo-video.mp4', type: 'video', size: '45.2 MB', uploadedAt: '2024-01-12' },
    { id: '8', name: 'catalog-2024.pdf', type: 'pdf', size: '8.6 MB', uploadedAt: '2024-01-10' },
    { id: '9', name: 'brand-guidelines.pdf', type: 'pdf', size: '12.3 MB', uploadedAt: '2024-01-08' },
    { id: '10', name: 'team-photo.jpg', type: 'image', size: '3.2 MB', url: 'https://picsum.photos/seed/team/400/300', uploadedAt: '2024-01-05' },
    { id: '11', name: 'invoice-template.docx', type: 'document', size: '245 KB', uploadedAt: '2024-01-03' },
    { id: '12', name: 'banner-winter.jpg', type: 'image', size: '1.9 MB', url: 'https://picsum.photos/seed/winter/400/300', uploadedAt: '2024-01-01' },
];

const folderContents: Record<string, MediaFile[]> = {
    'Marketing': [
        { id: 'm1', name: 'campaign-spring.jpg', type: 'image', size: '1.5 MB', url: 'https://picsum.photos/seed/spring/400/300', uploadedAt: '2024-01-18' },
        { id: 'm2', name: 'campaign-summer.jpg', type: 'image', size: '1.8 MB', url: 'https://picsum.photos/seed/summer/400/300', uploadedAt: '2024-01-17' },
        { id: 'm3', name: 'social-media-kit.pdf', type: 'pdf', size: '5.2 MB', uploadedAt: '2024-01-16' },
    ],
    'Products': [
        { id: 'p1', name: 'product-catalog.pdf', type: 'pdf', size: '18.5 MB', uploadedAt: '2024-01-15' },
        { id: 'p2', name: 'product-shot-1.jpg', type: 'image', size: '2.2 MB', url: 'https://picsum.photos/seed/pshot1/400/300', uploadedAt: '2024-01-14' },
        { id: 'p3', name: 'product-shot-2.jpg', type: 'image', size: '2.0 MB', url: 'https://picsum.photos/seed/pshot2/400/300', uploadedAt: '2024-01-13' },
    ],
};

const fileTypeIcons: Record<string, React.ReactNode> = {
    folder: <FolderIcon sx={{ fontSize: 48, color: 'text.secondary' }} />,
    image: <ImageIcon sx={{ fontSize: 48, color: 'text.secondary' }} />,
    video: <VideoIcon sx={{ fontSize: 48, color: 'text.secondary' }} />,
    pdf: <PdfIcon sx={{ fontSize: 48, color: 'text.secondary' }} />,
    document: <DocIcon sx={{ fontSize: 48, color: 'text.secondary' }} />,
};

export function MediaLibraryPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [files, setFiles] = useState<MediaFile[]>(mockFiles);
    const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [renameDialogOpen, setRenameDialogOpen] = useState(false);
    const [renameValue, setRenameValue] = useState('');
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [currentPath, setCurrentPath] = useState<string[]>(['Media Library']);

    const filteredFiles = files.filter((file) =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, file: MediaFile) => {
        event.stopPropagation();
        setSelectedFile(file);
        setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    const handleDelete = () => {
        if (selectedFile) {
            setFiles((prev) => prev.filter((f) => f.id !== selectedFile.id));
        }
        handleMenuClose();
    };

    const handleUpload = async () => {
        setUploadProgress(0);
        for (let i = 0; i <= 100; i += 10) {
            await new Promise((resolve) => setTimeout(resolve, 100));
            setUploadProgress(i);
        }
        const newFile: MediaFile = {
            id: Date.now().toString(),
            name: `uploaded-file-${Date.now()}.jpg`,
            type: 'image',
            size: '1.2 MB',
            url: `https://picsum.photos/seed/${Date.now()}/400/300`,
            uploadedAt: new Date().toISOString().split('T')[0],
        };
        setFiles((prev) => [...prev, newFile]);
        setUploadProgress(null);
        setUploadDialogOpen(false);
    };

    const handleShowDetails = () => {
        setDetailsOpen(true);
        handleMenuClose();
    };

    const handleRenameClick = () => {
        if (selectedFile) {
            setRenameValue(selectedFile.name);
            setRenameDialogOpen(true);
        }
        handleMenuClose();
    };

    const handleRenameConfirm = () => {
        if (selectedFile && renameValue.trim()) {
            setFiles((prev) =>
                prev.map((f) =>
                    f.id === selectedFile.id ? { ...f, name: renameValue.trim() } : f
                )
            );
            setRenameDialogOpen(false);
        }
    };

    const handleFileClick = (file: MediaFile) => {
        if (file.type === 'folder') {
            // Navigate into folder
            setCurrentPath((prev) => [...prev, file.name]);
            const contents = folderContents[file.name] || [];
            setFiles(contents);
        }
        // Files don't open on single click - use context menu
    };

    const handleBreadcrumbClick = (index: number) => {
        if (index === 0) {
            // Go back to root
            setCurrentPath(['Media Library']);
            setFiles(mockFiles);
        } else if (index < currentPath.length - 1) {
            // Go back to a parent folder
            const newPath = currentPath.slice(0, index + 1);
            setCurrentPath(newPath);
            const folderName = newPath[newPath.length - 1];
            if (folderName === 'Media Library') {
                setFiles(mockFiles);
            } else {
                setFiles(folderContents[folderName] || []);
            }
        }
    };

    const sectionPaperSx = {
        p: 2,
        bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
        border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
    };

    return (
        <Box>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Media Library
                    </Typography>
                    <Breadcrumbs>
                        {currentPath.map((path, index) => (
                            <Link
                                key={index}
                                underline={index === currentPath.length - 1 ? 'none' : 'hover'}
                                color={index === currentPath.length - 1 ? 'text.primary' : 'inherit'}
                                onClick={() => handleBreadcrumbClick(index)}
                                sx={{ cursor: index < currentPath.length - 1 ? 'pointer' : 'default' }}
                            >
                                {path}
                            </Link>
                        ))}
                    </Breadcrumbs>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="outlined" startIcon={<NewFolderIcon />}>
                        New Folder
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<UploadIcon />}
                        onClick={() => setUploadDialogOpen(true)}
                        sx={{
                            bgcolor: '#171717',
                            '&:hover': { bgcolor: '#262626' },
                        }}
                    >
                        Upload
                    </Button>
                </Box>
            </Box>

            {/* Toolbar */}
            <Paper sx={{ ...sectionPaperSx, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <TextField
                    size="small"
                    placeholder="Search files..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ width: 300 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        {filteredFiles.length} items
                    </Typography>
                    <ToggleButtonGroup
                        value={viewMode}
                        exclusive
                        onChange={(_, v) => v && setViewMode(v)}
                        size="small"
                    >
                        <ToggleButton value="grid">
                            <GridViewIcon fontSize="small" />
                        </ToggleButton>
                        <ToggleButton value="list">
                            <ListViewIcon fontSize="small" />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            </Paper>

            {/* File Grid/List */}
            {viewMode === 'grid' ? (
                <Grid container spacing={2}>
                    {filteredFiles.map((file) => (
                        <Grid key={file.id} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
                            <Card
                                onClick={() => handleFileClick(file)}
                                sx={{
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                                    '&:hover': {
                                        borderColor: theme.palette.primary.main,
                                        boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        height: 120,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        bgcolor: isDarkMode ? '#0A0A0A' : '#F5F5F5',
                                        position: 'relative',
                                    }}
                                >
                                    {file.type === 'image' && file.url ? (
                                        <CardMedia
                                            component="img"
                                            height="120"
                                            image={file.url}
                                            alt={file.name}
                                            sx={{ objectFit: 'cover' }}
                                        />
                                    ) : (
                                        fileTypeIcons[file.type]
                                    )}
                                    <IconButton
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            top: 4,
                                            right: 4,
                                            bgcolor: alpha(isDarkMode ? '#000' : '#FFF', 0.7),
                                        }}
                                        onClick={(e) => handleMenuOpen(e, file)}
                                    >
                                        <MoreIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                                <CardContent sx={{ py: 1, px: 1.5 }}>
                                    <Typography variant="body2" noWrap fontWeight={500}>
                                        {file.name}
                                    </Typography>
                                    {file.size && (
                                        <Typography variant="caption" color="text.secondary">
                                            {file.size}
                                        </Typography>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Paper sx={sectionPaperSx}>
                    {filteredFiles.map((file, index) => (
                        <Box
                            key={file.id}
                            onClick={() => handleFileClick(file)}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                py: 1.5,
                                px: 1,
                                borderBottom: index < filteredFiles.length - 1 ? `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}` : 'none',
                                '&:hover': { bgcolor: isDarkMode ? '#0A0A0A' : '#F5F5F5' },
                                cursor: 'pointer',
                            }}
                        >
                            <Box sx={{ mr: 2 }}>
                                {file.type === 'image' && file.url ? (
                                    <Box
                                        component="img"
                                        src={file.url}
                                        alt={file.name}
                                        sx={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 1 }}
                                    />
                                ) : (
                                    <Box sx={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {fileTypeIcons[file.type]}
                                    </Box>
                                )}
                            </Box>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography variant="body2" fontWeight={500} noWrap>
                                    {file.name}
                                </Typography>
                            </Box>
                            <Box sx={{ width: 100, textAlign: 'right' }}>
                                <Typography variant="caption" color="text.secondary">
                                    {file.size || '-'}
                                </Typography>
                            </Box>
                            <Box sx={{ width: 100, textAlign: 'right' }}>
                                <Typography variant="caption" color="text.secondary">
                                    {file.uploadedAt || file.modifiedAt}
                                </Typography>
                            </Box>
                            <IconButton size="small" onClick={(e) => handleMenuOpen(e, file)}>
                                <MoreIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    ))}
                </Paper>
            )}

            {/* Context Menu */}
            <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
                <MenuItem onClick={handleShowDetails}>
                    <ListItemIcon><InfoIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Details</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon><DownloadIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Download</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon><CopyIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Copy URL</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleRenameClick}>
                    <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Rename</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                    <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>
            </Menu>

            {/* Upload Dialog */}
            <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Upload Files</DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            border: `2px dashed ${isDarkMode ? '#404040' : '#D4D4D4'}`,
                            borderRadius: 2,
                            p: 6,
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            '&:hover': {
                                borderColor: theme.palette.primary.main,
                                bgcolor: alpha(theme.palette.primary.main, 0.04),
                            },
                        }}
                        onClick={handleUpload}
                    >
                        <UploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="body1" gutterBottom>
                            Click to upload or drag and drop
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            PNG, JPG, GIF, PDF up to 10MB
                        </Typography>
                    </Box>
                    {uploadProgress !== null && (
                        <Box sx={{ mt: 2 }}>
                            <LinearProgress variant="determinate" value={uploadProgress} />
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                                Uploading... {uploadProgress}%
                            </Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 3, pt: 0 }}>
                    <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>

            {/* Details Dialog */}
            <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle>File Details</DialogTitle>
                <DialogContent>
                    {selectedFile && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {selectedFile.type === 'image' && selectedFile.url && (
                                <Box
                                    component="img"
                                    src={selectedFile.url}
                                    alt={selectedFile.name}
                                    sx={{ width: '100%', borderRadius: 1 }}
                                />
                            )}
                            <Box>
                                <Typography variant="caption" color="text.secondary">Name</Typography>
                                <Typography variant="body2">{selectedFile.name}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" color="text.secondary">Type</Typography>
                                <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>{selectedFile.type}</Typography>
                            </Box>
                            {selectedFile.size && (
                                <Box>
                                    <Typography variant="caption" color="text.secondary">Size</Typography>
                                    <Typography variant="body2">{selectedFile.size}</Typography>
                                </Box>
                            )}
                            <Box>
                                <Typography variant="caption" color="text.secondary">Date</Typography>
                                <Typography variant="body2">{selectedFile.uploadedAt || selectedFile.modifiedAt}</Typography>
                            </Box>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setDetailsOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>

            {/* Rename Dialog */}
            <Dialog open={renameDialogOpen} onClose={() => setRenameDialogOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle>Rename</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        label="New name"
                        sx={{ mt: 1 }}
                        onKeyDown={(e) => e.key === 'Enter' && handleRenameConfirm()}
                    />
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setRenameDialogOpen(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleRenameConfirm}
                        disabled={!renameValue.trim()}
                        sx={{ bgcolor: '#171717', '&:hover': { bgcolor: '#262626' } }}
                    >
                        Rename
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
