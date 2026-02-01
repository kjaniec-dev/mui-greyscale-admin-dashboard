export interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    rate: number;
    amount: number;
}

export interface InvoiceCustomer {
    id: string;
    name: string;
    email: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
}

export interface Invoice {
    id: string;
    invoiceNumber: string;
    customer: InvoiceCustomer;
    items: InvoiceItem[];
    subtotal: number;
    tax: number;
    total: number;
    status: 'Draft' | 'Pending' | 'Paid' | 'Overdue' | 'Cancelled';
    issueDate: Date;
    dueDate: Date;
    paidDate?: Date;
    notes?: string;
}

const customerNames = [
    'Acme Corporation', 'TechStart Inc', 'Global Solutions Ltd', 'Creative Agency',
    'Modern Designs Co', 'Digital Dynamics', 'Cloud Systems', 'Future Tech',
    'Innovate Labs', 'Smart Solutions', 'Elite Services', 'Prime Consulting',
];

const serviceDescriptions = [
    'Web Development Services', 'UI/UX Design', 'Consulting Services', 'Monthly Retainer',
    'Software License', 'Maintenance & Support', 'API Integration', 'Data Analysis',
    'Project Management', 'Training Sessions', 'Cloud Hosting', 'Security Audit',
];

const streets = [
    '100 Business Park Dr', '500 Tech Plaza', '200 Corporate Ave', '350 Innovation Way',
    '75 Enterprise Blvd', '1200 Commerce St', '450 Digital Lane', '800 Startup Circle',
];

const cities = ['New York', 'Los Angeles', 'San Francisco', 'Chicago', 'Austin', 'Seattle', 'Boston', 'Denver'];
const states = ['NY', 'CA', 'CA', 'IL', 'TX', 'WA', 'MA', 'CO'];

const statuses: Invoice['status'][] = ['Draft', 'Pending', 'Paid', 'Overdue', 'Cancelled'];

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

function generateInvoiceNumber(index: number): string {
    const year = new Date().getFullYear();
    return `INV-${year}-${String(index + 1).padStart(4, '0')}`;
}

function generateInvoiceItems(): InvoiceItem[] {
    const itemCount = getRandomInt(1, 5);
    const items: InvoiceItem[] = [];

    for (let i = 0; i < itemCount; i++) {
        const quantity = getRandomInt(1, 10);
        const rate = getRandomPrice(50, 500);
        const amount = Math.round(quantity * rate * 100) / 100;
        items.push({
            id: `item-${i + 1}`,
            description: getRandomElement(serviceDescriptions),
            quantity,
            rate,
            amount,
        });
    }

    return items;
}

function generateInvoice(index: number): Invoice {
    const companyName = getRandomElement(customerNames);
    const email = companyName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/g, '') + '@company.com';

    const cityIndex = getRandomInt(0, cities.length - 1);

    const items = generateInvoiceItems();
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const tax = Math.round(subtotal * 0.08 * 100) / 100;
    const total = Math.round((subtotal + tax) * 100) / 100;

    const issueDate = getRandomDate(new Date(2024, 0, 1), new Date());
    const dueDate = new Date(issueDate);
    dueDate.setDate(dueDate.getDate() + 30);

    // Determine status based on dates
    let status: Invoice['status'];
    const now = new Date();
    const randomStatus = getRandomElement(statuses);

    if (randomStatus === 'Paid') {
        status = 'Paid';
    } else if (randomStatus === 'Draft') {
        status = 'Draft';
    } else if (randomStatus === 'Cancelled') {
        status = 'Cancelled';
    } else if (dueDate < now) {
        status = 'Overdue';
    } else {
        status = 'Pending';
    }

    const paidDate = status === 'Paid'
        ? getRandomDate(issueDate, new Date(Math.min(dueDate.getTime(), now.getTime())))
        : undefined;

    return {
        id: `invoice-${index + 1}`,
        invoiceNumber: generateInvoiceNumber(index),
        customer: {
            id: `customer-${index + 1}`,
            name: companyName,
            email,
            address: {
                street: getRandomElement(streets),
                city: cities[cityIndex],
                state: states[cityIndex],
                zipCode: String(getRandomInt(10000, 99999)),
                country: 'United States',
            },
        },
        items,
        subtotal: Math.round(subtotal * 100) / 100,
        tax,
        total,
        status,
        issueDate,
        dueDate,
        paidDate,
    };
}

export const mockInvoices: Invoice[] = Array.from({ length: 35 }, (_, i) => generateInvoice(i));
