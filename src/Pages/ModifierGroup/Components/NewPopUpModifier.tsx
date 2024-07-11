import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  Dialog,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import {
  useCreateModifierMutation,
  useGetPrinterQuery,
  useGetTaxQuery,
} from "../../../Api/attoDeskApi";
import { useNotifier } from "../../../Core/Notifier";
import {
  IModifier,
  ITaxes,
  IPrinter,
} from "../../../Api/Interface/api.interface";
import { appColor } from "../../../theme/appColor";
import NewTax from "../../Tax/Components/NewPopUpTax";
import NewPopUpPrinter from "../../Printer/Components/NewPopUpPrinter";

interface IModifiergpopup {
  openModel?: boolean;
  handleCloseDialog: (close: boolean) => void;
  data?: IModifier;
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

const Modifier = ({
  openModel = false,
  handleCloseDialog,
  data,
}: IModifiergpopup) => {
  const [open] = React.useState(openModel);
  const [newModifier, { isLoading }] = useCreateModifierMutation();
  const { showErrorMessage, showMessage } = useNotifier();
  const { data: printerData, isLoading: PrinterLoading } = useGetPrinterQuery();
  const [openPrinter, setOpenPrinter] = useState(false);

  const { data: taxData, isLoading: taxLoading } = useGetTaxQuery({
    searchText: "",
  });
  const [openTax, setOpenTax] = useState(false);

  const printerList = useMemo(() => {
    return printerData?.data as IPrinter[];
  }, [printerData?.data]);

  const taxList = useMemo(() => {
    return taxData?.data as ITaxes[];
  }, [taxData?.data]);

  const handleClose = () => {
    handleCloseDialog(false);
  };

  const formik = useFormik({
    initialValues: {
      id: data?.id,
      modifierName: data?.modifierName,
      modifierTaxeIds: data?.modifierTaxeIds || [],
      modifierPrinterIds: data?.modifierPrinterIds || [],
      setModifierPrice: data?.setModifierPrice
        ? Boolean(data?.setModifierPrice)
        : false,
      modifierPrice: data?.modifierPrice,
      maxNoOfTimes: data?.maxNoOfTimes,
    },
    onSubmit: async (values) => {
      try {
        const temData = {
          id: values?.id,
          modifierName: values.modifierName,
          modifierTaxeIds: values.modifierTaxeIds,
          modifierPrinterIds: values.modifierPrinterIds,
          setModifierPrice: values.setModifierPrice,
          modifierPrice: values.setModifierPrice ? values.modifierPrice : "",
          maxNoOfTimes: values.maxNoOfTimes,
        };

        if (!data) {
          delete temData.id;
        }

        const addModifierResponse = await newModifier(temData).unwrap();
        if (!addModifierResponse.status) {
          showErrorMessage(addModifierResponse.message);
        } else {
          showMessage(addModifierResponse.message);
          handleClose();
        }
      } catch (error) {
        showErrorMessage("Something went wrong");
      }
    },
  });

  const formValid = useMemo(() => {
    return formik.values.modifierName === "" ||
      formik.values.modifierName === undefined
      ? false
      : true;
  }, [formik]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Dialog
        open={open}
        PaperProps={{
          style: {
            maxWidth: "1700px",
          },
        }}
      >
        <Grid container>
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
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
              <Grid container spacing={5}>
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
                    New Modifier
                  </Typography>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12} py={2}>
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
                        placeholder="Enter Modifier Name"
                        size="small"
                        {...formik.getFieldProps("modifierName")}
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
                    sx={{ mt: 2 }}
                  >
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 400,
                          fontSize: 14,
                        }}
                      >
                        Taxes
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      lg={9}
                      md={9}
                      sm={12}
                      xs={12}
                      display="flex"
                      alignItems="center"
                    >
                      <TextField
                        select
                        size="small"
                        sx={{ width: "100%" }}
                        SelectProps={{
                          multiple: true,
                          native: false,
                        }}
                        defaultValue={[]}
                        InputLabelProps={{ shrink: true }}
                        {...formik.getFieldProps("modifierTaxeIds")}
                        onChange={(event) => {
                          const {
                            target: { value },
                          } = event;
                          formik.setFieldValue(
                            "modifierTaxeIds",
                            typeof value === "string" ? value.split(",") : value
                          );
                        }}
                      >
                        {taxList && taxList.length > 0 ? (
                          taxList.map((taxes: ITaxes) => (
                            <MenuItem key={taxes.id} value={taxes.id}>
                              {taxes.taxName}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value="" disabled style={{ color: "gray" }}>
                            Select an option
                          </MenuItem>
                        )}
                      </TextField>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: "green",
                          color: "white",
                          borderRadius: 0,
                          ml: 2,
                          border: 1,
                          borderColor: "green",
                          "&:hover": {
                            backgroundColor: "green",
                          },
                          "&:active": {
                            backgroundColor: "green",
                          },
                        }}
                        onClick={() => {
                          setOpenTax(true);
                        }}
                      >
                        <AddIcon sx={{ fontSize: 30 }} />
                      </Button>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ mt: 2 }}
                  >
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 400,
                          fontSize: 14,
                        }}
                      >
                        Priners
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      lg={9}
                      md={9}
                      sm={12}
                      xs={12}
                      display="flex"
                      alignItems="center"
                    >
                      <TextField
                        select
                        size="small"
                        sx={{ width: "100%" }}
                        SelectProps={{
                          multiple: true,
                          native: false,
                        }}
                        defaultValue={[]}
                        InputLabelProps={{ shrink: true }}
                        {...formik.getFieldProps("modifierPrinterIds")}
                        onChange={(event) => {
                          const {
                            target: { value },
                          } = event;
                          formik.setFieldValue(
                            "modifierPrinterIds",
                            typeof value === "string" ? value.split(",") : value
                          );
                        }}
                      >
                        {printerList && printerList.length > 0 ? (
                          printerList.map((printer: IPrinter) => (
                            <MenuItem key={printer.id} value={printer.id}>
                              {printer.printerName}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value="" disabled style={{ color: "gray" }}>
                            Select an option
                          </MenuItem>
                        )}
                      </TextField>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: "green",
                          color: "white",
                          borderRadius: 0,
                          ml: 2,
                          border: 1,
                          borderColor: "green",
                          "&:hover": {
                            backgroundColor: "green",
                          },
                          "&:active": {
                            backgroundColor: "green",
                          },
                        }}
                        onClick={() => {
                          setOpenPrinter(true);
                        }}
                      >
                        <AddIcon sx={{ fontSize: 30 }} />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12} py={2}>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item lg={3} md={3} sm={3} xs={3}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 400,
                          fontSize: 14,
                        }}
                      >
                        Set Price Here
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      lg={2}
                      md={2}
                      sm={2}
                      xs={2}
                      display="flex"
                      alignItems="center"
                    >
                      <IOSSwitch
                        color="primary"
                        sx={{ mr: 2 }}
                        {...formik.getFieldProps("setModifierPrice")}
                        checked={formik.values.setModifierPrice}
                      />
                    </Grid>
                    {formik.values.setModifierPrice && (
                      <>
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 400,
                              fontSize: 14,
                            }}
                          >
                            Price
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          lg={5}
                          md={5}
                          sm={5}
                          xs={5}
                          display="flex"
                          alignItems="center"
                        >
                          <TextField
                            placeholder="Enter Modifier Price"
                            size="small"
                            {...formik.getFieldProps("modifierPrice")}
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
                      </>
                    )}
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ mt: 2 }}
                  >
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 400,
                          fontSize: 14,
                        }}
                      >
                        Maximum No of Times
                      </Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                      <TextField
                        placeholder="Enter Maximum No of Times"
                        size="small"
                        {...formik.getFieldProps("maxNoOfTimes")}
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
                  {/* <Box m={0.5}></Box>
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
                >
                  Save and publish
                </Button> */}
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>

        {openPrinter && (
          <NewPopUpPrinter
            handleCloseDialog={() => setOpenPrinter(false)}
            openModel={openPrinter}
          />
        )}

        {openTax && (
          <NewTax
            handleCloseDialog={() => setOpenTax(false)}
            openModel={openTax}
          />
        )}
      </Dialog>
    </form>
  );
};

export default Modifier;
