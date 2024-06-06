import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { appColor } from "../../theme/appColor";
import Logo from "../../Images/logo_main_black.webp";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, Theme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const Login: React.FC = () => {
  const theme = useTheme<Theme>();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate(); // Use useNavigate hook

  // Function to handle login button click
  const handleLogin = () => {
    // Redirect to /dashboard path
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        backgroundColor: appColor.white,
        boxShadow: 3,
        p: 5,
        maxWidth: 400,
        mx: "auto",
        position: "relative", 
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pb: 4,
          position: "relative", 
        }}
      >
        <img
          src={Logo}
          alt="AttoDesk Login"
          style={{ width: "100%", height: "auto", display: "block" }} 
        />
      </Box>
      <TextField
        fullWidth
        variant="filled"
        label="Username"
        margin="normal"
        sx={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #CCCCCC",
        }}
      />
      <TextField
        fullWidth
        variant="filled"
        label="Password"
        type="password"
        margin="normal"
        sx={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #CCCCCC",
        }}
      />
      <Button
        variant="contained"
        sx={{
          backgroundColor: appColor.black,
          color: "white",
          mt: 2,
          textAlign: "left",
          borderRadius: 0,
          width: "auto",
          "&:hover": {
            backgroundColor: appColor.black,
          },
          "&:active": {
            backgroundColor: appColor.black,
          },
        }}
        type="submit"
        onClick={handleLogin} // Call handleLogin function on button click
      >
        Login
      </Button>
    </Box>
  );
};

export default React.memo(Login);