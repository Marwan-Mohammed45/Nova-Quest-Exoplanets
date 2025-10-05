import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="spinner">
        <div className="orbit"></div>
        <div className="planet"></div>
        <div className="moon"></div>
      </div>
      <p className="loading-text">Exploring the cosmos...</p>
    </div>
  );
};

export default LoadingSpinner;
