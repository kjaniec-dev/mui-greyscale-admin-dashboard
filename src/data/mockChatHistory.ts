export type ChatHistoryStatus = 'Resolved' | 'Unresolved' | 'Transferred';

export interface ChatHistoryMessage {
    id: string;
    sender: 'customer' | 'agent' | 'system';
    senderName: string;
    text: string;
    timestamp: Date;
}

export interface ChatHistoryConversation {
    id: string;
    customerId: string;
    customerName: string;
    customerEmail: string;
    agentName: string;
    agentId: string;
    startedAt: Date;
    endedAt: Date;
    duration: number; // in minutes
    messageCount: number;
    status: ChatHistoryStatus;
    rating: number | null; // 1-5 stars
    tags: string[];
    transcript: ChatHistoryMessage[];
}

// Helper function to generate transcript
const createTranscript = (
    customerName: string,
    agentName: string,
    messages: Array<{ sender: 'customer' | 'agent' | 'system'; text: string; offsetMinutes: number }>
): ChatHistoryMessage[] => {
    const baseTime = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
    return messages.map((msg, idx) => ({
        id: `msg-${idx}`,
        sender: msg.sender,
        senderName: msg.sender === 'customer' ? customerName : msg.sender === 'agent' ? agentName : 'System',
        text: msg.text,
        timestamp: new Date(baseTime.getTime() + msg.offsetMinutes * 60 * 1000),
    }));
};

