import React, { useState, useEffect } from "react";
import { Box, Button, IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import NewAppointment from "../AddAppointment/NewAppointment";
import MedicineSelect from "../AddTreatment/MedicineSelect";
import DiagnoseSelect from "../AddTreatment/DiagnoseSelect";
import ServiceProcedureSelect from "../AddTreatment/ServiceProcedureSelect";
import PatientSelect from "../PatientSelect";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchTreatmentById,
  updateTreatment,
} from "../../store/fetchs/treatmentActions";
import UploadFile from "../UploadFile";
import "../../assets/styles/User/EditTreatment/EditTreatment.css";
import { fetchTreatmentForms } from "./../../store/fetchs/treatmentFormActions";

const EditTreatment = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const treatment = useSelector((state) => state.treatment.treatment);
  const treatmentForms = useSelector(
    (state) => state.treatmentForm.treatmentForms
  );

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDiagnoses, setSelectedDiagnoses] = useState([]);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [formContents, setFormContents] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTreatmentById(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchTreatmentForms());
  }, [dispatch]);

  useEffect(() => {
    if (treatment) {
      setSelectedPatient({
        value: treatment.patientId,
        label: treatment.patientName,
      });
      setSelectedService(treatment.serviceId);
      setSelectedDiagnoses(
        treatment.diagnoses.map((diagnose) => ({
          value: diagnose.id,
          label: diagnose.name,
        }))
      );
      setSelectedMedicines(
        treatment.medicines.map((medicine) => ({
          value: medicine.id,
          label: medicine.name,
        }))
      );
      setFormContents(
        treatment.treatmentForms.reduce(
          (acc, form) => ({ ...acc, [form.name]: form.content }),
          {}
        )
      );
      setImageUrl(treatment.documentUrl);
    }
  }, [treatment]);

  const handleFormContentChange = (name, content) => {
    setFormContents({
      ...formContents,
      [name]: content,
    });
  };

  const handleSave = () => {
    const treatmentFormsData = Object.keys(formContents).map((name) => ({
      treatmentFormId: treatmentForms.find((form) => form.name === name).id,
      content: formContents[name],
    }));

    const treatmentData = {
      patientId: selectedPatient?.value || 0,
      serviceId: selectedService || 0,
      diagnoseIds: selectedDiagnoses.map((d) => d.value),
      medicineIds: selectedMedicines.map((m) => m.value),
      treatmentForms: treatmentFormsData,
      documentUrl: imageUrl || "",
    };
    dispatch(updateTreatment(id, treatmentData));
    navigate("/user/treatments");
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDeleteDocument = () => setImageUrl(null);

  return (
    <div className="edit-treatment-container user-box-shadow">
      <h2>Edit Treatment</h2>

      <div className="edit-treatment-form">
        <div className="edit-treatment-top">
          <div>
            <label>Patient</label>
            <PatientSelect
              selectedPatient={selectedPatient}
              setSelectedPatient={setSelectedPatient}
            />
          </div>
          <div>
            <label>Service & Procedure</label>
            <ServiceProcedureSelect
              selectedService={selectedService}
              setSelectedService={setSelectedService}
            />
          </div>
          <div>
            <label>Diagnosis</label>
            <DiagnoseSelect
              selectedDiagnoses={selectedDiagnoses}
              setSelectedDiagnoses={setSelectedDiagnoses}
            />
          </div>
          <div>
            <label>Medicines</label>
            <MedicineSelect
              selectedMedicines={selectedMedicines}
              setSelectedMedicines={setSelectedMedicines}
            />
          </div>
        </div>
        <div className="edit-treatment-examination-questionnaire">
          <h3>Examination Questionnaire</h3>
          {treatmentForms.map((form) => (
            <div key={form.id}>
              <label>{form.name}</label>
              <textarea
                placeholder={form.name}
                value={formContents[form.name] || ""}
                onChange={(e) =>
                  handleFormContentChange(form.name, e.target.value)
                }
              />
            </div>
          ))}
        </div>
        <div>
          <label>Documents</label>
          {imageUrl ? (
            <div>
              <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                View Document
              </a>
              <IconButton
                color="error"
                onClick={handleDeleteDocument}
                aria-label="delete document"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ) : (
            <UploadFile setImageUrl={setImageUrl} content={"Upload Document"} />
          )}
        </div>
      </div>
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button
          variant="outlined"
          startIcon={<SaveIcon />}
          style={{
            color: "#426cff",
            borderColor: "#426cff",
            marginRight: "10px",
          }}
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          style={{
            color: "#426cff",
            borderColor: "#426cff",
            marginRight: "10px",
          }}
          onClick={handleOpen}
        >
          Next Checkup
        </Button>
        <Button variant="contained" color="primary" className="app-theme-color">
          Send
        </Button>
      </Box>
      <NewAppointment handleClose={handleClose} open={open} />
    </div>
  );
};

export default EditTreatment;
