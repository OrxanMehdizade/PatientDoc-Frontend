import React, { useContext, useState, useEffect } from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import Translation from "../../language.json";
import { LanguageContext } from "../../LanguageContext";
import dayjs from "dayjs";

const StatisticsButtonGroup = ({ onDateChange }) => {
  const { language } = useContext(LanguageContext);
  const statisticsButtonGroupDictionary =
    Translation[language].statisticButtonGroup;
  const [alignment, setAlignment] = useState("monthly");

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      updateDateRange(newAlignment);
    }
  };

  const updateDateRange = (newAlignment) => {
    let startDate, endDate;

    const today = new Date();
    switch (newAlignment) {
      case "monthly":
        startDate = dayjs().startOf("month").format("YYYY-MM-DD");
        endDate = dayjs().endOf("month").format("YYYY-MM-DD");
        break;
      case "all":
        startDate = null;
        endDate = null;
        break;
      default:
        break;
    }

    onDateChange({ startDate, endDate });
  };

  useEffect(() => {
    updateDateRange(alignment);
  }, []);

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
      color="primary"
    >
      <ToggleButton value="monthly" aria-label="right aligned">
        {statisticsButtonGroupDictionary.monthly}
      </ToggleButton>
      <ToggleButton value="all" aria-label="right aligned">
        {statisticsButtonGroupDictionary.allTime}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default StatisticsButtonGroup;
