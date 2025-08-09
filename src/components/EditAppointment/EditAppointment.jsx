import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { Modal, ModalDialog } from "@mui/joy";
import ServiceProcedureSelect from "./../AddTreatment/ServiceProcedureSelect";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateAppointment,
  deleteAppointment,
  getAppointmentDuration,
  fetchAppointmentsByDate,
} from "../../store/fetchs/appointmentActions"; // Adjust the import path
import Translation from "../../language.json";
import { LanguageContext } from "../../LanguageContext";
import "../../assets/styles/User/EditAppointment/EditAppointment.css"; // Adjust the path as needed

const EditAppointment = ({
  open,
  handleClose,
  appointment,
  refreshAppointments,
}) => {
  const { language } = useContext(LanguageContext);
  const editAppointmentDictionary = Translation[language].editAppointment;

  const dispatch = useDispatch();
  const appointmentsByDate = useSelector(
    (state) => state.appointment.appointmentsByDate
  );
  const [patientId, setPatientId] = useState(appointment?.patientId || null);
  const [serviceId, setServiceId] = useState(appointment?.serviceId || null);
  const [hospitalName, setHospitalName] = useState(
    appointment?.hospitalName || ""
  );
  const [date, setDate] = useState(
    appointment?.date ? dayjs(appointment.date) : null
  );
  const [time, setTime] = useState(appointment?.time || "");
  const [appeal, setAppeal] = useState(appointment?.appeal || "");
  const [status, setStatus] = useState(appointment?.status || "Pending");
  const [timeSlots, setTimeSlots] = useState([]);
  const [reservedSlots, setReservedSlots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      const fetchDuration = async () => {
        const duration = await dispatch(getAppointmentDuration());
        generateTimeSlots(duration.replace(/"/g, ""));
      };
      fetchDuration();
    }
  }, [open, dispatch]);

  useEffect(() => {
    if (date) {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      dispatch(fetchAppointmentsByDate(formattedDate));
    }
  }, [date, dispatch]);

  useEffect(() => {
    if (appointmentsByDate) {
      const reserved = appointmentsByDate.map(
        (appointment) => appointment.time
      );
      setReservedSlots(reserved);
    }
  }, [appointmentsByDate]);

  useEffect(() => {
    if (appointment) {
      setPatientId(appointment.patientId);
      setServiceId(appointment.serviceId);
      setHospitalName(appointment.hospitalName);
      setDate(appointment.date ? dayjs(appointment.date) : null);
      setTime(appointment.time.slice(0, 5));
      setAppeal(appointment.appeal);
      setStatus(appointment.status);
    }
  }, [appointment]);

  const generateTimeSlots = (duration) => {
    let [hours, minutes] = duration.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;
    const slots = [];
    let currentTime = dayjs().hour(8).minute(0);
    const endTime = dayjs().hour(22).minute(0);

    while (currentTime.isBefore(endTime)) {
      slots.push(currentTime.format("HH:mm"));
      currentTime = currentTime.add(totalMinutes, "minute");
    }

    setTimeSlots(slots);
  };

  const handleUpdateAppointment = () => {
    const dateString = dayjs(date).format("YYYY-MM-DD");
    const timeString = `${time}:00`;
    const appointmentData = {
      patientId,
      serviceId,
      hospitalName,
      date: dateString,
      time: timeString,
      appeal: parseInt(appeal),
      status,
    };
    dispatch(updateAppointment(appointment.id, appointmentData)).then(() => {
      refreshAppointments();
    });
    handleClose();
    navigate("/user/appointments");
  };

  const handleDeleteAppointment = () => {
    dispatch(deleteAppointment(appointment.id)).then(() => {
      refreshAppointments();
    });
    handleClose();
    navigate("/user/appointments");
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-appointment-title"
      className="edit-appointment-modal-container"
    >
      <ModalDialog variant="plain">
        <div className="edit-appointment-modal">
          <h2 id="edit-appointment-title" className="modal-title">
            {editAppointmentDictionary.title}
          </h2>
          <form className="edit-appointment-form">
            <FormControl
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
            >
              <ServiceProcedureSelect
                selectedService={serviceId}
                setSelectedService={setServiceId}
              />
            </FormControl>
            <label>{editAppointmentDictionary.hospitalLabel}</label>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoItem>
                <DatePicker
                  fullWidth
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                  minDate={dayjs()}
                />
              </DemoItem>
            </LocalizationProvider>
            <FormControl
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
              disabled={!date}
            >
              <InputLabel>{editAppointmentDictionary.timeLabel}</InputLabel>
              <Select
                label={editAppointmentDictionary.timeLabel}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                <MenuItem value="">
                  <em>{editAppointmentDictionary.notSelected}</em>
                </MenuItem>
                {timeSlots.map((slot, index) => (
                  <MenuItem
                    key={index}
                    value={slot}
                    disabled={reservedSlots.includes(slot)}
                  >
                    {slot}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
            >
              <InputLabel>{editAppointmentDictionary.appealLabel}</InputLabel>
              <Select
                label={editAppointmentDictionary.appealLabel}
                value={appeal}
                onChange={(e) => setAppeal(e.target.value)}
              >
                <MenuItem value="">
                  <em>{editAppointmentDictionary.notSelected}</em>
                </MenuItem>
                <MenuItem value="0">
                  {editAppointmentDictionary.socialMedia}
                </MenuItem>
                <MenuItem value="1">
                  {editAppointmentDictionary.doctorReferral}
                </MenuItem>
                <MenuItem value="2">
                  {editAppointmentDictionary.clinicReferral}
                </MenuItem>
                <MenuItem value="3">
                  {editAppointmentDictionary.personal}
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
            >
              <InputLabel>{editAppointmentDictionary.status}</InputLabel>
              <Select
                label={editAppointmentDictionary.status}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="Pending">
                  {editAppointmentDictionary.pending}
                </MenuItem>
                <MenuItem value="Finished">
                  {editAppointmentDictionary.finished}
                </MenuItem>
                <MenuItem value="Cancelled">
                  {editAppointmentDictionary.cancelled}
                </MenuItem>
              </Select>
            </FormControl>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                variant="contained"
                color="primary"
                className="app-theme-color"
                onClick={handleUpdateAppointment}
              >
                {editAppointmentDictionary.updateButton}
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteAppointment}
              >
                {editAppointmentDictionary.deleteButton}
              </Button>
            </Box>
          </form>
        </div>
      </ModalDialog>
    </Modal>
  );
};

export default EditAppointment;
