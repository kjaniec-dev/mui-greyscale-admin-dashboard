import { lazy, Suspense, type ComponentType } from 'react';
import type { DataGridProps } from '@mui/x-data-grid';
import { TableSkeleton } from '../common';

const LazyMuiDataGrid = lazy(async () => {
    const module = await import('@mui/x-data-grid');

    return {
        default: module.DataGrid as unknown as ComponentType<DataGridProps>,
    };
});

interface LazyDataGridProps extends DataGridProps {
    skeletonRows?: number;
    skeletonColumns?: number;
}

export function LazyDataGrid({
    skeletonRows = 8,
    skeletonColumns,
    ...props
}: LazyDataGridProps) {
    const columnCount = Math.max(skeletonColumns ?? props.columns.length, 1);

    return (
        <Suspense
            fallback={
                <TableSkeleton
                    rows={skeletonRows}
                    columns={columnCount}
                    hasCheckbox={Boolean(props.checkboxSelection)}
                />
            }
        >
            <LazyMuiDataGrid {...props} />
        </Suspense>
    );
}
