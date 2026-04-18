import { useState, useMemo } from 'react';
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
    Checkbox,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    Badge,
    useTheme,
    alpha,
    Divider,
} from '@mui/material';
import {
    Add as AddIcon,
    Search as SearchIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    CheckCircle as CompletedIcon,
    RadioButtonUnchecked as ActiveIcon,
    Today as TodayIcon,
    Event as UpcomingIcon,
    FormatListBulleted as AllTasksIcon,
    Person as PersonIcon,
    Work as WorkIcon,
    ShoppingCart as ShoppingIcon,
    MoreHoriz as OtherIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
    mockTasks,
    taskLists,
    getTasksForToday,
    getUpcomingTasks,
    getTaskStats,
    type Task,
    type TaskListType,
    type TaskPriority,
} from '../../data/mockTasks';
import { useCurrentDate } from '../../hooks/useCurrentDate';

type ViewFilter = 'All' | 'Active' | 'Completed';
type SortOption = 'dueDate' | 'priority' | 'createdAt';
type SelectedList = 'All' | 'Today' | 'Upcoming' | TaskListType;

export function TasksPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const currentDate = useCurrentDate();

    const [tasks, setTasks] = useState<Task[]>(mockTasks);
    const [viewFilter, setViewFilter] = useState<ViewFilter>('All');
    const [sortBy, setSortBy] = useState<SortOption>('dueDate');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedList, setSelectedList] = useState<SelectedList>('All');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'Medium' as TaskPriority,
        list: 'Personal' as TaskListType,
        dueDate: null as Date | null,
        tags: '' as string,
    });

    const todayTasks = useMemo(() => getTasksForToday(tasks, currentDate), [tasks, currentDate]);
    const upcomingTasks = useMemo(() => getUpcomingTasks(tasks, currentDate), [tasks, currentDate]);
    const stats = useMemo(() => getTaskStats(tasks, currentDate), [tasks, currentDate]);

    // Filter and sort tasks
    const filteredTasks = useMemo(() => {
        let result = [...tasks];

        // Filter by completion status
        if (viewFilter === 'Active') {
            result = result.filter((t) => !t.completed);
        } else if (viewFilter === 'Completed') {
            result = result.filter((t) => t.completed);
        }

        // Filter by selected list
        if (selectedList === 'Today') {
            const todayTaskIds = new Set(todayTasks.map((task) => task.id));
            result = result.filter((task) => todayTaskIds.has(task.id));
        } else if (selectedList === 'Upcoming') {
            const upcomingTaskIds = new Set(upcomingTasks.map((task) => task.id));
            result = result.filter((task) => upcomingTaskIds.has(task.id));
        } else if (selectedList !== 'All') {
            result = result.filter((t) => t.list === selectedList);
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (t) =>
                    t.title.toLowerCase().includes(query) ||
                    t.description?.toLowerCase().includes(query) ||
                    t.tags.some((tag) => tag.toLowerCase().includes(query))
            );
        }

        // Sort
        result.sort((a, b) => {
            if (sortBy === 'dueDate') {
                if (!a.dueDate && !b.dueDate) return 0;
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;
                return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
            } else if (sortBy === 'priority') {
                const priorityOrder = { High: 0, Medium: 1, Low: 2 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            } else {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
        });

        return result;
    }, [tasks, viewFilter, sortBy, searchQuery, selectedList, todayTasks, upcomingTasks]);

    const handleToggleComplete = (taskId: string) => {
        setTasks((prev) =>
            prev.map((t) =>
                t.id === taskId
                    ? {
                        ...t,
                        completed: !t.completed,
                        completedAt: !t.completed ? new Date() : undefined,
                    }
                    : t
            )
        );
    };

    const handleAddTask = () => {
        setEditingTask(null);
        setFormData({
            title: '',
            description: '',
            priority: 'Medium',
            list: selectedList !== 'All' && selectedList !== 'Today' && selectedList !== 'Upcoming'
                ? (selectedList as TaskListType)
                : 'Personal',
            dueDate: null,
            tags: '',
        });
        setDialogOpen(true);
    };

    const handleEditTask = (task: Task) => {
        setEditingTask(task);
        setFormData({
            title: task.title,
            description: task.description || '',
            priority: task.priority,
            list: task.list,
            dueDate: task.dueDate || null,
            tags: task.tags.join(', '),
        });
        setDialogOpen(true);
    };

    const handleDeleteTask = (taskId: string) => {
        setTasks((prev) => prev.filter((t) => t.id !== taskId));
        if (editingTask?.id === taskId) {
            setDialogOpen(false);
        }
    };

    const handleSaveTask = () => {
        if (!formData.title.trim()) return;

        const taskData = {
            title: formData.title,
            description: formData.description || undefined,
            priority: formData.priority,
            list: formData.list,
            dueDate: formData.dueDate || undefined,
            tags: formData.tags
                .split(',')
                .map((t) => t.trim())
                .filter((t) => t.length > 0),
        };

        if (editingTask) {
            setTasks((prev) =>
                prev.map((t) =>
                    t.id === editingTask.id
                        ? { ...t, ...taskData }
                        : t
                )
            );
        } else {
            const newTask: Task = {
                id: `task-${Date.now()}`,
                ...taskData,
                completed: false,
                createdAt: new Date(),
            };
            setTasks((prev) => [...prev, newTask]);
        }

        setDialogOpen(false);
    };

    const getDueDateColor = (task: Task): string | undefined => {
        if (!task.dueDate || task.completed) return undefined;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dueDate = new Date(task.dueDate);
        dueDate.setHours(0, 0, 0, 0);

        if (dueDate < today) return isDarkMode ? '#EF4444' : '#DC2626'; // Overdue - red
        if (dueDate.getTime() === today.getTime()) return isDarkMode ? '#F59E0B' : '#D97706'; // Today - orange
        return isDarkMode ? '#3B82F6' : '#2563EB'; // Upcoming - blue
    };

    const getPriorityColor = (priority: TaskPriority): string => {
        switch (priority) {
            case 'High':
                return isDarkMode ? '#EF4444' : '#DC2626';
            case 'Medium':
                return isDarkMode ? '#F59E0B' : '#D97706';
            case 'Low':
                return isDarkMode ? '#10B981' : '#059669';
        }
    };

    const getListIcon = (listId: SelectedList) => {
        switch (listId) {
            case 'All':
                return <AllTasksIcon />;
            case 'Today':
                return <TodayIcon />;
            case 'Upcoming':
                return <UpcomingIcon />;
            case 'Personal':
                return <PersonIcon />;
            case 'Work':
                return <WorkIcon />;
            case 'Shopping':
                return <ShoppingIcon />;
            case 'Other':
                return <OtherIcon />;
        }
    };

    const getListCount = (listId: SelectedList): number => {
        if (listId === 'All') return tasks.filter((t) => !t.completed).length;
        if (listId === 'Today') return todayTasks.length;
        if (listId === 'Upcoming') return upcomingTasks.length;
        return tasks.filter((t) => t.list === listId && !t.completed).length;
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ display: 'flex', gap: 3, height: 'calc(100vh - 100px)' }}>
                {/* Sidebar */}
                <Box
                    sx={{
                        width: 280,
                        flexShrink: 0,
                        bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                        border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                        borderRadius: 2,
                        p: 2,
                        height: 'fit-content',
                    }}
                >
                    <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                        Lists
                    </Typography>
                    <List disablePadding>
                        <ListItemButton
                            selected={selectedList === 'All'}
                            onClick={() => setSelectedList('All')}
                            sx={{ borderRadius: 1, mb: 0.5 }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                {getListIcon('All')}
                            </ListItemIcon>
                            <ListItemText primary="All Tasks" />
                            <Badge badgeContent={getListCount('All')} color="primary" />
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedList === 'Today'}
                            onClick={() => setSelectedList('Today')}
                            sx={{ borderRadius: 1, mb: 0.5 }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                {getListIcon('Today')}
                            </ListItemIcon>
                            <ListItemText primary="Today" />
                            <Badge badgeContent={getListCount('Today')} color="warning" />
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedList === 'Upcoming'}
                            onClick={() => setSelectedList('Upcoming')}
                            sx={{ borderRadius: 1, mb: 1 }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                {getListIcon('Upcoming')}
                            </ListItemIcon>
                            <ListItemText primary="Upcoming" />
                            <Badge badgeContent={getListCount('Upcoming')} color="info" />
                        </ListItemButton>

                        <Divider sx={{ my: 1 }} />

                        {taskLists.map((list) => (
                            <ListItemButton
                                key={list.id}
                                selected={selectedList === list.id}
                                onClick={() => setSelectedList(list.id)}
                                sx={{ borderRadius: 1, mb: 0.5 }}
                            >
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    {getListIcon(list.id)}
                                </ListItemIcon>
                                <ListItemText primary={list.name} />
                                <Badge
                                    badgeContent={getListCount(list.id)}
                                    sx={{
                                        '& .MuiBadge-badge': {
                                            bgcolor: list.color,
                                        },
                                    }}
                                />
                            </ListItemButton>
                        ))}
                    </List>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CompletedIcon color="success" fontSize="small" />
                        <Typography variant="body2" color="text.secondary">
                            {stats.completed} completed
                        </Typography>
                    </Box>
                </Box>

                {/* Main Content */}
                <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    {/* Header */}
                    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                            <Typography variant="h4" fontWeight={700} gutterBottom>
                                Tasks
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Manage your to-do list and stay organized
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleAddTask}
                            sx={{
                                bgcolor: '#171717',
                                color: '#FAFAFA',
                                '&:hover': { bgcolor: '#262626' },
                            }}
                        >
                            Add Task
                        </Button>
                    </Box>

                    {/* Statistics */}
                    <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                        <Box
                            sx={{
                                flex: '1 1 150px',
                                p: 2,
                                bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                                border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                                borderRadius: 2,
                            }}
                        >
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Total Tasks
                            </Typography>
                            <Typography variant="h5" fontWeight={700}>
                                {stats.total}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                flex: '1 1 150px',
                                p: 2,
                                bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                                border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                                borderRadius: 2,
                            }}
                        >
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Completed Today
                            </Typography>
                            <Typography variant="h5" fontWeight={700}>
                                {stats.completedToday}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                flex: '1 1 150px',
                                p: 2,
                                bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                                border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                                borderRadius: 2,
                            }}
                        >
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Overdue
                            </Typography>
                            <Typography variant="h5" fontWeight={700} color="error">
                                {stats.overdue}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                flex: '1 1 150px',
                                p: 2,
                                bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                                border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                                borderRadius: 2,
                            }}
                        >
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Completion Rate
                            </Typography>
                            <Typography variant="h5" fontWeight={700}>
                                {stats.completionRate}%
                            </Typography>
                        </Box>
                    </Box>

                    {/* Filters and Search */}
                    <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                                size="small"
                                variant={viewFilter === 'All' ? 'contained' : 'outlined'}
                                onClick={() => setViewFilter('All')}
                                sx={
                                    viewFilter === 'All'
                                        ? { bgcolor: '#171717', '&:hover': { bgcolor: '#262626' } }
                                        : undefined
                                }
                            >
                                All
                            </Button>
                            <Button
                                size="small"
                                variant={viewFilter === 'Active' ? 'contained' : 'outlined'}
                                onClick={() => setViewFilter('Active')}
                                sx={
                                    viewFilter === 'Active'
                                        ? { bgcolor: '#171717', '&:hover': { bgcolor: '#262626' } }
                                        : undefined
                                }
                            >
                                Active
                            </Button>
                            <Button
                                size="small"
                                variant={viewFilter === 'Completed' ? 'contained' : 'outlined'}
                                onClick={() => setViewFilter('Completed')}
                                sx={
                                    viewFilter === 'Completed'
                                        ? { bgcolor: '#171717', '&:hover': { bgcolor: '#262626' } }
                                        : undefined
                                }
                            >
                                Completed
                            </Button>
                        </Box>

                        <FormControl size="small" sx={{ minWidth: 150 }}>
                            <InputLabel>Sort by</InputLabel>
                            <Select
                                value={sortBy}
                                label="Sort by"
                                onChange={(e) => setSortBy(e.target.value as SortOption)}
                            >
                                <MenuItem value="dueDate">Due Date</MenuItem>
                                <MenuItem value="priority">Priority</MenuItem>
                                <MenuItem value="createdAt">Created Date</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            size="small"
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize="small" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ flex: 1, maxWidth: 300 }}
                        />
                    </Box>

                    {/* Tasks List */}
                    <Box
                        sx={{
                            flex: 1,
                            overflow: 'auto',
                            bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                            border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                            borderRadius: 2,
                        }}
                    >
                        {filteredTasks.length === 0 ? (
                            <Box sx={{ p: 4, textAlign: 'center' }}>
                                <Typography variant="body1" color="text.secondary">
                                    No tasks found
                                </Typography>
                            </Box>
                        ) : (
                            <List disablePadding>
                                {filteredTasks.map((task, index) => (
                                    <Box key={task.id}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,
                                                p: 2,
                                                '&:hover': {
                                                    bgcolor: isDarkMode ? alpha('#fff', 0.04) : alpha('#000', 0.02),
                                                },
                                            }}
                                        >
                                            <Checkbox
                                                checked={task.completed}
                                                onChange={() => handleToggleComplete(task.id)}
                                                icon={<ActiveIcon />}
                                                checkedIcon={<CompletedIcon />}
                                            />
                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        textDecoration: task.completed ? 'line-through' : 'none',
                                                        color: task.completed ? 'text.secondary' : 'text.primary',
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {task.title}
                                                </Typography>
                                                {task.description && (
                                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                                        {task.description}
                                                    </Typography>
                                                )}
                                                <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                                                    <Chip
                                                        label={task.priority}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: alpha(getPriorityColor(task.priority), 0.15),
                                                            color: getPriorityColor(task.priority),
                                                            fontWeight: 500,
                                                            border: `1px solid ${alpha(getPriorityColor(task.priority), 0.3)}`,
                                                        }}
                                                    />
                                                    {task.dueDate && (
                                                        <Chip
                                                            label={new Date(task.dueDate).toLocaleDateString()}
                                                            size="small"
                                                            sx={{
                                                                bgcolor: alpha(getDueDateColor(task) || '#64748B', 0.15),
                                                                color: getDueDateColor(task) || 'text.secondary',
                                                                fontWeight: 500,
                                                                border: `1px solid ${alpha(getDueDateColor(task) || '#64748B', 0.3)}`,
                                                            }}
                                                        />
                                                    )}
                                                    {task.tags.map((tag) => (
                                                        <Chip key={tag} label={tag} size="small" variant="outlined" />
                                                    ))}
                                                </Box>
                                            </Box>
                                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                                                <IconButton size="small" onClick={() => handleEditTask(task)}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleDeleteTask(task.id)}
                                                    color="error"
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                        {index < filteredTasks.length - 1 && <Divider />}
                                    </Box>
                                ))}
                            </List>
                        )}
                    </Box>
                </Box>
            </Box>

            {/* Task Dialog */}
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
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
                    {editingTask ? 'Edit Task' : 'Add New Task'}
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={3} sx={{ mt: 1 }}>
                        <TextField
                            label="Task Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            fullWidth
                            autoFocus
                            required
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
                            <InputLabel>List</InputLabel>
                            <Select
                                value={formData.list}
                                label="List"
                                onChange={(e) => setFormData({ ...formData, list: e.target.value as TaskListType })}
                            >
                                {taskLists.map((list) => (
                                    <MenuItem key={list.id} value={list.id}>
                                        {list.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>Priority</InputLabel>
                            <Select
                                value={formData.priority}
                                label="Priority"
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskPriority })}
                            >
                                <MenuItem value="Low">Low</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="High">High</MenuItem>
                            </Select>
                        </FormControl>
                        <DatePicker
                            label="Due Date"
                            value={formData.dueDate}
                            onChange={(date: Date | null) => setFormData({ ...formData, dueDate: date })}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                },
                            }}
                        />
                        <TextField
                            label="Tags"
                            value={formData.tags}
                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            fullWidth
                            placeholder="Separate tags with commas"
                            helperText="e.g. urgent, meeting, important"
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2, pt: 0 }}>
                    <Button onClick={() => setDialogOpen(false)} color="inherit">
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
                        {editingTask ? 'Save' : 'Add Task'}
                    </Button>
                </DialogActions>
            </Dialog>
        </LocalizationProvider>
    );
}
