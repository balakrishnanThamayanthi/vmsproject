import React, { useContext, useMemo } from "react";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { appColor } from "../../theme/appColor";
import Logo from "../../Images/logo_main_black.webp";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useAppDispatch } from "../../Store/hooks";
import { useNotifier } from "../../Core/Notifier";
import { useLoginMutation } from "../../Api/attoDeskApi";
import { useFormik } from "formik";
import { IAuth } from "../../Api/Interface/api.interface";
import { setEnableAuth } from "../../Store/Auth/AuthSlice";

const Login: React.FC = () => {
  // const navigate = useNavigate();
  // const authContext = useContext(AuthContext);

  // if (!authContext) {
  //   return null;
  // }

  // const { login } = authContext;

  // const handleLogin = () => {
  //   login();
  //   navigate("/dashboard");
  // };
  const dispatch = useAppDispatch();
  const { showErrorMessage } = useNotifier();
  const [login, { isLoading }] = useLoginMutation();
  //Form validation
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const loginResponse = await login(values).unwrap();
        if (!loginResponse.status) {
          showErrorMessage(loginResponse.message);
        } else {
          const tokenData = loginResponse.data as IAuth;
          localStorage.setItem("token", tokenData.token);
          dispatch(setEnableAuth());
        }
      } catch (error) {
        showErrorMessage("Please check you username or password");
      }

      // navigate('/dashboard');
    },
  });
  const formValid = useMemo(() => {
    return formik.values.username === "" || formik.values.password === ""
      ? false
      : true;
  }, [formik]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          backgroundColor: appColor.white,
          boxShadow: 3,
          p: 5,
          maxWidth: 500,
          height: "auto",
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
          {...formik.getFieldProps('username')}
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
          {...formik.getFieldProps('password')}
        />
        <Button
          variant="contained"
          disabled={!formValid || isLoading}
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
          // onClick={handleLogin}
        >
          {isLoading && (
            <Box sx={{ pr: 2, pt: 0.5 }}>
              <CircularProgress size={16} sx={{ color: "white" }} />
            </Box>
          )}
          Login
        </Button>
      </Box>
    </form>
  );
};

export default React.memo(Login);
