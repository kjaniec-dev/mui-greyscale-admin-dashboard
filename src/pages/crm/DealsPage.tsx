import { useState, useCallback } from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import {
    Box,
    Typography,
    Button,
    useTheme,
} from '@mui/material';
import { Add as AddIcon, ViewKanban as ViewKanbanIcon } from '@mui/icons-material';
import { mockDeals, type Deal } from '../../data/mockDeals';
import { DealColumn } from './components/DealColumn';
import { DealDialog } from './components/DealDialog';

const STAGES: Deal['stage'][] = ['New', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'];

export function DealsPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    // State
    const [deals, setDeals] = useState<Deal[]>(mockDeals);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

    // Open dialog for new deal
    const handleAddDeal = () => {
        setSelectedDeal(null);
        setIsDialogOpen(true);
    };

    // Open dialog for editing existing deal
    const handleEditDeal = (deal: Deal) => {
        setSelectedDeal(deal);
        setIsDialogOpen(true);
    };

    // Save or update deal
    const handleSaveDeal = (dealData: Partial<Deal>) => {
        if (selectedDeal) {
            // Update existing deal
            setDeals(prev => prev.map(d =>
                d.id === selectedDeal.id
                    ? { ...d, ...dealData }
                    : d
            ));
        } else {
            // Create new deal
            const newDeal: Deal = {
                id: `deal-${Date.now()}`,
                title: dealData.title || 'Untitled Deal',
                companyName: dealData.companyName || 'Unknown Company',
                companyLogo: '',
                amount: dealData.amount || 0,
                stage: (dealData.stage as Deal['stage']) || 'New',
                priority: 'Medium',
                closingDate: dealData.closingDate ? new Date(dealData.closingDate as unknown as string) : new Date(),
                assignee: {
                    name: 'Current User',
                    avatar: 'https://i.pravatar.cc/150?u=current',
                },
            };
            setDeals(prev => [...prev, newDeal]);
        }
        setIsDialogOpen(false);
        setSelectedDeal(null);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedDeal(null);
    };

    const getDealsByStage = (stage: Deal['stage']) => {
        return deals.filter(deal => deal.stage === stage);
    };

    const handleDragEnd = useCallback((result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const destStage = destination.droppableId as Deal['stage'];

        setDeals(prevDeals => {
            return prevDeals.map(deal => {
                if (deal.id === draggableId) {
                    return { ...deal, stage: destStage };
                }
                return deal;
            });
        });

    }, []);

    const getTotalValue = () => {
        return deals.reduce((sum, deal) => sum + deal.amount, 0);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <Box sx={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 1,
                            bgcolor: isDarkMode ? '#262626' : '#E5E5E5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'text.primary',
                        }}
                    >
                        <ViewKanbanIcon />
                    </Box>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            Sales Pipeline
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Total Pipeline Value: <b>{formatCurrency(getTotalValue())}</b> • {deals.length} Active Deals
                        </Typography>
                    </Box>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleAddDeal()}
                    sx={{
                        bgcolor: '#171717',
                        color: '#FAFAFA',
                        '&:hover': {
                            bgcolor: '#262626',
                        },
                    }}
                >
                    Add Deal
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
                        flexGrow: 1,
                        alignItems: 'flex-start',
                    }}
                >
                    {STAGES.map((stage) => (
                        <DealColumn
                            key={stage}
                            columnId={stage}
                            title={stage}
                            deals={getDealsByStage(stage)}
                            onAddDeal={handleAddDeal}
                            onEditDeal={handleEditDeal}
                        />
                    ))}
                </Box>
            </DragDropContext>

            <DealDialog
                open={isDialogOpen}
                onClose={handleCloseDialog}
                onSave={handleSaveDeal}
                deal={selectedDeal}
            />
        </Box>
    );
}
