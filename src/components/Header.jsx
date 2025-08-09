import { React, useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import FlagSelect from "./FlagSelect";
import logo from "../assets/images/logo-small.png";
import { useNavigate } from "react-router-dom";
import PatientSelect from "./PatientSelect";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import "../assets/styles/User/Header.css";
import { LanguageContext } from "../LanguageContext";
import Translation from "../language.json";
import { logoutFetch } from "../store/fetchs/authActions";
import { useDispatch } from "react-redux";

let Header = ({ toggleNavbar }) => {
  const { language } = useContext(LanguageContext);
  let headerDictionary = Translation[language].header;
  let username = localStorage.getItem("fullName");
  const [selectedPatient, setSelectedPatient] = useState(null);
  let profileImg = localStorage.getItem("profileImgUrl");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
    if (selectedPatient) {
      navigate(`/user/edit-patient/${selectedPatient.value}`);
      setSelectedPatient(null);
    }
  }, [selectedPatient, navigate]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <div className="header-container">
      <div className="header-left-side">
        <img
          className="header-logo"
          src={logo}
          alt="logo"
          onClick={() => navigate("/user/home")}
        />
        <p>
          {headerDictionary.hello}, <strong>{username}</strong> 👋
        </p>
        <MenuRoundedIcon className="header-menu-icon" onClick={toggleNavbar} />
      </div>
      <div className="header-right-side">
        <PatientSelect
          selectedPatient={selectedPatient}
          setSelectedPatient={setSelectedPatient}
          className="header-patient-select"
        />
        <FlagSelect />
        <Box sx={{ flexGrow: 0 }} className="header-profile-box">
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={username} src={profileImg} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem
              key={headerDictionary.profile}
              onClick={() => {
                navigate("/user/profile");
              }}
            >
              <Typography textAlign="center">
                {headerDictionary.profile}
              </Typography>
            </MenuItem>
            <MenuItem
              key={headerDictionary.logout}
              onClick={() => {
                dispatch(logoutFetch());
              }}
            >
              <Typography textAlign="center">
                {headerDictionary.logout}
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      </div>
    </div>
  );
};

export default Header;
