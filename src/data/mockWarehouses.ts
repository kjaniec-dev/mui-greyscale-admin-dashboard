export interface Warehouse {
    id: string;
    name: string;
    code: string;
    address: string;
    city: string;
    country: string;
    capacity: number;
    usedCapacity: number;
    status: 'Active' | 'Inactive' | 'Maintenance';
    manager: string;
    phone: string;
    email: string;
    createdAt: Date;
}

const warehouseNames = [
    'Central Distribution Hub',
    'West Coast Fulfillment',
    'East Coast Warehouse',
    'Midwest Logistics Center',
    'Southern Distribution',
    'Pacific Northwest Hub',
    'Northeast Fulfillment',
    'Mountain Region Storage',
    'Gulf Coast Center',
    'Great Lakes Warehouse',
];

const cities = [
    { city: 'Los Angeles', country: 'USA' },
    { city: 'New York', country: 'USA' },
    { city: 'Chicago', country: 'USA' },
    { city: 'Houston', country: 'USA' },
    { city: 'Phoenix', country: 'USA' },
    { city: 'Seattle', country: 'USA' },
    { city: 'Boston', country: 'USA' },
    { city: 'Denver', country: 'USA' },
    { city: 'Miami', country: 'USA' },
    { city: 'Detroit', country: 'USA' },
];

const managers = [
    'Michael Chen',
    'Sarah Johnson',
    'David Williams',
    'Emily Brown',
    'James Wilson',
    'Lisa Martinez',
    'Robert Taylor',
    'Jennifer Davis',
    'William Anderson',
    'Amanda Thomas',
];

function getRandomCapacity(): number {
    return Math.floor(Math.random() * 40000) + 10000;
}

function getRandomUsedPercentage(): number {
    return Math.floor(Math.random() * 95) + 5;
}

function getRandomStatus(): Warehouse['status'] {
    const rand = Math.random();
    if (rand < 0.7) return 'Active';
    if (rand < 0.9) return 'Inactive';
    return 'Maintenance';
}

function generatePhone(): string {
    const areaCode = Math.floor(Math.random() * 900) + 100;
    const prefix = Math.floor(Math.random() * 900) + 100;
    const line = Math.floor(Math.random() * 9000) + 1000;
    return `+1 (${areaCode}) ${prefix}-${line}`;
}

function generateWarehouse(index: number): Warehouse {
    const location = cities[index % cities.length];
    const capacity = getRandomCapacity();
    const usedPercentage = getRandomUsedPercentage();
    const manager = managers[index % managers.length];

    return {
        id: `warehouse-${index + 1}`,
        name: warehouseNames[index % warehouseNames.length],
        code: `WH-${String(index + 1).padStart(3, '0')}`,
        address: `${Math.floor(Math.random() * 9000) + 1000} Industrial Blvd`,
        city: location.city,
        country: location.country,
        capacity,
        usedCapacity: Math.floor(capacity * (usedPercentage / 100)),
        status: getRandomStatus(),
        manager,
        phone: generatePhone(),
        email: `${manager.toLowerCase().replace(' ', '.')}@warehouse.com`,
        createdAt: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    };
}

export const mockWarehouses: Warehouse[] = Array.from({ length: 10 }, (_, i) => generateWarehouse(i));
