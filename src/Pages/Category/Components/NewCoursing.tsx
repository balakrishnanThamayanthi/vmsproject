import React, { useMemo } from "react";
import {
  Box,
  Button,
  Card,
  Dialog,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import { useFormik } from "formik";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CloseIcon from "@mui/icons-material/Close";
import { useCreateCoursingMutation } from "../../../Api/attoDeskApi";
import { useNotifier } from "../../../Core/Notifier";
import { appColor } from "../../../theme/appColor";

interface ICoursing {
  openModel?: boolean;
  handleCloseDialog: (close: boolean) => void;
}

const Coursing = ({ openModel = false, handleCloseDialog }: ICoursing) => {
  const [open] = React.useState(openModel);
  const [newCoursing, { isLoading }] = useCreateCoursingMutation();
  const { showErrorMessage, showMessage } = useNotifier();
  const handleClose = () => {
    handleCloseDialog(false);
  };

  const formik = useFormik({
    initialValues: {
      coursingName: "",
      priocity: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const temData = {
          coursingName: values.coursingName,
          priocity: values.priocity,
        };

        const addCompanyResponse = await newCoursing(temData).unwrap();
        if (!addCompanyResponse.status) {
          showErrorMessage(addCompanyResponse.message);
        } else {
          showMessage("Company Created successfully");
          handleClose();
        }
      } catch (error) {
        showErrorMessage("Something went wrong");
      }
    },
  });

  const formValid = useMemo(() => {
    return formik.values.coursingName === "" ||
      formik.values.coursingName === undefined
      ? false
      : true;
  }, [formik]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Dialog open={open}>
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
                    New Coursing
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
                        placeholder="Enter Coursing Name"
                        size="small"
                        {...formik.getFieldProps("coursingName")}
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
                        Priocity
                      </Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                      <TextField
                        placeholder="Priocity"
                        size="small"
                        {...formik.getFieldProps("priocity")}
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
                    onClick={handleClose}
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
      </Dialog>
    </form>
  );
};

export default Coursing;