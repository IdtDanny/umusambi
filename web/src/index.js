import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes,Navigate  } from "react-router-dom";
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import Tables from "views/examples/visitorOperations";
import Updatevisitor from "views/examples/updateVisitor";
import VisitationHistory from "views/examples/visitationHistory";
import Booking from "views/examples/Booking";
import AddVisitor from "views/examples/addVisitor";
import AuthLayout from "layouts/Auth.js"
import Dashboard from "views/examples/dashboard";
import LandingPage from "views/examples/LandingPage"

const root = ReactDOM.createRoot(document.getElementById("root"));
const isAuthenticated = () => {
  if (!(JSON.parse(localStorage.getItem("token")) == null)) {
    console.log("true")
    return false;
  }
  else {
    console.log("false")
    return true;
  }
}
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="addvisitor" element={<AddVisitor />} />
      <Route path="/booking/" element={<Booking />} />
      <Route path="/admin/" element={<Booking />} />
      <Route path="/history/*" element={<VisitationHistory />} />
      <Route path="/visitors" element={<Tables />} />
      <Route path="/update/:id" element={<Updatevisitor />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/" element={<LandingPage/>} />
      <Route path="/login" element={<AuthLayout />} />


    </Routes>
  </BrowserRouter>
);
