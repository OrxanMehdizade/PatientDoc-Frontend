import React, { useContext } from "react";
import { MuiTelInput } from "mui-tel-input";
import { LanguageContext } from "../LanguageContext";
import Translation from "../language.json";

const PhoneNumber = ({ phone, setPhone, disabled = false }) => {
  const { language } = useContext(LanguageContext);

  const handleChange = (newPhone) => {
    setPhone(newPhone);
  };

  return (
    <div>
      <label htmlFor="phone-input">
        <strong>{Translation[language].phoneNumber}</strong>
      </label>
      <MuiTelInput
        style={{ marginTop: 0, marginBottom: 0 }}
        id="phone-input"
        fullWidth
        defaultCountry="AZ"
        value={phone}
        onChange={handleChange}
        size="small"
        disabled={disabled}
      />
    </div>
  );
};

export default PhoneNumber;
