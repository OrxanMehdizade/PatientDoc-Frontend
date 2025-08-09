import React, { useContext, useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTreatmentById } from "../../store/fetchs/treatmentActions";
import "../../assets/styles/User/ShowTreatment/ShowTreatment.css";
import Translation from "../../language.json";
import { LanguageContext } from "./../../LanguageContext";

const ShowTreatment = () => {
  const { language } = useContext(LanguageContext);
  const showTreatmentDictionary = Translation[language].showTreatment;

  const { id } = useParams();
  const dispatch = useDispatch();
  const treatment = useSelector((state) => state.treatment.treatment);
  const [data, setData] = useState({
    patientName: "",
    serviceName: "",
    diagnoseNames: "",
    medicineNames: "",
    treatmentForms: [],
    documentUrl: "",
  });

  useEffect(() => {
    dispatch(fetchTreatmentById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (treatment) {
      setData({
        patientName: treatment.patientName,
        serviceName: treatment.serviceName || "Not recorded",
        diagnoseNames:
          treatment.diagnoses.map((d) => d.name).join(", ") || "Not recorded",
        medicineNames:
          treatment.medicines.map((m) => m.name).join(", ") || "Not recorded",
        treatmentForms: treatment.treatmentForms || [],
        documentUrl: treatment.documentUrl || "",
      });
    }
  }, [treatment]);

  return (
    <div className="show-treatment-container user-box-shadow">
      <h2>{showTreatmentDictionary.header}</h2>
      <div className="show-treatment-content">
        <div className="show-treatment-info-item">
          <TextField
            label={showTreatmentDictionary.patientNameLabel}
            variant="outlined"
            fullWidth
            size="small"
            value={data.patientName}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>

        <div className="show-treatment-info-item">
          <TextField
            label={showTreatmentDictionary.serviceLabel}
            variant="outlined"
            fullWidth
            size="small"
            value={data.serviceName}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>

        <div className="show-treatment-info-item">
          <TextField
            label={showTreatmentDictionary.diagnosisLabel}
            variant="outlined"
            fullWidth
            size="small"
            value={data.diagnoseNames}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>

        <div className="show-treatment-info-item">
          <TextField
            label={showTreatmentDictionary.medicinesLabel}
            variant="outlined"
            fullWidth
            size="small"
            value={data.medicineNames}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>

        {data.treatmentForms.length > 0 && (
          <div className="show-treatment-info-item">
            <label>{showTreatmentDictionary.treatmentFormsLabel}</label>
            {data.treatmentForms.map((form, index) => (
              <TextField
                key={index}
                label={form.name}
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={form.content}
                InputProps={{
                  readOnly: true,
                }}
                style={{ marginBottom: "16px" }}
              />
            ))}
          </div>
        )}

        {data.documentUrl && (
          <div className="show-treatment-info-item">
            <label>{showTreatmentDictionary.documentsLabel}</label>
            <a
              href={data.documentUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {showTreatmentDictionary.documentLinkText}
            </a>
          </div>
        )}

        <Button
          variant="contained"
          color="primary"
          className="show-treatment-print-button"
        >
          {showTreatmentDictionary.printButton}
        </Button>
      </div>
    </div>
  );
};

export default ShowTreatment;
