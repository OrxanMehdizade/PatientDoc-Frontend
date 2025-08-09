import GeneralStatistics from "./GeneralStatistics";
import HomeCalendar from "./HomeCalendar";
import HomeVideo from "./HomeVideo";
import NewCards from "./NewCards";
import TodayAppointments from "./TodayAppointments";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllAppointmentDates } from "../../store/fetchs/appointmentActions";
import "../../assets/styles/User/Home/Home.css";

let Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllAppointmentDates());
  }, [dispatch]);

  return (
    <div className="home-container">
      <div className="home-new-cards">
        <NewCards />
      </div>
      <div className="home-general-statistics user-box-shadow">
        <GeneralStatistics />
      </div>
      <div className="home-calendar user-box-shadow">
        <HomeCalendar />
      </div>
      <div className="home-today-appointments user-box-shadow">
        <TodayAppointments />
      </div>
      <div className="home-video">
        <HomeVideo />
      </div>
    </div>
  );
};

export default Home;
