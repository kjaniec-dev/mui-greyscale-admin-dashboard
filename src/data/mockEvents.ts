export interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end?: Date;
    allDay?: boolean;
    color?: string;
    description?: string;
}

// Greyscale color palette for events
export const eventColors = [
    '#171717', // Near black
    '#404040', // Dark grey
    '#525252', // Medium grey
    '#737373', // Grey
    '#A3A3A3', // Light grey
];

function getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const eventTitles = [
    'Team Meeting',
    'Project Review',
    'Client Call',
    'Sprint Planning',
    'Design Review',
    'Code Review',
    'Lunch with Team',
    'Training Session',
    'Interview',
    'Deadline',
    'Release Day',
    'Workshop',
    'Conference Call',
    'Presentation',
    'Brainstorming',
];

function generateEvents(): CalendarEvent[] {
    const events: CalendarEvent[] = [];
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Generate events for current month and next month
    for (let i = 0; i < 25; i++) {
        const monthOffset = getRandomInt(0, 1);
        const day = getRandomInt(1, 28);
        const hour = getRandomInt(9, 17);
        const duration = getRandomInt(1, 3);
        const isAllDay = Math.random() < 0.2;

        const start = new Date(currentYear, currentMonth + monthOffset, day, hour, 0);
        const end = isAllDay ? undefined : new Date(currentYear, currentMonth + monthOffset, day, hour + duration, 0);

        events.push({
            id: `event-${i + 1}`,
            title: getRandomElement(eventTitles),
            start,
            end,
            allDay: isAllDay,
            color: getRandomElement(eventColors),
        });
    }

    return events;
}

export const mockEvents: CalendarEvent[] = generateEvents();
