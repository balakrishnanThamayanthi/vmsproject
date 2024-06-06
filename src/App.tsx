import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MiniDrawer from "./Drawer/Menu/Menu";
import AppRoutes from "./Drawer/Routes";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LoginProvider from "./Pages/Login/LoginProvider"; // Correct casing
import { Box } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
  const theme = createTheme(); 

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename='/'>
        {/* <LoginProvider> */}
          <Box>
            <MiniDrawer>
              <AppRoutes />
            </MiniDrawer>
          </Box>
        {/* </LoginProvider> */}
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
