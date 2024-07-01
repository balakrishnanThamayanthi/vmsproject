import React, { useState } from "react";
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
  useDeleteDepartmentMutation,
  useGetDepartmentQuery,
} from "../../../Api/attoDeskApi";
import { ICoursing, IDepartment } from "../../../Api/Interface/api.interface";
import { appColor } from "../../../theme/appColor";
import Coursing from "./NewPopUpCoursing";
import DeletePopup from "../../../Components/Delete/DeletePopup";
import { useNotifier } from "../../../Core/Notifier";

const ComponentTable: React.FC = () => {
  const { showErrorMessage, showMessage } = useNotifier();
  const { data, isLoading, isError } = useGetDepartmentQuery();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedCoursing, setSelectedCoursing] = useState<IDepartment | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteCategory, setOpenDeleteCategory] = useState(false);
  const [coursingToDelete, setCoursingToDelete] = useState<IDepartment | null>(
    null
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (coursing: IDepartment) => {
    setSelectedCoursing(coursing);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedCoursing(null);
    setOpenDialog(false);
  };

  const handleOpenDeletePopup = (coursing: IDepartment) => {
    setCoursingToDelete(coursing);
    setOpenDeleteCategory(true);
  };

  const handleCloseDeletePopup = () => {
    setCoursingToDelete(null);
    setOpenDeleteCategory(false);
  };

  const [deleteCategory] = useDeleteDepartmentMutation();
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
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );

  if (isError || !data) return <div>Error fetching data</div>;

  const coursings: IDepartment[] = Array.isArray(data.data) ? data.data : [];

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
                  <strong> Name</strong>
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "1.1rem",
                    color: appColor.white,
                    textAlign: "left",
                  }}
                >
                  <strong>Priority</strong>
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
                .map((row: IDepartment, index) => (
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
                      {row.departmentName}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      {row.description}
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
          <Coursing
            openModel={openDialog}
            handleCloseDialog={handleCloseDialog}
            data={selectedCoursing}
          />
        )}
      </Paper>
      {coursingToDelete && (
        <DeletePopup
          open={openDeleteCategory}
          handleCloseDelete={handleCloseDeletePopup}
          onConfirm={async () => {
            await handleDelete(coursingToDelete.id.toString());
          }}
          title="Delete Coursing"
          content={`Are you sure you want to delete "${coursingToDelete.departmentName}"?`}
        />
      )}
    </Box>
  );
};

export default ComponentTable;
