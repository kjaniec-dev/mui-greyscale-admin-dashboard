import {
    Dashboard as DashboardIcon,
    People as UsersIcon,
    Inventory as ProductsIcon,
    Receipt as OrdersIcon,
    Paid as FinanceIcon,
    Description as InvoicesIcon,
    Article as BlogIcon,
    CalendarMonth as CalendarIcon,
    ViewKanban as KanbanIcon,
    Mail as MailIcon,
    Chat as ChatIcon,
    Folder as FileIcon,
    Settings as SettingsIcon,
    Person as AccountIcon,
    Lock as AuthIcon,
    Contacts as CustomersIcon,
    ConfirmationNumber as TicketsIcon,
    TrendingUp as LeadsIcon,
    Notifications as NotificationsIcon,
    Widgets as ComponentsIcon,
    FileDownload as ExportIcon,
    Security as RolesIcon,
    VpnKey as TwoFactorIcon,
    PermMedia as MediaIcon,
    Campaign as CampaignIcon,
    ReceiptLong as TransactionsIcon,
    CurrencyExchange as RefundsIcon,
    Autorenew as SubscriptionsIcon,
    Payments as PaymentsIcon,
    FormatListBulleted as ListIcon,
    PersonAdd as UserAddIcon,
    AccountBox as UserProfileIcon,
    ManageAccounts as UserAccountIcon,
    AddCircleOutline as CreateIcon,
    Info as DetailsIcon,
    PostAdd as InvoiceCreateIcon,
    Edit as BlogEditIcon,
    Login as LoginIcon,
    LockReset as ForgotPasswordIcon,
    Business as BusinessIcon,
    MonetizationOn as MonetizationOnIcon,
    Assessment as ReportsIcon,
    History as AuditIcon,
    Warehouse as WarehouseIcon,
    LocalShipping as SuppliersIcon,
    AssignmentReturn as ReturnsIcon,
    Inventory2 as StockIcon,
    Summarize as TaxIcon,
    Email as EmailIcon,
    Devices as DevicesIcon,
    ChatBubble as ChatHistoryIcon,
    MenuBook as KnowledgeBaseIcon,
    CheckBox as TasksIcon,
    Note as NotesIcon,
} from '@mui/icons-material';
import type { SvgIconProps } from '@mui/material';

export interface NavItem {
    title: string;
    path: string;
    icon?: React.ComponentType<SvgIconProps>;
    children?: NavItem[];
}

export interface NavSection {
    title: string;
    items: NavItem[];
}

