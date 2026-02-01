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
const customerFormSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters'),
    email: z.string()
        .email('Invalid email address')
        .min(1, 'Email is required'),
    phone: z.string()
        .min(10, 'Phone must be at least 10 characters')
        .max(20, 'Phone must be less than 20 characters'),
    company: z.string().optional(),
    status: z.enum(['Active', 'Inactive', 'Lead'], {
        message: 'Please select a valid status',
    }),
});

export type CustomerFormData = z.infer<typeof customerFormSchema>;

interface CustomerFormProps {
    defaultValues?: Partial<CustomerFormData>;
    onSubmit: (data: CustomerFormData) => void | Promise<void>;
    isSubmitting?: boolean;
}

export function CustomerForm({ defaultValues, onSubmit, isSubmitting = false }: CustomerFormProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<CustomerFormData>({
        resolver: zodResolver(customerFormSchema),
        defaultValues: {
            name: defaultValues?.name || '',
            email: defaultValues?.email || '',
            phone: defaultValues?.phone || '',
            company: defaultValues?.company || '',
            status: defaultValues?.status || 'Lead',
        },
    });

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            id="customer-form"
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
                        placeholder="Enter customer name"
                        fullWidth
                        required
                        margin="normal"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        disabled={isSubmitting}
                        sx={{
                            '& .MuiInputBase-root': {
                                bgcolor: isDarkMode ? '#171717' : '#FAFAFA',
                            },
                        }}
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
                        placeholder="customer@example.com"
                        type="email"
                        fullWidth
                        required
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        disabled={isSubmitting}
                        sx={{
                            '& .MuiInputBase-root': {
                                bgcolor: isDarkMode ? '#171717' : '#FAFAFA',
                            },
                        }}
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
                        sx={{
                            '& .MuiInputBase-root': {
                                bgcolor: isDarkMode ? '#171717' : '#FAFAFA',
                            },
                        }}
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
                        placeholder="Company name (optional)"
                        fullWidth
                        margin="normal"
                        error={!!errors.company}
                        helperText={errors.company?.message}
                        disabled={isSubmitting}
                        sx={{
                            '& .MuiInputBase-root': {
                                bgcolor: isDarkMode ? '#171717' : '#FAFAFA',
                            },
                        }}
                    />
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
                            sx={{
                                bgcolor: isDarkMode ? '#171717' : '#FAFAFA',
                            }}
                        >
                            <MenuItem value="Lead">Lead</MenuItem>
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Inactive">Inactive</MenuItem>
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
