import React, { useState, useEffect, useContext } from "react";
import { TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfileData,
  updateProfileData,
} from "./../../store/fetchs/profileActions";
import PhoneNumber from "./../PhoneNumber";
import UploadFile from "../UploadFile";
import { useNavigate } from "react-router-dom";
import Translation from "../../language.json";
import { LanguageContext } from "../../LanguageContext";
import "../../assets/styles/User/Profile/EditProfile.css";

const EditProfile = () => {
  const { language } = useContext(LanguageContext);
  const editProfileDictionary = Translation[language].editProfile;
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    workPhone: "",
    hospital: "",
    specialization: "",
    profilePhoto: "",
  });
  const [image, setImage] = useState("");
  const profileData = useSelector((state) => state.profile.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  useEffect(() => {
    if (profileData) {
      setProfile({
        fullName: profileData.fullName,
        email: profileData.email,
        phone: `+${profileData.phone}`,
        workPhone: profileData.workPhone,
        hospital: profileData.hospitalName,
        specialization: profileData.specialization,
        profilePhoto: profileData.profileImageUrl,
      });
    }
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const updatedProfileData = {
      email: profile.email,
      workPhone: profile.workPhone,
      hospitalName: profile.hospital,
      specialization: profile.specialization,
      profilePictureImageUrl: image || profile.profilePhoto,
    };
    dispatch(updateProfileData(updatedProfileData));
    navigate("/user/profile");
  };

  const handleChangePassword = () => {
    navigate("/user/change-password");
  };

  return (
    <div className="edit-profile-container user-box-shadow">
      <h2>{editProfileDictionary.header}</h2>
      <div className="edit-profile-input-container">
        <div className="edit-profile-label-input-container">
          <label>{editProfileDictionary.fullNameLabel}</label>
          <TextField
            value={profile.fullName}
            onChange={handleChange}
            variant="outlined"
            disabled
            size="small"
          />
        </div>
        <div className="edit-profile-label-input-container">
          <label>{editProfileDictionary.emailLabel}</label>
          <TextField
            name="email"
            value={profile.email}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
        </div>

        <PhoneNumber phone={profile.phone} disabled={true} />

        <Button
          variant="outlined"
          className="edit-profile-change-password-btn"
          onClick={handleChangePassword}
        >
          {editProfileDictionary.changePasswordButton}
        </Button>
      </div>
      <div className="edit-profile-input-container">
        <div className="edit-profile-label-input-container">
          <label>{editProfileDictionary.workPhoneLabel}</label>
          <TextField
            name="workPhone"
            value={profile.workPhone}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
        </div>
        <div className="edit-profile-label-input-container">
          <label>{editProfileDictionary.hospitalLabel}</label>
          <TextField
            name="hospital"
            value={profile.hospital}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
        </div>
        <div className="edit-profile-label-input-container">
          <label>{editProfileDictionary.specializationLabel}</label>
          <TextField
            name="specialization"
            value={profile.specialization}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
        </div>
        <UploadFile
          className="edit-profile-upload-photo-btn"
          content={editProfileDictionary.uploadPhotoButton}
          setImageUrl={setImage}
        />
      </div>
      <Button
        variant="contained"
        className="edit-profile-save-btn app-theme-color"
        onClick={handleSave}
      >
        {editProfileDictionary.saveButton}
      </Button>
    </div>
  );
};

export default EditProfile;
