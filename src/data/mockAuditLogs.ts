export type AuditAction =
    | 'login'
    | 'logout'
    | 'create'
    | 'update'
    | 'delete'
    | 'view'
    | 'export'
    | 'settings_change'
    | 'password_change'
    | 'role_change'
    | 'permission_grant'
    | 'permission_revoke';

export type AuditResource =
    | 'user'
    | 'order'
    | 'product'
    | 'invoice'
    | 'customer'
    | 'settings'
    | 'report'
    | 'role'
    | 'coupon'
    | 'ticket'
    | 'lead'
    | 'blog_post'
    | 'file'
    | 'session';

export type AuditStatus = 'success' | 'failed' | 'warning';

export interface AuditLogEntry {
    id: string;
    userId: string;
    userName: string;
    userEmail: string;
    userAvatar?: string;
    action: AuditAction;
    resource: AuditResource;
    resourceId?: string;
    resourceName?: string;
    ipAddress: string;
    userAgent?: string;
    timestamp: string;
    status: AuditStatus;
    details?: string;
    metadata?: Record<string, unknown>;
}

export const actionLabels: Record<AuditAction, string> = {
    login: 'Logged In',
    logout: 'Logged Out',
    create: 'Created',
    update: 'Updated',
    delete: 'Deleted',
    view: 'Viewed',
    export: 'Exported',
    settings_change: 'Changed Settings',
    password_change: 'Changed Password',
    role_change: 'Changed Role',
    permission_grant: 'Granted Permission',
    permission_revoke: 'Revoked Permission',
};

export const resourceLabels: Record<AuditResource, string> = {
    user: 'User',
    order: 'Order',
    product: 'Product',
    invoice: 'Invoice',
    customer: 'Customer',
    settings: 'Settings',
    report: 'Report',
    role: 'Role',
    coupon: 'Coupon',
    ticket: 'Ticket',
    lead: 'Lead',
    blog_post: 'Blog Post',
    file: 'File',
    session: 'Session',
};

export const actionColors: Record<AuditAction, 'success' | 'error' | 'warning' | 'info' | 'default'> = {
    login: 'success',
    logout: 'default',
    create: 'success',
    update: 'warning',
    delete: 'error',
    view: 'info',
    export: 'info',
    settings_change: 'warning',
    password_change: 'warning',
    role_change: 'warning',
    permission_grant: 'success',
    permission_revoke: 'error',
};

const users = [
    { id: 'USR-001', name: 'John Doe', email: 'john.doe@example.com', avatar: '/assets/avatars/avatar-1.jpg' },
    { id: 'USR-002', name: 'Jane Smith', email: 'jane.smith@example.com', avatar: '/assets/avatars/avatar-2.jpg' },
    { id: 'USR-003', name: 'Robert Johnson', email: 'robert.j@example.com' },
    { id: 'USR-004', name: 'Emily Davis', email: 'emily.d@example.com', avatar: '/assets/avatars/avatar-4.jpg' },
    { id: 'USR-005', name: 'Michael Wilson', email: 'michael.w@example.com' },
    { id: 'USR-006', name: 'Sarah Brown', email: 'sarah.b@example.com', avatar: '/assets/avatars/avatar-6.jpg' },
    { id: 'USR-007', name: 'Admin User', email: 'admin@example.com', avatar: '/assets/avatars/avatar-7.jpg' },
];

const ipAddresses = [
    '192.168.1.105',
    '10.0.0.42',
    '172.16.0.23',
    '203.0.113.50',
    '198.51.100.14',
    '192.0.2.1',
    '100.64.0.1',
];

const actions: AuditAction[] = ['login', 'logout', 'create', 'update', 'delete', 'view', 'export', 'settings_change', 'password_change'];
const resources: AuditResource[] = ['user', 'order', 'product', 'invoice', 'customer', 'report', 'coupon', 'ticket'];

