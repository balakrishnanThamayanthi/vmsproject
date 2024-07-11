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
  TextField,
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteTaxMutation, useGetTaxQuery } from "../../../Api/attoDeskApi";
import { ITaxes } from "../../../Api/Interface/api.interface";
import { appColor } from "../../../theme/appColor";
import Coursing from "./NewPopUpTax";
import DeletePopup from "../../../Components/Delete/DeletePopup";
import { useNotifier } from "../../../Core/Notifier";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const ComponentTable: React.FC = () => {
  const { showErrorMessage, showMessage } = useNotifier();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedCoursing, setSelectedCoursing] = useState<ITaxes | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteCategory, setOpenDeleteCategory] = useState(false);
  const [coursingToDelete, setCoursingToDelete] = useState<ITaxes | null>(null);

  const { data, isLoading, isError, refetch } = useGetTaxQuery({
    searchText: currentSearchQuery,
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (coursing: ITaxes) => {
    setSelectedCoursing(coursing);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedCoursing(null);
    setOpenDialog(false);
  };

  const handleOpenDeletePopup = (coursing: ITaxes) => {
    setCoursingToDelete(coursing);
    setOpenDeleteCategory(true);
  };

  const handleCloseDeletePopup = () => {
    setCoursingToDelete(null);
    setOpenDeleteCategory(false);
  };

  const [deleteCategory] = useDeleteTaxMutation();
  const handleDelete = async (id: string) => {
    try {
      const response = await deleteCategory(id).unwrap();
      if (response.status) {
        showMessage("Deleted successfully");
        setOpenDeleteCategory(false);
      } else {
        showErrorMessage("Failed to delete the tax");
      }
    } catch (error) {
      showErrorMessage("Failed to delete the tax");
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

  const coursings: ITaxes[] = Array.isArray(data?.data)
    ? (data?.data as ITaxes[])
    : [];

  const handleSearch = () => {
    setCurrentSearchQuery(searchQuery);
  };

  const resetFields = () => {
    setSearchQuery("");
    setCurrentSearchQuery("");
    refetch();
  };

  return (
    <Box>
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
              placeholder="Search Tax Name & Tax Code"
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
              // startIcon={<RotateLeftIcon />}
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
              <RestartAltIcon />
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
                  <strong>Tax Name</strong>
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "1.1rem",
                    color: appColor.white,
                    textAlign: "left",
                  }}
                >
                  <strong>Tax Type</strong>
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "1.1rem",
                    color: appColor.white,
                    textAlign: "left",
                  }}
                >
                  <strong>Apply To</strong>
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "1.1rem",
                    color: appColor.white,
                    textAlign: "left",
                  }}
                >
                  <strong>Percentage</strong>
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "1.1rem",
                    color: appColor.white,
                    textAlign: "left",
                  }}
                >
                  <strong>Tax Code</strong>
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
                  .map((row: ITaxes, index) => (
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
                        {row.taxName}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                        }}
                      >
                        {row.taxType}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                        }}
                      >
                        {row.applyTo}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                        }}
                      >
                        {row.percentage}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                        }}
                      >
                        {row.taxCode}
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
          title="Delete Tax"
          content={`Are you sure you want to delete "${coursingToDelete.taxName}"?`}
        />
      )}
    </Box>
  );
};

export default ComponentTable;
