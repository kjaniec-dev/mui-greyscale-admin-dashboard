export interface Shipment {
    id: string;
    orderId: string;
    orderNumber: string;
    customerName: string;
    carrier: 'FedEx' | 'UPS' | 'USPS' | 'DHL' | 'Amazon';
    trackingNumber: string;
    status: 'Label Created' | 'Picked Up' | 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Exception';
    origin: string;
    destination: string;
    weight: number; // in lbs
    shippingMethod: 'Standard' | 'Express' | 'Overnight' | 'Freight';
    shippingCost: number;
    estimatedDelivery: Date;
    actualDelivery?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const customerNames = [
    'Alice Thompson', 'Bob Martinez', 'Carol White', 'David Lee', 'Emma Johnson',
    'Frank Wilson', 'Grace Kim', 'Henry Brown', 'Ivy Chen', 'Jack Davis',
    'Karen Rodriguez', 'Leo Anderson', 'Mia Garcia', 'Nathan Taylor', 'Olivia Moore',
];

const origins = [
    'Los Angeles, CA', 'Dallas, TX', 'Chicago, IL', 'Memphis, TN', 'Louisville, KY',
    'Indianapolis, IN', 'Columbus, OH', 'Phoenix, AZ', 'Atlanta, GA', 'Seattle, WA',
];

const destinations = [
    'New York, NY', 'San Francisco, CA', 'Miami, FL', 'Boston, MA', 'Denver, CO',
    'Portland, OR', 'Nashville, TN', 'Minneapolis, MN', 'Detroit, MI', 'Charlotte, NC',
];

const carriers: Shipment['carrier'][] = ['FedEx', 'UPS', 'USPS', 'DHL', 'Amazon'];
const statuses: Shipment['status'][] = ['Label Created', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered', 'Exception'];
const methods: Shipment['shippingMethod'][] = ['Standard', 'Express', 'Overnight', 'Freight'];

function getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateTrackingNumber(carrier: Shipment['carrier']): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const randomStr = (len: number) => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');

    switch (carrier) {
        case 'FedEx': return `${Math.floor(Math.random() * 9000000000 + 1000000000)}${Math.floor(Math.random() * 90 + 10)}`;
        case 'UPS': return `1Z${randomStr(16)}`;
        case 'USPS': return `94${randomStr(20)}`.replace(/[A-Z]/g, () => String(Math.floor(Math.random() * 10)));
        case 'DHL': return `${Math.floor(Math.random() * 9000000000 + 1000000000)}`;
        case 'Amazon': return `TBA${randomStr(12)}`;
    }
}

function generateShipment(index: number): Shipment {
    const carrier = getRandomElement(carriers);
    const status = statuses[index % statuses.length];
    const method = getRandomElement(methods);
    const createdAt = getRandomDate(new Date(2024, 0, 1), new Date());
    const daysForMethod = method === 'Overnight' ? 1 : method === 'Express' ? 3 : method === 'Standard' ? 7 : 14;
    const estimatedDelivery = new Date(createdAt.getTime() + daysForMethod * 24 * 60 * 60 * 1000);
    const updatedAt = getRandomDate(createdAt, new Date());

    const costByMethod: Record<string, [number, number]> = {
        'Standard': [5.99, 15.99],
        'Express': [15.99, 35.99],
        'Overnight': [29.99, 59.99],
        'Freight': [49.99, 199.99],
    };
    const [minCost, maxCost] = costByMethod[method];
    const shippingCost = Math.round((Math.random() * (maxCost - minCost) + minCost) * 100) / 100;

    const shipment: Shipment = {
        id: `SHP-${String(index + 1).padStart(5, '0')}`,
        orderId: `order-${Math.floor(Math.random() * 42) + 1}`,
        orderNumber: `ORD-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000) + 1000).padStart(5, '0')}`,
        customerName: getRandomElement(customerNames),
        carrier,
        trackingNumber: generateTrackingNumber(carrier),
        status,
        origin: getRandomElement(origins),
        destination: getRandomElement(destinations),
        weight: Math.round((Math.random() * 50 + 0.5) * 10) / 10,
        shippingMethod: method,
        shippingCost,
        estimatedDelivery,
        createdAt,
        updatedAt,
    };

    if (status === 'Delivered') {
        shipment.actualDelivery = getRandomDate(createdAt, estimatedDelivery);
    }

    return shipment;
}

export const mockShipments: Shipment[] = Array.from({ length: 30 }, (_, i) => generateShipment(i));
