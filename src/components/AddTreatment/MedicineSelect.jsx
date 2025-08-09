import React, { useContext, useEffect, useState } from "react";
import Select, { createFilter } from "react-select";
import makeAnimated from "react-select/animated";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMedicines,
  createMedicine,
} from "../../store/fetchs/medicineActions";
import { LanguageContext } from "../../LanguageContext";
import Translation from "../../language.json";

const animatedComponents = makeAnimated();

const MedicineSelect = ({ selectedMedicines, setSelectedMedicines }) => {
  const { language } = useContext(LanguageContext);
  const dispatch = useDispatch();
  const medicines = useSelector((state) => state.medicine.medicines);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    dispatch(fetchMedicines());
  }, [dispatch]);

  const handleSelectChange = (selectedOption) => {
    setSelectedMedicines(selectedOption);
  };

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter" && inputValue) {
      const existingMedicine = medicines.find(
        (medicine) => medicine.name.toLowerCase() === inputValue.toLowerCase()
      );
      if (!existingMedicine) {
        const newMedicine = await dispatch(createMedicine(inputValue));
        setSelectedMedicines([
          ...selectedMedicines,
          { value: newMedicine.id, label: inputValue },
        ]);
        setInputValue("");
        dispatch(fetchMedicines());
      }
    }
  };

  const medicineOptions = medicines.map((medicine) => ({
    value: medicine.id,
    label: medicine.name,
  }));

  return (
    <Select
      components={animatedComponents}
      value={selectedMedicines}
      onChange={handleSelectChange}
      options={medicineOptions}
      placeholder={Translation[language].medicineSelect}
      isClearable
      isMulti
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown}
      inputValue={inputValue}
      classNamePrefix="react-select"
      filterOption={createFilter({ ignoreAccents: false })}
      noOptionsMessage={() =>
        inputValue
          ? `${Translation[language].diagnoseSelect.noOptionsMessage.withInput} "${inputValue}"`
          : `${Translation[language].diagnoseSelect.noOptionsMessage.default}`
      }
    />
  );
};

export default MedicineSelect;
