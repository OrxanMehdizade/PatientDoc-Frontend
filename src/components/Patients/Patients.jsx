import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Pagination,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPatients,
  deletePatientById,
} from "../../store/fetchs/patientActions";
import { useLoading } from "../../LoadingContext";
import { useNavigate } from "react-router-dom";
import Translation from "../../language.json";
import { LanguageContext } from "./../../LanguageContext";
import "../../assets/styles/User/Patient/Patient.css";

const Patients = () => {
  const { language } = useContext(LanguageContext);
  const patientsDictionary = Translation[language].patients;
  const dispatch = useDispatch();
  const { setLoading } = useLoading();
  const { patients, paginationMeta } = useSelector((state) => state.patient);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchPatients(page, 10));
      setLoading(false);
    };
    fetchData();
  }, [dispatch, page, setLoading]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    await dispatch(deletePatientById(id));
    await dispatch(fetchPatients(page, 10)); // Refresh the patients list after deletion
    setLoading(false);
  };

  return (
    <div className="user-patient-container user-box-shadow">
      <div className="user-patient-header">
        <h2>{patientsDictionary.header}</h2>
        <Button
          variant="contained"
          className="app-theme-color"
          onClick={() => navigate("/user/add-patient")}
        >
          + {patientsDictionary.newPatient}
        </Button>
      </div>
      <div className="user-patient-content">
        <TableContainer>
          <Table aria-label="patients table">
            <TableHead>
              <TableRow>
                <TableCell className="user-table-header">#</TableCell>
                <TableCell className="user-table-header">
                  {patientsDictionary.fullName}
                </TableCell>
                <TableCell className="user-table-header">
                  {patientsDictionary.phone}
                </TableCell>
                <TableCell className="user-table-header deactive">
                  {patientsDictionary.gender}
                </TableCell>
                <TableCell className="user-table-header deactive">
                  {patientsDictionary.age}
                </TableCell>
                <TableCell className="user-table-header">
                  {patientsDictionary.action}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient, index) => (
                <TableRow key={index + 1} className="user-patient-row">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{patient.fullName}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell className="deactive">
                    {patient.gender === "Male"
                      ? patientsDictionary.male
                      : patientsDictionary.female}
                  </TableCell>
                  <TableCell className="deactive">{patient.age}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() =>
                        navigate(`/user/edit-patient/${patient.id}`)
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(patient.id)}
                    >
                      <DeleteRoundedIcon />
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
    </div>
  );
};

export default Patients;
