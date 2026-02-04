export interface TaxSummary {
    year: number;
    totalRevenue: number;
    taxableIncome: number;
    taxCollected: number;
    taxOwed: number;
    taxPaid: number;
    balance: number;
}

export interface QuarterlyTax {
    id: string;
    quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
    period: string;
    salesAmount: number;
    taxableAmount: number;
    taxCollected: number;
    taxRate: number;
    status: 'Filed' | 'Pending' | 'Overdue' | 'Paid';
    dueDate: string;
    filedDate?: string;
}

export interface TaxCategory {
    id: string;
    category: string;
    rate: number;
    description: string;
}

// Mock tax summaries by year
export const mockTaxSummaries: Record<number, TaxSummary> = {
    2024: {
        year: 2024,
        totalRevenue: 2450000,
        taxableIncome: 2156000,
        taxCollected: 172480,
        taxOwed: 180320,
        taxPaid: 129600,
        balance: 50720,
    },
    2023: {
        year: 2023,
        totalRevenue: 2180000,
        taxableIncome: 1920000,
        taxCollected: 153600,
        taxOwed: 153600,
        taxPaid: 153600,
        balance: 0,
    },
    2022: {
        year: 2022,
        totalRevenue: 1850000,
        taxableIncome: 1628000,
        taxCollected: 130240,
        taxOwed: 130240,
        taxPaid: 130240,
        balance: 0,
    },
};

// Mock quarterly tax data
export const mockQuarterlyTax: Record<number, QuarterlyTax[]> = {
    2024: [
        {
            id: 'Q1-2024',
            quarter: 'Q1',
            period: 'Jan - Mar 2024',
            salesAmount: 580000,
            taxableAmount: 510000,
            taxCollected: 40800,
            taxRate: 8.0,
            status: 'Paid',
            dueDate: '2024-04-15',
            filedDate: '2024-04-10',
        },
        {
            id: 'Q2-2024',
            quarter: 'Q2',
            period: 'Apr - Jun 2024',
            salesAmount: 620000,
            taxableAmount: 545000,
            taxCollected: 43600,
            taxRate: 8.0,
            status: 'Paid',
            dueDate: '2024-07-15',
            filedDate: '2024-07-12',
        },
        {
            id: 'Q3-2024',
            quarter: 'Q3',
            period: 'Jul - Sep 2024',
            salesAmount: 650000,
            taxableAmount: 572000,
            taxCollected: 45760,
            taxRate: 8.0,
            status: 'Filed',
            dueDate: '2024-10-15',
            filedDate: '2024-10-08',
        },
        {
            id: 'Q4-2024',
            quarter: 'Q4',
            period: 'Oct - Dec 2024',
            salesAmount: 600000,
            taxableAmount: 529000,
            taxCollected: 42320,
            taxRate: 8.0,
            status: 'Pending',
            dueDate: '2025-01-15',
        },
    ],
    2023: [
        {
            id: 'Q1-2023',
            quarter: 'Q1',
            period: 'Jan - Mar 2023',
            salesAmount: 520000,
            taxableAmount: 458000,
            taxCollected: 36640,
            taxRate: 8.0,
            status: 'Paid',
            dueDate: '2023-04-15',
            filedDate: '2023-04-12',
        },
        {
            id: 'Q2-2023',
            quarter: 'Q2',
            period: 'Apr - Jun 2023',
            salesAmount: 550000,
            taxableAmount: 484000,
            taxCollected: 38720,
            taxRate: 8.0,
            status: 'Paid',
            dueDate: '2023-07-15',
            filedDate: '2023-07-10',
        },
        {
            id: 'Q3-2023',
            quarter: 'Q3',
            period: 'Jul - Sep 2023',
            salesAmount: 560000,
            taxableAmount: 493000,
            taxCollected: 39440,
            taxRate: 8.0,
            status: 'Paid',
            dueDate: '2023-10-15',
            filedDate: '2023-10-14',
        },
        {
            id: 'Q4-2023',
            quarter: 'Q4',
            period: 'Oct - Dec 2023',
            salesAmount: 550000,
            taxableAmount: 485000,
            taxCollected: 38800,
            taxRate: 8.0,
            status: 'Paid',
            dueDate: '2024-01-15',
            filedDate: '2024-01-12',
        },
    ],
    2022: [
        {
            id: 'Q1-2022',
            quarter: 'Q1',
            period: 'Jan - Mar 2022',
            salesAmount: 440000,
            taxableAmount: 387000,
            taxCollected: 30960,
            taxRate: 8.0,
            status: 'Paid',
            dueDate: '2022-04-15',
            filedDate: '2022-04-14',
        },
        {
            id: 'Q2-2022',
            quarter: 'Q2',
            period: 'Apr - Jun 2022',
            salesAmount: 460000,
            taxableAmount: 405000,
            taxCollected: 32400,
            taxRate: 8.0,
            status: 'Paid',
            dueDate: '2022-07-15',
            filedDate: '2022-07-11',
        },
        {
            id: 'Q3-2022',
            quarter: 'Q3',
            period: 'Jul - Sep 2022',
            salesAmount: 475000,
            taxableAmount: 418000,
            taxCollected: 33440,
            taxRate: 8.0,
            status: 'Paid',
            dueDate: '2022-10-15',
            filedDate: '2022-10-13',
        },
        {
            id: 'Q4-2022',
            quarter: 'Q4',
            period: 'Oct - Dec 2022',
            salesAmount: 475000,
            taxableAmount: 418000,
            taxCollected: 33440,
            taxRate: 8.0,
            status: 'Paid',
            dueDate: '2023-01-15',
            filedDate: '2023-01-14',
        },
    ],
};

// Tax rates by category
export const taxCategories: TaxCategory[] = [
    {
        id: 'standard',
        category: 'Standard Sales Tax',
        rate: 8.0,
        description: 'Applied to most goods and services',
    },
    {
        id: 'reduced',
        category: 'Reduced Rate',
        rate: 4.0,
        description: 'Essential goods, food items',
    },
    {
        id: 'exempt',
        category: 'Tax Exempt',
        rate: 0,
        description: 'Healthcare, education, non-profit',
    },
];

// Available years for selector
export const availableYears = [2024, 2023, 2022];
