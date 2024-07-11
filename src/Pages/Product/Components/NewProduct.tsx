import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
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
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import AppsIcon from "@mui/icons-material/Apps";
import {
  useCreateProductMutation,
  useGetLastProductIdQuery,
  useGetPrinterQuery,
  useGetProductBrandQuery,
  useGetProductCategoryQuery,
  useGetProductTagQuery,
} from "../../../Api/attoDeskApi";
import { useNotifier } from "../../../Core/Notifier";
import {
  ILastProductId,
  IPrinter,
  IProduct,
  IProductBrand,
  IProductCategory,
  IProductTag,
} from "../../../Api/Interface/api.interface";
import { appColor } from "../../../theme/appColor";
import { SizeOfLevelType } from "../../../Core/Enum/enum";
import { HexColorPicker } from "react-colorful";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Barcode from "react-barcode";
import NewProductCategory from "../../ProductCategory/Components/NewPopUpProductCategory";
import NewProductBrand from "../../ProductBrand/Components/NewPopUpProductBrand";
import NewPrinter from "../../Printer/Components/NewPopUpPrinter";
import NewProductTag from "../../ProductTags/Components/NewPopUpProductTag";
import { LoopingConst } from "../../../Core/Enum/enum";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

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

const Product: React.FC = () => {
  const [newProduct, { isLoading }] = useCreateProductMutation();
  const { showErrorMessage, showMessage } = useNotifier();
  const { data: productCategoryData, isLoading: productCategoryLoading } =
    useGetProductCategoryQuery();
  const { data: productBrandData, isLoading: ProductBrandLoading } =
    useGetProductBrandQuery();
  const { data: productTagData, isLoading: ProductTagLoading } =
    useGetProductTagQuery();
  const { data: printerData, isLoading: PrinterLoading } = useGetPrinterQuery({
    searchText: "",
  });

  const [image, setImage] = useState<string | null>(null);
  const [openGallery, setOpenGallery] = useState(false);
  const [openProductCategory, setOpenProductCategory] = useState(false);
  const [openProductBrand, setOpenProductBrand] = useState(false);
  const [openProductTag, setOpenProductTag] = useState(false);
  const [openPrinter, setOpenPrinter] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("#FFFFFF");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const { data: newLastProductIdData, isLoading: lastProductIdIsLoading } =
    useGetLastProductIdQuery();
  const [showBarcode, setShowBarcode] = useState(false);

  const [openPhoneQuestions, setOpenPhoneQuestions] = useState(false);
  const [openComputerQuestions, setOpenComputerQuestions] = useState(false);
  const [openLoopingCategoryDialog, setOpenLoopingCategoryDialog] =
    useState(false);

  const lastProductId = useMemo(() => {
    return (newLastProductIdData?.data as ILastProductId)?.lastInsertedId ?? 0;
  }, [newLastProductIdData?.data]);

  const productList = useMemo(() => {
    return productCategoryData?.data as IProductCategory[];
  }, [productCategoryData?.data]);

  const productBrandList = useMemo(() => {
    return productBrandData?.data as IProductBrand[];
  }, [productBrandData?.data]);

  const productTagList = useMemo(() => {
    return productTagData?.data as IProductTag[];
  }, [productTagData?.data]);

  const lastProductIdList = useMemo(() => {
    return productCategoryData?.data as IProductCategory[];
  }, [productCategoryData?.data]);

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
      productConversionUnit: [],
      productBrandId: "",
      productCategoryId: "",
      productTagIds: [],
      productViewOnline: false,
      isActive: false,
      productPrinterIds: [],
      productIcon: "",
      productImg: "",
      productButtonColor: "",
      productBarcode: "",
      phoneType: "",
      phoneColor: "",
      computerModel: "",
      computerRam: "",
      productDetailsIsLooping: false,
      productsDetailsLoopingConstant: "",
      productCanSell: true,
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const selectedCategory = productList.find(
          (category) => category.id === parseInt(values.productCategoryId)
        );

        if (selectedCategory?.productCategoryIsLooping) {
          if (
            selectedCategory.productCategoryIsLoopingConstant ==
            LoopingConst.Mobile
          ) {
            setOpenPhoneQuestions(true);
          } else if (
            selectedCategory.productCategoryIsLoopingConstant ==
            LoopingConst.Computer
          ) {
            setOpenComputerQuestions(true);
          }
          setOpenLoopingCategoryDialog(true);
          return;
        }

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
          productCanSell: values.productCanSell,
        };

        const addProductResponse = await newProduct(temData).unwrap();
        if (!addProductResponse.status) {
          showErrorMessage(addProductResponse.message);
        } else {
          showMessage(addProductResponse.message);
          resetForm();
          setOpenPhoneQuestions(false);
          setOpenComputerQuestions(false);
        }
      } catch (error) {
        showErrorMessage("Something went wrong");
      }
    },
  });

  const formValid = useMemo(() => {
    const { productName, productCategoryId, phoneType, computerModel } =
      formik.values;

    if (
      productName === "" ||
      productName === undefined ||
      productCategoryId === null ||
      productCategoryId === undefined
    ) {
      return false;
    }

    if (openPhoneQuestions) {
      if (phoneType === "" || phoneType === undefined) {
        return false;
      }
    }

    if (openComputerQuestions) {
      if (computerModel === "" || computerModel === undefined) {
        return false;
      }
    }

    return true;
  }, [
    formik.values,
    openPhoneQuestions,
    openComputerQuestions,
    productCategoryData,
  ]);

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

  useEffect(() => {
    setSelectedColor(formik.values.productButtonColor ?? "#ffffff");
  }, [formik.values.productButtonColor]);

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

  useEffect(() => {
    if (lastProductId) {
      formik.setFieldValue("productBarcode", String(lastProductId + 1));
    }
  }, [lastProductId]);

  const selectedProductIsLoading = useMemo(() => {
    return productList.find(
      (category) => category.id === parseInt(formik.values.productCategoryId)
    );
  }, [formik.values.productCategoryId, productList]);

  const handleSaveAdditionalQuestions = async () => {
    try {
      const temData: any = {
        productName: formik.values.productName,
        productShortDescription: formik.values.productShortDescription,
        productLongDescription: formik.values.productLongDescription,
        productConversionUnit: formik.values.productConversionUnit,
        productCategoryId: formik.values.productCategoryId,
        productBrandId: formik.values.productBrandId,
        productTagIds: formik.values.productTagIds,
        productViewOnline: formik.values.productViewOnline,
        isActive: formik.values.isActive,
        productPrinterIds: formik.values.productPrinterIds,
        productIcon: formik.values.productIcon,
        productImg: formik.values.productImg,
        productButtonColor: formik.values.productButtonColor,
        productBarcode: formik.values.productBarcode,
        productDetailsIsLooping:
          selectedProductIsLoading?.productCategoryIsLooping || false,
        productsDetailsLoopingConstant:
          selectedProductIsLoading?.productCategoryIsLoopingConstant || "",
        productCanSell: formik.values.productCanSell,
      };

      if (openPhoneQuestions) {
        temData.phoneType = formik.values.phoneType;
        temData.phoneColor = formik.values.phoneColor;
      } else if (openComputerQuestions) {
        temData.computerModel = formik.values.computerModel;
        temData.computerRam = formik.values.computerRam;
      }

      const addProductResponse = await newProduct(temData).unwrap();
      if (!addProductResponse.status) {
        showErrorMessage(addProductResponse.message);
      } else {
        showMessage(addProductResponse.message);
        formik.resetForm();
        setOpenPhoneQuestions(false);
        setOpenComputerQuestions(false);
      }
    } catch (error) {
      showErrorMessage("Something went wrong");
    }
  };

  const getLoopingCategoryName = (value: number | undefined): string => {
    switch (value) {
      case LoopingConst.Mobile:
        return "Mobile";
      case LoopingConst.Computer:
        return "Computer";
      default:
        return "";
    }
  };

  if (
    isLoading ||
    ProductBrandLoading ||
    productCategoryLoading ||
    ProductTagLoading ||
    PrinterLoading ||
    lastProductIdIsLoading
  ) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="10vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit}>
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
                <Grid container direction="row" alignItems="center" spacing={2}>
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
                          <option key={productBrand.id} value={productBrand.id}>
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
                      sx={{ width: "100%" }}
                      SelectProps={{
                        multiple: true,
                        native: false,
                      }}
                      defaultValue={[]}
                      InputLabelProps={{ shrink: true }}
                      {...formik.getFieldProps("productTagIds")}
                      onChange={(event) => {
                        const {
                          target: { value },
                        } = event;
                        formik.setFieldValue(
                          "productTagIds",
                          typeof value === "string" ? value.split(",") : value
                        );
                      }}
                    >
                      {productTagList && productTagList.length > 0 ? (
                        productTagList.map((productTag: IProductTag) => (
                          <MenuItem key={productTag.id} value={productTag.id}>
                            {productTag.tagName}
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
                      select
                      size="small"
                      sx={{ width: "100%" }}
                      SelectProps={{
                        multiple: true,
                        native: false,
                      }}
                      defaultValue=""
                      InputLabelProps={{ shrink: true }}
                      {...formik.getFieldProps("productConversionUnit")}
                    >
                      {!formik.values.productConversionUnit.length && (
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
                      Can Sell
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
                      {...formik.getFieldProps("productCanSell")}
                      checked={formik.values.productCanSell}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12} py={2}>
                <Grid container direction="row" alignItems="center" spacing={2}>
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
                  <Grid item lg={7} md={7} sm={12} xs={12}>
                    <Grid container spacing={2}>
                      {printerList.map((printer) => (
                        <Grid
                          item
                          lg={4}
                          md={12}
                          sm={12}
                          xs={12}
                          key={printer.id}
                        >
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
                    </Grid>
                  </Grid>

                  <Grid item lg={2} md={2} sm={4} xs={4} textAlign={"end"}>
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
                      Barcode
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
                      <Grid container spacing={2}>
                        <Grid item lg={4} md={9} sm={12} xs={12}>
                          <TextField
                            placeholder="Enter Barcode"
                            size="small"
                            {...formik.getFieldProps("productBarcode")}
                            sx={{ width: "100%" }}
                            InputProps={{
                              sx: { fontSize: 14 },
                              readOnly: true,
                            }}
                            InputLabelProps={{
                              sx: { fontSize: 14 },
                            }}
                          />
                          <Button
                            variant="contained"
                            size="small"
                            sx={{
                              backgroundColor: "green",
                              color: "white",
                              borderRadius: 0,

                              mt: 2,
                              border: 1,
                              borderColor: "green",
                              "&:hover": {
                                backgroundColor: "green",
                              },
                              "&:active": {
                                backgroundColor: "green",
                              },
                            }}
                            onClick={() => setShowBarcode(true)}
                          >
                            Generate
                          </Button>
                        </Grid>

                        <Grid
                          item
                          lg={8}
                          md={9}
                          sm={12}
                          xs={12}
                          textAlign={"end"}
                        >
                          {showBarcode && formik.values.productBarcode && (
                            <Box mt={2}>
                              <Barcode value={formik.values.productBarcode} />
                            </Box>
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

              {(openPhoneQuestions || openComputerQuestions) && (
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
                    Add More Looping Details
                  </Typography>
                </Grid>
              )}

              {openPhoneQuestions && (
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
                        Phone Type
                      </Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                      <TextField
                        placeholder="Enter Phone Type"
                        size="small"
                        {...formik.getFieldProps("phoneType")}
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
                        Phone Color
                      </Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                      <TextField
                        placeholder="Enter Phone Color"
                        size="small"
                        {...formik.getFieldProps("phoneColor")}
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
              )}

              {openComputerQuestions && (
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
                        Computer Model
                      </Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                      <TextField
                        placeholder="Enter Computer Model"
                        size="small"
                        {...formik.getFieldProps("computerModel")}
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
                        Computer RAM
                      </Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                      <TextField
                        placeholder="Enter Computer RAM"
                        size="small"
                        {...formik.getFieldProps("computerRam")}
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
              )}

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

                {(openPhoneQuestions || openComputerQuestions) && (
                  <>
                    <Button
                      variant="contained"
                      startIcon={<RotateLeftIcon />}
                      sx={{
                        backgroundColor: appColor.grey[90],
                        textTransform: "none",
                        boxShadow: "none",
                        "&:hover": {
                          backgroundColor: appColor.grey[90],
                          boxShadow: "none",
                        },
                        "&:active": {
                          backgroundColor: appColor.grey[90],
                          boxShadow: "none",
                        },
                      }}
                      onClick={() => {
                        setOpenPhoneQuestions(false);
                        setOpenComputerQuestions(false);
                      }}
                    >
                      Reset Loop
                    </Button>
                    <Box m={0.5}></Box>
                  </>
                )}

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
                  onClick={() => {
                    if (openPhoneQuestions || openComputerQuestions) {
                      handleSaveAdditionalQuestions();
                    } else {
                      formik.handleSubmit();
                    }
                  }}
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
        <NewProductBrand
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

      <Dialog
        open={openLoopingCategoryDialog}
        onClose={() => setOpenLoopingCategoryDialog(false)}
        sx={{ padding: 5, minWidth: 450 }}
      >
        <DialogTitle
          sx={{
            borderBottom: 1,
            borderColor: appColor.greenSmoke[20],
          }}
        >
          Additional Details Required
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ pt: 3 }}>
            This is a looping product category (
            {selectedProductIsLoading?.productCatName}). Please fill in
            additional details.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenLoopingCategoryDialog(false)}
            variant="contained"
            startIcon={<CheckCircleOutlineIcon />}
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
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default Product;
