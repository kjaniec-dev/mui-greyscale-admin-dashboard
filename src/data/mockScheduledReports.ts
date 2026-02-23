export type ReportFormat = 'PDF' | 'CSV' | 'Excel';
export type ReportFrequency = 'Daily' | 'Weekly' | 'Monthly';
export type ReportStatus = 'Active' | 'Paused';

export interface ScheduledReport {
    id: string;
    reportName: string;
    description: string;
    format: ReportFormat;
    frequency: ReportFrequency;
    recipients: string[];
    nextRun: string;
    lastRun?: string;
    status: ReportStatus;
    createdBy: string;
    createdAt: string;
}

export const mockScheduledReports: ScheduledReport[] = [
    {
        id: 'sr-1',
        reportName: 'Daily Sales Summary',
        description: 'Revenue and order summary for the previous day',
        format: 'PDF',
        frequency: 'Daily',
        recipients: ['admin@example.com', 'sales@example.com'],
        nextRun: new Date(new Date().setHours(8, 0, 0, 0) + 24 * 60 * 60 * 1000).toISOString(),
        lastRun: new Date(new Date().setHours(8, 0, 0, 0)).toISOString(),
        status: 'Active',
        createdBy: 'Admin User',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'sr-2',
        reportName: 'Weekly Traffic Report',
        description: 'Website visits, bounce rates, and top pages',
        format: 'Excel',
        frequency: 'Weekly',
        recipients: ['marketing@example.com'],
        nextRun: new Date(new Date().setDate(new Date().getDate() + (1 + 7 - new Date().getDay()) % 7)).toISOString(), // Next Monday
        lastRun: new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 6) % 7)).toISOString(), // Last Monday
        status: 'Active',
        createdBy: 'Marketing Manager',
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'sr-3',
        reportName: 'Monthly Financial Statement',
        description: 'Comprehensive financial report including payouts and taxes',
        format: 'PDF',
        frequency: 'Monthly',
        recipients: ['finance@example.com', 'ceo@example.com'],
        nextRun: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString(), // 1st of next month
        lastRun: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(), // 1st of current month
        status: 'Active',
        createdBy: 'Finance Director',
        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'sr-4',
        reportName: 'Inactive Customers List',
        description: 'Customers with no orders in the last 90 days',
        format: 'CSV',
        frequency: 'Weekly',
        recipients: ['retention@example.com'],
        nextRun: new Date(new Date().setDate(new Date().getDate() + (5 + 7 - new Date().getDay()) % 7)).toISOString(), // Next Friday
        status: 'Paused',
        createdBy: 'Admin User',
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
];
