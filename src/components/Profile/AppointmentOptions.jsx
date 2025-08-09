import React, { useContext, useEffect, useState } from "react";
import { MenuItem, Select } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch, useSelector } from "react-redux";
import { setAppointmentDuration } from "../../store/fetchs/appointmentActions"; // Adjust the path as necessary
import dayjs from "dayjs";
import Translation from "../../language.json";
import { LanguageContext } from "../../LanguageContext";

const AppointmentOptions = () => {
  const { language } = useContext(LanguageContext);
  const appointmentOptionsDictionary = Translation[language].appointmentOptions;

  const dispatch = useDispatch();
  const [smsOption, setSmsOption] = useState("immediate");
  const [selectedTime, setSelectedTime] = useState(null);
  const duration = useSelector(
    (state) => state.profile.profile?.appointmentDuration
  );

  useEffect(() => {
    if (duration) {
      const [hour, minute] = duration.split(":");
      setSelectedTime(dayjs().hour(hour).minute(minute));
    }
  }, [duration]);

  const handleAppointmentDuration = (newTime) => {
    setSelectedTime(newTime);
    dispatch(setAppointmentDuration(newTime.format("HH:mm:ss"))); // Ensure the time format matches the backend requirement
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <p>{appointmentOptionsDictionary.smsSendingLabel}</p>
        <Select
          value={smsOption}
          onChange={(event) => {
            setSmsOption(event.target.value);
          }}
          inputProps={{ "aria-label": "Without label" }}
          size="small"
        >
          <MenuItem value="immediate">
            {appointmentOptionsDictionary.immediateOption}
          </MenuItem>
          <MenuItem value="onedaybefore">
            {appointmentOptionsDictionary.oneDayBeforeOption}
          </MenuItem>
        </Select>
      </div>
      <div className="appointment-duration-input">
        <p>{appointmentOptionsDictionary.durationLabel}</p>
        <MobileTimePicker
          value={selectedTime}
          onChange={(newTime) => {
            handleAppointmentDuration(newTime);
          }}
          ampm={false}
          openTo="minutes"
        />
      </div>
    </LocalizationProvider>
  );
};

export default AppointmentOptions;
