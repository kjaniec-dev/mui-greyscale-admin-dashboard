export interface Contact {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    jobTitle: string;
    companyId: string;
    companyName: string;
    status: 'Active' | 'Inactive';
    lastContacted: string;
    avatar?: string;
}

export const mockContacts: Contact[] = [
    {
        id: 'CON-001',
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice.smith@example.com',
        phone: '+1 (555) 123-4567',
        jobTitle: 'Director of Operations',
        companyId: 'COMP-001',
        companyName: 'Acme Corp',
        status: 'Active',
        lastContacted: '2023-10-25T14:30:00Z',
    },
    {
        id: 'CON-002',
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob.johnson@example.com',
        phone: '+1 (555) 987-6543',
        jobTitle: 'Procurement Manager',
        companyId: 'COMP-002',
        companyName: 'Globex Inc',
        status: 'Active',
        lastContacted: '2023-11-02T09:15:00Z',
    },
    {
        id: 'CON-003',
        firstName: 'Charlie',
        lastName: 'Davis',
        email: 'charlie.davis@example.com',
        phone: '+1 (555) 246-8135',
        jobTitle: 'CEO',
        companyId: 'COMP-003',
        companyName: 'Initech',
        status: 'Inactive',
        lastContacted: '2023-08-15T11:45:00Z',
    },
    {
        id: 'CON-004',
        firstName: 'Diana',
        lastName: 'Prince',
        email: 'diana.prince@example.com',
        phone: '+1 (555) 369-2580',
        jobTitle: 'Head of Analytics',
        companyId: 'COMP-004',
        companyName: 'Massive Dynamic',
        status: 'Active',
        lastContacted: '2023-11-10T16:20:00Z',
    },
    {
        id: 'CON-005',
        firstName: 'Evan',
        lastName: 'Wright',
        email: 'evan.wright@example.com',
        phone: '+1 (555) 852-9630',
        jobTitle: 'IT Director',
        companyId: 'COMP-001',
        companyName: 'Acme Corp',
        status: 'Active',
        lastContacted: '2023-10-18T10:00:00Z',
    },
    {
        id: 'CON-006',
        firstName: 'Fiona',
        lastName: 'Gallagher',
        email: 'fiona.g@example.com',
        phone: '+1 (555) 741-8520',
        jobTitle: 'VP Sales',
        companyId: 'COMP-005',
        companyName: 'Stark Industries',
        status: 'Active',
        lastContacted: '2023-11-12T13:45:00Z',
    },
    {
        id: 'CON-007',
        firstName: 'George',
        lastName: 'Costanza',
        email: 'george@example.com',
        phone: '+1 (555) 963-8527',
        jobTitle: 'Assistant to the Regional Manager',
        companyId: 'COMP-006',
        companyName: 'Vandelay Industries',
        status: 'Inactive',
        lastContacted: '2023-09-05T08:30:00Z',
    },
    {
        id: 'CON-008',
        firstName: 'Hannah',
        lastName: 'Abbott',
        email: 'hannah.a@example.com',
        phone: '+1 (555) 159-7530',
        jobTitle: 'Marketing Lead',
        companyId: 'COMP-002',
        companyName: 'Globex Inc',
        status: 'Active',
        lastContacted: '2023-11-15T15:10:00Z',
    }
];
