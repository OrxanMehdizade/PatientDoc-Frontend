import React, { useContext } from "react";
import "../../assets/styles/User/EditPatient/PatientAppointments.css";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import {
  cancelAppointment,
  markAppointmentAsFinished,
} from "../../store/fetchs/appointmentActions";
import { fetchPatientById } from "../../store/fetchs/patientActions";
import { LanguageContext } from "../../LanguageContext";
import Translation from "../../language.json";

const statusColors = {
  Finished: "green",
  Pending: "orange",
  Cancelled: "red",
};

const PatientAppointments = ({ patientId, appointments = [] }) => {
  const { language } = useContext(LanguageContext);

  const dispatch = useDispatch();
  const handleMarkAsFinished = (id) => {
    dispatch(markAppointmentAsFinished(id)).then(() =>
      dispatch(fetchPatientById(patientId))
    );
  };

  const handleCancel = (id) => {
    dispatch(cancelAppointment(id)).then(() =>
      dispatch(fetchPatientById(patientId))
    );
  };
  return (
    <div className="user-box-shadow edit-patient-appointments">
      <div className="user-appointment-header">
        <h2>{Translation[language].generalStatistics.appointments}</h2>
      </div>
      <TableContainer>
        <Table aria-label="appointments table">
          <TableBody>
            {appointments.map((appointment, index) => (
              <TableRow key={appointment.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{appointment.date.split("T")[0]}</TableCell>
                <TableCell>
                  {appointment.date.split("T")[1].slice(0, 5)}
                </TableCell>
                <TableCell style={{ color: statusColors[appointment.status] }}>
                  {appointment.status === "Pending"
                    ? Translation[language].todayAppointments.statuses.pending
                    : appointment.status === "Finished"
                    ? Translation[language].todayAppointments.statuses.finished
                    : Translation[language].todayAppointments.statuses
                        .cancelled}
                </TableCell>
                <TableCell>
                  {appointment.status === "Pending" && (
                    <>
                      <IconButton
                        color="primary"
                        onClick={() => handleMarkAsFinished(appointment.id)}
                      >
                        <CheckIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleCancel(appointment.id)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </>
                  )}
                  <IconButton color="default">
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PatientAppointments;
