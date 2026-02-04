export interface Payout {
    id: string;
    recipientName: string;
    recipientType: 'Vendor' | 'Affiliate';
    email: string;
    amount: number;
    status: 'Pending' | 'Processing' | 'Completed' | 'Failed';
    paymentMethod: 'Bank Transfer' | 'PayPal' | 'Stripe' | 'Wire Transfer';
    accountInfo: string;
    createdAt: string;
    processedAt?: string;
    notes?: string;
}

export const mockPayouts: Payout[] = [
    {
        id: 'PAY-001',
        recipientName: 'Tech Solutions Inc.',
        recipientType: 'Vendor',
        email: 'payments@techsolutions.com',
        amount: 12500.00,
        status: 'Completed',
        paymentMethod: 'Bank Transfer',
        accountInfo: '****4521',
        createdAt: '2024-01-15T10:30:00Z',
        processedAt: '2024-01-16T09:00:00Z',
    },
    {
        id: 'PAY-002',
        recipientName: 'Sarah Johnson',
        recipientType: 'Affiliate',
        email: 'sarah.j@affiliates.com',
        amount: 850.00,
        status: 'Pending',
        paymentMethod: 'PayPal',
        accountInfo: 'sarah.j@affiliates.com',
        createdAt: '2024-01-18T14:20:00Z',
    },
    {
        id: 'PAY-003',
        recipientName: 'Global Supplies Co.',
        recipientType: 'Vendor',
        email: 'finance@globalsupplies.com',
        amount: 8750.00,
        status: 'Processing',
        paymentMethod: 'Wire Transfer',
        accountInfo: '****7892',
        createdAt: '2024-01-19T08:45:00Z',
    },
    {
        id: 'PAY-004',
        recipientName: 'Michael Chen',
        recipientType: 'Affiliate',
        email: 'mchen.affiliate@email.com',
        amount: 1200.00,
        status: 'Completed',
        paymentMethod: 'Stripe',
        accountInfo: '****3456',
        createdAt: '2024-01-10T11:00:00Z',
        processedAt: '2024-01-11T15:30:00Z',
    },
    {
        id: 'PAY-005',
        recipientName: 'Premium Parts Ltd.',
        recipientType: 'Vendor',
        email: 'ap@premiumparts.co.uk',
        amount: 25000.00,
        status: 'Failed',
        paymentMethod: 'Bank Transfer',
        accountInfo: '****9012',
        createdAt: '2024-01-17T16:00:00Z',
        notes: 'Invalid account details',
    },
    {
        id: 'PAY-006',
        recipientName: 'Emma Williams',
        recipientType: 'Affiliate',
        email: 'emma.w@partners.net',
        amount: 2100.00,
        status: 'Completed',
        paymentMethod: 'PayPal',
        accountInfo: 'emma.w@partners.net',
        createdAt: '2024-01-12T09:30:00Z',
        processedAt: '2024-01-13T10:00:00Z',
    },
    {
        id: 'PAY-007',
        recipientName: 'Industrial Goods Corp.',
        recipientType: 'Vendor',
        email: 'vendor@industrialgoods.com',
        amount: 45000.00,
        status: 'Pending',
        paymentMethod: 'Wire Transfer',
        accountInfo: '****5678',
        createdAt: '2024-01-20T13:15:00Z',
    },
    {
        id: 'PAY-008',
        recipientName: 'Alex Rodriguez',
        recipientType: 'Affiliate',
        email: 'alex.r@affiliates.io',
        amount: 675.50,
        status: 'Processing',
        paymentMethod: 'Stripe',
        accountInfo: '****2345',
        createdAt: '2024-01-19T17:45:00Z',
    },
    {
        id: 'PAY-009',
        recipientName: 'Quality Materials Inc.',
        recipientType: 'Vendor',
        email: 'billing@qualitymaterials.com',
        amount: 15800.00,
        status: 'Completed',
        paymentMethod: 'Bank Transfer',
        accountInfo: '****6789',
        createdAt: '2024-01-08T10:00:00Z',
        processedAt: '2024-01-09T14:00:00Z',
    },
    {
        id: 'PAY-010',
        recipientName: 'Jennifer Lee',
        recipientType: 'Affiliate',
        email: 'jlee@marketingpros.com',
        amount: 3250.00,
        status: 'Pending',
        paymentMethod: 'PayPal',
        accountInfo: 'jlee@marketingpros.com',
        createdAt: '2024-01-21T08:00:00Z',
    },
];
