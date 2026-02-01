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
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
    remember: z.boolean(),
});

type LoginInputs = z.infer<typeof schema>;

export function LoginPage() {
    const theme = useTheme();
    const navigate = useNavigate();
    const isDarkMode = theme.palette.mode === 'dark';
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<LoginInputs>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: 'admin@example.com',
            password: 'admin',
            remember: true,
        },
    });

    const onSubmit = async (data: LoginInputs) => {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Login:', data);
        setLoading(false);
        navigate('/dashboard');
    };

    return (
        <Box>
            <Box sx={{ mb: 3, textAlign: 'center' }}>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                    Welcome back
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Please enter your details to sign in.
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
                                InputProps={{
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
                                }}
                            />
                        )}
                    />

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Controller
                            name="remember"
                            control={control}
                            render={({ field }) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            {...field}
                                            checked={field.value}
                                        />
                                    }
                                    label="Remember me"
                                />
                            )}
                        />
                        <Link
                            to="/auth/forgot-password"
                            style={{
                                textDecoration: 'none',
                                color: theme.palette.text.primary,
                                fontSize: '0.875rem',
                                fontWeight: 500,
                            }}
                        >
                            Forgot password?
                        </Link>
                    </Box>

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
                        {loading ? 'Signing in...' : 'Sign in'}
                    </Button>
                </Stack>
            </form>

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don't have an account?{' '}
                <Link
                    to="/auth/register"
                    style={{
                        textDecoration: 'none',
                        color: isDarkMode ? '#FFFFFF' : '#000000',
                        fontWeight: 600,
                    }}
                >
                    Sign up
                </Link>
            </Typography>
        </Box>
    );
}
