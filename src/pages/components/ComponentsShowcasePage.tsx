import { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    ToggleButtonGroup,
    ToggleButton,
} from '@mui/material';
import {
    TableSkeleton,
    CardGridSkeleton,
    StatGridSkeleton,
    ChartSkeleton,
    ListSkeleton,
    FormSkeleton,
    EmptyState,
    CardEmptyState,
} from '../../components/common';
import { Add as AddIcon, Refresh as RefreshIcon } from '@mui/icons-material';

export function ComponentsShowcasePage() {
    const [activeSection, setActiveSection] = useState<'skeletons' | 'empty'>('skeletons');

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                    UI Components Showcase
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Loading skeletons and empty state components
                </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
                <ToggleButtonGroup
                    value={activeSection}
                    exclusive
                    onChange={(_, value) => value && setActiveSection(value)}
                    size="small"
                >
                    <ToggleButton value="skeletons">Loading Skeletons</ToggleButton>
                    <ToggleButton value="empty">Empty States</ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {activeSection === 'skeletons' && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {/* Stats Grid */}
                    <Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            Stat Cards
                        </Typography>
                        <StatGridSkeleton count={4} />
                    </Box>

                    {/* Table */}
                    <Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            Table
                        </Typography>
                        <TableSkeleton rows={5} columns={5} />
                    </Box>

                    {/* Charts */}
                    <Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            Charts
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 8 }}>
                                <ChartSkeleton height={280} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <ChartSkeleton height={280} />
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Card Grid */}
                    <Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            Card Grid
                        </Typography>
                        <CardGridSkeleton count={6} columns={3} />
                    </Box>

                    {/* List & Form */}
                    <Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            List & Form
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Paper sx={{ p: 2 }}>
                                    <ListSkeleton rows={5} />
                                </Paper>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormSkeleton fields={4} />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            )}

            {activeSection === 'empty' && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {/* No Data */}
                    <Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            No Data
                        </Typography>
                        <Paper>
                            <EmptyState
                                type="no-data"
                                action={{
                                    label: 'Add New Item',
                                    onClick: () => console.log('Add clicked'),
                                    startIcon: <AddIcon />,
                                }}
                            />
                        </Paper>
                    </Box>

                    {/* No Results */}
                    <Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            No Search Results
                        </Typography>
                        <Paper>
                            <EmptyState type="no-results" />
                        </Paper>
                    </Box>

                    {/* Error State */}
                    <Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            Error State
                        </Typography>
                        <Paper>
                            <EmptyState
                                type="error"
                                action={{
                                    label: 'Try Again',
                                    onClick: () => console.log('Retry clicked'),
                                    startIcon: <RefreshIcon />,
                                }}
                            />
                        </Paper>
                    </Box>

                    {/* Card Empty State */}
                    <Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            Card Empty State (Dashed Border)
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <CardEmptyState
                                    type="no-data"
                                    compact
                                    title="No products"
                                    description="Add your first product"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <CardEmptyState
                                    type="no-filter"
                                    compact
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <CardEmptyState
                                    type="no-results"
                                    compact
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Compact Mode */}
                    <Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            Compact Mode
                        </Typography>
                        <Paper>
                            <EmptyState
                                type="no-data"
                                compact
                                title="No notifications"
                                description="You're all caught up!"
                            />
                        </Paper>
                    </Box>
                </Box>
            )}
        </Box>
    );
}
