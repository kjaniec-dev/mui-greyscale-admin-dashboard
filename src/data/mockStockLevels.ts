import { mockProducts } from './mockProducts';
import { mockWarehouses } from './mockWarehouses';

export interface StockLevel {
    id: string;
    productId: string;
    productName: string;
    productSku: string;
    warehouseId: string;
    warehouseName: string;
    warehouseCode: string;
    quantity: number;
    minQuantity: number;
    maxQuantity: number;
    reorderPoint: number;
    status: 'Normal' | 'Low' | 'Critical' | 'Overstocked';
    lastUpdated: Date;
}

function getStockStatus(quantity: number, maxQuantity: number, reorderPoint: number): StockLevel['status'] {
    if (quantity <= 0) return 'Critical';
    if (quantity <= reorderPoint) return 'Low';
    if (quantity >= maxQuantity * 0.95) return 'Overstocked';
    return 'Normal';
}

function generateStockLevel(productIndex: number, warehouseIndex: number): StockLevel {
    const product = mockProducts[productIndex % mockProducts.length];
    const warehouse = mockWarehouses[warehouseIndex % mockWarehouses.length];

    const minQuantity = Math.floor(Math.random() * 20) + 10;
    const maxQuantity = Math.floor(Math.random() * 300) + 100;
    const reorderPoint = Math.floor(minQuantity * 1.5);

    // Generate varying quantities to get different statuses
    let quantity: number;
    const statusChance = Math.random();
    if (statusChance < 0.1) {
        quantity = 0; // Critical - 10%
    } else if (statusChance < 0.25) {
        quantity = Math.floor(Math.random() * (reorderPoint - 1)) + 1; // Low - 15%
    } else if (statusChance < 0.35) {
        quantity = Math.floor(maxQuantity * 0.95) + Math.floor(Math.random() * 20); // Overstocked - 10%
    } else {
        quantity = Math.floor(Math.random() * (maxQuantity - reorderPoint - 20)) + reorderPoint + 10; // Normal - 65%
    }

    const lastUpdated = new Date();
    lastUpdated.setDate(lastUpdated.getDate() - Math.floor(Math.random() * 30));

    return {
        id: `stock-${productIndex}-${warehouseIndex}`,
        productId: product.id,
        productName: product.name,
        productSku: product.sku,
        warehouseId: warehouse.id,
        warehouseName: warehouse.name,
        warehouseCode: warehouse.code,
        quantity,
        minQuantity,
        maxQuantity,
        reorderPoint,
        status: getStockStatus(quantity, maxQuantity, reorderPoint),
        lastUpdated,
    };
}

// Generate stock levels for products across warehouses
// Each product exists in 2-4 warehouses
export const mockStockLevels: StockLevel[] = [];

mockProducts.slice(0, 20).forEach((_, productIndex) => {
    const numWarehouses = Math.floor(Math.random() * 3) + 2; // 2-4 warehouses
    const warehouseIndices = new Set<number>();

    while (warehouseIndices.size < numWarehouses) {
        warehouseIndices.add(Math.floor(Math.random() * mockWarehouses.length));
    }

    warehouseIndices.forEach((warehouseIndex) => {
        mockStockLevels.push(generateStockLevel(productIndex, warehouseIndex));
    });
});
