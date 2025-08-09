import React, { useContext, useEffect, useRef } from "react";
import Datepicker from "vanillajs-datepicker/Datepicker";
import az from "vanillajs-datepicker/locales/az";
import ru from "vanillajs-datepicker/locales/ru";
import { LanguageContext } from "../../LanguageContext";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  fetchAppointmentsByDate,
  fetchAllAppointmentDates,
} from "../../store/fetchs/appointmentActions";
import "vanillajs-datepicker/css/datepicker-bulma.css";
import "vanillajs-datepicker/css/datepicker.css";
import "../../assets/styles/User/Home/HomeCalendar.css";

let HomeCalendar = () => {
  const { language } = useContext(LanguageContext);
  const datepickerRef = useRef(null);
  const datepickerInstance = useRef(null);
  const dispatch = useDispatch();
  const allAppointmentDates = useSelector(
    (state) => state.appointment.allAppointmentDates
  );

  useEffect(() => {
    dispatch(fetchAllAppointmentDates());
    const today = dayjs().format("YYYY-MM-DD");
    dispatch(fetchAppointmentsByDate(today));
  }, [dispatch]);

  useEffect(() => {
    if (datepickerRef.current) {
      Object.assign(Datepicker.locales, az, ru);
      datepickerInstance.current = new Datepicker(datepickerRef.current, {
        autohide: false,
        format: "yyyy-MM-dd",
        inline: true,
        maxView: 1,
        todayHighlight: true,
        language: language,
        beforeShowDay: (date) => {
          const formattedDate = dayjs(date).format("YYYY-MM-DD");

          if (allAppointmentDates.some(([date]) => dayjs(date).add(1, 'day').format("YYYY-MM-DD")  === formattedDate)) {
            return {
              content: `<div class="day-with-point">${date.getDate()} <div class="custom-span"></div></div>`,
            };
          }
          return true;
        },
      });

      datepickerRef.current.addEventListener("changeDate", (event) => {
        const selectedDate = dayjs(event.detail.date)
          .format("YYYY-MM-DD");
        dispatch(fetchAppointmentsByDate(selectedDate));
      });
    }

    return () => {
      if (datepickerInstance.current) {
        datepickerInstance.current.destroy();
        datepickerInstance.current = null;
      }
    };
  }, [language, allAppointmentDates, dispatch]);

  return <div className="home-calendar-container" ref={datepickerRef}></div>;
};

export default HomeCalendar;
