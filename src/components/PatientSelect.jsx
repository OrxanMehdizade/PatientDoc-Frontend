import React, { useContext, useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPatients } from "../store/fetchs/patientActions";
import "../assets/styles/User/PatientSelect.css";
import { LanguageContext } from "../LanguageContext";
import Translation from "../language.json";

const PatientSelect = ({
  selectedPatient,
  setSelectedPatient,
  className = "",
}) => {
  const { language } = useContext(LanguageContext);

  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patient.allPatients);

  useEffect(() => {
    dispatch(fetchAllPatients());
  }, [dispatch]);

  const handleSelectChange = (selectedOption) => {
    setSelectedPatient(selectedOption);
  };

  const options = patients.map((patient) => ({
    value: patient.id,
    label: patient.fullNameWithPhone,
  }));

  return (
    <Select
      value={selectedPatient}
      onChange={handleSelectChange}
      options={options}
      placeholder={Translation[language].patientSelect}
      isClearable
      className={className}
    />
  );
};

export default PatientSelect;
