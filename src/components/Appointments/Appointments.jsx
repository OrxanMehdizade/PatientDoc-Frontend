import React, { useState, useEffect, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Box,
  Pagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAppointments,
  markAppointmentAsFinished,
  cancelAppointment,
  fetchAppointmentById,
} from "../../store/fetchs/appointmentActions";
import EditAppointment from "../EditAppointment/EditAppointment";
import NewAppointment from "../AddAppointment/NewAppointment";
import Translation from "../../language.json";
import "../../assets/styles/User/Appointment/Appointments.css";
import { LanguageContext } from "../../LanguageContext";

const statusColors = {
  Finished: "green",
  Pending: "orange",
  Cancelled: "red",
};

const Appointments = () => {
  const { language } = useContext(LanguageContext);
  const appointmentsDictionary = Translation[language].appointments;

  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointment.appointments);
  const paginationMeta = useSelector(
    (state) => state.appointment.paginationMeta
  );
  const [page, setPage] = useState(1);
  const [openEdit, setOpenEdit] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [editableAppointment, setEditableAppointment] = useState(null);
  const appointment = useSelector((state) => state.appointment.appointment);

  useEffect(() => {
    if (appointment) {
      setEditableAppointment(appointment);
    }
  }, [appointment]);

  useEffect(() => {
    dispatch(fetchAppointments(page, 10));
  }, [dispatch, page]);

  const handleOpenNew = () => setOpenNew(true);
  const handleCloseNew = () => setOpenNew(false);

  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleEdit = async (id) => {
    await dispatch(fetchAppointmentById(id));
    handleOpenEdit();
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleMarkAsFinished = (id) => {
    dispatch(markAppointmentAsFinished(id)).then(() =>
      dispatch(fetchAppointments(page, 10))
    );
  };

  const handleCancel = (id) => {
    dispatch(cancelAppointment(id)).then(() =>
      dispatch(fetchAppointments(page, 10))
    );
  };

  const refreshAppointments = () => {
    dispatch(fetchAppointments(page, 10));
  };

  return (
    <div className="user-appointment-container user-box-shadow">
      <div className="user-appointment-header">
        <h2>{appointmentsDictionary.header}</h2>
        <Button
          variant="contained"
          className="app-theme-color"
          onClick={() => {
            setEditableAppointment(null);
            handleOpenNew();
          }}
        >
          {appointmentsDictionary.addAppointmentButton}
        </Button>
      </div>
      <div className="user-appointment-content">
        <TableContainer>
          <Table aria-label="appointments table">
            <TableHead>
              <TableRow>
                <TableCell className="user-table-header">#</TableCell>
                <TableCell className="user-table-header">{appointmentsDictionary.fullName}</TableCell>
                <TableCell className="user-table-header deactive">
                  {appointmentsDictionary.phone}
                </TableCell>
                <TableCell className="user-table-header deactive">
                  {appointmentsDictionary.service}
                </TableCell>
                <TableCell className="user-table-header">{appointmentsDictionary.date}</TableCell>
                <TableCell className="user-table-header">{appointmentsDictionary.time}</TableCell>
                <TableCell className="user-table-header deactive">
                  {appointmentsDictionary.hospital}
                </TableCell>
                <TableCell className="user-table-header">{appointmentsDictionary.status}</TableCell>
                <TableCell className="user-table-header">{appointmentsDictionary.action}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment, index) => (
                <TableRow key={appointment.id} className="user-appointment-row">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{appointment.patientName}</TableCell>
                  <TableCell className="deactive">
                    {appointment.phone}
                  </TableCell>
                  <TableCell className="deactive">
                    {appointment.service}
                  </TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell className="deactive">
                    {appointment.hospital}
                  </TableCell>
                  <TableCell
                    style={{ color: statusColors[appointment.status] }}
                  >
                    {appointment.status === "Pending"
                      ? appointmentsDictionary.statuses.pending
                      : appointment.status === "Finished"
                      ? appointmentsDictionary.statuses.finished
                      : appointmentsDictionary.statuses.cancelled}
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
                    <IconButton
                      color="default"
                      onClick={() => handleEdit(appointment.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Box
        display="flex"
        justifyContent="center"
        className="pagination-container"
      >
        <Pagination
          count={paginationMeta ? paginationMeta.totalPages : 1}
          page={page}
          onChange={handlePageChange}
          color="primary"
          className="app-theme-color"
        />
      </Box>
      <EditAppointment
        open={openEdit}
        handleClose={handleCloseEdit}
        appointment={editableAppointment}
        refreshAppointments={refreshAppointments}
      />
      <NewAppointment open={openNew} handleClose={handleCloseNew} />
    </div>
  );
};

export default Appointments;
