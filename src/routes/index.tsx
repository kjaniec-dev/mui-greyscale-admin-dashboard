import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { OverviewPage, AnalyticsPage, EcommercePage } from '../pages/dashboard';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
    },
    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            // Dashboard routes
            {
                path: 'dashboard',
                element: <OverviewPage />,
            },
            {
                path: 'dashboard/analytics',
                element: <AnalyticsPage />,
            },
            {
                path: 'dashboard/ecommerce',
                element: <EcommercePage />,
            },
            // Placeholder routes for navigation (will show coming soon)
            {
                path: 'users/*',
                element: <ComingSoon title="Users" />,
            },
            {
                path: 'products/*',
                element: <ComingSoon title="Products" />,
            },
            {
                path: 'orders/*',
                element: <ComingSoon title="Orders" />,
            },
            {
                path: 'invoices/*',
                element: <ComingSoon title="Invoices" />,
            },
            {
                path: 'blog/*',
                element: <ComingSoon title="Blog" />,
            },
            {
                path: 'apps/*',
                element: <ComingSoon title="Apps" />,
            },
            {
                path: 'settings',
                element: <ComingSoon title="Settings" />,
            },
            {
                path: 'account',
                element: <ComingSoon title="Account" />,
            },
        ],
    },
]);

// Placeholder component for unimplemented pages
function ComingSoon({ title }: { title: string }) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '60vh',
                textAlign: 'center',
            }}
        >
            <h2 style={{ marginBottom: '8px', fontWeight: 600 }}>{title}</h2>
            <p style={{ color: '#737373' }}>This page is coming soon.</p>
        </div>
    );
}
