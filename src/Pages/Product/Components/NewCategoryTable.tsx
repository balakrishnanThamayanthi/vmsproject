import React, { useMemo, useState } from "react";
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
import { ICoursing, IDepartment, IProductPopUP, ITaxes } from "../../../Api/Interface/api.interface";
import { appColor } from "../../../theme/appColor";
import DeletePopup from "../../../Components/Delete/DeletePopup";
import { useNotifier } from "../../../Core/Notifier";
import NewPopUpCategory from "./NewPopUpProduct";

const ComponentTable: React.FC = () => {
  const { showErrorMessage, showMessage } = useNotifier();
  const { data, isLoading, isError } = useGetProductQuery();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedCoursing, setSelectedCoursing] = useState<IProductPopUP | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteCategory, setOpenDeleteCategory] = useState(false);
  const [coursingToDelete, setCoursingToDelete] = useState<IProductPopUP | null>(
    null
  );

  const { data: departmentData, isLoading: departmentLoading } =
  useGetProductBrandQuery();
  const { data: coursingData, isLoading: coursingLoading } =
  useGetProductCategoryQuery();
  const { data: taxData, isLoading: taxLoading } =
  useGetProductTagQuery();


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

  const handleOpenDialog = (coursing: IProductPopUP) => {
    setSelectedCoursing(coursing);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedCoursing(null);
    setOpenDialog(false);
  };

  const handleOpenDeletePopup = (coursing: IProductPopUP) => {
    setCoursingToDelete(coursing);
    setOpenDeleteCategory(true);
  };

  const handleCloseDeletePopup = () => {
    setCoursingToDelete(null);
    setOpenDeleteCategory(false);
  };

  const [deleteCategory] = useDeleteProductMutation();
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

  if (isLoading)
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

  if (isError || !data) return <div>Error fetching data</div>;

  const coursings: IProductPopUP[] = Array.isArray(data.data) ? data.data : [];

  return (
    <Box>
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
                  <strong>Product Tag</strong>
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
              {coursings
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
                      {departmentMap.get(row.productBrandId) || ""}
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
                ))}
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
            title="Delete Coursing"
            content={`Are you sure you want to delete "${coursingToDelete.productName}"?`}
          />
        )}
      </Paper>
    </Box>
  );
};

export default ComponentTable;
