/* eslint-disable react/display-name */
import React from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "./Store";
import { NotifierProvider } from "./Core/Notifier";
/**
 * Higher order function to wrap the application with redux store and other providers
 * @param {*} Component
 * @returns
 */
const withAppProviders =
  (Component: React.ComponentType) => (props?: object) => {
    const theme = createTheme();
    return () => (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <NotifierProvider>
            <CssBaseline />
            <Component {...props} />
          </NotifierProvider>
        </ThemeProvider>
      </Provider>
    );
  };

export default withAppProviders;
