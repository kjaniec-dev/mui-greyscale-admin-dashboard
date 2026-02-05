export type EmailTemplateStatus = 'Active' | 'Draft' | 'Archived';
export type EmailTemplateCategory = 'Newsletter' | 'Transactional' | 'Promotion' | 'Alert';

export interface EmailTemplate {
    id: string;
    name: string;
    subject: string;
    category: EmailTemplateCategory;
    status: EmailTemplateStatus;
    content: string;
    lastModified: string;
}

export const mockEmailTemplates: EmailTemplate[] = [
    {
        id: '1',
        name: 'Welcome Email',
        subject: 'Welcome to our platform!',
        category: 'Transactional',
        status: 'Active',
        lastModified: '2026-01-15T10:30:00Z',
        content: '<h1>Welcome!</h1><p>Thanks for signing up.</p>',
    },
    {
        id: '2',
        name: 'Monthly Newsletter - Jan 2026',
        subject: 'January Updates & Highlights',
        category: 'Newsletter',
        status: 'Draft',
        lastModified: '2026-02-01T14:20:00Z',
        content: '<h1>January Highlights</h1><p>Check out what is new...</p>',
    },
    {
        id: '3',
        name: 'Password Reset',
        subject: 'Reset your password',
        category: 'Transactional',
        status: 'Active',
        lastModified: '2025-12-10T09:15:00Z',
        content: '<p>Click here to reset your password.</p>',
    },
    {
        id: '4',
        name: 'Spring Sale Promo',
        subject: 'Spring Sale Starts Now!',
        category: 'Promotion',
        status: 'Draft',
        lastModified: '2026-02-05T11:00:00Z',
        content: '<h1>Spring Sale</h1><p>up to 50% off!</p>',
    },
    {
        id: '5',
        name: 'Order Confirmation',
        subject: 'Your order has been placed',
        category: 'Transactional',
        status: 'Active',
        lastModified: '2025-11-20T16:45:00Z',
        content: '<p>Thank you for your order.</p>',
    },
    {
        id: '6',
        name: 'Cart Abandonment',
        subject: 'You left something behind',
        category: 'Promotion',
        status: 'Active',
        lastModified: '2026-01-25T08:30:00Z',
        content: '<p>Did you forget to checkout?</p>',
    },
    {
        id: '7',
        name: 'System Maintenance Alert',
        subject: 'Scheduled Maintenance',
        category: 'Alert',
        status: 'Archived',
        lastModified: '2025-10-05T13:00:00Z',
        content: '<p>We will be down for maintenance.</p>',
    },
    {
        id: '8',
        name: 'Weekly Digest',
        subject: 'Your Weekly Summary',
        category: 'Newsletter',
        status: 'Active',
        lastModified: '2026-02-03T09:00:00Z',
        content: '<h1>Weekly Digest</h1>',
    },
];
