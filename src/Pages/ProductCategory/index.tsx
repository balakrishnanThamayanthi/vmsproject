import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import NewProductCategory from "./Components/NewProductCategory";
import NewProductCategoryTable from "./Components/NewProductCategoryTable";
import AddIcon from "@mui/icons-material/Add";
import TableViewIcon from '@mui/icons-material/TableView';

const Category: React.FC = () => {
  const [showNewProduct, setShowNewProduct] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const handleToggle = () => {
    setShowNewProduct(!showNewProduct);
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
            startIcon={showNewProduct 
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
            {showNewProduct ? "Sub Category Table" : "Sub Category Product"}
          </Button>
        </Box>
      )}
      <Box sx={{ height: "40px" }} />{" "}
      {showNewProduct ? (
        <NewProductCategory />
      ) : (
        <NewProductCategoryTable onDataLoaded={handleDataLoaded} />
      )}
    </Box>
  );
};

export default Category;
