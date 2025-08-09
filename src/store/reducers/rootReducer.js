import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import patientReducer from "./patientReducer";
import treatmentReducer from "./treatmentReducer";
import treatmentFormReducer from "./treatmentFormReducer";
import serviceReducer from "./serviceReducer";
import medicineReducer from "./medicineReducer";
import diagnoseReducer from "./diagnoseReducer";
import appointmentReducer from "./appointmentReducer";
import statisticsReducer from "./statisticsReducer";
import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  appointment: appointmentReducer,
  patient: patientReducer,
  treatment: treatmentReducer,
  treatmentForm: treatmentFormReducer,
  service: serviceReducer,
  medicine: medicineReducer,
  diagnose: diagnoseReducer,
  statistics: statisticsReducer,
  profile: profileReducer,
});

export default rootReducer;
