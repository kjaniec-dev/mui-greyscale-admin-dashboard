import type { ComponentType } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { ErrorPage } from '../components/ErrorPage';
import { ComingSoonPage } from './ComingSoonPage';

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

const loadDashboardPages = () => import('../pages/dashboard');
const loadUsersPages = () => import('../pages/users');
const loadProductsPages = () => import('../pages/products');
const loadOrdersPages = () => import('../pages/orders');
const loadInvoicesPages = () => import('../pages/invoices');
const loadCustomersPages = () => import('../pages/customers');
const loadTicketsPages = () => import('../pages/tickets');
const loadChatHistoryPages = () => import('../pages/chat-history');
const loadKnowledgeBasePages = () => import('../pages/knowledge-base');
const loadLeadsPages = () => import('../pages/leads');
const loadSettingsPages = () => import('../pages/settings');
const loadNotificationsPages = () => import('../pages/notifications');
const loadBlogPages = () => import('../pages/blog');
const loadCrmPages = () => import('../pages/crm');
const loadFinancePages = () => import('../pages/finance');
const loadMarketingPages = () => import('../pages/marketing');
const loadAppsPages = () => import('../pages/apps');
const loadNotesPages = () => import('../pages/notes');
const loadInventoryPages = () => import('../pages/inventory');
const loadAuthPages = () => import('../pages/auth');
const loadComponentsPages = () => import('../pages/components');
const loadExportPages = () => import('../pages/export');
const loadRolesPages = () => import('../pages/roles');
const loadSecurityPages = () => import('../pages/security');
const loadMediaPages = () => import('../pages/media');
const loadReportsPages = () => import('../pages/reports');

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
            { path: 'dashboard', lazy: lazyRoute(loadDashboardPages, 'OverviewPage') },
            { path: 'dashboard/analytics', lazy: lazyRoute(loadDashboardPages, 'AnalyticsPage') },
            { path: 'dashboard/ecommerce', lazy: lazyRoute(loadDashboardPages, 'EcommercePage') },
            { path: 'dashboard/realtime', lazy: lazyRoute(loadDashboardPages, 'RealTimePage') },
            { path: 'dashboard/heatmaps', lazy: lazyRoute(loadDashboardPages, 'HeatmapsPage') },
            { path: 'reports', lazy: lazyRoute(loadReportsPages, 'ReportsListPage') },
            { path: 'reports/new', lazy: lazyRoute(loadReportsPages, 'ReportBuilderPage') },
            { path: 'reports/:id/edit', lazy: lazyRoute(loadReportsPages, 'ReportBuilderPage') },
            { path: 'reports/scheduled', lazy: lazyRoute(loadReportsPages, 'ScheduledReportsPage') },
            { path: 'users', lazy: lazyRoute(loadUsersPages, 'UsersPage') },
            { path: 'users/create', lazy: lazyRoute(loadUsersPages, 'UserCreatePage') },
            { path: 'users/profile', lazy: lazyRoute(loadUsersPages, 'UserProfilePage') },
            { path: 'users/account', lazy: lazyRoute(loadUsersPages, 'UserAccountPage') },
            { path: 'products', lazy: lazyRoute(loadProductsPages, 'ProductsPage') },
            { path: 'products/create', lazy: lazyRoute(loadProductsPages, 'ProductCreatePage') },
            { path: 'orders', lazy: lazyRoute(loadOrdersPages, 'OrdersPage') },
            { path: 'orders/create', lazy: lazyRoute(loadOrdersPages, 'OrderCreatePage') },
            { path: 'orders/details', lazy: lazyRoute(loadOrdersPages, 'OrderDetailsPage') },
            { path: 'orders/details/:orderId', lazy: lazyRoute(loadOrdersPages, 'OrderDetailsPage') },
            { path: 'invoices', lazy: lazyRoute(loadInvoicesPages, 'InvoicesPage') },
            { path: 'invoices/create', lazy: lazyRoute(loadInvoicesPages, 'InvoiceCreatePage') },
            { path: 'customers', lazy: lazyRoute(loadCustomersPages, 'CustomersPage') },
            { path: 'crm/companies', lazy: lazyRoute(loadCrmPages, 'CompaniesPage') },
            { path: 'crm/contacts', lazy: lazyRoute(loadCrmPages, 'ContactsPage') },
            { path: 'crm/deals', lazy: lazyRoute(loadCrmPages, 'DealsPage') },
            { path: 'finance/transactions', lazy: lazyRoute(loadFinancePages, 'TransactionsPage') },
            { path: 'finance/refunds', lazy: lazyRoute(loadFinancePages, 'RefundsPage') },
            { path: 'finance/subscriptions', lazy: lazyRoute(loadFinancePages, 'SubscriptionsPage') },
            { path: 'finance/payouts', lazy: lazyRoute(loadFinancePages, 'PayoutsPage') },
            { path: 'finance/tax-reports', lazy: lazyRoute(loadFinancePages, 'TaxReportsPage') },
            { path: 'tickets', lazy: lazyRoute(loadTicketsPages, 'TicketsPage') },
            { path: 'chat-history', lazy: lazyRoute(loadChatHistoryPages, 'ChatHistoryPage') },
            { path: 'knowledge-base', lazy: lazyRoute(loadKnowledgeBasePages, 'KnowledgeBasePage') },
            { path: 'knowledge-base/create', lazy: lazyRoute(loadKnowledgeBasePages, 'ArticleCreatePage') },
            { path: 'knowledge-base/edit/:id', lazy: lazyRoute(loadKnowledgeBasePages, 'ArticleCreatePage') },
            { path: 'knowledge-base/:id', lazy: lazyRoute(loadKnowledgeBasePages, 'ArticleDetailPage') },
            { path: 'leads', lazy: lazyRoute(loadLeadsPages, 'LeadsPage') },
            { path: 'blog', lazy: lazyRoute(loadBlogPages, 'BlogPostsPage') },
            { path: 'blog/list', lazy: lazyRoute(loadBlogPages, 'BlogPostsPage') },
            { path: 'blog/categories', lazy: lazyRoute(loadBlogPages, 'CategoriesPage') },
            { path: 'blog/create', lazy: lazyRoute(loadBlogPages, 'BlogCreatePage') },
            { path: 'blog/:id', lazy: lazyRoute(loadBlogPages, 'BlogDetailPage') },
            { path: 'blog/edit/:id', lazy: lazyRoute(loadBlogPages, 'BlogEditPage') },
            { path: 'inventory/warehouses', lazy: lazyRoute(loadInventoryPages, 'WarehousesPage') },
            { path: 'inventory/stock-levels', lazy: lazyRoute(loadInventoryPages, 'StockLevelsPage') },
            { path: 'inventory/suppliers', lazy: lazyRoute(loadInventoryPages, 'SuppliersPage') },
            { path: 'inventory/returns', lazy: lazyRoute(loadInventoryPages, 'ReturnsPage') },
            { path: 'inventory/shipping', lazy: lazyRoute(loadInventoryPages, 'ShippingPage') },
            { path: 'marketing/coupons', lazy: lazyRoute(loadMarketingPages, 'CouponsPage') },
            { path: 'marketing/campaigns', lazy: lazyRoute(loadMarketingPages, 'CampaignsPage') },
            { path: 'marketing/email-templates', lazy: lazyRoute(loadMarketingPages, 'EmailTemplatesPage') },
            { path: 'apps/tasks', lazy: lazyRoute(loadAppsPages, 'TasksPage') },
            { path: 'notes', lazy: lazyRoute(loadNotesPages, 'NotesPage') },
            { path: 'apps/calendar', lazy: lazyRoute(loadAppsPages, 'CalendarPage') },
            { path: 'apps/kanban', lazy: lazyRoute(loadAppsPages, 'KanbanPage') },
            { path: 'apps/mail', lazy: lazyRoute(loadAppsPages, 'MailPage') },
            { path: 'apps/chat', lazy: lazyRoute(loadAppsPages, 'ChatPage') },
            { path: 'apps/file-manager', lazy: lazyRoute(loadAppsPages, 'FileManagerPage') },
            { path: 'apps/*', element: <ComingSoonPage title="Apps" /> },
            { path: 'settings', lazy: lazyRoute(loadSettingsPages, 'SettingsPage') },
            { path: 'settings/payment-gateways', lazy: lazyRoute(loadSettingsPages, 'PaymentGatewaysPage') },
            { path: 'notifications', lazy: lazyRoute(loadNotificationsPages, 'NotificationsPage') },
            { path: 'notifications/email-preferences', lazy: lazyRoute(loadNotificationsPages, 'EmailPreferencesPage') },
            { path: 'notifications/push', lazy: lazyRoute(loadNotificationsPages, 'PushNotificationsPage') },
            { path: 'account', lazy: lazyRoute(loadUsersPages, 'UserAccountPage') },
            { path: 'components', lazy: lazyRoute(loadComponentsPages, 'ComponentsShowcasePage') },
            { path: 'export', lazy: lazyRoute(loadExportPages, 'ExportCenterPage') },
            { path: 'roles', lazy: lazyRoute(loadRolesPages, 'RolesPermissionsPage') },
            { path: '2fa', lazy: lazyRoute(loadSecurityPages, 'TwoFactorAuthPage') },
            { path: 'media', lazy: lazyRoute(loadMediaPages, 'MediaLibraryPage') },
            { path: 'audit-logs', lazy: lazyRoute(loadSecurityPages, 'AuditLogsPage') },
            { path: 'api-keys', lazy: lazyRoute(loadSettingsPages, 'ApiKeysPage') },
            { path: 'sessions', lazy: lazyRoute(loadSecurityPages, 'SessionsPage') },
        ],
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            { path: 'login', lazy: lazyRoute(loadAuthPages, 'LoginPage') },
            { path: 'register', lazy: lazyRoute(loadAuthPages, 'RegisterPage') },
            { path: 'forgot-password', lazy: lazyRoute(loadAuthPages, 'ForgotPasswordPage') },
        ],
    },
]);
