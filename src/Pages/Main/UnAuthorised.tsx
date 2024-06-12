import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const UnAuthorised = ({ ...props }) => {
  const handleButton = () => {
    window.location.href = "/";
  };

  return (
    <Box sx={{ textAlign: "center", margin: "20% auto" }} {...props}>
      <Typography variant="body2">
        Sorry you are not authorised, Please Login
      </Typography>
      <Button
        fullWidth
        onClick={handleButton}
        // sx={{ ...FallbackButtonStyle }}
        variant="outlined"
      >
        <Typography sx={{ textTransform: "uppercase" }} variant="body1">
          BACK TO HOME
        </Typography>
      </Button>
    </Box>
  );
};
