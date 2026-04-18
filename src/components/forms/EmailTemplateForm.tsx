import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    MenuItem,
    Stack,
} from '@mui/material';
import type { EmailTemplate } from '../../data/mockEmailTemplates';

const CATEGORIES = ['Newsletter', 'Transactional', 'Promotion', 'Alert'] as const;
const STATUSES = ['Active', 'Draft', 'Archived'] as const;

const emailTemplateSchema = z.object({
    name: z.string().min(1, 'Template name is required'),
    subject: z.string().min(1, 'Subject line is required'),
    category: z.enum(CATEGORIES, {
        message: 'Category is required',
    }),
    status: z.enum(STATUSES, {
        message: 'Status is required',
    }),
    content: z.string().min(1, 'Content is required'),
});

export type EmailTemplateFormData = z.infer<typeof emailTemplateSchema>;

interface EmailTemplateFormProps {
    defaultValues?: Partial<EmailTemplate>;
    onSubmit: (data: EmailTemplateFormData) => void;
    onCancel: () => void;
}

export const EmailTemplateForm = ({ defaultValues, onSubmit, onCancel }: EmailTemplateFormProps) => {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<EmailTemplateFormData>({
        resolver: zodResolver(emailTemplateSchema),
        defaultValues: {
            name: defaultValues?.name || '',
            subject: defaultValues?.subject || '',
            category: defaultValues?.category || 'Newsletter',
            status: defaultValues?.status || 'Draft',
            content: defaultValues?.content || '',
        },
    });

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Card>
                <CardHeader title="Template Details" subheader="Manage the content and settings for this email template" />
                <Divider />
                <CardContent>
                    <Stack spacing={3}>
                        {/* Row 1: Template Name */}
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Template Name"
                                    fullWidth
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            )}
                        />

                        {/* Row 2: Category and Status */}
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        select
                                        label="Category"
                                        fullWidth
                                        error={!!errors.category}
                                        helperText={errors.category?.message}
                                    >
                                        {CATEGORIES.map((category) => (
                                            <MenuItem key={category} value={category}>
                                                {category}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                            <Controller
                                name="status"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        select
                                        label="Status"
                                        fullWidth
                                        error={!!errors.status}
                                        helperText={errors.status?.message}
                                    >
                                        {STATUSES.map((status) => (
                                            <MenuItem key={status} value={status}>
                                                {status}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </Stack>

                        {/* Row 3: Subject */}
                        <Controller
                            name="subject"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Subject Line"
                                    fullWidth
                                    error={!!errors.subject}
                                    helperText={errors.subject?.message}
                                />
                            )}
                        />

                        {/* Bottom Row: Content */}
                        <Controller
                            name="content"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="HTML Content"
                                    fullWidth
                                    multiline
                                    minRows={12}
                                    maxRows={25}
                                    error={!!errors.content}
                                    helperText={errors.content?.message || 'Enter raw HTML content for the email template.'}
                                    sx={{
                                        fontFamily: 'monospace',
                                        '& .MuiInputBase-input': {
                                            fontFamily: 'monospace',
                                        },
                                    }}
                                />
                            )}
                        />
                    </Stack>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end', px: 3, py: 2 }}>
                    <Button onClick={onCancel} variant="outlined" color="inherit">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                        {defaultValues?.id ? 'Update Template' : 'Create Template'}
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
};
