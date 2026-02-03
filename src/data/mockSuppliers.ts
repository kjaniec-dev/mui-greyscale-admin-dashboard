export interface Supplier {
    id: string;
    name: string;
    contactName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    status: 'Active' | 'Inactive' | 'Pending';
    rating: number;
    totalOrders: number;
    onTimeDelivery: number;
    createdAt: Date;
}

const supplierNames = [
    'Global Tech Supplies Inc.',
    'Prime Manufacturing Co.',
    'Atlas Industrial Partners',
    'Summit Logistics LLC',
    'Vertex Components Ltd.',
    'Phoenix Materials Group',
    'Sterling Supply Chain',
    'Nexus Distribution Corp.',
    'Apex Trading Solutions',
    'Titan Wholesale Inc.',
    'Highland Imports Co.',
    'Pacific Rim Suppliers',
    'Continental Goods Ltd.',
    'Metro Parts Distributors',
    'Vanguard Supply Co.',
];

const contactNames = [
    'John Smith',
    'Maria Garcia',
    'Robert Kim',
    'Lisa Chen',
    'James Brown',
    'Patricia Wilson',
    'Thomas Lee',
    'Jennifer Martinez',
    'Christopher Taylor',
    'Elizabeth Johnson',
    'Daniel White',
    'Michelle Harris',
    'Kevin Clark',
    'Amanda Lewis',
    'Brian Walker',
];

const locations = [
    { city: 'Shanghai', country: 'China' },
    { city: 'Tokyo', country: 'Japan' },
    { city: 'Seoul', country: 'South Korea' },
    { city: 'Mumbai', country: 'India' },
    { city: 'Singapore', country: 'Singapore' },
    { city: 'Frankfurt', country: 'Germany' },
    { city: 'London', country: 'UK' },
    { city: 'Toronto', country: 'Canada' },
    { city: 'Mexico City', country: 'Mexico' },
    { city: 'São Paulo', country: 'Brazil' },
    { city: 'Sydney', country: 'Australia' },
    { city: 'Amsterdam', country: 'Netherlands' },
    { city: 'Dubai', country: 'UAE' },
    { city: 'Bangkok', country: 'Thailand' },
    { city: 'Ho Chi Minh City', country: 'Vietnam' },
];

function getRandomStatus(): Supplier['status'] {
    const rand = Math.random();
    if (rand < 0.75) return 'Active';
    if (rand < 0.9) return 'Inactive';
    return 'Pending';
}

function getRandomRating(): number {
    return Math.round((Math.random() * 2 + 3) * 10) / 10; // 3.0 to 5.0
}

function getRandomOrders(): number {
    return Math.floor(Math.random() * 500) + 10;
}

function getRandomOnTimeDelivery(): number {
    return Math.floor(Math.random() * 25) + 75; // 75% to 100%
}

function generatePhone(country: string): string {
    const countryPrefixes: Record<string, string> = {
        China: '+86',
        Japan: '+81',
        'South Korea': '+82',
        India: '+91',
        Singapore: '+65',
        Germany: '+49',
        UK: '+44',
        Canada: '+1',
        Mexico: '+52',
        Brazil: '+55',
        Australia: '+61',
        Netherlands: '+31',
        UAE: '+971',
        Thailand: '+66',
        Vietnam: '+84',
    };
    const prefix = countryPrefixes[country] || '+1';
    const number = Math.floor(Math.random() * 900000000) + 100000000;
    return `${prefix} ${number}`;
}

function generateSupplier(index: number): Supplier {
    const location = locations[index % locations.length];
    const contactName = contactNames[index % contactNames.length];
    const companyName = supplierNames[index % supplierNames.length];

    return {
        id: `supplier-${index + 1}`,
        name: companyName,
        contactName,
        email: `${contactName.toLowerCase().replace(' ', '.')}@${companyName.toLowerCase().split(' ')[0]}.com`,
        phone: generatePhone(location.country),
        address: `${Math.floor(Math.random() * 999) + 1} Business Park`,
        city: location.city,
        country: location.country,
        status: getRandomStatus(),
        rating: getRandomRating(),
        totalOrders: getRandomOrders(),
        onTimeDelivery: getRandomOnTimeDelivery(),
        createdAt: new Date(2019 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    };
}

export const mockSuppliers: Supplier[] = Array.from({ length: 15 }, (_, i) => generateSupplier(i));
