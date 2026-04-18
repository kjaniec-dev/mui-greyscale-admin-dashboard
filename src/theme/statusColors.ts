/**
 * Centralized color system for the greyscale dashboard.
 *
 * RULE: Color is only permitted in:
 *   1. Status chips / badges / labels
 *   2. Charts / data visualization
 *   3. Online/offline indicators
 *   4. System toasts / alerts
 *
 * Everything else MUST use the neutral (greyscale) palette from theme.ts
 */

// ---------------------------------------------------------------------------
// Status Palette — for chips, badges, inline status labels
// ---------------------------------------------------------------------------

export const statusPalette = {
  success: {
    light: '#16A34A',
    dark: '#4ADE80',
    bg: { light: '#F0FDF4', dark: 'rgba(74, 222, 128, 0.10)' },
  },
  warning: {
    light: '#D97706',
    dark: '#FBBF24',
    bg: { light: '#FFFBEB', dark: 'rgba(251, 191, 36, 0.10)' },
  },
  error: {
    light: '#DC2626',
    dark: '#F87171',
    bg: { light: '#FEF2F2', dark: 'rgba(248, 113, 113, 0.10)' },
  },
  info: {
    light: '#2563EB',
    dark: '#60A5FA',
    bg: { light: '#EFF6FF', dark: 'rgba(96, 165, 250, 0.10)' },
  },
  purple: {
    light: '#7C3AED',
    dark: '#A78BFA',
    bg: { light: '#F5F3FF', dark: 'rgba(167, 139, 250, 0.10)' },
  },
  cyan: {
    light: '#0891B2',
    dark: '#22D3EE',
    bg: { light: '#ECFEFF', dark: 'rgba(34, 211, 238, 0.10)' },
  },
} as const;

export type StatusKey = keyof typeof statusPalette;

// ---------------------------------------------------------------------------
// Chart Palette — for data‑visualization series
// ---------------------------------------------------------------------------

export const chartPalette = {
  light: ['#2563EB', '#16A34A', '#D97706', '#DC2626', '#7C3AED', '#0891B2'],
  dark: ['#60A5FA', '#4ADE80', '#FBBF24', '#F87171', '#A78BFA', '#22D3EE'],
} as const;

// ---------------------------------------------------------------------------
// Online indicator
// ---------------------------------------------------------------------------

export const onlineColor = '#22C55E';

// ---------------------------------------------------------------------------
// Notification‑type colors (these are badge‑level, so color is allowed)
// ---------------------------------------------------------------------------

export const notificationTypeColors: Record<string, { light: string; dark: string }> = {
  order: { light: '#2563EB', dark: '#60A5FA' },
  user: { light: '#7C3AED', dark: '#A78BFA' },
  system: { light: '#525252', dark: '#A3A3A3' },
  message: { light: '#16A34A', dark: '#4ADE80' },
  payment: { light: '#D97706', dark: '#FBBF24' },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Common status → StatusKey mapping. Case‑insensitive. */
const STATUS_MAP: Record<string, StatusKey> = {
  // success‑family
  active: 'success',
  completed: 'success',
  approved: 'success',
  paid: 'success',
  published: 'success',
  delivered: 'success',
  done: 'success',
  resolved: 'success',
  live: 'success',
  success: 'success',

  // warning‑family
  pending: 'warning',
  'past due': 'error',
  scheduled: 'warning',
  paused: 'warning',
  maintenance: 'warning',
  draft: 'warning',
  warning: 'warning',
  overdue: 'warning',

  // error‑family
  failed: 'error',
  rejected: 'error',
  cancelled: 'error',
  expired: 'error',
  error: 'error',
  archived: 'error',
  inactive: 'error',

  // info‑family
  processing: 'info',
  'in progress': 'info',
  filed: 'info',
  shipped: 'info',
  info: 'info',
  new: 'info',

  // purple
  refunded: 'purple',
  test: 'purple',
  sandbox: 'purple',
};

export function getStatusKey(status: string): StatusKey {
  return STATUS_MAP[status.toLowerCase()] ?? 'info';
}

export function getToneColor(
  tone: StatusKey,
  isDark: boolean,
): { text: string; bg: string; solid: string } {
  const palette = statusPalette[tone];
  return {
    text: isDark ? palette.dark : palette.light,
    bg: isDark ? palette.bg.dark : palette.bg.light,
    solid: isDark ? palette.dark : palette.light,
  };
}

export function getProgressColor(
  tone: Extract<StatusKey, 'success' | 'warning' | 'error' | 'info'>,
  isDark: boolean,
): string {
  return isDark ? statusPalette[tone].dark : statusPalette[tone].light;
}

export function getNotificationColor(type: string, isDark: boolean): string {
  const colors = notificationTypeColors[type] ?? notificationTypeColors.system;
  return isDark ? colors.dark : colors.light;
}

/**
 * Get the foreground + background colors for a status string.
 *
 * @example
 * const { text, bg } = getStatusColor('Completed', isDarkMode);
 * <Chip sx={{ color: text, bgcolor: bg }} />
 */
export function getStatusColor(
  status: string,
  isDark: boolean,
): { text: string; bg: string } {
  const { text, bg } = getToneColor(getStatusKey(status), isDark);
  return { text, bg };
}

/**
 * Get a solid background color for a status (for filled chips).
 * Returns { bg, text } where text is always near‑white or near‑black.
 */
export function getStatusSolid(
  status: string,
  isDark: boolean,
): { bg: string; text: string } {
  const { solid } = getToneColor(getStatusKey(status), isDark);
  return {
    bg: solid,
    text: isDark ? '#171717' : '#FAFAFA',
  };
}

/**
 * Get the chart color array for the current theme mode.
 */
export function getChartColors(isDark: boolean): readonly string[] {
  return isDark ? chartPalette.dark : chartPalette.light;
}
