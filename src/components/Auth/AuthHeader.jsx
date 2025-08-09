import logo from "../../assets/images/logo.png";
import FlagSelect from "../FlagSelect.jsx";
import "../../assets/styles/Auth/AuthHeader.css";

let AuthHeader = () => {
  return (
    <div className="auth-header-container">
      <img height={35} src={logo} alt="logo" />
      <FlagSelect />
    </div>
  );
};

export default AuthHeader;
