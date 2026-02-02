import {
    BarChart as BarChartIcon,
    ShowChart as LineChartIcon,
    PieChart as PieChartIcon,
    DonutLarge as DonutChartIcon,
    TableChart as TableIcon,
    TrendingUp as AreaChartIcon,
} from '@mui/icons-material';
import type { SvgIconComponent } from '@mui/icons-material';

// Types
export type DataSourceType = 'orders' | 'users' | 'products' | 'customers' | 'invoices' | 'transactions';
export type ChartType = 'bar' | 'line' | 'area' | 'pie' | 'donut' | 'table';
export type FilterOperator = 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than' | 'between' | 'in';

export interface ReportFilter {
    id: string;
    field: string;
    operator: FilterOperator;
    value: string | number | string[];
}

export interface ReportConfig {
    dataSource: DataSourceType;
    columns: string[];
    filters: ReportFilter[];
    groupBy?: string;
    dateRange: string;
    chartType: ChartType;
    chartTitle?: string;
}

export interface SavedReport {
    id: string;
    name: string;
    description?: string;
    config: ReportConfig;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    isFavorite: boolean;
    thumbnail?: string;
}

// Data source field definitions
export const dataSourceFields: Record<DataSourceType, { key: string; label: string; type: 'string' | 'number' | 'date' | 'status' }[]> = {
    orders: [
        { key: 'id', label: 'Order ID', type: 'string' },
        { key: 'customer', label: 'Customer', type: 'string' },
        { key: 'items', label: 'Items Count', type: 'number' },
        { key: 'total', label: 'Total Amount', type: 'number' },
        { key: 'status', label: 'Status', type: 'status' },
        { key: 'date', label: 'Order Date', type: 'date' },
        { key: 'shipping', label: 'Shipping Address', type: 'string' },
        { key: 'paymentMethod', label: 'Payment Method', type: 'string' },
    ],
    users: [
        { key: 'id', label: 'User ID', type: 'string' },
        { key: 'name', label: 'Name', type: 'string' },
        { key: 'email', label: 'Email', type: 'string' },
        { key: 'role', label: 'Role', type: 'string' },
        { key: 'status', label: 'Status', type: 'status' },
        { key: 'createdAt', label: 'Created Date', type: 'date' },
        { key: 'lastLogin', label: 'Last Login', type: 'date' },
    ],
    products: [
        { key: 'id', label: 'Product ID', type: 'string' },
        { key: 'name', label: 'Product Name', type: 'string' },
        { key: 'sku', label: 'SKU', type: 'string' },
        { key: 'price', label: 'Price', type: 'number' },
        { key: 'stock', label: 'Stock', type: 'number' },
        { key: 'category', label: 'Category', type: 'string' },
        { key: 'status', label: 'Status', type: 'status' },
    ],
    customers: [
        { key: 'id', label: 'Customer ID', type: 'string' },
        { key: 'name', label: 'Name', type: 'string' },
        { key: 'email', label: 'Email', type: 'string' },
        { key: 'phone', label: 'Phone', type: 'string' },
        { key: 'orders', label: 'Total Orders', type: 'number' },
        { key: 'spent', label: 'Total Spent', type: 'number' },
        { key: 'createdAt', label: 'Joined Date', type: 'date' },
    ],
    invoices: [
        { key: 'id', label: 'Invoice ID', type: 'string' },
        { key: 'customer', label: 'Customer', type: 'string' },
        { key: 'amount', label: 'Amount', type: 'number' },
        { key: 'status', label: 'Status', type: 'status' },
        { key: 'dueDate', label: 'Due Date', type: 'date' },
        { key: 'paidDate', label: 'Paid Date', type: 'date' },
    ],
    transactions: [
        { key: 'id', label: 'Transaction ID', type: 'string' },
        { key: 'type', label: 'Type', type: 'string' },
        { key: 'amount', label: 'Amount', type: 'number' },
        { key: 'status', label: 'Status', type: 'status' },
        { key: 'date', label: 'Date', type: 'date' },
        { key: 'method', label: 'Payment Method', type: 'string' },
    ],
};

export const dataSourceLabels: Record<DataSourceType, string> = {
    orders: 'Orders',
    users: 'Users',
    products: 'Products',
    customers: 'Customers',
    invoices: 'Invoices',
    transactions: 'Transactions',
};

export const chartTypeConfig: Record<ChartType, { label: string; Icon: SvgIconComponent }> = {
    bar: { label: 'Bar Chart', Icon: BarChartIcon },
    line: { label: 'Line Chart', Icon: LineChartIcon },
    area: { label: 'Area Chart', Icon: AreaChartIcon },
    pie: { label: 'Pie Chart', Icon: PieChartIcon },
    donut: { label: 'Donut Chart', Icon: DonutChartIcon },
    table: { label: 'Data Table', Icon: TableIcon },
};

export const filterOperators: { value: FilterOperator; label: string }[] = [
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Not Equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'greater_than', label: 'Greater Than' },
    { value: 'less_than', label: 'Less Than' },
    { value: 'between', label: 'Between' },
    { value: 'in', label: 'In List' },
];

