export interface ChatUser {
    id: string;
    name: string;
    avatar?: string;
    online: boolean;
}

export interface ChatMessage {
    id: string;
    senderId: string;
    text: string;
    timestamp: Date;
}

export interface Conversation {
    id: string;
    participant: ChatUser;
    messages: ChatMessage[];
    unreadCount: number;
}

// Current user (you)
export const currentUser: ChatUser = {
    id: 'me',
    name: 'John Doe',
    online: true,
};

// Other users
const users: ChatUser[] = [
    { id: 'user-1', name: 'Sarah Johnson', online: true },
    { id: 'user-2', name: 'Mike Brown', online: false },
    { id: 'user-3', name: 'Emily Davis', online: true },
    { id: 'user-4', name: 'Alex Wilson', online: false },
    { id: 'user-5', name: 'Lisa Chen', online: true },
    { id: 'user-6', name: 'David Lee', online: false },
];

const messageTemplates = [
    "Hey, how's it going?",
    "Did you see the latest update?",
    "Can we schedule a meeting for tomorrow?",
    "Thanks for your help earlier!",
    "I'll send you the files shortly.",
    "Sounds good to me!",
    "Let me check and get back to you.",
    "That's great news!",
    "I'm working on it now.",
    "Sure, no problem.",
    "What do you think about the design?",
    "I'll be there in 10 minutes.",
    "Can you review my pull request?",
    "The deadline is next Friday.",
    "Let's catch up later.",
];

function getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMessages(userId: string, count: number): ChatMessage[] {
    const messages: ChatMessage[] = [];
    const now = new Date();

    for (let i = 0; i < count; i++) {
        const isFromMe = Math.random() < 0.5;
        const minutesAgo = (count - i) * getRandomInt(5, 30);
        const timestamp = new Date(now.getTime() - minutesAgo * 60 * 1000);

        messages.push({
            id: `msg-${userId}-${i}`,
            senderId: isFromMe ? 'me' : userId,
            text: getRandomElement(messageTemplates),
            timestamp,
        });
    }

    return messages;
}

export const conversations: Conversation[] = users.map((user, index) => {
    const messageCount = getRandomInt(5, 15);
    const messages = generateMessages(user.id, messageCount);

    return {
        id: `conv-${user.id}`,
        participant: user,
        messages,
        unreadCount: index < 3 ? getRandomInt(0, 3) : 0,
    };
});

export function getLastMessage(conversation: Conversation): ChatMessage | undefined {
    return conversation.messages[conversation.messages.length - 1];
}

export function formatMessageTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'now';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
