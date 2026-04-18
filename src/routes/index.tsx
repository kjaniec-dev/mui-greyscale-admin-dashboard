import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { OverviewPage, AnalyticsPage, EcommercePage, RealTimePage, HeatmapsPage } from '../pages/dashboard';
import { UsersPage, UserProfilePage, UserCreatePage, UserAccountPage } from '../pages/users';
import { ProductsPage, ProductCreatePage } from '../pages/products';
import { OrdersPage, OrderCreatePage, OrderDetailsPage } from '../pages/orders';
import { InvoicesPage, InvoiceCreatePage } from '../pages/invoices';
import { CustomersPage } from '../pages/customers';
import { TicketsPage } from '../pages/tickets';
import { ChatHistoryPage } from '../pages/chat-history';
import { KnowledgeBasePage, ArticleDetailPage, ArticleCreatePage } from '../pages/knowledge-base';
import { LeadsPage } from '../pages/leads';
import { SettingsPage, ApiKeysPage, PaymentGatewaysPage } from '../pages/settings';
import { NotificationsPage, EmailPreferencesPage, PushNotificationsPage } from '../pages/notifications';
import { BlogCreatePage, BlogPostsPage, BlogDetailPage, BlogEditPage, CategoriesPage } from '../pages/blog';
import { CompaniesPage, DealsPage, ContactsPage } from '../pages/crm';
import { TransactionsPage } from '../pages/finance/TransactionsPage';
import { RefundsPage } from '../pages/finance/RefundsPage';
import { SubscriptionsPage } from '../pages/finance/SubscriptionsPage';
import { PayoutsPage } from '../pages/finance/PayoutsPage';
import { TaxReportsPage } from '../pages/finance/TaxReportsPage';
import { CouponsPage, CampaignsPage, EmailTemplatesPage } from '../pages/marketing';
import { CalendarPage, KanbanPage, MailPage, ChatPage, FileManagerPage, TasksPage } from '../pages/apps';
import { NotesPage } from '../pages/notes';
import { WarehousesPage, SuppliersPage, ReturnsPage, StockLevelsPage, ShippingPage } from '../pages/inventory';
import { LoginPage, RegisterPage, ForgotPasswordPage } from '../pages/auth';
import { ComponentsShowcasePage } from '../pages/components';
import { ExportCenterPage } from '../pages/export';
import { RolesPermissionsPage } from '../pages/roles';
import { TwoFactorAuthPage, AuditLogsPage, SessionsPage } from '../pages/security';
import { MediaLibraryPage } from '../pages/media';
import { ReportsListPage, ReportBuilderPage, ScheduledReportsPage } from '../pages/reports';
import { ErrorPage } from '../components/ErrorPage';
import { ComingSoonPage } from './ComingSoonPage';

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
            {
                path: 'dashboard/realtime',
                element: <RealTimePage />,
            },
            {
                path: 'dashboard/heatmaps',
                element: <HeatmapsPage />,
            },
            // Reports
            {
                path: 'reports',
                element: <ReportsListPage />,
            },
            {
                path: 'reports/new',
                element: <ReportBuilderPage />,
            },
            {
                path: 'reports/:id/edit',
                element: <ReportBuilderPage />,
            },
            {
                path: 'reports/scheduled',
                element: <ScheduledReportsPage />,
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
                path: 'crm/contacts',
                element: <ContactsPage />,
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
            {
                path: 'finance/payouts',
                element: <PayoutsPage />,
            },
            {
                path: 'finance/tax-reports',
                element: <TaxReportsPage />,
            },
            // Tickets management
            {
                path: 'tickets',
                element: <TicketsPage />,
            },
            {
                path: 'chat-history',
                element: <ChatHistoryPage />,
            },
            // Knowledge Base
            {
                path: 'knowledge-base',
                element: <KnowledgeBasePage />,
            },
            {
                path: 'knowledge-base/create',
                element: <ArticleCreatePage />,
            },
            {
                path: 'knowledge-base/edit/:id',
                element: <ArticleCreatePage />,
            },
            {
                path: 'knowledge-base/:id',
                element: <ArticleDetailPage />,
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
                path: 'blog/categories',
                element: <CategoriesPage />,
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
            // Inventory
            {
                path: 'inventory/warehouses',
                element: <WarehousesPage />,
            },
            {
                path: 'inventory/stock-levels',
                element: <StockLevelsPage />,
            },
            {
                path: 'inventory/suppliers',
                element: <SuppliersPage />,
            },
            {
                path: 'inventory/returns',
                element: <ReturnsPage />,
            },
            {
                path: 'inventory/shipping',
                element: <ShippingPage />,
            },
            {
                path: 'marketing/coupons',
                element: <CouponsPage />,
            },
            {
                path: 'marketing/campaigns',
                element: <CampaignsPage />,
            },
            {
                path: 'marketing/email-templates',
                element: <EmailTemplatesPage />,
            },
            // Apps
            {
                path: 'apps/tasks',
                element: <TasksPage />,
            },
            {
                path: 'notes',
                element: <NotesPage />,
            },
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
                element: <ComingSoonPage title="Apps" />,
            },
            {
                path: 'settings',
                element: <SettingsPage />,
            },
            {
                path: 'settings/payment-gateways',
                element: <PaymentGatewaysPage />,
            },
            {
                path: 'notifications',
                element: <NotificationsPage />,
            },
            {
                path: 'notifications/email-preferences',
                element: <EmailPreferencesPage />,
            },
            {
                path: 'notifications/push',
                element: <PushNotificationsPage />,
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
            {
                path: 'audit-logs',
                element: <AuditLogsPage />,
            },
            {
                path: 'api-keys',
                element: <ApiKeysPage />,
            },
            {
                path: 'sessions',
                element: <SessionsPage />,
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
