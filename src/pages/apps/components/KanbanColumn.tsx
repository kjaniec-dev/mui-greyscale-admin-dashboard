import { Droppable } from '@hello-pangea/dnd';
import {
    Box,
    Typography,
    IconButton,
    useTheme,
} from '@mui/material';
import { Add as AddIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import { KanbanCard } from './KanbanCard';
import type { KanbanColumn as KanbanColumnType, KanbanTask } from '../../../data/mockKanban';

interface KanbanColumnProps {
    column: KanbanColumnType;
    onAddTask?: (columnId: string) => void;
    onEditTask?: (task: KanbanTask) => void;
}

export function KanbanColumn({ column, onAddTask, onEditTask }: KanbanColumnProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <Box
            sx={{
                width: 280,
                minWidth: 280,
                display: 'flex',
                flexDirection: 'column',
                bgcolor: isDarkMode ? '#1A1A1A' : '#FAFAFA',
                borderRadius: 2,
                border: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
                overflow: 'hidden',
            }}
        >
            {/* Column Header */}
            <Box
                sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {column.title}
                    </Typography>
                    <Box
                        sx={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            bgcolor: isDarkMode ? '#404040' : '#E5E5E5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="caption" sx={{ fontWeight: 600,  fontSize: '0.65rem'  }}>
                            {column.tasks.length}
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <IconButton
                        size="small"
                        onClick={() => onAddTask?.(column.id)}
                        sx={{ color: isDarkMode ? '#A3A3A3' : '#525252' }}
                    >
                        <AddIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        sx={{ color: isDarkMode ? '#A3A3A3' : '#525252' }}
                    >
                        <MoreVertIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>

            {/* Droppable Area */}
            <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                    <Box
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        sx={{
                            flex: 1,
                            p: 1.5,
                            minHeight: 200,
                            bgcolor: snapshot.isDraggingOver
                                ? (isDarkMode ? '#262626' : '#F5F5F5')
                                : 'transparent',
                            transition: 'background-color 0.2s',
                        }}
                    >
                        {column.tasks.map((task, index) => (
                            <KanbanCard
                                key={task.id}
                                task={task}
                                index={index}
                                onClick={onEditTask}
                            />
                        ))}
                        {provided.placeholder}
                    </Box>
                )}
            </Droppable>
        </Box>
    );
}
