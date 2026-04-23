import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Box,
    TextField,
    MenuItem,
    FormControl,

    FormHelperText,
    Select,
    InputAdornment,
    IconButton,
    Typography,
    Divider,
    Paper,
    useTheme,
    InputLabel,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

// Validation schema
const invoiceItemSchema = z.object({
    description: z.string().min(1, 'Description is required'),
    quantity: z.number().int().positive('Quantity must be at least 1'),
    rate: z.number().positive('Rate must be greater than 0'),
});

const invoiceFormSchema = z.object({
    customerName: z.string().min(2, 'Customer/Company name is required'),
    customerEmail: z.string().email('Invalid email address'),
    addressStreet: z.string().min(1, 'Street address is required'),
    addressCity: z.string().min(1, 'City is required'),
    addressState: z.string().min(1, 'State is required'),
    addressZipCode: z.string().min(5, 'ZIP code is required'),
    addressCountry: z.string().min(1, 'Country is required'),
    items: z.array(invoiceItemSchema).min(1, 'At least one item is required'),
    dueDate: z.string().min(1, 'Due date is required'),
    status: z.enum(['Draft', 'Pending', 'Paid', 'Overdue', 'Cancelled']),
    notes: z.string().optional(),
});

export type InvoiceFormData = z.infer<typeof invoiceFormSchema>;

interface InvoiceFormProps {
    defaultValues?: Partial<InvoiceFormData>;
    onSubmit: (data: InvoiceFormData) => void | Promise<void>;
    isSubmitting?: boolean;
}

