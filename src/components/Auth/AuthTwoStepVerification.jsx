import { useContext, useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOTPFetch,
  resendOtpFetch,
} from "./../../store/fetchs/authActions";
import Pace from "pace-js";
import { toast } from "react-toastify";
import {
  checkEmailFailure,
  confirmOTPFailure,
} from "../../store/reducers/authReducer";
import Translation from "../../language.json";
import { LanguageContext } from "../../LanguageContext";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/styles/Auth/AuthTwoStepVerification.css";
import { useLoading } from "../../LoadingContext";

let AuthTwoStepVerification = () => {
  const { setLoading } = useLoading();
  const { language } = useContext(LanguageContext);
  let twoStepVerificationDictionary = Translation[language].twoStepVerification;
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const email = useSelector((state) => state.auth.email); // Get email from redux state

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const handleResendOtp = () => {
    Pace.restart(); // Start Pace.js loading animation
    setLoading(true);
    dispatch(resendOtpFetch(email))
      .then(() => {
        Pace.stop(); // Stop Pace.js loading animation
        setLoading(false);
      })
      .catch((error) => {
        Pace.stop(); // Stop Pace.js loading animation
        setLoading(false);
        toast.error(error.message); // Show error notification
        dispatch(checkEmailFailure(error.message));
      });
  };

  const handleConfirmOTP = () => {
    if (otp.length === 4) {
      console.log(email);
      Pace.restart(); // Start Pace.js loading animation
      setLoading(true);
      dispatch(confirmOTPFetch(email, otp))
        .then(() => {
          Pace.stop(); // Stop Pace.js loading animation
          setLoading(false);
          navigate("/auth/complete-registration");
        })
        .catch((error) => {
          Pace.stop(); // Stop Pace.js loading animation
          setLoading(false);
          toast.error(error.message); // Show error notification
          dispatch(confirmOTPFailure(error.message));
        });
    } else {
      toast.error("OTP is not complete");
    }
  };

  return (
    <div className="auth-two-step-verification-container">
      <h2>{twoStepVerificationDictionary.verifyNumber}</h2>
      <p>{twoStepVerificationDictionary.enterCode}</p>
      <div className="auth-two-step-verification-input">
        <MuiOtpInput
          value={otp}
          onChange={handleChange}
          length={4}
          autoFocus
          gap={5}
        />
      </div>
      <div className="auth-two-step-verification-input">
        <Button
          variant="contained"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#426CFF",
            textTransform: "none",
          }}
          onClick={handleConfirmOTP}
          disabled={otp.length !== 4} // Disable button if OTP is not complete
        >
          {twoStepVerificationDictionary.next}
        </Button>
      </div>
      <p>
        {twoStepVerificationDictionary.resendCode}
        <button
          onClick={handleResendOtp}
          style={{
            border: "none",
            backgroundColor: "transparent",
            color: "#426CFF",
            cursor: "pointer",
          }}
        >
          {twoStepVerificationDictionary.click}
        </button>
      </p>
      <Button
        onClick={() => {
          navigate("/auth/register");
        }}
      >
        {twoStepVerificationDictionary.back}
      </Button>
    </div>
  );
};

export default AuthTwoStepVerification;
