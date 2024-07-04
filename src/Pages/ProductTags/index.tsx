import { Box } from "@mui/material";
import React from "react";
import NewProductTag from "./Components/NewProductTag";
import NewProductTagTable from "./Components/NewProductTagTable";

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
      <NewProductTag />
      <Box sx={{ height: "75px" }} /> 
      <NewProductTagTable />
    </Box>
  );
};

export default Category;
