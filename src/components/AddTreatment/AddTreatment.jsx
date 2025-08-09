import React, { useState, useEffect, useContext } from "react";
import { Button, Box } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import { fetchTreatmentForms } from "../../store/fetchs/treatmentFormActions";
import {
  createTreatmentFetch,
  fetchTreatments,
} from "../../store/fetchs/treatmentActions";
import PatientSelect from "../PatientSelect";
import ServiceProcedureSelect from "./ServiceProcedureSelect";
import DiagnoseSelect from "./DiagnoseSelect";
import MedicineSelect from "./MedicineSelect";
import UploadFile from "../UploadFile";
import NewAppointment from "./../AddAppointment/NewAppointment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Translation from "../../language.json";
import { useLoading } from "../../LoadingContext";
import { LanguageContext } from "../../LanguageContext";
import { createTreatmentFailure } from "../../store/reducers/treatmentReducer";
import "../../assets/styles/User/AddTreatment/AddTreatment.css";

const AddTreatment = () => {
  const { language } = useContext(LanguageContext);
  const addTreatmentDictionary = Translation[language].addTreatment;

  const { setLoading } = useLoading();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    dispatch(fetchTreatmentForms());
  }, [dispatch]);

  const handleFormContentChange = (id, content) => {
    setFormContents({
      ...formContents,
      [id]: content,
    });
  };

  const saveTreatment = () => {
    if (!selectedPatient) {
      toast.error(addTreatmentDictionary.errors.patientRequired);
      return false;
    }
    if (!selectedService) {
      toast.error(addTreatmentDictionary.errors.serviceRequired);
      return false;
    }
    if (selectedDiagnoses.length === 0) {
      toast.error(addTreatmentDictionary.errors.diagnosisRequired);
      return false;
    }
    if (selectedMedicines.length === 0) {
      toast.error(addTreatmentDictionary.errors.medicineRequired);
      return false;
    }

    const treatmentFormsData = Object.keys(formContents).map((id) => ({
      treatmentFormId: parseInt(id),
      content: formContents[id],
    }));

    const treatmentData = {
      patientId: selectedPatient?.value || 0,
      serviceId: selectedService?.value || 0,
      diagnoseIds: selectedDiagnoses.map((d) => d.value),
      medicineIds: selectedMedicines.map((m) => m.value),
      treatmentForms: treatmentFormsData,
      documentUrl: imageUrl || "",
    };
    setLoading(true);
    dispatch(createTreatmentFetch(treatmentData))
      .then(() => {
        toast.success("Treatment created successfully");
        setLoading(false);
      })
      .catch((err) => {
        dispatch(createTreatmentFailure(err.message));
        toast.error(err.message || "Error creating treatment");
        setLoading(false);
        return false;
      });

    return true;
  };

  const handleSave = async () => {
    const result = saveTreatment();
    if (result) {
      await dispatch(fetchTreatments(1, 10));
      navigate("/user/treatments");
    }
  };

  const handleOpen = () => {
    const result = saveTreatment();
    result && setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <div className="add-treatment-container user-box-shadow">
      <h2>{addTreatmentDictionary.header}</h2>

      <div className="add-treatment-form">
        <div className="add-treatment-top">
          <div>
            <label>{addTreatmentDictionary.patientLabel}</label>
            <PatientSelect
              selectedPatient={selectedPatient}
              setSelectedPatient={setSelectedPatient}
            />
          </div>
          <div>
            <label>{addTreatmentDictionary.serviceLabel}</label>
            <ServiceProcedureSelect
              selectedService={selectedService}
              setSelectedService={setSelectedService}
            />
          </div>
          <div>
            <label>{addTreatmentDictionary.diagnosisLabel}</label>
            <DiagnoseSelect
              selectedDiagnoses={selectedDiagnoses}
              setSelectedDiagnoses={setSelectedDiagnoses}
            />
          </div>
          <div>
            <label>{addTreatmentDictionary.medicinesLabel}</label>
            <MedicineSelect
              selectedMedicines={selectedMedicines}
              setSelectedMedicines={setSelectedMedicines}
            />
          </div>
        </div>
        <div className="add-treatment-examination-questionnaire">
          <h3>{addTreatmentDictionary.examinationQuestionnaire}</h3>
          {treatmentForms.map((form) => (
            <div key={form.id}>
              <label>{form.name}</label>
              <textarea
                placeholder={form.name}
                value={formContents[form.id] || ""}
                onChange={(e) =>
                  handleFormContentChange(form.id, e.target.value)
                }
              />
            </div>
          ))}
        </div>
        <div className="add-treatment-document-container">
          <label>{addTreatmentDictionary.documentsLabel}</label>
          <UploadFile
            setImageUrl={setImageUrl}
            content={addTreatmentDictionary.uploadDocument}
            className="add-treatment-document-container-upload-button"
          />
        </div>
      </div>
      <Box
        display="flex"
        justifyContent="flex-end"
        mt={2}
        style={{ marginBottom: 10 }}
      >
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
          {addTreatmentDictionary.saveButton}
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
          {addTreatmentDictionary.nextCheckupButton}
        </Button>
        <Button variant="contained" color="primary" className="app-theme-color">
          {addTreatmentDictionary.sendButton}
        </Button>
      </Box>
      <NewAppointment handleClose={handleClose} open={open} />
    </div>
  );
};

export default AddTreatment;
