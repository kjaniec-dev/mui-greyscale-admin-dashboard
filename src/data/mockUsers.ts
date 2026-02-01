export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: 'Admin' | 'User' | 'Manager';
    status: 'Active' | 'Inactive' | 'Pending';
    createdAt: Date;
    lastLogin?: Date;
}

const firstNames = [
    'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
    'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
    'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa',
    'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley',
    'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle',
    'Kenneth', 'Carol', 'Kevin', 'Amanda', 'Brian', 'Dorothy', 'George', 'Melissa',
    'Edward', 'Deborah', 'Ronald', 'Stephanie', 'Timothy', 'Rebecca', 'Jason', 'Sharon',
];

const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
    'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White',
    'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young',
    'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
];

const roles: User['role'][] = ['Admin', 'User', 'Manager'];
const statuses: User['status'][] = ['Active', 'Inactive', 'Pending'];

function getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateUser(index: number): User {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    const role = getRandomElement(roles);
    const status = getRandomElement(statuses);

    const createdAt = getRandomDate(
        new Date(2022, 0, 1),
        new Date()
    );

    const lastLogin = status === 'Active' && Math.random() > 0.3
        ? getRandomDate(createdAt, new Date())
        : undefined;

    return {
        id: `user-${index + 1}`,
        name,
        email,
        role,
        status,
        createdAt,
        lastLogin,
    };
}

export const mockUsers: User[] = Array.from({ length: 57 }, (_, i) => generateUser(i));
