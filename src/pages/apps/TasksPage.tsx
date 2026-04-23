import { useState, useMemo } from 'react';
import {
    Box,
    Paper,
    Typography,
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Checkbox,
    IconButton,
    Chip,
    InputBase,
    useTheme,
} from '@mui/material';
import {
    Add as AddIcon,
    Search as SearchIcon,
    Star as StarIcon,
    StarBorder as StarBorderIcon,
    MoreVert as MoreVertIcon,
    FormatListBulleted as ListIcon,
    Today as TodayIcon,
    Event as UpcomingIcon,
    AssignmentLate as LateIcon,
    
    FiberManualRecord as DotIcon,
} from '@mui/icons-material';
import {
    mockTasks,
    taskLists,
    type Task,
    type TaskListType,
    getTasksForToday,
    getUpcomingTasks,
    getOverdueTasks,
} from '../../data/mockTasks';
import { TaskDialog } from './components/TaskDialog';
import { useCurrentDate } from '../../hooks/useCurrentDate';

type FilterType = 'All' | 'Today' | 'Upcoming' | 'Overdue' | 'Completed' | TaskListType;

export const TasksPage = () => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const currentDate = useCurrentDate();

    const [tasks, setTasks] = useState<Task[]>(mockTasks);
    const [currentFilter, setCurrentFilter] = useState<FilterType>('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Dialog State
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const todayTasks = useMemo(() => getTasksForToday(tasks, currentDate), [tasks, currentDate]);
    const upcomingTasks = useMemo(() => getUpcomingTasks(tasks, currentDate), [tasks, currentDate]);
    const overdueTasks = useMemo(() => getOverdueTasks(tasks, currentDate), [tasks, currentDate]);

    const filteredTasks = useMemo(() => {
        let filtered = tasks;

        // Apply sidebar filter
        switch (currentFilter) {
            case 'Today':
                filtered = todayTasks;
                break;
            case 'Upcoming':
                filtered = upcomingTasks;
                break;
            case 'Overdue':
                filtered = overdueTasks;
                break;
            case 'Completed':
                filtered = tasks.filter(t => t.completed);
                break;
            case 'All':
                filtered = tasks;
                break;
            default:
                // For custom lists (Personal, Work, etc)
                filtered = tasks.filter(t => t.list === currentFilter);
                break;
        }

        // Apply search query
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            filtered = filtered.filter(t =>
                t.title.toLowerCase().includes(lowerQuery) ||
                t.description?.toLowerCase().includes(lowerQuery) ||
                t.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
            );
        }

        return filtered;
    }, [tasks, currentFilter, searchQuery, todayTasks, upcomingTasks, overdueTasks]);

    const handleToggleComplete = (taskId: string) => {
        setTasks(prev => prev.map(t => {
            if (t.id === taskId) {
                return {
                    ...t,
                    completed: !t.completed,
                    completedAt: !t.completed ? new Date() : undefined
                };
            }
            return t;
        }));
    };

    const handleTogglePriority = (taskId: string) => {
        setTasks(prev => prev.map(t => {
            if (t.id === taskId) {
                return { ...t, priority: t.priority === 'High' ? 'Medium' : 'High' };
            }
            return t;
        }));
    };

    const handleCreateTask = () => {
        setSelectedTask(null);
        setIsDialogOpen(true);
    };

    const handleEditTask = (task: Task) => {
        setSelectedTask(task);
        setIsDialogOpen(true);
    };

    const handleSaveTask = (taskData: Partial<Task>) => {
        if (selectedTask) {
            setTasks(prev => prev.map(t => t.id === selectedTask.id ? { ...t, ...taskData } as Task : t));
        } else {
            const newTask: Task = {
                id: `task-${Date.now()}`,
                title: taskData.title || 'Untitled Task',
                description: taskData.description,
                completed: false,
                priority: taskData.priority || 'Medium',
                dueDate: taskData.dueDate,
                list: taskData.list || 'Personal',
                tags: taskData.tags || [],
                createdAt: new Date(),
            };
            setTasks(prev => [newTask, ...prev]);
        }
        setIsDialogOpen(false);
    };

    return (
        <Box sx={{ height: 'calc(100vh - 100px)', display: 'flex', gap: 3 }}>

            {/* Left Sidebar - Navigation/Filters */}
            <Paper
                sx={{
                    width: 280,
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                    border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                    borderRadius: 2,
                    overflow: 'hidden'
                }}
            >
                <Box sx={{ p: 2 }}>
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleCreateTask}
                        sx={{
                            bgcolor: isDarkMode ? '#FAFAFA' : '#171717',
                            color: isDarkMode ? '#171717' : '#FAFAFA',
                            py: 1.5,
                            '&:hover': {
                                bgcolor: isDarkMode ? '#E5E5E5' : '#262626',
                            }
                        }}
                    >
                        Create Task
                    </Button>
                </Box>

                <Divider />

                <List sx={{ px: 1, py: 2 }}>
                    <ListItem disablePadding>
                        <ListItemButton
                            selected={currentFilter === 'All'}
                            onClick={() => setCurrentFilter('All')}
                            sx={{ borderRadius: 1, mb: 0.5 }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}><ListIcon fontSize="small" /></ListItemIcon>
                            <ListItemText primary="All Tasks" slotProps={{ primary: { variant: 'body2', sx: { fontWeight: currentFilter === 'All' ? 600 : 400  }  } }} />
                            <Typography variant="caption" color="text.secondary">{tasks.length}</Typography>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            selected={currentFilter === 'Today'}
                            onClick={() => setCurrentFilter('Today')}
                            sx={{ borderRadius: 1, mb: 0.5 }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}><TodayIcon fontSize="small" color="primary" /></ListItemIcon>
                            <ListItemText primary="Today" slotProps={{ primary: { variant: 'body2', sx: { fontWeight: currentFilter === 'Today' ? 600 : 400  }  } }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            selected={currentFilter === 'Upcoming'}
                            onClick={() => setCurrentFilter('Upcoming')}
                            sx={{ borderRadius: 1, mb: 0.5 }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}><UpcomingIcon fontSize="small" color="warning" /></ListItemIcon>
                            <ListItemText primary="Upcoming" slotProps={{ primary: { variant: 'body2', sx: { fontWeight: currentFilter === 'Upcoming' ? 600 : 400  }  } }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            selected={currentFilter === 'Overdue'}
                            onClick={() => setCurrentFilter('Overdue')}
                            sx={{ borderRadius: 1, mb: 0.5 }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}><LateIcon fontSize="small" color="error" /></ListItemIcon>
                            <ListItemText primary="Overdue" slotProps={{ primary: { variant: 'body2', sx: { fontWeight: currentFilter === 'Completed' ? 600 : 400  }  } }} />
                        </ListItemButton>
                    </ListItem>
                </List>

                <Divider />

                <Box sx={{ p: 2 }}>
                    <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 600,  px: 1  }}>
                        Lists
                    </Typography>
                    <List sx={{ mt: 1 }}>
                        {taskLists.map(list => (
                            <ListItem key={list.id} disablePadding>
                                <ListItemButton
                                    selected={currentFilter === list.id}
                                    onClick={() => setCurrentFilter(list.id as FilterType)}
                                    sx={{ borderRadius: 1, mb: 0.5 }}
                                >
                                    <ListItemIcon sx={{ minWidth: 40 }}>
                                        <DotIcon sx={{ color: list.color, fontSize: 16 }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={list.name}
                                        slotProps={{ primary: { variant: 'body2', sx: { fontWeight: currentFilter === list.id ? 600 : 400  }  } }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Paper>

            {/* Main Content Area */}
            <Paper
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                    border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                    borderRadius: 2,
                    overflow: 'hidden'
                }}
            >
                {/* Search / Header Bar */}
                <Box
                    sx={{
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'} `
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {currentFilter === 'All' ? 'All Tasks' : currentFilter}
                    </Typography>

                    <Paper
                        variant="outlined"
                        sx={{
                            p: '2px 4px',
                            display: 'flex',
                            alignItems: 'center',
                            width: 300,
                            bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                            border: 'none',
                            borderRadius: 1,
                        }}
                    >
                        <IconButton sx={{ p: '10px' }} aria-label="search" disabled>
                            <SearchIcon fontSize="small" />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1, fontSize: '0.875rem' }}
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Paper>
                </Box>

                {/* Tasks List */}
                <List sx={{ flex: 1, overflowY: 'auto', p: 0 }}>
                    {filteredTasks.length === 0 ? (
                        <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
                            <Typography variant="body1">No tasks found for this view.</Typography>
                        </Box>
                    ) : (
                        filteredTasks.map((task, index) => (
                            <Box key={task.id}>
                                <ListItem
                                    disablePadding
                                    secondaryAction={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <IconButton
                                                edge="end"
                                                onClick={() => handleTogglePriority(task.id)}
                                                color={task.priority === 'High' ? 'warning' : 'default'}
                                            >
                                                {task.priority === 'High' ? <StarIcon /> : <StarBorderIcon />}
                                            </IconButton>
                                            <IconButton edge="end">
                                                <MoreVertIcon />
                                            </IconButton>
                                        </Box>
                                    }
                                >
                                    <ListItemButton
                                        onClick={() => handleEditTask(task)}
                                        sx={{
                                            py: 2,
                                            pl: 2,
                                            pr: 10, // Give room for secondary actions
                                        }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 48 }} onClick={(e) => { e.stopPropagation(); handleToggleComplete(task.id); }}>
                                            <Checkbox
                                                edge="start"
                                                checked={task.completed}
                                                tabIndex={-1}
                                                disableRipple
                                                color="success"
                                            />
                                        </ListItemIcon>

                                        <ListItemText
                                            slotProps={{
                                                primary: { component: 'div' },
                                                secondary: { component: 'div' },
                                            }}
                                            primary={
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                                                    <Typography
                                                        variant="body1"
                                                        sx={{ fontWeight: task.completed ? 400 : 500, 
                                                            textDecoration: task.completed ? 'line-through' : 'none',
                                                            color: task.completed ? 'text.secondary' : 'text.primary'
                                                         }}
                                                    >
                                                        {task.title}
                                                    </Typography>
                                                    {task.priority === 'High' && !task.completed && (
                                                        <Chip label="High Priority" size="small" color="error" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 600 }} />
                                                    )}
                                                </Box>
                                            }
                                            secondary={
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
                                                    {task.dueDate && (
                                                        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: task.completed ? 'text.secondary' : new Date(task.dueDate) < new Date() ? 'error.main' : 'text.secondary' }}>
                                                            <TodayIcon sx={{ fontSize: 14 }} />
                                                            {new Date(task.dueDate).toLocaleDateString()}
                                                        </Typography>
                                                    )}

                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                        <DotIcon sx={{ fontSize: 10, color: taskLists.find(l => l.id === task.list)?.color || '#6B7280' }} />
                                                        <Typography variant="caption" color="text.secondary">
                                                            {task.list}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            }
                                        />
                                    </ListItemButton>
                                </ListItem>
                                {index < filteredTasks.length - 1 && <Divider component="li" />}
                            </Box>
                        ))
                    )}
                </List>
            </Paper>

            <TaskDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                task={selectedTask}
                onSave={handleSaveTask}
            />
        </Box >
    );
};
