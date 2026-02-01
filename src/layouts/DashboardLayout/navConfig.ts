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
                    { title: 'List', path: '/users' },
                    { title: 'Create', path: '/users/create' },
                    { title: 'Profile', path: '/users/profile' },
                    { title: 'Account', path: '/users/account' },
                ],
            },
            {
                title: 'Products',
                path: '/products',
                icon: ProductsIcon,
                children: [
                    { title: 'List', path: '/products' },
                    { title: 'Create', path: '/products/create' },
                ],
            },
            {
                title: 'Orders',
                path: '/orders',
                icon: OrdersIcon,
                children: [
                    { title: 'List', path: '/orders' },
                    { title: 'Create', path: '/orders/create' },
                    { title: 'Details', path: '/orders/details' },
                ],
            },
            {
                title: 'Invoices',
                path: '/invoices',
                icon: InvoicesIcon,
                children: [
                    { title: 'List', path: '/invoices' },
                    { title: 'Create', path: '/invoices/create' },
                ],
            },
            {
                title: 'Finance',
                path: '/finance',
                icon: FinanceIcon,
                children: [
                    { title: 'Transactions', path: '/finance/transactions' },
                    { title: 'Refunds', path: '/finance/refunds' },
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
                title: 'Leads',
                path: '/leads',
                icon: LeadsIcon,
            },
            {
                title: 'Blog',
                path: '/blog',
                icon: BlogIcon,
                children: [
                    { title: 'Posts', path: '/blog/list' },
                    { title: 'Create', path: '/blog/create' },
                ],
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
        ],
    },
    {
        title: 'Apps',
        items: [
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
                    { title: 'Login', path: '/auth/login' },
                    { title: 'Register', path: '/auth/register' },
                    { title: 'Forgot Password', path: '/auth/forgot-password' },
                ],
            },
        ],
    },
    {
        title: 'Settings',
        items: [
            { title: 'Roles', path: '/roles', icon: RolesIcon },
            { title: 'Two-Factor Auth', path: '/2fa', icon: TwoFactorIcon },
            { title: 'Media Library', path: '/media', icon: MediaIcon },
            { title: 'Export Center', path: '/export', icon: ExportIcon },
            { title: 'Components', path: '/components', icon: ComponentsIcon },
            { title: 'Notifications', path: '/notifications', icon: NotificationsIcon },
            { title: 'Settings', path: '/settings', icon: SettingsIcon },
            { title: 'Account', path: '/account', icon: AccountIcon },
        ],
    },
];
