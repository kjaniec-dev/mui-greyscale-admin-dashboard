import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Divider,
    Chip,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    useTheme,
} from '@mui/material';
import {
    Close as CloseIcon,
    Business as BusinessIcon,
    Email as EmailIcon,
    LocationOn as LocationIcon,
    CalendarToday as CalendarIcon,
    Receipt as ReceiptIcon,
} from '@mui/icons-material';
import type { Invoice } from '../../data/mockInvoices';

interface InvoiceDetailDrawerProps {
    open: boolean;
    onClose: () => void;
    invoice: Invoice | null;
}

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

function formatDate(date: Date | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function InvoiceDetailDrawer({ open, onClose, invoice }: InvoiceDetailDrawerProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    if (!invoice) return null;

    const statusColors = {
        Draft: { bg: isDarkMode ? '#404040' : '#D4D4D4', text: isDarkMode ? '#E5E5E5' : '#171717' },
        Pending: { bg: isDarkMode ? '#D97706' : '#F59E0B', text: '#171717' },
        Paid: { bg: isDarkMode ? '#A3A3A3' : '#525252', text: isDarkMode ? '#171717' : '#FAFAFA' },
        Overdue: { bg: isDarkMode ? '#DC2626' : '#EF4444', text: '#FAFAFA' },
        Cancelled: { bg: isDarkMode ? '#525252' : '#A3A3A3', text: isDarkMode ? '#FAFAFA' : '#171717' },
    };

    const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
                sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 1,
                    bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {icon}
            </Box>
            <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary" display="block">
                    {label}
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                    {value}
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: { xs: '100%', sm: 480 },
                    bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                },
            }}
        >
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <Box
                    sx={{
                        p: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
                    }}
                >
                    <Box>
                        <Typography variant="h6" fontWeight={700}>
                            Invoice Details
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                            {invoice.invoiceNumber}
                        </Typography>
                    </Box>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            color: isDarkMode ? '#A3A3A3' : '#525252',
                            '&:hover': {
                                bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Content */}
                <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
                    {/* Status & Total */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                        <Chip
                            label={invoice.status}
                            sx={{
                                bgcolor: statusColors[invoice.status].bg,
                                color: statusColors[invoice.status].text,
                                fontWeight: 600,
                                borderRadius: 1,
                            }}
                        />
                        <Typography variant="h5" fontWeight={700}>
                            {formatCurrency(invoice.total)}
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Dates */}
                    <Box sx={{ mb: 3 }}>
                        <Typography
                            variant="overline"
                            sx={{
                                color: isDarkMode ? '#A3A3A3' : '#737373',
                                fontWeight: 600,
                                letterSpacing: 1,
                                mb: 2,
                                display: 'block',
                            }}
                        >
                            Dates
                        </Typography>
                        <Stack spacing={1.5}>
                            <InfoRow
                                icon={<CalendarIcon sx={{ fontSize: 18, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Issue Date"
                                value={formatDate(invoice.issueDate)}
                            />
                            <InfoRow
                                icon={<CalendarIcon sx={{ fontSize: 18, color: invoice.status === 'Overdue' ? '#EF4444' : (isDarkMode ? '#A3A3A3' : '#525252') }} />}
                                label="Due Date"
                                value={
                                    <Typography
                                        component="span"
                                        sx={{ color: invoice.status === 'Overdue' ? 'error.main' : 'inherit', fontWeight: invoice.status === 'Overdue' ? 600 : 500 }}
                                    >
                                        {formatDate(invoice.dueDate)}
                                    </Typography>
                                }
                            />
                            {invoice.paidDate && (
                                <InfoRow
                                    icon={<ReceiptIcon sx={{ fontSize: 18, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                    label="Paid Date"
                                    value={formatDate(invoice.paidDate)}
                                />
                            )}
                        </Stack>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Customer Info */}
                    <Box sx={{ mb: 3 }}>
                        <Typography
                            variant="overline"
                            sx={{
                                color: isDarkMode ? '#A3A3A3' : '#737373',
                                fontWeight: 600,
                                letterSpacing: 1,
                                mb: 2,
                                display: 'block',
                            }}
                        >
                            Bill To
                        </Typography>
                        <Stack spacing={1.5}>
                            <InfoRow
                                icon={<BusinessIcon sx={{ fontSize: 18, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Company"
                                value={invoice.customer.name}
                            />
                            <InfoRow
                                icon={<EmailIcon sx={{ fontSize: 18, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Email"
                                value={invoice.customer.email}
                            />
                            <InfoRow
                                icon={<LocationIcon sx={{ fontSize: 18, color: isDarkMode ? '#A3A3A3' : '#525252' }} />}
                                label="Address"
                                value={
                                    <>
                                        {invoice.customer.address.street}<br />
                                        {invoice.customer.address.city}, {invoice.customer.address.state} {invoice.customer.address.zipCode}<br />
                                        {invoice.customer.address.country}
                                    </>
                                }
                            />
                        </Stack>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Line Items */}
                    <Box sx={{ mb: 3 }}>
                        <Typography
                            variant="overline"
                            sx={{
                                color: isDarkMode ? '#A3A3A3' : '#737373',
                                fontWeight: 600,
                                letterSpacing: 1,
                                mb: 2,
                                display: 'block',
                            }}
                        >
                            Line Items ({invoice.items.length})
                        </Typography>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 600, borderColor: isDarkMode ? '#404040' : '#E5E5E5' }}>Description</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 600, borderColor: isDarkMode ? '#404040' : '#E5E5E5' }}>Qty</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 600, borderColor: isDarkMode ? '#404040' : '#E5E5E5' }}>Rate</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 600, borderColor: isDarkMode ? '#404040' : '#E5E5E5' }}>Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {invoice.items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell sx={{ borderColor: isDarkMode ? '#404040' : '#E5E5E5' }}>
                                            <Typography variant="body2" fontWeight={500}>{item.description}</Typography>
                                        </TableCell>
                                        <TableCell align="center" sx={{ borderColor: isDarkMode ? '#404040' : '#E5E5E5' }}>{item.quantity}</TableCell>
                                        <TableCell align="right" sx={{ borderColor: isDarkMode ? '#404040' : '#E5E5E5' }}>{formatCurrency(item.rate)}</TableCell>
                                        <TableCell align="right" sx={{ borderColor: isDarkMode ? '#404040' : '#E5E5E5', fontWeight: 500 }}>
                                            {formatCurrency(item.amount)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>

                    {/* Totals */}
                    <Box
                        sx={{
                            p: 2,
                            borderRadius: 1,
                            bgcolor: isDarkMode ? '#262626' : '#F5F5F5',
                        }}
                    >
                        <Stack spacing={1}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" color="text.secondary">Subtotal</Typography>
                                <Typography variant="body2">{formatCurrency(invoice.subtotal)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" color="text.secondary">Tax (8%)</Typography>
                                <Typography variant="body2">{formatCurrency(invoice.tax)}</Typography>
                            </Box>
                            <Divider />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body1" fontWeight={700}>Total</Typography>
                                <Typography variant="body1" fontWeight={700}>{formatCurrency(invoice.total)}</Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Drawer>
    );
}
