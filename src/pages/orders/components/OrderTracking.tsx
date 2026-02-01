import {
    Box,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Typography,
    Paper,
    useTheme,
} from '@mui/material';
import {
    LocalShipping as ShippingIcon,
    CheckCircle as CheckIcon,
    Schedule as ScheduleIcon,
    Inventory as InventoryIcon,
    Cancel as CancelIcon,
} from '@mui/icons-material';
import type { Order } from '../../../data/mockOrders';

interface OrderTrackingProps {
    order: Order;
}

function formatDate(date: Date) {
    return new Date(date).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });
}

export function OrderTracking({ order }: OrderTrackingProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    // The timeline events are already sorted by time in our mock generation,
    // but in a real app we might want to sort them.
    // We'll map the possible statuses to steps or just use the timeline history.
    // For a cleaner UI, let's show the standard progression and mark completed ones based on history.

    // Standard flow definition
    const steps = [
        { label: 'Order Placed', statusKey: 'Pending', icon: ScheduleIcon },
        { label: 'Processing', statusKey: 'Processing', icon: InventoryIcon },
        { label: 'Shipped', statusKey: 'Shipped', icon: ShippingIcon },
        { label: 'Delivered', statusKey: 'Delivered', icon: CheckIcon },
    ];

    // Build the active timeline based on history
    // We want to show the full lifecycle (Placed -> Processing -> Shipped -> Delivered)
    // and highlight what has happened.

    // If cancelled, show a specific state
    if (order.status === 'Cancelled') {
        return (
            <Paper sx={{ p: 3, bgcolor: isDarkMode ? '#171717' : '#FFFFFF', border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`, borderRadius: 2 }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Order Status
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'error.main' }}>
                    <CancelIcon fontSize="large" />
                    <Box>
                        <Typography variant="subtitle1" fontWeight={600}>Order Cancelled</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {order.timeline.find(e => e.status === 'Cancelled')?.description || 'This order has been cancelled.'}
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        );
    }

    // Identify active step index
    // Pending = 0, Processing = 1, Shipped = 2, Delivered = 3
    let activeStep = 0;
    if (order.status === 'Processing') activeStep = 1;
    if (order.status === 'Shipped') activeStep = 2;
    if (order.status === 'Delivered') activeStep = 4; // All completed

    return (
        <Paper sx={{ p: 3, bgcolor: isDarkMode ? '#171717' : '#FFFFFF', border: `1px solid ${isDarkMode ? '#262626' : '#E5E5E5'}`, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                Order Tracking
            </Typography>

            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => {
                    // Find the event in timeline for this step
                    // Note: In a real app, 'Processing' might happen multiple times or have detailed sub-steps.
                    // Here we look for the *latest* event of that status type or a relevant one.
                    // For 'Order Placed', we look for 'Pending'.

                    const event = order.timeline.find(e => e.status === step.statusKey);
                    const Icon = step.icon;

                    return (
                        <Step key={step.label} expanded={true}>
                            <StepLabel
                                StepIconComponent={(props) => (
                                    <Box
                                        sx={{
                                            bgcolor: props.active || props.completed ? (isDarkMode ? '#FAFAFA' : '#171717') : (isDarkMode ? '#262626' : '#E5E5E5'),
                                            color: props.active || props.completed ? (isDarkMode ? '#171717' : '#FAFAFA') : (isDarkMode ? '#525252' : '#A3A3A3'),
                                            width: 32,
                                            height: 32,
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            zIndex: 1,
                                        }}
                                    >
                                        <Icon sx={{ fontSize: 18 }} />
                                    </Box>
                                )}
                                optional={
                                    event ? (
                                        <Typography variant="caption">{formatDate(event.date)}</Typography>
                                    ) : null
                                }
                                error={order.status === 'Cancelled'}
                            >
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {step.label}
                                </Typography>
                            </StepLabel>
                            <StepContent>
                                <Typography variant="body2" color="text.secondary">
                                    {event ? event.description :
                                        index > activeStep ? 'Pending...' :
                                            index === activeStep ? 'In Progress' : 'Completed'
                                    }
                                </Typography>
                            </StepContent>
                        </Step>
                    );
                })}
            </Stepper>
        </Paper>
    );
}
