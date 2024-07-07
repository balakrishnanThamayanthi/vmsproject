import { Box } from "@mui/material";
import React from "react";
import NewProductCategory from "./Components/NewProductCategory";
import NewProductCategoryTable from "./Components/NewProductCategoryTable";

const Category: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#e0e0e0",
        p: 2,
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <NewProductCategory />
      <Box sx={{ height: "75px" }} /> 
      <NewProductCategoryTable />
    </Box>
  );
};

export default Category;
