import { MenuItem, Select } from "@mui/material";
import azFlag from "../assets/images/az.png";
import enFlag from "../assets/images/us.jpg";
import ruFlag from "../assets/images/russia.jpg";
import { useContext } from "react";
import { LanguageContext } from "../LanguageContext";

let FlagSelect = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  
  return (
    <Select
      defaultValue={language}
      onChange={(e) => setLanguage(e.target.value)}
      variant="outlined"
      sx={{
        width: 60,
        height: 60,
        color: "#fff",
        "& .MuiOutlinedInput-input": {
          paddingLeft: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "& .MuiSvgIcon-root": {
          display: "none",
        },
      }}
    >
      <MenuItem
        value="az"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <img height={20} src={azFlag} alt="Azerbaijan Flag" />
      </MenuItem>
      <MenuItem
        value="en"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <img height={20} src={enFlag} alt="English Flag" />
      </MenuItem>
      <MenuItem
        value="ru"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <img height={20} src={ruFlag} alt="Russian Flag" />
      </MenuItem>
    </Select>
  );
};

export default FlagSelect;
