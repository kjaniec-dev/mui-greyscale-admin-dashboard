import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { OverviewPage, AnalyticsPage, EcommercePage } from '../pages/dashboard';
import { UsersPage, UserProfilePage, UserCreatePage, UserAccountPage } from '../pages/users';
import { ProductsPage, ProductCreatePage } from '../pages/products';
import { OrdersPage, OrderCreatePage, OrderDetailsPage } from '../pages/orders';
import { InvoicesPage, InvoiceCreatePage } from '../pages/invoices';
import { CustomersPage } from '../pages/customers';
import { TicketsPage } from '../pages/tickets';
import { LeadsPage } from '../pages/leads';
import { SettingsPage } from '../pages/settings';
import { NotificationsPage } from '../pages/notifications';
import { BlogCreatePage, BlogPostsPage, BlogDetailPage, BlogEditPage } from '../pages/blog';
import { CompaniesPage, DealsPage } from '../pages/crm';
import { TransactionsPage } from '../pages/finance/TransactionsPage';
import { RefundsPage } from '../pages/finance/RefundsPage';
import { SubscriptionsPage } from '../pages/finance/SubscriptionsPage';
import { CouponsPage } from '../pages/marketing/CouponsPage';
import { CalendarPage, KanbanPage, MailPage, ChatPage, FileManagerPage } from '../pages/apps';
import { LoginPage, RegisterPage, ForgotPasswordPage } from '../pages/auth';
import { ComponentsShowcasePage } from '../pages/components';
import { ExportCenterPage } from '../pages/export';
import { RolesPermissionsPage } from '../pages/roles';
import { TwoFactorAuthPage } from '../pages/security';
import { MediaLibraryPage } from '../pages/media';
import { ErrorPage } from '../components/ErrorPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/',
        element: <DashboardLayout />,
        errorElement: <ErrorPage />,
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
            // Users management
            {
                path: 'users',
                element: <UsersPage />,
            },
            {
                path: 'users/create',
                element: <UserCreatePage />,
            },
            {
                path: 'users/profile',
                element: <UserProfilePage />,
            },
            {
                path: 'users/account',
                element: <UserAccountPage />,
            },
            // Products management
            {
                path: 'products',
                element: <ProductsPage />,
            },
            {
                path: 'products/create',
                element: <ProductCreatePage />,
            },
            {
                path: 'orders',
                element: <OrdersPage />,
            },
            {
                path: 'orders/create',
                element: <OrderCreatePage />,
            },
            {
                path: 'orders/details',
                element: <OrderDetailsPage />,
            },
            {
                path: 'orders/details/:orderId',
                element: <OrderDetailsPage />,
            },
            // Invoices management
            {
                path: 'invoices',
                element: <InvoicesPage />,
            },
            {
                path: 'invoices/create',
                element: <InvoiceCreatePage />,
            },
            // Customers management
            {
                path: 'customers',
                element: <CustomersPage />,
            },
            // CRM
            {
                path: 'crm/companies',
                element: <CompaniesPage />,
            },
            {
                path: 'crm/deals',
                element: <DealsPage />,
            },
            // Finance management
            {
                path: 'finance/transactions',
                element: <TransactionsPage />,
            },
            {
                path: 'finance/refunds',
                element: <RefundsPage />,
            },
            {
                path: 'finance/subscriptions',
                element: <SubscriptionsPage />,
            },
            // Tickets management
            {
                path: 'tickets',
                element: <TicketsPage />,
            },
            // Leads management
            {
                path: 'leads',
                element: <LeadsPage />,
            },
            {
                path: 'blog',
                element: <BlogPostsPage />,
            },
            {
                path: 'blog/list',
                element: <BlogPostsPage />,
            },
            {
                path: 'blog/create',
                element: <BlogCreatePage />,
            },
            {
                path: 'blog/:id',
                element: <BlogDetailPage />,
            },
            {
                path: 'blog/edit/:id',
                element: <BlogEditPage />,
            },
            // Marketing
            {
                path: 'marketing/coupons',
                element: <CouponsPage />,
            },
            // Apps
            {
                path: 'apps/calendar',
                element: <CalendarPage />,
            },
            {
                path: 'apps/kanban',
                element: <KanbanPage />,
            },
            {
                path: 'apps/mail',
                element: <MailPage />,
            },
            {
                path: 'apps/chat',
                element: <ChatPage />,
            },
            {
                path: 'apps/file-manager',
                element: <FileManagerPage />,
            },
            {
                path: 'apps/*',
                element: <ComingSoon title="Apps" />,
            },
            {
                path: 'settings',
                element: <SettingsPage />,
            },
            {
                path: 'notifications',
                element: <NotificationsPage />,
            },
            {
                path: 'account',
                element: <UserAccountPage />,
            },
            {
                path: 'components',
                element: <ComponentsShowcasePage />,
            },
            {
                path: 'export',
                element: <ExportCenterPage />,
            },
            {
                path: 'roles',
                element: <RolesPermissionsPage />,
            },
            {
                path: '2fa',
                element: <TwoFactorAuthPage />,
            },
            {
                path: 'media',
                element: <MediaLibraryPage />,
            },
        ],
    },
    // Auth routes
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
            {
                path: 'forgot-password',
                element: <ForgotPasswordPage />,
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
