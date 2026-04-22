/**
 * Shared formatting utilities used across the dashboard.
 *
 * Consolidates the previously-duplicated getInitials, formatCurrency,
 * and formatDate helpers into a single module.
 */

/** Extract up to two initials from a full name. */
export function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

/** Format a number as USD currency. */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

/**
 * Format a number as USD currency with no decimals.
 * Useful for large estimated values.
 */
export function formatCurrencyCompact(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(amount);
}

/** Format a date as a human-readable string (date only). */
export function formatDate(date: Date | string | undefined | null, fallback = 'N/A'): string {
    if (!date) return fallback;
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

/** Format a date as a human-readable string with time. */
export function formatDateTime(date: Date | string | undefined | null, fallback = 'N/A'): string {
    if (!date) return fallback;
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}
