import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LanguageContext } from "../../LanguageContext";
import TreatmentOptionsSegment from "./TreatmentOptionsSegment";
import Translation from "../../language.json";
import {
  fetchServices,
  createService,
  updateService,
  deleteService,
} from "../../store/fetchs/serviceActions"; // Adjust the import path as necessary

import {
  fetchDiagnoses,
  createDiagnose,
  updateDiagnose,
  deleteDiagnose,
} from "../../store/fetchs/diagnoseActions"; // Adjust the import path as necessary

import {
  fetchMedicines,
  createMedicine,
  updateMedicine,
  deleteMedicine,
} from "../../store/fetchs/medicineActions"; // Adjust the import path as necessary

import {
  fetchTreatmentForms,
  createTreatmentForm,
  updateTreatmentForm,
  deleteTreatmentForm,
} from "../../store/fetchs/treatmentFormActions"; // Adjust the import path as necessary

const TreatmentOptions = () => {
  const { language } = useContext(LanguageContext);
  const treatmentOptionsDictionary = Translation[language].treatmentOptions;

  const dispatch = useDispatch();

  const services = useSelector((state) => state.service.services || []);
  const diagnoses = useSelector((state) => state.diagnose.diagnoses || []);
  const medicines = useSelector((state) => state.medicine.medicines || []);
  const treatmentForms = useSelector(
    (state) => state.treatmentForm.treatmentForms || []
  );

  const treatmentFormMethods = {
    fetchItems: () => dispatch(fetchTreatmentForms()),
    addItem: () => dispatch(createTreatmentForm("")),
    saveItem: (id, name) => dispatch(updateTreatmentForm(id, name)),
    deleteItem: (id) => dispatch(deleteTreatmentForm(id)),
  };

  const serviceMethods = {
    fetchItems: () => dispatch(fetchServices()),
    addItem: () => dispatch(createService("")),
    saveItem: (id, name) => dispatch(updateService(id, name)),
    deleteItem: (id) => dispatch(deleteService(id)),
  };

  const diagnoseMethods = {
    fetchItems: () => dispatch(fetchDiagnoses()),
    addItem: () => dispatch(createDiagnose("")),
    saveItem: (id, name) => dispatch(updateDiagnose(id, name)),
    deleteItem: (id) => dispatch(deleteDiagnose(id)),
  };

  const medicineMethods = {
    fetchItems: () => dispatch(fetchMedicines()),
    addItem: () => dispatch(createMedicine("")),
    saveItem: (id, name) => dispatch(updateMedicine(id, name)),
    deleteItem: (id) => dispatch(deleteMedicine(id)),
  };

  return (
    <>
      <div className="border-right border-bottom">
        <TreatmentOptionsSegment
          title={treatmentOptionsDictionary.treatmentFormTitle}
          items={treatmentForms}
          {...treatmentFormMethods}
        />
      </div>
      <div className="border-bottom">
        <TreatmentOptionsSegment
          title={treatmentOptionsDictionary.customServicesTitle}
          items={services}
          {...serviceMethods}
        />
      </div>
      <div className="border-right">
        <TreatmentOptionsSegment
          title={treatmentOptionsDictionary.customDiagnosesTitle}
          items={diagnoses}
          {...diagnoseMethods}
        />
      </div>
      <div>
        <TreatmentOptionsSegment
          title={treatmentOptionsDictionary.medicinesTitle}
          items={medicines}
          {...medicineMethods}
        />
      </div>
    </>
  );
};

export default TreatmentOptions;
