import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Grid,
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  FormControl,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useDeleteProductMutation,
  useGetProductQuery,
  useGetProductCategoryQuery,
  useGetProductBrandQuery,
  useGetProductTagQuery,
} from "../../../Api/attoDeskApi";
import {
  IProductBrand,
  IProductCategory,
  IProductPopUP,
  IProductTag,
} from "../../../Api/Interface/api.interface";
import { appColor } from "../../../theme/appColor";
import DeletePopup from "../../../Components/Delete/DeletePopup";
import { useNotifier } from "../../../Core/Notifier";
import NewPopUpProduct from "./NewPopUpProduct";
import { TextFieldProps } from "@mui/material/TextField"; // Import TextFieldProps
import dayjs, { Dayjs } from "dayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

const ProductTable: React.FC<{ onDataLoaded: () => void }> = ({
  onDataLoaded,
}) => {
  const { showErrorMessage, showMessage } = useNotifier();

  const [selectedProductBrandId, setSelectedProductBrandId] =
    useState<string>("");
  const [selectedProductCategoryId, setSelectedProductCategoryId] =
    useState<string>("");
  const [selectedProductTagIds, setSelectedProductTagIds] = useState<string[]>(
    []
  );
  const [selectedProductViewOnline, setSelectedProductViewOnline] =
    useState<string>("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const startDateAsDate = startDate?.toDate() || null;
  const endDateAsDate = endDate?.toDate() || null;

  const { data, isLoading, isError } = useGetProductQuery({
    productBrandId: selectedProductBrandId,
    productCategoryId: selectedProductCategoryId,
    productTagIds: selectedProductTagIds,
    productViewOnline: selectedProductViewOnline,
    createdDateStart: startDateAsDate as Date,
    createdDateEnd: endDateAsDate as Date,
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedProduct, setSelectedProduct] = useState<IProductPopUP | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteProduct, setOpenDeleteProduct] = useState(false);
  const [productToDelete, setProductToDelete] = useState<IProductPopUP | null>(
    null
  );

  const { data: productBrandData, isLoading: productBrandLoading } =
    useGetProductBrandQuery({
      searchText: "",
      isActive: true,
    });
  const { data: coursingData, isLoading: coursingLoading } =
    useGetProductCategoryQuery();
  const { data: taxData, isLoading: taxLoading } = useGetProductTagQuery({
    searchText: "",
    isActive: true,
  });
  const { data: productCategoryData, isLoading: productCategoryLoading } =
    useGetProductCategoryQuery();
  const { data: productTagData, isLoading: ProductTagLoading } =
    useGetProductTagQuery({
      searchText: "",
      isActive: true,
    });

  const productBrandList = useMemo(() => {
    return productBrandData?.data as IProductBrand[];
  }, [productBrandData?.data]);

  const coursingList = useMemo(() => {
    return coursingData?.data as IProductCategory[];
  }, [coursingData?.data]);

  const taxList = useMemo(() => {
    return taxData?.data as IProductTag[];
  }, [taxData?.data]);

  const productList = useMemo(() => {
    return productCategoryData?.data as IProductCategory[];
  }, [productCategoryData?.data]);

  const productTagList = useMemo(() => {
    return productTagData?.data as IProductTag[];
  }, [productTagData?.data]);

  const productBrandMap = useMemo(() => {
    const map = new Map();
    productBrandList?.forEach((brand) => {
      map.set(brand.id, brand.productBrandName);
    });
    return map;
  }, [productBrandList]);

  const coursingMap = useMemo(() => {
    const map = new Map();
    coursingList?.forEach((category) => {
      map.set(category.id, category.productCatName);
    });
    return map;
  }, [coursingList]);

  const taxMap = useMemo(() => {
    const map = new Map();
    taxList?.forEach((tag) => {
      map.set(tag.id, tag.tagName);
    });
    return map;
  }, [taxList]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (product: IProductPopUP) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null);
    setOpenDialog(false);
  };

  const handleOpenDeletePopup = (product: IProductPopUP) => {
    setProductToDelete(product);
    setOpenDeleteProduct(true);
  };

  const handleCloseDeletePopup = () => {
    setProductToDelete(null);
    setOpenDeleteProduct(false);
  };

  const handleProductBrandChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedValues = event.target.value;
    setSelectedProductBrandId(selectedValues);
  };

  const handleProductViewOnline = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedValues = event.target.value;
    setSelectedProductViewOnline(selectedValues);
  };

  const handleProductCategory = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedValues = event.target.value;
    setSelectedProductCategoryId(selectedValues);
  };

  const handleStartDateChange = (newValue: Dayjs | null) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue: Dayjs | null) => {
    setEndDate(newValue);
  };

  const handleProductTag = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setSelectedProductTagIds(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const [deleteCategory] = useDeleteProductMutation();
  const handleDelete = async (id: string) => {
    try {
      const response = await deleteCategory(id).unwrap();
      if (response.status) {
        showMessage("Deleted successfully");
        setOpenDeleteProduct(false);
      } else {
        showErrorMessage("Failed to delete the product");
      }
    } catch (error) {
      showErrorMessage("Failed to delete the product");
    }
  };

  useEffect(() => {
    if (
      !isLoading &&
      !productBrandLoading &&
      !coursingLoading &&
      !taxLoading &&
      !productCategoryLoading &&
      !ProductTagLoading
    ) {
      onDataLoaded();
    }
  }, [
    isLoading,
    productBrandLoading,
    coursingLoading,
    taxLoading,
    ProductTagLoading,
    productCategoryLoading,
    onDataLoaded,
  ]);

  if (
    isLoading ||
    productBrandLoading ||
    coursingLoading ||
    taxLoading ||
    productCategoryLoading ||
    ProductTagLoading
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

  const coursings: IProductPopUP[] = Array.isArray(data?.data)
    ? (data?.data as IProductPopUP[])
    : [];

  const resetFields = () => {
    setSelectedProductBrandId("");
    setSelectedProductCategoryId("");
    setSelectedProductViewOnline("");
    setSelectedProductTagIds([]);
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <Box>
      <Paper
        sx={{
          borderRadius: 2,
          maxWidth: "100%",
          p: 2,
          py: 5,
        }}
      >
        <Grid container spacing={2}>
          <Grid item lg={3} md={12} sm={12} xs={12}>
            <Grid container>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 400, fontSize: 14 }}
                >
                  Product View Online
                </Typography>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                  select
                  size="small"
                  sx={{ flexGrow: 1, width: "100%" }}
                  SelectProps={{ native: true }}
                  value={selectedProductViewOnline || ""}
                  onChange={handleProductViewOnline}
                  InputLabelProps={{ shrink: true }}
                >
                  <option value="" style={{ color: "gray" }}>
                    Select an option
                  </option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={12} sm={12} xs={12}>
            <Grid container>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 400, fontSize: 14 }}
                >
                  Product Brand
                </Typography>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                  select
                  size="small"
                  sx={{ flexGrow: 1, width: "100%" }}
                  SelectProps={{ native: true }}
                  value={selectedProductBrandId || ""}
                  onChange={handleProductBrandChange}
                  InputLabelProps={{ shrink: true }}
                >
                  <option value="" style={{ color: "gray" }}>
                    Select an option
                  </option>
                  {productBrandList.map((productBrand) => (
                    <option key={productBrand.id} value={productBrand.id}>
                      {productBrand.productBrandName}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={12} sm={12} xs={12}>
            <Grid container>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 400, fontSize: 14 }}
                >
                  Product Category
                </Typography>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                  select
                  size="small"
                  sx={{ flexGrow: 1, width: "100%" }}
                  SelectProps={{ native: true }}
                  value={selectedProductCategoryId || ""}
                  onChange={handleProductCategory}
                  InputLabelProps={{ shrink: true }}
                >
                  <option value="" style={{ color: "gray" }}>
                    Select an option
                  </option>
                  {productList.map((productCategory) => (
                    <option key={productCategory.id} value={productCategory.id}>
                      {productCategory.productCatName}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={12} sm={12} xs={12}>
            <Grid container>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 400, fontSize: 14 }}
                >
                  Product Tag
                </Typography>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                  select
                  size="small"
                  sx={{ width: "100%" }}
                  SelectProps={{
                    multiple: true,
                    native: false,
                  }}
                  InputLabelProps={{ shrink: true }}
                  value={selectedProductTagIds || ""}
                  onChange={handleProductTag}
                >
                  {productTagList && productTagList.length > 0 ? (
                    productTagList.map((productTag: IProductTag) => (
                      <MenuItem key={productTag.id} value={productTag.id}>
                        {productTag.tagName}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" style={{ color: "gray" }}>
                      Select an option
                    </MenuItem>
                  )}
                </TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={2} md={12} sm={12} xs={12}>
            <Grid container>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 400, fontSize: 14 }}
                >
                  Start Date
                </Typography>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <FormControl fullWidth sx={{ width: "100%" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      views={["year", "month", "day"]}
                      onChange={handleStartDateChange}
                      value={startDate}
                      // renderInput={(params) => (
                      //   <TextField
                      //     {...params}
                      //     InputProps={{ sx: { height: "32px" } }} // Adjust height here
                      //   />
                      // )}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={2} md={12} sm={12} xs={12}>
            <Grid container>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 400, fontSize: 14 }}
                >
                  End Date
                </Typography>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <FormControl fullWidth sx={{ width: "100%" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      views={["year", "month", "day"]}
                      onChange={handleEndDateChange}
                      value={endDate}
                      // @ts-ignore
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          size="small"
                          InputLabelProps={{ shrink: true }}
                          placeholder="Select start date"
                          // sx={{ height: "14px", p: "none", fontSize: "10px" }}
                          InputProps={{
                            sx: { height: "14px", p: "none", fontSize: "10px" },
                          }}
                        />
                      )}
                      // renderInput={(params) => (
                      //   <TextField {...params} size="small" />
                      // )}
                      // InputProps={{ sx: { height: "5px" } }}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box display="flex" justifyContent="flex-end">
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
                onClick={resetFields}
              >
                Reset
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ height: "25px" }} />

      <Paper
        sx={{
          borderRadius: 2,
          maxWidth: "100%",
          p: 2,
        }}
      >
        <TableContainer
          sx={{
            borderRadius: 2,
          }}
        >
          <Table
            sx={{
              minWidth: 650,
              overflowX: "auto",
            }}
          >
            <TableHead>
              <TableRow
                style={{
                  height: 50,
                  background: appColor.black,
                  borderBottom: "5px solid green",
                }}
              >
                <TableCell
                  style={{
                    fontSize: "1.1rem",
                    color: appColor.white,
                    textAlign: "left",
                  }}
                >
                  <strong>#</strong>
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "1.1rem",
                    color: appColor.white,
                    textAlign: "left",
                  }}
                >
                  <strong>Product Name</strong>
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "1.1rem",
                    color: appColor.white,
                    textAlign: "left",
                  }}
                >
                  <strong>Product Brand</strong>
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "1.1rem",
                    color: appColor.white,
                    textAlign: "left",
                  }}
                >
                  <strong>Product Category</strong>
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "1.1rem",
                    color: appColor.white,
                    textAlign: "left",
                  }}
                >
                  <strong>Product Description</strong>
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "1.1rem",
                    color: appColor.white,
                    textAlign: "left",
                  }}
                >
                  <strong>View Online</strong>
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "1.1rem",
                    color: appColor.white,
                    textAlign: "right",
                  }}
                >
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isError || coursings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={20} align="center">
                    {isError ? "Error fetching data" : "No data available"}
                  </TableCell>
                </TableRow>
              ) : (
                coursings
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: IProductPopUP, index) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                        }}
                      >
                        {page * rowsPerPage + index + 1}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                        }}
                      >
                        {row.productName}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                        }}
                      >
                        {productBrandMap.get(row.productBrandId) || ""}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                        }}
                      >
                        {coursingMap.get(row.productCategoryId) || ""}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                        }}
                      >
                        {row.productShortDescription}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                        }}
                      >
                        {row.productViewOnline ? "Yes" : "No"}
                      </TableCell>
                      <TableCell>
                        <Grid
                          container
                          spacing={1}
                          sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                          <Grid item>
                            <Button
                              onClick={() => handleOpenDialog(row)}
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                border: `1px solid green`,
                                borderRadius: 2,
                                cursor: "pointer",
                                mr: 0.5,
                                p: 0.5,
                                minWidth: "45px",
                                alignItems: "center",
                                color: "green",
                              }}
                            >
                              <EditIcon sx={{ p: "2px", color: "green" }} />
                              Edit
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              onClick={() => handleOpenDeletePopup(row)}
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                border: `1px solid green`,
                                borderRadius: 2,
                                cursor: "pointer",
                                mr: 0.5,
                                p: 0.5,
                                minWidth: "45px",
                                alignItems: "center",
                                color: "green",
                              }}
                            >
                              <DeleteIcon sx={{ p: "2px", color: "green" }} />
                              Delete
                            </Button>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={coursings.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows, .MuiTablePagination-select":
                { fontSize: 14 },
            }}
          />
        </TableContainer>
        {selectedProduct && (
          <NewPopUpProduct
            openModel={openDialog}
            handleCloseDialog={handleCloseDialog}
            data={selectedProduct}
          />
        )}
        {productToDelete && (
          <DeletePopup
            open={openDeleteProduct}
            handleCloseDelete={handleCloseDeletePopup}
            onConfirm={async () => {
              await handleDelete(productToDelete.id.toString());
            }}
            title="Delete Product"
            content={`Are you sure you want to delete "${productToDelete.productName}"?`}
          />
        )}
      </Paper>
    </Box>
  );
};

export default ProductTable;
