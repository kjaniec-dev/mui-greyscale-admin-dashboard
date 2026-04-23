import { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    Alert,
    useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
    email: z.string().email('Invalid email address'),
});

type ForgotPasswordInputs = z.infer<typeof schema>;

export function ForgotPasswordPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<ForgotPasswordInputs>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = async (data: ForgotPasswordInputs) => {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log('Reset password for:', data);
        setLoading(false);
        setSent(true);
    };

    return (
        <Box>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                    Forgot password?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    No worries! Enter your email and we'll send you a reset link.
                </Typography>
            </Box>

            {sent ? (
                <Box sx={{ textAlign: 'center' }}>
                    <Alert
                        severity="success"
                        sx={{
                            mb: 3,
                            bgcolor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                            color: 'text.primary',
                            border: `1px solid`,
                            borderColor: 'divider',
                        }}
                    >
                        Password reset link has been sent to your email address.
                    </Alert>
                    <Link
                        to="/auth/login"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: theme.palette.text.primary,
                            fontWeight: 600,
                        }}
                    >
                        <ArrowBack sx={{ fontSize: 18, mr: 1 }} />
                        Back to login
                    </Link>
                </Box>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={3}>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Email address"
                                    fullWidth
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            )}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{
                                bgcolor: '#171717',
                                color: '#FAFAFA',
                                height: 48,
                                '&:hover': { bgcolor: '#262626' },
                            }}
                        >
                            {loading ? 'Sending link...' : 'Send reset link'}
                        </Button>

                        <Link
                            to="/auth/login"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textDecoration: 'none',
                                color: theme.palette.text.secondary,
                                fontSize: '0.875rem',
                                fontWeight: 500,
                            }}
                        >
                            <ArrowBack sx={{ fontSize: 16, mr: 1 }} />
                            Back to login
                        </Link>
                    </Stack>
                </form>
            )}
        </Box>
    );
}
