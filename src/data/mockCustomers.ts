export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    company?: string;
    avatar?: string;
    status: 'Active' | 'Inactive' | 'Lead';
    totalOrders: number;
    totalSpent: number;
    lastOrderDate?: Date;
    createdAt: Date;
    tags: string[];
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    notes?: string;
}

const firstNames = [
    'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
    'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
    'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa',
    'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley',
    'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle',
    'Kenneth', 'Carol', 'Kevin', 'Amanda', 'Brian', 'Dorothy', 'George', 'Melissa',
];

const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
    'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White',
    'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young',
];

const companies = [
    'Acme Corp', 'TechStart Inc', 'Global Solutions', 'Creative Labs', 'Digital Dynamics',
    'Future Systems', 'Innovate Co', 'Prime Services', 'Apex Industries', 'Quantum Tech',
    'Summit Partners', 'Horizon Group', 'Velocity Inc', 'Atlas Consulting', 'Nexus Labs',
    undefined, undefined, undefined, // Some customers have no company
];

const tags = [
    'VIP', 'Enterprise', 'SMB', 'Startup', 'Wholesale', 'Retail', 'Partner',
    'High-Value', 'New', 'Returning', 'At-Risk', 'Loyal',
];

const streets = [
    '123 Main St', '456 Oak Ave', '789 Pine Rd', '321 Elm Blvd', '654 Maple Dr',
    '987 Cedar Ln', '147 Birch Way', '258 Walnut Ct', '369 Cherry Pl', '741 Spruce St',
];

const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'San Antonio', 'San Diego', 'Dallas'];
const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'TX', 'CA', 'TX'];

const statuses: Customer['status'][] = ['Active', 'Inactive', 'Lead'];

function getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getRandomTags(): string[] {
    const numTags = getRandomInt(0, 3);
    const shuffled = [...tags].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numTags);
}

function generateCustomer(index: number): Customer {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    const phone = `+1 (${getRandomInt(200, 999)}) ${getRandomInt(100, 999)}-${getRandomInt(1000, 9999)}`;
    const company = getRandomElement(companies);
    const status = getRandomElement(statuses);

    const totalOrders = status === 'Lead' ? 0 : getRandomInt(1, 50);
    const totalSpent = status === 'Lead' ? 0 : Math.round(getRandomInt(50, 5000) * totalOrders * 0.1 * 100) / 100;

    const createdAt = getRandomDate(new Date(2022, 0, 1), new Date());
    const lastOrderDate = totalOrders > 0 ? getRandomDate(createdAt, new Date()) : undefined;

    const cityIndex = getRandomInt(0, cities.length - 1);

    return {
        id: `customer-${index + 1}`,
        name,
        email,
        phone,
        company,
        status,
        totalOrders,
        totalSpent,
        lastOrderDate,
        createdAt,
        tags: getRandomTags(),
        address: {
            street: getRandomElement(streets),
            city: cities[cityIndex],
            state: states[cityIndex],
            zipCode: String(getRandomInt(10000, 99999)),
            country: 'United States',
        },
    };
}

export const mockCustomers: Customer[] = Array.from({ length: 53 }, (_, i) => generateCustomer(i));
