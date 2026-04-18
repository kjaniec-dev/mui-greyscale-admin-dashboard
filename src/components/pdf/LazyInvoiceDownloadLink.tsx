import { useState } from 'react';
import { Button } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import type { Invoice } from '../../data/mockInvoices';

interface LazyInvoiceDownloadLinkProps {
    invoice: Invoice;
}

export function LazyInvoiceDownloadLink({ invoice }: LazyInvoiceDownloadLinkProps) {
    const [isPreparing, setIsPreparing] = useState(false);

    const handleDownload = async () => {
        try {
            setIsPreparing(true);

            const [{ pdf }, { InvoicePDF }] = await Promise.all([
                import('@react-pdf/renderer'),
                import('./InvoicePDF'),
            ]);
            const blob = await pdf(<InvoicePDF invoice={invoice} />).toBlob();
            const url = URL.createObjectURL(blob);
            const anchor = document.createElement('a');

            anchor.href = url;
            anchor.download = `invoice-${invoice.invoiceNumber}.pdf`;
            anchor.click();

            window.setTimeout(() => URL.revokeObjectURL(url), 0);
        } catch (error) {
            console.error('Failed to prepare invoice PDF', error);
        } finally {
            setIsPreparing(false);
        }
    };

    return (
        <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            disabled={isPreparing}
            size="small"
            onClick={handleDownload}
        >
            {isPreparing ? 'Preparing...' : 'Download PDF'}
        </Button>
    );
}
