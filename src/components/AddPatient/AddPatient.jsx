import React, { useContext, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import PhoneNumber from "../PhoneNumber";
import { LanguageContext } from "../../LanguageContext";
import Translation from "../../language.json";
import { useDispatch, useSelector } from "react-redux";
import {
  createPatientFetch,
  fetchPatients,
  updatePatientFetch,
} from "../../store/fetchs/patientActions";
import { toast } from "react-toastify";
import { createPatientFailure } from "../../store/reducers/patientReducer";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { useNavigate } from "react-router-dom";
import NewAppointment from "./../AddAppointment/NewAppointment";
import "../../assets/styles/User/AddPatient/AddPatient.css";

const defaultPatient = {
  name: "",
  surname: "",
  fatherName: "",
  phone: "",
  birthday: null,
  gender: "",
  address: "",
  email: "",
  insurance: "",
  doctorReferral: "",
};

const AddPatient = ({ patient = defaultPatient }) => {
  const { language } = useContext(LanguageContext);
  const addPatientDictionary = Translation[language].addPatient;

  const [name, setName] = useState(patient.name);
  const [surname, setSurname] = useState(patient.surname);
  const [fatherName, setFatherName] = useState(patient.fatherName);
  const [phone, setPhone] = useState(patient.phone);
  const [birthday, setBirthday] = useState(patient.birthday);
  const [gender, setGender] = useState(patient.gender);
  const [address, setAddress] = useState(patient.address);
  const [email, setEmail] = useState(patient.email);
  const [insurance, setInsurance] = useState(patient.insurance);
  const [doctorReferral, setDoctorReferral] = useState(patient.doctorReferral);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const patientState = useSelector((state) => state.patient.updateStatus);
  const { loading } = patientState;
  useEffect(() => {
    setName(patient.name);
    setSurname(patient.surname);
    setFatherName(patient.fatherName);
    setPhone(patient.phone);
    setBirthday(dayjs(patient.birthday));
    setGender(patient.gender);
    setAddress(patient.address);
    setEmail(patient.email);
    setInsurance(patient.insurance);
    setDoctorReferral(patient.doctorReferral);
  }, [patient]);

  const addPatient = () => {
    if (!name) {
      toast.error("Name is required");
      return false;
    }
    if (!surname) {
      toast.error("Surname is required");
      return false;
    }
    if (!phone) {
      toast.error("Phone number is required");
      return false;
    }
    if (!birthday) {
      toast.error("Birthday is required");
      return false;
    }
    if (!gender) {
      toast.error("Gender is required");
      return false;
    }
    try {
      birthday.toISOString();
    } catch (error) {
      toast.error("Birthday is required");
      return false;
    }

    const patientData = {
      name,
      surname,
      fatherName,
      phone,
      birthday: birthday ? birthday.toISOString() : null,
      gender: gender === "Male" ? 0 : 1,
      address,
      email,
      insurance,
      doctorReferral,
    };
    if (patient.id) {
      console.log(patientData);
      dispatch(updatePatientFetch(patient.id, patientData))
        .then(() => {
          toast.success("Patient updated successfully");
        })
        .catch((err) => {
          dispatch(createPatientFailure(err.message));
          toast.error(err.message || "Error updating patient");
          return false;
        });
    } else {
      dispatch(createPatientFetch(patientData))
        .then(() => {
          toast.success("Patient created successfully");
          dispatch(fetchPatients(1, 10));
        })
        .catch((err) => {
          dispatch(createPatientFailure(err.message));
          toast.error(err.message || "Error creating patient");
          return false;
        });
    }
    return true;
  };

  const handleOpen = () => {
    const result = addPatient();
    result && setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    const result = addPatient();
    result && navigate("/user/patients");
  };

  return (
    <div className="add-patient-container user-box-shadow">
      <h2>{addPatientDictionary.personalInfo}</h2>
      <div className="add-patient-form">
        <div>
          <label className="add-patient-form-label">
            {addPatientDictionary.name}
          </label>
          <TextField
            placeholder={addPatientDictionary.name}
            variant="outlined"
            fullWidth
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="add-patient-form-label">
            {addPatientDictionary.surname}
          </label>
          <TextField
            placeholder={addPatientDictionary.surname}
            variant="outlined"
            fullWidth
            size="small"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <div>
          <label className="add-patient-form-label">
            {addPatientDictionary.fathersName}
          </label>
          <TextField
            placeholder={addPatientDictionary.fathersName}
            variant="outlined"
            fullWidth
            size="small"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
          />
        </div>
        <div>
          <PhoneNumber phone={phone} setPhone={setPhone} />
        </div>
        <div>
          <label className="add-patient-form-label">
            {addPatientDictionary.birthday}
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem>
              <DatePicker
                fullWidth
                value={birthday}
                onChange={(newValue) => setBirthday(newValue)}
                maxDate={dayjs()}
              />
            </DemoItem>
          </LocalizationProvider>
        </div>
        <div>
          <label className="add-patient-form-label">
            {addPatientDictionary.gender}
          </label>
          <FormControl variant="outlined" size="small" fullWidth>
            {!gender && (
              <InputLabel shrink={false} id="gender-label">
                Select
              </InputLabel>
            )}
            <Select
              labelId="gender-label"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="Male">{addPatientDictionary.male}</MenuItem>
              <MenuItem value="Female">{addPatientDictionary.female}</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <label className="add-patient-form-label">
            {addPatientDictionary.address}
          </label>
          <TextField
            placeholder={addPatientDictionary.address}
            variant="outlined"
            fullWidth
            size="small"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label className="add-patient-form-label">
            {addPatientDictionary.email}
          </label>
          <TextField
            placeholder={addPatientDictionary.email}
            variant="outlined"
            fullWidth
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="add-patient-form-label">
            {addPatientDictionary.insurance}
          </label>
          <TextField
            placeholder={addPatientDictionary.insurance}
            variant="outlined"
            fullWidth
            size="small"
            value={insurance}
            onChange={(e) => setInsurance(e.target.value)}
          />
        </div>
        <div>
          <label className="add-patient-form-label">
            {addPatientDictionary.doctorReferral}
          </label>
          <TextField
            placeholder={addPatientDictionary.doctorReferral}
            variant="outlined"
            fullWidth
            size="small"
            value={doctorReferral}
            onChange={(e) => setDoctorReferral(e.target.value)}
          />
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
          onClick={handleSubmit}
          disabled={loading}
        >
          {addPatientDictionary.save}
        </Button>
        <Button
          variant="contained"
          color="primary"
          className="app-theme-color"
          onClick={handleOpen}
        >
          {addPatientDictionary.makeAppointment}
        </Button>
      </Box>
      <NewAppointment open={open} handleClose={handleClose} />
    </div>
  );
};

export default AddPatient;
