export type ArticleStatus = 'Published' | 'Draft' | 'Archived';
export type ArticleCategory =
    | 'Getting Started'
    | 'Account & Billing'
    | 'Features'
    | 'Troubleshooting'
    | 'API & Integrations'
    | 'Security';

export interface Article {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: ArticleCategory;
    status: ArticleStatus;
    author: string;
    tags: string[];
    views: number;
    helpful: number;
    notHelpful: number;
    relatedArticles: string[];
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
}

export const mockArticles: Article[] = [
    {
        id: 'KB-001',
        title: 'How to Create Your First Account',
        excerpt: 'A step-by-step guide to setting up your account and getting started with our platform.',
        content: `# Creating Your Account

Follow these simple steps to create your account:

1. Click "Sign Up" on the homepage
2. Enter your email address
3. Choose a strong password
4. Verify your email
5. Complete your profile

Once you've completed these steps, you'll have full access to all features.`,
        category: 'Getting Started',
        status: 'Published',
        author: 'Support Team',
        tags: ['account', 'setup', 'registration'],
        views: 8540,
        helpful: 432,
        notHelpful: 23,
        relatedArticles: ['KB-002', 'KB-009'],
        createdAt: new Date('2025-12-01'),
        updatedAt: new Date('2026-01-15'),
        publishedAt: new Date('2025-12-05'),
    },
    {
        id: 'KB-002',
        title: 'Understanding Your Dashboard',
        excerpt: 'Learn how to navigate and customize your dashboard for maximum productivity.',
        content: `# Dashboard Overview

Your dashboard is your command center. Here's what you need to know:

## Main Sections
- **Overview**: Key metrics and recent activity
- **Analytics**: Detailed performance data
- **Quick Actions**: Common tasks at your fingertips

## Customization
You can customize your dashboard by rearranging widgets and choosing which metrics to display.`,
        category: 'Getting Started',
        status: 'Published',
        author: 'Support Team',
        tags: ['dashboard', 'navigation', 'ui'],
        views: 6720,
        helpful: 385,
        notHelpful: 18,
        relatedArticles: ['KB-001', 'KB-003'],
        createdAt: new Date('2025-12-03'),
        updatedAt: new Date('2026-01-20'),
        publishedAt: new Date('2025-12-08'),
    },
    {
        id: 'KB-003',
        title: 'Subscription Plans and Pricing',
        excerpt: 'Compare our subscription plans and find the one that fits your needs.',
        content: `# Subscription Plans

We offer three tiers to match your needs:

## Free Plan
- Up to 5 users
- Basic features
- Community support

## Pro Plan
- Up to 50 users
- Advanced features
- Email support

## Enterprise Plan
- Unlimited users
- All features
- Priority support`,
        category: 'Account & Billing',
        status: 'Published',
        author: 'Sarah Johnson',
        tags: ['pricing', 'subscription', 'plans'],
        views: 5430,
        helpful: 298,
        notHelpful: 45,
        relatedArticles: ['KB-004', 'KB-005'],
        createdAt: new Date('2025-12-10'),
        updatedAt: new Date('2026-01-25'),
        publishedAt: new Date('2025-12-15'),
    },
    {
        id: 'KB-004',
        title: 'How to Upgrade or Downgrade Your Plan',
        excerpt: 'Change your subscription plan at any time without losing your data.',
        content: `# Managing Your Subscription

Changing your plan is easy:

1. Go to Settings > Billing
2. Click "Change Plan"
3. Select your new plan
4. Confirm the change

Your new plan takes effect immediately, and you'll be prorated for the difference.`,
        category: 'Account & Billing',
        status: 'Published',
        author: 'Sarah Johnson',
        tags: ['billing', 'upgrade', 'subscription'],
        views: 3890,
        helpful: 256,
        notHelpful: 12,
        relatedArticles: ['KB-003', 'KB-005'],
        createdAt: new Date('2025-12-12'),
        updatedAt: new Date('2026-01-22'),
        publishedAt: new Date('2025-12-18'),
    },
    {
        id: 'KB-005',
        title: 'Payment Methods and Invoices',
        excerpt: 'Add payment methods, view invoices, and manage your billing information.',
        content: `# Billing Management

## Accepted Payment Methods
- Credit/Debit Cards (Visa, Mastercard, Amex)
- PayPal
- Bank Transfer (Enterprise only)

## Viewing Invoices
All invoices are available in Settings > Billing > Invoices. You can download them as PDFs at any time.`,
        category: 'Account & Billing',
        status: 'Published',
        author: 'Sarah Johnson',
        tags: ['payment', 'invoices', 'billing'],
        views: 4210,
        helpful: 287,
        notHelpful: 19,
        relatedArticles: ['KB-003', 'KB-004'],
        createdAt: new Date('2025-12-15'),
        updatedAt: new Date('2026-01-28'),
        publishedAt: new Date('2025-12-20'),
    },
    {
        id: 'KB-006',
        title: 'Using Custom Reports',
        excerpt: 'Create and customize reports to track the metrics that matter to your business.',
        content: `# Custom Reports

Our reporting feature lets you create detailed, custom reports:

## Creating a Report
1. Navigate to Analytics > Reports
2. Click "New Report"
3. Select your data sources
4. Choose visualizations
5. Save and share

## Scheduling
You can schedule reports to be sent automatically via email.`,
        category: 'Features',
        status: 'Published',
        author: 'Mike Chen',
        tags: ['reports', 'analytics', 'data'],
        views: 7230,
        helpful: 412,
        notHelpful: 27,
        relatedArticles: ['KB-007', 'KB-002'],
        createdAt: new Date('2026-01-05'),
        updatedAt: new Date('2026-01-30'),
        publishedAt: new Date('2026-01-10'),
    },
    {
        id: 'KB-007',
        title: 'Team Collaboration Features',
        excerpt: 'Invite team members, assign roles, and collaborate effectively.',
        content: `# Team Collaboration

Work together seamlessly:

## Inviting Team Members
1. Go to Settings > Team
2. Click "Invite Member"
3. Enter their email
4. Assign a role
5. Send invitation

## Roles and Permissions
- **Admin**: Full access
- **Editor**: Can create and edit
- **Viewer**: Read-only access`,
        category: 'Features',
        status: 'Published',
        author: 'Mike Chen',
        tags: ['team', 'collaboration', 'permissions'],
        views: 5890,
        helpful: 341,
        notHelpful: 15,
        relatedArticles: ['KB-006', 'KB-012'],
        createdAt: new Date('2026-01-08'),
        updatedAt: new Date('2026-02-01'),
        publishedAt: new Date('2026-01-12'),
    },
    {
        id: 'KB-008',
        title: 'Troubleshooting Login Issues',
        excerpt: 'Common solutions for login problems and account access.',
        content: `# Login Troubleshooting

Having trouble logging in? Try these steps:

## Forgot Password
1. Click "Forgot Password" on login page
2. Enter your email
3. Check your inbox for reset link
4. Create a new password

## Account Locked
If you've had too many failed login attempts, your account may be temporarily locked. Wait 15 minutes and try again.

## Still Can't Login?
Contact our support team at support@example.com`,
        category: 'Troubleshooting',
        status: 'Published',
        author: 'Alex Rivera',
        tags: ['login', 'password', 'access'],
        views: 9120,
        helpful: 521,
        notHelpful: 34,
        relatedArticles: ['KB-009', 'KB-012'],
        createdAt: new Date('2025-12-20'),
        updatedAt: new Date('2026-02-02'),
        publishedAt: new Date('2025-12-22'),
    },
    {
        id: 'KB-009',
        title: 'Account Security Best Practices',
        excerpt: 'Keep your account safe with these security recommendations.',
        content: `# Security Best Practices

Protect your account:

## Strong Passwords
- Use at least 12 characters
- Mix uppercase, lowercase, numbers, and symbols
- Don't reuse passwords from other sites

## Two-Factor Authentication
Enable 2FA in Settings > Security for an extra layer of protection.

## Regular Security Checkups
Review your active sessions and connected apps regularly.`,
        category: 'Security',
        status: 'Published',
        author: 'Alex Rivera',
        tags: ['security', '2fa', 'password'],
        views: 6540,
        helpful: 398,
        notHelpful: 21,
        relatedArticles: ['KB-001', 'KB-012'],
        createdAt: new Date('2026-01-02'),
        updatedAt: new Date('2026-01-28'),
        publishedAt: new Date('2026-01-05'),
    },
    {
        id: 'KB-010',
        title: 'REST API Quick Start Guide',
        excerpt: 'Get started with our REST API in minutes.',
        content: `# API Quick Start

## Authentication
All API requests require an API key. Generate one in Settings > API Keys.

\`\`\`bash
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.example.com/v1/users
\`\`\`

## Rate Limits
- Free: 100 requests/hour
- Pro: 1,000 requests/hour
- Enterprise: 10,000 requests/hour

## Documentation
Full API documentation is available at https://api.example.com/docs`,
        category: 'API & Integrations',
        status: 'Published',
        author: 'David Lee',
        tags: ['api', 'integration', 'developer'],
        views: 4320,
        helpful: 289,
        notHelpful: 16,
        relatedArticles: ['KB-011', 'KB-013'],
        createdAt: new Date('2026-01-15'),
        updatedAt: new Date('2026-02-03'),
        publishedAt: new Date('2026-01-18'),
    },
    {
        id: 'KB-011',
        title: 'Webhook Integration Guide',
        excerpt: 'Set up webhooks to receive real-time notifications about events.',
        content: `# Webhook Integration

Webhooks allow your application to receive real-time updates.

## Setting Up Webhooks
1. Go to Settings > Integrations
2. Click "Add Webhook"
3. Enter your endpoint URL
4. Select events to subscribe to
5. Save configuration

## Events Available
- user.created
- order.completed
- payment.received
- subscription.changed

## Security
All webhooks are signed with HMAC-SHA256 for verification.`,
        category: 'API & Integrations',
        status: 'Published',
        author: 'David Lee',
        tags: ['webhooks', 'integration', 'events'],
        views: 3210,
        helpful: 234,
        notHelpful: 11,
        relatedArticles: ['KB-010', 'KB-013'],
        createdAt: new Date('2026-01-20'),
        updatedAt: new Date('2026-02-04'),
        publishedAt: new Date('2026-01-22'),
    },
    {
        id: 'KB-012',
        title: 'Data Privacy and GDPR Compliance',
        excerpt: 'How we protect your data and comply with GDPR regulations.',
        content: `# Data Privacy

We take your privacy seriously.

## Data Protection
- All data encrypted in transit and at rest
- Regular security audits
- SOC 2 Type II certified

## GDPR Rights
You have the right to:
- Access your data
- Request data deletion
- Export your data
- Opt out of marketing

Contact privacy@example.com for requests.`,
        category: 'Security',
        status: 'Published',
        author: 'Alex Rivera',
        tags: ['privacy', 'gdpr', 'compliance'],
        views: 2890,
        helpful: 198,
        notHelpful: 8,
        relatedArticles: ['KB-009', 'KB-013'],
        createdAt: new Date('2026-01-25'),
        updatedAt: new Date('2026-02-05'),
        publishedAt: new Date('2026-01-28'),
    },
    {
        id: 'KB-013',
        title: 'Third-Party Integrations',
        excerpt: 'Connect your favorite tools and services with our platform.',
        content: `# Integrations

We integrate with popular tools:

## Available Integrations
- **Slack**: Get notifications in your workspace
- **Zapier**: Automate workflows
- **Google Analytics**: Track metrics
- **Stripe**: Process payments
- **Mailchimp**: Email marketing

## Coming Soon
- Salesforce
- HubSpot
- Shopify

Visit our integrations marketplace to browse all options.`,
        category: 'API & Integrations',
        status: 'Draft',
        author: 'David Lee',
        tags: ['integrations', 'tools', 'apps'],
        views: 0,
        helpful: 0,
        notHelpful: 0,
        relatedArticles: ['KB-010', 'KB-011'],
        createdAt: new Date('2026-02-06'),
        updatedAt: new Date('2026-02-07'),
    },
    {
        id: 'KB-014',
        title: 'Performance Optimization Tips',
        excerpt: 'Best practices for getting the most out of our platform.',
        content: `# Performance Tips

Optimize your experience:

## Dashboard Performance
- Limit widgets to essentials
- Use date ranges for large datasets
- Enable caching where available

## Report Generation
- Schedule heavy reports for off-peak hours
- Use filters to reduce data volume
- Export to CSV for large datasets

## API Performance
- Use pagination for large result sets
- Implement client-side caching
- Batch requests when possible`,
        category: 'Troubleshooting',
        status: 'Published',
        author: 'Mike Chen',
        tags: ['performance', 'optimization', 'tips'],
        views: 1890,
        helpful: 145,
        notHelpful: 7,
        relatedArticles: ['KB-006', 'KB-010'],
        createdAt: new Date('2026-02-01'),
        updatedAt: new Date('2026-02-06'),
        publishedAt: new Date('2026-02-03'),
    },
    {
        id: 'KB-015',
        title: 'Mobile App Features',
        excerpt: 'Access your account on the go with our mobile apps for iOS and Android.',
        content: `# Mobile Apps

Stay connected anywhere:

## Download
- iOS: Available on App Store
- Android: Available on Google Play

## Key Features
- View dashboard and analytics
- Receive push notifications
- Quick actions and shortcuts
- Offline mode for viewing data
- Biometric authentication

## Requirements
- iOS 15+ or Android 10+
- Active internet connection for sync`,
        category: 'Features',
        status: 'Published',
        author: 'Support Team',
        tags: ['mobile', 'app', 'ios', 'android'],
        views: 3450,
        helpful: 267,
        notHelpful: 13,
        relatedArticles: ['KB-001', 'KB-009'],
        createdAt: new Date('2026-01-12'),
        updatedAt: new Date('2026-02-01'),
        publishedAt: new Date('2026-01-15'),
    },
];

// Calculate helpfulness percentage
export function calculateHelpfulness(helpful: number, notHelpful: number): number {
    const total = helpful + notHelpful;
    if (total === 0) return 0;
    return Math.round((helpful / total) * 100);
}

// Format date for display
export function formatArticleDate(date: Date | undefined): string {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

// Get category color
export function getCategoryColor(category: ArticleCategory): {
    bg: string;
    bgDark: string;
} {
    const colors: Record<ArticleCategory, { bg: string; bgDark: string }> = {
        'Getting Started': { bg: '#3B82F6', bgDark: '#60A5FA' },
        'Account & Billing': { bg: '#8B5CF6', bgDark: '#A78BFA' },
        'Features': { bg: '#10B981', bgDark: '#34D399' },
        'Troubleshooting': { bg: '#F59E0B', bgDark: '#FBBF24' },
        'API & Integrations': { bg: '#06B6D4', bgDark: '#22D3EE' },
        'Security': { bg: '#EF4444', bgDark: '#F87171' },
    };
    return colors[category];
}
