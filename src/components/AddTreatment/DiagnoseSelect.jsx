import React, { useContext, useEffect, useState } from "react";
import Select, { createFilter } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import makeAnimated from "react-select/animated";
import {
  fetchDiagnoses,
  createDiagnose,
} from "../../store/fetchs/diagnoseActions"; // Adjust the import path as necessary
import Translation from "../../language.json";
import { LanguageContext } from "./../../LanguageContext";

const animatedComponents = makeAnimated();

const DiagnoseSelect = ({ selectedDiagnoses, setSelectedDiagnoses }) => {
  const { language } = useContext(LanguageContext);
  const diagnoseSelectDictionary = Translation[language].diagnoseSelect;
  const dispatch = useDispatch();
  const diagnoses = useSelector((state) => state.diagnose.diagnoses);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    dispatch(fetchDiagnoses());
  }, [dispatch]);

  const handleSelectChange = (selectedOptions) => {
    setSelectedDiagnoses(selectedOptions);
  };

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter" && inputValue) {
      // Check if the inputValue already exists
      const existingDiagnose = diagnoses.find(
        (diagnose) => diagnose.name.toLowerCase() === inputValue.toLowerCase()
      );
      if (!existingDiagnose) {
        const newDiagnose = await dispatch(createDiagnose(inputValue));
        setSelectedDiagnoses([
          ...selectedDiagnoses,
          { value: newDiagnose.id, label: inputValue },
        ]);
        setInputValue("");
        dispatch(fetchDiagnoses());
      }
    }
  };

  const diagnoseOptions = diagnoses.map((diagnose) => ({
    value: diagnose.id,
    label: diagnose.name,
  }));

  return (
    <Select
      components={animatedComponents}
      value={selectedDiagnoses}
      onChange={handleSelectChange}
      options={diagnoseOptions}
      placeholder={diagnoseSelectDictionary.placeholder}
      isClearable
      isMulti
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown}
      inputValue={inputValue}
      classNamePrefix="react-select"
      filterOption={createFilter({ ignoreAccents: false })}
      noOptionsMessage={() =>
        inputValue
          ? `${diagnoseSelectDictionary.noOptionsMessage.withInput} "${inputValue}"`
          : `${diagnoseSelectDictionary.noOptionsMessage.default}`
      }
    />
  );
};

export default DiagnoseSelect;
