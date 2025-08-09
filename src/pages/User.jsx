import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Home from "../components/Home/Home";
import Patients from "../components/Patients/Patients";
import MyCalendar from "./../components/Calendar/Calendar";
import Treatments from "./../components/Treatments/Treatments";
import Appointments from "./../components/Appointments/Appointments";
import Statistics from "./../components/Statistics/Statistics";
import Profile from "./../components/Profile/Profile";
import "../assets/styles/User/User.css";
import AddPatient from "../components/AddPatient/AddPatient";
import AddTreatment from "../components/AddTreatment/AddTreatment";
import EditPatient from "../components/EditPatient/EditPatient";
import { useDispatch } from "react-redux";
import ShowTreatment from "../components/ShowTreatment/ShowTreatment";
import EditTreatment from "../components/EditTreatment/EditTreatment";
import EditProfile from "../components/Profile/EditProfile";
import ChangePassword from "../components/Profile/ChangePassword";

const User = () => {
  let { action } = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  useEffect(() => {
    const handleAuthorization = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        navigate("/auth/login");
        return;
      }
    };

    handleAuthorization();
    const validActions = [
      "home",
      "patients",
      "calendar",
      "treatments",
      "appointments",
      "statistics",
      "add-treatment",
      "add-patient",
      "edit-patient",
      "profile",
      "show-treatment",
      "edit-treatment",
      "edit-profile",
      "change-password",
    ];

    if (!action) {
      navigate("home");
    } else if (!validActions.includes(action)) {
      navigate("/error404");
    }
  }, [action, navigate, dispatch]);

  const renderComponent = () => {
    if (action === "home") {
      return <Home />;
    } else if (action === "patients") {
      return <Patients />;
    } else if (action === "calendar") {
      return <MyCalendar />;
    } else if (action === "treatments") {
      return <Treatments />;
    } else if (action === "appointments") {
      return <Appointments />;
    } else if (action === "statistics") {
      return <Statistics />;
    } else if (action === "add-treatment") {
      return <AddTreatment />;
    } else if (action === "edit-patient") {
      return <EditPatient />;
    } else if (action === "add-patient") {
      return <AddPatient />;
    } else if (action === "change-password") {
      return <ChangePassword />;
    } else if (action === "edit-profile") {
      return <EditProfile />;
    } else if (action === "edit-treatment") {
      return <EditTreatment />;
    } else if (action === "show-treatment") {
      return <ShowTreatment />;
    } else if (action === "profile") {
      return <Profile />;
    }
  };

  return (
    <div className="user-container">
      <div className="user-header">
        <Header toggleNavbar={toggleNavbar} />
      </div>
      <div className="user-main-container">{renderComponent()}</div>
      <div className="user-navbar">
        <Navbar isOpen={navbarOpen} toggleNavbar={toggleNavbar} />
      </div>
    </div>
  );
};

export default User;
