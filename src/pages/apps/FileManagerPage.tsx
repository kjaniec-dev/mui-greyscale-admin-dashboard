import { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    Breadcrumbs,
    Link,
    ToggleButtonGroup,
    ToggleButton,
    Button,
    useTheme,
} from '@mui/material';
import {
    GridView as GridViewIcon,
    ViewList as ListViewIcon,
    Home as HomeIcon,
    CreateNewFolder as CreateFolderIcon,
} from '@mui/icons-material';
import { FolderTree } from './components/FolderTree';
import { FileGrid } from './components/FileGrid';
import { FileList } from './components/FileList';
import { getFilesInFolder, getBreadcrumbs } from '../../data/mockFiles';

type ViewMode = 'grid' | 'list';

export function FileManagerPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>('grid');

    const files = useMemo(() => {
        const items = getFilesInFolder(currentFolderId);
        // Sort: folders first, then by name
        return items.sort((a, b) => {
            if (a.type === 'folder' && b.type !== 'folder') return -1;
            if (a.type !== 'folder' && b.type === 'folder') return 1;
            return a.name.localeCompare(b.name);
        });
    }, [currentFolderId]);

    const breadcrumbs = useMemo(() => getBreadcrumbs(currentFolderId), [currentFolderId]);

    const handleOpenFolder = (folderId: string) => {
        setCurrentFolderId(folderId);
    };

    const handleBreadcrumbClick = (folderId: string | null) => {
        setCurrentFolderId(folderId);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)' }}>
            {/* Page Header */}
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        File Manager
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Browse and manage your files.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<CreateFolderIcon />}
                    sx={{
                        bgcolor: '#171717',
                        color: '#FAFAFA',
                        '&:hover': { bgcolor: '#262626' },
                    }}
                >
                    New Folder
                </Button>
            </Box>

            {/* File Manager Layout */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    border: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
                    borderRadius: 2,
                    overflow: 'hidden',
                }}
            >
                {/* Folder Tree */}
                <FolderTree
                    selectedFolderId={currentFolderId}
                    onSelectFolder={setCurrentFolderId}
                />

                {/* Content Area */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', bgcolor: isDarkMode ? '#171717' : '#FFFFFF' }}>
                    {/* Toolbar */}
                    <Box
                        sx={{
                            p: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderBottom: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
                        }}
                    >
                        {/* Breadcrumbs */}
                        <Breadcrumbs separator="›">
                            <Link
                                component="button"
                                underline="hover"
                                color={currentFolderId === null ? 'text.primary' : 'inherit'}
                                onClick={() => handleBreadcrumbClick(null)}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    fontWeight: currentFolderId === null ? 600 : 400,
                                }}
                            >
                                <HomeIcon sx={{ fontSize: 18 }} />
                                My Files
                            </Link>
                            {breadcrumbs.map((crumb, index) => (
                                <Link
                                    key={crumb.id}
                                    component="button"
                                    underline="hover"
                                    color={index === breadcrumbs.length - 1 ? 'text.primary' : 'inherit'}
                                    onClick={() => handleBreadcrumbClick(crumb.id)}
                                    sx={{ fontWeight: index === breadcrumbs.length - 1 ? 600 : 400 }}
                                >
                                    {crumb.name}
                                </Link>
                            ))}
                        </Breadcrumbs>

                        {/* View Toggle */}
                        <ToggleButtonGroup
                            value={viewMode}
                            exclusive
                            onChange={(_, value) => value && setViewMode(value)}
                            size="small"
                        >
                            <ToggleButton value="grid">
                                <GridViewIcon sx={{ fontSize: 18 }} />
                            </ToggleButton>
                            <ToggleButton value="list">
                                <ListViewIcon sx={{ fontSize: 18 }} />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>

                    {/* Files Grid/List */}
                    <Box sx={{ flex: 1, overflow: 'auto' }}>
                        {viewMode === 'grid' ? (
                            <FileGrid files={files} onOpenFolder={handleOpenFolder} />
                        ) : (
                            <FileList files={files} onOpenFolder={handleOpenFolder} />
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
