import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, OutlinedInput } from "@mui/material";
import { checkEmailFetch } from "./../../store/fetchs/authActions";
import Pace from "pace-js";
import { toast } from "react-toastify";
import { checkEmailFailure } from "../../store/reducers/authReducer";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/styles/Auth/Register.css";
import Translation from "../../language.json";
import { LanguageContext } from "../../LanguageContext";
import { useLoading } from "../../LoadingContext";

const Register = () => {
  const { setLoading } = useLoading();
  const { language } = useContext(LanguageContext);
  let registerDictionary = Translation[language].register;
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (email) {
      setIsEmailValid(validateEmail(email));
    } else {
      setIsEmailValid(false);
    }
  }, [email]);

  const handleCheckEmail = () => {
    Pace.restart(); // Start Pace.js loading animation
    setLoading(true);
    dispatch(checkEmailFetch(email))
      .then(() => {
        Pace.stop(); // Stop Pace.js loading animation
        setLoading(false);
        navigate("/auth/two-step-verification");
      })
      .catch((error) => {
        Pace.stop(); // Stop Pace.js loading animation
        setLoading(false);
        toast.error(error.message); // Show error notification
        dispatch(checkEmailFailure(error.message));
        setEmail("");
      });
  };

  return (
    <div className="auth-register-container">
      <h2>{registerDictionary.createAccount}</h2>
      <div className="auth-register-input">
        <label>
          <strong>Email</strong>
        </label>
        <OutlinedInput
          fullWidth
          placeholder="Enter your email"
          size="small"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="auth-register-input" style={{ height: 45 }}>
        <Button
          variant="contained"
          style={{ width: "100%", height: "100%", backgroundColor: "#426CFF" }}
          onClick={handleCheckEmail}
          disabled={!isEmailValid} // Disable button if email is not valid
        >
          {registerDictionary.next}
        </Button>
      </div>
      <div
        className="auth-register-input"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {registerDictionary.haveAccount}{" "}
        <Link to={"/auth/login"}>{registerDictionary.loginLink}</Link>
      </div>
    </div>
  );
};

export default Register;
