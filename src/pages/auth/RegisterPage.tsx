import { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Stack,
    InputAdornment,
    IconButton,
    useTheme,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff, Google, GitHub } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
        message: 'You must accept the terms and conditions',
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type RegisterInputs = z.infer<typeof schema>;

export function RegisterPage() {
    const theme = useTheme();
    const navigate = useNavigate();
    const isDarkMode = theme.palette.mode === 'dark';
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<RegisterInputs>({
        resolver: zodResolver(schema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            terms: true,
        },
    });

    const onSubmit = async () => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));
            navigate('/auth/login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Box sx={{ mb: 3, textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                    Get started
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Create a new account to continue.
                </Typography>
            </Box>

            {/* Social Login */}
            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Google />}
                    sx={{
                        borderColor: isDarkMode ? '#404040' : '#E5E5E5',
                        color: 'inherit',
                        '&:hover': {
                            borderColor: isDarkMode ? '#525252' : '#A3A3A3',
                            bgcolor: isDarkMode ? '#262626' : '#FAFAFA',
                        },
                    }}
                >
                    Google
                </Button>
                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GitHub />}
                    sx={{
                        borderColor: isDarkMode ? '#404040' : '#E5E5E5',
                        color: 'inherit',
                        '&:hover': {
                            borderColor: isDarkMode ? '#525252' : '#A3A3A3',
                            bgcolor: isDarkMode ? '#262626' : '#FAFAFA',
                        },
                    }}
                >
                    GitHub
                </Button>
            </Stack>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box sx={{ flex: 1, height: '1px', bgcolor: isDarkMode ? '#404040' : '#E5E5E5' }} />
                <Typography variant="caption" color="text.secondary" sx={{ mx: 2 }}>
                    OR
                </Typography>
                <Box sx={{ flex: 1, height: '1px', bgcolor: isDarkMode ? '#404040' : '#E5E5E5' }} />
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="First Name"
                                    fullWidth
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message}
                                />
                            )}
                        />
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Last Name"
                                    fullWidth
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                />
                            )}
                        />
                    </Stack>

                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Email"
                                fullWidth
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                slotProps={{ input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                } }}
                            />
                        )}
                    />
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Confirm Password"
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message}
                            />
                        )}
                    />

                    <Controller
                        name="terms"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        {...field}
                                        checked={field.value}
                                    />
                                }
                                label={
                                    <Typography variant="body2">
                                        I agree to the{' '}
                                        <Link to="#" style={{ color: 'inherit', fontWeight: 600 }}>Privacy Policy</Link>
                                    </Typography>
                                }
                            />
                        )}
                    />
                    {errors.terms && (
                        <Typography variant="caption" color="error" sx={{ mt: -1 }}>
                            {errors.terms.message}
                        </Typography>
                    )}

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
                        {loading ? 'Creating account...' : 'Create account'}
                    </Button>
                </Stack>
            </form>

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Already have an account?{' '}
                <Link
                    to="/auth/login"
                    style={{
                        textDecoration: 'none',
                        color: isDarkMode ? '#FFFFFF' : '#000000',
                        fontWeight: 600,
                    }}
                >
                    Sign in
                </Link>
            </Typography>
        </Box>
    );
}
