import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { appColor } from "../../theme/appColor";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import {
  useCreateProductCategoryMutation,
  useGetCategoryQuery,
} from "../../Api/attoDeskApi";
import { useNotifier } from "../../Core/Notifier";
import { useFormik } from "formik";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { ICategory } from "../../Api/Interface/api.interface";

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
    width: 30,
    height: 30,
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
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&::after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
}));

const ProductCategory: React.FC = () => {
  const [newProductCategory, { isLoading }] = useCreateProductCategoryMutation();
  const { showErrorMessage, showMessage } = useNotifier();
  const { data: categoryData, isLoading: departmentLoading } = useGetCategoryQuery();
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const categoryList = useMemo(() => {
    return categoryData?.data as ICategory[];
  }, [categoryData?.data]);

  const formik = useFormik({
    initialValues: {
      productCatName: "",
      productCatDescription: "",
      productCatImg: "",
      isActive: false,
      isMain: false,
      mainCatId: null,
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const temData = {
          productCatName: values.productCatName,
          productCatDescription: values.productCatDescription,
          productCatImg: imageFile,
          isActive: values.isActive,
          isMain: values.isMain,
          mainCatId: values.mainCatId,
        };

        const addProductCategory = await newProductCategory(temData).unwrap();
        if (!addProductCategory.status) {
          showErrorMessage(addProductCategory.message);
        } else {
          showMessage("Product Category Created successfully");
          resetForm();
          setImage(null); // Reset the image
          setImageFile(null); // Reset the image file
        }
      } catch (error) {
        showErrorMessage("Something went wrong");
      }
    },
  });

  const formValid = useMemo(() => {
    return formik.values.productCatName !== "" && formik.values.productCatName !== undefined;
  }, [formik]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
                    New Product Category
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
                        placeholder="Enter Product Category Name"
                        size="small"
                        {...formik.getFieldProps("productCatName")}
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
                        Main Category
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
                        fullWidth
                        size="small"
                        sx={{ flexGrow: 1 }}
                        SelectProps={{
                          native: true,
                        }}
                        defaultValue=""
                        InputLabelProps={{ shrink: true }}
                        {...formik.getFieldProps("mainCatId")}
                      >
                        <option value="" disabled style={{ color: "gray" }}>
                          Select an option
                        </option>
                        {categoryList &&
                          categoryList.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.categoryName}
                            </option>
                          ))}
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
                        Description
                      </Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                      <TextField
                        placeholder="Enter Product Category Name"
                        size="small"
                        {...formik.getFieldProps("productCatDescription")}
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
                        Main Active
                      </Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                      <IOSSwitch
                        color="primary"
                        sx={{ mr: 2 }}
                        {...formik.getFieldProps("isMain")}
                        checked={formik.values.isMain}
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
                        Image
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
                      <Box
                        sx={{
                          border: 1,
                          borderColor: "appColor.greenSmoke[40]",
                          borderRadius: 1,
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          padding: 1,
                          width: "100%",
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
                        </div>
                      </Box>
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

export default ProductCategory;