export const navConfig: NavSection[] = [
    {
        title: 'Overview',
        items: [
            {
                title: 'Dashboard',
                path: '/dashboard',
                icon: DashboardIcon,
                children: [
                    { title: 'App', path: '/dashboard' },
                    { title: 'Analytics', path: '/dashboard/analytics' },
                    { title: 'E-commerce', path: '/dashboard/ecommerce' },
                    { title: 'Real-time', path: '/dashboard/realtime' },
                ],
            },
            {
                title: 'Reports',
                path: '/reports',
                icon: ReportsIcon,
                children: [
                    { title: 'All Reports', path: '/reports', icon: ListIcon },
                    { title: 'Create', path: '/reports/new', icon: CreateIcon },
                ],
            },
        ],
    },
    {
        title: 'Management',
        items: [
            {
                title: 'Users',
                path: '/users',
                icon: UsersIcon,
                children: [
                    { title: 'List', path: '/users', icon: ListIcon },
                    { title: 'Create', path: '/users/create', icon: UserAddIcon },
                    { title: 'Profile', path: '/users/profile', icon: UserProfileIcon },
                    { title: 'Account', path: '/users/account', icon: UserAccountIcon },
                ],
            },
            {
                title: 'Products',
                path: '/products',
                icon: ProductsIcon,
                children: [
                    { title: 'List', path: '/products', icon: ListIcon },
                    { title: 'Create', path: '/products/create', icon: CreateIcon },
                ],
            },
            {
                title: 'Orders',
                path: '/orders',
                icon: OrdersIcon,
                children: [
                    { title: 'List', path: '/orders', icon: ListIcon },
                    { title: 'Create', path: '/orders/create', icon: CreateIcon },
                    { title: 'Details', path: '/orders/details', icon: DetailsIcon },
                ],
            },
            {
                title: 'Invoices',
                path: '/invoices',
                icon: InvoicesIcon,
                children: [
                    { title: 'List', path: '/invoices', icon: ListIcon },
                    { title: 'Create', path: '/invoices/create', icon: InvoiceCreateIcon },
                ],
            },
            {
                title: 'Finance',
                path: '/finance',
                icon: FinanceIcon,
                children: [
                    { title: 'Transactions', path: '/finance/transactions', icon: TransactionsIcon },
                    { title: 'Refunds', path: '/finance/refunds', icon: RefundsIcon },
                    { title: 'Subscriptions', path: '/finance/subscriptions', icon: SubscriptionsIcon },
                    { title: 'Payouts', path: '/finance/payouts', icon: PaymentsIcon },
                    { title: 'Tax Reports', path: '/finance/tax-reports', icon: TaxIcon },
                ],
            },
            {
                title: 'Customers',
                path: '/customers',
                icon: CustomersIcon,
            },
            {
                title: 'Tickets',
                path: '/tickets',
                icon: TicketsIcon,
            },
            {
                title: 'Chat History',
                path: '/chat-history',
                icon: ChatHistoryIcon,
            },
            {
                title: 'Knowledge Base',
                path: '/knowledge-base',
                icon: KnowledgeBaseIcon,
            },
            {
                title: 'Leads',
                path: '/leads',
                icon: LeadsIcon,
            },
            {
                title: 'Blog',
                path: '/blog',
                icon: BlogIcon,
                children: [
                    { title: 'Posts', path: '/blog/list', icon: ListIcon },
                    { title: 'Create', path: '/blog/create', icon: BlogEditIcon },
                ],
            },
        ],
    },
    {
        title: 'Inventory',
        items: [
            {
                title: 'Warehouses',
                path: '/inventory/warehouses',
                icon: WarehouseIcon,
            },
            {
                title: 'Stock Levels',
                path: '/inventory/stock-levels',
                icon: StockIcon,
            },
            {
                title: 'Suppliers',
                path: '/inventory/suppliers',
                icon: SuppliersIcon,
            },
            {
                title: 'Returns',
                path: '/inventory/returns',
                icon: ReturnsIcon,
            },
        ],
    },
    {
        title: 'CRM',
        items: [
            {
                title: 'Companies',
                path: '/crm/companies',
                icon: BusinessIcon,
            },
            {
                title: 'Deals',
                path: '/crm/deals',
                icon: MonetizationOnIcon,
            },
        ],
    },
    {
        title: 'Marketing',
        items: [
            {
                title: 'Coupons',
                path: '/marketing/coupons',
                icon: CampaignIcon,
            },
            {
                title: 'Campaigns',
                path: '/marketing/campaigns',
                icon: CampaignIcon,
            },
            {
                title: 'Email Templates',
                path: '/marketing/email-templates',
                icon: EmailIcon,
            },
        ],
    },
    {
        title: 'Apps',
        items: [
            { title: 'Tasks', path: '/tasks', icon: TasksIcon },
            { title: 'Notes', path: '/notes', icon: NotesIcon },
            { title: 'Calendar', path: '/apps/calendar', icon: CalendarIcon },
            { title: 'Kanban', path: '/apps/kanban', icon: KanbanIcon },
            { title: 'Mail', path: '/apps/mail', icon: MailIcon },
            { title: 'Chat', path: '/apps/chat', icon: ChatIcon },
            { title: 'File Manager', path: '/apps/file-manager', icon: FileIcon },
        ],
    },
    {
        title: 'Auth',
        items: [
            {
                title: 'Auth',
                path: '/auth',
                icon: AuthIcon,
                children: [
                    { title: 'Login', path: '/auth/login', icon: LoginIcon },
                    { title: 'Register', path: '/auth/register', icon: UserAddIcon },
                    { title: 'Forgot Password', path: '/auth/forgot-password', icon: ForgotPasswordIcon },
                ],
            },
        ],
    },
    {
        title: 'Settings',
        items: [
            { title: 'Roles', path: '/roles', icon: RolesIcon },
            { title: 'Two-Factor Auth', path: '/2fa', icon: TwoFactorIcon },
            { title: 'Active Sessions', path: '/sessions', icon: DevicesIcon },
            { title: 'Audit Logs', path: '/audit-logs', icon: AuditIcon },
            { title: 'API Keys', path: '/api-keys', icon: TwoFactorIcon },
            { title: 'Media Library', path: '/media', icon: MediaIcon },
            { title: 'Export Center', path: '/export', icon: ExportIcon },
            { title: 'Components', path: '/components', icon: ComponentsIcon },
            {
                title: 'Notifications',
                path: '/notifications',
                icon: NotificationsIcon,
                children: [
                    { title: 'All Notifications', path: '/notifications', icon: NotificationsIcon },
                    { title: 'Email Preferences', path: '/notifications/email-preferences', icon: EmailIcon },
                ],
            },
            { title: 'Settings', path: '/settings', icon: SettingsIcon },
            { title: 'Payment Gateways', path: '/settings/payment-gateways', icon: PaymentsIcon },
            { title: 'Account', path: '/account', icon: AccountIcon },
        ],
    },
];
