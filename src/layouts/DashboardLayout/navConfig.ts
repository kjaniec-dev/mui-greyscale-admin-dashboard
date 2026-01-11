import {
    Dashboard as DashboardIcon,
    Analytics as AnalyticsIcon,
    ShoppingCart as EcommerceIcon,
    People as UsersIcon,
    Inventory as ProductsIcon,
    Receipt as OrdersIcon,
    Description as InvoicesIcon,
    Article as BlogIcon,
    CalendarMonth as CalendarIcon,
    ViewKanban as KanbanIcon,
    Mail as MailIcon,
    Chat as ChatIcon,
    Folder as FileIcon,
    Settings as SettingsIcon,
    Person as AccountIcon,
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
                    { title: 'List', path: '/users/list' },
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
                    { title: 'List', path: '/products/list' },
                    { title: 'Create', path: '/products/create' },
                ],
            },
            {
                title: 'Orders',
                path: '/orders',
                icon: OrdersIcon,
                children: [
                    { title: 'List', path: '/orders/list' },
                    { title: 'Details', path: '/orders/details' },
                ],
            },
            {
                title: 'Invoices',
                path: '/invoices',
                icon: InvoicesIcon,
                children: [
                    { title: 'List', path: '/invoices/list' },
                    { title: 'Create', path: '/invoices/create' },
                ],
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
        title: 'Apps',
        items: [
            { title: 'Calendar', path: '/apps/calendar', icon: CalendarIcon },
            { title: 'Kanban', path: '/apps/kanban', icon: KanbanIcon },
            { title: 'Mail', path: '/apps/mail', icon: MailIcon },
            { title: 'Chat', path: '/apps/chat', icon: ChatIcon },
            { title: 'File Manager', path: '/apps/files', icon: FileIcon },
        ],
    },
    {
        title: 'Settings',
        items: [
            { title: 'Settings', path: '/settings', icon: SettingsIcon },
            { title: 'Account', path: '/account', icon: AccountIcon },
        ],
    },
];
