import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import Footer from "./components/Footer";
import "./App.css";
import Testing from "./components/Testing";
import CreateVoucher from "./components/CreateVoucher";
import UpdateVoucher from "./components/UpdateVoucher";
import GetListVoucher from "./components/GetListVoucher";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="font-sans">
      <Router>
        <Testing />
        {/* <GetListVoucher /> */}
        {/* <UpdateVoucher /> */}
        {/* <CreateVoucher /> */}
      </Router>
    </div>
  );
}

export default App;
