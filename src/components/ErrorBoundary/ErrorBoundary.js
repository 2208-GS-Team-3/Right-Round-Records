import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import "./errorBoundary.css";

const ErrorBoundary = () => {
  return (
    <div id="error-page">
      <CssBaseline />
      <img
        src="/static/page-not-found-puppy.png"
        alt="A cute puppy covered in paint saying that there was an error."
        id="error-puppy-img"
      />
    </div>
  );
};

export default ErrorBoundary;
