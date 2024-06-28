import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "../Components/Loader";

import Dashboard from "../Pages/Dashboard";
import CompanyInfo from "../Pages/CompanyInfo";
import Category from "../Pages/Category";
import ProductBrand from "../Pages/ProductBrand";
import Department from "../Pages/Department";
import Coursing from "../Pages/Coursing";
import Tax from "../Pages/Tax";

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
      <Route
        path="/dashboard"
        element={
          <Suspense fallback={<Loader />}>
            <Dashboard />
          </Suspense>
        }
      />
      <Route
        path="/company-info"
        element={
          <Suspense fallback={<Loader />}>
            <CompanyInfo />
          </Suspense>
        }
      />
      <Route
        path="/category"
        element={
          <Suspense fallback={<Loader />}>
            <Category />
          </Suspense>
        }
      />
      <Route
        path="/department"
        element={
          <Suspense fallback={<Loader />}>
            <Department />
          </Suspense>
        }
      />
      <Route
        path="/coursing"
        element={
          <Suspense fallback={<Loader />}>
            <Coursing />
          </Suspense>
        }
      />
      <Route
        path="/taxes"
        element={
          <Suspense fallback={<Loader />}>
            <Tax />
          </Suspense>
        }
      />
      <Route
        path="/product/brand"
        element={
          <Suspense fallback={<Loader />}>
            <ProductBrand />
          </Suspense>
        }
      />
      <Route element={<Navigate replace to="/dashboard" />} path="*" />
    </Routes>
  );
};

export default AppRoutes;