export const mockChatHistory: ChatHistoryConversation[] = [
    {
        id: 'chat-001',
        customerId: 'cust-001',
        customerName: 'Sarah Johnson',
        customerEmail: 'sarah.j@email.com',
        agentName: 'Alex Chen',
        agentId: 'agent-001',
        startedAt: new Date('2024-02-05T10:15:00'),
        endedAt: new Date('2024-02-05T10:32:00'),
        duration: 17,
        messageCount: 12,
        status: 'Resolved',
        rating: 5,
        tags: ['billing', 'subscription'],
        transcript: createTranscript('Sarah Johnson', 'Alex Chen', [
            { sender: 'system', text: 'Chat started', offsetMinutes: 0 },
            { sender: 'customer', text: "Hi, I'm having trouble with my subscription renewal. It says my payment failed.", offsetMinutes: 0.5 },
            { sender: 'agent', text: 'Hello Sarah! I\'d be happy to help you with that. Let me check your account.', offsetMinutes: 1 },
            { sender: 'agent', text: 'I can see the issue. It looks like your credit card on file has expired. Would you like to update it?', offsetMinutes: 2 },
            { sender: 'customer', text: 'Oh yes, that makes sense! I got a new card last month. How do I update it?', offsetMinutes: 2.5 },
            { sender: 'agent', text: 'You can update it in Account Settings > Billing > Payment Methods. I can also send you a direct link.', offsetMinutes: 3 },
            { sender: 'customer', text: 'The link would be great, thanks!', offsetMinutes: 3.5 },
            { sender: 'agent', text: 'Sent! You should see it in your email shortly. Once updated, your subscription will renew automatically.', offsetMinutes: 4 },
            { sender: 'customer', text: 'Perfect! Just updated it. Thank you so much for your help!', offsetMinutes: 8 },
            { sender: 'agent', text: 'You\'re welcome! Is there anything else I can help you with today?', offsetMinutes: 8.5 },
            { sender: 'customer', text: 'No, that\'s all. Great service!', offsetMinutes: 9 },
            { sender: 'system', text: 'Chat ended', offsetMinutes: 17 },
        ]),
    },
    {
        id: 'chat-002',
        customerId: 'cust-002',
        customerName: 'Michael Brown',
        customerEmail: 'm.brown@company.com',
        agentName: 'Lisa Wang',
        agentId: 'agent-002',
        startedAt: new Date('2024-02-05T14:20:00'),
        endedAt: new Date('2024-02-05T14:45:00'),
        duration: 25,
        messageCount: 18,
        status: 'Resolved',
        rating: 4,
        tags: ['technical', 'api'],
        transcript: createTranscript('Michael Brown', 'Lisa Wang', [
            { sender: 'system', text: 'Chat started', offsetMinutes: 0 },
            { sender: 'customer', text: 'Hello, I\'m getting a 401 error when trying to access the API.', offsetMinutes: 0.5 },
            { sender: 'agent', text: 'Hi Michael! Let me help you with that API issue.', offsetMinutes: 1 },
            { sender: 'agent', text: 'Are you using the correct API key? The 401 error typically indicates an authentication problem.', offsetMinutes: 2 },
            { sender: 'customer', text: 'Yes, I\'m using the key from my dashboard. Should I regenerate it?', offsetMinutes: 3 },
            { sender: 'agent', text: 'Before we do that, can you confirm you\'re including the API key in the Authorization header as "Bearer YOUR_KEY"?', offsetMinutes: 4 },
            { sender: 'customer', text: 'Oh! I was just passing it as a query parameter. Let me try the header approach.', offsetMinutes: 5 },
            { sender: 'customer', text: 'That worked! Thank you so much. I should have read the docs more carefully.', offsetMinutes: 10 },
            { sender: 'agent', text: 'No problem at all! That\'s a common mix-up. Glad we got it sorted!', offsetMinutes: 10.5 },
            { sender: 'system', text: 'Chat ended', offsetMinutes: 25 },
        ]),
    },
    {
        id: 'chat-003',
        customerId: 'cust-003',
        customerName: 'Emma Davis',
        customerEmail: 'emma.davis@email.com',
        agentName: 'James Miller',
        agentId: 'agent-003',
        startedAt: new Date('2024-02-04T09:30:00'),
        endedAt: new Date('2024-02-04T10:15:00'),
        duration: 45,
        messageCount: 24,
        status: 'Transferred',
        rating: 3,
        tags: ['technical', 'account'],
        transcript: createTranscript('Emma Davis', 'James Miller', [
            { sender: 'system', text: 'Chat started', offsetMinutes: 0 },
            { sender: 'customer', text: 'Hi, I can\'t access my account. It says "Account suspended".', offsetMinutes: 1 },
            { sender: 'agent', text: 'Hello Emma! I\'m sorry to hear that. Let me look into this for you.', offsetMinutes: 2 },
            { sender: 'agent', text: 'I see your account was flagged for unusual activity. This requires our security team to review.', offsetMinutes: 5 },
            { sender: 'customer', text: 'Unusual activity? I haven\'t done anything different.', offsetMinutes: 6 },
            { sender: 'agent', text: 'I understand your concern. Let me transfer you to our security specialist who can investigate this thoroughly.', offsetMinutes: 7 },
            { sender: 'system', text: 'Chat transferred to Security Team', offsetMinutes: 10 },
            { sender: 'system', text: 'Chat ended', offsetMinutes: 45 },
        ]),
    },
    {
        id: 'chat-004',
        customerId: 'cust-004',
        customerName: 'David Wilson',
        customerEmail: 'david.w@startup.io',
        agentName: 'Alex Chen',
        agentId: 'agent-001',
        startedAt: new Date('2024-02-03T16:10:00'),
        endedAt: new Date('2024-02-03T16:25:00'),
        duration: 15,
        messageCount: 10,
        status: 'Resolved',
        rating: 5,
        tags: ['sales', 'pricing'],
        transcript: createTranscript('David Wilson', 'Alex Chen', [
            { sender: 'system', text: 'Chat started', offsetMinutes: 0 },
            { sender: 'customer', text: 'Hi! I\'m interested in upgrading to the Enterprise plan. What\'s included?', offsetMinutes: 0.5 },
            { sender: 'agent', text: 'Great to hear! The Enterprise plan includes unlimited users, priority support, custom integrations, and dedicated account management.', offsetMinutes: 1 },
            { sender: 'customer', text: 'Sounds perfect! What\'s the pricing for a team of 50?', offsetMinutes: 2 },
            { sender: 'agent', text: 'For 50 users, the Enterprise plan is $2,999/month. I can set up a demo call with our sales team if you\'d like?', offsetMinutes: 3 },
            { sender: 'customer', text: 'Yes, please! That would be great.', offsetMinutes: 4 },
            { sender: 'agent', text: 'Perfect! I\'ve sent you a calendar invite. Our team will reach out within 24 hours.', offsetMinutes: 5 },
            { sender: 'customer', text: 'Excellent, thank you!', offsetMinutes: 6 },
            { sender: 'system', text: 'Chat ended', offsetMinutes: 15 },
        ]),
    },
    {
        id: 'chat-005',
        customerId: 'cust-005',
        customerName: 'Jennifer Taylor',
        customerEmail: 'j.taylor@enterprise.com',
        agentName: 'Lisa Wang',
        agentId: 'agent-002',
        startedAt: new Date('2024-02-02T11:45:00'),
        endedAt: new Date('2024-02-02T12:30:00'),
        duration: 45,
        messageCount: 28,
        status: 'Unresolved',
        rating: null,
        tags: ['technical', 'integration'],
        transcript: createTranscript('Jennifer Taylor', 'Lisa Wang', [
            { sender: 'system', text: 'Chat started', offsetMinutes: 0 },
            { sender: 'customer', text: 'We\'re trying to integrate your API with our CRM but running into CORS issues.', offsetMinutes: 1 },
            { sender: 'agent', text: 'Hi Jennifer! I can help with that. Are you making requests from a web application?', offsetMinutes: 2 },
            { sender: 'customer', text: 'Yes, from our React app. The requests work in Postman but fail in the browser.', offsetMinutes: 3 },
            { sender: 'agent', text: 'That\'s a common CORS issue. You\'ll need to whitelist your domain in the API settings.', offsetMinutes: 4 },
            { sender: 'customer', text: 'I already added our domain but still getting the error.', offsetMinutes: 5 },
            { sender: 'agent', text: 'Let me check your API configuration. Can you share your domain?', offsetMinutes: 6 },
            { sender: 'customer', text: 'It\'s app.enterprise.com', offsetMinutes: 7 },
            { sender: 'agent', text: 'I see the issue - you need to include the protocol (https://). Let me update that for you.', offsetMinutes: 10 },
            { sender: 'customer', text: 'Still not working after the update...', offsetMinutes: 20 },
            { sender: 'agent', text: 'This might need deeper investigation. I\'ll create a support ticket and our engineering team will follow up.', offsetMinutes: 25 },
            { sender: 'system', text: 'Chat ended', offsetMinutes: 45 },
        ]),
    },
];

export const getChatHistoryStats = () => {
    const total = mockChatHistory.length;
    const resolved = mockChatHistory.filter((c) => c.status === 'Resolved').length;
    const avgRating =
        mockChatHistory
            .filter((c) => c.rating !== null)
            .reduce((sum, c) => sum + (c.rating || 0), 0) /
        mockChatHistory.filter((c) => c.rating !== null).length;
    const avgDuration =
        mockChatHistory.reduce((sum, c) => sum + c.duration, 0) / mockChatHistory.length;

    return {
        total,
        resolved,
        resolutionRate: Math.round((resolved / total) * 100),
        avgRating: Math.round(avgRating * 10) / 10,
        avgDuration: Math.round(avgDuration),
    };
};

export const getAllAgents = (): string[] => {
    return Array.from(new Set(mockChatHistory.map((c) => c.agentName)));
};

export const getAllTags = (): string[] => {
    return Array.from(new Set(mockChatHistory.flatMap((c) => c.tags)));
};
