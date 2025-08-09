import { useContext, useEffect } from "react";
import socialimg from "../../assets/images/social-icon.png";
import personalimg from "../../assets/images/personal-icon.png";
import shareimg from "../../assets/images/share-icon.png";
import doctorimg from "../../assets/images/doctor-icon.png";
import "../../assets/styles/User/Statistic/PatientsComeFrom.css";
import Translation from "../../language.json";
import { LanguageContext } from "../../LanguageContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppealStatistics } from "../../store/fetchs/statisticsActions";

let PatientsComeFrom = ({ dateRange }) => {
  const { language } = useContext(LanguageContext);
  const patientsComeFromDictionary = Translation[language].patientsComeFrom;
  const dispatch = useDispatch();
  const appealStatistics = useSelector(
    (state) => state.statistics.appealStatistics
  );

  useEffect(() => {
    if (dateRange) {
      dispatch(fetchAppealStatistics(dateRange));
    }
  }, [dispatch, dateRange]);

  return (
    <>
      <h4 className="statistic-patients-come-from-header">
        {patientsComeFromDictionary.header}
      </h4>
      <div className="statistic-patients-come-from-body">
        <div>
          <img src={socialimg} alt="social" />
          <div>{patientsComeFromDictionary.socialMedia}</div>
          <div style={{ color: "#426cff", fontSize: 40 }}>
            {appealStatistics.socialMedia}
          </div>
        </div>
        <div className="statistic-patients-come-from-doctor-referral-container">
          <img src={doctorimg} alt="doctor" />
          <div>{patientsComeFromDictionary.doctorReferral}</div>
          <div style={{ color: "#4de7e7", fontSize: 40 }}>
            {appealStatistics.doctorReferral}
          </div>
        </div>
        <div className="statistic-patients-come-from-clinic-referral-container"

        >
          <img src={shareimg} alt="share" />
          <div>{patientsComeFromDictionary.clinicReferral}</div>
          <div style={{ color: "#44e89b", fontSize: 40 }}>
            {appealStatistics.clinicReferral}
          </div>
        </div>
        <div>
          <img src={personalimg} alt="personal" />
          <div>{patientsComeFromDictionary.personal}</div>
          <div style={{ color: "#7747ff", fontSize: 40 }}>
            {appealStatistics.personal}
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientsComeFrom;
