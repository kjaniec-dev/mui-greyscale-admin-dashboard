export interface Product {
    id: string;
    name: string;
    sku: string;
    category: 'Electronics' | 'Clothing' | 'Food' | 'Books' | 'Home' | 'Sports';
    price: number;
    stock: number;
    status: 'In Stock' | 'Low Stock' | 'Out of Stock';
    image?: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

const categories: Product['category'][] = ['Electronics', 'Clothing', 'Food', 'Books', 'Home', 'Sports'];

const productNames = {
    Electronics: ['Wireless Headphones', 'Smart Watch', 'Laptop Stand', 'USB-C Cable', 'Portable Charger', 'Bluetooth Speaker'],
    Clothing: ['Cotton T-Shirt', 'Denim Jeans', 'Running Shoes', 'Winter Jacket', 'Baseball Cap', 'Wool Sweater'],
    Food: ['Organic Coffee', 'Dark Chocolate', 'Protein Bar', 'Green Tea', 'Almond Butter', 'Granola Mix'],
    Books: ['JavaScript Guide', 'Design Patterns', 'Clean Code', 'The Pragmatic Programmer', 'Refactoring', 'Domain-Driven Design'],
    Home: ['Ceramic Mug', 'Desk Lamp', 'Plant Pot', 'Wall Clock', 'Throw Pillow', 'Picture Frame'],
    Sports: ['Yoga Mat', 'Dumbbell Set', 'Water Bottle', 'Resistance Bands', 'Jump Rope', 'Foam Roller'],
};

function getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomPrice(min: number, max: number): number {
    return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

function getRandomStock(): number {
    return Math.floor(Math.random() * 200);
}

function getStockStatus(stock: number): Product['status'] {
    if (stock === 0) return 'Out of Stock';
    if (stock < 20) return 'Low Stock';
    return 'In Stock';
}

function getRandomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateSKU(category: string, index: number): string {
    const prefix = category.substring(0, 3).toUpperCase();
    const number = String(index + 1).padStart(4, '0');
    return `${prefix}-${number}`;
}

function generateProduct(index: number): Product {
    const category = getRandomElement(categories);
    const name = getRandomElement(productNames[category]);
    const stock = getRandomStock();
    const createdAt = getRandomDate(new Date(2023, 0, 1), new Date());
    const updatedAt = getRandomDate(createdAt, new Date());

    const priceRanges = {
        Electronics: [29.99, 299.99],
        Clothing: [19.99, 149.99],
        Food: [4.99, 29.99],
        Books: [9.99, 59.99],
        Home: [14.99, 89.99],
        Sports: [12.99, 99.99],
    };

    const [min, max] = priceRanges[category];

    return {
        id: `product-${index + 1}`,
        name: `${name} ${index % 3 === 0 ? 'Pro' : index % 3 === 1 ? 'Plus' : ''}`.trim(),
        sku: generateSKU(category, index),
        category,
        price: getRandomPrice(min, max),
        stock,
        status: getStockStatus(stock),
        description: `High-quality ${name.toLowerCase()} with premium features and excellent durability.`,
        createdAt,
        updatedAt,
    };
}

export const mockProducts: Product[] = Array.from({ length: 48 }, (_, i) => generateProduct(i));
