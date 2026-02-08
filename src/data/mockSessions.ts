export interface Session {
    id: string;
    device: 'desktop' | 'mobile' | 'tablet';
    browser: string;
    os: string;
    ipAddress: string;
    location: string;
    lastActive: string;
    createdAt: string;
    isCurrent: boolean;
}

export const deviceLabels: Record<Session['device'], string> = {
    desktop: 'Desktop',
    mobile: 'Mobile',
    tablet: 'Tablet',
};

export const browserIcons: Record<string, string> = {
    Chrome: '🌐',
    Firefox: '🦊',
    Safari: '🧭',
    Edge: '🔷',
    Opera: '🔴',
    Unknown: '🌍',
};

export const mockSessions: Session[] = [
    {
        id: 'session-001',
        device: 'desktop',
        browser: 'Chrome',
        os: 'macOS Sonoma',
        ipAddress: '192.168.1.105',
        location: 'Warsaw, Poland',
        lastActive: new Date().toISOString(),
        createdAt: '2026-02-08T08:30:00Z',
        isCurrent: true,
    },
    {
        id: 'session-002',
        device: 'mobile',
        browser: 'Safari',
        os: 'iOS 17.3',
        ipAddress: '78.88.123.45',
        location: 'Krakow, Poland',
        lastActive: '2026-02-08T12:15:00Z',
        createdAt: '2026-02-07T19:45:00Z',
        isCurrent: false,
    },
    {
        id: 'session-003',
        device: 'desktop',
        browser: 'Firefox',
        os: 'Windows 11',
        ipAddress: '156.67.89.12',
        location: 'Berlin, Germany',
        lastActive: '2026-02-07T16:30:00Z',
        createdAt: '2026-02-05T10:00:00Z',
        isCurrent: false,
    },
    {
        id: 'session-004',
        device: 'tablet',
        browser: 'Chrome',
        os: 'iPadOS 17.3',
        ipAddress: '192.168.1.110',
        location: 'Warsaw, Poland',
        lastActive: '2026-02-06T20:45:00Z',
        createdAt: '2026-02-01T14:20:00Z',
        isCurrent: false,
    },
    {
        id: 'session-005',
        device: 'desktop',
        browser: 'Edge',
        os: 'Windows 10',
        ipAddress: '203.45.67.89',
        location: 'New York, USA',
        lastActive: '2026-02-04T09:00:00Z',
        createdAt: '2026-01-28T11:30:00Z',
        isCurrent: false,
    },
];

// Helper to format relative time
export function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
}
