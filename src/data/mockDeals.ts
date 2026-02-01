export interface Deal {
    id: string;
    title: string;
    amount: number;
    stage: 'New' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';
    assignee: {
        name: string;
        avatar: string;
    };
    companyName: string;
    companyLogo: string;
    closingDate: Date;
    priority: 'Low' | 'Medium' | 'High';
}

export const mockDeals: Deal[] = [
    {
        id: '1',
        title: 'Enterprise License Expansion',
        amount: 150000,
        stage: 'Negotiation',
        assignee: {
            name: 'Sarah Wilde',
            avatar: 'https://i.pravatar.cc/150?u=sarah',
        },
        companyName: 'TechFlow Solutions',
        companyLogo: '',
        closingDate: new Date('2024-11-15'),
        priority: 'High',
    },
    {
        id: '2',
        title: 'Q3 Logistics Contract',
        amount: 85000,
        stage: 'Proposal',
        assignee: {
            name: 'Mike Ross',
            avatar: 'https://i.pravatar.cc/150?u=mike',
        },
        companyName: 'GreenLeaf Logistics',
        companyLogo: '',
        closingDate: new Date('2024-10-30'),
        priority: 'Medium',
    },
    {
        id: '3',
        title: 'Global Asset Management',
        amount: 1200000,
        stage: 'Qualified',
        assignee: {
            name: 'Harvey Specter',
            avatar: 'https://i.pravatar.cc/150?u=harvey',
        },
        companyName: 'Apex Financial',
        companyLogo: '',
        closingDate: new Date('2025-01-20'),
        priority: 'High',
    },
    {
        id: '4',
        title: 'IOT Prototype Pilot',
        amount: 45000,
        stage: 'New',
        assignee: {
            name: 'Rachel Zane',
            avatar: 'https://i.pravatar.cc/150?u=rachel',
        },
        companyName: 'Nebula Innovations',
        companyLogo: '',
        closingDate: new Date('2024-12-01'),
        priority: 'Low',
    },
    {
        id: '5',
        title: 'Medical Devices Bulk Order',
        amount: 320000,
        stage: 'Won',
        assignee: {
            name: 'Donna Paulsen',
            avatar: 'https://i.pravatar.cc/150?u=donna',
        },
        companyName: 'Global MedTech',
        companyLogo: '',
        closingDate: new Date('2024-09-15'),
        priority: 'High',
    },
    {
        id: '6',
        title: 'Quantum Sim Service Level Agreement',
        amount: 95000,
        stage: 'Proposal',
        assignee: {
            name: 'Louis Litt',
            avatar: 'https://i.pravatar.cc/150?u=louis',
        },
        companyName: 'Quantum Soft',
        companyLogo: '',
        closingDate: new Date('2024-11-05'),
        priority: 'Medium',
    },
    {
        id: '7',
        title: 'Renewable Energy Partnership',
        amount: 550000,
        stage: 'Negotiation',
        assignee: {
            name: 'Jessica Pearson',
            avatar: 'https://i.pravatar.cc/150?u=jessica',
        },
        companyName: 'Stellar Energy',
        companyLogo: '',
        closingDate: new Date('2024-12-20'),
        priority: 'High',
    },
    {
        id: '8',
        title: 'Urban Infrastructure Deal',
        amount: 210000,
        stage: 'Qualified',
        assignee: {
            name: 'Alex Williams',
            avatar: 'https://i.pravatar.cc/150?u=alex',
        },
        companyName: 'Urban Constructs',
        companyLogo: '',
        closingDate: new Date('2024-10-15'),
        priority: 'Medium',
    },
    {
        id: '9',
        title: 'Resort IT Upgrade',
        amount: 75000,
        stage: 'Lost',
        assignee: {
            name: 'Katrina Bennett',
            avatar: 'https://i.pravatar.cc/150?u=katrina',
        },
        companyName: 'Oceanside Resorts',
        companyLogo: '',
        closingDate: new Date('2024-08-30'),
        priority: 'Low',
    },
    {
        id: '10',
        title: 'E-Learning Platform Subscription',
        amount: 25000,
        stage: 'New',
        assignee: {
            name: 'Samantha Wheeler',
            avatar: 'https://i.pravatar.cc/150?u=samantha',
        },
        companyName: 'Pinnacle Education',
        companyLogo: '',
        closingDate: new Date('2024-11-10'),
        priority: 'Low',
    },
    {
        id: '11',
        title: 'Security Audit Contract',
        amount: 60000,
        stage: 'Proposal',
        assignee: {
            name: 'Robert Zane',
            avatar: 'https://i.pravatar.cc/150?u=robert',
        },
        companyName: 'CyberShield',
        companyLogo: '',
        closingDate: new Date('2024-10-25'),
        priority: 'Medium',
    },
    {
        id: '12',
        title: 'AgriTech Drone Fleet',
        amount: 180000,
        stage: 'Negotiation',
        assignee: {
            name: 'Harold Gunderson',
            avatar: 'https://i.pravatar.cc/150?u=harold',
        },
        companyName: 'AgriCorp',
        companyLogo: '',
        closingDate: new Date('2024-12-05'),
        priority: 'High',
    },
];
