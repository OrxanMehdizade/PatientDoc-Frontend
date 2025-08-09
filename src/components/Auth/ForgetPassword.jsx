import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, OutlinedInput } from "@mui/material";
import { forgetPasswordFetch } from "./../../store/fetchs/authActions";
import Pace from "pace-js";
import { toast } from "react-toastify";
import { forgetPasswordFailure } from "../../store/reducers/authReducer";
import Translation from "../../language.json";
import { LanguageContext } from "../../LanguageContext";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/styles/Auth/Register.css";
import { useLoading } from "../../LoadingContext";

const ForgetPassword = () => {
  const { setLoading } = useLoading();
  const { language } = useContext(LanguageContext);
  let forgetPasswordDictionary = Translation[language].forgetPassword;
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

  const handleForgetPassword = () => {
    Pace.restart(); // Start Pace.js loading animation
    setLoading(true);
    dispatch(forgetPasswordFetch(email))
      .then(() => {
        Pace.stop(); // Stop Pace.js loading animation
        setLoading(false);
        toast.success("New password has been sent to your email.");
        navigate("/auth/login");
      })
      .catch((error) => {
        setLoading(false);
        Pace.stop(); // Stop Pace.js loading animation
        toast.error(error.message); // Show error notification
        setEmail("");
        dispatch(forgetPasswordFailure(error.message));
      });
  };

  return (
    <div className="auth-register-container">
      <h2>{forgetPasswordDictionary.resetPassword}</h2>
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
          onClick={handleForgetPassword}
          disabled={!isEmailValid} // Disable button if email is not valid
        >
          {forgetPasswordDictionary.next}
        </Button>
      </div>
      <Button
        onClick={() => {
          navigate("/auth/login");
        }}
      >
        {forgetPasswordDictionary.back}
      </Button>
    </div>
  );
};

export default ForgetPassword;
