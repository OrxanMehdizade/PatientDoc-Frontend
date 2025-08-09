import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Diversity1RoundedIcon from "@mui/icons-material/Diversity1Rounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import HealingRoundedIcon from "@mui/icons-material/HealingRounded";
import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import { useContext, useEffect, useRef, useState } from "react";
import Translation from "../language.json";
import { LanguageContext } from "./../LanguageContext";
import { logoutFetch } from "../store/fetchs/authActions";
import { useDispatch } from "react-redux";

let Navbar = ({ isOpen, toggleNavbar }) => {
  const { language } = useContext(LanguageContext);
  const navbarDictionary = Translation[language].navbar;

  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(true);
  const windowWidth = useRef(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (windowWidth.current <= 768) setIsMobile(true);
  }, [windowWidth]);

  let handleLogout = () => {
    dispatch(logoutFetch());
  };

  return (
    <div
      style={{ height: "100%" }}
      onMouseEnter={() => {
        if (!isMobile) setCollapsed(false);
      }}
      onMouseLeave={() => {
        if (!isMobile) setCollapsed(true);
      }}
      className={`user-navbar ${isOpen ? "active" : "deactive"}`}
    >
      <Sidebar
        style={{ height: "100%" }}
        backgroundColor="white"
        collapsed={isMobile ? true : collapsed}
        collapsedWidth="100%"
        width="190px"
        transitionDuration={400}
      >
        <Menu style={{ paddingTop: 60 }}>
          <MenuItem
            icon={<HomeRoundedIcon color="primary" />}
            component={<Link to="/user/home" />}
            onClick={toggleNavbar}
          >
            {navbarDictionary.home}
          </MenuItem>
          <MenuItem
            icon={<Diversity1RoundedIcon color="primary" />}
            component={<Link to="/user/patients" />}
            onClick={toggleNavbar}
          >
            {navbarDictionary.patients}
          </MenuItem>
          <MenuItem
            icon={<CalendarMonthRoundedIcon color="primary" />}
            component={<Link to="/user/calendar" />}
            onClick={toggleNavbar}
          >
            {navbarDictionary.calendar}
          </MenuItem>
          <MenuItem
            icon={<HealingRoundedIcon color="primary" />}
            component={<Link to="/user/treatments" />}
            onClick={toggleNavbar}
          >
            {navbarDictionary.treatments}
          </MenuItem>
          <MenuItem
            icon={<FactCheckRoundedIcon color="primary" />}
            component={<Link to="/user/appointments" />}
            onClick={toggleNavbar}
          >
            {navbarDictionary.appointments}
          </MenuItem>
          <MenuItem
            icon={<InsightsRoundedIcon color="primary" />}
            component={<Link to="/user/statistics" />}
            onClick={toggleNavbar}
          >
            {navbarDictionary.statistics}
          </MenuItem>
          <MenuItem
            icon={<TuneRoundedIcon color="primary" />}
            component={<Link to="/user/profile" />}
            onClick={toggleNavbar}
          >
            {navbarDictionary.profile}
          </MenuItem>
          <MenuItem
            icon={<ExitToAppRoundedIcon color="primary" />}
            onClick={() => {
              handleLogout();
              toggleNavbar();
            }}
          >
            {navbarDictionary.logout}
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default Navbar;
