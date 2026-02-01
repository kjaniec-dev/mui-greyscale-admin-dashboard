import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Box,
    TextField,
    MenuItem,
    FormControl,
    FormLabel,
    FormHelperText,
    Select,
    useTheme,
} from '@mui/material';

// Validation schema
const ticketFormSchema = z.object({
    subject: z.string()
        .min(5, 'Subject must be at least 5 characters')
        .max(100, 'Subject must be less than 100 characters'),
    description: z.string()
        .min(10, 'Description must be at least 10 characters')
        .max(1000, 'Description must be less than 1000 characters'),
    status: z.enum(['Open', 'In Progress', 'Resolved', 'Closed'], {
        message: 'Please select a valid status',
    }),
    priority: z.enum(['Low', 'Medium', 'High', 'Urgent'], {
        message: 'Please select a valid priority',
    }),
    category: z.enum(['Technical', 'Billing', 'General', 'Feature Request', 'Bug Report'], {
        message: 'Please select a valid category',
    }),
});

export type TicketFormData = z.infer<typeof ticketFormSchema>;

interface TicketFormProps {
    defaultValues?: Partial<TicketFormData>;
    onSubmit: (data: TicketFormData) => void | Promise<void>;
    isSubmitting?: boolean;
}

export function TicketForm({ defaultValues, onSubmit, isSubmitting = false }: TicketFormProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<TicketFormData>({
        resolver: zodResolver(ticketFormSchema),
        defaultValues: {
            subject: defaultValues?.subject || '',
            description: defaultValues?.description || '',
            status: defaultValues?.status || 'Open',
            priority: defaultValues?.priority || 'Medium',
            category: defaultValues?.category || 'General',
        },
    });

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            id="ticket-form"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            {/* Subject Field */}
            <Controller
                name="subject"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Subject"
                        placeholder="Brief description of the issue"
                        fullWidth
                        required
                        margin="normal"
                        error={!!errors.subject}
                        helperText={errors.subject?.message}
                        disabled={isSubmitting}
                        sx={{
                            '& .MuiInputBase-root': {
                                bgcolor: isDarkMode ? '#171717' : '#FAFAFA',
                            },
                        }}
                    />
                )}
            />

            {/* Description Field */}
            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Description"
                        placeholder="Detailed description of the issue"
                        fullWidth
                        required
                        multiline
                        rows={4}
                        margin="normal"
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        disabled={isSubmitting}
                        sx={{
                            '& .MuiInputBase-root': {
                                bgcolor: isDarkMode ? '#171717' : '#FAFAFA',
                            },
                        }}
                    />
                )}
            />

            {/* Category Field */}
            <Controller
                name="category"
                control={control}
                render={({ field }) => (
                    <FormControl fullWidth required error={!!errors.category}>
                        <FormLabel
                            sx={{
                                mb: 1,
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                color: errors.category
                                    ? 'error.main'
                                    : isDarkMode ? '#E5E5E5' : '#171717',
                            }}
                        >
                            Category
                        </FormLabel>
                        <Select
                            {...field}
                            disabled={isSubmitting}
                            sx={{ bgcolor: isDarkMode ? '#171717' : '#FAFAFA' }}
                        >
                            <MenuItem value="General">General</MenuItem>
                            <MenuItem value="Technical">Technical</MenuItem>
                            <MenuItem value="Billing">Billing</MenuItem>
                            <MenuItem value="Feature Request">Feature Request</MenuItem>
                            <MenuItem value="Bug Report">Bug Report</MenuItem>
                        </Select>
                        {errors.category && (
                            <FormHelperText>{errors.category.message}</FormHelperText>
                        )}
                    </FormControl>
                )}
            />

            {/* Priority Field */}
            <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                    <FormControl fullWidth required error={!!errors.priority}>
                        <FormLabel
                            sx={{
                                mb: 1,
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                color: errors.priority
                                    ? 'error.main'
                                    : isDarkMode ? '#E5E5E5' : '#171717',
                            }}
                        >
                            Priority
                        </FormLabel>
                        <Select
                            {...field}
                            disabled={isSubmitting}
                            sx={{ bgcolor: isDarkMode ? '#171717' : '#FAFAFA' }}
                        >
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                            <MenuItem value="Urgent">Urgent</MenuItem>
                        </Select>
                        {errors.priority && (
                            <FormHelperText>{errors.priority.message}</FormHelperText>
                        )}
                    </FormControl>
                )}
            />

            {/* Status Field */}
            <Controller
                name="status"
                control={control}
                render={({ field }) => (
                    <FormControl fullWidth required error={!!errors.status}>
                        <FormLabel
                            sx={{
                                mb: 1,
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                color: errors.status
                                    ? 'error.main'
                                    : isDarkMode ? '#E5E5E5' : '#171717',
                            }}
                        >
                            Status
                        </FormLabel>
                        <Select
                            {...field}
                            disabled={isSubmitting}
                            sx={{ bgcolor: isDarkMode ? '#171717' : '#FAFAFA' }}
                        >
                            <MenuItem value="Open">Open</MenuItem>
                            <MenuItem value="In Progress">In Progress</MenuItem>
                            <MenuItem value="Resolved">Resolved</MenuItem>
                            <MenuItem value="Closed">Closed</MenuItem>
                        </Select>
                        {errors.status && (
                            <FormHelperText>{errors.status.message}</FormHelperText>
                        )}
                    </FormControl>
                )}
            />
        </Box>
    );
}
