import React, { useContext } from "react";
import videoimg from "../../assets/images/video-image.png";
import Translation from "../../language.json";
import { LanguageContext } from "../../LanguageContext";
let HomeVideo = () => {
  const { language } = useContext(LanguageContext);
  const homeVideoDictionary = Translation[language].homeVideo;

  return (
    <a
      href="https://www.youtube.com/watch?v=00xIbMCVk3U"
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "flex", textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
      >
        <p>{homeVideoDictionary.video}</p>
        <p>{homeVideoDictionary.description}</p>
      </div>
      <img src={videoimg} alt="video" />
    </a>
  );
};

export default HomeVideo;
