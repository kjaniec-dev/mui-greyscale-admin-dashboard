export type TaskPriority = 'Low' | 'Medium' | 'High';
export type TaskListType = 'Personal' | 'Work' | 'Shopping' | 'Other';

export interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    priority: TaskPriority;
    dueDate?: Date;
    list: TaskListType;
    tags: string[];
    createdAt: Date;
    completedAt?: Date;
}

export interface TaskList {
    id: TaskListType;
    name: string;
    color: string;
    icon: string;
}

export const taskLists: TaskList[] = [
    { id: 'Personal', name: 'Personal', color: '#3B82F6', icon: 'Person' },
    { id: 'Work', name: 'Work', color: '#8B5CF6', icon: 'Work' },
    { id: 'Shopping', name: 'Shopping', color: '#10B981', icon: 'ShoppingCart' },
    { id: 'Other', name: 'Other', color: '#6B7280', icon: 'MoreHoriz' },
];

// Helper to create dates relative to today
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);
const lastWeek = new Date(today);
lastWeek.setDate(today.getDate() - 7);

export const mockTasks: Task[] = [
    // Overdue tasks
    {
        id: 'task-1',
        title: 'Submit quarterly report',
        description: 'Compile and submit Q1 financial report to management',
        completed: false,
        priority: 'High',
        dueDate: yesterday,
        list: 'Work',
        tags: ['urgent', 'reports'],
        createdAt: lastWeek,
    },
    {
        id: 'task-2',
        title: 'Schedule dentist appointment',
        completed: false,
        priority: 'Medium',
        dueDate: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
        list: 'Personal',
        tags: ['health'],
        createdAt: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000),
    },

    // Due today
    {
        id: 'task-3',
        title: 'Team standup meeting',
        description: 'Daily sync with development team at 10 AM',
        completed: false,
        priority: 'High',
        dueDate: today,
        list: 'Work',
        tags: ['meeting', 'daily'],
        createdAt: today,
    },
    {
        id: 'task-4',
        title: 'Buy groceries',
        description: 'Milk, eggs, bread, vegetables',
        completed: false,
        priority: 'Medium',
        dueDate: today,
        list: 'Shopping',
        tags: ['groceries'],
        createdAt: yesterday,
    },
    {
        id: 'task-5',
        title: 'Review pull requests',
        completed: false,
        priority: 'Medium',
        dueDate: today,
        list: 'Work',
        tags: ['code-review', 'development'],
        createdAt: yesterday,
    },

    // Due tomorrow
    {
        id: 'task-6',
        title: 'Prepare presentation slides',
        description: 'Create slides for client meeting on Friday',
        completed: false,
        priority: 'High',
        dueDate: tomorrow,
        list: 'Work',
        tags: ['presentation', 'client'],
        createdAt: today,
    },
    {
        id: 'task-7',
        title: 'Call mom',
        completed: false,
        priority: 'Low',
        dueDate: tomorrow,
        list: 'Personal',
        tags: ['family'],
        createdAt: today,
    },

    // Due next week
    {
        id: 'task-8',
        title: 'Update project documentation',
        description: 'Document new features and API changes',
        completed: false,
        priority: 'Medium',
        dueDate: nextWeek,
        list: 'Work',
        tags: ['documentation'],
        createdAt: today,
    },
    {
        id: 'task-9',
        title: 'Order new office chair',
        completed: false,
        priority: 'Low',
        dueDate: nextWeek,
        list: 'Shopping',
        tags: ['office', 'furniture'],
        createdAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
    },
    {
        id: 'task-10',
        title: 'Plan weekend trip',
        description: 'Research destinations and book accommodation',
        completed: false,
        priority: 'Low',
        dueDate: nextWeek,
        list: 'Personal',
        tags: ['travel', 'vacation'],
        createdAt: today,
    },

    // No due date
    {
        id: 'task-11',
        title: 'Learn TypeScript advanced patterns',
        description: 'Study generics, conditional types, and utility types',
        completed: false,
        priority: 'Low',
        list: 'Personal',
        tags: ['learning', 'development'],
        createdAt: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000),
    },
    {
        id: 'task-12',
        title: 'Organize desk workspace',
        completed: false,
        priority: 'Low',
        list: 'Other',
        tags: ['organization'],
        createdAt: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000),
    },
    {
        id: 'task-13',
        title: 'Research new project management tools',
        completed: false,
        priority: 'Medium',
        list: 'Work',
        tags: ['research', 'tools'],
        createdAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
    },

    // Completed tasks
    {
        id: 'task-14',
        title: 'Send invoice to client',
        completed: true,
        priority: 'High',
        dueDate: yesterday,
        list: 'Work',
        tags: ['billing', 'client'],
        createdAt: lastWeek,
        completedAt: yesterday,
    },
    {
        id: 'task-15',
        title: 'Update resume',
        description: 'Add recent projects and achievements',
        completed: true,
        priority: 'Medium',
        list: 'Personal',
        tags: ['career'],
        createdAt: new Date(today.getTime() - 8 * 24 * 60 * 60 * 1000),
        completedAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
    },
    {
        id: 'task-16',
        title: 'Fix production bug',
        description: 'Resolve authentication issue in production',
        completed: true,
        priority: 'High',
        dueDate: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
        list: 'Work',
        tags: ['bug', 'urgent'],
        createdAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
        completedAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
    },
    {
        id: 'task-17',
        title: 'Buy birthday gift',
        completed: true,
        priority: 'Medium',
        dueDate: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000),
        list: 'Shopping',
        tags: ['gifts'],
        createdAt: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000),
        completedAt: new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000),
    },
    {
        id: 'task-18',
        title: 'Clean apartment',
        completed: true,
        priority: 'Low',
        list: 'Personal',
        tags: ['chores'],
        createdAt: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
        completedAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
    },
    {
        id: 'task-19',
        title: 'Setup development environment',
        description: 'Install and configure all necessary dev tools',
        completed: true,
        priority: 'High',
        list: 'Work',
        tags: ['setup', 'development'],
        createdAt: new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000),
        completedAt: new Date(today.getTime() - 12 * 24 * 60 * 60 * 1000),
    },
    {
        id: 'task-20',
        title: 'Read "Atomic Habits" book',
        completed: true,
        priority: 'Low',
        list: 'Personal',
        tags: ['reading', 'self-improvement'],
        createdAt: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000),
        completedAt: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000),
    },
];

