import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    TextField,
    InputAdornment,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Chip,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Badge,
    useTheme,
    Divider,
} from '@mui/material';
import {
    Add as AddIcon,
    Search as SearchIcon,
    Delete as DeleteIcon,
    PushPin as PinIcon,
    PushPinOutlined as PinOutlinedIcon,
    FormatListBulleted as AllNotesIcon,
    Person as PersonIcon,
    Work as WorkIcon,
    Lightbulb as IdeasIcon,
    Archive as ArchiveIcon,
    Circle as ColorIcon,
} from '@mui/icons-material';
import {
    mockNotes,
    noteFolders,
    getNoteStats,
    type Note,
    type NoteFolder,
} from '../../data/mockNotes';

type SelectedFolder = 'All' | 'Pinned' | NoteFolder;
type SortOption = 'updatedAt' | 'createdAt' | 'title';

const NOTE_COLORS = [
    { name: 'None', value: undefined },
    { name: 'Blue', value: '#DBEAFE' },
    { name: 'Green', value: '#D1FAE5' },
    { name: 'Yellow', value: '#FEF3C7' },
    { name: 'Red', value: '#FEE2E2' },
    { name: 'Purple', value: '#EDE9FE' },
];

export function NotesPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const [notes, setNotes] = useState<Note[]>(mockNotes);
    const [selectedFolder, setSelectedFolder] = useState<SelectedFolder>('All');
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('updatedAt');
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const [editedFolder, setEditedFolder] = useState<NoteFolder>('Personal');
    const [editedTags, setEditedTags] = useState('');
    const [editedColor, setEditedColor] = useState<string | undefined>(undefined);
    const [editedIsPinned, setEditedIsPinned] = useState(false);

    const selectedNote = notes.find((n) => n.id === selectedNoteId);
    const stats = useMemo(() => getNoteStats(notes), [notes]);
    const parsedEditedTags = useMemo(
        () =>
            editedTags
                .split(',')
                .map((tag) => tag.trim())
                .filter((tag) => tag.length > 0),
        [editedTags],
    );
    const hasDraftChanges = useMemo(() => {
        if (!selectedNote) return false;

        return (
            (editedTitle || 'Untitled Note') !== selectedNote.title ||
            editedContent !== selectedNote.content ||
            editedFolder !== selectedNote.folder ||
            editedColor !== selectedNote.color ||
            editedIsPinned !== selectedNote.isPinned ||
            parsedEditedTags.length !== selectedNote.tags.length ||
            parsedEditedTags.some((tag, index) => tag !== selectedNote.tags[index])
        );
    }, [
        editedColor,
        editedContent,
        editedFolder,
        editedIsPinned,
        editedTitle,
        parsedEditedTags,
        selectedNote,
    ]);

    // Filter and sort notes
    const filteredNotes = useMemo(() => {
        let result = [...notes];

        // Filter by folder
        if (selectedFolder === 'Pinned') {
            result = result.filter((n) => n.isPinned);
        } else if (selectedFolder !== 'All') {
            result = result.filter((n) => n.folder === selectedFolder);
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (n) =>
                    n.title.toLowerCase().includes(query) ||
                    n.content.toLowerCase().includes(query) ||
                    n.tags.some((tag) => tag.toLowerCase().includes(query))
            );
        }

        // Sort
        result.sort((a, b) => {
            if (sortBy === 'updatedAt') {
                return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
            } else if (sortBy === 'createdAt') {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            } else {
                return a.title.localeCompare(b.title);
            }
        });

        // Pinned notes always on top
        const pinned = result.filter((n) => n.isPinned);
        const unpinned = result.filter((n) => !n.isPinned);
        return [...pinned, ...unpinned];
    }, [notes, selectedFolder, searchQuery, sortBy]);

    const handleCreateNote = () => {
        const newNote: Note = {
            id: `note-${Date.now()}`,
            title: 'Untitled Note',
            content: '',
            folder: selectedFolder !== 'All' && selectedFolder !== 'Pinned' ? (selectedFolder as NoteFolder) : 'Personal',
            tags: [],
            isPinned: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        setNotes((prev) => [newNote, ...prev]);
        setSelectedNoteId(newNote.id);
        setEditedTitle(newNote.title);
        setEditedContent(newNote.content);
        setEditedFolder(newNote.folder);
        setEditedTags('');
        setEditedColor(undefined);
        setEditedIsPinned(false);
    };

    const handleSelectNote = (note: Note) => {
        setSelectedNoteId(note.id);
        setEditedTitle(note.title);
        setEditedContent(note.content);
        setEditedFolder(note.folder);
        setEditedTags(note.tags.join(', '));
        setEditedColor(note.color);
        setEditedIsPinned(note.isPinned);
    };

    const handleSaveNote = useCallback((
        overrides: Partial<Pick<Note, 'title' | 'content' | 'folder' | 'tags' | 'color' | 'isPinned'>> = {},
    ) => {
        if (!selectedNoteId) return;

        setNotes((prev) =>
            prev.map((n) =>
                n.id === selectedNoteId
                    ? {
                        ...n,
                        title: 'title' in overrides ? (overrides.title || 'Untitled Note') : (editedTitle || 'Untitled Note'),
                        content: 'content' in overrides ? (overrides.content || '') : editedContent,
                        folder: 'folder' in overrides ? (overrides.folder || editedFolder) : editedFolder,
                        tags: 'tags' in overrides ? (overrides.tags || []) : parsedEditedTags,
                        color: 'color' in overrides ? overrides.color : editedColor,
                        isPinned: 'isPinned' in overrides ? !!overrides.isPinned : editedIsPinned,
                        updatedAt: new Date(),
                    }
                    : n
            )
        );
    }, [
        editedColor,
        editedContent,
        editedFolder,
        editedIsPinned,
        editedTitle,
        parsedEditedTags,
        selectedNoteId,
    ]);

    const handleDeleteNote = () => {
        if (!selectedNoteId) return;
        setNotes((prev) => prev.filter((n) => n.id !== selectedNoteId));
        setSelectedNoteId(null);
    };

    const handleTogglePin = () => {
        const nextPinned = !editedIsPinned;
        setEditedIsPinned(nextPinned);
        handleSaveNote({ isPinned: nextPinned });
    };

    // Auto-save after typing
    useEffect(() => {
        if (!selectedNoteId || !hasDraftChanges) return;

        const timer = window.setTimeout(() => {
            handleSaveNote();
        }, 1000);

        return () => {
            window.clearTimeout(timer);
        };
    }, [
        editedColor,
        editedContent,
        editedFolder,
        editedIsPinned,
        editedTags,
        editedTitle,
        handleSaveNote,
        hasDraftChanges,
        selectedNoteId,
    ]);

    const getFolderIcon = (folderId: SelectedFolder) => {
        switch (folderId) {
            case 'All':
                return <AllNotesIcon />;
            case 'Pinned':
                return <PinIcon />;
            case 'Personal':
                return <PersonIcon />;
            case 'Work':
                return <WorkIcon />;
            case 'Ideas':
                return <IdeasIcon />;
            case 'Archive':
                return <ArchiveIcon />;
        }
    };

    const getFolderCount = (folderId: SelectedFolder): number => {
        if (folderId === 'All') return stats.total;
        if (folderId === 'Pinned') return stats.pinned;
        return stats.byFolder[folderId as NoteFolder] || 0;
    };

    const getContentPreview = (content: string): string => {
        return content
            .replace(/[#*`\n]/g, ' ')
            .trim()
            .substring(0, 100);
    };

    const getRelativeTime = (date: Date): string => {
        const now = new Date();
        const diffMs = now.getTime() - new Date(date).getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return new Date(date).toLocaleDateString();
    };

    return (
        <Box sx={{ display: 'flex', gap: 2, height: 'calc(100vh - 100px)' }}>
            {/* Sidebar */}
            <Box
                sx={{
                    width: 280,
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleCreateNote}
                    sx={{
                        bgcolor: '#171717',
                        color: '#FAFAFA',
                        '&:hover': { bgcolor: '#262626' },
                    }}
                    fullWidth
                >
                    New Note
                </Button>

                <Box
                    sx={{
                        bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                        border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                        borderRadius: 2,
                        p: 2,
                    }}
                >
                    <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                        Folders
                    </Typography>
                    <List disablePadding>
                        <ListItemButton
                            selected={selectedFolder === 'All'}
                            onClick={() => setSelectedFolder('All')}
                            sx={{ borderRadius: 1, mb: 0.5 }}
                        >
                            <ListItemIcon sx={{ minWidth: 36 }}>
                                {getFolderIcon('All')}
                            </ListItemIcon>
                            <ListItemText primary="All Notes" />
                            <Badge badgeContent={getFolderCount('All')} color="default" />
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedFolder === 'Pinned'}
                            onClick={() => setSelectedFolder('Pinned')}
                            sx={{ borderRadius: 1, mb: 1 }}
                        >
                            <ListItemIcon sx={{ minWidth: 36 }}>
                                {getFolderIcon('Pinned')}
                            </ListItemIcon>
                            <ListItemText primary="Pinned" />
                            <Badge badgeContent={getFolderCount('Pinned')} color="warning" />
                        </ListItemButton>

                        <Divider sx={{ my: 1 }} />

                        {noteFolders.map((folder) => (
                            <ListItemButton
                                key={folder.id}
                                selected={selectedFolder === folder.id}
                                onClick={() => setSelectedFolder(folder.id)}
                                sx={{ borderRadius: 1, mb: 0.5 }}
                            >
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                    {getFolderIcon(folder.id)}
                                </ListItemIcon>
                                <ListItemText primary={folder.name} />
                                <Badge
                                    badgeContent={getFolderCount(folder.id)}
                                    sx={{
                                        '& .MuiBadge-badge': {
                                            bgcolor: folder.color,
                                            color: '#fff',
                                        },
                                    }}
                                />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
            </Box>

            {/* Notes List */}
            <Box
                sx={{
                    width: 320,
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <TextField
                    size="small"
                    placeholder="Search notes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    }}
                    fullWidth
                />

                <FormControl size="small" fullWidth>
                    <InputLabel>Sort by</InputLabel>
                    <Select
                        value={sortBy}
                        label="Sort by"
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                    >
                        <MenuItem value="updatedAt">Last Modified</MenuItem>
                        <MenuItem value="createdAt">Date Created</MenuItem>
                        <MenuItem value="title">Title</MenuItem>
                    </Select>
                </FormControl>

                <Box
                    sx={{
                        flex: 1,
                        overflow: 'auto',
                        bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                        border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                        borderRadius: 2,
                    }}
                >
                    {filteredNotes.length === 0 ? (
                        <Box sx={{ p: 4, textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                No notes found
                            </Typography>
                        </Box>
                    ) : (
                        <List disablePadding>
                            {filteredNotes.map((note, index) => (
                                <Box key={note.id}>
                                    <ListItemButton
                                        selected={selectedNoteId === note.id}
                                        onClick={() => handleSelectNote(note)}
                                        sx={{
                                            p: 2,
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                            borderLeft: note.color ? `4px solid ${note.color}` : 'none',
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 0.5 }}>
                                            {note.isPinned && (
                                                <PinIcon fontSize="small" sx={{ mr: 1, color: 'warning.main' }} />
                                            )}
                                            <Typography
                                                variant="subtitle2"
                                                fontWeight={600}
                                                sx={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                                            >
                                                {note.title}
                                            </Typography>
                                        </Box>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{
                                                mb: 1,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                            }}
                                        >
                                            {getContentPreview(note.content) || 'Empty note'}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', width: '100%' }}>
                                            <Typography variant="caption" color="text.secondary">
                                                {getRelativeTime(note.updatedAt)}
                                            </Typography>
                                            {note.tags.slice(0, 2).map((tag) => (
                                                <Chip key={tag} label={tag} size="small" />
                                            ))}
                                            {note.tags.length > 2 && (
                                                <Chip label={`+${note.tags.length - 2}`} size="small" />
                                            )}
                                        </Box>
                                    </ListItemButton>
                                    {index < filteredNotes.length - 1 && <Divider />}
                                </Box>
                            ))}
                        </List>
                    )}
                </Box>
            </Box>

            {/* Note Editor */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    minWidth: 0,
                }}
            >
                {selectedNote ? (
                    <Box
                        sx={{
                            flex: 1,
                            bgcolor: selectedNote.color || (isDarkMode ? '#171717' : '#FFFFFF'),
                            border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                            borderRadius: 2,
                            p: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        {/* Editor Header */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IconButton onClick={handleTogglePin} color={editedIsPinned ? 'warning' : 'default'}>
                                {editedIsPinned ? <PinIcon /> : <PinOutlinedIcon />}
                            </IconButton>
                            <Box sx={{ flex: 1 }} />
                            <FormControl size="small" sx={{ minWidth: 120 }}>
                                <InputLabel>Folder</InputLabel>
                                <Select
                                    value={editedFolder}
                                    label="Folder"
                                    onChange={(e) => {
                                        const nextFolder = e.target.value as NoteFolder;
                                        setEditedFolder(nextFolder);
                                        handleSaveNote({ folder: nextFolder });
                                    }}
                                >
                                    {noteFolders.map((folder) => (
                                        <MenuItem key={folder.id} value={folder.id}>
                                            {folder.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl size="small" sx={{ minWidth: 100 }}>
                                <InputLabel>Color</InputLabel>
                                <Select
                                    value={editedColor || ''}
                                    label="Color"
                                    onChange={(e) => {
                                        const nextColor = e.target.value || undefined;
                                        setEditedColor(nextColor);
                                        handleSaveNote({ color: nextColor });
                                    }}
                                >
                                    {NOTE_COLORS.map((color) => (
                                        <MenuItem key={color.name} value={color.value || ''}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                {color.value && (
                                                    <ColorIcon sx={{ fontSize: 16, color: color.value }} />
                                                )}
                                                {color.name}
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <IconButton onClick={handleDeleteNote} color="error">
                                <DeleteIcon />
                            </IconButton>
                        </Box>

                        {/* Title */}
                        <TextField
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            placeholder="Note title"
                            variant="standard"
                            fullWidth
                            InputProps={{
                                disableUnderline: true,
                                sx: {
                                    fontSize: '1.5rem',
                                    fontWeight: 600,
                                },
                            }}
                        />

                        {/* Content */}
                        <TextField
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            placeholder="Start writing..."
                            multiline
                            fullWidth
                            variant="standard"
                            InputProps={{
                                disableUnderline: true,
                                sx: {
                                    fontSize: '0.95rem',
                                    fontFamily: 'monospace',
                                },
                            }}
                            sx={{ flex: 1 }}
                        />

                        {/* Tags */}
                        <TextField
                            value={editedTags}
                            onChange={(e) => setEditedTags(e.target.value)}
                            placeholder="Tags (comma separated)"
                            size="small"
                            fullWidth
                        />

                        {/* Footer */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" color="text.secondary">
                                Created: {new Date(selectedNote.createdAt).toLocaleString()}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Updated: {getRelativeTime(selectedNote.updatedAt)}
                            </Typography>
                        </Box>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            flex: 1,
                            bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                            border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Box sx={{ textAlign: 'center', p: 4 }}>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                No note selected
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Select a note from the list or create a new one
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
