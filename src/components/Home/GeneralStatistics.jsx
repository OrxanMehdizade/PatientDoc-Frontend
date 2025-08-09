import Translation from "../../language.json";
import { useContext, useEffect } from "react";
import { LanguageContext } from "../../LanguageContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchGeneralStatistics } from "../../store/fetchs/statisticsActions";
import "../../assets/styles/User/Home/GeneralStatistics.css";

let GeneralStatistics = () => {
  const { language } = useContext(LanguageContext);
  const generalStatisticsDictionary = Translation[language].generalStatistics;
  const dispatch = useDispatch();
  const generalStatistics = useSelector(
    (state) => state.statistics.generalStatistics
  );

  useEffect(() => {
    const range = { startDate: null, endDate: null };
    dispatch(fetchGeneralStatistics(range));
  }, [dispatch]);

  return (
    <>
      <h4 className="home-general-statistics-header">
        {generalStatisticsDictionary.header}
      </h4>
      <div className="home-general-statistics-body">
        <div>
          <div>{generalStatisticsDictionary.appointments}</div>
          <div style={{ color: "#426CFF ", fontSize: 40 }}>
            {generalStatistics.totalAppointments}
          </div>
        </div>
        <div className="home-general-statistics-middle-div">
          <div>{generalStatisticsDictionary.treatments}</div>
          <div style={{ color: "#4DE7E7", fontSize: 40 }}>
            {generalStatistics.totalTreatments}
          </div>
        </div>
        <div>
          <div>{generalStatisticsDictionary.patients}</div>
          <div style={{ color: "#44E89B", fontSize: 40 }}>
            {generalStatistics.totalPatients}
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralStatistics;
