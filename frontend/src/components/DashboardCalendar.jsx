import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import elLocale from '@fullcalendar/core/locales/el';

/**
 * DashboardCalendar Component: Visualizes the institution's schedule.
 * It maps course schedules and pending/confirmed appointments into calendar events.
 */
export function DashboardCalendar({ courses, appointments }) {

    /** * Map Courses to Calendar Events.
     * Uses getGreekDayNumber to handle recurring weekly schedules.
     */
    const courseEvents = courses.map(course => ({
        title: `📚 ${course.title}`,
        daysOfWeek: [getGreekDayNumber(course.dayOfWeek)], // Recurring weekly events
        startTime: course.lessonTime + ':00',
        color: '#3b82f6', // Blue theme for academic courses
        extendedProps: { type: 'course', teacher: course.teacher?.fullName }
    }));

    /** * Map Appointments to Calendar Events.
     * Colors events based on confirmation status (Green for CONFIRMED, Orange for PENDING).
     */
    const appointmentEvents = appointments.map(app => ({
        title: `🤝 ${app.title}`,
        start: app.startDateTime,
        color: app.status === 'CONFIRMED' ? '#10b981' : '#f59e0b',
        extendedProps: { type: 'appointment', notes: app.notes }
    }));

    // Combine all sources into a single event array
    const allEvents = [...courseEvents, ...appointmentEvents];

    return (
        <div className="bg-white p-6 rounded-[32px] shadow-xl ring-1 ring-slate-100">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek" // Weekly view optimized for tutoring schedules
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                locale={elLocale} // Greek localization support
                events={allEvents}
                slotMinTime="08:00:00"
                slotMaxTime="22:00:00"
                allDaySlot={false}
                height="auto"
                eventClick={(info) => {
                    // Quick detail view on event interaction
                    alert(`${info.event.title}\n${info.event.extendedProps.notes || info.event.extendedProps.teacher || ''}`);
                }}
            />
        </div>
    );
}

/** * Helper: Converts Greek day strings to FullCalendar day numbers (0=Sunday, 1=Monday).
 * Essential for recurring event logic.
 */
function getGreekDayNumber(day) {
    const days = { "Κυριακή": 0, "Δευτέρα": 1, "Τρίτη": 2, "Τετάρτη": 3, "Πέμπτη": 4, "Παρασκευή": 5, "Σάββατο": 6 };
    return days[day] || 1;
}