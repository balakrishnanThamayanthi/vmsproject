import { Box } from "@mui/material";
import React from "react";
import NewProductBrand from "./Components/NewProductBrand";
import NewProductBrandTable from "./Components/NewProductBrandTable";

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
      <NewProductBrand />
      <Box sx={{ height: "75px" }} /> 
      <NewProductBrandTable />
    </Box>
  );
};

export default Category;
