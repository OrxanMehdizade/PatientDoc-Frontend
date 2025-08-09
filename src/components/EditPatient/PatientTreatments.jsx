import React, { useContext } from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTreatmentById } from "../../store/fetchs/treatmentActions";
import { fetchPatientById } from "../../store/fetchs/patientActions";
import "../../assets/styles/User/EditPatient/PatientTreatments.css";
import { LanguageContext } from "../../LanguageContext";
import Translation from "../../language.json";

const PatientTreatments = ({ patientId, treatments = [] }) => {
  const { language } = useContext(LanguageContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    await dispatch(deleteTreatmentById(id));
    await dispatch(fetchPatientById(patientId));
  };
  return (
    <div className="user-box-shadow edit-patient-treatments">
      <div className="user-treatment-header">
        <h2>{Translation[language].navbar.treatments}</h2>
      </div>
      <div className="user-treatment-content">
        <TableContainer>
          <Table aria-label="treatments table">
            <TableBody>
              {treatments.map((treatment, index) => (
                <TableRow key={index + 1} className="home-patient-row">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {dayjs(treatment.date).format("YYYY-MM-DD HH:mm")}
                  </TableCell>
                  <TableCell className="deactive">
                    {treatment.serviceName}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="default"
                      onClick={() =>
                        navigate(`/user/show-treatment/${treatment.id}`)
                      }
                    >
                      <VisibilityRoundedIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() =>
                        navigate(`/user/edit-treatment/${treatment.id}`)
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(treatment.id)}
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
    </div>
  );
};

export default PatientTreatments;