// Mock saved reports
export const mockSavedReports: SavedReport[] = [
    {
        id: 'report-1',
        name: 'Monthly Sales Overview',
        description: 'Track total sales and revenue by month',
        config: {
            dataSource: 'orders',
            columns: ['date', 'total', 'items', 'status'],
            filters: [],
            groupBy: 'date',
            dateRange: 'thisYear',
            chartType: 'bar',
            chartTitle: 'Monthly Revenue',
        },
        createdAt: '2026-01-15T10:30:00Z',
        updatedAt: '2026-01-28T14:20:00Z',
        createdBy: 'Admin User',
        isFavorite: true,
    },
    {
        id: 'report-2',
        name: 'User Growth Analytics',
        description: 'New user registrations over time',
        config: {
            dataSource: 'users',
            columns: ['createdAt', 'role', 'status'],
            filters: [],
            groupBy: 'createdAt',
            dateRange: 'last90',
            chartType: 'area',
            chartTitle: 'User Signups',
        },
        createdAt: '2026-01-10T09:00:00Z',
        updatedAt: '2026-01-25T11:45:00Z',
        createdBy: 'Admin User',
        isFavorite: true,
    },
    {
        id: 'report-3',
        name: 'Product Inventory Status',
        description: 'Current stock levels by category',
        config: {
            dataSource: 'products',
            columns: ['name', 'category', 'stock', 'price'],
            filters: [],
            groupBy: 'category',
            dateRange: 'all',
            chartType: 'pie',
            chartTitle: 'Stock by Category',
        },
        createdAt: '2026-01-08T15:20:00Z',
        updatedAt: '2026-01-20T10:30:00Z',
        createdBy: 'Admin User',
        isFavorite: false,
    },
    {
        id: 'report-4',
        name: 'Customer Spending Analysis',
        description: 'Top customers by total spending',
        config: {
            dataSource: 'customers',
            columns: ['name', 'orders', 'spent'],
            filters: [{ id: 'f1', field: 'orders', operator: 'greater_than', value: 5 }],
            groupBy: 'name',
            dateRange: 'thisYear',
            chartType: 'bar',
            chartTitle: 'Top Spenders',
        },
        createdAt: '2026-01-05T12:00:00Z',
        updatedAt: '2026-01-18T16:45:00Z',
        createdBy: 'Admin User',
        isFavorite: false,
    },
    {
        id: 'report-5',
        name: 'Invoice Status Distribution',
        description: 'Breakdown of invoices by payment status',
        config: {
            dataSource: 'invoices',
            columns: ['status', 'amount'],
            filters: [],
            groupBy: 'status',
            dateRange: 'last30',
            chartType: 'donut',
            chartTitle: 'Invoice Status',
        },
        createdAt: '2026-01-02T08:30:00Z',
        updatedAt: '2026-01-15T13:15:00Z',
        createdBy: 'Admin User',
        isFavorite: false,
    },
    {
        id: 'report-6',
        name: 'Transaction Trends',
        description: 'Daily transaction volume and amounts',
        config: {
            dataSource: 'transactions',
            columns: ['date', 'amount', 'type', 'status'],
            filters: [],
            groupBy: 'date',
            dateRange: 'last30',
            chartType: 'line',
            chartTitle: 'Transaction Volume',
        },
        createdAt: '2025-12-28T11:00:00Z',
        updatedAt: '2026-01-12T09:30:00Z',
        createdBy: 'Admin User',
        isFavorite: true,
    },
];

// Report templates for quick creation
export const reportTemplates: Omit<SavedReport, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'isFavorite'>[] = [
    {
        name: 'Sales Performance',
        description: 'Monthly sales and order trends',
        config: {
            dataSource: 'orders',
            columns: ['date', 'total', 'items'],
            filters: [],
            groupBy: 'date',
            dateRange: 'thisYear',
            chartType: 'bar',
        },
    },
    {
        name: 'User Engagement',
        description: 'User activity and registration trends',
        config: {
            dataSource: 'users',
            columns: ['createdAt', 'lastLogin', 'status'],
            filters: [],
            groupBy: 'createdAt',
            dateRange: 'last90',
            chartType: 'line',
        },
    },
    {
        name: 'Revenue Breakdown',
        description: 'Revenue distribution by customer',
        config: {
            dataSource: 'customers',
            columns: ['name', 'spent'],
            filters: [],
            groupBy: 'name',
            dateRange: 'all',
            chartType: 'pie',
        },
    },
];

// Generate mock chart data based on report config
export function generateMockChartData(config: ReportConfig): { labels: string[]; values: number[] } {
    const { dataSource, chartType, dateRange } = config;

    // Generate labels based on data source and grouping
    let labels: string[] = [];
    let values: number[] = [];

    if (config.groupBy === 'date' || config.groupBy === 'createdAt') {
        // Time-based data
        if (dateRange === 'last7' || dateRange === 'today') {
            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            values = [120, 145, 132, 178, 165, 89, 102];
        } else if (dateRange === 'last30') {
            labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            values = [450, 520, 480, 610];
        } else {
            labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            values = [4500, 5200, 4800, 5800, 6200, 5500, 4900, 6800, 7200, 6500, 7800, 8200];
        }
    } else if (dataSource === 'products') {
        labels = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'];
        values = [320, 280, 150, 95, 45];
    } else if (dataSource === 'customers') {
        labels = ['Top 1', 'Top 2', 'Top 3', 'Top 4', 'Top 5'];
        values = [12500, 9800, 7600, 5400, 4200];
    } else if (dataSource === 'invoices') {
        labels = ['Paid', 'Pending', 'Overdue', 'Cancelled'];
        values = [65, 20, 10, 5];
    } else if (dataSource === 'transactions') {
        labels = ['Credit Card', 'PayPal', 'Bank Transfer', 'Crypto'];
        values = [55, 25, 15, 5];
    } else {
        labels = ['Category A', 'Category B', 'Category C', 'Category D'];
        values = [40, 30, 20, 10];
    }

    // Adjust for chart type
    if (chartType === 'pie' || chartType === 'donut') {
        // Limit to 5 items for pie charts
        labels = labels.slice(0, 5);
        values = values.slice(0, 5);
    }

    return { labels, values };
}
