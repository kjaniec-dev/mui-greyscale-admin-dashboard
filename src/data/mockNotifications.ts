export type NotificationType = 'order' | 'user' | 'system' | 'message' | 'payment';

export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    description: string;
    timestamp: Date;
    read: boolean;
    avatar?: string;
    link?: string;
}

export const mockNotifications: Notification[] = [
    {
        id: 'NOTIF-001',
        type: 'order',
        title: 'New order received',
        description: 'Order #ORD-1234 has been placed by Sarah Chen',
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        read: false,
        link: '/orders',
    },
    {
        id: 'NOTIF-002',
        type: 'payment',
        title: 'Payment successful',
        description: 'Invoice #INV-5678 has been paid - $1,250.00',
        timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        read: false,
        link: '/invoices',
    },
    {
        id: 'NOTIF-003',
        type: 'user',
        title: 'New user registered',
        description: 'Mike Johnson created a new account',
        timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
        read: false,
        link: '/users',
    },
    {
        id: 'NOTIF-004',
        type: 'message',
        title: 'New message',
        description: 'You have a new message from Emily Davis',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: true,
        link: '/app/chat',
    },
    {
        id: 'NOTIF-005',
        type: 'system',
        title: 'System update',
        description: 'Dashboard has been updated to version 2.1.0',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        read: true,
    },
    {
        id: 'NOTIF-006',
        type: 'order',
        title: 'Order shipped',
        description: 'Order #ORD-1189 has been shipped via FedEx',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        read: true,
        link: '/orders',
    },
    {
        id: 'NOTIF-007',
        type: 'payment',
        title: 'Payment failed',
        description: 'Payment for Invoice #INV-5672 was declined',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        read: true,
        link: '/invoices',
    },
    {
        id: 'NOTIF-008',
        type: 'user',
        title: 'Password changed',
        description: 'Your password was changed successfully',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        read: true,
    },
];

export function getUnreadCount(notifications: Notification[]): number {
    return notifications.filter(n => !n.read).length;
}
