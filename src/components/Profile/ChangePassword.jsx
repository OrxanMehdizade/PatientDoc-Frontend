import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../store/fetchs/profileActions";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Translation from "../../language.json";
import { LanguageContext } from "../../LanguageContext";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/styles/User/Profile/ChangePassword.css";

const ChangePassword = () => {
  const { language } = useContext(LanguageContext);
  const changePasswordDictionary = Translation[language].changePassword;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const changePasswordSuccess = useSelector(
    (state) => state.profile.changePasswordSuccess
  );
  const navigate = useNavigate();
  useEffect(() => {}, [changePasswordSuccess]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChangePassword = () => {
    if (newPassword !== newPasswordConfirm) {
      toast.error(changePasswordDictionary.errorMessage.passwordMismatch);
      return;
    }
    if (newPassword.length < 6) {
      toast.error(changePasswordDictionary.errorMessage.passwordLength);
      return;
    }
    dispatch(changePassword(currentPassword, newPassword)).then(() => {
      console.log(changePasswordSuccess);
      if (changePasswordSuccess) {
        setCurrentPassword("");
        setNewPassword("");
        setNewPasswordConfirm("");
        toast.success(changePasswordDictionary.successMessage);
        navigate("/user/profile");
      } else {
        toast.error("Error, check passwords again!");
      }
    });
  };

  return (
    <div className="change-password-container user-box-shadow">
      <h2>{changePasswordDictionary.header}</h2>
      <div className="change-password-input-container">
        <div className="change-password-label-input-container">
          <label>{changePasswordDictionary.currentPasswordLabel}</label>
          <OutlinedInput
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            size="small"
            type={showPassword ? "text" : "password"}
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
        <div className="change-password-label-input-container">
          <label>{changePasswordDictionary.newPasswordLabel}</label>
          <OutlinedInput
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            size="small"
            type={showPassword ? "text" : "password"}
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
        <div className="change-password-label-input-container">
          <label>{changePasswordDictionary.newPasswordConfirmLabel}</label>
          <OutlinedInput
            value={newPasswordConfirm}
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
            size="small"
            type={showPassword ? "text" : "password"}
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
        <Button
          variant="outlined"
          className="change-password-save-btn"
          onClick={handleChangePassword}
          disabled={newPassword.length < 6}
        >
          {changePasswordDictionary.saveButton}
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ChangePassword;
