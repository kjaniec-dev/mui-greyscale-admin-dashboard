import { Box, Card, CardActionArea, Typography, useTheme } from '@mui/material';
import { getFileIcon, formatFileSize, type FileItem } from '../../../data/mockFiles';

interface FileGridProps {
    files: FileItem[];
    onOpenFolder: (folderId: string) => void;
}

export function FileGrid({ files, onOpenFolder }: FileGridProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    if (files.length === 0) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography color="text.secondary">This folder is empty</Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: 2,
                p: 2,
            }}
        >
            {files.map((file) => (
                <Card
                    key={file.id}
                    sx={{
                        bgcolor: isDarkMode ? '#262626' : '#FFFFFF',
                        border: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
                        boxShadow: 'none',
                        '&:hover': {
                            borderColor: isDarkMode ? '#525252' : '#A3A3A3',
                            bgcolor: isDarkMode ? '#2a2a2a' : '#FAFAFA',
                        },
                    }}
                >
                    <CardActionArea
                        onClick={() => file.type === 'folder' && onOpenFolder(file.id)}
                        sx={{ p: 2, textAlign: 'center' }}
                    >
                        <Typography sx={{ fontSize: 40, mb: 1 }}>
                            {getFileIcon(file.type)}
                        </Typography>
                        <Typography
                            variant="body2"
                            noWrap
                            sx={{ fontWeight: 500,  mb: 0.5  }}
                        >
                            {file.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {file.size ? formatFileSize(file.size) : '--'}
                        </Typography>
                    </CardActionArea>
                </Card>
            ))}
        </Box>
    );
}
