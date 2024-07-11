import React, { useEffect, useState } from "react";
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
import {
  useDeleteModifierMutation,
  useGetAllModifierQuery,
} from "../../../Api/attoDeskApi";
import { IModifier } from "../../../Api/Interface/api.interface";
import { appColor } from "../../../theme/appColor";
import DeletePopup from "../../../Components/Delete/DeletePopup";
import { useNotifier } from "../../../Core/Notifier";
import NewPopUpModifier from "./NewPopUpModifier";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import SearchIcon from "@mui/icons-material/Search";

const ModifierTable: React.FC<{ onDataLoaded: () => void }> = ({
  onDataLoaded,
}) => {
  const { showErrorMessage, showMessage } = useNotifier();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedModifier, setSelectedModifier] = useState<IModifier | null>(
    null
  );
  const [modifierToDelete, setModifierToDelete] = useState<IModifier | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteCategory, setOpenDeleteCategory] = useState(false);
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");
  const { data, isLoading, isError, refetch } = useGetAllModifierQuery({
    searchText: currentSearchQuery,
  });

  const modifier: IModifier[] = Array.isArray(data?.data)
    ? (data?.data as IModifier[])
    : [];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (coursing: IModifier) => {
    setSelectedModifier(coursing);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedModifier(null);
    setOpenDialog(false);
  };

  const handleOpenDeletePopup = (coursing: IModifier) => {
    setModifierToDelete(coursing);
    setOpenDeleteCategory(true);
  };

  const handleCloseDeletePopup = () => {
    setModifierToDelete(null);
    setOpenDeleteCategory(false);
  };

  const [deleteCategory] = useDeleteModifierMutation();
  const handleDelete = async (id: string) => {
    try {
      const response = await deleteCategory(id).unwrap();
      if (response.status) {
        showMessage("Deleted successfully");
        setOpenDeleteCategory(false);
        refetch();
      } else {
        showErrorMessage("Failed to delete the modifier");
      }
    } catch (error) {
      showErrorMessage("Failed to delete the modifier");
    }
  };

  useEffect(() => {
    if (!isLoading) {
      onDataLoaded();
    }
  }, [isLoading, onDataLoaded]);

  if (isLoading) {
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
          py: 5,
        }}
      >
        <Grid container spacing={2}>
          <Grid item lg={2} md={3} sm={12} xs={12}>
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
              placeholder="Search Modifier Name"
              sx={{ width: "100%" }}
              
              InputLabelProps={{
                sx: {
                  fontSize: 14,
                },
              }}
              size="small"
            />
          </Grid>
          <Grid item lg={4} md={3} sm={12} xs={12} sx={{ display: "flex" }}>
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              sx={{
                backgroundColor: appColor.blue[100],
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: appColor.blue[100],
                  boxShadow: "none",
                },
                "&:active": {
                  backgroundColor:appColor.blue[100],
                  boxShadow: "none",
                },
              }}
              onClick={handleSearch}
            >
              Search
            </Button>
            {/* <Box m={0.5}></Box>
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
              </Button> */}
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
                  <strong>Modifier Name</strong>
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "1.1rem",
                    color: appColor.white,
                    textAlign: "left",
                  }}
                >
                  <strong>Maximum No of Times</strong>
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "1.1rem",
                    color: appColor.white,
                    textAlign: "left",
                  }}
                >
                  <strong>Price</strong>
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
              {isError || modifier.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={20} align="center">
                    {isError ? "Error fetching data" : "No data available"}
                  </TableCell>
                </TableRow>
              ) : (
                modifier
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: IModifier, index) => (
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
                        {row.modifierName}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                        }}
                      >
                        {row.maxNoOfTimes}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                        }}
                      >
                        {row.modifierPrice}
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
            count={modifier.length}
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
        {selectedModifier && (
          <NewPopUpModifier
            openModel={openDialog}
            handleCloseDialog={handleCloseDialog}
            data={selectedModifier}
          />
        )}
        {modifierToDelete && (
          <DeletePopup
            open={openDeleteCategory}
            handleCloseDelete={handleCloseDeletePopup}
            onConfirm={async () => {
              await handleDelete(modifierToDelete.id.toString());
            }}
            title="Delete Modifier"
            content={`Are you sure you want to delete "${modifierToDelete.modifierName}"?`}
          />
        )}
      </Paper>
    </Box>
  );
};

export default ModifierTable;
