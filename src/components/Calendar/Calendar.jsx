import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAppointmentCalendar } from "../../store/fetchs/appointmentActions";
import "../../assets/styles/User/Calendar/Calendar.css";

const Calendar = () => {
  const dispatch = useDispatch();
  const appointments = useSelector(
    (state) => state.appointment.allAppointmentCalendar
  );
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    dispatch(fetchAllAppointmentCalendar());
  }, [dispatch]);

  useEffect(() => {
    if (appointments) {
      const formattedEvents = appointments.map((appointment) => ({
        title: appointment.title,
        date: appointment.date,
      }));
      setEvents(formattedEvents);
    }
  }, [appointments]);

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="user-calendar-container user-box-shadow">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        // height={isMobile && "100%"}
        eventClick={handleEventClick}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek",
        }}
        eventTimeFormat={{
          // Customize the time format
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Appointment Details</DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <div>
              <p>
                <strong>Title:</strong> {selectedEvent.title}
              </p>
              <p>
                <strong>Date:</strong> {selectedEvent.start.toDateString()}
              </p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Calendar;
