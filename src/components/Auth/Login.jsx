import React, { useState, useEffect, useContext } from "react";
import { InputAdornment, OutlinedInput, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { LanguageContext } from "../../LanguageContext";
import { useDispatch } from "react-redux";
import { authFailure } from "../../store/reducers/authReducer";
import { loginFetch } from "./../../store/fetchs/authActions";
import { IconButton } from "@mui/joy";
import { useLoading } from "../../LoadingContext";
import { toast } from "react-toastify";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import Translation from "../../language.json";
import Pace from "pace-js";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/styles/Auth/Login.css";

const Login = () => {
  const { setLoading } = useLoading();
  const { language } = useContext(LanguageContext);
  let loginDictionary = Translation[language].login;
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

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

  const handleLogin = () => {
    Pace.restart(); // Start Pace.js loading animation
    setLoading(true);
    dispatch(loginFetch(email, password))
      .then(() => {
        Pace.stop(); // Stop Pace.js loading animation
        setLoading(false);
        toast.success("Successful login");
        navigate("/user");
      })
      .catch((error) => {
        Pace.stop(); // Stop Pace.js loading animation
        setLoading(false);
        toast.error(error.message); // Show error notification
        dispatch(authFailure(error));
      });
  };

  return (
    <div className="auth-login-container">
      <h2>{loginDictionary.welcome}</h2>
      <p>{loginDictionary.loginPrompt}</p>

      <div className="auth-login-input">
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
      <div className="auth-login-input">
        <label>
          <strong>{loginDictionary.password}</strong>
        </label>
        <OutlinedInput
          fullWidth
          placeholder={loginDictionary.password}
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
      <div className="auth-login-input" style={{ height: 45 }}>
        <Button
          variant="contained"
          style={{ width: "100%", height: "100%", backgroundColor: "#426CFF" }}
          onClick={handleLogin}
          disabled={!isEmailValid || password.length < 6} // Disable button if email is not valid or password length < 6
        >
          {loginDictionary.login}
        </Button>
      </div>
      <div
        className="auth-login-input"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loginDictionary.registerPrompt}{" "}
        <Link to={"/auth/register"}>{loginDictionary.registerLink}</Link>
      </div>
      <div
        className="auth-login-input"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to={"/auth/forget-password"}>
          {loginDictionary.forgetPassword}
        </Link>
      </div>
    </div>
  );
};

export default Login;
