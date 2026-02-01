import { useState, useCallback } from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Stack,
    useTheme,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { KanbanColumn } from './components/KanbanColumn';
import { initialKanbanData, type KanbanBoard, type KanbanTask } from '../../data/mockKanban';

interface TaskFormData {
    title: string;
    description: string;
    priority: KanbanTask['priority'];
    assignee: string;
}

export function KanbanPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const [board, setBoard] = useState<KanbanBoard>(initialKanbanData);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<KanbanTask | null>(null);
    const [targetColumnId, setTargetColumnId] = useState<string>('backlog');
    const [formData, setFormData] = useState<TaskFormData>({
        title: '',
        description: '',
        priority: 'Medium',
        assignee: '',
    });

    const handleDragEnd = useCallback((result: DropResult) => {
        const { destination, source, draggableId } = result;

        // Dropped outside a droppable
        if (!destination) return;

        // Dropped in the same position
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        setBoard((prevBoard) => {
            const newColumns = [...prevBoard.columns];

            // Find source and destination columns
            const sourceColIndex = newColumns.findIndex(c => c.id === source.droppableId);
            const destColIndex = newColumns.findIndex(c => c.id === destination.droppableId);

            if (sourceColIndex === -1 || destColIndex === -1) return prevBoard;

            // Get the task being moved
            const task = newColumns[sourceColIndex].tasks.find(t => t.id === draggableId);
            if (!task) return prevBoard;

            // Remove from source
            newColumns[sourceColIndex] = {
                ...newColumns[sourceColIndex],
                tasks: newColumns[sourceColIndex].tasks.filter(t => t.id !== draggableId),
            };

            // Add to destination
            const destTasks = [...newColumns[destColIndex].tasks];
            destTasks.splice(destination.index, 0, task);
            newColumns[destColIndex] = {
                ...newColumns[destColIndex],
                tasks: destTasks,
            };

            return { columns: newColumns };
        });
    }, []);

    const handleAddTask = (columnId: string) => {
        setTargetColumnId(columnId);
        setSelectedTask(null);
        setFormData({
            title: '',
            description: '',
            priority: 'Medium',
            assignee: '',
        });
        setDialogOpen(true);
    };

    const handleEditTask = (task: KanbanTask) => {
        setSelectedTask(task);
        setFormData({
            title: task.title,
            description: task.description || '',
            priority: task.priority,
            assignee: task.assignee || '',
        });
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedTask(null);
    };

    const handleSaveTask = () => {
        if (!formData.title.trim()) return;

        setBoard((prevBoard) => {
            const newColumns = [...prevBoard.columns];

            if (selectedTask) {
                // Update existing task
                const colIndex = newColumns.findIndex(c =>
                    c.tasks.some(t => t.id === selectedTask.id)
                );
                if (colIndex !== -1) {
                    newColumns[colIndex] = {
                        ...newColumns[colIndex],
                        tasks: newColumns[colIndex].tasks.map(t =>
                            t.id === selectedTask.id
                                ? {
                                    ...t,
                                    title: formData.title,
                                    description: formData.description || undefined,
                                    priority: formData.priority,
                                    assignee: formData.assignee || undefined,
                                }
                                : t
                        ),
                    };
                }
            } else {
                // Add new task
                const colIndex = newColumns.findIndex(c => c.id === targetColumnId);
                if (colIndex !== -1) {
                    const newTask: KanbanTask = {
                        id: `task-${Date.now()}`,
                        title: formData.title,
                        description: formData.description || undefined,
                        priority: formData.priority,
                        assignee: formData.assignee || undefined,
                    };
                    newColumns[colIndex] = {
                        ...newColumns[colIndex],
                        tasks: [...newColumns[colIndex].tasks, newTask],
                    };
                }
            }

            return { columns: newColumns };
        });

        handleDialogClose();
    };

    const handleDeleteTask = () => {
        if (!selectedTask) return;

        setBoard((prevBoard) => {
            const newColumns = prevBoard.columns.map(col => ({
                ...col,
                tasks: col.tasks.filter(t => t.id !== selectedTask.id),
            }));
            return { columns: newColumns };
        });

        handleDialogClose();
    };

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Kanban Board
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Drag and drop tasks to manage your workflow.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleAddTask('backlog')}
                    sx={{
                        bgcolor: '#171717',
                        color: '#FAFAFA',
                        '&:hover': {
                            bgcolor: '#262626',
                        },
                    }}
                >
                    Add Task
                </Button>
            </Box>

            {/* Kanban Board */}
            <DragDropContext onDragEnd={handleDragEnd}>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        overflowX: 'auto',
                        pb: 2,
                        minHeight: 500,
                    }}
                >
                    {board.columns.map((column) => (
                        <KanbanColumn
                            key={column.id}
                            column={column}
                            onAddTask={handleAddTask}
                            onEditTask={handleEditTask}
                        />
                    ))}
                </Box>
            </DragDropContext>

            {/* Task Form Dialog */}
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                        borderRadius: 2,
                    },
                }}
            >
                <DialogTitle sx={{ fontWeight: 600 }}>
                    {selectedTask ? 'Edit Task' : 'Add Task'}
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={3} sx={{ mt: 1 }}>
                        <TextField
                            label="Task Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            fullWidth
                            autoFocus
                        />
                        <TextField
                            label="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            fullWidth
                            multiline
                            rows={3}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Priority</InputLabel>
                            <Select
                                value={formData.priority}
                                label="Priority"
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value as KanbanTask['priority'] })}
                            >
                                <MenuItem value="Low">Low</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="High">High</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Assignee"
                            value={formData.assignee}
                            onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                            fullWidth
                            placeholder="e.g. John Doe"
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2, pt: 0 }}>
                    {selectedTask && (
                        <Button onClick={handleDeleteTask} color="error" sx={{ mr: 'auto' }}>
                            Delete
                        </Button>
                    )}
                    <Button onClick={handleDialogClose} color="inherit">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSaveTask}
                        variant="contained"
                        disabled={!formData.title.trim()}
                        sx={{
                            bgcolor: '#171717',
                            '&:hover': { bgcolor: '#262626' },
                        }}
                    >
                        {selectedTask ? 'Save' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
