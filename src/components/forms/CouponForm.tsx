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
} from '@mui/material';

// Validation schema
const couponFormSchema = z.object({
    code: z.string()
        .min(3, 'Code must be at least 3 characters')
        .max(20, 'Code must be less than 20 characters')
        .regex(/^[A-Z0-9_]+$/, 'Code must be uppercase alphanumeric with underscores'),
    type: z.enum(['percentage', 'fixed'], {
        message: 'Please select a valid type',
    }),
    value: z.number()
        .positive('Value must be positive'),
    maxUsage: z.number()
        .int('Max usage must be an integer')
        .nonnegative('Max usage must be non-negative'),
    status: z.enum(['active', 'expired', 'disabled'], {
        message: 'Please select a valid status',
    }),
    expirationDate: z.string().optional(),
    description: z.string().max(100, 'Description too long').optional(),
});

export type CouponFormData = z.infer<typeof couponFormSchema>;

interface CouponFormProps {
    defaultValues?: Partial<CouponFormData>;
    onSubmit: (data: CouponFormData) => void | Promise<void>;
    isSubmitting?: boolean;
    onCancel?: () => void;
}

export function CouponForm({ defaultValues, onSubmit, isSubmitting = false, onCancel }: CouponFormProps) {
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<CouponFormData>({
        resolver: zodResolver(couponFormSchema),
        defaultValues: {
            code: defaultValues?.code || '',
            type: defaultValues?.type || 'percentage',
            value: defaultValues?.value || 0,
            maxUsage: defaultValues?.maxUsage || 100,
            status: defaultValues?.status || 'active',
            expirationDate: defaultValues?.expirationDate || '',
            description: defaultValues?.description || '',
        },
    });

    const type = watch('type');

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            id="coupon-form"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            {/* Code Field */}
            <Controller
                name="code"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Coupon Code"
                        placeholder="SUMMER_SALE"
                        fullWidth
                        required
                        error={!!errors.code}
                        helperText={errors.code?.message}
                        disabled={isSubmitting}
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                    />
                )}
            />

            {/* Type & Value Fields */}
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                        <FormControl fullWidth required error={!!errors.type}>
                            <InputLabel>Type</InputLabel>
                            <Select {...field} label="Type" disabled={isSubmitting}>
                                <MenuItem value="percentage">Percentage (%)</MenuItem>
                                <MenuItem value="fixed">Fixed Amount ($)</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />
                <Controller
                    name="value"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label={type === 'percentage' ? 'Percentage Off' : 'Amount Off'}
                            type="number"
                            fullWidth
                            required
                            error={!!errors.value}
                            helperText={errors.value?.message}
                            disabled={isSubmitting}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            slotProps={{ input: {
                                endAdornment: type === 'percentage' ? '%' : '$',
                            } }}
                        />
                    )}
                />
            </Box>

            {/* Max Usage & Status */}
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Controller
                    name="maxUsage"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Max Usage"
                            type="number"
                            fullWidth
                            required
                            error={!!errors.maxUsage}
                            helperText={errors.maxUsage?.message}
                            disabled={isSubmitting}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                    )}
                />
                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <FormControl fullWidth required error={!!errors.status}>
                            <InputLabel>Status</InputLabel>
                            <Select {...field} label="Status" disabled={isSubmitting}>
                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="expired">Expired</MenuItem>
                                <MenuItem value="disabled">Disabled</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />
            </Box>

            {/* Expiration Date */}
            <Controller
                name="expirationDate"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Expiration Date"
                        type="date"
                        fullWidth
                        slotProps={{ inputLabel: { shrink: true } }}
                        error={!!errors.expirationDate}
                        helperText={errors.expirationDate?.message}
                        disabled={isSubmitting}
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
                        placeholder="Internal notes or public description"
                        multiline
                        rows={2}
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
                    Save Coupon
                </Button>
            </Box>
        </Box>
    );
}
