import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Modal, ModalDialog } from "@mui/joy";
import PatientSelect from "./../PatientSelect";
import ServiceProcedureSelect from "./../AddTreatment/ServiceProcedureSelect";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  createAppointment,
  getAppointmentDuration,
  fetchAppointmentsByDate,
  fetchAppointments,
} from "../../store/fetchs/appointmentActions";
import Translation from "../../language.json";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../LanguageContext";
import { toast } from "react-toastify";
import { useLoading } from "../../LoadingContext";
import "../../assets/styles/User/AddAppointment/NewAppointment.css";
import { createTreatmentFailure } from "../../store/reducers/treatmentReducer";

const NewAppointment = ({ open, handleClose }) => {
  const { language } = useContext(LanguageContext);
  const newAppointmentDictionary = Translation[language].newAppointment;

  const { setLoading } = useLoading();
  const dispatch = useDispatch();
  const appointmentsByDate = useSelector(
    (state) => state.appointment.appointmentsByDate
  );
  const [patientId, setPatientId] = useState(null);
  const [serviceId, setServiceId] = useState(null);
  const [hospitalName, setHospitalName] = useState("");
  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState("");
  const [appeal, setAppeal] = useState("");
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

  const handleSetAppointment = () => {
    if (!patientId) {
      toast.error(newAppointmentDictionary.errors.patientRequired);
      return;
    }
    if (!serviceId) {
      toast.error(newAppointmentDictionary.errors.serviceRequired);
      return;
    }
    if (!hospitalName) {
      toast.error(newAppointmentDictionary.errors.hospitalRequired);
      return;
    }
    if (!date) {
      toast.error(newAppointmentDictionary.errors.dateRequired);
      return;
    }
    if (!time) {
      toast.error(newAppointmentDictionary.errors.timeRequired);
      return;
    }
    if (!appeal) {
      toast.error(newAppointmentDictionary.errors.appealRequired);
      return;
    }

    const dateString = dayjs(date).format("YYYY-MM-DD");
    const timeString = `${time}:00`;
    const appointmentData = {
      patientId: patientId.value,
      serviceId: serviceId.value,
      hospitalName,
      date: dateString,
      time: timeString,
      appeal: parseInt(appeal),
    };

    setLoading(true);
    dispatch(createAppointment(appointmentData))
      .then(() => {
        toast.success("Appointment created successfully");
        dispatch(fetchAppointments(1, 10));
        setLoading(false);
        navigate("/user/appointments");
      })
      .catch((err) => {
        dispatch(createTreatmentFailure(err.message));
        toast.error(err.message || "Error creating appointment");
        setLoading(false);
      });
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="new-appointment-title"
      className="new-appointment-modal-container"
    >
      <ModalDialog variant="plain">
        <div className="new-appointment-modal">
          <h2 id="new-appointment-title" className="modal-title">
            {newAppointmentDictionary.title}
          </h2>
          <form className="new-appointment-form">
            <FormControl
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
            >
              <PatientSelect
                selectedPatient={patientId}
                setSelectedPatient={setPatientId}
              />
            </FormControl>
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
            <label>{newAppointmentDictionary.hospitalLabel}</label>
            <TextField
              placeholder={newAppointmentDictionary.hospitalLabel}
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
                  onChange={(newValue) => setDate(dayjs(newValue))}
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
              <InputLabel>{newAppointmentDictionary.timeLabel}</InputLabel>
              <Select
                label={newAppointmentDictionary.timeLabel}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                <MenuItem value="">
                  <em>{newAppointmentDictionary.notSelected}</em>
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
              <InputLabel>{newAppointmentDictionary.appealLabel}</InputLabel>
              <Select
                label={newAppointmentDictionary.appealLabel}
                value={appeal}
                onChange={(e) => setAppeal(e.target.value)}
              >
                <MenuItem value="">
                  <em>{newAppointmentDictionary.notSelected}</em>
                </MenuItem>
                <MenuItem value="0">
                  {newAppointmentDictionary.socialMedia}
                </MenuItem>
                <MenuItem value="1">
                  {newAppointmentDictionary.doctorReferral}
                </MenuItem>
                <MenuItem value="2">
                  {newAppointmentDictionary.clinicReferral}
                </MenuItem>
                <MenuItem value="3">
                  {newAppointmentDictionary.personal}
                </MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              className="app-theme-color"
              onClick={handleSetAppointment}
            >
              {newAppointmentDictionary.addButton}
            </Button>
          </form>
        </div>
      </ModalDialog>
    </Modal>
  );
};

export default NewAppointment;
