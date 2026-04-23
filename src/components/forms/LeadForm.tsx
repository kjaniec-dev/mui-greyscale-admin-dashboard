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
    InputAdornment,
    useTheme,
} from '@mui/material';
import type { LeadStatus, LeadSource } from '../../data/mockLeads';

// Validation schema
const leadFormSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters'),
    email: z.string()
        .email('Invalid email address')
        .min(1, 'Email is required'),
    phone: z.string()
        .min(10, 'Phone must be at least 10 characters')
        .max(20, 'Phone must be less than 20 characters'),
    company: z.string()
        .min(1, 'Company is required')
        .max(100, 'Company must be less than 100 characters'),
    source: z.enum(['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Trade Show', 'Advertisement'], {
        message: 'Please select a valid source',
    }),
    status: z.enum(['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'], {
        message: 'Please select a valid status',
    }),
    value: z.number()
        .min(0, 'Value must be positive')
        .max(10000000, 'Value is too large'),
    assignedTo: z.string()
        .min(1, 'Assigned to is required')
        .max(50, 'Assigned to must be less than 50 characters'),
    notes: z.string().max(500, 'Notes must be less than 500 characters').optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

interface LeadFormProps {
    defaultValues?: Partial<LeadFormData>;
    onSubmit: (data: LeadFormData) => void | Promise<void>;
    isSubmitting?: boolean;
}

const sources: LeadSource[] = ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Trade Show', 'Advertisement'];
const statuses: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'];
const salesReps = ['Alex Thompson', 'Sarah Chen', 'Mike Johnson', 'Emily Davis', 'Chris Lee'];

export function LeadForm({ defaultValues, onSubmit, isSubmitting = false }: LeadFormProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LeadFormData>({
        resolver: zodResolver(leadFormSchema),
        defaultValues: {
            name: defaultValues?.name || '',
            email: defaultValues?.email || '',
            phone: defaultValues?.phone || '',
            company: defaultValues?.company || '',
            source: defaultValues?.source || 'Website',
            status: defaultValues?.status || 'New',
            value: defaultValues?.value || 0,
            assignedTo: defaultValues?.assignedTo || '',
            notes: defaultValues?.notes || '',
        },
    });

    const inputBgStyle = {
        '& .MuiInputBase-root': {
            bgcolor: isDarkMode ? '#171717' : '#FAFAFA',
        },
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            id="lead-form"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            {/* Name Field */}
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Full Name"
                        placeholder="Enter lead name"
                        fullWidth
                        required
                        margin="normal"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        disabled={isSubmitting}
                        sx={inputBgStyle}
                    />
                )}
            />

            {/* Email Field */}
            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Email Address"
                        placeholder="lead@company.com"
                        type="email"
                        fullWidth
                        required
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        disabled={isSubmitting}
                        sx={inputBgStyle}
                    />
                )}
            />

            {/* Phone Field */}
            <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Phone Number"
                        placeholder="+1 (555) 000-0000"
                        fullWidth
                        required
                        margin="normal"
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                        disabled={isSubmitting}
                        sx={inputBgStyle}
                    />
                )}
            />

            {/* Company Field */}
            <Controller
                name="company"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Company"
                        placeholder="Company name"
                        fullWidth
                        required
                        margin="normal"
                        error={!!errors.company}
                        helperText={errors.company?.message}
                        disabled={isSubmitting}
                        sx={inputBgStyle}
                    />
                )}
            />

            {/* Source Field */}
            <Controller
                name="source"
                control={control}
                render={({ field }) => (
                    <FormControl fullWidth required error={!!errors.source}>
                        <FormLabel
                            sx={{
                                mb: 1,
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                color: errors.source
                                    ? 'error.main'
                                    : isDarkMode
                                        ? '#E5E5E5'
                                        : '#171717',
                            }}
                        >
                            Source
                        </FormLabel>
                        <Select
                            {...field}
                            disabled={isSubmitting}
                            sx={{ bgcolor: isDarkMode ? '#171717' : '#FAFAFA' }}
                        >
                            {sources.map((source) => (
                                <MenuItem key={source} value={source}>{source}</MenuItem>
                            ))}
                        </Select>
                        {errors.source && (
                            <FormHelperText>{errors.source.message}</FormHelperText>
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
                                    : isDarkMode
                                        ? '#E5E5E5'
                                        : '#171717',
                            }}
                        >
                            Status
                        </FormLabel>
                        <Select
                            {...field}
                            disabled={isSubmitting}
                            sx={{ bgcolor: isDarkMode ? '#171717' : '#FAFAFA' }}
                        >
                            {statuses.map((status) => (
                                <MenuItem key={status} value={status}>{status}</MenuItem>
                            ))}
                        </Select>
                        {errors.status && (
                            <FormHelperText>{errors.status.message}</FormHelperText>
                        )}
                    </FormControl>
                )}
            />

            {/* Value Field */}
            <Controller
                name="value"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                        label="Estimated Value"
                        type="number"
                        fullWidth
                        required
                        margin="normal"
                        error={!!errors.value}
                        helperText={errors.value?.message}
                        disabled={isSubmitting}
                        slotProps={{ input: {
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        } }}
                        sx={inputBgStyle}
                    />
                )}
            />

            {/* Assigned To Field */}
            <Controller
                name="assignedTo"
                control={control}
                render={({ field }) => (
                    <FormControl fullWidth required error={!!errors.assignedTo}>
                        <FormLabel
                            sx={{
                                mb: 1,
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                color: errors.assignedTo
                                    ? 'error.main'
                                    : isDarkMode
                                        ? '#E5E5E5'
                                        : '#171717',
                            }}
                        >
                            Assigned To
                        </FormLabel>
                        <Select
                            {...field}
                            disabled={isSubmitting}
                            sx={{ bgcolor: isDarkMode ? '#171717' : '#FAFAFA' }}
                        >
                            {salesReps.map((rep) => (
                                <MenuItem key={rep} value={rep}>{rep}</MenuItem>
                            ))}
                        </Select>
                        {errors.assignedTo && (
                            <FormHelperText>{errors.assignedTo.message}</FormHelperText>
                        )}
                    </FormControl>
                )}
            />

            {/* Notes Field */}
            <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Notes"
                        placeholder="Additional notes about the lead..."
                        fullWidth
                        multiline
                        rows={3}
                        margin="normal"
                        error={!!errors.notes}
                        helperText={errors.notes?.message}
                        disabled={isSubmitting}
                        sx={inputBgStyle}
                    />
                )}
            />
        </Box>
    );
}
