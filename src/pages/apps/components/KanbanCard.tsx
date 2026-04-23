import { Draggable } from '@hello-pangea/dnd';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
    Avatar,
    useTheme,
} from '@mui/material';
import type { KanbanTask } from '../../../data/mockKanban';

interface KanbanCardProps {
    task: KanbanTask;
    index: number;
    onClick?: (task: KanbanTask) => void;
}

export function KanbanCard({ task, index, onClick }: KanbanCardProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const priorityColors = {
        Low: { bg: isDarkMode ? '#404040' : '#E5E5E5', text: isDarkMode ? '#A3A3A3' : '#525252' },
        Medium: { bg: isDarkMode ? '#525252' : '#A3A3A3', text: isDarkMode ? '#E5E5E5' : '#171717' },
        High: { bg: isDarkMode ? '#171717' : '#262626', text: '#FAFAFA' },
    };

    const colors = priorityColors[task.priority];

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => onClick?.(task)}
                    sx={{
                        mb: 1.5,
                        cursor: 'grab',
                        bgcolor: isDarkMode ? '#262626' : '#FFFFFF',
                        border: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
                        boxShadow: snapshot.isDragging
                            ? `0 8px 16px ${isDarkMode ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.15)'}`
                            : 'none',
                        transform: snapshot.isDragging ? 'rotate(3deg)' : 'none',
                        transition: 'box-shadow 0.2s, transform 0.2s',
                        '&:hover': {
                            borderColor: isDarkMode ? '#525252' : '#A3A3A3',
                        },
                    }}
                >
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                        <Typography variant="body2" sx={{ fontWeight: 500,  mb: 1  }}>
                            {task.title}
                        </Typography>

                        {task.description && (
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    mb: 1.5,
                                }}
                            >
                                {task.description}
                            </Typography>
                        )}

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Chip
                                label={task.priority}
                                size="small"
                                sx={{
                                    height: 20,
                                    fontSize: '0.65rem',
                                    fontWeight: 600,
                                    bgcolor: colors.bg,
                                    color: colors.text,
                                    borderRadius: 0.5,
                                }}
                            />

                            {task.assignee && (
                                <Avatar
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        fontSize: '0.65rem',
                                        bgcolor: isDarkMode ? '#525252' : '#A3A3A3',
                                        color: isDarkMode ? '#E5E5E5' : '#FFFFFF',
                                    }}
                                >
                                    {task.assignee.split(' ').map(n => n[0]).join('')}
                                </Avatar>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            )}
        </Draggable>
    );
}
