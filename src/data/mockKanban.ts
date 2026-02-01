export interface KanbanTask {
    id: string;
    title: string;
    description?: string;
    priority: 'Low' | 'Medium' | 'High';
    assignee?: string;
    dueDate?: Date;
}

export interface KanbanColumn {
    id: string;
    title: string;
    tasks: KanbanTask[];
}

export interface KanbanBoard {
    columns: KanbanColumn[];
}

const taskTitles = [
    'Design new dashboard layout',
    'Implement user authentication',
    'Fix responsive issues',
    'Add dark mode support',
    'Create API documentation',
    'Write unit tests',
    'Review pull requests',
    'Update dependencies',
    'Optimize database queries',
    'Setup CI/CD pipeline',
    'Create onboarding flow',
    'Design email templates',
    'Implement search feature',
    'Add export functionality',
    'Fix security vulnerabilities',
];

const descriptions = [
    'This task needs to be completed by end of sprint',
    'High priority item from stakeholders',
    'Quick fix needed for production',
    'Part of the Q1 roadmap',
    'Dependencies on other teams',
    '',
];

const assignees = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams', undefined];

function getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateTask(id: number): KanbanTask {
    const priorities: KanbanTask['priority'][] = ['Low', 'Medium', 'High'];
    const description = getRandomElement(descriptions);

    return {
        id: `task-${id}`,
        title: getRandomElement(taskTitles),
        description: description || undefined,
        priority: getRandomElement(priorities),
        assignee: getRandomElement(assignees),
    };
}

export const initialKanbanData: KanbanBoard = {
    columns: [
        {
            id: 'backlog',
            title: 'Backlog',
            tasks: Array.from({ length: getRandomInt(3, 5) }, (_, i) => generateTask(i + 1)),
        },
        {
            id: 'todo',
            title: 'To Do',
            tasks: Array.from({ length: getRandomInt(2, 4) }, (_, i) => generateTask(i + 10)),
        },
        {
            id: 'in-progress',
            title: 'In Progress',
            tasks: Array.from({ length: getRandomInt(2, 3) }, (_, i) => generateTask(i + 20)),
        },
        {
            id: 'done',
            title: 'Done',
            tasks: Array.from({ length: getRandomInt(2, 4) }, (_, i) => generateTask(i + 30)),
        },
    ],
};
