import React, { useMemo } from "react";
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { appColor } from "../../theme/appColor";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import { useCreateTaxMutation } from "../../Api/attoDeskApi";
import { useNotifier } from "../../Core/Notifier";
import { useFormik } from "formik";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CloseIcon from "@mui/icons-material/Close";

const Taxes: React.FC = () => {
  const [newTax, { isLoading }] = useCreateTaxMutation();
  const { showErrorMessage, showMessage } = useNotifier();

  const formik = useFormik({
    initialValues: {
      taxName: "",
      taxType: "",
      applyTo: "",
      percentage: "",
      taxCode: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const temData = {
          taxName: values.taxName,
          taxType: values.taxType,
          applyTo: values.applyTo,
          percentage: values.percentage,
          taxCode: values.taxCode,
        };

        const addCompanyResponse = await newTax(temData).unwrap();
        if (!addCompanyResponse.status) {
          showErrorMessage(addCompanyResponse.message);
        } else {
          showMessage("Tax Created successfully");
          resetForm();
        }
      } catch (error) {
        showErrorMessage("Something went wrong");
      }
    },
  });

  const formValid = useMemo(() => {
    return formik.values.taxName === "" ||
      formik.values.taxName === undefined ||
      formik.values.taxType === "" ||
      formik.values.taxType === undefined ||
      formik.values.applyTo === "" ||
      formik.values.applyTo === undefined ||
      formik.values.percentage === "" ||
      formik.values.percentage === undefined ||
      formik.values.taxCode === "" ||
      formik.values.taxCode === undefined
      ? false
      : true;
  }, [formik]);

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
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              sx={{
                p: 2,
                maxWidth: 900,
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
                  sx={{
                    borderBottom: 1,
                    borderColor: appColor.greenSmoke[20],
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
                    {/* <DomainAddIcon sx={{ fontSize: 24, marginRight: "8px" }} /> */}
                    New Tax
                  </Typography>
                </Grid>

                <Grid item lg={12} md={10} sm={12} xs={12} py={2}>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 400,
                          fontSize: 14,
                        }}
                      >
                        Name
                      </Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                      <TextField
                        placeholder="Enter Tax Name"
                        size="small"
                        {...formik.getFieldProps("taxName")}
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
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ mt: 1 }}
                  >
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 400,
                          fontSize: 14,
                        }}
                      >
                        Tax Type
                      </Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                      <TextField
                        select
                        size="small"
                        sx={{ width: "100%" }}
                        {...formik.getFieldProps("taxType")}
                        SelectProps={{
                          native: true,
                        }}
                        defaultValue=""
                        InputLabelProps={{ shrink: true }}
                      >
                        <option value="" disabled color="gray">
                          Select an option
                        </option>
                        <option>Percentage</option>
                      </TextField>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ mt: 1 }}
                  >
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 400,
                          fontSize: 14,
                        }}
                      >
                        Apply To
                      </Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                      <TextField
                        select
                        size="small"
                        sx={{ width: "100%" }}
                        {...formik.getFieldProps("applyTo")}
                        SelectProps={{
                          native: true,
                        }}
                        defaultValue=""
                        InputLabelProps={{ shrink: true }}
                      >
                        <option value="" disabled color="gray">
                          Select Apply To
                        </option>
                        <option>Goverment</option>
                        <option>Private</option>
                      </TextField>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ mt: 1 }}
                  >
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 400,
                          fontSize: 14,
                        }}
                      >
                        Percentage
                      </Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                      <TextField
                        placeholder="Enter Percentage"
                        size="small"
                        {...formik.getFieldProps("percentage")}
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
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ mt: 1 }}
                  >
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 400,
                          fontSize: 14,
                        }}
                      >
                        Tax Code
                      </Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                      <TextField
                        placeholder="Enter Tax Code"
                        size="small"
                        {...formik.getFieldProps("taxCode")}
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
                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button
                    variant="contained"
                    startIcon={<CloseIcon />}
                    sx={{
                      backgroundColor: "#b71c1c",
                      textTransform: "none",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "#b71c1c",
                        boxShadow: "none",
                      },
                      "&:active": {
                        backgroundColor: "#b71c1c",
                        boxShadow: "none",
                      },
                    }}
                    onClick={() => formik.resetForm()}
                  >
                    Cancel
                  </Button>
                  <Box m={0.5}></Box>
                  <Button
                    variant="contained"
                    startIcon={<SaveAltIcon />}
                    sx={{
                      backgroundColor: "green",
                      textTransform: "none",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "green",
                        boxShadow: "none",
                      },
                      "&:active": {
                        backgroundColor: "green",
                        boxShadow: "none",
                      },
                    }}
                    onClick={() => formik.handleSubmit()}
                    disabled={!formValid || isLoading}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default Taxes;
