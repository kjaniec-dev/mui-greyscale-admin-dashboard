import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Typography,
    MenuItem,
    Chip,
    Stack,
    IconButton,
    useTheme,
} from '@mui/material';
import {
    Close as CloseIcon,
    FormatListBulleted as ListIcon,
    Label as TagIcon,
} from '@mui/icons-material';
import { type Task, taskLists, type TaskListType, type TaskPriority } from '../../../data/mockTasks';

interface TaskDialogProps {
    open: boolean;
    onClose: () => void;
    task: Task | null;
    onSave: (task: Partial<Task>) => void;
}

const PRIORITIES: TaskPriority[] = ['Low', 'Medium', 'High'];

export function TaskDialog({ open, onClose, task, onSave }: TaskDialogProps) {
    const theme = useTheme();

    // Form State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<TaskPriority>('Medium');
    const [list, setList] = useState<TaskListType>('Personal');
    const [dueDate, setDueDate] = useState<string>('');
    const [tagsText, setTagsText] = useState('');

    useEffect(() => {
        if (open) {
            if (task) {
                setTitle(task.title);
                setDescription(task.description || '');
                setPriority(task.priority);
                setList(task.list);
                setTagsText(task.tags.join(', '));

                if (task.dueDate) {
                    // Format for date-local input YYYY-MM-DD
                    const d = new Date(task.dueDate);
                    const month = (d.getMonth() + 1).toString().padStart(2, '0');
                    const day = d.getDate().toString().padStart(2, '0');
                    setDueDate(`${d.getFullYear()}-${month}-${day}`);
                } else {
                    setDueDate('');
                }
            } else {
                // Reset for new task
                setTitle('');
                setDescription('');
                setPriority('Medium');
                setList('Personal');
                setDueDate('');
                setTagsText('');
            }
        }
    }, [open, task]);

    const handleSave = () => {
        const tags = tagsText.split(',').map(t => t.trim()).filter(t => t.length > 0);

        onSave({
            title,
            description,
            priority,
            list,
            tags,
            dueDate: dueDate ? new Date(dueDate) : undefined,
        });
    };

    const isEdit = Boolean(task);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 2 }
            }}
        >
            <DialogTitle sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: `1px solid ${theme.palette.divider}`,
                pb: 2
            }}>
                <Typography variant="h6" fontWeight={600}>
                    {isEdit ? 'Edit Task' : 'Create New Task'}
                </Typography>
                <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 3, pb: 2 }}>
                <Stack spacing={3} sx={{ mt: 1 }}>
                    <TextField
                        autoFocus
                        label="Task Title"
                        fullWidth
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="What needs to be done?"
                    />

                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add more details..."
                    />

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                            select
                            label="List"
                            fullWidth
                            value={list}
                            onChange={(e) => setList(e.target.value as TaskListType)}
                            InputProps={{
                                startAdornment: <ListIcon color="action" sx={{ mr: 1, ml: 0.5 }} fontSize="small" />
                            }}
                        >
                            {taskLists.map(l => (
                                <MenuItem key={l.id} value={l.id}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: l.color }} />
                                        {l.name}
                                    </Box>
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            select
                            label="Priority"
                            fullWidth
                            value={priority}
                            onChange={(e) => setPriority(e.target.value as TaskPriority)}
                        >
                            {PRIORITIES.map(p => (
                                <MenuItem key={p} value={p}>
                                    <Chip
                                        label={p}
                                        size="small"
                                        color={p === 'High' ? 'error' : p === 'Medium' ? 'warning' : 'default'}
                                        sx={{ height: 20, fontSize: '0.75rem', fontWeight: 600 }}
                                    />
                                </MenuItem>
                            ))}
                        </TextField>
                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                            label="Due Date"
                            type="date"
                            fullWidth
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />

                        <TextField
                            label="Tags"
                            fullWidth
                            value={tagsText}
                            onChange={(e) => setTagsText(e.target.value)}
                            placeholder="urgent, frontend, bug"
                            helperText="Comma separated"
                            InputProps={{
                                startAdornment: <TagIcon color="action" sx={{ mr: 1, ml: 0.5 }} fontSize="small" />
                            }}
                        />
                    </Stack>
                </Stack>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
                <Button onClick={onClose} color="inherit">
                    Cancel
                </Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    disabled={!title.trim()}
                    sx={{
                        bgcolor: 'text.primary',
                        color: 'background.paper',
                        '&:hover': {
                            bgcolor: theme.palette.mode === 'dark' ? '#A3A3A3' : '#404040',
                        },
                    }}
                >
                    {isEdit ? 'Save Changes' : 'Create Task'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
