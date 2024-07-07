import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import NewCategory from "./Components/NewCategory";
import NewCategoryTable from "./Components/NewCategoryTable";
import AddIcon from "@mui/icons-material/Add";
import TableViewIcon from '@mui/icons-material/TableView';

const Product: React.FC = () => {
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const handleToggle = () => {
    setShowNewCategory(!showNewCategory);
  };

  const handleDataLoaded = () => {
    setIsDataLoaded(true);
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
      {isDataLoaded && (
      <Box
        sx={{
          textAlign: "end"
        }}
      >
        <Button
          variant="contained"
          startIcon={showNewCategory 
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
          {showNewCategory ? "Category Table" : "New Category"}
        </Button>
      </Box>
      )}
      <Box sx={{ height: "40px" }} />{" "}
      {showNewCategory ? <NewCategory /> : <NewCategoryTable onDataLoaded={handleDataLoaded} />}
    </Box>
  );
};

export default Product;
