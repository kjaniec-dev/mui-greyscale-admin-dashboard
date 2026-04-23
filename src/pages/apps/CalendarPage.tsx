import { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import type { DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControlLabel,
    Checkbox,
    Stack,
    useTheme,
    styled,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { mockEvents, eventColors, type CalendarEvent } from '../../data/mockEvents';

// Styled wrapper for FullCalendar with greyscale theme
const CalendarWrapper = styled(Box)(({ theme }) => {
    const isDark = theme.palette.mode === 'dark';
    return {
        '& .fc': {
            fontFamily: theme.typography.fontFamily,
        },
        '& .fc-toolbar-title': {
            fontSize: '1.25rem',
            fontWeight: 600,
        },
        '& .fc-button': {
            backgroundColor: isDark ? '#262626' : '#F5F5F5',
            borderColor: isDark ? '#404040' : '#E5E5E5',
            color: isDark ? '#E5E5E5' : '#171717',
            fontWeight: 500,
            textTransform: 'capitalize',
            '&:hover': {
                backgroundColor: isDark ? '#404040' : '#E5E5E5',
                borderColor: isDark ? '#525252' : '#D4D4D4',
            },
            '&:focus': {
                boxShadow: 'none',
            },
        },
        '& .fc-button-active': {
            backgroundColor: isDark ? '#525252' : '#171717',
            borderColor: isDark ? '#525252' : '#171717',
            color: '#FAFAFA',
            '&:hover': {
                backgroundColor: isDark ? '#404040' : '#262626',
            },
        },
        '& .fc-daygrid-day': {
            backgroundColor: isDark ? '#171717' : '#FFFFFF',
        },
        '& .fc-daygrid-day-number': {
            color: isDark ? '#E5E5E5' : '#171717',
            fontWeight: 500,
        },
        '& .fc-day-today': {
            backgroundColor: isDark ? '#262626 !important' : '#F5F5F5 !important',
        },
        '& .fc-daygrid-day-events': {
            padding: '2px',
        },
        '& .fc-event': {
            borderRadius: '4px',
            border: 'none',
            padding: '2px 4px',
            fontSize: '0.75rem',
            fontWeight: 500,
            cursor: 'pointer',
        },
        '& .fc-col-header-cell': {
            backgroundColor: isDark ? '#262626' : '#FAFAFA',
            padding: '8px 0',
        },
        '& .fc-col-header-cell-cushion': {
            color: isDark ? '#A3A3A3' : '#525252',
            fontWeight: 600,
            textTransform: 'uppercase',
            fontSize: '0.75rem',
        },
        '& .fc-scrollgrid': {
            borderColor: isDark ? '#404040' : '#E5E5E5',
        },
        '& .fc-scrollgrid td, & .fc-scrollgrid th': {
            borderColor: isDark ? '#404040' : '#E5E5E5',
        },
        '& .fc-timegrid-slot': {
            height: '48px',
        },
        '& .fc-timegrid-slot-label-cushion': {
            color: isDark ? '#A3A3A3' : '#737373',
            fontSize: '0.75rem',
        },
        '& .fc-timegrid-col': {
            backgroundColor: isDark ? '#171717' : '#FFFFFF',
        },
    };
});

interface EventFormData {
    title: string;
    start: string;
    end: string;
    allDay: boolean;
    color: string;
}

export function CalendarPage() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const calendarRef = useRef<FullCalendar>(null);

    const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<EventApi | null>(null);
    const [formData, setFormData] = useState<EventFormData>({
        title: '',
        start: '',
        end: '',
        allDay: false,
        color: eventColors[0],
    });

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        const startDate = selectInfo.start.toISOString().slice(0, 16);
        const endDate = selectInfo.end.toISOString().slice(0, 16);

        setFormData({
            title: '',
            start: startDate,
            end: endDate,
            allDay: selectInfo.allDay,
            color: eventColors[Math.floor(Math.random() * eventColors.length)],
        });
        setSelectedEvent(null);
        setDialogOpen(true);
    };

    const handleEventClick = (clickInfo: EventClickArg) => {
        const event = clickInfo.event;
        setFormData({
            title: event.title,
            start: event.start?.toISOString().slice(0, 16) || '',
            end: event.end?.toISOString().slice(0, 16) || '',
            allDay: event.allDay,
            color: event.backgroundColor || eventColors[0],
        });
        setSelectedEvent(event);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedEvent(null);
        setFormData({
            title: '',
            start: '',
            end: '',
            allDay: false,
            color: eventColors[0],
        });
    };

    const handleSaveEvent = () => {
        if (!formData.title.trim()) return;

        if (selectedEvent) {
            // Update existing event
            selectedEvent.setProp('title', formData.title);
            selectedEvent.setStart(formData.start);
            selectedEvent.setEnd(formData.end);
            selectedEvent.setAllDay(formData.allDay);
            selectedEvent.setProp('backgroundColor', formData.color);
        } else {
            // Add new event
            const newEvent: CalendarEvent = {
                id: `event-${Date.now()}`,
                title: formData.title,
                start: new Date(formData.start),
                end: formData.end ? new Date(formData.end) : undefined,
                allDay: formData.allDay,
                color: formData.color,
            };
            setEvents([...events, newEvent]);
        }

        handleDialogClose();
    };

    const handleDeleteEvent = () => {
        if (selectedEvent) {
            selectedEvent.remove();
            setEvents(events.filter((e) => e.id !== selectedEvent.id));
        }
        handleDialogClose();
    };

    const handleAddEvent = () => {
        const now = new Date();
        const startDate = now.toISOString().slice(0, 16);
        now.setHours(now.getHours() + 1);
        const endDate = now.toISOString().slice(0, 16);

        setFormData({
            title: '',
            start: startDate,
            end: endDate,
            allDay: false,
            color: eventColors[Math.floor(Math.random() * eventColors.length)],
        });
        setSelectedEvent(null);
        setDialogOpen(true);
    };

    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 0 }, justifyContent: 'space-between', alignItems: { xs: 'stretch', sm: 'flex-start' } }}>
                <Box>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                        Calendar
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Schedule and manage your events.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddEvent}
                    sx={{
                        bgcolor: '#171717',
                        color: '#FAFAFA',
                        '&:hover': {
                            bgcolor: '#262626',
                        },
                    }}
                >
                    Add Event
                </Button>
            </Box>

            {/* Calendar */}
            <CalendarWrapper
                sx={{
                    bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                    borderRadius: 2,
                    p: { xs: 1, sm: 2 },
                    border: `1px solid ${isDarkMode ? '#404040' : '#E5E5E5'}`,
                    overflowX: 'auto',
                }}
            >
                <Box sx={{ minWidth: { xs: 700, md: 'auto' } }}>
                    <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    events={events.map((event) => ({
                        id: event.id,
                        title: event.title,
                        start: event.start,
                        end: event.end,
                        allDay: event.allDay,
                        backgroundColor: event.color,
                        borderColor: event.color,
                    }))}
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    select={handleDateSelect}
                    eventClick={handleEventClick}
                    height="auto"
                    aspectRatio={1.8}
                />
                </Box>
            </CalendarWrapper>

            {/* Event Form Dialog */}
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                maxWidth="sm"
                fullWidth
                slotProps={{ paper: {
                    sx: {
                        bgcolor: isDarkMode ? '#171717' : '#FFFFFF',
                        borderRadius: 2,
                    },
                } }}
            >
                <DialogTitle sx={{ fontWeight: 600 }}>
                    {selectedEvent ? 'Edit Event' : 'Add Event'}
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={3} sx={{ mt: 1 }}>
                        <TextField
                            label="Event Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            fullWidth
                            autoFocus
                        />
                        <TextField
                            label="Start"
                            type="datetime-local"
                            value={formData.start}
                            onChange={(e) => setFormData({ ...formData, start: e.target.value })}
                            fullWidth
                            slotProps={{ inputLabel: { shrink: true } }}
                        />
                        <TextField
                            label="End"
                            type="datetime-local"
                            value={formData.end}
                            onChange={(e) => setFormData({ ...formData, end: e.target.value })}
                            fullWidth
                            slotProps={{ inputLabel: { shrink: true } }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.allDay}
                                    onChange={(e) => setFormData({ ...formData, allDay: e.target.checked })}
                                />
                            }
                            label="All day event"
                        />
                        <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                Event Color
                            </Typography>
                            <Stack direction="row" spacing={1}>
                                {eventColors.map((color) => (
                                    <Box
                                        key={color}
                                        onClick={() => setFormData({ ...formData, color })}
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: 1,
                                            bgcolor: color,
                                            cursor: 'pointer',
                                            border: formData.color === color ? '2px solid #FAFAFA' : 'none',
                                            outline: formData.color === color ? `2px solid ${color}` : 'none',
                                            transition: 'transform 0.1s',
                                            '&:hover': {
                                                transform: 'scale(1.1)',
                                            },
                                        }}
                                    />
                                ))}
                            </Stack>
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2, pt: 0 }}>
                    {selectedEvent && (
                        <Button onClick={handleDeleteEvent} color="error" sx={{ mr: 'auto' }}>
                            Delete
                        </Button>
                    )}
                    <Button onClick={handleDialogClose} color="inherit">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSaveEvent}
                        variant="contained"
                        disabled={!formData.title.trim()}
                        sx={{
                            bgcolor: '#171717',
                            '&:hover': { bgcolor: '#262626' },
                        }}
                    >
                        {selectedEvent ? 'Save' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
