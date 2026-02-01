export interface OrderItem {
    id: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

export interface OrderCustomer {
    id: string;
    name: string;
    email: string;
    phone?: string;
}

export interface OrderTimelineEvent {
    status: Order['status'];
    description: string;
    date: Date;
}

export interface Order {
    id: string;
    orderNumber: string;
    customer: OrderCustomer;
    items: OrderItem[];
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    paymentMethod: 'Credit Card' | 'PayPal' | 'Bank Transfer' | 'Cash on Delivery';
    paymentStatus: 'Paid' | 'Pending' | 'Refunded';
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
    timeline: OrderTimelineEvent[];
}

const customerNames = [
    'James Smith', 'Mary Johnson', 'John Williams', 'Patricia Brown', 'Robert Jones',
    'Jennifer Garcia', 'Michael Miller', 'Linda Davis', 'William Rodriguez', 'Elizabeth Martinez',
    'David Hernandez', 'Barbara Lopez', 'Richard Gonzalez', 'Susan Wilson', 'Joseph Anderson',
];

const productNames = [
    'Wireless Headphones', 'Smart Watch', 'Laptop Stand', 'USB-C Cable', 'Portable Charger',
    'Bluetooth Speaker', 'Cotton T-Shirt', 'Denim Jeans', 'Running Shoes', 'Winter Jacket',
    'Organic Coffee', 'Dark Chocolate', 'JavaScript Guide', 'Ceramic Mug', 'Yoga Mat',
];

const streets = [
    '123 Main St', '456 Oak Ave', '789 Pine Rd', '321 Elm Blvd', '654 Maple Dr',
    '987 Cedar Ln', '147 Birch Way', '258 Walnut Ct', '369 Cherry Pl', '741 Spruce St',
];

const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'San Antonio', 'San Diego', 'Dallas'];
const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'TX', 'CA', 'TX'];
const countries = ['United States'];

const statuses: Order['status'][] = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
const paymentMethods: Order['paymentMethod'][] = ['Credit Card', 'PayPal', 'Bank Transfer', 'Cash on Delivery'];

function getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPrice(min: number, max: number): number {
    return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

function getRandomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateOrderNumber(index: number): string {
    const year = new Date().getFullYear();
    return `ORD-${year}-${String(index + 1).padStart(5, '0')}`;
}

function generateOrderItems(): OrderItem[] {
    const itemCount = getRandomInt(1, 4);
    const items: OrderItem[] = [];

    for (let i = 0; i < itemCount; i++) {
        const quantity = getRandomInt(1, 3);
        const unitPrice = getRandomPrice(19.99, 299.99);
        items.push({
            id: `item-${i + 1}`,
            productName: getRandomElement(productNames),
            quantity,
            unitPrice,
            total: Math.round(quantity * unitPrice * 100) / 100,
        });
    }

    return items;
}

function generateTimeline(status: Order['status'], createdAt: Date): OrderTimelineEvent[] {
    const timeline: OrderTimelineEvent[] = [
        { status: 'Pending', description: 'Order placed', date: createdAt },
    ];

    if (status === 'Cancelled') {
        timeline.push({
            status: 'Cancelled',
            description: 'Order cancelled',
            date: new Date(createdAt.getTime() + 1000 * 60 * 60 * 2), // 2 hours later
        });
        return timeline;
    }

    // Add Processing
    if (['Processing', 'Shipped', 'Delivered'].includes(status)) {
        timeline.push({
            status: 'Processing',
            description: 'Payment confirmed, processing order',
            date: new Date(createdAt.getTime() + 1000 * 60 * 30), // 30 mins later
        });
    }

    // Add Shipped
    if (['Shipped', 'Delivered'].includes(status)) {
        timeline.push({
            status: 'Shipped',
            description: 'Order has been shipped',
            date: new Date(createdAt.getTime() + 1000 * 60 * 60 * 24), // 1 day later
        });
    }

    // Add Delivered
    if (status === 'Delivered') {
        timeline.push({
            status: 'Delivered',
            description: 'Order delivered',
            date: new Date(createdAt.getTime() + 1000 * 60 * 60 * 24 * 3), // 3 days later
        });
    }

    return timeline;
}

function generateOrder(index: number): Order {
    const customerName = getRandomElement(customerNames);
    const nameParts = customerName.split(' ');
    const email = `${nameParts[0].toLowerCase()}.${nameParts[1].toLowerCase()}@example.com`;

    const items = generateOrderItems();
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const tax = Math.round(subtotal * 0.08 * 100) / 100;
    const shipping = subtotal > 100 ? 0 : 9.99;
    const total = Math.round((subtotal + tax + shipping) * 100) / 100;

    const status = getRandomElement(statuses);
    const paymentStatus = status === 'Cancelled' ? 'Refunded' : status === 'Pending' ? 'Pending' : 'Paid';

    const cityIndex = getRandomInt(0, cities.length - 1);
    const createdAt = getRandomDate(new Date(2024, 0, 1), new Date());
    // Ensure updatedAt is the date of the last timeline event
    const timeline = generateTimeline(status, createdAt);
    const updatedAt = timeline[timeline.length - 1].date;

    return {
        id: `order-${index + 1}`,
        orderNumber: generateOrderNumber(index),
        customer: {
            id: `customer-${index + 1}`,
            name: customerName,
            email,
            phone: `+1 (${getRandomInt(200, 999)}) ${getRandomInt(100, 999)}-${getRandomInt(1000, 9999)}`,
        },
        items,
        subtotal: Math.round(subtotal * 100) / 100,
        tax,
        shipping,
        total,
        status,
        paymentMethod: getRandomElement(paymentMethods),
        paymentStatus,
        shippingAddress: {
            street: getRandomElement(streets),
            city: cities[cityIndex],
            state: states[cityIndex],
            zipCode: String(getRandomInt(10000, 99999)),
            country: getRandomElement(countries),
        },
        createdAt,
        updatedAt,
        timeline,
    };
}

export const mockOrders: Order[] = Array.from({ length: 42 }, (_, i) => generateOrder(i));
