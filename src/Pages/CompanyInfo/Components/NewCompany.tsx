import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import React, { useMemo, useRef, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import ImgUpload from "../../../Images/dummy_image.webp";
import CloseIcon from "@mui/icons-material/Close";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { useFormik } from "formik";
import { useCreateCompanyMutation } from "../../../Api/attoDeskApi";
import { useNotifier } from "../../../Core/Notifier";
import { appColor } from "../../../theme/appColor";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Category: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string>(ImgUpload);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [newCompany, { isLoading }] = useCreateCompanyMutation();
  const { showErrorMessage, showMessage } = useNotifier();

  const formik = useFormik({
    initialValues: {
      companyName: "",
      displayName: "",
      address: "",
      description: "",
      openingHours: daysOfWeek.map(() => ({
        hour: "",
        minute: "",
      })),
      closingHours: daysOfWeek.map(() => ({
        hour: "",
        minute: "",
      })),
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const formattedOpeningHours = values.openingHours.map(
          ({ hour, minute }) => `${hour}:${minute}`
        );
        const formattedClosingHours = values.closingHours.map(
          ({ hour, minute }) => `${hour}:${minute}`
        );

        const temData = {
          companyName: values.companyName,
          displayName: values.displayName,
          address: values.address,
          description: values.description,
          openingHours: formattedOpeningHours,
          closingHours: formattedClosingHours,
        };

        const addCompanyResponse = await newCompany(temData).unwrap();
        if (!addCompanyResponse.status) {
          showErrorMessage(addCompanyResponse.message);
        } else {
          showMessage("Company Created successfully");
          resetForm();
        }
      } catch (error) {
        showErrorMessage("Something went wrong");
      }
    },
  });

  const formValid = useMemo(() => {
    return formik.values.companyName === "" ||
      formik.values.companyName === undefined ||
      formik.values.displayName === "" ||
      formik.values.displayName === undefined
      ? false
      : true;
  }, [formik]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImageSrc(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageSrc(ImgUpload);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          backgroundColor: "#e0e0e0",
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
              maxHeight: "100%",
            }}
          >
            <Card
              sx={{
                p: 2,
                width: "100%",
                boxShadow: "none",
                pb: 2,
              }}
            >
              <Grid container justifyContent="space-between">
                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  sx={{ borderBottom: 1, borderColor: appColor.greenSmoke[20] }}
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
                    {/* <InfoIcon sx={{ fontSize: 24, marginRight: "8px" }} /> */}
                    Company Information
                  </Typography>
                </Grid>
                <Grid item lg={2} md={12} sm={12} xs={12} p={2}>
                  <Box
                    component="img"
                    src={imageSrc}
                    alt="Company Image"
                    border={1}
                    borderColor={appColor.greenSmoke[20]}
                    onClick={handleImageClick}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      maxHeight: "100%",
                      maxWidth: "100%",
                      cursor: "pointer",
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
                    onClick={handleRemoveImage}
                  >
                    <CloseIcon sx={{ mr: 1 }} />
                    Remove Image
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </Grid>
                <Grid item lg={10} md={10} sm={12} xs={12} py={2}>
                  <Grid container spacing={2}>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
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
                        {...formik.getFieldProps("companyName")}
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
                    <Grid item lg={4} md={4} sm={12} xs={12}>
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
                        {...formik.getFieldProps("displayName")}
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
                    <Grid item lg={4} md={4} sm={12} xs={12}>
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
                        {...formik.getFieldProps("address")}
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
                    <Grid item lg={12} md={12} sm={12} xs={12}>
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
                        {...formik.getFieldProps("description")}
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
              maxHeight: "100%",
            }}
          >
            <Card
              sx={{
                p: 2,
                width: "100%",
                boxShadow: "none",
                pb: 2,
              }}
            >
              <Grid container justifyContent="space-between">
                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  sx={{ borderBottom: 1, borderColor: appColor.greenSmoke[20] }}
                >
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontWeight: 500,
                      fontSize: "16px",
                      color: appColor.black,
                    }}
                  >
                    Opening & Closing Hours
                  </Typography>
                </Grid>
                {daysOfWeek.map((day, index) => (
                  <Grid item lg={12} md={12} sm={12} xs={12} py={1} key={index}>
                    <Grid container spacing={2}>
                      <Grid item lg={2} md={2} sm={12} xs={12}>
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
                      <Grid item lg={2} md={2} sm={6} xs={6}>
                        <TextField
                          select
                          size="small"
                          {...formik.getFieldProps(
                            `openingHours[${index}].hour`
                          )}
                          sx={{ width: "100%" }}
                          SelectProps={{
                            native: true,
                          }}
                          defaultValue=""
                          InputLabelProps={{ shrink: true }}
                        >
                          <option value="" disabled>
                            Opening Hours
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

                      <Grid item lg={2} md={2} sm={6} xs={6}>
                        <TextField
                          select
                          size="small"
                          {...formik.getFieldProps(
                            `openingHours[${index}].minute`
                          )}
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

                      <Grid item lg={2} md={2} sm={6} xs={6}>
                        <TextField
                          select
                          size="small"
                          {...formik.getFieldProps(
                            `closingHours[${index}].hour`
                          )}
                          sx={{ width: "100%" }}
                          SelectProps={{
                            native: true,
                          }}
                          defaultValue=""
                          InputLabelProps={{ shrink: true }}
                        >
                          <option value="" disabled>
                            Closing Hours
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

                      <Grid item lg={2} md={2} sm={6} xs={6}>
                        <TextField
                          select
                          size="small"
                          {...formik.getFieldProps(
                            `closingHours[${index}].minute`
                          )}
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
              }}
              onClick={() => formik.handleSubmit()}
              disabled={!formValid || isLoading}
            >
              <SaveAltIcon sx={{ mr: 1 }} />
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default Category;
