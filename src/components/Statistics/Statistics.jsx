import React, { useState } from "react";
import PatientsComeFrom from "./PatientsComeFrom";
import StatisticsButtonGroup from "./StatisticsButtonGroup";
import StatisticGeneralStatistics from "./StatisticGeneralStatistics";
import "../../assets/styles/User/Statistic/Statistics.css";

let Statistics = () => {
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });

  const handleDateChange = (range) => {
    setDateRange(range);
  };

  return (
    <div className="user-statistics-container">
      <div className="statistics-button-group user-box-shadow">
        <StatisticsButtonGroup onDateChange={handleDateChange} />
      </div>
      <div className="statistics-general-statisics user-box-shadow">
        <StatisticGeneralStatistics dateRange={dateRange} />
      </div>
      <div className="statistics-patient-come-from user-box-shadow">
        <PatientsComeFrom dateRange={dateRange} />
      </div>
    </div>
  );
};

export default Statistics;
