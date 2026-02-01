
export interface SubscriptionPlan {
    id: string;
    name: 'Basic' | 'Pro' | 'Enterprise';
    price: number;
    interval: 'Monthly' | 'Yearly';
}

export interface Subscription {
    id: string;
    userId: string;
    user: {
        name: string;
        email: string;
        avatar?: string;
    };
    plan: SubscriptionPlan;
    status: 'Active' | 'Past Due' | 'Cancelled' | 'Paused';
    startDate: Date;
    nextBillingDate: Date;
    paymentMethod: {
        type: 'Credit Card' | 'PayPal';
        last4?: string;
    };
}

const plans: SubscriptionPlan[] = [
    { id: 'plan_basic_mo', name: 'Basic', price: 29, interval: 'Monthly' },
    { id: 'plan_pro_mo', name: 'Pro', price: 79, interval: 'Monthly' },
    { id: 'plan_ent_mo', name: 'Enterprise', price: 199, interval: 'Monthly' },
    { id: 'plan_basic_yr', name: 'Basic', price: 290, interval: 'Yearly' },
    { id: 'plan_pro_yr', name: 'Pro', price: 790, interval: 'Yearly' },
    { id: 'plan_ent_yr', name: 'Enterprise', price: 1990, interval: 'Yearly' },
];

const names = [
    'Alice Johnson', 'Bob Smith', 'Charlie Brown', 'David Lee', 'Eva Green',
    'Frank White', 'Grace Hall', 'Henry Ford', 'Ivy Chen', 'Jack Cole',
    'Kelly King', 'Liam Scott', 'Mia Young', 'Noah Hill', 'Olivia Baker',
    'Paul Clark', 'Quinn Lewis', 'Ryan Walker', 'Sara Hall', 'Tom Allen'
];

function getRandomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export const mockSubscriptions: Subscription[] = Array.from({ length: 50 }, (_, index) => {
    const plan = getRandomElement(plans);
    const status = getRandomElement(['Active', 'Active', 'Active', 'Past Due', 'Cancelled', 'Paused'] as const);
    const startDate = getRandomDate(new Date(2023, 0, 1), new Date());

    // Calculate next billing date
    let nextBillingDate = new Date(startDate);
    while (nextBillingDate < new Date()) {
        if (plan.interval === 'Monthly') {
            nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
        } else {
            nextBillingDate.setFullYear(nextBillingDate.getFullYear() + 1);
        }
    }

    const name = getRandomElement(names);

    return {
        id: `sub_${index + 1}`,
        userId: `user_${index + 1}`,
        user: {
            name,
            email: name.toLowerCase().replace(' ', '.') + '@example.com',
            avatar: `https://i.pravatar.cc/150?u=${index}`,
        },
        plan,
        status,
        startDate,
        nextBillingDate,
        paymentMethod: {
            type: Math.random() > 0.3 ? 'Credit Card' : 'PayPal',
            last4: Math.floor(1000 + Math.random() * 9000).toString(),
        }
    };
});
