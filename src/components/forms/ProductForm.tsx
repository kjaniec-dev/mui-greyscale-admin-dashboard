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

// Validation schema
const productFormSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be less than 100 characters'),
    sku: z.string()
        .min(1, 'SKU is required')
        .max(20, 'SKU must be less than 20 characters')
        .regex(/^[A-Z0-9-]+$/, 'SKU must contain only uppercase letters, numbers, and hyphens'),
    category: z.enum(['Electronics', 'Clothing', 'Food', 'Books', 'Home', 'Sports'], {
        message: 'Please select a valid category',
    }),
    price: z.number({ message: 'Price must be a valid number' })
        .positive('Price must be greater than 0'),
    stock: z.number({ message: 'Stock must be a valid number' })
        .int('Stock must be a whole number')
        .nonnegative('Stock cannot be negative'),
    status: z.enum(['In Stock', 'Low Stock', 'Out of Stock'], {
        message: 'Please select a valid status',
    }),
    description: z.string()
        .max(500, 'Description must be less than 500 characters')
        .optional()
        .or(z.literal('')),
});

export type ProductFormData = z.infer<typeof productFormSchema>;

interface ProductFormProps {
    defaultValues?: Partial<ProductFormData>;
    onSubmit: (data: ProductFormData) => void | Promise<void>;
    isSubmitting?: boolean;
}

export function ProductForm({ defaultValues, onSubmit, isSubmitting = false }: ProductFormProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            name: defaultValues?.name || '',
            sku: defaultValues?.sku || '',
            category: defaultValues?.category || 'Electronics',
            price: defaultValues?.price || 0,
            stock: defaultValues?.stock || 0,
            status: defaultValues?.status || 'In Stock',
            description: defaultValues?.description || '',
        },
    });

    const inputSx = {
        '& .MuiInputBase-root': {
            bgcolor: isDarkMode ? '#171717' : '#FAFAFA',
        },
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            id="product-form"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            {/* Name Field */}
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Product Name"
                        placeholder="Enter product name"
                        fullWidth
                        required
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        disabled={isSubmitting}
                        sx={inputSx}
                    />
                )}
            />

            {/* SKU Field */}
            <Controller
                name="sku"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="SKU"
                        placeholder="e.g., ELE-0001"
                        fullWidth
                        required
                        error={!!errors.sku}
                        helperText={errors.sku?.message || 'Uppercase letters, numbers, and hyphens only'}
                        disabled={isSubmitting}
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                        sx={inputSx}
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
                                    : isDarkMode
                                        ? '#E5E5E5'
                                        : '#171717',
                            }}
                        >
                            Category
                        </FormLabel>
                        <Select
                            {...field}
                            disabled={isSubmitting}
                            sx={{
                                bgcolor: isDarkMode ? '#171717' : '#FAFAFA',
                            }}
                        >
                            <MenuItem value="Electronics">Electronics</MenuItem>
                            <MenuItem value="Clothing">Clothing</MenuItem>
                            <MenuItem value="Food">Food</MenuItem>
                            <MenuItem value="Books">Books</MenuItem>
                            <MenuItem value="Home">Home</MenuItem>
                            <MenuItem value="Sports">Sports</MenuItem>
                        </Select>
                        {errors.category && (
                            <FormHelperText>{errors.category.message}</FormHelperText>
                        )}
                    </FormControl>
                )}
            />

            {/* Price and Stock Row */}
            <Box sx={{ display: 'flex', gap: 2 }}>
                {/* Price Field */}
                <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Price"
                            placeholder="0.00"
                            type="number"
                            fullWidth
                            required
                            error={!!errors.price}
                            helperText={errors.price?.message}
                            disabled={isSubmitting}
                            slotProps={{
                                input: {
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                },
                                htmlInput: {
                                    step: '0.01',
                                    min: '0',
                                }
                            }}
                            sx={inputSx}
                        />
                    )}
                />

                {/* Stock Field */}
                <Controller
                    name="stock"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Stock"
                            placeholder="0"
                            type="number"
                            fullWidth
                            required
                            error={!!errors.stock}
                            helperText={errors.stock?.message}
                            disabled={isSubmitting}
                            slotProps={{ htmlInput: {
                                step: '1',
                                min: '0',
                            } }}
                            sx={inputSx}
                        />
                    )}
                />
            </Box>

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
                            <MenuItem value="In Stock">In Stock</MenuItem>
                            <MenuItem value="Low Stock">Low Stock</MenuItem>
                            <MenuItem value="Out of Stock">Out of Stock</MenuItem>
                        </Select>
                        {errors.status && (
                            <FormHelperText>{errors.status.message}</FormHelperText>
                        )}
                    </FormControl>
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
                        placeholder="Enter product description (optional)"
                        fullWidth
                        multiline
                        rows={3}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        disabled={isSubmitting}
                        sx={inputSx}
                    />
                )}
            />
        </Box>
    );
}
