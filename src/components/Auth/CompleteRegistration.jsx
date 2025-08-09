import React, { useContext, useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  InputAdornment,
  OutlinedInput,
  Button,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../../assets/styles/Auth/CompleteRegistration.css";
import { useDispatch, useSelector } from "react-redux";
import { registerFetch } from "./../../store/fetchs/authActions";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pace from "pace-js";
import { authFailure } from "../../store/reducers/authReducer";
import Translation from "../../language.json";
import { LanguageContext } from "../../LanguageContext";
import { useLoading } from "../../LoadingContext";

const CompleteRegistration = () => {
  const { setLoading } = useLoading();
  const { language } = useContext(LanguageContext);
  let completeRegistrationDictionary =
    Translation[language].completeRegistration;
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [hospital, setHospital] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const email = useSelector((state) => state.auth.email); // Get email from redux state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleRegister = () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    Pace.restart(); // Start Pace.js loading animation
    setLoading(true);
    dispatch(registerFetch(email, name, surname, hospital, password))
      .then(() => {
        Pace.stop(); // Stop Pace.js loading animation
        setLoading(false);
        navigate("/user");
      })
      .catch((error) => {
        Pace.stop(); // Stop Pace.js loading animation
        setLoading(false);
        toast.error(error.message);
        dispatch(authFailure(error));
      });
  };

  const isFormValid = () => {
    return (
      password === confirmPassword &&
      password.length > 5 &&
      agreeTerms &&
      name.length > 2 &&
      surname.length > 3 &&
      hospital.length > 0
    );
  };

  return (
    <div className="auth-complete-registration-container">
      <ToastContainer />
      <h2>{completeRegistrationDictionary.accountInfo}</h2>
      <div className="auth-complete-registration-input">
        <label>
          <strong>{completeRegistrationDictionary.firstName}</strong>
        </label>
        <OutlinedInput
          fullWidth
          placeholder={completeRegistrationDictionary.firstName}
          size="small"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="auth-complete-registration-input">
        <label>
          <strong>{completeRegistrationDictionary.lastName}</strong>
        </label>
        <OutlinedInput
          fullWidth
          placeholder={completeRegistrationDictionary.lastName}
          size="small"
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </div>
      <div className="auth-complete-registration-input">
        <label>
          <strong>{completeRegistrationDictionary.clinic}</strong>
        </label>
        <OutlinedInput
          fullWidth
          placeholder={completeRegistrationDictionary.clinic}
          size="small"
          type="text"
          value={hospital}
          onChange={(e) => setHospital(e.target.value)}
        />
      </div>
      <div className="auth-complete-registration-input">
        <label>
          <strong>{completeRegistrationDictionary.password}</strong>
        </label>
        <OutlinedInput
          fullWidth
          placeholder={completeRegistrationDictionary.password}
          size="small"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
      <div className="auth-complete-registration-input">
        <label>
          <strong>{completeRegistrationDictionary.confirmPassword}</strong>
        </label>
        <OutlinedInput
          fullWidth
          placeholder={completeRegistrationDictionary.confirmPassword}
          size="small"
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
      <div
        className="auth-complete-registration-input"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
          }
          label={completeRegistrationDictionary.agreeTerms}
          style={{ fontWeight: "lighter", fontSize: 12, color: "#74788d" }}
        />
      </div>
      <div className="auth-complete-registration-input" style={{ height: 45 }}>
        <Button
          variant="contained"
          style={{ width: "100%", height: "100%", backgroundColor: "#426CFF" }}
          onClick={handleRegister}
          disabled={!isFormValid()} // Disable button if form is not valid
        >
          {completeRegistrationDictionary.complete}
        </Button>
      </div>
    </div>
  );
};

export default CompleteRegistration;
