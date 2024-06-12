import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { appColor } from "../../theme/appColor";
import CategoryIcon from "@mui/icons-material/Category";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";
import CloseIcon from "@mui/icons-material/Close";
import {
  useCreateCategoryMutation,
  useGetCoursingQuery,
  useGetDepartmentQuery,
  useGetTaxQuery,
} from "../../Api/attoDeskApi";
import { useNotifier } from "../../Core/Notifier";
import { useFormik } from "formik";
import {
  ICoursing,
  IDepartment,
  ITaxes,
} from "../../Api/Interface/api.interface";
import {
  KitchenPrinterType,
  RooleType,
  SizeOfLevelType,
} from "../../Core/Enum/enum";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AppsIcon from "@mui/icons-material/Apps";

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

const Category: React.FC = () => {
  const [newCategory, { isLoading }] = useCreateCategoryMutation();
  const { showErrorMessage, showMessage } = useNotifier();
  const { data: departmentData, isLoading: departmentLoading } =
    useGetDepartmentQuery();
  const { data: coursingData, isLoading: coursingLoading } =
    useGetCoursingQuery();
  const { data: taxData, isLoading: taxLoading } = useGetTaxQuery();
  const [image, setImage] = useState<string | null>(null);
  const [openGallery, setOpenGallery] = useState(false);

  const departmentList = useMemo(() => {
    return departmentData?.data as IDepartment[];
  }, [departmentData?.data]);

  const coursingList = useMemo(() => {
    return coursingData?.data as ICoursing[];
  }, [coursingData?.data]);

  const taxList = useMemo(() => {
    return taxData?.data as ITaxes[];
  }, [taxData?.data]);

  const formik = useFormik({
    initialValues: {
      categoryName: "",
      departmentId: null,
      roleId: [],
      coursingId: null,
      servingSize: [],
      hidePos: false,
      hideOnlineOrder: false,
      hideKiosk: false,
      Conversational: false,
      itemServiceCharge: "",
      ageRestriction: false,
      excludeCheckTax: false,
      kitchenPrinters: false,
      labelPrinters: false,
      restrictPrinters: false,
      taxeId: null,
      // kitchenPrintersTypes: [],
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const temData = {
          categoryName: values.categoryName,
          departmentId: values.departmentId,
          roleId: values.roleId,
          coursingId: values.coursingId,
          servingSize: values.servingSize,
          hidePos: values.hidePos,
          hideOnlineOrder: values.hideOnlineOrder,
          hideKiosk: values.hideKiosk,
          Conversational: values.Conversational,
          itemServiceCharge: values.itemServiceCharge,
          ageRestriction: values.ageRestriction,
          excludeCheckTax: values.excludeCheckTax,
          kitchenPrinters: values.kitchenPrinters,
          labelPrinters: values.labelPrinters,
          restrictPrinters: values.restrictPrinters,
          taxeId: values.taxeId,
          // kitchenPrintersTypes: values.kitchenPrintersTypes,
        };

        const addCategoryResponse = await newCategory(temData).unwrap();
        if (!addCategoryResponse.status) {
          showErrorMessage(addCategoryResponse.message);
        } else {
          showMessage("Category Created successfully");
          resetForm();
        }
      } catch (error) {
        showErrorMessage("Something went wrong");
      }
    },
  });

  const formValid = useMemo(() => {
    return formik.values.categoryName === "" ||
      formik.values.categoryName === undefined ||
      formik.values.departmentId === null ||
      formik.values.departmentId === undefined ||
      formik.values.coursingId === null ||
      formik.values.coursingId === undefined ||
      formik.values.taxeId === null ||
      formik.values.taxeId === undefined
      ? false
      : true;
  }, [formik]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGallerySelection = (selectedImage: string) => {
    setImage(selectedImage);
    setOpenGallery(false);
  };

  const openGalleryDialog = () => {
    setOpenGallery(true);
  };

  const closeGalleryDialog = () => {
    setOpenGallery(false);
  };

  const galleryImages = [
    "/Images/atto_desk_login_background.webp",
    "/Images/dummy_image.webp",
    "/Images/user_login_photo.webp",
    "/Images/atto_desk_login_background.webp",
    "/Images/dummy_image.webp",
    "/Images/user_login_photo.webp",
  ];

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
                    New Category
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
                        placeholder="Enter Category Name"
                        size="small"
                        {...formik.getFieldProps("categoryName")}
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
                        Department
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
                        sx={{ flexGrow: 1 }}
                        SelectProps={{
                          native: true,
                        }}
                        defaultValue=""
                        InputLabelProps={{ shrink: true }}
                        {...formik.getFieldProps("departmentId")}
                      >
                        <option value="" disabled style={{ color: "gray" }}>
                          Select an option
                        </option>
                        {departmentList &&
                          departmentList.map((department) => (
                            <option key={department.id} value={department.id}>
                              {department.departmentName}
                            </option>
                          ))}
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
                        Roles
                      </Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                      <TextField
                        select
                        size="small"
                        sx={{ width: "100%" }}
                        SelectProps={{
                          multiple: true,
                          native: false,
                        }}
                        defaultValue=""
                        InputLabelProps={{ shrink: true }}
                        {...formik.getFieldProps("roleId")}
                      >
                        {!formik.values.roleId.length && (
                          <MenuItem value="" disabled>
                            Select some option
                          </MenuItem>
                        )}
                        {Object.entries(RooleType).map(
                          ([key, value], index) => (
                            <MenuItem key={index} value={value}>
                              {key}
                            </MenuItem>
                          )
                        )}
                      </TextField>
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
                        Coursing
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
                        sx={{ flexGrow: 1 }}
                        SelectProps={{
                          native: true,
                        }}
                        defaultValue=""
                        InputLabelProps={{ shrink: true }}
                        {...formik.getFieldProps("coursingId")}
                      >
                        <option value="" disabled style={{ color: "gray" }}>
                          Select an option
                        </option>
                        {coursingList &&
                          coursingList.map((coursing) => (
                            <option key={coursing.id} value={coursing.id}>
                              {coursing.coursingName}
                            </option>
                          ))}
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
                        Serving Size Levels
                      </Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                      <TextField
                        select
                        size="small"
                        sx={{ width: "100%" }}
                        SelectProps={{
                          multiple: true,
                          native: false,
                        }}
                        defaultValue=""
                        InputLabelProps={{ shrink: true }}
                        {...formik.getFieldProps("servingSize")}
                      >
                        {!formik.values.servingSize.length && (
                          <MenuItem value="" disabled>
                            Select some option
                          </MenuItem>
                        )}
                        {Object.entries(SizeOfLevelType).map(
                          ([key, value], index) => (
                            <MenuItem key={index} value={value}>
                              {key}
                            </MenuItem>
                          )
                        )}
                      </TextField>
                    </Grid>
                  </Grid>
                  {/* <Grid
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
                        Tare Group
                      </Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
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
                        <option value="" disabled color="gray">
                          Select Target Group
                        </option>
                        <option>Food Department</option>
                        <option>Shop Department</option>
                        <option>xx Department</option>
                        <option>cc Department</option>
                        <option>yy Department</option>
                      </TextField>
                    </Grid>
                  </Grid> */}

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
                        Item Service Charge
                      </Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
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
                        <option value="" disabled color="gray">
                          Select an option
                        </option>
                        <option>None</option>
                        <option>Pay</option>
                      </TextField>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ mt: 2 }}
                  >
                    <Grid item lg={3} md={3} sm={3} xs={3}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 400,
                          fontSize: 14,
                        }}
                      >
                        Hide in POS
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      lg={3}
                      md={3}
                      sm={3}
                      xs={3}
                      display="flex"
                      alignItems="center"
                    >
                      <IOSSwitch
                        color="primary"
                        sx={{ mr: 2 }}
                        {...formik.getFieldProps("hidePos")}
                        checked={formik.values.hidePos}
                      />
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xs={3}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 400,
                          fontSize: 14,
                        }}
                      >
                        Hide in Online Order
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      lg={3}
                      md={3}
                      sm={3}
                      xs={3}
                      display="flex"
                      alignItems="center"
                    >
                      <IOSSwitch
                        color="primary"
                        sx={{ mr: 2 }}
                        {...formik.getFieldProps("hideOnlineOrder")}
                        checked={formik.values.hideOnlineOrder}
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
                    <Grid item lg={3} md={3} sm={3} xs={3}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 400,
                          fontSize: 14,
                        }}
                      >
                        Hide in Kiosk
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      lg={3}
                      md={3}
                      sm={3}
                      xs={3}
                      display="flex"
                      alignItems="center"
                    >
                      <IOSSwitch
                        color="primary"
                        sx={{ mr: 2 }}
                        {...formik.getFieldProps("hideKiosk")}
                        checked={formik.values.hideKiosk}
                      />
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xs={3}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 400,
                          fontSize: 14,
                        }}
                      >
                        Conversational
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      lg={3}
                      md={3}
                      sm={3}
                      xs={3}
                      display="flex"
                      alignItems="center"
                    >
                      <IOSSwitch
                        color="primary"
                        sx={{ mr: 2 }}
                        {...formik.getFieldProps("Conversational")}
                        checked={formik.values.Conversational}
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
                    <Grid item lg={3} md={3} sm={3} xs={3}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 400,
                          fontSize: 14,
                        }}
                      >
                        Age Restriction
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      lg={3}
                      md={3}
                      sm={3}
                      xs={3}
                      display="flex"
                      alignItems="center"
                    >
                      <IOSSwitch
                        color="primary"
                        sx={{ mr: 2 }}
                        {...formik.getFieldProps("ageRestriction")}
                        checked={formik.values.ageRestriction}
                      />
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xs={3}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 400,
                          fontSize: 14,
                        }}
                      >
                        Exclude Check Tax
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      lg={3}
                      md={3}
                      sm={3}
                      xs={3}
                      display="flex"
                      alignItems="center"
                    >
                      <IOSSwitch
                        color="primary"
                        sx={{ mr: 2 }}
                        {...formik.getFieldProps("excludeCheckTax")}
                        checked={formik.values.excludeCheckTax}
                      />
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
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 400,
                          fontSize: 14,
                        }}
                      >
                        Include Default
                      </Typography>
                    </Grid>
                    <Grid item lg={3} md={3} sm={4} xs={4}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 400,
                          fontSize: 14,
                        }}
                      >
                        Kitchen Printer
                      </Typography>
                      <IOSSwitch
                        color="primary"
                        sx={{ mr: 2 }}
                        {...formik.getFieldProps("kitchenPrinters")}
                        checked={formik.values.kitchenPrinters}
                      />
                    </Grid>
                    <Grid item lg={3} md={3} sm={4} xs={4}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 400,
                          fontSize: 14,
                        }}
                      >
                        Label Printers
                      </Typography>
                      <IOSSwitch
                        color="primary"
                        sx={{ mr: 2 }}
                        {...formik.getFieldProps("labelPrinters")}
                        checked={formik.values.labelPrinters}
                      />
                    </Grid>
                    <Grid item lg={3} md={3} sm={4} xs={4}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 400,
                          fontSize: 14,
                        }}
                      >
                        Restrict PRinters
                      </Typography>
                      <IOSSwitch
                        color="primary"
                        sx={{ mr: 2 }}
                        {...formik.getFieldProps("restrictPrinters")}
                        checked={formik.values.restrictPrinters}
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
                        sx={{ flexGrow: 1 }}
                        SelectProps={{
                          native: true,
                        }}
                        defaultValue=""
                        InputLabelProps={{ shrink: true }}
                        {...formik.getFieldProps("taxeId")}
                      >
                        <option value="" disabled style={{ color: "gray" }}>
                          Select an option
                        </option>
                        {taxList &&
                          taxList.map((tax) => (
                            <option key={tax.id} value={tax.id}>
                              {tax.taxName}
                            </option>
                          ))}
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
                      >
                        <AddIcon sx={{ fontSize: 30 }} />
                      </Button>
                    </Grid>
                  </Grid>
                  {/* <Grid
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
                        Kitchen Printers
                      </Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                      <TextField
                        select
                        size="small"
                        sx={{ width: "100%" }}
                        SelectProps={{
                          multiple: true,
                          native: false,
                        }}
                        defaultValue=""
                        InputLabelProps={{ shrink: true }}
                        {...formik.getFieldProps("kitchenPrintersTypes")}
                      >
                        {!formik.values.kitchenPrintersTypes.length && (
                          <MenuItem value="" disabled>
                            Select some option
                          </MenuItem>
                        )}
                        {Object.entries(KitchenPrinterType).map(
                          ([key, value], index) => (
                            <MenuItem key={index} value={value}>
                              {key}
                            </MenuItem>
                          )
                        )}
                      </TextField>
                    </Grid>
                  </Grid> */}
                  {/* <Grid
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
                        Restrict Printers
                      </Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
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
                        <option value="" disabled color="gray">
                          Select some option
                        </option>
                        <option>Food Department</option>
                        <option>Shop Department</option>
                        <option>xx Department</option>
                        <option>cc Department</option>
                        <option>yy Department</option>
                      </TextField>
                    </Grid>
                  </Grid> */}
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
                        Display Button
                      </Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                      <Box
                        sx={{
                          border: 1,
                          borderColor: "appColor.greenSmoke[40]", // Assuming appColor is defined elsewhere
                          borderRadius: 1,
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          padding: 1,
                        }}
                      >
                        {image && (
                          <img
                            src={image}
                            alt="Uploaded"
                            style={{
                              maxWidth: "200px",
                              maxHeight: "200px",
                              marginRight: "auto",
                            }}
                          />
                        )}
                        <div>
                          <input
                            accept="image/*"
                            style={{ display: "none" }}
                            id="icon-button-file-1"
                            type="file"
                            onChange={handleFileChange}
                          />
                          <label htmlFor="icon-button-file-1">
                            <Tooltip title="Select image from desk">
                              <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                              >
                                <CloudUploadIcon
                                  sx={{ fontSize: 45, color: "green" }}
                                />
                              </IconButton>
                            </Tooltip>
                          </label>
                          <Tooltip title="Select image from our gallery">
                            <IconButton
                              color="primary"
                              aria-label="select from gallery"
                              component="span"
                              onClick={openGalleryDialog}
                            >
                              <AppsIcon sx={{ fontSize: 45, color: "green" }} />
                            </IconButton>
                          </Tooltip>
                        </div>
                        <Dialog open={openGallery} onClose={closeGalleryDialog}>
                          <DialogTitle
                            sx={{ backgroundColor: appColor.greenSmoke[40] }}
                          >
                            Select an Image from Gallery
                          </DialogTitle>
                          <DialogContent>
                            <ImageList
                              sx={{ width: 500, height: 450 }}
                              cols={3}
                              rowHeight={164}
                            >
                              {galleryImages.map((imagePath) => (
                                <ImageListItem key={imagePath}>
                                  <img
                                    src={`${imagePath}?w=164&h=164&fit=crop&auto=format`}
                                    srcSet={`${imagePath}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    alt="Gallery"
                                    loading="lazy"
                                    onClick={() =>
                                      handleGallerySelection(imagePath)
                                    }
                                    style={{ cursor: "pointer" }}
                                  />
                                </ImageListItem>
                              ))}
                            </ImageList>
                          </DialogContent>
                        </Dialog>
                      </Box>
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
                        Applicable Time Period
                      </Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
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
                        <option value="" disabled color="gray">
                          Select some option
                        </option>
                        <option>Food Department</option>
                        <option>Shop Department</option>
                        <option>xx Department</option>
                        <option>cc Department</option>
                        <option>yy Department</option>
                      </TextField>
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
      </Box>
    </form>
  );
};

export default Category;