export function InvoiceForm({ defaultValues, onSubmit, isSubmitting = false }: InvoiceFormProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    // Default due date is 30 days from now
    const defaultDueDate = new Date();
    defaultDueDate.setDate(defaultDueDate.getDate() + 30);
    const formattedDefaultDueDate = defaultDueDate.toISOString().split('T')[0];

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<InvoiceFormData>({
        resolver: zodResolver(invoiceFormSchema),
        defaultValues: {
            customerName: defaultValues?.customerName || '',
            customerEmail: defaultValues?.customerEmail || '',
            addressStreet: defaultValues?.addressStreet || '',
            addressCity: defaultValues?.addressCity || '',
            addressState: defaultValues?.addressState || '',
            addressZipCode: defaultValues?.addressZipCode || '',
            addressCountry: defaultValues?.addressCountry || 'United States',
            items: defaultValues?.items || [{ description: '', quantity: 1, rate: 0 }],
            dueDate: defaultValues?.dueDate || formattedDefaultDueDate,
            status: defaultValues?.status || 'Draft',
            notes: defaultValues?.notes || '',
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items',
    });

    const watchItems = watch('items');

    const subtotal = watchItems?.reduce((sum, item) => {
        return sum + (item.quantity || 0) * (item.rate || 0);
    }, 0) || 0;

    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    const inputSx = {
        '& .MuiInputBase-root': {
            bgcolor: isDarkMode ? '#171717' : '#FAFAFA',
        },
    };


    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            id="invoice-form"
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
            {/* Customer/Company Information */}
            <Box>
                <Typography variant="h6" sx={{ fontWeight: 600,  mb: 2  }}>
                    Bill To
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Controller
                        name="customerName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Company / Customer Name"
                                placeholder="Acme Corporation"
                                fullWidth
                                required
                                error={!!errors.customerName}
                                helperText={errors.customerName?.message}
                                disabled={isSubmitting}
                                sx={inputSx}
                            />
                        )}
                    />
                    <Controller
                        name="customerEmail"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Email"
                                placeholder="billing@company.com"
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
                </Box>
            </Box>

            <Divider />

            {/* Billing Address */}
            <Box>
                <Typography variant="h6" sx={{ fontWeight: 600,  mb: 2  }}>
                    Billing Address
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Controller
                        name="addressStreet"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Street Address"
                                placeholder="100 Business Park Dr"
                                fullWidth
                                required
                                error={!!errors.addressStreet}
                                helperText={errors.addressStreet?.message}
                                disabled={isSubmitting}
                                sx={inputSx}
                            />
                        )}
                    />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Controller
                            name="addressCity"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="City"
                                    placeholder="San Francisco"
                                    fullWidth
                                    required
                                    error={!!errors.addressCity}
                                    helperText={errors.addressCity?.message}
                                    disabled={isSubmitting}
                                    sx={inputSx}
                                />
                            )}
                        />
                        <Controller
                            name="addressState"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="State"
                                    placeholder="CA"
                                    fullWidth
                                    required
                                    error={!!errors.addressState}
                                    helperText={errors.addressState?.message}
                                    disabled={isSubmitting}
                                    sx={inputSx}
                                />
                            )}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Controller
                            name="addressZipCode"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="ZIP Code"
                                    placeholder="94105"
                                    fullWidth
                                    required
                                    error={!!errors.addressZipCode}
                                    helperText={errors.addressZipCode?.message}
                                    disabled={isSubmitting}
                                    sx={inputSx}
                                />
                            )}
                        />
                        <Controller
                            name="addressCountry"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Country"
                                    placeholder="United States"
                                    fullWidth
                                    required
                                    error={!!errors.addressCountry}
                                    helperText={errors.addressCountry?.message}
                                    disabled={isSubmitting}
                                    sx={inputSx}
                                />
                            )}
                        />
                    </Box>
                </Box>
            </Box>

            <Divider />

            {/* Invoice Items */}
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Line Items
                    </Typography>
                    <IconButton
                        onClick={() => append({ description: '', quantity: 1, rate: 0 })}
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
                                name={`items.${index}.description`}
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Description"
                                        placeholder="Service or product description"
                                        fullWidth
                                        required
                                        error={!!errors.items?.[index]?.description}
                                        helperText={errors.items?.[index]?.description?.message}
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
                                        slotProps={{ htmlInput: { min: 1 } }}
                                    />
                                )}
                            />
                            <Controller
                                name={`items.${index}.rate`}
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        label="Rate"
                                        type="number"
                                        required
                                        error={!!errors.items?.[index]?.rate}
                                        disabled={isSubmitting}
                                        size="small"
                                        sx={{ ...inputSx, width: 180 }}
                                        slotProps={{
                                            input: {
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            },
                                            htmlInput: { step: '0.01', min: 0 }
                                        }}
                                    />
                                )}
                            />
                            <Box sx={{ width: 100, textAlign: 'right', pt: 1 }}>
                                <Typography variant="body2" color="text.secondary">
                                    ${((watchItems?.[index]?.quantity || 0) * (watchItems?.[index]?.rate || 0)).toFixed(2)}
                                </Typography>
                            </Box>
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

                {/* Invoice Totals */}
                <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">Subtotal</Typography>
                        <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">Tax (8%)</Typography>
                        <Typography variant="body2">${tax.toFixed(2)}</Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Total Due</Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>${total.toFixed(2)}</Typography>
                    </Box>
                </Paper>
            </Box>

            <Divider />

            {/* Due Date & Status */}
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Controller
                    name="dueDate"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Due Date"
                            type="date"
                            fullWidth
                            required
                            error={!!errors.dueDate}
                            helperText={errors.dueDate?.message}
                            disabled={isSubmitting}
                            slotProps={{ inputLabel: { shrink: true } }}
                            sx={inputSx}
                        />
                    )}
                />
                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <FormControl fullWidth required error={!!errors.status}>
                            <InputLabel id="status-label">Status</InputLabel>
                            <Select
                                {...field}
                                labelId="status-label"
                                label="Status"
                                disabled={isSubmitting}
                                sx={{ bgcolor: isDarkMode ? '#171717' : '#FAFAFA' }}
                            >
                                <MenuItem value="Draft">Draft</MenuItem>
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Paid">Paid</MenuItem>
                                <MenuItem value="Overdue">Overdue</MenuItem>
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
                        placeholder="Payment terms, special instructions, etc."
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
