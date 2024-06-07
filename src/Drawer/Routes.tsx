import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "../Components/Loader";

import Dashboard from "../Pages/Dashboard";
import CompanyInfo from "../Pages/CompanyInfo";
import Category from "../Pages/Category";
import Item from "../Pages/Item";


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
      <Route path="/company-info" element={<CompanyInfo />} />
      <Route path="/category" element={<Category />} />
      <Route path="/item" element={<Item />} />
      <Route element={<Navigate replace to="/dashboard" />} path="*" />
    </Routes>
  );
};

export default AppRoutes;
