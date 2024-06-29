import React, { useEffect, useMemo, useRef, useState } from "react";
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
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { appColor } from "../../theme/appColor";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";
import CloseIcon from "@mui/icons-material/Close";
import {
  useCreateCategoryMutation,
  useGetPrinterQuery,
  useGetProductBrandQuery,
  useGetProductCategoryQuery,
  useGetProductTagQuery,
} from "../../Api/attoDeskApi";
import { useNotifier } from "../../Core/Notifier";
import { useFormik } from "formik";
import {
  IPrinter,
  IProduct,
  IProductBrand,
  IProductCategory,
  IProductTag,
} from "../../Api/Interface/api.interface";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AppsIcon from "@mui/icons-material/Apps";
import NewProductCategory from "./Components/NewProductCategory";
import NewProductBrant from "./Components/NewProductBrant";
import NewProductTag from "./Components/NewProductTag";
import NewPrinter from "./Components/NewPrinter";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { HexColorPicker } from "react-colorful";

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

const isPrinterArray = (data: any): data is IPrinter[] => {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        "id" in item && "printerName" in item && "printerDescription" in item
    )
  );
};

const Category: React.FC = () => {
  const [newCategory, { isLoading }] = useCreateCategoryMutation();
  const { showErrorMessage, showMessage } = useNotifier();
  const { data: productCategoryData, isLoading: departmentLoading } =
    useGetProductCategoryQuery();
  const { data: productBrandData, isLoading: ProductBrandLoading } =
    useGetProductBrandQuery();
  const { data: productTagData, isLoading: ProductTagLoading } =
    useGetProductTagQuery();
  const { data: printerData, isLoading: PrinterLoading } = useGetPrinterQuery();

  const [image, setImage] = useState<string | null>(null);
  const [openGallery, setOpenGallery] = useState(false);
  const [openProductCategory, setOpenProductCategory] = useState(false);
  const [openProductBrand, setOpenProductBrand] = useState(false);
  const [openProductTag, setOpenProductTag] = useState(false);
  const [openPrinter, setOpenPrinter] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("#FFFFFF");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const productList = useMemo(() => {
    return productCategoryData?.data as IProductCategory[];
  }, [productCategoryData?.data]);

  const productBrandList = useMemo(() => {
    return productBrandData?.data as IProductBrand[];
  }, [productBrandData?.data]);

  const productTagList = useMemo(() => {
    return productTagData?.data as IProductTag[];
  }, [productTagData?.data]);

  const printerList: IPrinter[] = useMemo(() => {
    if (!printerData || !isPrinterArray(printerData.data)) {
      return [];
    }
    return printerData.data;
  }, [printerData]);

  const formik = useFormik<IProduct>({
    initialValues: {
      productName: "",
      productShortDescription: "",
      productLongDescription: "",
      productConversionUnit: "",
      productBrandId: null,
      productCategoryId: null,
      productTagIds: null,
      productViewOnline: false,
      isActive: false,
      productPrinterIds: [],
      productIcon: "",
      productImg: "",
      productButtonColor: "",
      productBarcode: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const temData = {
          productName: values.productName,
          productShortDescription: values.productShortDescription,
          productLongDescription: values.productLongDescription,
          productConversionUnit: values.productConversionUnit,
          productBrandId: values.productBrandId,
          productCategoryId: values.productCategoryId,
          productTagIds: values.productTagIds,
          productViewOnline: values.productViewOnline,
          isActive: values.isActive,
          productPrinterIds: values.productPrinterIds,
          productIcon: values.productIcon,
          productImg: values.productImg,
          productButtonColor: values.productButtonColor,
          productBarcode: values.productBarcode,
        };

        const addCategoryResponse = await newCategory(temData).unwrap();
        if (!addCategoryResponse.status) {
          showErrorMessage(addCategoryResponse.message);
        } else {
          showMessage("Product Created successfully");
          resetForm();
          window.location.reload();
        }
      } catch (error) {
        showErrorMessage("Something went wrong");
      }
    },
  });

  const formValid = useMemo(() => {
    return formik.values.productName === "" ||
      formik.values.productName === undefined ||
      formik.values.productCategoryId === null ||
      formik.values.productCategoryId === undefined
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

  const handlePrinterToggle = (printerId: number) => {
    const { productPrinterIds } = formik.values;
    const updatedPrinterIds = productPrinterIds.includes(printerId)
      ? productPrinterIds.filter((id) => id !== printerId)
      : [...productPrinterIds, printerId];
    formik.setFieldValue("productPrinterIds", updatedPrinterIds);
  };

  const handleColorChange = (newColor: string) => {
    setSelectedColor(newColor);
    formik.setFieldValue("productButtonColor", newColor);
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node)
      ) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
                    New Product
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
                        {...formik.getFieldProps("productName")}
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
                        Product Category
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
                        {...formik.getFieldProps("productCategoryId")}
                      >
                        <option value="" disabled style={{ color: "gray" }}>
                          Select an option
                        </option>
                        {productList &&
                          productList.map((productCat) => (
                            <option key={productCat.id} value={productCat.id}>
                              {productCat.productCatName}
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
                        onClick={() => {
                          setOpenProductCategory(true);
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
                        Product Brand
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
                        {...formik.getFieldProps("productBrandId")}
                      >
                        <option value="" disabled style={{ color: "gray" }}>
                          Select an option
                        </option>
                        {productBrandList &&
                          productBrandList.map((productBrand) => (
                            <option
                              key={productBrand.id}
                              value={productBrand.id}
                            >
                              {productBrand.productBrandName}
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
                        onClick={() => {
                          setOpenProductBrand(true);
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
                        Product Tag
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
                        {...formik.getFieldProps("productTagIds")}
                      >
                        <option value="" disabled style={{ color: "gray" }}>
                          Select an option
                        </option>
                        {productTagList &&
                          productTagList.map((productTag) => (
                            <option key={productTag.id} value={productTag.id}>
                              {productTag.tagName}
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
                        onClick={() => {
                          setOpenProductTag(true);
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
                        Conversion unit
                      </Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                      <TextField
                        placeholder="Enter Conversion unit"
                        size="small"
                        {...formik.getFieldProps("productConversionUnit")}
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
                        Short Description
                      </Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                      <TextField
                        placeholder="Enter Short Description"
                        size="small"
                        {...formik.getFieldProps("productShortDescription")}
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
                    <Grid item lg={3} md={3} sm={3} xs={3}>
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
                        {...formik.getFieldProps("isActive")}
                        checked={formik.values.isActive}
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
                        Product View Online
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
                        {...formik.getFieldProps("productViewOnline")}
                        checked={formik.values.productViewOnline}
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
                    {printerList.map((printer) => (
                      <Grid item lg={2} md={3} sm={4} xs={4} key={printer.id}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 400, fontSize: 14 }}
                        >
                          {printer.printerName}
                        </Typography>
                        <IOSSwitch
                          color="primary"
                          sx={{ mr: 2 }}
                          checked={formik.values.productPrinterIds.includes(
                            printer.id
                          )}
                          onChange={() => handlePrinterToggle(printer.id)}
                        />
                      </Grid>
                    ))}
                    <Grid item lg={3} md={3} sm={4} xs={4} textAlign={"end"}>
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
                        Display Image
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
                        Button Color
                      </Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                      <Box
                        sx={{
                          border: 1,
                          borderColor: "#d3d3d3",
                          borderRadius: 1,
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          padding: 1,
                        }}
                      >
                        <Grid container>
                          <Grid item lg={6} md={9} sm={12} xs={12}>
                            <Box
                              sx={{
                                marginLeft: 1,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Box
                                sx={{
                                  width: 50,
                                  height: 50,
                                  // borderRadius: "50%",
                                  backgroundColor: selectedColor,
                                  marginLeft: 1,
                                  border: "1px solid #d3d3d3",
                                }}
                              />
                            </Box>
                          </Grid>
                          <Grid
                            item
                            lg={6}
                            md={9}
                            sm={12}
                            xs={12}
                            alignItems={"flex-end"}
                            textAlign={"end"}
                          >
                            <IconButton
                              color="primary"
                              component="span"
                              onClick={toggleColorPicker}
                            >
                              <ColorLensIcon
                                sx={{ fontSize: 45, color: "green" }}
                              />
                            </IconButton>
                            {showColorPicker && (
                              <HexColorPicker
                                color={selectedColor}
                                onChange={handleColorChange}
                              />
                            )}
                          </Grid>
                        </Grid>
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
                        Long Description
                      </Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                      <TextField
                        placeholder="Enter Long Description"
                        size="small"
                        {...formik.getFieldProps("productLongDescription")}
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
                        multiline
                        rows={5}
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
        {openProductCategory && (
          <NewProductCategory
            handleCloseDialog={() => setOpenProductCategory(false)}
            openModel={openProductCategory}
          />
        )}

        {openProductBrand && (
          <NewProductBrant
            handleCloseDialog={() => setOpenProductBrand(false)}
            openModel={openProductBrand}
          />
        )}

        {openProductTag && (
          <NewProductTag
            handleCloseDialog={() => setOpenProductTag(false)}
            openModel={openProductTag}
          />
        )}

{openPrinter && (
          <NewPrinter
            handleCloseDialog={() => setOpenPrinter(false)}
            openModel={openPrinter}
          />
        )}
      </Box>
    </form>
  );
};

export default Category;
