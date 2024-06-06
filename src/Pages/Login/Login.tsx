import React, { useContext } from "react";
import { Box, Button, TextField } from "@mui/material";
import { appColor } from "../../theme/appColor";
import Logo from "../../Images/logo_main_black.webp";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  const { login } = authContext;

  const handleLogin = () => {
    login();
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        backgroundColor: appColor.white,
        boxShadow: 3,
        p: 5,
        maxWidth: 400,
        mx: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pb: 4,
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
        onClick={handleLogin}
      >
        Login
      </Button>
    </Box>
  );
};

export default React.memo(Login);
