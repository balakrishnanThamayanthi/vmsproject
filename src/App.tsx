import React, { useContext } from "react";
import MiniDrawer from "./Drawer/Menu/Menu";
import AppRoutes from "./Drawer/Routes";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthContext, AuthProvider } from "./Pages/Login/AuthContext";
import Auth from "./Pages/Login";
import { Box } from "@mui/material";
import MainLayout from "./Pages/Main";
import { BASENAME } from "./config";
import { BrowserRouter } from "react-router-dom";
import LoginProvider from "./Pages/Login/LoginProvider";
import withAppProviders from "./withAppProviders";

const App: React.FC = () => {
  const theme = createTheme();

  return (
    <Box data-testid="pos-ui-app">
      <MainLayout>
        <BrowserRouter basename={BASENAME}>
          <LoginProvider>
            <Box>
              <MiniDrawer>
                <AppRoutes />
              </MiniDrawer>
            </Box>
          </LoginProvider>
        </BrowserRouter>
      </MainLayout>
    </Box>
    // <ThemeProvider theme={theme}>
    //   <AuthProvider>
    //     <Router>
    //       <Routes>
    //         <Route path="/login" element={<Auth />} />
    //         <Route
    //           path="/*"
    //           element={
    //             <ProtectedRoute>
    //               <MiniDrawer>
    //                 <AppRoutes />
    //               </MiniDrawer>
    //             </ProtectedRoute>
    //           }
    //         />
    //       </Routes>
    //     </Router>
    //   </AuthProvider>
    // </ThemeProvider>
  );
};

export default withAppProviders(App)();
