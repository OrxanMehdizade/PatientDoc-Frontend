import { useContext, useEffect } from "react";
import Translation from "../../language.json";
import { LanguageContext } from "../../LanguageContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchGeneralStatistics } from "../../store/fetchs/statisticsActions";
import "../../assets/styles/User/Statistic/StatisticGeneralStatistics.css";

let StatisticGeneralStatistics = ({ dateRange }) => {
  const { language } = useContext(LanguageContext);
  const statisticGeneralStatisticsDictionary = Translation[language].statisticGeneralStatistics;
  const dispatch = useDispatch();
  const generalStatistics = useSelector((state) => state.statistics.generalStatistics);

  useEffect(() => {
    if (dateRange) {
      dispatch(fetchGeneralStatistics(dateRange));
    }
  }, [dispatch, dateRange]);

  return (
    <>
      <h4 className="statistic-general-statistics-header">
        {statisticGeneralStatisticsDictionary.header}
      </h4>
      <div className="statistic-general-statistics-body">
        <div>
          <div>{statisticGeneralStatisticsDictionary.appointments}</div>
          <div style={{ color: "#426CFF ", fontSize: 40 }}>
            {generalStatistics.totalAppointments}
          </div>
        </div>
        <div className="statistic-general-statistics-middle-container"
          
        >
          <div>{statisticGeneralStatisticsDictionary.treatments}</div>
          <div style={{ color: "#4DE7E7", fontSize: 40 }}>
            {generalStatistics.totalTreatments}
          </div>
        </div>
        <div>
          <div>{statisticGeneralStatisticsDictionary.patients}</div>
          <div style={{ color: "#44E89B", fontSize: 40 }}>
            {generalStatistics.totalPatients}
          </div>
        </div>
      </div>
    </>
  );
};

export default StatisticGeneralStatistics;
