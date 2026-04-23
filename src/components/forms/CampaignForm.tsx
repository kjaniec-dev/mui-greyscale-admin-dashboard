import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Box,
    TextField,
    MenuItem,
    FormControl,
    Select,
    Button,
    InputLabel,
    InputAdornment,
} from '@mui/material';

// Validation schema
const campaignFormSchema = z.object({
    name: z.string()
        .min(3, 'Name must be at least 3 characters')
        .max(100, 'Name must be less than 100 characters'),
    type: z.enum(['email', 'social', 'sms', 'promotion'], {
        message: 'Please select a valid type',
    }),
    status: z.enum(['draft', 'scheduled', 'active', 'paused', 'completed'], {
        message: 'Please select a valid status',
    }),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    budget: z.number()
        .nonnegative('Budget must be non-negative'),
    description: z.string().max(200, 'Description too long').optional(),
});

export type CampaignFormData = z.infer<typeof campaignFormSchema>;

interface CampaignFormProps {
    defaultValues?: Partial<CampaignFormData>;
    onSubmit: (data: CampaignFormData) => void | Promise<void>;
    isSubmitting?: boolean;
    onCancel?: () => void;
}

export function CampaignForm({ defaultValues, onSubmit, isSubmitting = false, onCancel }: CampaignFormProps) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<CampaignFormData>({
        resolver: zodResolver(campaignFormSchema),
        defaultValues: {
            name: defaultValues?.name || '',
            type: defaultValues?.type || 'email',
            status: defaultValues?.status || 'draft',
            startDate: defaultValues?.startDate || '',
            endDate: defaultValues?.endDate || '',
            budget: defaultValues?.budget || 0,
            description: defaultValues?.description || '',
        },
    });

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            id="campaign-form"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            {/* Name Field */}
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Campaign Name"
                        placeholder="Summer Sale 2026"
                        fullWidth
                        required
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        disabled={isSubmitting}
                    />
                )}
            />

            {/* Type & Status Fields */}
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                        <FormControl fullWidth required error={!!errors.type}>
                            <InputLabel>Type</InputLabel>
                            <Select {...field} label="Type" disabled={isSubmitting}>
                                <MenuItem value="email">Email</MenuItem>
                                <MenuItem value="social">Social Media</MenuItem>
                                <MenuItem value="sms">SMS</MenuItem>
                                <MenuItem value="promotion">Promotion</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />
                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <FormControl fullWidth required error={!!errors.status}>
                            <InputLabel>Status</InputLabel>
                            <Select {...field} label="Status" disabled={isSubmitting}>
                                <MenuItem value="draft">Draft</MenuItem>
                                <MenuItem value="scheduled">Scheduled</MenuItem>
                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="paused">Paused</MenuItem>
                                <MenuItem value="completed">Completed</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />
            </Box>

            {/* Date Fields */}
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Start Date"
                            type="date"
                            fullWidth
                            required
                            slotProps={{ inputLabel: { shrink: true } }}
                            error={!!errors.startDate}
                            helperText={errors.startDate?.message}
                            disabled={isSubmitting}
                        />
                    )}
                />
                <Controller
                    name="endDate"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="End Date"
                            type="date"
                            fullWidth
                            required
                            slotProps={{ inputLabel: { shrink: true } }}
                            error={!!errors.endDate}
                            helperText={errors.endDate?.message}
                            disabled={isSubmitting}
                        />
                    )}
                />
            </Box>

            {/* Budget */}
            <Controller
                name="budget"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Budget"
                        type="number"
                        fullWidth
                        required
                        error={!!errors.budget}
                        helperText={errors.budget?.message}
                        disabled={isSubmitting}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        slotProps={{ input: {
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        } }}
                    />
                )}
            />

            {/* Description */}
            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Description"
                        placeholder="Campaign description and goals"
                        multiline
                        rows={3}
                        fullWidth
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        disabled={isSubmitting}
                    />
                )}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <Button onClick={onCancel} disabled={isSubmitting}>
                    Cancel
                </Button>
                <Button type="submit" variant="contained" disabled={isSubmitting}>
                    Save Campaign
                </Button>
            </Box>
        </Box>
    );
}
