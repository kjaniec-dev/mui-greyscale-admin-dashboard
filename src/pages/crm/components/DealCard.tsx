import { Draggable } from '@hello-pangea/dnd';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
    Avatar,
    useTheme,
    Divider,
} from '@mui/material';
import {
    Business as BusinessIcon,
    AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import type { Deal } from '../../../data/mockDeals';
import { getStatusColor } from '../../../theme';

interface DealCardProps {
    deal: Deal;
    index: number;
    onClick?: (deal: Deal) => void;
}

export function DealCard({ deal, index, onClick }: DealCardProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const priorityColorMap: Record<string, string> = {
        Low: 'inactive',
        Medium: 'info',
        High: 'error',
    };
    const colors = getStatusColor(priorityColorMap[deal.priority] || 'info', isDarkMode);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <Draggable draggableId={deal.id} index={index}>
            {(provided, snapshot) => (
                <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => onClick?.(deal)}
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
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Chip
                                label={deal.priority}
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
                            <Typography variant="caption" color="text.secondary">
                                {deal.closingDate.toLocaleDateString()}
                            </Typography>
                        </Box>

                        <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
                            {deal.title}
                        </Typography>

                        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5 }}>
                            <BusinessIcon sx={{ fontSize: 14 }} /> {deal.companyName}
                        </Typography>

                        <Divider sx={{ my: 1.5, borderColor: isDarkMode ? '#404040' : '#F5F5F5' }} />

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
                                <MoneyIcon sx={{ fontSize: 16 }} />
                                <Typography variant="body2" fontWeight={700}>
                                    {formatCurrency(deal.amount)}
                                </Typography>
                            </Box>

                            <Avatar
                                src={deal.assignee.avatar}
                                alt={deal.assignee.name}
                                sx={{
                                    width: 24,
                                    height: 24,
                                    fontSize: '0.65rem',
                                    bgcolor: isDarkMode ? '#525252' : '#A3A3A3',
                                    color: isDarkMode ? '#E5E5E5' : '#FFFFFF',
                                }}
                            >
                                {deal.assignee.name.charAt(0)}
                            </Avatar>
                        </Box>
                    </CardContent>
                </Card>
            )}
        </Draggable>
    );
}
