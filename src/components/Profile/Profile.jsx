import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProfileData } from '../../store/fetchs/profileActions';
import AppointmentOptions from './AppointmentOptions';
import ProfileInfo from './ProfileInfo';
import TreatmentOptions from './TreatmentOptions';
import '../../assets/styles/User/Profile/Profile.css';

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  return (
    <div className="user-profile-container user-box-shadow">
      <div className="user-profile-info">
        <ProfileInfo />
      </div>
      <div className="user-profile-appointment-options">
        <AppointmentOptions />
      </div>
      <div className="user-profile-treatment-options">
        <TreatmentOptions />
      </div>
    </div>
  );
};

export default Profile;
