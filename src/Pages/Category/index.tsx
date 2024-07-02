import { Box } from "@mui/material";
import React from "react";
import NewCategory from "./Components/NewCategory";
import NewCategoryTable from "./Components/NewCategoryTable";

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
      <NewCategory />
      <Box sx={{ height: "75px" }} /> 
      <NewCategoryTable />
    </Box>
  );
};

export default Category;