// Helper functions
const getStartOfDay = (date: Date): Date => {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    return start;
};

const getEndOfDay = (date: Date): Date => {
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    return end;
};

export const getTasksByList = (
    list: TaskListType | 'All',
    tasks: Task[] = mockTasks,
): Task[] => {
    if (list === 'All') return tasks;
    return tasks.filter((task) => task.list === list);
};

export const getTasksForToday = (
    tasks: Task[] = mockTasks,
    referenceDate: Date = new Date(),
): Task[] => {
    const todayStart = getStartOfDay(referenceDate);
    const todayEnd = getEndOfDay(referenceDate);

    return tasks.filter((task) => {
        if (!task.dueDate) return false;
        const dueDate = new Date(task.dueDate);
        return dueDate >= todayStart && dueDate <= todayEnd && !task.completed;
    });
};

export const getOverdueTasks = (
    tasks: Task[] = mockTasks,
    referenceDate: Date = new Date(),
): Task[] => {
    const todayStart = getStartOfDay(referenceDate);

    return tasks.filter((task) => {
        if (!task.dueDate || task.completed) return false;
        return new Date(task.dueDate) < todayStart;
    });
};

export const getUpcomingTasks = (
    tasks: Task[] = mockTasks,
    referenceDate: Date = new Date(),
): Task[] => {
    const todayEnd = getEndOfDay(referenceDate);
    const nextWeekEnd = getEndOfDay(referenceDate);
    nextWeekEnd.setDate(referenceDate.getDate() + 7);

    return tasks.filter((task) => {
        if (!task.dueDate || task.completed) return false;
        const dueDate = new Date(task.dueDate);
        return dueDate > todayEnd && dueDate <= nextWeekEnd;
    });
};

export const getTaskStats = (
    tasks: Task[] = mockTasks,
    referenceDate: Date = new Date(),
) => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const completedToday = tasks.filter((t) => {
        if (!t.completedAt) return false;
        const completedDate = new Date(t.completedAt);
        const todayStart = getStartOfDay(referenceDate);
        return completedDate >= todayStart;
    }).length;
    const overdue = getOverdueTasks(tasks, referenceDate).length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
        total,
        completed,
        completedToday,
        overdue,
        completionRate,
    };
};
