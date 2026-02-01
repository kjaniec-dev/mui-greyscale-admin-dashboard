import { useForm, Controller, useFieldArray } from 'react-hook-form';
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
    IconButton,
    Typography,
    Divider,
    Paper,
    useTheme,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

// Validation schema
const orderItemSchema = z.object({
    productName: z.string().min(1, 'Product name is required'),
    quantity: z.number().int().positive('Quantity must be at least 1'),
    unitPrice: z.number().positive('Price must be greater than 0'),
});

const orderFormSchema = z.object({
    customerName: z.string().min(2, 'Customer name is required'),
    customerEmail: z.string().email('Invalid email address'),
    customerPhone: z.string().optional(),
    shippingStreet: z.string().min(1, 'Street address is required'),
    shippingCity: z.string().min(1, 'City is required'),
    shippingState: z.string().min(1, 'State is required'),
    shippingZipCode: z.string().min(5, 'ZIP code is required'),
    shippingCountry: z.string().min(1, 'Country is required'),
    items: z.array(orderItemSchema).min(1, 'At least one item is required'),
    paymentMethod: z.enum(['Credit Card', 'PayPal', 'Bank Transfer', 'Cash on Delivery']),
    status: z.enum(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']),
    notes: z.string().optional(),
});

export type OrderFormData = z.infer<typeof orderFormSchema>;

interface OrderFormProps {
    defaultValues?: Partial<OrderFormData>;
    onSubmit: (data: OrderFormData) => void | Promise<void>;
    isSubmitting?: boolean;
}

export function OrderForm({ defaultValues, onSubmit, isSubmitting = false }: OrderFormProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<OrderFormData>({
        resolver: zodResolver(orderFormSchema),
        defaultValues: {
            customerName: defaultValues?.customerName || '',
            customerEmail: defaultValues?.customerEmail || '',
            customerPhone: defaultValues?.customerPhone || '',
            shippingStreet: defaultValues?.shippingStreet || '',
            shippingCity: defaultValues?.shippingCity || '',
            shippingState: defaultValues?.shippingState || '',
            shippingZipCode: defaultValues?.shippingZipCode || '',
            shippingCountry: defaultValues?.shippingCountry || 'United States',
            items: defaultValues?.items || [{ productName: '', quantity: 1, unitPrice: 0 }],
            paymentMethod: defaultValues?.paymentMethod || 'Credit Card',
            status: defaultValues?.status || 'Pending',
            notes: defaultValues?.notes || '',
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items',
    });

    const watchItems = watch('items');

    const subtotal = watchItems?.reduce((sum, item) => {
        return sum + (item.quantity || 0) * (item.unitPrice || 0);
    }, 0) || 0;

    const tax = subtotal * 0.08;
    const shipping = subtotal > 100 ? 0 : 9.99;
    const total = subtotal + tax + shipping;

    const inputSx = {
        '& .MuiInputBase-root': {
            bgcolor: isDarkMode ? '#171717' : '#FAFAFA',
        },
    };

    const labelSx = {
        mb: 1,
        fontSize: '0.875rem',
        fontWeight: 500,
        color: isDarkMode ? '#E5E5E5' : '#171717',
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            id="order-form"
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
            {/* Customer Information */}
            <Box>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Customer Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Controller
                        name="customerName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Customer Name"
                                placeholder="John Doe"
                                fullWidth
                                required
                                error={!!errors.customerName}
                                helperText={errors.customerName?.message}
                                disabled={isSubmitting}
                                sx={inputSx}
                            />
                        )}
                    />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Controller
                            name="customerEmail"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    placeholder="customer@example.com"
                                    type="email"
                                    fullWidth
                                    required
                                    error={!!errors.customerEmail}
                                    helperText={errors.customerEmail?.message}
                                    disabled={isSubmitting}
                                    sx={inputSx}
                                />
                            )}
                        />
                        <Controller
                            name="customerPhone"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Phone"
                                    placeholder="+1 (555) 123-4567"
                                    fullWidth
                                    error={!!errors.customerPhone}
                                    helperText={errors.customerPhone?.message}
                                    disabled={isSubmitting}
                                    sx={inputSx}
                                />
                            )}
                        />
                    </Box>
                </Box>
            </Box>

            <Divider />

            {/* Shipping Address */}
            <Box>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Shipping Address
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Controller
                        name="shippingStreet"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Street Address"
                                placeholder="123 Main Street"
                                fullWidth
                                required
                                error={!!errors.shippingStreet}
                                helperText={errors.shippingStreet?.message}
                                disabled={isSubmitting}
                                sx={inputSx}
                            />
                        )}
                    />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Controller
                            name="shippingCity"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="City"
                                    placeholder="New York"
                                    fullWidth
                                    required
                                    error={!!errors.shippingCity}
                                    helperText={errors.shippingCity?.message}
                                    disabled={isSubmitting}
                                    sx={inputSx}
                                />
                            )}
                        />
                        <Controller
                            name="shippingState"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="State"
                                    placeholder="NY"
                                    fullWidth
                                    required
                                    error={!!errors.shippingState}
                                    helperText={errors.shippingState?.message}
                                    disabled={isSubmitting}
                                    sx={inputSx}
                                />
                            )}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Controller
                            name="shippingZipCode"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="ZIP Code"
                                    placeholder="10001"
                                    fullWidth
                                    required
                                    error={!!errors.shippingZipCode}
                                    helperText={errors.shippingZipCode?.message}
                                    disabled={isSubmitting}
                                    sx={inputSx}
                                />
                            )}
                        />
                        <Controller
                            name="shippingCountry"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Country"
                                    placeholder="United States"
                                    fullWidth
                                    required
                                    error={!!errors.shippingCountry}
                                    helperText={errors.shippingCountry?.message}
                                    disabled={isSubmitting}
                                    sx={inputSx}
                                />
                            )}
                        />
                    </Box>
                </Box>
            </Box>

            <Divider />

            {/* Order Items */}
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" fontWeight={600}>
                        Order Items
                    </Typography>
                    <IconButton
                        onClick={() => append({ productName: '', quantity: 1, unitPrice: 0 })}
                        disabled={isSubmitting}
                        size="small"
                        sx={{ bgcolor: isDarkMode ? '#262626' : '#F5F5F5' }}
                    >
                        <AddIcon />
                    </IconButton>
                </Box>

                {fields.map((field, index) => (
                    <Paper
                        key={field.id}
                        variant="outlined"
                        sx={{ p: 2, mb: 2, bgcolor: isDarkMode ? '#0A0A0A' : '#FAFAFA' }}
                    >
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                            <Controller
                                name={`items.${index}.productName`}
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Product"
                                        placeholder="Product name"
                                        fullWidth
                                        required
                                        error={!!errors.items?.[index]?.productName}
                                        helperText={errors.items?.[index]?.productName?.message}
                                        disabled={isSubmitting}
                                        size="small"
                                        sx={inputSx}
                                    />
                                )}
                            />
                            <Controller
                                name={`items.${index}.quantity`}
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        label="Qty"
                                        type="number"
                                        required
                                        error={!!errors.items?.[index]?.quantity}
                                        disabled={isSubmitting}
                                        size="small"
                                        sx={{ ...inputSx, width: 100 }}
                                        inputProps={{ min: 1 }}
                                    />
                                )}
                            />
                            <Controller
                                name={`items.${index}.unitPrice`}
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        label="Price"
                                        type="number"
                                        required
                                        error={!!errors.items?.[index]?.unitPrice}
                                        disabled={isSubmitting}
                                        size="small"
                                        sx={{ ...inputSx, width: 120 }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        }}
                                        inputProps={{ step: '0.01', min: 0 }}
                                    />
                                )}
                            />
                            <IconButton
                                onClick={() => remove(index)}
                                disabled={isSubmitting || fields.length <= 1}
                                size="small"
                                color="error"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Paper>
                ))}

                {errors.items?.message && (
                    <FormHelperText error>{errors.items.message}</FormHelperText>
                )}

                {/* Order Summary */}
                <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">Subtotal</Typography>
                        <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">Tax (8%)</Typography>
                        <Typography variant="body2">${tax.toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Shipping {subtotal > 100 && '(Free)'}
                        </Typography>
                        <Typography variant="body2">${shipping.toFixed(2)}</Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle1" fontWeight={600}>Total</Typography>
                        <Typography variant="subtitle1" fontWeight={600}>${total.toFixed(2)}</Typography>
                    </Box>
                </Paper>
            </Box>

            <Divider />

            {/* Payment & Status */}
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Controller
                    name="paymentMethod"
                    control={control}
                    render={({ field }) => (
                        <FormControl fullWidth required error={!!errors.paymentMethod}>
                            <FormLabel sx={labelSx}>Payment Method</FormLabel>
                            <Select
                                {...field}
                                disabled={isSubmitting}
                                sx={{ bgcolor: isDarkMode ? '#171717' : '#FAFAFA' }}
                            >
                                <MenuItem value="Credit Card">Credit Card</MenuItem>
                                <MenuItem value="PayPal">PayPal</MenuItem>
                                <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                                <MenuItem value="Cash on Delivery">Cash on Delivery</MenuItem>
                            </Select>
                            {errors.paymentMethod && (
                                <FormHelperText>{errors.paymentMethod.message}</FormHelperText>
                            )}
                        </FormControl>
                    )}
                />
                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <FormControl fullWidth required error={!!errors.status}>
                            <FormLabel sx={labelSx}>Order Status</FormLabel>
                            <Select
                                {...field}
                                disabled={isSubmitting}
                                sx={{ bgcolor: isDarkMode ? '#171717' : '#FAFAFA' }}
                            >
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Processing">Processing</MenuItem>
                                <MenuItem value="Shipped">Shipped</MenuItem>
                                <MenuItem value="Delivered">Delivered</MenuItem>
                                <MenuItem value="Cancelled">Cancelled</MenuItem>
                            </Select>
                            {errors.status && (
                                <FormHelperText>{errors.status.message}</FormHelperText>
                            )}
                        </FormControl>
                    )}
                />
            </Box>

            {/* Notes */}
            <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Notes"
                        placeholder="Order notes (optional)"
                        fullWidth
                        multiline
                        rows={3}
                        error={!!errors.notes}
                        helperText={errors.notes?.message}
                        disabled={isSubmitting}
                        sx={inputSx}
                    />
                )}
            />
        </Box>
    );
}
