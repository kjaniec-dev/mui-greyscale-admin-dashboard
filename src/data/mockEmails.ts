export interface EmailAttachment {
    id: string;
    name: string;
    size: string;
    type: string;
}

export interface Email {
    id: string;
    from: {
        name: string;
        email: string;
    };
    to: string[];
    subject: string;
    body: string;
    date: Date;
    read: boolean;
    starred: boolean;
    folder: 'inbox' | 'sent' | 'drafts' | 'starred' | 'trash';
    attachments?: EmailAttachment[];
}

export type MailFolder = 'inbox' | 'sent' | 'drafts' | 'starred' | 'trash';

export const mailFolders: { id: MailFolder; label: string; icon: string }[] = [
    { id: 'inbox', label: 'Inbox', icon: 'inbox' },
    { id: 'sent', label: 'Sent', icon: 'send' },
    { id: 'drafts', label: 'Drafts', icon: 'drafts' },
    { id: 'starred', label: 'Starred', icon: 'star' },
    { id: 'trash', label: 'Trash', icon: 'delete' },
];

const senders = [
    { name: 'John Smith', email: 'john.smith@company.com' },
    { name: 'Sarah Johnson', email: 'sarah.j@tech.io' },
    { name: 'Mike Brown', email: 'mike.brown@startup.co' },
    { name: 'Emily Davis', email: 'emily.d@design.studio' },
    { name: 'Alex Wilson', email: 'alex.wilson@agency.net' },
    { name: 'Lisa Chen', email: 'lisa.chen@corp.com' },
    { name: 'David Lee', email: 'david.lee@dev.team' },
    { name: 'Anna Martinez', email: 'anna.m@marketing.io' },
];

const subjects = [
    'Project Update: Q1 Goals',
    'Meeting Tomorrow at 3 PM',
    'Quick question about the design',
    'Weekly Report - Team Performance',
    'Invitation: Product Launch Event',
    'Re: Budget Proposal Review',
    'Action Required: Contract Renewal',
    'New Feature Feedback',
    'Team Lunch on Friday',
    'Important: Security Update',
    'Your order has been shipped',
    'Invoice #12345 attached',
];

const bodyTemplates = [
    `Hi,\n\nI wanted to follow up on our discussion from last week. Please let me know if you have any questions or concerns.\n\nBest regards`,
    `Hello,\n\nJust a quick update on the project status. We're on track to meet our deadline. I'll send a more detailed report by end of day.\n\nThanks`,
    `Hi team,\n\nReminder about our meeting tomorrow. Please come prepared with your weekly updates.\n\nLooking forward to seeing everyone.`,
    `Dear colleague,\n\nI've attached the documents you requested. Please review and let me know if you need any changes.\n\nBest`,
    `Hi,\n\nThank you for your patience. I've completed the analysis and the results are quite positive. Let's schedule a call to discuss next steps.\n\nRegards`,
];

function getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateEmail(id: number, folder: MailFolder = 'inbox'): Email {
    const sender = getRandomElement(senders);
    const daysAgo = getRandomInt(0, 30);
    const hoursAgo = getRandomInt(0, 23);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    date.setHours(date.getHours() - hoursAgo);

    const hasAttachment = Math.random() < 0.2;
    const attachments: EmailAttachment[] = hasAttachment
        ? [
            {
                id: `att-${id}`,
                name: getRandomElement(['document.pdf', 'report.xlsx', 'image.png', 'proposal.docx']),
                size: `${getRandomInt(100, 5000)} KB`,
                type: 'application/pdf',
            },
        ]
        : [];

    return {
        id: `email-${id}`,
        from: sender,
        to: ['me@mycompany.com'],
        subject: getRandomElement(subjects),
        body: getRandomElement(bodyTemplates),
        date,
        read: Math.random() < 0.6,
        starred: Math.random() < 0.15,
        folder,
        attachments: attachments.length > 0 ? attachments : undefined,
    };
}

// Generate emails for each folder
export const mockEmails: Email[] = [
    // Inbox emails
    ...Array.from({ length: 15 }, (_, i) => generateEmail(i + 1, 'inbox')),
    // Sent emails
    ...Array.from({ length: 5 }, (_, i) => generateEmail(i + 20, 'sent')),
    // Draft emails
    ...Array.from({ length: 2 }, (_, i) => generateEmail(i + 30, 'drafts')),
    // Trash emails
    ...Array.from({ length: 3 }, (_, i) => generateEmail(i + 40, 'trash')),
];

// Add starred property to some emails
mockEmails.forEach(email => {
    if (email.starred) {
        // Starred emails should also appear in starred folder view
    }
});

export function getEmailsByFolder(folder: MailFolder, emails: Email[]): Email[] {
    if (folder === 'starred') {
        return emails.filter(e => e.starred && e.folder !== 'trash');
    }
    return emails.filter(e => e.folder === folder);
}

export function getUnreadCount(folder: MailFolder, emails: Email[]): number {
    return getEmailsByFolder(folder, emails).filter(e => !e.read).length;
}
