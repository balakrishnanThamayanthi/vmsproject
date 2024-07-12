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
  FormControl,
  Typography,
  TextField,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useDeleteCategoryMutation,
  useGetAddCategoryQuery,
  useGetCoursingQuery,
  useGetDepartmentQuery,
  useGetTaxQuery,
} from "../../../Api/attoDeskApi";
import {
  ICategory,
  ICoursing,
  IDepartment,
  ITaxes,
} from "../../../Api/Interface/api.interface";
import { appColor } from "../../../theme/appColor";
import DeletePopup from "../../../Components/Delete/DeletePopup";
import { useNotifier } from "../../../Core/Notifier";
import NewPopUpCategory from "./NewPopUpCategory";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { RooleType } from "../../../Core/Enum/enum";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const CategoryTable: React.FC<{ onDataLoaded: () => void }> = ({
  onDataLoaded,
}) => {
  const { showErrorMessage, showMessage } = useNotifier();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");
  const [selectedCoursingId, setSelectedCousingId] = useState<string>("");
  const [selectedProductTaxId, setSelectedProductTaxId] = useState<string>("");
  const [selectedProductRoles, setSelectedProducRoles] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const startDateAsDate = startDate?.toDate() || null;
  const endDateAsDate = endDate?.toDate() || null;
  const [isPaperVisible, setIsPaperVisible] = useState(false);

  const { data, isLoading, isError, refetch } = useGetAddCategoryQuery({
    departmentId: selectedDepartment,
    coursingId: selectedCoursingId,
    roleId: selectedProductRoles,
    taxeId: selectedProductTaxId,
    createdDateStart: startDateAsDate as Date,
    createdDateEnd: endDateAsDate as Date,
    searchText: currentSearchQuery,
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedCoursing, setSelectedCoursing] = useState<ICategory | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteCategory, setOpenDeleteCategory] = useState(false);
  const [coursingToDelete, setCoursingToDelete] = useState<ICategory | null>(
    null
  );

  const { data: departmentData, isLoading: departmentLoading } =
    useGetDepartmentQuery({
      searchText: "",
    });
  const { data: coursingData, isLoading: coursingLoading } =
    useGetCoursingQuery({
      searchText: "",
    });
  const { data: taxData, isLoading: taxLoading } = useGetTaxQuery({
    searchText: "",
  });

  const departmentList = useMemo(() => {
    return departmentData?.data as IDepartment[];
  }, [departmentData?.data]);

  const coursingList = useMemo(() => {
    return coursingData?.data as ICoursing[];
  }, [coursingData?.data]);

  const taxList = useMemo(() => {
    return taxData?.data as ITaxes[];
  }, [taxData?.data]);

  const departmentMap = useMemo(() => {
    const map = new Map();
    departmentList?.forEach((category) => {
      map.set(category.id, category.departmentName);
    });
    return map;
  }, [departmentList]);

  const coursingMap = useMemo(() => {
    const map = new Map();
    coursingList?.forEach((category) => {
      map.set(category.id, category.coursingName);
    });
    return map;
  }, [coursingList]);

  const taxMap = useMemo(() => {
    const map = new Map();
    taxList?.forEach((category) => {
      map.set(category.id, category.taxName);
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

  const handleOpenDialog = (coursing: ICategory) => {
    setSelectedCoursing(coursing);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedCoursing(null);
    setOpenDialog(false);
  };

  const handleOpenDeletePopup = (coursing: ICategory) => {
    setCoursingToDelete(coursing);
    setOpenDeleteCategory(true);
  };

  const handleCloseDeletePopup = () => {
    setCoursingToDelete(null);
    setOpenDeleteCategory(false);
  };

  const handleCoursing = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValues = event.target.value;
    setSelectedCousingId(selectedValues);
  };

  const handleDepartment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValues = event.target.value;
    setSelectedDepartment(selectedValues);
  };

  const handleProductTax = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValues = event.target.value;
    setSelectedProductTaxId(selectedValues);
  };

  const handleStartDateChange = (newValue: Dayjs | null) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue: Dayjs | null) => {
    setEndDate(newValue);
  };

  const handleProductRoals = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setSelectedProducRoles(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const [deleteCategory] = useDeleteCategoryMutation();
  const handleDelete = async (id: string) => {
    try {
      const response = await deleteCategory(id).unwrap();
      if (response.status) {
        showMessage("Deleted successfully");
        setOpenDeleteCategory(false);
      } else {
        showErrorMessage("Failed to delete the category");
      }
    } catch (error) {
      showErrorMessage("Failed to delete the category");
    }
  };

  const handleToggle = () => {
    setIsPaperVisible(!isPaperVisible);
  };

  useEffect(() => {
    if (!isLoading && !departmentLoading && !coursingLoading && !taxLoading) {
      onDataLoaded();
    }
  }, [isLoading, departmentLoading, coursingLoading, taxLoading, onDataLoaded]);

  if (isLoading || departmentLoading || coursingLoading || taxLoading) {
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

  const coursings: ICategory[] = Array.isArray(data?.data)
    ? (data?.data as ICategory[])
    : [];

  const resetFields = () => {
    setSelectedDepartment("");
    setSelectedCousingId("");
    setSelectedProductTaxId("");
    setSelectedProducRoles([]);
    setStartDate(null);
    setEndDate(null);
  };

  const handleSearch = () => {
    setCurrentSearchQuery(searchQuery);
  };

  const resetSearchFields = () => {
    setSearchQuery("");
    setCurrentSearchQuery("");
    refetch();
  };

  return (
    <Box>
      <Grid container spacing={2} display={"flex"} justifyContent={"flex-end"}>
        {/* <Grid
          item
          lg={4}
          md={6}
          sm={12}
          xs={12}
          sx={{ display: "flex", justifyContent: "flex-end", my: 2 }}
        >
          <Button
            variant="contained"
            startIcon={<FilterAltIcon />}
            sx={{
              backgroundColor: appColor.blue[100],
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: appColor.blue[100],
                boxShadow: "none",
              },
              "&:active": {
                backgroundColor: appColor.blue[100],
                boxShadow: "none",
              },
            }}
            onClick={handleToggle}
          >
            {isPaperVisible ? "Close Filter" : "Open Filter"}
          </Button>
        </Grid> */}
      </Grid>
      {isPaperVisible && (
        <>
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
                      Product Department
                    </Typography>
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      select
                      size="small"
                      sx={{ flexGrow: 1, width: "100%" }}
                      SelectProps={{ native: true }}
                      value={selectedDepartment || ""}
                      onChange={handleDepartment}
                      InputLabelProps={{ shrink: true }}
                    >
                      <option value="" style={{ color: "gray" }}>
                        Select an option
                      </option>
                      {departmentList &&
                        departmentList.map((department) => (
                          <option key={department.id} value={department.id}>
                            {department.departmentName}
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
                      Product Coursing
                    </Typography>
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      select
                      size="small"
                      sx={{ flexGrow: 1, width: "100%" }}
                      SelectProps={{ native: true }}
                      value={selectedCoursingId || ""}
                      onChange={handleCoursing}
                      InputLabelProps={{ shrink: true }}
                    >
                      <option value="" style={{ color: "gray" }}>
                        Select an option
                      </option>
                      {coursingList &&
                        coursingList.map((coursing) => (
                          <option key={coursing.id} value={coursing.id}>
                            {coursing.coursingName}
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
                      Product Tax
                    </Typography>
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      select
                      size="small"
                      sx={{ flexGrow: 1, width: "100%" }}
                      SelectProps={{ native: true }}
                      value={selectedProductTaxId || ""}
                      onChange={handleProductTax}
                      InputLabelProps={{ shrink: true }}
                    >
                      <option value="" style={{ color: "gray" }}>
                        Select an option
                      </option>
                      {taxList &&
                        taxList.map((tax) => (
                          <option key={tax.id} value={tax.id}>
                            {tax.taxName}
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
                      Product Roles
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
                      value={selectedProductRoles || ""}
                      onChange={handleProductRoals}
                    >
                      {Object.entries(RooleType).map(([key, value], index) => (
                        <MenuItem key={index} value={value}>
                          {key}
                        </MenuItem>
                      ))}
                      {Object.keys(RooleType).length === 0 && (
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
                    <FormControl
                      fullWidth
                      size={"small"}
                      sx={{ width: "100%", height: "20px" }}
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          views={["year", "month", "day"]}
                          onChange={handleEndDateChange}
                          value={endDate}
                          // renderInput={(params) => (
                          //   <TextField
                          //     {...params}
                          //     size="small"
                          //     InputProps={{ sx: { height: "40px" } }}
                          //   />
                          // )}
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
                    startIcon={<RestartAltIcon />}
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
        </>
      )}
      <Paper
        sx={{
          borderRadius: 2,
          maxWidth: "100%",
          p: 2,
        }}
      >
        <Grid
          container
          spacing={2}
          display={"flex"}
          justifyContent={"flex-end"}
        >
          <Grid
            item
            lg={4}
            md={6}
            sm={12}
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end", my: 2 }}
          >
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Category Name"
              sx={{ width: "100%" }}
              InputLabelProps={{
                sx: {
                  fontSize: 14,
                },
              }}
              size="small"
            />
            <Box m={0.5}></Box>
            <Button
              variant="contained"
              // startIcon={<SearchIcon />}
              sx={{
                backgroundColor: appColor.blue[100],
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: appColor.blue[100],
                  boxShadow: "none",
                },
                "&:active": {
                  backgroundColor: appColor.blue[100],
                  boxShadow: "none",
                },
              }}
              onClick={handleSearch}
            >
              <SearchIcon />
            </Button>
            <Box m={0.5}></Box>
            <Button
              variant="contained"
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
              onClick={resetSearchFields}
            >
              <RestartAltIcon />
            </Button>
          </Grid>

          <Grid
            item
            sx={{ display: "flex", justifyContent: "flex-end", my: 2 }}
          >
            <Button
              variant="contained"
              startIcon={<FilterAltIcon />}
              sx={{
                backgroundColor: appColor.blue[100],
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: appColor.blue[100],
                  boxShadow: "none",
                },
                "&:active": {
                  backgroundColor: appColor.blue[100],
                  boxShadow: "none",
                },
              }}
              onClick={handleToggle}
            >
              {isPaperVisible ? "Close Filter" : "Open Filter"}
            </Button>
          </Grid>
        </Grid>
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
                  <strong>Category Name</strong>
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "1.1rem",
                    color: appColor.white,
                    textAlign: "left",
                  }}
                >
                  <strong>Department</strong>
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "1.1rem",
                    color: appColor.white,
                    textAlign: "left",
                  }}
                >
                  <strong>Coursing</strong>
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "1.1rem",
                    color: appColor.white,
                    textAlign: "left",
                  }}
                >
                  <strong>Tax</strong>
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "1.1rem",
                    color: appColor.white,
                    textAlign: "left",
                  }}
                >
                  <strong>Age Restriction</strong>
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
                  .map((row: ICategory, index) => (
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
                        {row.categoryName}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                        }}
                      >
                        {departmentMap.get(row.departmentId) || ""}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                        }}
                      >
                        {coursingMap.get(row.coursingId) || ""}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                        }}
                      >
                        {taxMap.get(row.taxeId) || ""}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                        }}
                      >
                        {row.ageRestriction ? "Yes" : "No"}
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
        {selectedCoursing && (
          <NewPopUpCategory
            openModel={openDialog}
            handleCloseDialog={handleCloseDialog}
            data={selectedCoursing}
          />
        )}
        {coursingToDelete && (
          <DeletePopup
            open={openDeleteCategory}
            handleCloseDelete={handleCloseDeletePopup}
            onConfirm={async () => {
              await handleDelete(coursingToDelete.id.toString());
            }}
            title="Delete Category"
            content={`Are you sure you want to delete "${coursingToDelete.categoryName}"?`}
          />
        )}
      </Paper>
    </Box>
  );
};

export default CategoryTable;
