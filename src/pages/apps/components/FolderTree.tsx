import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    useTheme,
} from '@mui/material';
import {
    Folder as FolderIcon,
    FolderOpen as FolderOpenIcon,
    ExpandLess,
    ExpandMore,
} from '@mui/icons-material';
import { useState } from 'react';
import { mockFiles, type FileItem } from '../../../data/mockFiles';

interface FolderTreeProps {
    selectedFolderId: string | null;
    onSelectFolder: (folderId: string | null) => void;
}

interface FolderNodeProps {
    folder: FileItem;
    level: number;
    selectedFolderId: string | null;
    onSelectFolder: (folderId: string | null) => void;
    children: FileItem[];
}

function FolderNode({ folder, level, selectedFolderId, onSelectFolder, children }: FolderNodeProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const [open, setOpen] = useState(level === 0);
    const hasChildren = children.length > 0;
    const isSelected = selectedFolderId === folder.id;

    const subFolders = mockFiles.filter(
        (f) => f.type === 'folder' && f.parentId === folder.id
    );

    return (
        <>
            <ListItemButton
                onClick={() => {
                    onSelectFolder(folder.id);
                    if (hasChildren) setOpen(!open);
                }}
                selected={isSelected}
                sx={{
                    pl: 2 + level * 2,
                    py: 0.75,
                    borderRadius: 1,
                    mb: 0.25,
                    '&.Mui-selected': {
                        bgcolor: isDarkMode ? '#262626' : '#E5E5E5',
                        '&:hover': {
                            bgcolor: isDarkMode ? '#262626' : '#E5E5E5',
                        },
                    },
                }}
            >
                <ListItemIcon sx={{ minWidth: 32 }}>
                    {isSelected ? (
                        <FolderOpenIcon sx={{ fontSize: 20, color: isDarkMode ? '#A3A3A3' : '#525252' }} />
                    ) : (
                        <FolderIcon sx={{ fontSize: 20, color: isDarkMode ? '#737373' : '#737373' }} />
                    )}
                </ListItemIcon>
                <ListItemText
                    primary={folder.name}
                    slotProps={{ primary: { variant: 'body2', sx: { sx: { fontWeight: isSelected ? 500 : 400 } } ,
                        noWrap: true,
                     } }}
                />
                {hasChildren && (open ? <ExpandLess sx={{ fontSize: 18 }} /> : <ExpandMore sx={{ fontSize: 18 }} />)}
            </ListItemButton>

            {hasChildren && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List disablePadding>
                        {subFolders.map((subFolder) => (
                            <FolderNode
                                key={subFolder.id}
                                folder={subFolder}
                                level={level + 1}
                                selectedFolderId={selectedFolderId}
                                onSelectFolder={onSelectFolder}
                                children={mockFiles.filter(f => f.type === 'folder' && f.parentId === subFolder.id)}
                            />
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );
}

export function FolderTree({ selectedFolderId, onSelectFolder }: FolderTreeProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const rootFolders = mockFiles.filter((f) => f.type === 'folder' && f.parentId === null);

    return (
        <Box
            sx={{
                width: 240,
                flexShrink: 0,
                borderRight: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
                bgcolor: isDarkMode ? '#1A1A1A' : '#FAFAFA',
                overflow: 'auto',
            }}
        >
            <List sx={{ p: 1 }}>
                <ListItemButton
                    onClick={() => onSelectFolder(null)}
                    selected={selectedFolderId === null}
                    sx={{
                        py: 0.75,
                        borderRadius: 1,
                        mb: 0.25,
                        '&.Mui-selected': {
                            bgcolor: isDarkMode ? '#262626' : '#E5E5E5',
                        },
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                        <FolderIcon sx={{ fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText
                        primary="My Files"
                        slotProps={{ primary: { variant: 'body2', sx: { fontWeight: 500  }  } }}
                    />
                </ListItemButton>

                {rootFolders.map((folder) => (
                    <FolderNode
                        key={folder.id}
                        folder={folder}
                        level={0}
                        selectedFolderId={selectedFolderId}
                        onSelectFolder={onSelectFolder}
                        children={mockFiles.filter(f => f.type === 'folder' && f.parentId === folder.id)}
                    />
                ))}
            </List>
        </Box>
    );
}
