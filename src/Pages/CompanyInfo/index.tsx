import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { appColor } from "../../theme/appColor";
import InfoIcon from "@mui/icons-material/Info";
import ImgUpload from "../../Images/dummy_image.webp";
import CloseIcon from "@mui/icons-material/Close";
import SaveAltIcon from '@mui/icons-material/SaveAlt';

const Category: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: appColor.blue[10],
        p: 2,
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Grid container>
        <Grid
          item
          lg={12}
          sx={{
            mt: 2,
          }}
        >
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 500,
              fontSize: "21px",
              color: appColor.black,
            }}
          >
            <InfoIcon sx={{ fontSize: 24, marginRight: "8px" }} />
            Company Information
          </Typography>
        </Grid>

        <Grid
          item
          lg={12}
          sx={{
            mt: 2,
            // pb: 5,
            maxHeight: "100%",
          }}
        >
          <Card
            sx={{
              p: 2,
              width: "100%",
              // height: "auto",
              boxShadow: "none",
              pb: 2,
            }}
          >
            <Grid container justifyContent="space-between">
              <Grid
                item
                lg={12}
                sx={{ borderBottom: 1, borderColor: appColor.greenSmoke[20] }}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                    margin: 1,
                    fontWeight: "bold",
                  }}
                >
                  Company Information
                </Typography>
              </Grid>
              <Grid item lg={2} p={2}>
                <Box
                  component="img"
                  src={ImgUpload}
                  alt="Company Image"
                  border={1}
                  borderColor={appColor.greenSmoke[20]}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    maxHeight: "100%",
                    maxWidth: "100%",
                  }}
                />
                <Button
                  variant="outlined"
                  color="error"
                  sx={{
                    fontSize: 13,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "auto",
                    mx: "auto",
                    mt: 2,
                    padding: "8px 16px",
                    cursor: "pointer",
                    borderColor: appColor.greenSmoke[20],
                  }}
                >
                  <CloseIcon sx={{ mr: 1 }} />
                  Remove Image
                </Button>
              </Grid>
              <Grid item lg={10} py={2}>
                <Grid container spacing={2}>
                  <Grid item lg={4}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      Company Name
                    </Typography>
                    <TextField
                      placeholder="Enter Company Name"
                      size="small"
                      sx={{ width: "100%" }}
                      InputProps={{
                        sx: {
                          fontSize: 14,
                        },
                      }}
                      InputLabelProps={{
                        sx: {
                          fontSize: 14,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item lg={4}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      Display Name
                    </Typography>
                    <TextField
                      placeholder="Enter Display Name"
                      size="small"
                      sx={{ width: "100%" }}
                      InputProps={{
                        sx: {
                          fontSize: 14,
                        },
                      }}
                      InputLabelProps={{
                        sx: {
                          fontSize: 14,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item lg={4}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      Address
                    </Typography>
                    <TextField
                      placeholder="Enter Company Address"
                      size="small"
                      sx={{ width: "100%" }}
                      InputProps={{
                        sx: {
                          fontSize: 14,
                        },
                      }}
                      InputLabelProps={{
                        sx: {
                          fontSize: 14,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item lg={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      Company Description
                    </Typography>
                    <TextField
                      placeholder="Company Description"
                      size="small"
                      sx={{ width: "100%" }}
                      InputProps={{
                        sx: {
                          fontSize: 14,
                        },
                      }}
                      InputLabelProps={{
                        sx: {
                          fontSize: 14,
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid
          item
          lg={12}
          sx={{
            mt: 2,
            // pb: 5,
            maxHeight: "100%",
          }}
        >
          <Card
            sx={{
              p: 2,
              width: "100%",
              // height: "auto",
              boxShadow: "none",
              pb: 2,
            }}
          >
            <Grid container justifyContent="space-between">
              <Grid
                item
                lg={12}
                sx={{ borderBottom: 1, borderColor: appColor.greenSmoke[20] }}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                    margin: 1,
                    fontWeight: "bold",
                  }}
                >
                  Opening Hours
                </Typography>
              </Grid>
              {[
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ].map((day, index) => (
                <Grid item lg={12} py={1} key={index}>
                  <Grid container spacing={2}>
                    <Grid item lg={1}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 400,
                          fontSize: 14,
                        }}
                      >
                        {day}
                      </Typography>
                    </Grid>
                    <Grid item lg={2}>
                      <TextField
                        select
                        size="small"
                        sx={{ width: "100%" }}
                        SelectProps={{
                          native: true,
                        }}
                        defaultValue=""
                        InputLabelProps={{ shrink: true }}
                      >
                        <option value="" disabled>
                          Hours
                        </option>
                        {Array.from(Array(24).keys()).map((hour) => (
                          <option
                            key={hour}
                            value={hour < 10 ? `0${hour}` : `${hour}`}
                          >
                            {hour < 10 ? `0${hour}` : `${hour}`}
                          </option>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item lg={2}>
                      <TextField
                        select
                        size="small"
                        sx={{ width: "100%" }}
                        SelectProps={{
                          native: true,
                        }}
                        defaultValue=""
                        InputLabelProps={{ shrink: true }}
                      >
                        <option value="" disabled>
                          Minutes
                        </option>
                        {Array.from(Array(60).keys()).map((minute) => (
                          <option
                            key={minute}
                            value={minute < 10 ? `0${minute}` : `${minute}`}
                          >
                            {minute < 10 ? `0${minute}` : `${minute}`}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item lg={2}>
                      <TextField
                        select
                        size="small"
                        sx={{ width: "100%" }}
                        SelectProps={{
                          native: true,
                        }}
                        defaultValue="AM"
                      >
                        {["AM", "PM"].map((period) => (
                          <option key={period} value={period}>
                            {period}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>

        <Grid
          item
          lg={12}
          sx={{
            mt: 2,
            mb: 5,
            // pb: 5,
            maxHeight: "100%",
          }}
        >
          <Button
          variant="contained"
          sx={{
            backgroundColor: "green",
            color: "white",
            mt: 2,
            textAlign: "left",
            borderRadius: 0,
            width: "auto",
            "&:hover": {
              backgroundColor: "green",
            },
            "&:active": {
              backgroundColor: "green",
            },
          }}>
            <SaveAltIcon sx={{ mr: 1 }} />
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Category;
