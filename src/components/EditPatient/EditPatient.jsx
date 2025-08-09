import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddPatient from "../AddPatient/AddPatient";
import { fetchPatientById } from "../../store/fetchs/patientActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLoading } from "../../LoadingContext";
import PatientTreatments from "./PatientTreatments";
import PatientAppointments from "./PatientAppointments";

const EditPatient = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { setLoading } = useLoading();
  const patientData = useSelector((state) => state.patient.patientData);
  const [patient, setPatient] = useState({
    name: "",
    surname: "",
    fatherName: "",
    phone: "",
    birthday: null,
    gender: "",
    address: "",
    email: "",
    insurance: "",
    doctorReferral: "",
  });

  const [appointments, setAppointments] = useState([]);
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    const getPatient = async () => {
      setLoading(true);
      try {
        await dispatch(fetchPatientById(id));
      } catch (error) {
        setLoading(false);
        toast.error(error.message || "Error fetching patient data");
      } finally {
        setLoading(false);
      }
    };

    getPatient();
  }, [dispatch, id, setLoading]);

  useEffect(() => {
    if (patientData) {
      setPatient({
        id: id,
        name: patientData.name,
        surname: patientData.surname,
        fatherName: patientData.fatherName,
        birthday: patientData.birthDate
          ? patientData.birthDate.split("T")[0]
          : null,
        address: patientData.address,
        doctorReferral: patientData.doctorReferral,
        phone: patientData.phoneNumber,
        email: patientData.email,
        gender: patientData.gender,
        insurance: patientData.insurance,
      });

      setAppointments(patientData.appointments);
      setTreatments(patientData.treatments);
    }
  }, [id, patientData]);

  return (
    <div>
      <AddPatient patient={patient} />
      {treatments.length === 0 || (
        <PatientTreatments patientId={id} treatments={treatments} />
      )}
      {appointments.length === 0 || (
        <PatientAppointments patientId={id} appointments={appointments} />
      )}
    </div>
  );
};

export default EditPatient;
