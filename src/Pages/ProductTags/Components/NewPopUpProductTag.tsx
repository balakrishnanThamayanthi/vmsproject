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
import { useFormik } from "formik";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { useNotifier } from "../../../Core/Notifier";
import { appColor } from "../../../theme/appColor";
import { useCreateProductTagMutation } from "../../../Api/attoDeskApi";
import { IProductTag } from "../../../Api/Interface/api.interface";

interface IProductTagPopUp {
  openModel?: boolean;
  handleCloseDialog: (close: boolean) => void;
  data?: IProductTag;
}

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(28px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 30, // Increased thumb size
    height: 30, // Increased thumb size
  },
  "& .MuiSwitch-track": {
    borderRadius: 34 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#757575" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&::before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`, // Using SVG path for check
      left: 12,
    },
    "&::after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`, // Using SVG path for minus
      right: 12,
    },
  },
}));

const ProductTag = ({
  openModel = false,
  handleCloseDialog,
  data,
}: IProductTagPopUp) => {
  const [open] = React.useState(openModel);
  const [newCoursing, { isLoading }] = useCreateProductTagMutation();
  const { showErrorMessage, showMessage } = useNotifier();
  const handleClose = () => {
    handleCloseDialog(false);
  };

  const formik = useFormik({
    initialValues: {
      id: data?.id,
      tagName: data?.tagName || "",
      isActive: data?.isActive || false,
    },
    onSubmit: async (values) => {
      try {
        const temData = {
          id: values?.id,
          tagName: values.tagName,
          isActive: values.isActive,
        };
        if (!data) {
          delete temData.id;
        }

        const addCompanyResponse = await newCoursing(temData).unwrap();
        if (!addCompanyResponse.status) {
          showErrorMessage(addCompanyResponse.message);
        } else {
          showMessage(addCompanyResponse.message);
          handleClose();
        }
      } catch (error) {
        showErrorMessage("Something went wrong");
      }
    },
  });

  const formValid = useMemo(() => {
    return formik.values.tagName === "" || formik.values.tagName === undefined
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
                    New Product Tag
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
                        placeholder="Enter Product Tag Name"
                        size="small"
                        {...formik.getFieldProps("tagName")}
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
                        Active
                      </Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                      <IOSSwitch
                        color="primary"
                        sx={{ mr: 2 }}
                        {...formik.getFieldProps("isActive")}
                        checked={formik.values.isActive}
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

export default ProductTag;
