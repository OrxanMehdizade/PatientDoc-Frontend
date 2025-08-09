import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RightSide from "../components/Auth/RightSide";
import Blob from "../components/Auth/Blob";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import AuthFooter from "../components/Auth/AuthFooter";
import AuthHeader from "../components/Auth/AuthHeader";
import AuthTwoStepVerification from "../components/Auth/AuthTwoStepVerification";
import CompleteRegistration from "../components/Auth/CompleteRegistration";
import ForgetPassword from "../components/Auth/ForgetPassword";
import "../assets/styles/Auth/Auth.css";

const Auth = () => {
  let { action } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate("/user");
      return;
    }
    if (
      action !== "login" &&
      action !== "register" &&
      action !== "forget-password" &&
      action !== "two-step-verification" &&
      action !== "complete-registration"
    ) {
      navigate("/error404");
    }
  }, [action, navigate]);

  const renderComponent = () => {
    if (action === "login") {
      return <Login />;
    } else if (action === "register") {
      return <Register />;
    } else if (action === "forget-password") {
      return <ForgetPassword />;
    } else if (action === "two-step-verification") {
      return <AuthTwoStepVerification />;
    } else if (action === "complete-registration") {
      return <CompleteRegistration />;
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left-side">
        <AuthHeader />
        <div className="auth-left-side-middle-container">
          {renderComponent()}
        </div>
        <AuthFooter />
      </div>
      <div className="auth-right-side">
        <RightSide />
        <Blob />
      </div>
    </div>
  );
};

export default Auth;
