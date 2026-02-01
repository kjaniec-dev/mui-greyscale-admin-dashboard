import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { Invoice } from '../../data/mockInvoices';

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        fontSize: 10,
        color: '#171717',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        borderBottom: '1px solid #E5E5E5',
        paddingBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    status: {
        textTransform: 'uppercase',
        fontSize: 10,
        marginTop: 5,
        color: '#737373',
    },
    section: {
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        flexDirection: 'column',
    },
    label: {
        fontSize: 8,
        color: '#737373',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    value: {
        fontSize: 10,
        marginBottom: 10,
    },
    table: {
        marginTop: 30,
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottom: '1px solid #171717',
        paddingBottom: 5,
        marginBottom: 5,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottom: '1px solid #E5E5E5',
        paddingVertical: 8,
    },
    colDesc: { width: '50%' },
    colQty: { width: '15%', textAlign: 'center' },
    colPrice: { width: '15%', textAlign: 'right' },
    colTotal: { width: '20%', textAlign: 'right' },
    totals: {
        marginTop: 20,
        alignItems: 'flex-end',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 200,
        marginBottom: 5,
    },
    totalLabel: {
        color: '#737373',
    },
    grandTotal: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
        borderTop: '1px solid #171717',
        paddingTop: 5,
    },
});

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
};

interface InvoicePDFProps {
    invoice: Invoice;
}

export function InvoicePDF({ invoice }: InvoicePDFProps) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>INVOICE</Text>
                        <Text style={styles.status}>{invoice.status}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.label}>Invoice ID</Text>
                        <Text style={styles.value}>{invoice.id}</Text>
                        <Text style={styles.label}>Date</Text>
                        <Text style={styles.value}>{formatDate(invoice.issueDate)}</Text>
                    </View>
                </View>

                {/* Details */}
                <View style={[styles.row, styles.section]}>
                    <View style={styles.column}>
                        <Text style={styles.label}>Billed To</Text>
                        <Text style={styles.value}>{invoice.customer.name}</Text>
                        <Text style={styles.value}>{invoice.customer.email}</Text>
                        <Text style={styles.value}>{invoice.customer.address.street}</Text>
                        <Text style={styles.value}>
                            {invoice.customer.address.city}, {invoice.customer.address.state} {invoice.customer.address.zipCode}
                        </Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Due Date</Text>
                        <Text style={styles.value}>{formatDate(invoice.dueDate)}</Text>
                    </View>
                </View>

                {/* Table Header */}
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.colDesc}>DESCRIPTION</Text>
                        <Text style={styles.colQty}>QTY</Text>
                        <Text style={styles.colPrice}>PRICE</Text>
                        <Text style={styles.colTotal}>TOTAL</Text>
                    </View>

                    {/* Items */}
                    {invoice.items.map((item) => (
                        <View style={styles.tableRow} key={item.id}>
                            <Text style={styles.colDesc}>{item.description}</Text>
                            <Text style={styles.colQty}>{item.quantity}</Text>
                            <Text style={styles.colPrice}>{currencyFormatter.format(item.rate)}</Text>
                            <Text style={styles.colTotal}>{currencyFormatter.format(item.amount)}</Text>
                        </View>
                    ))}
                </View>

                {/* Totals */}
                <View style={styles.totals}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Subtotal</Text>
                        <Text>{currencyFormatter.format(invoice.subtotal)}</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Tax</Text>
                        <Text>{currencyFormatter.format(invoice.tax)}</Text>
                    </View>
                    <View style={[styles.totalRow, styles.grandTotal]}>
                        <Text>Total</Text>
                        <Text>{currencyFormatter.format(invoice.total)}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
}
