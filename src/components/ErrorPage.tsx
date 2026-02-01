import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';

export function ErrorPage() {
    const error = useRouteError();
    let errorMessage: string;

    if (isRouteErrorResponse(error)) {
        // error is type `ErrorResponse`
        errorMessage = error.statusText || error.data?.message || 'Unknown error';
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    } else {
        console.error(error);
        errorMessage = 'Unknown error';
    }

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    textAlign: 'center',
                    gap: 2,
                }}
            >
                <ErrorIcon color="error" sx={{ fontSize: 64, mb: 2 }} />
                <Typography variant="h4" component="h1" gutterBottom>
                    Oops!
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    Sorry, an unexpected error has occurred.
                </Typography>
                <Typography variant="body2" color="error" sx={{ mb: 4, fontFamily: 'monospace' }}>
                    {errorMessage}
                </Typography>
                <Button variant="contained" component={Link} to="/">
                    Go back to Dashboard
                </Button>
            </Box>
        </Container>
    );
}
