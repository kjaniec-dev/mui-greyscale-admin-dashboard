import { Droppable } from '@hello-pangea/dnd';
import { Box, Typography, Button, Paper, useTheme } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import type { Deal } from '../../../data/mockDeals';
import { DealCard } from './DealCard';

interface DealColumnProps {
    columnId: string;
    title: string;
    deals: Deal[];
    onAddDeal?: (stage: Deal['stage']) => void;
    onEditDeal?: (deal: Deal) => void;
}

export function DealColumn({ columnId, title, deals, onAddDeal, onEditDeal }: DealColumnProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const totalAmount = deals.reduce((sum, deal) => sum + deal.amount, 0);

    const formatAmount = (amount: number) => {
        if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
        if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}k`;
        return `$${amount}`;
    };

    return (
        <Paper
            sx={{
                width: 320,
                minWidth: 320,
                bgcolor: isDarkMode ? '#171717' : '#F9FAFB',
                border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 'fit-content',
                maxHeight: '100%',
            }}
        >
            {/* Header */}
            <Box sx={{ p: 2, borderBottom: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}` }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                        {deals.length}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ height: 4, flex: 1, bgcolor: isDarkMode ? '#262626' : '#E5E5E5', borderRadius: 2, overflow: 'hidden' }}>
                        <Box sx={{ height: '100%', width: '100%', bgcolor: 'primary.main', opacity: 0.5 }} />
                    </Box>
                    <Typography variant="caption" sx={{ fontWeight: 600,  ml: 2  }}>
                        {formatAmount(totalAmount)}
                    </Typography>
                </Box>
            </Box>

            {/* Droppable Area */}
            <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                    <Box
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        sx={{
                            p: 1.5,
                            flexGrow: 1,
                            minHeight: 100,
                            bgcolor: snapshot.isDraggingOver
                                ? (isDarkMode ? '#262626' : '#F5F5F5')
                                : 'transparent',
                            transition: 'background-color 0.2s',
                        }}
                    >
                        {deals.map((deal, index) => (
                            <DealCard
                                key={deal.id}
                                deal={deal}
                                index={index}
                                onClick={onEditDeal}
                            />
                        ))}
                        {provided.placeholder}
                    </Box>
                )}
            </Droppable>

            {/* Footer */}
            <Box sx={{ p: 1 }}>
                <Button
                    fullWidth
                    startIcon={<AddIcon fontSize="small" />}
                    onClick={() => onAddDeal?.(columnId as Deal['stage'])}
                    sx={{
                        color: 'text.secondary',
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        '&:hover': {
                            bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                            color: 'text.primary',
                        },
                    }}
                >
                    New Deal
                </Button>
            </Box>
        </Paper>
    );
}
