import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useNavigate } from "react-router-dom";
import Translation from "../../language.json";
import { LanguageContext } from "./../../LanguageContext";
import "../../assets/styles/User/Profile/ProfileInfo.css";

const ProfileInfo = () => {
  const { language } = useContext(LanguageContext);
  const profileInfoDictionary = Translation[language].profileInfo;

  const profile = useSelector((state) => state.profile.profile);
  const navigate = useNavigate();

  return (
    <>
      <div className="profile-info-left-side">
        <img src={profile?.profileImageUrl} alt="profile" />
      </div>
      <div className="profile-info-right-side">
        <div className="profile-info-head">
          <h2>Dr. {profile?.fullName}</h2>
          <Button
            variant="contained"
            className="app-theme-color"
            onClick={() => {
              navigate("/user/edit-profile");
            }}
          >
            <EditRoundedIcon />
          </Button>
        </div>
        <div className="profile-info-body">
          <div>
            <p className="profile-info-body-head">
              {profileInfoDictionary.hospitalLabel}
            </p>
            <p className="profile-info-body-content">
              {profile?.hospitalName || profileInfoDictionary.empty}
            </p>
          </div>
          <div>
            <p className="profile-info-body-head">
              {profileInfoDictionary.emailLabel}
            </p>
            <p className="profile-info-body-content">
              {profile?.email || profileInfoDictionary.empty}
            </p>
          </div>
          <div>
            <p className="profile-info-body-head">
              {profileInfoDictionary.specializationLabel}
            </p>
            <p className="profile-info-body-content">
              {profile?.specialization || profileInfoDictionary.empty}
            </p>
          </div>
          <div>
            <p className="profile-info-body-head">
              {profileInfoDictionary.phoneLabel}
            </p>
            <p className="profile-info-body-content">
              {profile?.phone || profileInfoDictionary.empty}
            </p>
          </div>
          <div>
            <p className="profile-info-body-head">
              {profileInfoDictionary.workPhoneLabel}
            </p>
            <p className="profile-info-body-content">
              {profile?.workPhone || profileInfoDictionary.empty}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
