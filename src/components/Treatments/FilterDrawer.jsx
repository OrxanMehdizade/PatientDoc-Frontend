import React, { useContext, useState } from "react";
import DiagnoseSelect from "../AddTreatment/DiagnoseSelect";
import ServiceProcedureSelect from "../AddTreatment/ServiceProcedureSelect";
import { Box, Button, Drawer } from "@mui/material";
import Translation from "../../language.json";
import { LanguageContext } from "../../LanguageContext";
import "../../assets/styles/User/Treatment/FilterDrawer.css";

const FilterDrawer = ({ open, handleClose, applyFilter }) => {
  const { language } = useContext(LanguageContext);
  const filterDrawerDictionary = Translation[language].filterDrawer;

  const [selectedDiagnoses, setSelectedDiagnoses] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  const handleFilter = () => {
    applyFilter({ diagnoses: selectedDiagnoses, service: selectedService });
    handleClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <div className="filter-drawer-modal">
        <h2>{filterDrawerDictionary.header}</h2>
        <Box mb={2}>
          <DiagnoseSelect
            selectedDiagnoses={selectedDiagnoses}
            setSelectedDiagnoses={setSelectedDiagnoses}
          />
        </Box>
        <Box mb={2}>
          <ServiceProcedureSelect
            selectedService={selectedService}
            setSelectedService={setSelectedService}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button
            variant="contained"
            className="app-theme-color"
            onClick={handleFilter}
          >
            {filterDrawerDictionary.applyFilterButton}
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            {filterDrawerDictionary.cancelButton}
          </Button>
        </Box>
      </div>
    </Drawer>
  );
};

export default FilterDrawer;
