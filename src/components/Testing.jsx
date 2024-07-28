import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";

export default function Testing() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("service");
  // window.open(
  //   "http://localhost:5173/?service=abc&checkoutid=669f3567087ce4f213f767a8"
  // );
  return (
    <div>
      <h1>{query}</h1>
    </div>
  );
}
