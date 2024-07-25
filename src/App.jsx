import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import DanhSachSanBay from "./components/DanhSachSanBay";
import Footer from "./components/Footer";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="font-sans">
      <Router>
        <Header />
        <MainPage />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
