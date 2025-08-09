import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../LanguageContext";
import Translation from "../../language.json";
import { useContext, useState } from "react";
import NewAppointment from "../AddAppointment/NewAppointment";
import "../../assets/styles/User/Home/NewCard.css";

let NewCards = () => {
  const { language } = useContext(LanguageContext);
  const newCardsDictionary = Translation[language].newCards;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div
        className="home-new-card"
        onClick={() => {
          navigate("/user/add-patient");
        }}
      >
        <PeopleAltRoundedIcon className="home-card-img" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <p>{newCardsDictionary.newPatient}</p>
          <ControlPointRoundedIcon style={{ paddingLeft: 5, color: "white" }} />
        </div>
      </div>
      <div
        className="home-new-card"
        onClick={() => {
          navigate("/user/add-treatment");
        }}
      >
        <ListAltRoundedIcon className="home-card-img" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <p>{newCardsDictionary.newTreatment}</p>
          <ControlPointRoundedIcon style={{ paddingLeft: 5, color: "white" }} />
        </div>
      </div>
      <div className="home-new-card" onClick={handleOpen}>
        <EventNoteRoundedIcon className="home-card-img" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <p>{newCardsDictionary.newAppointment}</p>
          <ControlPointRoundedIcon style={{ paddingLeft: 5, color: "white" }} />
        </div>
      </div>
      <NewAppointment open={open} handleClose={handleClose} />
    </>
  );
};

export default NewCards;