// Generate detailed mock entries
const detailedEntries: AuditLogEntry[] = [
    {
        id: 'LOG-001',
        userId: 'USR-007',
        userName: 'Admin User',
        userEmail: 'admin@example.com',
        userAvatar: '/assets/avatars/avatar-7.jpg',
        action: 'login',
        resource: 'session',
        ipAddress: '192.168.1.105',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        timestamp: '2026-02-02T20:45:00Z',
        status: 'success',
        details: 'Successful login via password authentication',
    },
    {
        id: 'LOG-002',
        userId: 'USR-007',
        userName: 'Admin User',
        userEmail: 'admin@example.com',
        userAvatar: '/assets/avatars/avatar-7.jpg',
        action: 'create',
        resource: 'user',
        resourceId: 'USR-010',
        resourceName: 'New Employee',
        ipAddress: '192.168.1.105',
        timestamp: '2026-02-02T20:30:00Z',
        status: 'success',
        details: 'Created new user account with role: Editor',
    },
    {
        id: 'LOG-003',
        userId: 'USR-001',
        userName: 'John Doe',
        userEmail: 'john.doe@example.com',
        userAvatar: '/assets/avatars/avatar-1.jpg',
        action: 'update',
        resource: 'order',
        resourceId: 'ORD-5521',
        resourceName: 'Order #5521',
        ipAddress: '10.0.0.42',
        timestamp: '2026-02-02T19:15:00Z',
        status: 'success',
        details: 'Updated order status from "Processing" to "Shipped"',
    },
    {
        id: 'LOG-004',
        userId: 'USR-002',
        userName: 'Jane Smith',
        userEmail: 'jane.smith@example.com',
        userAvatar: '/assets/avatars/avatar-2.jpg',
        action: 'delete',
        resource: 'product',
        resourceId: 'PRD-1234',
        resourceName: 'Discontinued Item',
        ipAddress: '172.16.0.23',
        timestamp: '2026-02-02T18:00:00Z',
        status: 'success',
        details: 'Permanently deleted product and associated inventory records',
    },
    {
        id: 'LOG-005',
        userId: 'USR-003',
        userName: 'Robert Johnson',
        userEmail: 'robert.j@example.com',
        action: 'export',
        resource: 'report',
        resourceName: 'Monthly Sales Report',
        ipAddress: '203.0.113.50',
        timestamp: '2026-02-02T17:30:00Z',
        status: 'success',
        details: 'Exported report as PDF (2.4 MB)',
    },
    {
        id: 'LOG-006',
        userId: 'USR-004',
        userName: 'Emily Davis',
        userEmail: 'emily.d@example.com',
        userAvatar: '/assets/avatars/avatar-4.jpg',
        action: 'login',
        resource: 'session',
        ipAddress: '198.51.100.14',
        timestamp: '2026-02-02T16:45:00Z',
        status: 'failed',
        details: 'Failed login attempt - invalid password (attempt 2 of 5)',
    },
    {
        id: 'LOG-007',
        userId: 'USR-007',
        userName: 'Admin User',
        userEmail: 'admin@example.com',
        userAvatar: '/assets/avatars/avatar-7.jpg',
        action: 'settings_change',
        resource: 'settings',
        ipAddress: '192.168.1.105',
        timestamp: '2026-02-02T15:00:00Z',
        status: 'success',
        details: 'Changed email notification settings: enabled order alerts',
    },
    {
        id: 'LOG-008',
        userId: 'USR-006',
        userName: 'Sarah Brown',
        userEmail: 'sarah.b@example.com',
        userAvatar: '/assets/avatars/avatar-6.jpg',
        action: 'role_change',
        resource: 'user',
        resourceId: 'USR-005',
        resourceName: 'Michael Wilson',
        ipAddress: '192.0.2.1',
        timestamp: '2026-02-02T14:20:00Z',
        status: 'success',
        details: 'Changed role from "Viewer" to "Editor"',
    },
    {
        id: 'LOG-009',
        userId: 'USR-001',
        userName: 'John Doe',
        userEmail: 'john.doe@example.com',
        userAvatar: '/assets/avatars/avatar-1.jpg',
        action: 'password_change',
        resource: 'user',
        resourceId: 'USR-001',
        resourceName: 'John Doe',
        ipAddress: '10.0.0.42',
        timestamp: '2026-02-02T13:00:00Z',
        status: 'success',
        details: 'Password changed successfully',
    },
    {
        id: 'LOG-010',
        userId: 'USR-002',
        userName: 'Jane Smith',
        userEmail: 'jane.smith@example.com',
        userAvatar: '/assets/avatars/avatar-2.jpg',
        action: 'create',
        resource: 'invoice',
        resourceId: 'INV-2024-0089',
        resourceName: 'Invoice #2024-0089',
        ipAddress: '172.16.0.23',
        timestamp: '2026-02-02T11:30:00Z',
        status: 'success',
        details: 'Created invoice for customer "Acme Corp" - $4,500.00',
    },
];

// Generate additional random entries
function generateRandomEntries(count: number): AuditLogEntry[] {
    const entries: AuditLogEntry[] = [];
    const baseTime = new Date('2026-02-02T10:00:00Z').getTime();

    for (let i = 0; i < count; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        const action = actions[Math.floor(Math.random() * actions.length)];
        const resource = resources[Math.floor(Math.random() * resources.length)];
        const ip = ipAddresses[Math.floor(Math.random() * ipAddresses.length)];

        entries.push({
            id: `LOG-${String(11 + i).padStart(3, '0')}`,
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
            userAvatar: user.avatar,
            action,
            resource,
            resourceId: `${resource.toUpperCase().slice(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}`,
            resourceName: `${resourceLabels[resource]} #${Math.floor(1000 + Math.random() * 9000)}`,
            ipAddress: ip,
            timestamp: new Date(baseTime - i * 1800000 - Math.random() * 3600000).toISOString(),
            status: Math.random() > 0.1 ? 'success' : (Math.random() > 0.5 ? 'failed' : 'warning'),
            details: `${actionLabels[action]} ${resourceLabels[resource].toLowerCase()}`,
        });
    }

    return entries;
}

export const mockAuditLogs: AuditLogEntry[] = [
    ...detailedEntries,
    ...generateRandomEntries(40),
].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
