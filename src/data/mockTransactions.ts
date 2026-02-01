export type TransactionStatus = 'completed' | 'pending' | 'failed' | 'refunded';
export type TransactionType = 'purchase' | 'subscription' | 'refund' | 'payout';

export interface Transaction {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    amount: number;
    currency: string;
    status: TransactionStatus;
    type: TransactionType;
    date: string;
    paymentMethod: string; // e.g., "Visa ending in 4242", "PayPal"
    description: string;
}

export const mockTransactions: Transaction[] = [
    {
        id: 'TRX-7829-2201',
        userId: 'USR-1001',
        userName: 'John Doe',
        userAvatar: '/assets/avatars/avatar-1.jpg',
        amount: 129.99,
        currency: 'USD',
        status: 'completed',
        type: 'purchase',
        date: '2025-05-12T14:30:00Z',
        paymentMethod: 'Visa •••• 4242',
        description: 'Purchase of Premium Plan',
    },
    {
        id: 'TRX-7829-2202',
        userId: 'USR-1002',
        userName: 'Jane Smith',
        userAvatar: '/assets/avatars/avatar-2.jpg',
        amount: 25.00,
        currency: 'USD',
        status: 'completed',
        type: 'subscription',
        date: '2025-05-12T10:15:00Z',
        paymentMethod: 'Mastercard •••• 8888',
        description: 'Monthly Subscription (Basic)',
    },
    {
        id: 'TRX-7829-2203',
        userId: 'USR-1003',
        userName: 'Robert Johnson',
        amount: 49.99,
        currency: 'USD',
        status: 'pending',
        type: 'purchase',
        date: '2025-05-11T16:45:00Z',
        paymentMethod: 'PayPal',
        description: 'Add-on: Advanced Analytics',
    },
    {
        id: 'TRX-7829-2204',
        userId: 'USR-1004',
        userName: 'Emily Davis',
        userAvatar: '/assets/avatars/avatar-4.jpg',
        amount: 15.00,
        currency: 'USD',
        status: 'failed',
        type: 'subscription',
        date: '2025-05-10T09:20:00Z',
        paymentMethod: 'Visa •••• 1234',
        description: 'Monthly Subscription (Basic)',
    },
    {
        id: 'TRX-7829-2205',
        userId: 'USR-1005',
        userName: 'Michael Wilson',
        amount: -129.99,
        currency: 'USD',
        status: 'refunded',
        type: 'refund',
        date: '2025-05-09T11:00:00Z',
        paymentMethod: 'Visa •••• 5678',
        description: 'Refund for TRX-7829-2100',
    },
    // Generate more mock data
    ...Array.from({ length: 15 }).map((_, i) => ({
        id: `TRX-7829-${2206 + i}`,
        userId: `USR-${1006 + i}`,
        userName: `User ${1006 + i}`,
        amount: Math.floor(Math.random() * 500) + 10,
        currency: 'USD',
        status: ['completed', 'pending', 'failed', 'refunded'][Math.floor(Math.random() * 4)] as TransactionStatus,
        type: ['purchase', 'subscription', 'payout'][Math.floor(Math.random() * 3)] as TransactionType,
        date: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
        paymentMethod: 'Visa •••• ' + Math.floor(1000 + Math.random() * 9000),
        description: 'Service Payment',
    })),
];
