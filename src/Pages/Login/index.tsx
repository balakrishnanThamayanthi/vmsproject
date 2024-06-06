import React from "react";
import { Box, Grid } from "@mui/material";
import LoginImg from "../../Images/atto_desk_login_background.webp";
import Login from "./Login";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, Theme } from '@mui/material/styles';

const Auth: React.FC = () => {
  const theme = useTheme<Theme>();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box>
      <Grid
        container
        sx={{
          position: "relative", 
          height: "100vh",
        }}
      >
        <Box
          component="img"
          src={LoginImg}
          alt="Background"
          sx={{
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", 
          }}
        />

        <Grid
          container
          justifyContent="flex-end"
          alignItems="center"
          sx={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            mr: isSmall ? 0 : 20,
          }}
        >
          <Grid item lg={4} md={6} sm={8} xs={10}>
            <Login />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Auth;
