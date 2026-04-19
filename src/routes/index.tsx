import type { ComponentType } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout/DashboardLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { ErrorPage } from '../components/ErrorPage';
import { ComingSoonPage } from './ComingSoonPage';
import { OverviewPage } from '../pages/dashboard/OverviewPage';

type LazyComponentModule = Record<string, ComponentType>;

const lazyRoute = <T extends LazyComponentModule>(
    loader: () => Promise<T>,
    exportName: keyof T,
) => async () => {
    const module = await loader();

    return {
        Component: module[exportName] as ComponentType,
    };
};

export const router = createBrowserRouter([
    {
        path: '/',
        element: <DashboardLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <OverviewPage /> },
            { path: 'dashboard', element: <OverviewPage /> },
            { path: 'dashboard/analytics', lazy: lazyRoute(() => import('../pages/dashboard/AnalyticsPage'), 'AnalyticsPage') },
            { path: 'dashboard/ecommerce', lazy: lazyRoute(() => import('../pages/dashboard/EcommercePage'), 'EcommercePage') },
            { path: 'dashboard/realtime', lazy: lazyRoute(() => import('../pages/dashboard/RealTimePage'), 'RealTimePage') },
            { path: 'dashboard/heatmaps', lazy: lazyRoute(() => import('../pages/dashboard/HeatmapsPage'), 'HeatmapsPage') },
            { path: 'reports', lazy: lazyRoute(() => import('../pages/reports/ReportsListPage'), 'ReportsListPage') },
            { path: 'reports/new', lazy: lazyRoute(() => import('../pages/reports/ReportBuilderPage'), 'ReportBuilderPage') },
            { path: 'reports/:id/edit', lazy: lazyRoute(() => import('../pages/reports/ReportBuilderPage'), 'ReportBuilderPage') },
            { path: 'reports/scheduled', lazy: lazyRoute(() => import('../pages/reports/ScheduledReportsPage'), 'ScheduledReportsPage') },
            { path: 'users', lazy: lazyRoute(() => import('../pages/users/UsersPage'), 'UsersPage') },
            { path: 'users/create', lazy: lazyRoute(() => import('../pages/users/UserCreatePage'), 'UserCreatePage') },
            { path: 'users/profile', lazy: lazyRoute(() => import('../pages/users/UserProfilePage'), 'UserProfilePage') },
            { path: 'users/account', lazy: lazyRoute(() => import('../pages/users/UserAccountPage'), 'UserAccountPage') },
            { path: 'products', lazy: lazyRoute(() => import('../pages/products/ProductsPage'), 'ProductsPage') },
            { path: 'products/create', lazy: lazyRoute(() => import('../pages/products/ProductCreatePage'), 'ProductCreatePage') },
            { path: 'orders', lazy: lazyRoute(() => import('../pages/orders/OrdersPage'), 'OrdersPage') },
            { path: 'orders/create', lazy: lazyRoute(() => import('../pages/orders/OrderCreatePage'), 'OrderCreatePage') },
            { path: 'orders/details', lazy: lazyRoute(() => import('../pages/orders/OrderDetailsPage'), 'OrderDetailsPage') },
            { path: 'orders/details/:orderId', lazy: lazyRoute(() => import('../pages/orders/OrderDetailsPage'), 'OrderDetailsPage') },
            { path: 'invoices', lazy: lazyRoute(() => import('../pages/invoices/InvoicesPage'), 'InvoicesPage') },
            { path: 'invoices/create', lazy: lazyRoute(() => import('../pages/invoices/InvoiceCreatePage'), 'InvoiceCreatePage') },
            { path: 'customers', lazy: lazyRoute(() => import('../pages/customers/CustomersPage'), 'CustomersPage') },
            { path: 'crm/companies', lazy: lazyRoute(() => import('../pages/crm/CompaniesPage'), 'CompaniesPage') },
            { path: 'crm/contacts', lazy: lazyRoute(() => import('../pages/crm/ContactsPage'), 'ContactsPage') },
            { path: 'crm/deals', lazy: lazyRoute(() => import('../pages/crm/DealsPage'), 'DealsPage') },
            { path: 'finance/transactions', lazy: lazyRoute(() => import('../pages/finance/TransactionsPage'), 'TransactionsPage') },
            { path: 'finance/refunds', lazy: lazyRoute(() => import('../pages/finance/RefundsPage'), 'RefundsPage') },
            { path: 'finance/subscriptions', lazy: lazyRoute(() => import('../pages/finance/SubscriptionsPage'), 'SubscriptionsPage') },
            { path: 'finance/payouts', lazy: lazyRoute(() => import('../pages/finance/PayoutsPage'), 'PayoutsPage') },
            { path: 'finance/tax-reports', lazy: lazyRoute(() => import('../pages/finance/TaxReportsPage'), 'TaxReportsPage') },
            { path: 'tickets', lazy: lazyRoute(() => import('../pages/tickets/TicketsPage'), 'TicketsPage') },
            { path: 'chat-history', lazy: lazyRoute(() => import('../pages/chat-history/ChatHistoryPage'), 'ChatHistoryPage') },
            { path: 'knowledge-base', lazy: lazyRoute(() => import('../pages/knowledge-base/KnowledgeBasePage'), 'KnowledgeBasePage') },
            { path: 'knowledge-base/create', lazy: lazyRoute(() => import('../pages/knowledge-base/ArticleCreatePage'), 'ArticleCreatePage') },
            { path: 'knowledge-base/edit/:id', lazy: lazyRoute(() => import('../pages/knowledge-base/ArticleCreatePage'), 'ArticleCreatePage') },
            { path: 'knowledge-base/:id', lazy: lazyRoute(() => import('../pages/knowledge-base/ArticleDetailPage'), 'ArticleDetailPage') },
            { path: 'leads', lazy: lazyRoute(() => import('../pages/leads/LeadsPage'), 'LeadsPage') },
            { path: 'blog', lazy: lazyRoute(() => import('../pages/blog/BlogPostsPage'), 'BlogPostsPage') },
            { path: 'blog/list', lazy: lazyRoute(() => import('../pages/blog/BlogPostsPage'), 'BlogPostsPage') },
            { path: 'blog/categories', lazy: lazyRoute(() => import('../pages/blog/CategoriesPage'), 'CategoriesPage') },
            { path: 'blog/create', lazy: lazyRoute(() => import('../pages/blog/BlogCreatePage'), 'BlogCreatePage') },
            { path: 'blog/:id', lazy: lazyRoute(() => import('../pages/blog/BlogDetailPage'), 'BlogDetailPage') },
            { path: 'blog/edit/:id', lazy: lazyRoute(() => import('../pages/blog/BlogEditPage'), 'BlogEditPage') },
            { path: 'inventory/warehouses', lazy: lazyRoute(() => import('../pages/inventory/WarehousesPage'), 'WarehousesPage') },
            { path: 'inventory/stock-levels', lazy: lazyRoute(() => import('../pages/inventory/StockLevelsPage'), 'StockLevelsPage') },
            { path: 'inventory/suppliers', lazy: lazyRoute(() => import('../pages/inventory/SuppliersPage'), 'SuppliersPage') },
            { path: 'inventory/returns', lazy: lazyRoute(() => import('../pages/inventory/ReturnsPage'), 'ReturnsPage') },
            { path: 'inventory/shipping', lazy: lazyRoute(() => import('../pages/inventory/ShippingPage'), 'ShippingPage') },
            { path: 'marketing/coupons', lazy: lazyRoute(() => import('../pages/marketing/CouponsPage'), 'CouponsPage') },
            { path: 'marketing/campaigns', lazy: lazyRoute(() => import('../pages/marketing/CampaignsPage'), 'CampaignsPage') },
            { path: 'marketing/email-templates', lazy: lazyRoute(() => import('../pages/marketing/EmailTemplatesPage'), 'EmailTemplatesPage') },
            { path: 'apps/tasks', lazy: lazyRoute(() => import('../pages/apps/TasksPage'), 'TasksPage') },
            { path: 'notes', lazy: lazyRoute(() => import('../pages/notes/NotesPage'), 'NotesPage') },
            { path: 'apps/calendar', lazy: lazyRoute(() => import('../pages/apps/CalendarPage'), 'CalendarPage') },
            { path: 'apps/kanban', lazy: lazyRoute(() => import('../pages/apps/KanbanPage'), 'KanbanPage') },
            { path: 'apps/mail', lazy: lazyRoute(() => import('../pages/apps/MailPage'), 'MailPage') },
            { path: 'apps/chat', lazy: lazyRoute(() => import('../pages/apps/ChatPage'), 'ChatPage') },
            { path: 'apps/file-manager', lazy: lazyRoute(() => import('../pages/apps/FileManagerPage'), 'FileManagerPage') },
            { path: 'apps/*', element: <ComingSoonPage title="Apps" /> },
            { path: 'settings', lazy: lazyRoute(() => import('../pages/settings/SettingsPage'), 'SettingsPage') },
            { path: 'settings/payment-gateways', lazy: lazyRoute(() => import('../pages/settings/PaymentGatewaysPage'), 'PaymentGatewaysPage') },
            { path: 'notifications', lazy: lazyRoute(() => import('../pages/notifications/NotificationsPage'), 'NotificationsPage') },
            { path: 'notifications/email-preferences', lazy: lazyRoute(() => import('../pages/notifications/EmailPreferencesPage'), 'EmailPreferencesPage') },
            { path: 'notifications/push', lazy: lazyRoute(() => import('../pages/notifications/PushNotificationsPage'), 'PushNotificationsPage') },
            { path: 'account', lazy: lazyRoute(() => import('../pages/users/UserAccountPage'), 'UserAccountPage') },
            { path: 'components', lazy: lazyRoute(() => import('../pages/components/ComponentsShowcasePage'), 'ComponentsShowcasePage') },
            { path: 'export', lazy: lazyRoute(() => import('../pages/export/ExportCenterPage'), 'ExportCenterPage') },
            { path: 'roles', lazy: lazyRoute(() => import('../pages/roles/RolesPermissionsPage'), 'RolesPermissionsPage') },
            { path: '2fa', lazy: lazyRoute(() => import('../pages/security/TwoFactorAuthPage'), 'TwoFactorAuthPage') },
            { path: 'media', lazy: lazyRoute(() => import('../pages/media/MediaLibraryPage'), 'MediaLibraryPage') },
            { path: 'audit-logs', lazy: lazyRoute(() => import('../pages/security/AuditLogsPage'), 'AuditLogsPage') },
            { path: 'api-keys', lazy: lazyRoute(() => import('../pages/settings/ApiKeysPage'), 'ApiKeysPage') },
            { path: 'sessions', lazy: lazyRoute(() => import('../pages/security/SessionsPage'), 'SessionsPage') },
        ],
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            { path: 'login', lazy: lazyRoute(() => import('../pages/auth/LoginPage'), 'LoginPage') },
            { path: 'register', lazy: lazyRoute(() => import('../pages/auth/RegisterPage'), 'RegisterPage') },
            { path: 'forgot-password', lazy: lazyRoute(() => import('../pages/auth/ForgotPasswordPage'), 'ForgotPasswordPage') },
        ],
    },
]);
