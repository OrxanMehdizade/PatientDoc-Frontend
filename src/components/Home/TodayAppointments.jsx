import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  IconButton,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import emptyImage from "../../assets/images/sad_emoji.png";
import "../../assets/styles/User/Home/TodayAppointments.css";
import { LanguageContext } from "../../LanguageContext";
import Translation from "../../language.json";
import {
  cancelAppointment,
  markAppointmentAsFinished,
} from "../../store/fetchs/appointmentActions";

const statusColors = {
  Finished: "green",
  Pending: "orange",
  Cancelled: "red",
};

let TodayAppointments = () => {
  const { language } = useContext(LanguageContext);
  const todayAppointmentsDictionary = Translation[language].todayAppointments;
  const dispatch = useDispatch();

  const appointments = useSelector(
    (state) => state.appointment.appointmentsByDate
  );

  const handleMarkAsFinished = (id) => {
    dispatch(markAppointmentAsFinished(id));
    window.location.reload();
  };

  const handleCancel = (id) => {
    dispatch(cancelAppointment(id));
    window.location.reload();
  };

  return (
    <>
      <h3 style={{ marginTop: 0 }}>{todayAppointmentsDictionary.header}</h3>
      {appointments.length === 0 ? (
        <div className="today-appointment-container">
          <img src={emptyImage} alt="no data" />
          <p>{todayAppointmentsDictionary.noData}</p>
        </div>
      ) : (
        <TableContainer>
          <Table aria-label="appointments table">
            <TableBody>
              {appointments.map((appointment, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{appointment.patientFullName}</TableCell>
                  <TableCell>{appointment.phoneNumber}</TableCell>
                  <TableCell>{appointment.serviceName}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell
                    style={{ color: statusColors[appointment.status] }}
                  >
                    {appointment.status === "Pending"
                      ? todayAppointmentsDictionary.statuses.pending
                      : appointment.status === "Finished"
                      ? todayAppointmentsDictionary.statuses.finished
                      : todayAppointmentsDictionary.statuses.cancelled}
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default TodayAppointments;
