export type ApiKeyPermission = 'read' | 'write' | 'delete' | 'admin';
export type ApiKeyStatus = 'active' | 'revoked' | 'expired';

export interface ApiKey {
    id: string;
    name: string;
    keyPrefix: string; // First 8 chars shown
    keySuffix: string; // Last 4 chars shown
    permissions: ApiKeyPermission[];
    createdAt: string;
    lastUsedAt?: string;
    expiresAt?: string;
    status: ApiKeyStatus;
    createdBy: string;
}

export const permissionLabels: Record<ApiKeyPermission, string> = {
    read: 'Read',
    write: 'Write',
    delete: 'Delete',
    admin: 'Admin',
};

export const permissionDescriptions: Record<ApiKeyPermission, string> = {
    read: 'View resources and data',
    write: 'Create and update resources',
    delete: 'Remove resources',
    admin: 'Full administrative access',
};

export const permissionColors: Record<ApiKeyPermission, 'info' | 'success' | 'error' | 'warning'> = {
    read: 'info',
    write: 'success',
    delete: 'error',
    admin: 'warning',
};

export const statusColors: Record<ApiKeyStatus, 'success' | 'error' | 'default'> = {
    active: 'success',
    revoked: 'error',
    expired: 'default',
};

export const expiryOptions = [
    { label: '30 days', value: 30 },
    { label: '90 days', value: 90 },
    { label: '1 year', value: 365 },
    { label: 'Never', value: null },
];

// Generate a mock API key string
export function generateMockApiKey(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = 'sk_live_';
    for (let i = 0; i < 32; i++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
}

// Mask API key for display
export function maskApiKey(prefix: string, suffix: string): string {
    return `${prefix}${'•'.repeat(16)}${suffix}`;
}

export const mockApiKeys: ApiKey[] = [
    {
        id: 'key-001',
        name: 'Production API Key',
        keyPrefix: 'sk_live_',
        keySuffix: 'Xk9m',
        permissions: ['read', 'write', 'delete'],
        createdAt: '2025-12-15T10:30:00Z',
        lastUsedAt: '2026-02-02T14:22:00Z',
        expiresAt: '2026-12-15T10:30:00Z',
        status: 'active',
        createdBy: 'Admin User',
    },
    {
        id: 'key-002',
        name: 'Analytics Integration',
        keyPrefix: 'sk_live_',
        keySuffix: '7bQt',
        permissions: ['read'],
        createdAt: '2026-01-10T09:00:00Z',
        lastUsedAt: '2026-02-01T08:15:00Z',
        expiresAt: '2026-04-10T09:00:00Z',
        status: 'active',
        createdBy: 'Admin User',
    },
    {
        id: 'key-003',
        name: 'CI/CD Pipeline',
        keyPrefix: 'sk_live_',
        keySuffix: 'pL3n',
        permissions: ['read', 'write'],
        createdAt: '2025-11-01T14:00:00Z',
        lastUsedAt: '2026-02-02T20:45:00Z',
        status: 'active',
        createdBy: 'John Doe',
    },
    {
        id: 'key-004',
        name: 'Mobile App (Legacy)',
        keyPrefix: 'sk_live_',
        keySuffix: 'rT2w',
        permissions: ['read', 'write'],
        createdAt: '2024-06-20T11:00:00Z',
        lastUsedAt: '2025-08-15T16:30:00Z',
        expiresAt: '2025-12-20T11:00:00Z',
        status: 'expired',
        createdBy: 'Jane Smith',
    },
    {
        id: 'key-005',
        name: 'Third-party Webhook',
        keyPrefix: 'sk_live_',
        keySuffix: 'mN8v',
        permissions: ['read'],
        createdAt: '2025-09-05T08:30:00Z',
        lastUsedAt: '2025-10-01T12:00:00Z',
        status: 'revoked',
        createdBy: 'Admin User',
    },
    {
        id: 'key-006',
        name: 'Admin Dashboard',
        keyPrefix: 'sk_live_',
        keySuffix: 'aB4c',
        permissions: ['read', 'write', 'delete', 'admin'],
        createdAt: '2026-01-25T16:00:00Z',
        lastUsedAt: '2026-02-02T19:30:00Z',
        expiresAt: '2027-01-25T16:00:00Z',
        status: 'active',
        createdBy: 'Admin User',
    },
];
