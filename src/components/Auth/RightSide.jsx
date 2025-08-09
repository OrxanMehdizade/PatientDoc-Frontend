import { Container } from "@mui/material";
import laptop from "../../assets/images/auth_mac.png";
import Translation from "../../language.json";
import { LanguageContext } from "../../LanguageContext";
import { useContext } from "react";

let RighSide = () => {
  const { language } = useContext(LanguageContext);
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p style={{ color: "white", fontSize: 26 }}>
        {Translation[language].auth}
      </p>
      <img className="auth-laptop" src={laptop} alt="laptop" />
    </Container>
  );
};

export default RighSide;
