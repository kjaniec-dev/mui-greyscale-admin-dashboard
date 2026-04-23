import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Box,
    useTheme,
} from '@mui/material';
import { getFileIcon, formatFileSize, type FileItem } from '../../../data/mockFiles';

interface FileListProps {
    files: FileItem[];
    onOpenFolder: (folderId: string) => void;
}

function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

export function FileList({ files, onOpenFolder }: FileListProps) {
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
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: 600, width: 100 }}>Size</TableCell>
                        <TableCell sx={{ fontWeight: 600, width: 140 }}>Modified</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {files.map((file) => (
                        <TableRow
                            key={file.id}
                            hover
                            onClick={() => file.type === 'folder' && onOpenFolder(file.id)}
                            sx={{
                                cursor: file.type === 'folder' ? 'pointer' : 'default',
                                '&:hover': {
                                    bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                                },
                            }}
                        >
                            <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Typography sx={{ fontSize: 20 }}>
                                        {getFileIcon(file.type)}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: file.type === 'folder' ? 500 : 400 }}>
                                        {file.name}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2" color="text.secondary">
                                    {file.size ? formatFileSize(file.size) : '--'}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2" color="text.secondary">
                                    {formatDate(file.modified)}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
