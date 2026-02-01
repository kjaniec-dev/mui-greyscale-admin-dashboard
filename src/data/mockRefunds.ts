export type RefundStatus = 'pending' | 'approved' | 'rejected' | 'processed';

export interface Refund {
    id: string;
    transactionId: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    amount: number;
    currency: string;
    reason: string;
    status: RefundStatus;
    requestedAt: string;
    processedAt?: string;
}

export const mockRefunds: Refund[] = [
    {
        id: 'RFD-1001',
        transactionId: 'TRX-7829-2100',
        userId: 'USR-1005',
        userName: 'Michael Wilson',
        amount: 129.99,
        currency: 'USD',
        reason: 'Duplicate purchase',
        status: 'processed',
        requestedAt: '2025-05-08T10:00:00Z',
        processedAt: '2025-05-09T11:00:00Z',
    },
    {
        id: 'RFD-1002',
        transactionId: 'TRX-7829-2210',
        userId: 'USR-1012',
        userName: 'Sarah Brown',
        amount: 49.99,
        currency: 'USD',
        reason: 'Service not as described',
        status: 'pending',
        requestedAt: '2025-05-12T15:30:00Z',
    },
    {
        id: 'RFD-1003',
        transactionId: 'TRX-7829-2150',
        userId: 'USR-1008',
        userName: 'David Miller',
        amount: 25.00,
        currency: 'USD',
        reason: 'Accidental renewal',
        status: 'approved',
        requestedAt: '2025-05-11T09:15:00Z',
    },
    {
        id: 'RFD-1004',
        transactionId: 'TRX-7829-2099',
        userId: 'USR-1002',
        userName: 'Jane Smith',
        userAvatar: '/assets/avatars/avatar-2.jpg',
        amount: 199.00,
        currency: 'USD',
        reason: 'Changed mind',
        status: 'rejected',
        requestedAt: '2025-05-10T14:20:00Z',
        processedAt: '2025-05-10T16:00:00Z',
    },
    // Generate more mock data
    ...Array.from({ length: 10 }).map((_, i) => ({
        id: `RFD-${1005 + i}`,
        transactionId: `TRX-7829-${3000 + i}`,
        userId: `USR-${2000 + i}`,
        userName: `User ${2000 + i}`,
        amount: Math.floor(Math.random() * 200) + 10,
        currency: 'USD',
        reason: ['Duplicate purchase', 'Accidental charge', 'Fraudulent', 'Other'][Math.floor(Math.random() * 4)],
        status: ['pending', 'approved', 'rejected', 'processed'][Math.floor(Math.random() * 4)] as RefundStatus,
        requestedAt: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
    })),
];
