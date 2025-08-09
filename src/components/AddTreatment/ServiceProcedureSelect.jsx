import React, { useContext, useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../store/fetchs/serviceActions"; // Adjust the import path as necessary
import { LanguageContext } from "../../LanguageContext";
import Translation from "../../language.json";

const ServiceProcedureSelect = ({ selectedService, setSelectedService }) => {
  const { language } = useContext(LanguageContext);

  const dispatch = useDispatch();
  const services = useSelector((state) => state.service.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleSelectChange = (selectedOption) => {
    setSelectedService(selectedOption);
  };

  const serviceOptions = services.map((service) => ({
    value: service.id,
    label: service.name,
  }));

  return (
    <Select
      value={serviceOptions.find((option) => option.value === selectedService)}
      onChange={handleSelectChange}
      options={serviceOptions}
      placeholder={Translation[language].serviceProcedureSelect}
      isClearable
    />
  );
};

export default ServiceProcedureSelect;
