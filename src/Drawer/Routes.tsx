import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import { Loader } from "../Components/Loader";



/**
 * AppRoutes will load the app routes.
 * @returns
 */
const AppRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <Suspense fallback={<Loader />}>{/* <Fallback /> */}</Suspense>
        }
        path="/fallback"
      />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route element={<Navigate replace to="/dashboard" />} path="*" />
    </Routes>
  );
};

export default AppRoutes;
