import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Typography,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    IconButton,
    Chip,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { neutral } from '../../theme';

interface ActivityItem {
    id: string;
    user: {
        name: string;
        avatar?: string;
        initials?: string;
    };
    action: string;
    target?: string;
    time: string;
    type?: 'success' | 'warning' | 'info' | 'error';
}

interface ActivityListProps {
    title?: string;
    activities: ActivityItem[];
}

export function ActivityList({ title = 'Recent Activity', activities }: ActivityListProps) {
    return (
        <Card sx={{ height: '100%' }}>
            <CardHeader
                title={
                    <Typography component="h2" variant="h6" sx={{ fontWeight: 600 }}>
                        {title}
                    </Typography>
                }
                action={
                    <IconButton size="small" aria-label={`More options for ${title}`}>
                        <MoreVert />
                    </IconButton>
                }
            />
            <CardContent sx={{ pt: 0 }}>
                <List disablePadding>
                    {activities.map((activity, index) => (
                        <ListItem
                            key={activity.id}
                            alignItems="flex-start"
                            sx={{
                                px: 0,
                                borderBottom: index < activities.length - 1 ? `1px solid ${neutral[200]}` : 'none',
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar
                                    src={activity.user.avatar}
                                    sx={{
                                        bgcolor: neutral[800],
                                        color: neutral[50],
                                        width: 40,
                                        height: 40,
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    {activity.user.initials || activity.user.name.charAt(0)}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                slotProps={{
                                    primary: { component: 'div' },
                                    secondary: { component: 'div' },
                                }}
                                primary={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {activity.user.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {activity.action}
                                        </Typography>
                                        {activity.target && (
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {activity.target}
                                            </Typography>
                                        )}
                                    </Box>
                                }
                                secondary={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                        <Typography variant="caption" color="text.secondary">
                                            {activity.time}
                                        </Typography>
                                        {activity.type && (
                                            <Chip
                                                label={activity.type}
                                                size="small"
                                                sx={{
                                                    height: 20,
                                                    fontSize: '0.625rem',
                                                    bgcolor: neutral[200],
                                                    color: neutral[700],
                                                }}
                                            />
                                        )}
                                    </Box>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}
