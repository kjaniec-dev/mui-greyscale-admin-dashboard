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
const userFormSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters'),
    email: z.string()
        .email('Invalid email address')
        .min(1, 'Email is required'),
    role: z.enum(['Admin', 'User', 'Manager'], {
        message: 'Please select a valid role',
    }),
    status: z.enum(['Active', 'Inactive', 'Pending'], {
        message: 'Please select a valid status',
    }),
});

export type UserFormData = z.infer<typeof userFormSchema>;

interface UserFormProps {
    defaultValues?: Partial<UserFormData>;
    onSubmit: (data: UserFormData) => void | Promise<void>;
    isSubmitting?: boolean;
}

export function UserForm({ defaultValues, onSubmit, isSubmitting = false }: UserFormProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<UserFormData>({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            name: defaultValues?.name || '',
            email: defaultValues?.email || '',
            role: defaultValues?.role || 'User',
            status: defaultValues?.status || 'Active',
        },
    });

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            id="user-form"
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
                        placeholder="Enter full name"
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
                        placeholder="user@example.com"
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

            {/* Role Field */}
            <Controller
                name="role"
                control={control}
                render={({ field }) => (
                    <FormControl fullWidth required error={!!errors.role}>
                        <FormLabel
                            sx={{
                                mb: 1,
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                color: errors.role
                                    ? 'error.main'
                                    : isDarkMode
                                        ? '#E5E5E5'
                                        : '#171717',
                            }}
                        >
                            Role
                        </FormLabel>
                        <Select
                            {...field}
                            disabled={isSubmitting}
                            sx={{
                                bgcolor: isDarkMode ? '#171717' : '#FAFAFA',
                            }}
                        >
                            <MenuItem value="User">User</MenuItem>
                            <MenuItem value="Manager">Manager</MenuItem>
                            <MenuItem value="Admin">Admin</MenuItem>
                        </Select>
                        {errors.role && (
                            <FormHelperText>{errors.role.message}</FormHelperText>
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
                            sx={{
                                bgcolor: isDarkMode ? '#171717' : '#FAFAFA',
                            }}
                        >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Inactive">Inactive</MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
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
