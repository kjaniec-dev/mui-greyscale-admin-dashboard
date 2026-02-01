export type CouponType = 'percentage' | 'fixed';
export type CouponStatus = 'active' | 'expired' | 'disabled';

export interface Coupon {
    id: string;
    code: string;
    type: CouponType;
    value: number;
    usageCount: number;
    maxUsage: number;
    status: CouponStatus;
    expirationDate: string;
    description: string;
}

export const mockCoupons: Coupon[] = [
    {
        id: '1',
        code: 'WELCOME2024',
        type: 'percentage',
        value: 20,
        usageCount: 1543,
        maxUsage: 5000,
        status: 'active',
        expirationDate: '2026-12-31T23:59:59Z',
        description: 'New year welcome discount',
    },
    {
        id: '2',
        code: 'SUMMER_SALE',
        type: 'fixed',
        value: 50,
        usageCount: 89,
        maxUsage: 100,
        status: 'active',
        expirationDate: '2026-08-31T23:59:59Z',
        description: 'Summer clearance event',
    },
    {
        id: '3',
        code: 'VIP_MEMBER',
        type: 'percentage',
        value: 15,
        usageCount: 450,
        maxUsage: 1000,
        status: 'active',
        expirationDate: '2026-06-30T23:59:59Z',
        description: 'Exclusive for VIP members',
    },
    {
        id: '4',
        code: 'FLASH10',
        type: 'percentage',
        value: 10,
        usageCount: 1000,
        maxUsage: 1000,
        status: 'expired',
        expirationDate: '2025-12-31T23:59:59Z',
        description: 'Flash sale for weekend',
    },
    {
        id: '5',
        code: 'TEST_CODE',
        type: 'fixed',
        value: 5,
        usageCount: 0,
        maxUsage: 10,
        status: 'disabled',
        expirationDate: '2026-12-31T23:59:59Z',
        description: 'Internal testing code',
    },
    {
        id: '6',
        code: 'BLACK_FRIDAY',
        type: 'percentage',
        value: 40,
        usageCount: 0,
        maxUsage: 10000,
        status: 'active',
        expirationDate: '2026-11-29T23:59:59Z',
        description: 'Black Friday Super Sale',
    },
    {
        id: '7',
        code: 'FIRST_ORDER',
        type: 'fixed',
        value: 10,
        usageCount: 2341,
        maxUsage: 50000,
        status: 'active',
        expirationDate: '2030-01-01T00:00:00Z',
        description: 'Discount for first purchase',
    },
    {
        id: '8',
        code: 'RETURNING',
        type: 'percentage',
        value: 5,
        usageCount: 432,
        maxUsage: 2000,
        status: 'active',
        expirationDate: '2026-05-15T23:59:59Z',
        description: 'Comeback incentive',
    },
    {
        id: '9',
        code: 'CART_ABANDON',
        type: 'percentage',
        value: 10,
        usageCount: 120,
        maxUsage: 1000,
        status: 'active',
        expirationDate: '2026-03-31T23:59:59Z',
        description: 'Recover abandoned carts',
    },
    {
        id: '10',
        code: 'INFLUENCER_X',
        type: 'percentage',
        value: 25,
        usageCount: 56,
        maxUsage: 500,
        status: 'active',
        expirationDate: '2026-04-30T23:59:59Z',
        description: 'Collaboration with X',
    },
    {
        id: '11',
        code: 'SPRINGSALE',
        type: 'percentage',
        value: 15,
        usageCount: 0,
        maxUsage: 500,
        status: 'disabled',
        expirationDate: '2026-04-01T23:59:59Z',
        description: 'Upcoming spring campaign',
    },
];
