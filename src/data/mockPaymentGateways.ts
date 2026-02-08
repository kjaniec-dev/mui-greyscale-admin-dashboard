export type PaymentProvider = 'stripe' | 'paypal' | 'square' | 'braintree' | 'authorize_net';
export type GatewayMode = 'test' | 'live';

export interface PaymentGateway {
    id: string;
    name: string;
    provider: PaymentProvider;
    enabled: boolean;
    mode: GatewayMode;
    description: string;
    logo?: string;
    credentials: {
        publishableKey?: string;
        secretKey?: string;
        clientId?: string;
        clientSecret?: string;
        apiKey?: string;
        merchantId?: string;
    };
    webhookUrl?: string;
    features: string[];
    transactionFee: {
        percentage: number;
        fixed?: number; // in cents
    };
    supported: {
        cards: boolean;
        ach: boolean;
        wallets: boolean;
    };
}

export const paymentProviderInfo: Record<PaymentProvider, {
    displayName: string;
    description: string;
    icon: string;
}> = {
    stripe: {
        displayName: 'Stripe',
        description: 'Accept payments online with Stripe\'s powerful and flexible payment platform',
        icon: '💳',
    },
    paypal: {
        displayName: 'PayPal',
        description: 'Enable PayPal payments for customers worldwide',
        icon: '🅿️',
    },
    square: {
        displayName: 'Square',
        description: 'Integrated payment processing for online and in-person transactions',
        icon: '⬛',
    },
    braintree: {
        displayName: 'Braintree',
        description: 'A PayPal service for online and mobile payment processing',
        icon: '🌳',
    },
    authorize_net: {
        displayName: 'Authorize.Net',
        description: 'Reliable payment gateway trusted by businesses worldwide',
        icon: '🔐',
    },
};

export const mockPaymentGateways: PaymentGateway[] = [
    {
        id: 'gateway-001',
        name: 'Stripe',
        provider: 'stripe',
        enabled: true,
        mode: 'test',
        description: paymentProviderInfo.stripe.description,
        credentials: {
            publishableKey: 'pk_test_51H...',
            secretKey: 'sk_test_51H...',
        },
        webhookUrl: 'https://admin.example.com/webhooks/stripe',
        features: ['Credit Cards', 'Debit Cards', 'Apple Pay', 'Google Pay', 'ACH'],
        transactionFee: {
            percentage: 2.9,
            fixed: 30, // $0.30
        },
        supported: {
            cards: true,
            ach: true,
            wallets: true,
        },
    },
    {
        id: 'gateway-002',
        name: 'PayPal',
        provider: 'paypal',
        enabled: true,
        mode: 'live',
        description: paymentProviderInfo.paypal.description,
        credentials: {
            clientId: 'AeB...',
            clientSecret: 'EC7...',
        },
        webhookUrl: 'https://admin.example.com/webhooks/paypal',
        features: ['PayPal Account', 'Credit Cards', 'Debit Cards', 'PayPal Credit'],
        transactionFee: {
            percentage: 3.49,
            fixed: 49, // $0.49
        },
        supported: {
            cards: true,
            ach: false,
            wallets: true,
        },
    },
    {
        id: 'gateway-003',
        name: 'Square',
        provider: 'square',
        enabled: false,
        mode: 'test',
        description: paymentProviderInfo.square.description,
        credentials: {},
        webhookUrl: 'https://admin.example.com/webhooks/square',
        features: ['Credit Cards', 'Debit Cards', 'Gift Cards', 'Cash App Pay'],
        transactionFee: {
            percentage: 2.9,
            fixed: 30,
        },
        supported: {
            cards: true,
            ach: false,
            wallets: true,
        },
    },
    {
        id: 'gateway-004',
        name: 'Braintree',
        provider: 'braintree',
        enabled: false,
        mode: 'test',
        description: paymentProviderInfo.braintree.description,
        credentials: {},
        webhookUrl: 'https://admin.example.com/webhooks/braintree',
        features: ['Credit Cards', 'PayPal', 'Venmo', 'Apple Pay', 'Google Pay'],
        transactionFee: {
            percentage: 2.9,
            fixed: 30,
        },
        supported: {
            cards: true,
            ach: false,
            wallets: true,
        },
    },
    {
        id: 'gateway-005',
        name: 'Authorize.Net',
        provider: 'authorize_net',
        enabled: false,
        mode: 'test',
        description: paymentProviderInfo.authorize_net.description,
        credentials: {},
        webhookUrl: 'https://admin.example.com/webhooks/authorize-net',
        features: ['Credit Cards', 'Debit Cards', 'eChecks'],
        transactionFee: {
            percentage: 2.9,
            fixed: 30,
        },
        supported: {
            cards: true,
            ach: true,
            wallets: false,
        },
    },
];

// Format transaction fee for display
export function formatTransactionFee(fee: PaymentGateway['transactionFee']): string {
    const fixedPart = fee.fixed ? ` + $${(fee.fixed / 100).toFixed(2)}` : '';
    return `${fee.percentage}%${fixedPart}`;
}

// Get credential fields for a provider
export function getCredentialFields(provider: PaymentProvider): {
    label: string;
    key: keyof PaymentGateway['credentials'];
    type?: string;
}[] {
    switch (provider) {
        case 'stripe':
            return [
                { label: 'Publishable Key', key: 'publishableKey' },
                { label: 'Secret Key', key: 'secretKey', type: 'password' },
            ];
        case 'paypal':
            return [
                { label: 'Client ID', key: 'clientId' },
                { label: 'Client Secret', key: 'clientSecret', type: 'password' },
            ];
        case 'square':
            return [
                { label: 'Application ID', key: 'clientId' },
                { label: 'Access Token', key: 'secretKey', type: 'password' },
            ];
        case 'braintree':
            return [
                { label: 'Merchant ID', key: 'merchantId' },
                { label: 'Public Key', key: 'publishableKey' },
                { label: 'Private Key', key: 'secretKey', type: 'password' },
            ];
        case 'authorize_net':
            return [
                { label: 'API Login ID', key: 'apiKey' },
                { label: 'Transaction Key', key: 'secretKey', type: 'password' },
            ];
        default:
            return [];
    }
}
