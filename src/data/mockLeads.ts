export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';
export type LeadSource = 'Website' | 'Referral' | 'LinkedIn' | 'Cold Call' | 'Trade Show' | 'Advertisement';

export interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    source: LeadSource;
    status: LeadStatus;
    value: number;
    assignedTo: string;
    notes?: string;
    createdAt: Date;
    lastContactedAt?: Date;
}

const firstNames = [
    'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
    'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
    'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa',
];

const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
];

const companies = [
    'Acme Corp', 'TechStart Inc', 'Global Solutions', 'Creative Labs', 'Digital Dynamics',
    'Future Systems', 'Innovate Co', 'Prime Services', 'Apex Industries', 'Quantum Tech',
    'Summit Partners', 'Horizon Group', 'Velocity Inc', 'Atlas Consulting', 'Nexus Labs',
    'Pinnacle Tech', 'Vanguard Solutions', 'Echo Enterprises', 'Stellar Systems', 'Nova Industries',
];

const salesReps = [
    'Alex Thompson', 'Sarah Chen', 'Mike Johnson', 'Emily Davis', 'Chris Lee',
];

const sources: LeadSource[] = ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Trade Show', 'Advertisement'];
const statuses: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'];

const noteTemplates = [
    'Interested in enterprise plan. Follow up needed.',
    'Requested demo for next week.',
    'Comparing with competitors. Need to highlight our advantages.',
    'Budget approved, awaiting final decision.',
    'Met at conference, very engaged.',
    'Referred by existing customer.',
    'Looking for Q2 implementation.',
    undefined,
    undefined,
];

function getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateLead(index: number): Lead {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${getRandomElement(companies).toLowerCase().replace(/\s+/g, '')}.com`;
    const phone = `+1 (${getRandomInt(200, 999)}) ${getRandomInt(100, 999)}-${getRandomInt(1000, 9999)}`;
    const company = getRandomElement(companies);
    const source = getRandomElement(sources);
    const status = getRandomElement(statuses);
    const value = getRandomInt(5, 500) * 1000; // $5k to $500k
    const assignedTo = getRandomElement(salesReps);
    const notes = getRandomElement(noteTemplates);
    const createdAt = getRandomDate(new Date(2024, 0, 1), new Date());
    const lastContactedAt = status !== 'New' ? getRandomDate(createdAt, new Date()) : undefined;

    return {
        id: `lead-${String(index + 1).padStart(4, '0')}`,
        name,
        email,
        phone,
        company,
        source,
        status,
        value,
        assignedTo,
        notes,
        createdAt,
        lastContactedAt,
    };
}

export const mockLeads: Lead[] = Array.from({ length: 45 }, (_, i) => generateLead(i));
