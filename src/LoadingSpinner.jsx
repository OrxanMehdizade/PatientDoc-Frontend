import React from "react";
import { GridLoader } from "react-spinners";
import { useLoading } from "./LoadingContext";

const LoadingSpinner = () => {
  const { loading } = useLoading();

  return (
    loading && (
      <div className="loading-overlay">
        {/* <ClockLoader color="#426CFF" size={120} speedMultiplier={3}/> */}
        <GridLoader color="#426CFF" size={40} margin={20}/>
      </div>
    )
  );
};

export default LoadingSpinner;
