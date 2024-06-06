import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import MiniDrawer from "./Drawer/Menu/Menu";
import AppRoutes from "./Drawer/Routes";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthContext, AuthProvider } from "./Pages/Login/AuthContext";
import Auth from "./Pages/Login";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  const { isAuthenticated } = authContext;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Auth />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <MiniDrawer>
                    <AppRoutes />
                  </MiniDrawer>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
