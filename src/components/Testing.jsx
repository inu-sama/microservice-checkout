import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Testing() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("service");
  return (
    <div>
      <h1>{query}</h1>
    </div>
  );

  const maService = "datxe";

  onClick = () => {
    window.open("http://localhost:5173/?service=datXe");
  };
}
