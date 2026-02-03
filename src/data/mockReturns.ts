export interface Return {
    id: string;
    orderId: string;
    productId: string;
    productName: string;
    quantity: number;
    reason: 'Defective' | 'Wrong Item' | 'Changed Mind' | 'Not as Described' | 'Damaged';
    status: 'Pending' | 'Approved' | 'Rejected' | 'Refunded' | 'Replaced';
    customerName: string;
    customerEmail: string;
    requestedAt: Date;
    resolvedAt?: Date;
    refundAmount?: number;
    notes?: string;
}

const productNames = [
    'Wireless Headphones Pro',
    'Smart Watch Plus',
    'Laptop Stand',
    'USB-C Cable Set',
    'Portable Charger',
    'Bluetooth Speaker',
    'Cotton T-Shirt',
    'Denim Jeans Plus',
    'Running Shoes Pro',
    'Winter Jacket',
    'Ceramic Mug Set',
    'Desk Lamp',
    'Yoga Mat Pro',
    'Dumbbell Set',
    'Water Bottle',
];

const customerNames = [
    'Alice Thompson',
    'Bob Martinez',
    'Carol White',
    'David Lee',
    'Emma Johnson',
    'Frank Wilson',
    'Grace Kim',
    'Henry Brown',
    'Ivy Chen',
    'Jack Davis',
    'Karen Rodriguez',
    'Leo Anderson',
    'Mia Garcia',
    'Nathan Taylor',
    'Olivia Moore',
];

const reasons: Return['reason'][] = ['Defective', 'Wrong Item', 'Changed Mind', 'Not as Described', 'Damaged'];
const statuses: Return['status'][] = ['Pending', 'Approved', 'Rejected', 'Refunded', 'Replaced'];

const returnNotes = [
    'Customer reported item stopped working after 3 days',
    'Received wrong color variant',
    'Size does not fit as expected',
    'Product looks different from listing photos',
    'Package arrived with visible damage',
    'Missing accessories from the package',
    'Customer no longer needs the item',
    'Duplicate order placed by mistake',
    'Quality not as expected',
    'Item has scratches on surface',
];

function getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateReturn(index: number): Return {
    const productName = getRandomElement(productNames);
    const customerName = getRandomElement(customerNames);
    const reason = getRandomElement(reasons);
    const status = statuses[index % statuses.length]; // Distribute statuses evenly
    const requestedAt = getRandomDate(new Date(2024, 0, 1), new Date());
    const refundAmount = Math.round((Math.random() * 200 + 20) * 100) / 100;

    const baseReturn: Return = {
        id: `RET-${String(index + 1).padStart(5, '0')}`,
        orderId: `ORD-${String(Math.floor(Math.random() * 10000) + 1000).padStart(5, '0')}`,
        productId: `product-${Math.floor(Math.random() * 48) + 1}`,
        productName,
        quantity: Math.floor(Math.random() * 3) + 1,
        reason,
        status,
        customerName,
        customerEmail: `${customerName.toLowerCase().replace(' ', '.')}@email.com`,
        requestedAt,
        notes: Math.random() > 0.3 ? getRandomElement(returnNotes) : undefined,
    };

    // Add resolution data for non-pending returns
    if (status !== 'Pending') {
        baseReturn.resolvedAt = getRandomDate(requestedAt, new Date());
        if (status === 'Refunded') {
            baseReturn.refundAmount = refundAmount;
        }
    }

    return baseReturn;
}

export const mockReturns: Return[] = Array.from({ length: 25 }, (_, i) => generateReturn(i));
