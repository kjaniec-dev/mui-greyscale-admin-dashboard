// Real-time data types and mock generators

export interface RealtimeMetric {
    id: string;
    label: string;
    value: number;
    previousValue: number;
    unit?: string;
    format?: 'number' | 'currency' | 'percent';
}

export interface RealtimeChartPoint {
    timestamp: Date;
    value: number;
}

export interface RealtimeActivity {
    id: string;
    type: 'order' | 'visitor' | 'sale' | 'signup';
    message: string;
    timestamp: Date;
}

export interface RealtimeData {
    metrics: RealtimeMetric[];
    chartData: RealtimeChartPoint[];
    activities: RealtimeActivity[];
    lastUpdated: Date;
}

// Generate a random fluctuation within a percentage range
function fluctuate(value: number, maxPercent: number = 5): number {
    const change = value * (maxPercent / 100) * (Math.random() * 2 - 1);
    return Math.max(0, Math.round(value + change));
}

// Initial metrics state
export function getInitialMetrics(): RealtimeMetric[] {
    return [
        {
            id: 'active-visitors',
            label: 'Active Visitors',
            value: 1247,
            previousValue: 1247,
            format: 'number',
        },
        {
            id: 'orders-today',
            label: 'Orders Today',
            value: 156,
            previousValue: 156,
            format: 'number',
        },
        {
            id: 'revenue-today',
            label: 'Revenue Today',
            value: 12450,
            previousValue: 12450,
            unit: '$',
            format: 'currency',
        },
        {
            id: 'conversion-rate',
            label: 'Conversion Rate',
            value: 3.2,
            previousValue: 3.2,
            unit: '%',
            format: 'percent',
        },
    ];
}

// Generate initial chart data (last 30 points)
export function getInitialChartData(): RealtimeChartPoint[] {
    const now = Date.now();
    const data: RealtimeChartPoint[] = [];
    let baseValue = 800;

    for (let i = 29; i >= 0; i--) {
        baseValue = fluctuate(baseValue, 10);
        data.push({
            timestamp: new Date(now - i * 3000), // 3 second intervals
            value: baseValue,
        });
    }

    return data;
}

// Generate updated metrics with fluctuations
export function generateMetricUpdate(metrics: RealtimeMetric[]): RealtimeMetric[] {
    return metrics.map((metric) => {
        const newValue = metric.format === 'percent'
            ? Math.round(fluctuate(metric.value * 10, 3)) / 10
            : fluctuate(metric.value, metric.id === 'active-visitors' ? 8 : 5);

        return {
            ...metric,
            previousValue: metric.value,
            value: newValue,
        };
    });
}

// Generate a new chart point
export function generateNewChartPoint(lastPoint: RealtimeChartPoint): RealtimeChartPoint {
    return {
        timestamp: new Date(),
        value: fluctuate(lastPoint.value, 10),
    };
}

// Activity message templates
const activityTemplates = {
    order: [
        'New order #{{id}} placed for ${{amount}}',
        'Order #{{id}} confirmed - ${{amount}}',
        'Rush order #{{id}} received - ${{amount}}',
    ],
    visitor: [
        'New visitor from {{location}}',
        'Returning customer from {{location}}',
        '{{count}} visitors browsing products',
    ],
    sale: [
        'Sale completed: {{product}} - ${{amount}}',
        'Flash sale purchase: ${{amount}}',
        'Bundle deal sold - ${{amount}}',
    ],
    signup: [
        'New user registered: {{email}}',
        'Newsletter subscription: {{email}}',
        'Account created from {{location}}',
    ],
};

const locations = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Berlin', 'Toronto'];
const products = ['MacBook Pro', 'iPhone 15', 'AirPods', 'iPad Pro', 'Apple Watch', 'HomePod'];
const emailDomains = ['gmail.com', 'outlook.com', 'yahoo.com', 'icloud.com'];

function generateRandomId(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function generateRandomEmail(): string {
    const names = ['john', 'jane', 'alex', 'sam', 'chris', 'pat', 'taylor', 'morgan'];
    const name = names[Math.floor(Math.random() * names.length)];
    const domain = emailDomains[Math.floor(Math.random() * emailDomains.length)];
    const num = Math.floor(Math.random() * 100);
    return `${name}${num}@${domain}`;
}

// Generate a random activity
export function generateActivity(): RealtimeActivity {
    const types: Array<'order' | 'visitor' | 'sale' | 'signup'> = ['order', 'visitor', 'sale', 'signup'];
    const type = types[Math.floor(Math.random() * types.length)];
    const templates = activityTemplates[type];
    let message = templates[Math.floor(Math.random() * templates.length)];

    // Replace placeholders
    message = message.replace('{{id}}', generateRandomId());
    message = message.replace('{{amount}}', (Math.floor(Math.random() * 500) + 50).toString());
    message = message.replace('{{location}}', locations[Math.floor(Math.random() * locations.length)]);
    message = message.replace('{{product}}', products[Math.floor(Math.random() * products.length)]);
    message = message.replace('{{email}}', generateRandomEmail());
    message = message.replace('{{count}}', (Math.floor(Math.random() * 50) + 10).toString());

    return {
        id: generateRandomId(),
        type,
        message,
        timestamp: new Date(),
    };
}

// Generate initial activities
export function getInitialActivities(): RealtimeActivity[] {
    const activities: RealtimeActivity[] = [];
    const now = Date.now();

    for (let i = 0; i < 5; i++) {
        const activity = generateActivity();
        activity.timestamp = new Date(now - i * 5000);
        activities.push(activity);
    }

    return activities;
}
