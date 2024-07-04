import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import NewCategory from "./Components/NewCategory";
import NewCategoryTable from "./Components/NewCategoryTable";
import AddIcon from "@mui/icons-material/Add";
import TableViewIcon from '@mui/icons-material/TableView';

const Product: React.FC = () => {
  const [showNewPrinter, setShowNewPrinter] = useState(false);

  const handleToggle = () => {
    setShowNewPrinter(!showNewPrinter);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#e0e0e0",
        p: 2,
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          textAlign: "end"
        }}
      >
        <Button
          variant="contained"
          startIcon={showNewPrinter 
            ? <TableViewIcon sx={{ fontSize: 40 }} /> 
            : <AddIcon sx={{ fontSize: 40 }} />}
          sx={{
            backgroundColor: "green",
            textTransform: "none",
            boxShadow: "none",
            fontSize: 16,
            "& .MuiSvgIcon-root": {
              fontSize: 26, 
            },
            "&:hover": {
              backgroundColor: "green",
              boxShadow: "none",
            },
            "&:active": {
              backgroundColor: "green",
              boxShadow: "none",
            },
          }}
          onClick={handleToggle}
        >
          {showNewPrinter ? "Category Table" : "New Category"}
        </Button>
      </Box>
      <Box sx={{ height: "40px" }} />{" "}
      {showNewPrinter ? <NewCategory /> : <NewCategoryTable />}
    </Box>
  );
};

export default Product;
