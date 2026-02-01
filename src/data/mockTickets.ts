// Support Tickets mock data

export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';
export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type TicketCategory = 'Technical' | 'Billing' | 'General' | 'Feature Request' | 'Bug Report';

export interface TicketMessage {
    id: string;
    sender: 'customer' | 'agent';
    senderName: string;
    content: string;
    createdAt: Date;
}

export interface Ticket {
    id: string;
    subject: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    category: TicketCategory;
    customerId: string;
    customerName: string;
    customerEmail: string;
    assignedTo?: string;
    createdAt: Date;
    updatedAt: Date;
    messages: TicketMessage[];
}

// Helper functions
function getRandomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Sample data
const subjects = [
    'Cannot login to my account',
    'Payment failed',
    'Product not delivered',
    'Request for refund',
    'How to change password?',
    'Invoice discrepancy',
    'Feature suggestion: Dark mode',
    'App crashes on startup',
    'Subscription renewal issue',
    'Unable to download invoice',
    'Account locked',
    'Need help with integration',
    'Billing address update',
    'Order status inquiry',
    'Bug: Button not working',
    'Performance issues',
    'Data export request',
    'API documentation question',
    'Cancel subscription',
    'Two-factor authentication issue',
];

const descriptions = [
    'I have been trying to login but it keeps showing an error message.',
    'My payment was declined even though my card is valid.',
    'I ordered three weeks ago and still haven\'t received my package.',
    'I would like to request a refund for my recent purchase.',
    'I forgot my password and the reset email is not arriving.',
    'The invoice shows incorrect amount charged.',
    'It would be great if you could add a dark mode option.',
    'The application crashes immediately after opening.',
    'My subscription was supposed to renew but it didn\'t.',
    'I\'m unable to download my invoice PDF.',
    'My account got locked after too many login attempts.',
    'I need help integrating your API with my application.',
    'I need to update my billing address.',
    'I want to know when my order will be delivered.',
    'The submit button on the form doesn\'t work.',
    'The dashboard is loading very slowly.',
    'I need to export my data for compliance purposes.',
    'The API documentation is unclear about authentication.',
    'I want to cancel my subscription effective immediately.',
    'I cannot set up two-factor authentication.',
];

const statuses: TicketStatus[] = ['Open', 'In Progress', 'Resolved', 'Closed'];
const priorities: TicketPriority[] = ['Low', 'Medium', 'High', 'Urgent'];
const categories: TicketCategory[] = ['Technical', 'Billing', 'General', 'Feature Request', 'Bug Report'];

const customerNames = [
    'John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'James Wilson',
    'Jessica Martinez', 'David Anderson', 'Ashley Taylor', 'Robert Thomas', 'Jennifer Garcia',
    'William Jackson', 'Amanda White', 'Christopher Harris', 'Stephanie Martin', 'Daniel Thompson',
    'Nicole Robinson', 'Matthew Clark', 'Elizabeth Rodriguez', 'Andrew Lewis', 'Megan Lee',
];

const agents = [
    'Alex Support', 'Jordan Helper', 'Sam Assistant', 'Casey Agent', 'Taylor Rep',
];

function generateMessages(customerName: string, ticketCreatedAt: Date): TicketMessage[] {
    const messageCount = Math.floor(Math.random() * 4) + 1;
    const messages: TicketMessage[] = [];

    let lastDate = ticketCreatedAt;

    const customerMessages = [
        'Thank you for your quick response.',
        'I tried that but it still doesn\'t work.',
        'Can you please help me further?',
        'Any update on this issue?',
        'Please let me know when this will be fixed.',
    ];

    const agentMessages = [
        'Thank you for reaching out. I\'ll look into this right away.',
        'Could you please provide more details about the issue?',
        'I\'ve escalated this to our technical team.',
        'We\'re working on a fix and will update you soon.',
        'This issue has been resolved. Please let us know if you need anything else.',
    ];

    for (let i = 0; i < messageCount; i++) {
        const isAgent = i % 2 === 0;
        lastDate = new Date(lastDate.getTime() + Math.random() * 24 * 60 * 60 * 1000);

        messages.push({
            id: `msg-${Date.now()}-${i}`,
            sender: isAgent ? 'agent' : 'customer',
            senderName: isAgent ? getRandomElement(agents) : customerName,
            content: isAgent ? getRandomElement(agentMessages) : getRandomElement(customerMessages),
            createdAt: lastDate,
        });
    }

    return messages;
}

function generateTicket(index: number): Ticket {
    const customerName = getRandomElement(customerNames);
    const email = customerName.toLowerCase().replace(' ', '.') + '@example.com';
    const createdAt = getRandomDate(new Date(2024, 0, 1), new Date());
    const updatedAt = getRandomDate(createdAt, new Date());
    const status = getRandomElement(statuses);

    return {
        id: `TKT-${String(1000 + index).padStart(4, '0')}`,
        subject: subjects[index % subjects.length],
        description: descriptions[index % descriptions.length],
        status,
        priority: getRandomElement(priorities),
        category: getRandomElement(categories),
        customerId: `cust-${index + 1}`,
        customerName,
        customerEmail: email,
        assignedTo: status !== 'Open' ? getRandomElement(agents) : undefined,
        createdAt,
        updatedAt,
        messages: generateMessages(customerName, createdAt),
    };
}

export const mockTickets: Ticket[] = Array.from({ length: 45 }, (_, i) => generateTicket(i));
