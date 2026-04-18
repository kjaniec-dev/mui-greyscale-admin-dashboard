import { Box, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface DetailInfoRowProps {
    icon: ReactNode;
    label: string;
    value: ReactNode;
    iconBoxSize?: number;
    iconContainerSx?: Record<string, unknown>;
}

export function DetailInfoRow({
    icon,
    label,
    value,
    iconBoxSize = 40,
    iconContainerSx,
}: DetailInfoRowProps) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
                sx={{
                    width: iconBoxSize,
                    height: iconBoxSize,
                    borderRadius: 1,
                    bgcolor: 'action.hover',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...iconContainerSx,
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
}
