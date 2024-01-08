import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Department from "../pages/Department";
import Employee from "../pages/Employee";
import Home from "../pages/Home";
import Login from "../pages/SignUp";

export const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/department" element={<Department />} />
      </Routes>
    </Router>
  );
};
